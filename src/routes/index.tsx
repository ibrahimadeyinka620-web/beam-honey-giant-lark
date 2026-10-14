import { createFileRoute, Link } from "@tanstack/react-router";
import { LISTINGS, listingFields, needsYou, sortBoard } from "@/lib/oja/data";
import { useOja } from "@/lib/oja/store";
import { naira } from "@/lib/oja/data";
import { SearchForm } from "@/components/oja/search-form";
import { Shell } from "@/components/oja/shell";
import { TruthBoard } from "@/components/oja/truth-board";
import { textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Oja — campus market" }] }),
  component: Home,
});

const QUICK = [
  ["Maths textbook", "engineering mathematics"],
  ["Power bank", "power bank"],
  ["Jollof", "jollof"],
  ["Reading lamp", "reading lamp"],
  ["Past questions", "past questions"],
] as const;

function Home() {
  const extra = useOja((s) => s.extraReviews);
  const orders = useOja((s) => s.orders);
  const sortKey = useOja((s) => s.sortKey);
  const sortDir = useOja((s) => s.sortDir);
  const setSort = useOja((s) => s.setSort);
  const sample = sortBoard(
    LISTINGS.filter((l) => l.title === "Engineering Mathematics").map((l) => listingFields(l, extra)),
    sortKey,
    sortDir,
  );
  const open = orders.filter((o) => needsYou(o.status));

  return (
    <Shell>
      <p className="text-sm font-medium text-muted">Campus marketplace · Creek Campus</p>
      <h1 className="mt-2 max-w-xl text-4xl md:text-5xl">Trust you can see. Money held until you are satisfied.</h1>
      <div className="mt-6">
        <SearchForm large />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map(([label, q]) => (
          <Link
            key={q}
            to="/board"
            search={{ q }}
            className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-3 text-sm"
          >
            {label}
          </Link>
        ))}
      </div>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Nothing listed?{" "}
        <Link to="/requests" className={textLink}>
          Post a request
        </Link>{" "}
        with your budget. Sellers send offers.
      </p>

      {open.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl">Still in your hands</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {open.map((order) => (
              <li key={order.id}>
                <Link to="/order/$id" params={{ id: order.id }} className="flex items-center justify-between gap-3 py-3">
                  <span>
                    <span className="block font-medium">{order.title}</span>
                    <span className="text-sm text-muted">{order.code}</span>
                  </span>
                  <span className="shrink-0 tabular-nums">{naira(order.price + order.deliveryFee)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        <div className="bg-moss p-5">
          <h2 className="text-sm font-medium text-primary">Delivery trust</h2>
          <p className="mt-2 text-lg text-fg">Will the seller actually give you what they promised?</p>
        </div>
        <div className="bg-sand p-5">
          <h2 className="text-sm font-medium text-clay">Price fairness</h2>
          <p className="mt-2 text-lg text-fg">Are you paying a fair price, or extra because you are stuck on campus?</p>
        </div>
      </section>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        A seller can be completely honest and still charge too much. Oja never blends these into one score.
      </p>

      <section className="mt-12">
        <h2 className="text-3xl">Same book. Read across.</h2>
        <p className="mt-2 max-w-2xl">
          Three sellers listed Engineering Mathematics. Price, delivery trust, and price fairness sit in one row. You choose the sort.
        </p>
        <div className="mt-4">
          <TruthBoard rows={sample} sortKey={sortKey} sortDir={sortDir} onSort={setSort} />
        </div>
        <Link to="/board" search={{ q: "engineering mathematics" }} className={`${textLink} mt-4 inline-flex h-11 items-center`}>
          Open this on the full board
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">The handover code</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-border bg-surface p-4">
            <p className="font-display text-3xl text-primary">1</p>
            <h3 className="mt-2 text-xl">Inspect first</h3>
            <p className="mt-2 text-sm text-muted">The code stays hidden while you check the item in front of you.</p>
          </li>
          <li className="rounded-2xl border border-border bg-surface p-4">
            <p className="font-display text-3xl text-primary">2</p>
            <h3 className="mt-2 text-xl">You reveal it</h3>
            <p className="mt-2 text-sm text-muted">Only when you are satisfied. A button tap alone does not pay the seller.</p>
          </li>
          <li className="rounded-2xl border border-border bg-surface p-4">
            <p className="font-display text-3xl text-primary">3</p>
            <h3 className="mt-2 text-xl">They type it</h3>
            <p className="mt-2 text-sm text-muted">The seller enters the code to take the money. Both sides take a step.</p>
          </li>
        </ol>
        <Link to="/how" className={`${textLink} mt-4 inline-flex h-11 items-center`}>
          Read how Oja works
        </Link>
      </section>
    </Shell>
  );
}
