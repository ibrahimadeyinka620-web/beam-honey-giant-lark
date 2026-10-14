import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CATEGORIES,
  LISTINGS,
  listingFields,
  matchListing,
  sortBoard,
  type Category,
} from "@/lib/oja/data";
import { useOja } from "@/lib/oja/store";
import { SearchForm } from "@/components/oja/search-form";
import { ScoreLegend } from "@/components/oja/scores";
import { Shell } from "@/components/oja/shell";
import { TruthBoard } from "@/components/oja/truth-board";
import { PageHeader, textLink } from "@/components/oja/ui";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/board")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({ meta: [{ title: "Truth board — Oja" }] }),
  component: BoardPage,
});

function BoardPage() {
  const { q } = Route.useSearch();
  const extra = useOja((s) => s.extraReviews);
  const mine = useOja((s) => s.myListings);
  const sortKey = useOja((s) => s.sortKey);
  const sortDir = useOja((s) => s.sortDir);
  const setSort = useOja((s) => s.setSort);
  const [category, setCategory] = useState<Category | "All">("All");

  const rows = sortBoard(
    [...mine, ...LISTINGS]
      .filter((l) => matchListing(l, q))
      .filter((l) => category === "All" || l.category === category)
      .map((l) => listingFields(l, extra)),
    sortKey,
    sortDir,
  );

  return (
    <Shell>
      <PageHeader
        eyebrow="Truth board"
        title={q ? `“${q}”` : "Everything listed"}
        lede="Price, delivery trust, and price fairness. You pick the sort. No paid placement, no hidden ranking."
      />
      <div className="mt-6">
        <SearchForm initial={q} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {(["All", ...CATEGORIES] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              "inline-flex h-11 items-center rounded-full px-3 text-sm",
              category === item ? "bg-fg text-bg" : "border border-border bg-surface text-fg",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <ScoreLegend />
      </div>
      <p className="mt-4 text-sm text-muted">
        {rows.length === 1 ? "1 listing." : `${rows.length} listings.`} Price is the item. A delivery fee is separate, and you see it before anything is held.
      </p>
      {rows.length === 0 ? (
        <div className="mt-8 max-w-xl">
          <h2 className="text-2xl">Nothing matches.</h2>
          <p className="mt-2 text-muted">
            Post a request with your budget. Sellers reply with a price, and you compare them on this same board.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {category !== "All" ? (
              <button type="button" className={textLink} onClick={() => setCategory("All")}>
                Clear the category
              </button>
            ) : null}
            <Link to="/requests" search={q ? { draft: q } : {}} className={`${textLink} inline-flex h-11 items-center`}>
              Post a request
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <TruthBoard rows={rows} sortKey={sortKey} sortDir={sortDir} onSort={setSort} />
        </div>
      )}
    </Shell>
  );
}
