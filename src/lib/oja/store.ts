import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  YOU_ID,
  type Listing,
  type MarketRequest,
  type Order,
  type Proposal,
  type Review,
  type SortKey,
  walletFrom,
  formatWhen,
} from "@/lib/oja/data";

type Data = {
  myListings: Listing[];
  orders: Order[];
  requests: MarketRequest[];
  proposals: Proposal[];
  extraReviews: Review[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
};

const blank: Data = {
  myListings: [],
  orders: [],
  requests: [],
  proposals: [],
  extraReviews: [],
  sortKey: "price",
  sortDir: "asc",
};

export type HoldInput = {
  sellerId: string;
  title: string;
  price: number;
  deliveryFee: number | null;
  fulfillment: "pickup" | "delivery";
  place: string;
  requestId?: string;
};

export type PlaceResult = { ok: true; orderId: string } | { ok: false; reason: string };

type Store = Data & {
  setSort: (key: SortKey) => void;
  addListing: (input: Omit<Listing, "id" | "sellerId">) => string;
  removeListing: (id: string) => void;
  placeOrder: (input: HoldInput) => PlaceResult;
  reveal: (id: string) => void;
  enterCode: (id: string, code: string) => "ok" | "bad" | "closed";
  rate: (id: string, kept: boolean, fair: boolean) => void;
  report: (id: string, reason: string, note: string) => void;
  refund: (id: string) => void;
  resume: (id: string) => void;
  postRequest: (input: { kind: "item" | "errand"; title: string; details: string; budget: number }) => string;
  reset: () => void;
};

const OFFER_NOTES = [
  "I can do this at the price below, and I won't add a charge at handover.",
  "Free pickup at my usual campus points. Delivery only if a fee is shown here.",
  "I can take this on. The price here is the price at the door.",
];

const DELIVERY: Record<string, number> = {
  zainab: 400,
  kelechi: 700,
  amaka: 300,
  ibrahim: 500,
};

function quote(budget: number, factor: number) {
  if (budget <= 0) return 0;
  const stepped = Math.round((budget * factor) / 100) * 100;
  const price = stepped > 0 ? stepped : budget;
  return Math.min(budget, price);
}

function makeProposals(requestId: string, budget: number): Proposal[] {
  const ids = ["chioma", "zainab", "tunde", "femi", "amaka", "kelechi", "ibrahim"];
  const picked = [...ids].sort(() => Math.random() - 0.5).slice(0, 3);
  const factors = [0.96, 0.8, 0.68];
  return picked.map((sellerId, i) => ({
    id: crypto.randomUUID(),
    requestId,
    sellerId,
    price: quote(budget, factors[i] ?? 0.8),
    note: OFFER_NOTES[i] ?? OFFER_NOTES[0]!,
    deliveryFee: DELIVERY[sellerId] ?? null,
  }));
}

function orderCode() {
  const n = 7000 + (crypto.getRandomValues(new Uint32Array(1))[0]! % 3000);
  return `OJ-${n}`;
}

function handoverPin() {
  const n = crypto.getRandomValues(new Uint32Array(1))[0]! % 1000000;
  return n.toString().padStart(6, "0");
}

export const useOja = create<Store>()(
  persist(
    (set, get) => ({
      ...blank,
      setSort: (key) =>
        set((s) => {
          if (s.sortKey === key) return { sortDir: s.sortDir === "asc" ? "desc" : "asc" };
          return { sortKey: key, sortDir: key === "price" ? "asc" : "desc" };
        }),
      addListing: (input) => {
        const id = `mine-${crypto.randomUUID().slice(0, 8)}`;
        set((s) => ({ myListings: [{ ...input, id, sellerId: YOU_ID }, ...s.myListings] }));
        return id;
      },
      removeListing: (id) => set((s) => ({ myListings: s.myListings.filter((l) => l.id !== id) })),
      placeOrder: (input) => {
        const place = input.place.trim();
        if (!place) return { ok: false, reason: "Add where this changes hands." };
        if (input.sellerId === YOU_ID) return { ok: false, reason: "You can't hold money on your own listing." };
        if (input.fulfillment === "delivery" && input.deliveryFee == null) {
          return { ok: false, reason: "This seller has not turned on delivery." };
        }
        if (input.requestId) {
          const request = get().requests.find((r) => r.id === input.requestId);
          if (request?.orderId) return { ok: false, reason: "You already accepted an offer on this request." };
        }
        const deliveryFee = input.fulfillment === "delivery" ? (input.deliveryFee ?? 0) : 0;
        const charge = input.price + deliveryFee;
        if (walletFrom(get().orders).spendable < charge) {
          return { ok: false, reason: "Your practice wallet can't cover this. Money already held stays held." };
        }
        const order: Order = {
          id: crypto.randomUUID(),
          code: orderCode(),
          handover: handoverPin(),
          sellerId: input.sellerId,
          title: input.title,
          price: input.price,
          deliveryFee,
          fulfillment: input.fulfillment,
          place,
          status: "held",
          createdAt: Date.now(),
          requestId: input.requestId,
        };
        set((s) => ({
          orders: [order, ...s.orders],
          requests: input.requestId
            ? s.requests.map((r) => (r.id === input.requestId ? { ...r, orderId: order.id } : r))
            : s.requests,
        }));
        return { ok: true, orderId: order.id };
      },
      reveal: (id) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id && o.status === "held" ? { ...o, status: "revealed" } : o)),
        })),
      enterCode: (id, code) => {
        const order = get().orders.find((o) => o.id === id);
        if (!order || order.status !== "revealed") return "closed";
        if (code.replace(/\D/g, "") !== order.handover) return "bad";
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status: "released" } : o)),
        }));
        return "ok";
      },
      rate: (id, kept, fair) => {
        const order = get().orders.find((o) => o.id === id);
        if (!order || order.status !== "released") return;
        const review: Review = {
          id: `extra-${order.id}`,
          sellerId: order.sellerId,
          orderCode: order.code,
          item: order.title,
          kept,
          fair,
          note:
            kept && fair
              ? `${order.title} — I released the code. The item and the price both held.`
              : kept && !fair
                ? `${order.title} matched, but the price was not fair.`
                : !kept && fair
                  ? `The price for ${order.title} was fair. The item was not what was promised.`
                  : `${order.title} — neither the item nor the price was right.`,
          when: formatWhen(Date.now()),
        };
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status: "rated", rating: { kept, fair } } : o)),
          extraReviews: [review, ...s.extraReviews],
        }));
      },
      report: (id, reason, note) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id && (o.status === "held" || o.status === "revealed")
              ? { ...o, status: "reported", report: { reason, note: note.trim() } }
              : o,
          ),
        })),
      refund: (id) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id && o.status === "reported" ? { ...o, status: "refunded" } : o)),
        })),
      resume: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id && o.status === "reported" ? { ...o, status: "held", report: undefined } : o,
          ),
        })),
      postRequest: (input) => {
        const id = crypto.randomUUID();
        const request: MarketRequest = { id, ...input, createdAt: Date.now() };
        set((s) => ({
          requests: [request, ...s.requests],
          proposals: [...makeProposals(id, input.budget), ...s.proposals],
        }));
        return id;
      },
      reset: () => {
        set(blank);
        void useOja.persist.clearStorage();
      },
    }),
    {
      name: "oja-campus-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        myListings: s.myListings,
        orders: s.orders,
        requests: s.requests,
        proposals: s.proposals,
        extraReviews: s.extraReviews,
        sortKey: s.sortKey,
        sortDir: s.sortDir,
      }),
    },
  ),
);
