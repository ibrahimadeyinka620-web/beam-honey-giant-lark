import { createFileRoute, Link } from "@tanstack/react-router";
import { insight, LISTINGS, PEOPLE, scoreForSeller, thinSample, YOU_ID, fulfillmentText, naira } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { ScorePair } from "@/components/oja/scores";
import { Missing, Shell } from "@/components/oja/shell";
import { textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/listing/$id")({
  head: ({ params }) => {
    const listing = LISTINGS.find((l) => l.id === params.id);
    return { meta: [{ title: listing ? `${listing.title} — Oja` : "Listing — Oja" }] };
  },
  component: ListingPage,
});

function ListingPage() {
  const { id } = Route.useParams();
  const ready = useHydrated();
  const mine = useOja((s) => s.myListings);
  const extra = useOja((s) => s.extraReviews);
  const listing = [...mine, ...LISTINGS].find((l) => l.id === id);

  if (!listing && (id.startsWith("mine-") ? !ready : true)) {
    if (id.startsWith("mine-") && !ready) {
      return (
        <Shell>
          <p className="text-muted">Opening this listing…</p>
        </Shell>
      );
    }
    return <Missing title="That listing isn't here." body="It may have been removed from this preview." />;
  }
  if (!listing) return <Missing title="That listing isn't here." body="It may have been removed from this preview." />;

  const seller = PEOPLE[listing.sellerId];
  const score = scoreForSeller(listing.sellerId, extra);
  const note = insight(score);
  const thin = thinSample(score.orders);
  const yours = listing.sellerId === YOU_ID;

  return (
    <Shell>
      <p className="text-sm font-medium text-muted">{listing.category}</p>
      <h1 className="mt-1 text-4xl md:text-5xl">{listing.title}</h1>
      <p className="mt-3 font-display text-4xl tabular-nums">{naira(listing.price)}</p>
      <p className="mt-1 text-sm text-muted">{listing.condition}</p>
      <p className="mt-4 max-w-2xl">{listing.description}</p>

      <div className="mt-6 max-w-xl">
        {seller ? (
          <Link to="/seller/$id" params={{ id: seller.id }} className={textLink}>
            {seller.name}
          </Link>
        ) : null}
        <div className="mt-3">
          <ScorePair score={score} />
        </div>
        {note ? <p className="mt-3 text-sm">{note}</p> : null}
        {thin ? <p className="mt-2 text-sm text-muted">{thin}</p> : null}
      </div>

      <dl className="mt-6 grid max-w-xl gap-3 text-sm">
        <div>
          <dt className="text-muted">Pickup</dt>
          <dd>{listing.pickupPoints.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-muted">Delivery</dt>
          <dd>{fulfillmentText(listing.deliveryFee)}</dd>
        </div>
      </dl>

      {yours ? (
        <p className="mt-6 max-w-xl rounded-2xl bg-inset p-4 text-sm">
          This is your listing. Other students would compare it on the truth board. You can’t hold escrow on your own item.
        </p>
      ) : (
        <Link
          to="/checkout/$listingId"
          params={{ listingId: listing.id }}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-ink sm:w-auto"
        >
          Continue to escrow
        </Link>
      )}
    </Shell>
  );
}
