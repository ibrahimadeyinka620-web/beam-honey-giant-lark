import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  insight,
  LISTINGS,
  naira,
  orderWord,
  PEOPLE,
  scoreForSeller,
  thinSample,
  YOU_ID,
} from "@/lib/oja/data";
import { useOja } from "@/lib/oja/store";
import { ScorePair } from "@/components/oja/scores";
import { Missing, Shell } from "@/components/oja/shell";
import { textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/seller/$id")({
  head: ({ params }) => {
    const person = PEOPLE[params.id];
    return { meta: [{ title: person ? `${person.name} — Oja` : "Seller — Oja" }] };
  },
  component: SellerPage,
});

function SellerPage() {
  const { id } = Route.useParams();
  const person = PEOPLE[id];
  const extra = useOja((s) => s.extraReviews);
  const mine = useOja((s) => s.myListings);
  const [showAll, setShowAll] = useState(false);
  if (!person) return <Missing title="No seller by that name." body="They aren't on this campus preview." />;

  const scored = scoreForSeller(id, extra);
  const note = insight(scored);
  const thin = thinSample(scored.orders);
  const visible = showAll ? scored.reviews : scored.reviews.slice(0, 4);
  const listed = [...mine, ...LISTINGS].filter((l) => l.sellerId === id);

  return (
    <Shell>
      <p className="text-sm font-medium text-muted">
        {person.faculty} · {person.level} · {person.hostel}
      </p>
      <h1 className="mt-1 text-4xl md:text-5xl">{person.name}</h1>
      <p className="mt-3 max-w-2xl">{person.blurb}</p>
      <p className="mt-2 text-sm text-muted">On Creek Campus since {person.since}</p>

      <div className="mt-6 max-w-xl">
        <ScorePair score={scored} size="lg" />
      </div>
      {note ? <p className="mt-4 max-w-xl text-sm">{note}</p> : null}
      {thin ? <p className="mt-2 max-w-xl text-sm text-muted">{thin}</p> : null}
      {scored.orders === 0 ? (
        <p className="mt-4 max-w-xl text-sm text-muted">
          No completed orders yet. There is no delivery trust score and no price fairness score until there is one.
        </p>
      ) : null}

      <section className="mt-8 max-w-xl">
        <h2 className="text-2xl">Experience</h2>
        <p className="mt-2">{orderWord(scored.orders)}</p>
        <p className="mt-1 text-sm text-muted">That count is finished orders only. It is not a badge, and it is not mixed into one rank.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">On the board now</h2>
        {listed.length === 0 ? (
          <p className="mt-2 text-sm text-muted">{id === YOU_ID ? "You haven't listed anything yet." : "Nothing listed right now."}</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {listed.map((listing) => (
              <li key={listing.id} className="flex items-center justify-between gap-3 py-3">
                <Link to="/listing/$id" params={{ id: listing.id }} className={textLink}>
                  {listing.title}
                </Link>
                <span className="shrink-0 tabular-nums">{naira(listing.price)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-2xl">Reviews from completed orders</h2>
        <p className="mt-2 text-sm text-muted">
          Every review is tied to a finished order. The two scores count all of them. Showing {visible.length} of {scored.reviews.length}.
        </p>
        {scored.reviews.length === 0 ? <p className="mt-4 text-sm">None yet.</p> : null}
        <div>
          {visible.map((review) => (
            <article key={review.id} className="border-b border-border py-4">
              <p className="text-sm text-muted">
                {review.orderCode} · {review.when}
              </p>
              <h3 className="mt-1 text-lg">{review.item}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-sm font-medium text-primary">Got what was promised</dt>
                  <dd className="mt-1 font-medium">{review.kept ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-clay">Price was fair</dt>
                  <dd className="mt-1 font-medium">{review.fair ? "Yes" : "No"}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm">{review.note}</p>
            </article>
          ))}
        </div>
        {scored.reviews.length > 4 ? (
          <button type="button" className={`${textLink} mt-4`} onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show the latest four" : `Show all ${scored.reviews.length} reviews`}
          </button>
        ) : null}
      </section>
    </Shell>
  );
}
