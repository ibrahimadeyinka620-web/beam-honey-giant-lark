export const CAMPUS = "Creek Campus";
export const YOU_ID = "you";
export const YOU_ROOM = "New Hostel, B12";
export const START_WALLET = 48500;

export const CATEGORIES = [
  "Textbooks",
  "Gadgets",
  "Hostel",
  "Food & errands",
  "Fashion",
] as const;

export const CONDITIONS = ["New", "Like new", "Good", "Fair", "As ordered"] as const;

export const PICKUP_POINTS = [
  "Main Gate shed",
  "Faculty of Science quad",
  "Library west steps",
  "New Hostel common room",
  "Engineering porch",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type Condition = (typeof CONDITIONS)[number];
export type SortKey = "price" | "delivery" | "fairness";
export type SortDir = "asc" | "desc";

export type Person = {
  id: string;
  name: string;
  faculty: string;
  level: string;
  hostel: string;
  since: string;
  blurb: string;
};

export type Listing = {
  id: string;
  sellerId: string;
  title: string;
  category: Category;
  condition: Condition;
  price: number;
  description: string;
  pickupPoints: string[];
  deliveryFee: number | null;
};

export type Review = {
  id: string;
  sellerId: string;
  orderCode: string;
  item: string;
  kept: boolean;
  fair: boolean;
  note: string;
  when: string;
};

export type OrderStatus =
  | "held"
  | "revealed"
  | "released"
  | "rated"
  | "reported"
  | "refunded";

export type Order = {
  id: string;
  code: string;
  handover: string;
  sellerId: string;
  title: string;
  price: number;
  deliveryFee: number;
  fulfillment: "pickup" | "delivery";
  place: string;
  status: OrderStatus;
  createdAt: number;
  report?: { reason: string; note: string };
  rating?: { kept: boolean; fair: boolean };
  requestId?: string;
};

export type MarketRequest = {
  id: string;
  kind: "item" | "errand";
  title: string;
  details: string;
  budget: number;
  createdAt: number;
  orderId?: string;
};

export type Proposal = {
  id: string;
  requestId: string;
  sellerId: string;
  price: number;
  note: string;
  deliveryFee: number | null;
};

export type Score = {
  orders: number;
  kept: number;
  fair: number;
  delivery: number | null;
  fairness: number | null;
};

export type BoardFields = {
  key: string;
  title: string;
  meta: string;
  listingId?: string;
  sellerId: string;
  sellerName: string;
  price: number;
  delivery: number | null;
  fairness: number | null;
  orders: number;
  fulfillment: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function naira(n: number) {
  const sign = n < 0 ? "-" : "";
  const body = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}₦${body}`;
}

export function formatWhen(ts: number) {
  const d = new Date(ts + 60 * 60 * 1000);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

export function orderWord(n: number) {
  if (n === 0) return "No completed orders";
  if (n === 1) return "1 completed order";
  return `${n} completed orders`;
}

export function fulfillmentText(fee: number | null) {
  if (fee == null) return "Pickup only";
  if (fee === 0) return "Pickup or free delivery";
  return `Pickup or delivery +${naira(fee)}`;
}

export function sortPhrase(key: SortKey, dir: SortDir) {
  const name = key === "price" ? "price" : key === "delivery" ? "delivery trust" : "price fairness";
  const way = dir === "asc" ? "low to high" : "high to low";
  return `Sorted by ${name}, ${way}. Nothing else changes this order.`;
}

export function statusLabel(status: OrderStatus) {
  switch (status) {
    case "held":
      return "Money held — inspect first";
    case "revealed":
      return "Code revealed — seller still has to enter it";
    case "released":
      return "Paid out — two ratings left";
    case "rated":
      return "Complete";
    case "reported":
      return "Report open — money still held";
    case "refunded":
      return "Refunded to your wallet";
  }
}

export function needsYou(status: OrderStatus) {
  return status === "held" || status === "revealed" || status === "reported" || status === "released";
}

export const PEOPLE: Record<string, Person> = {
  you: {
    id: YOU_ID,
    name: "Adaeze Okonkwo",
    faculty: "Social Sciences",
    level: "300-level",
    hostel: "New Hostel",
    since: "2025",
    blurb: "You, in this preview. New Hostel, room B12. A listing you add joins the same board as everyone else.",
  },
  tunde: {
    id: "tunde",
    name: "Tunde Adeyemi",
    faculty: "Engineering",
    level: "500-level",
    hostel: "Moremi Hall",
    since: "2023",
    blurb: "Course books and small electronics out of Moremi. He describes condition in the listing and meets where he says he will.",
  },
  chioma: {
    id: "chioma",
    name: "Chioma Nwosu",
    faculty: "Law",
    level: "400-level",
    hostel: "Queen's Hall",
    since: "2024",
    blurb: "Law texts, bound notes, and the odd hostel item. Buyers usually pay exactly the price on the board.",
  },
  ibrahim: {
    id: "ibrahim",
    name: "Ibrahim Sule",
    faculty: "Sciences",
    level: "300-level",
    hostel: "Male Hostel C",
    since: "2024",
    blurb: "Calculators, lab coats, and whatever the lab list asks for this semester.",
  },
  amaka: {
    id: "amaka",
    name: "Amaka Eze",
    faculty: "Arts",
    level: "200-level",
    hostel: "New Hostel",
    since: "2025",
    blurb: "Clothes and small hostel things. She started recently, so the record is still short.",
  },
  femi: {
    id: "femi",
    name: "Femi Balogun",
    faculty: "Engineering",
    level: "400-level",
    hostel: "Male Hostel A",
    since: "2023",
    blurb: "Often the low price on a textbook. Defects are written into the description — the delivery record is a separate question.",
  },
  zainab: {
    id: "zainab",
    name: "Zainab Bello",
    faculty: "Social Sciences",
    level: "400-level",
    hostel: "Yaba, off campus",
    since: "2022",
    blurb: "Food and errands. Free pickup is the Main Gate shed. Room delivery is a fee set on the listing, not at the door.",
  },
  kelechi: {
    id: "kelechi",
    name: "Kelechi Obi",
    faculty: "Management",
    level: "300-level",
    hostel: "Male Hostel B",
    since: "2024",
    blurb: "Gadgets and a pair of sneakers. Items usually show up. The price at the door is the number to read.",
  },
};

export const LISTINGS: Listing[] = [
  {
    id: "eng-math-tunde",
    sellerId: "tunde",
    title: "Engineering Mathematics",
    category: "Textbooks",
    condition: "Good",
    price: 8500,
    description:
      "Kreyszig, maths textbook, all chapters present. No writing in the margins. Cover is scuffed, pages are clean. I meet at Engineering porch or the library steps.",
    pickupPoints: ["Engineering porch", "Library west steps", "Faculty of Science quad"],
    deliveryFee: null,
  },
  {
    id: "eng-math-chioma",
    sellerId: "chioma",
    title: "Engineering Mathematics",
    category: "Textbooks",
    condition: "Good",
    price: 6200,
    description:
      "Kreyszig maths textbook. A few pencil ticks in chapter 4, erased. Binding is tight. Pickup at the library steps or the Main Gate shed.",
    pickupPoints: ["Library west steps", "Main Gate shed", "New Hostel common room"],
    deliveryFee: null,
  },
  {
    id: "eng-math-femi",
    sellerId: "femi",
    title: "Engineering Mathematics",
    category: "Textbooks",
    condition: "Fair",
    price: 4800,
    description:
      "Kreyszig maths textbook. Fair condition on purpose: the appendix is missing and the cover is taped. The price is lower because of that. I will not claim it is complete.",
    pickupPoints: ["Engineering porch", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "contract-chioma",
    sellerId: "chioma",
    title: "Law of Contract notes",
    category: "Textbooks",
    condition: "Good",
    price: 3500,
    description:
      "Bound Nigerian case notes for contract, this session's reading list. Tabs included. Not a textbook — notes only, and the listing says so.",
    pickupPoints: ["Library west steps", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "mth-femi",
    sellerId: "femi",
    title: "MTH201 past questions",
    category: "Textbooks",
    condition: "As ordered",
    price: 1500,
    description: "Loose past questions, five years, black and white. A few pages are faint. Count them at pickup.",
    pickupPoints: ["Engineering porch", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "mth-chioma",
    sellerId: "chioma",
    title: "MTH201 past questions",
    category: "Textbooks",
    condition: "Good",
    price: 2200,
    description: "Same five years, bound, with a contents page. Print is dark enough to read.",
    pickupPoints: ["Library west steps", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "casio-ibrahim",
    sellerId: "ibrahim",
    title: "Casio fx-991ES Plus",
    category: "Gadgets",
    condition: "Like new",
    price: 9000,
    description:
      "Scientific calculator, fx-991ES Plus. Cover and battery included. Screen has no dead lines. I can walk it over for the delivery fee, or you pick it up free.",
    pickupPoints: ["Faculty of Science quad", "Engineering porch"],
    deliveryFee: 500,
  },
  {
    id: "bank-kelechi",
    sellerId: "kelechi",
    title: "Oraimo 20000mAh power bank",
    category: "Gadgets",
    condition: "Like new",
    price: 14500,
    description: "Oraimo 20000mAh. Used for one semester. Cable included. Light scratches on the back, holds a charge.",
    pickupPoints: ["Main Gate shed", "New Hostel common room", "Library west steps"],
    deliveryFee: 700,
  },
  {
    id: "bank-tunde",
    sellerId: "tunde",
    title: "Oraimo 20000mAh power bank",
    category: "Gadgets",
    condition: "New",
    price: 17500,
    description: "Oraimo 20000mAh, new in the box, seal intact. Cable in the box. Pickup only — I don't carry it across campus.",
    pickupPoints: ["Engineering porch", "Library west steps"],
    deliveryFee: null,
  },
  {
    id: "bank-femi",
    sellerId: "femi",
    title: "Unbranded 20000mAh power bank",
    category: "Gadgets",
    condition: "Fair",
    price: 9000,
    description:
      "Unbranded power bank, marked 20000mAh. It is not an Oraimo. Case is worn. It charged my phone twice yesterday. Don't pay an Oraimo price for this.",
    pickupPoints: ["Engineering porch", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "mouse-tunde",
    sellerId: "tunde",
    title: "HP wireless mouse",
    category: "Gadgets",
    condition: "Like new",
    price: 6500,
    description: "HP wireless mouse. Receiver in the slot. One battery included. Quiet click.",
    pickupPoints: ["Engineering porch", "Library west steps"],
    deliveryFee: null,
  },
  {
    id: "sneakers-kelechi",
    sellerId: "kelechi",
    title: "Campus sneakers, size 43",
    category: "Fashion",
    condition: "Like new",
    price: 12000,
    description: "Size 43. Worn for a semester and cleaned. Soles are even. Laces included. Not a boxed pair.",
    pickupPoints: ["Main Gate shed", "New Hostel common room"],
    deliveryFee: 700,
  },
  {
    id: "lamp-amaka",
    sellerId: "amaka",
    title: "Reading lamp",
    category: "Hostel",
    condition: "New",
    price: 4500,
    description: "Warm LED reading lamp, new, with a clip and a USB cable. No bulb to replace.",
    pickupPoints: ["New Hostel common room", "Main Gate shed"],
    deliveryFee: 300,
  },
  {
    id: "lamp-chioma",
    sellerId: "chioma",
    title: "Reading lamp",
    category: "Hostel",
    condition: "New",
    price: 5200,
    description: "Clip-on LED reading lamp, new in the pack. Two brightness steps. Pickup only.",
    pickupPoints: ["Library west steps", "New Hostel common room"],
    deliveryFee: null,
  },
  {
    id: "fan-chioma",
    sellerId: "chioma",
    title: "Rechargeable bedside fan",
    category: "Hostel",
    condition: "Like new",
    price: 7800,
    description: "Small rechargeable fan. Used for a few weeks. All speeds work. USB cable included.",
    pickupPoints: ["Library west steps", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "fan-kelechi",
    sellerId: "kelechi",
    title: "Rechargeable bedside fan",
    category: "Hostel",
    condition: "Good",
    price: 6500,
    description: "Rechargeable fan. One scuff on the cage. Speeds work. Cable included.",
    pickupPoints: ["Main Gate shed", "New Hostel common room"],
    deliveryFee: 600,
  },
  {
    id: "coat-ibrahim",
    sellerId: "ibrahim",
    title: "Lab coat, size M",
    category: "Hostel",
    condition: "Good",
    price: 4000,
    description: "White lab coat, size M. Washed. A pen mark on the pocket. Buttons are all there.",
    pickupPoints: ["Faculty of Science quad", "Engineering porch"],
    deliveryFee: 500,
  },
  {
    id: "ankara-amaka",
    sellerId: "amaka",
    title: "Ankara shirt, size M",
    category: "Fashion",
    condition: "New",
    price: 7000,
    description: "New Ankara shirt, size M, unworn. Blue and gold print. No alterations.",
    pickupPoints: ["New Hostel common room", "Main Gate shed"],
    deliveryFee: null,
  },
  {
    id: "jollof-zainab",
    sellerId: "zainab",
    title: "Jollof and chicken",
    category: "Food & errands",
    condition: "As ordered",
    price: 2800,
    description:
      "One plate of jollof and a piece of chicken from the Main Gate canteen. You can collect it there for free, or I walk it to your room for the delivery fee. No add-on at the door.",
    pickupPoints: ["Main Gate shed"],
    deliveryFee: 400,
  },
  {
    id: "print-zainab",
    sellerId: "zainab",
    title: "Print and bind a project",
    category: "Food & errands",
    condition: "As ordered",
    price: 2500,
    description:
      "Print and spiral-bind up to 80 black-and-white pages. Send the file when we agree. Price covers that length — more pages is a new listing, not a surprise at handover.",
    pickupPoints: ["Main Gate shed"],
    deliveryFee: 500,
  },
  {
    id: "snacks-zainab",
    sellerId: "zainab",
    title: "Meat pies and drinks",
    category: "Food & errands",
    condition: "As ordered",
    price: 2200,
    description: "Three meat pies and two bottled drinks from the Main Gate shops. Pickup at the shed, or room delivery for the fee shown.",
    pickupPoints: ["Main Gate shed"],
    deliveryFee: 300,
  },
];

const BOTH = [
  (item: string) => `${item} — exactly as listed. No extra charge.`,
  (item: string) => `Got ${item}. The price at handover was the price on the board.`,
  (item: string) => `${item} matched what we agreed. Nothing added at the door.`,
];
const PRICE_NO = [
  (item: string) => `${item} was the right item, but they asked for extra money at handover.`,
  (item: string) => `${item} matched the listing. The price did not — there was a surprise add-on.`,
  (item: string) => `${item} showed up as described. They still wanted more than the listed price.`,
];
const ITEM_NO = [
  (item: string) => `The price for ${item} was as listed, but the item was not what was promised.`,
  (item: string) => `${item} — no extra charge, yet it did not match the listing.`,
  (item: string) => `Paid the agreed price. ${item} was not the thing described.`,
];
const NEITHER = [
  (item: string) => `${item} did not match, and there was an extra charge.`,
  (item: string) => `Neither the item nor the price held up for ${item}.`,
];

function noteFor(kept: boolean, fair: boolean, item: string, i: number) {
  const pool = kept && fair ? BOTH : kept && !fair ? PRICE_NO : !kept && fair ? ITEM_NO : NEITHER;
  return pool[i % pool.length]!(item);
}

function spread(total: number, yes: number) {
  const out: boolean[] = [];
  let debt = 0;
  for (let i = 0; i < total; i++) {
    debt += yes;
    if (debt >= total) {
      out.push(true);
      debt -= total;
    } else {
      out.push(false);
    }
  }
  return out;
}

function daysBefore(index: number) {
  const d = new Date(Date.UTC(2026, 9, 2) - index * 86400000);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

const HISTORY: { id: string; total: number; kept: number; fair: number }[] = [
  { id: "tunde", total: 24, kept: 23, fair: 17 },
  { id: "chioma", total: 18, kept: 16, fair: 17 },
  { id: "ibrahim", total: 15, kept: 12, fair: 11 },
  { id: "amaka", total: 4, kept: 4, fair: 3 },
  { id: "femi", total: 11, kept: 6, fair: 9 },
  { id: "zainab", total: 31, kept: 29, fair: 28 },
  { id: "kelechi", total: 8, kept: 7, fair: 5 },
];

function buildSeed(): Review[] {
  const all: Review[] = [];
  let seq = 3100;
  for (const plan of HISTORY) {
    const items = LISTINGS.filter((l) => l.sellerId === plan.id).map((l) => l.title);
    const keptA = spread(plan.total, plan.kept);
    const fairA = spread(plan.total, plan.fair).reverse();
    for (let i = 0; i < plan.total; i++) {
      const item = items[i % items.length] ?? "the order";
      const kept = keptA[i]!;
      const fair = fairA[i]!;
      seq += 1;
      all.push({
        id: `${plan.id}-${i}`,
        sellerId: plan.id,
        orderCode: `OJ-${seq}`,
        item,
        kept,
        fair,
        note: noteFor(kept, fair, item, i),
        when: daysBefore(i),
      });
    }
  }
  return all;
}

export const SEED_REVIEWS: Review[] = buildSeed();

export function scoreFrom(reviews: Review[]): Score {
  const orders = reviews.length;
  const kept = reviews.filter((r) => r.kept).length;
  const fair = reviews.filter((r) => r.fair).length;
  return {
    orders,
    kept,
    fair,
    delivery: orders ? Math.round((kept / orders) * 100) : null,
    fairness: orders ? Math.round((fair / orders) * 100) : null,
  };
}

for (const plan of HISTORY) {
  const got = scoreFrom(SEED_REVIEWS.filter((r) => r.sellerId === plan.id));
  if (got.orders !== plan.total || got.kept !== plan.kept || got.fair !== plan.fair) {
    throw new Error(
      `Seed mismatch for ${plan.id}: expected ${plan.kept}/${plan.fair}/${plan.total} got ${got.kept}/${got.fair}/${got.orders}`,
    );
  }
}

export function scoreForSeller(sellerId: string, extra: Review[]) {
  const reviews = [
    ...extra.filter((r) => r.sellerId === sellerId),
    ...SEED_REVIEWS.filter((r) => r.sellerId === sellerId),
  ];
  return { ...scoreFrom(reviews), reviews };
}

export function insight(score: Score) {
  if (score.delivery == null || score.fairness == null) return null;
  const gap = score.delivery - score.fairness;
  if (gap >= 15) {
    return "Delivery trust is well ahead of price fairness. An honest handover can still be an expensive one.";
  }
  if (gap <= -15) {
    return "Price fairness is ahead of delivery trust. A fair listed price only helps if the item shows up as promised.";
  }
  return null;
}

export function thinSample(orders: number) {
  if (orders > 0 && orders < 5) {
    return "Only a few completed orders. These percentages are real, but they can swing.";
  }
  return null;
}

export function listingFields(listing: Listing, extra: Review[]): BoardFields {
  const seller = PEOPLE[listing.sellerId];
  const score = scoreForSeller(listing.sellerId, extra);
  return {
    key: listing.id,
    title: listing.title,
    meta: `${listing.condition} · ${listing.category}`,
    listingId: listing.id,
    sellerId: listing.sellerId,
    sellerName: seller?.name ?? "Seller",
    price: listing.price,
    delivery: score.delivery,
    fairness: score.fairness,
    orders: score.orders,
    fulfillment: fulfillmentText(listing.deliveryFee),
  };
}

export function proposalFields(proposal: Proposal, extra: Review[]): BoardFields {
  const seller = PEOPLE[proposal.sellerId];
  const score = scoreForSeller(proposal.sellerId, extra);
  return {
    key: proposal.id,
    title: proposal.note,
    meta: "Offer",
    sellerId: proposal.sellerId,
    sellerName: seller?.name ?? "Seller",
    price: proposal.price,
    delivery: score.delivery,
    fairness: score.fairness,
    orders: score.orders,
    fulfillment: fulfillmentText(proposal.deliveryFee),
  };
}

export function matchListing(listing: Listing, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const seller = PEOPLE[listing.sellerId];
  const hay = `${listing.title} ${listing.category} ${listing.condition} ${listing.description} ${seller?.name ?? ""}`.toLowerCase();
  const flat = hay.replace(/\s+/g, "");
  return query.split(/\s+/).filter(Boolean).every((word) => {
    const token = word.replace(/\s+/g, "");
    return hay.includes(word) || flat.includes(token);
  });
}

export function sortBoard<T extends Pick<BoardFields, "title" | "price" | "delivery" | "fairness">>(
  rows: T[],
  key: SortKey,
  dir: SortDir,
) {
  const value = (row: T) => (key === "price" ? row.price : key === "delivery" ? row.delivery : row.fairness);
  return [...rows].sort((a, b) => {
    const av = value(a);
    const bv = value(b);
    if (av == null && bv == null) return a.title.localeCompare(b.title);
    if (av == null) return 1;
    if (bv == null) return -1;
    if (av !== bv) return dir === "asc" ? av - bv : bv - av;
    return a.title.localeCompare(b.title);
  });
}

export function walletFrom(orders: Order[]) {
  let spent = 0;
  let held = 0;
  let released = 0;
  for (const order of orders) {
    if (order.status === "refunded") continue;
    const total = order.price + order.deliveryFee;
    spent += total;
    if (order.status === "held" || order.status === "revealed" || order.status === "reported") held += total;
    if (order.status === "released" || order.status === "rated") released += total;
  }
  return { spendable: START_WALLET - spent, held, released, spent };
}

export function groupPin(pin: string) {
  return `${pin.slice(0, 3)} ${pin.slice(3)}`;
}
