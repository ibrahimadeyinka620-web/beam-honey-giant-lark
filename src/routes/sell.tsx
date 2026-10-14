import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  CATEGORIES,
  CONDITIONS,
  fulfillmentText,
  naira,
  PICKUP_POINTS,
  scoreForSeller,
  YOU_ID,
  type Category,
  type Condition,
} from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { ScorePair } from "@/components/oja/scores";
import { Shell } from "@/components/oja/shell";
import { Button, Field, areaClass, fieldClass, PageHeader, textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/sell")({
  head: () => ({ meta: [{ title: "Sell — Oja" }] }),
  component: SellPage,
});

function SellPage() {
  const ready = useHydrated();
  const extra = useOja((s) => s.extraReviews);
  const mine = useOja((s) => s.myListings);
  const addListing = useOja((s) => s.addListing);
  const removeListing = useOja((s) => s.removeListing);
  const navigate = useNavigate();
  const score = scoreForSeller(YOU_ID, extra);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Hostel");
  const [condition, setCondition] = useState<Condition>("Good");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<string[]>(["New Hostel common room"]);
  const [delivery, setDelivery] = useState(false);
  const [fee, setFee] = useState("");
  const [error, setError] = useState<string | null>(null);

  function togglePoint(point: string) {
    setPoints((current) => (current.includes(point) ? current.filter((p) => p !== point) : [...current, point]));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const name = title.trim();
    const amount = Number(price);
    const about = description.trim();
    if (name.length < 3) {
      setError("Give the listing a name.");
      return;
    }
    if (!Number.isInteger(amount) || amount <= 0 || amount > 1_000_000) {
      setError("Set a price in naira, up to ₦1,000,000.");
      return;
    }
    if (about.length < 10) {
      setError("Describe the condition, what’s included, and what isn’t.");
      return;
    }
    if (points.length === 0) {
      setError("Pick at least one free pickup point.");
      return;
    }
    let deliveryFee: number | null = null;
    if (delivery) {
      if (fee.trim() === "" || !Number.isInteger(Number(fee)) || Number(fee) < 0) {
        setError("Set a delivery fee, or turn delivery off. Type 0 if you want it free.");
        return;
      }
      deliveryFee = Number(fee);
    }
    const id = addListing({
      title: name,
      category,
      condition,
      price: amount,
      description: about,
      pickupPoints: points,
      deliveryFee,
    });
    void navigate({ to: "/listing/$id", params: { id } });
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="Sell"
        title="Put it on the board"
        lede="Your listing is sorted like everyone else’s. Buyers see two scores, or a blank until a completed order exists."
      />
      <div className="mt-6 max-w-xl">
        <ScorePair score={score} />
        <p className="mt-3 text-sm text-muted">
          You are the only buyer in this preview, so you can’t purchase your own listing. It still appears on the truth board the way another student would see it.
        </p>
      </div>

      <form onSubmit={submit} className="mt-8 grid max-w-xl gap-4">
        <Field label="Title">
          <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category">
            <select className={fieldClass} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Condition">
            <select className={fieldClass} value={condition} onChange={(e) => setCondition(e.target.value as Condition)}>
              {CONDITIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Price" hint="The item only. Delivery is a separate fee.">
          <input className={fieldClass} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Description">
          <textarea className={areaClass} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <fieldset>
          <legend className="text-sm font-medium">Free pickup points</legend>
          <div className="mt-2 grid gap-2">
            {PICKUP_POINTS.map((point) => (
              <label key={point} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={points.includes(point)}
                  onChange={() => togglePoint(point)}
                />
                {point}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" className="size-4 accent-primary" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
          Offer delivery to a room, with a fee I set now
        </label>
        {delivery ? (
          <Field label="Delivery fee" hint="Type 0 if room delivery is free.">
            <input className={fieldClass} inputMode="numeric" value={fee} onChange={(e) => setFee(e.target.value.replace(/\D/g, ""))} />
          </Field>
        ) : null}
        {error ? <p className="text-sm">{error}</p> : null}
        <Button type="submit" className="w-full sm:w-auto">
          Publish on the board
        </Button>
      </form>

      <section className="mt-12">
        <h2 className="text-2xl">Your listings</h2>
        {!ready ? <p className="mt-3 text-sm text-muted">Opening your listings…</p> : null}
        {ready && mine.length === 0 ? <p className="mt-3 text-sm text-muted">Nothing of yours is on the board yet.</p> : null}
        {ready && mine.length > 0 ? (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {mine.map((listing) => (
              <li key={listing.id} className="flex items-center justify-between gap-3 py-3">
                <span>
                  <Link to="/listing/$id" params={{ id: listing.id }} className={textLink}>
                    {listing.title}
                  </Link>
                  <span className="mt-1 block text-sm text-muted">{fulfillmentText(listing.deliveryFee)}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="tabular-nums">{naira(listing.price)}</span>
                  <button type="button" className="text-sm underline" onClick={() => removeListing(listing.id)}>
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </Shell>
  );
}
