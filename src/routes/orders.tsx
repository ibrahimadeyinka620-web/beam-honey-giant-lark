import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWhen, naira, needsYou, statusLabel, walletFrom } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { Shell } from "@/components/oja/shell";
import { PageHeader, textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Your orders — Oja" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const ready = useHydrated();
  const orders = useOja((s) => s.orders);
  const wallet = walletFrom(orders);

  return (
    <Shell>
      <PageHeader eyebrow="Escrow" title="Your orders" lede="Money you held, and whether it is still held." />
      <dl className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-inset p-3">
          <dt className="text-xs text-muted">Spendable</dt>
          <dd className="mt-1 font-display text-xl tabular-nums">{naira(wallet.spendable)}</dd>
        </div>
        <div className="rounded-2xl bg-moss p-3">
          <dt className="text-xs text-primary">Held now</dt>
          <dd className="mt-1 font-display text-xl tabular-nums">{naira(wallet.held)}</dd>
        </div>
        <div className="rounded-2xl bg-sand p-3">
          <dt className="text-xs text-clay">Released</dt>
          <dd className="mt-1 font-display text-xl tabular-nums">{naira(wallet.released)}</dd>
        </div>
      </dl>

      {!ready ? <p className="mt-8 text-muted">Opening your orders…</p> : null}
      {ready && orders.length === 0 ? (
        <div className="mt-8 max-w-xl">
          <h2 className="text-2xl">Nothing held yet</h2>
          <p className="mt-2 text-muted">Search the market, or post a request. Money moves only when you hold it in escrow.</p>
          <Link to="/board" search={{ q: "" }} className={`${textLink} mt-4 inline-flex h-11 items-center`}>
            Open the truth board
          </Link>
        </div>
      ) : null}
      {ready && orders.length > 0 ? (
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {orders.map((order) => (
            <li key={order.id}>
              <Link to="/order/$id" params={{ id: order.id }} className="flex items-start justify-between gap-3 py-4">
                <span>
                  <span className="block font-medium">{order.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {order.code} · {formatWhen(order.createdAt)}
                    {needsYou(order.status) ? "" : ""}
                  </span>
                  <span className="mt-1 block text-sm">{statusLabel(order.status)}</span>
                </span>
                <span className="shrink-0 tabular-nums">{naira(order.price + order.deliveryFee)}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </Shell>
  );
}
