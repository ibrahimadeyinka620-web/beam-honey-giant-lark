import { Link } from "@tanstack/react-router";
import { Bike, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { naira, walletFrom, YOU_ROOM, type Score } from "@/lib/oja/data";
import { useOja } from "@/lib/oja/store";
import { cn } from "@/lib/cn";
import { ScorePair } from "@/components/oja/scores";
import { Button, fieldClass, textLink } from "@/components/oja/ui";

export type HoldChoice = { fulfillment: "pickup" | "delivery"; place: string };

export function HoldForm({
  sellerId,
  sellerName,
  score,
  price,
  detail,
  deliveryFee,
  pickupPoints,
  onSubmit,
}: {
  sellerId: string;
  sellerName: string;
  score: Score;
  price: number;
  detail?: string;
  deliveryFee: number | null;
  pickupPoints: string[];
  onSubmit: (choice: HoldChoice) => string | null;
}) {
  const orders = useOja((s) => s.orders);
  const { spendable, held } = walletFrom(orders);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [point, setPoint] = useState(pickupPoints[0] ?? "");
  const [room, setRoom] = useState(YOU_ROOM);
  const [error, setError] = useState<string | null>(null);

  const fee = mode === "delivery" ? (deliveryFee ?? 0) : 0;
  const total = price + fee;
  const short = spendable < total;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (mode === "delivery") {
      if (deliveryFee == null) return;
      if (!room.trim()) {
        setError("Add the room to deliver to.");
        return;
      }
    }
    if (mode === "pickup" && !point) {
      setError("Choose a pickup point.");
      return;
    }
    if (short) return;
    const reason = onSubmit({ fulfillment: mode, place: mode === "pickup" ? point : room.trim() });
    setError(reason);
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-sm text-muted">Seller</p>
        <Link to="/seller/$id" params={{ id: sellerId }} className={textLink}>
          {sellerName}
        </Link>
        {detail ? <p className="mt-1 text-sm text-muted">{detail}</p> : null}
        <div className="mt-3">
          <ScorePair score={score} />
        </div>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">How should it change hands?</legend>
        <label
          className={cn(
            "block rounded-2xl border p-4",
            mode === "pickup" ? "border-fg bg-surface" : "border-border bg-bg",
          )}
        >
          <span className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="fulfillment"
              className="size-4 accent-primary"
              checked={mode === "pickup"}
              onChange={() => setMode("pickup")}
            />
            <MapPin className="size-4" aria-hidden />
            Free campus pickup
          </span>
          {mode === "pickup" ? (
            <span className="mt-3 grid gap-2">
              {pickupPoints.map((spot) => (
                <label key={spot} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="point"
                    className="size-4 accent-primary"
                    checked={point === spot}
                    onChange={() => setPoint(spot)}
                  />
                  {spot}
                </label>
              ))}
            </span>
          ) : (
            <span className="mt-2 block text-sm text-muted">Fixed campus points. No fee.</span>
          )}
        </label>

        <label
          className={cn(
            "block rounded-2xl border p-4",
            deliveryFee == null && "opacity-70",
            mode === "delivery" ? "border-fg bg-surface" : "border-border bg-bg",
          )}
        >
          <span className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="fulfillment"
              className="size-4 accent-primary"
              checked={mode === "delivery"}
              disabled={deliveryFee == null}
              onChange={() => setMode("delivery")}
            />
            <Bike className="size-4" aria-hidden />
            {deliveryFee == null ? "Delivery not offered" : `Deliver to my room + ${naira(deliveryFee)}`}
          </span>
          {deliveryFee == null ? (
            <span className="mt-2 block text-sm text-muted">This seller left delivery off. Pickup stays free.</span>
          ) : mode === "delivery" ? (
            <span className="mt-3 block">
              <span className="text-sm font-medium">Room</span>
              <input className={`${fieldClass} mt-1.5`} value={room} onChange={(e) => setRoom(e.target.value)} />
            </span>
          ) : (
            <span className="mt-2 block text-sm text-muted">Same escrow. The fee is set now, not at the door.</span>
          )}
        </label>
      </fieldset>

      <dl className="grid gap-2 rounded-2xl bg-inset p-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt>Item</dt>
          <dd className="tabular-nums">{naira(price)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Delivery</dt>
          <dd className="tabular-nums">{mode === "pickup" || fee === 0 ? "Free" : naira(fee)}</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-border pt-2 text-base font-medium">
          <dt>Held in escrow</dt>
          <dd className="tabular-nums">{naira(total)}</dd>
        </div>
        <p className="text-muted">
          After this, {naira(Math.max(0, spendable - total))} stays spendable. {naira(total)} sits held, not with {sellerName}.
          {held > 0 ? ` ${naira(held)} is already held on open orders.` : ""}
        </p>
      </dl>

      {short ? (
        <p className="text-sm">
          This needs {naira(total)}. Your practice wallet has {naira(spendable)}.
        </p>
      ) : null}
      {error ? (
        <p className="text-sm" aria-live="polite">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={short} className="w-full sm:w-auto">
        Hold {naira(total)} in escrow
      </Button>
      <p className="text-sm text-muted">Oja does not guess a delivery time. You inspect, then you reveal the code.</p>
    </form>
  );
}
