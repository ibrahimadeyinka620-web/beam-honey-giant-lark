import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import { naira, sortPhrase, type BoardFields, type SortDir, type SortKey } from "@/lib/oja/data";
import { cn } from "@/lib/cn";
import { textLink } from "@/components/oja/ui";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "delivery", label: "Delivery trust" },
  { key: "fairness", label: "Price fairness" },
];

export function TruthBoard({
  rows,
  sortKey,
  sortDir,
  onSort,
  selectedKey,
  action,
}: {
  rows: BoardFields[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  selectedKey?: string;
  action?: (row: BoardFields) => ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sort the board">
        {SORTS.map((sort) => {
          const on = sortKey === sort.key;
          return (
            <button
              key={sort.key}
              type="button"
              aria-pressed={on}
              onClick={() => onSort(sort.key)}
              className={cn(
                "inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-medium",
                on ? "bg-fg text-bg" : "border border-border bg-surface text-fg",
              )}
            >
              {sort.label}
              {on ? sortDir === "asc" ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden /> : null}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted">{sortPhrase(sortKey, sortDir)}</p>

      <div className="mt-4 flex flex-col lg:hidden">
        {rows.map((row) => (
          <article
            key={row.key}
            className={cn("border-t border-border py-4", selectedKey === row.key && "bg-moss px-3")}
          >
            <RowBody row={row} />
            {action ? <div className="mt-3">{action(row)}</div> : null}
          </article>
        ))}
      </div>

      <div className="mt-4 hidden lg:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th scope="col" className="py-2 pr-3 font-medium">Item</th>
              <th scope="col" className="py-2 pr-3 font-medium">Seller</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Price</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Delivery trust</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Price fairness</th>
              <th scope="col" className="py-2 font-medium">Pickup or delivery</th>
              {action ? <th scope="col" className="py-2 pl-3 font-medium"><span className="sr-only">Choose</span></th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className={cn("border-b border-border align-top", selectedKey === row.key && "bg-moss")}>
                <td className="py-3 pr-3">
                  <Title row={row} />
                  <p className="mt-1 text-xs text-muted">{row.meta}</p>
                </td>
                <td className="py-3 pr-3">
                  <SellerLink row={row} />
                </td>
                <td className="py-3 pr-3 text-right font-display text-xl tabular-nums">{naira(row.price)}</td>
                <td className="py-3 pr-3 text-right">
                  <Percent value={row.delivery} orders={row.orders} label="Delivery trust" />
                </td>
                <td className="py-3 pr-3 text-right">
                  <Percent value={row.fairness} orders={row.orders} label="Price fairness" />
                </td>
                <td className="py-3">{row.fulfillment}</td>
                {action ? <td className="py-3 pl-3">{action(row)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RowBody({ row }: { row: BoardFields }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Title row={row} />
          <p className="mt-1 text-xs text-muted">{row.meta}</p>
          <div className="mt-1">
            <SellerLink row={row} />
          </div>
        </div>
        <p className="shrink-0 font-display text-2xl tabular-nums">{naira(row.price)}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Percent value={row.delivery} orders={row.orders} label="Delivery trust" stacked />
        <Percent value={row.fairness} orders={row.orders} label="Price fairness" stacked />
      </div>
      <p className="mt-3 text-sm">{row.fulfillment}</p>
    </div>
  );
}

function Title({ row }: { row: BoardFields }) {
  if (!row.listingId) return <p className="text-base font-medium text-fg">{row.title}</p>;
  return (
    <Link to="/listing/$id" params={{ id: row.listingId }} className={`${textLink} text-base`}>
      {row.title}
    </Link>
  );
}

function SellerLink({ row }: { row: BoardFields }) {
  return (
    <Link to="/seller/$id" params={{ id: row.sellerId }} className="text-sm text-fg underline decoration-border underline-offset-4">
      {row.sellerName}
    </Link>
  );
}

function Percent({
  value,
  orders,
  label,
  stacked = false,
}: {
  value: number | null;
  orders: number;
  label: string;
  stacked?: boolean;
}) {
  const text = value == null ? "No score yet" : `${value}% from ${orders} orders`;
  return (
    <div aria-label={`${label}, ${text}`} className={stacked ? "" : ""}>
      {stacked ? (
        <p className={cn("text-xs font-medium", label === "Delivery trust" ? "text-primary" : "text-clay")}>{label}</p>
      ) : null}
      <p className="font-display text-2xl tabular-nums text-fg">{value == null ? "—" : `${value}%`}</p>
      <p className="text-xs text-muted">{orders === 0 ? "No completed orders" : `${orders} orders`}</p>
    </div>
  );
}
