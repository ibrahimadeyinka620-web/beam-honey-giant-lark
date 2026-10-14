import type { Score } from "@/lib/oja/data";
import { orderWord } from "@/lib/oja/data";
import { cn } from "@/lib/cn";

function figure(value: number | null) {
  if (value == null) return "—";
  return `${value}%`;
}

export function ScorePair({ score, size = "md" }: { score: Score; size?: "md" | "lg" }) {
  const number = size === "lg" ? "text-5xl" : "text-3xl";
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
      <Cell
        label="Delivery trust"
        tone="primary"
        value={figure(score.delivery)}
        detail={score.orders === 0 ? "No completed orders" : orderWord(score.orders)}
        numberClass={number}
        described={
          score.delivery == null
            ? "Delivery trust, no completed orders yet"
            : `Delivery trust ${score.delivery} percent from ${score.orders} orders`
        }
      />
      <Cell
        label="Price fairness"
        tone="clay"
        value={figure(score.fairness)}
        detail={score.orders === 0 ? "No completed orders" : orderWord(score.orders)}
        numberClass={number}
        described={
          score.fairness == null
            ? "Price fairness, no completed orders yet"
            : `Price fairness ${score.fairness} percent from ${score.orders} orders`
        }
      />
    </div>
  );
}

function Cell({
  label,
  tone,
  value,
  detail,
  numberClass,
  described,
}: {
  label: string;
  tone: "primary" | "clay";
  value: string;
  detail: string;
  numberClass: string;
  described: string;
}) {
  return (
    <div className={cn("bg-bg p-4", tone === "primary" ? "bg-moss" : "bg-sand")} aria-label={described}>
      <p className={cn("text-sm font-medium", tone === "primary" ? "text-primary" : "text-clay")}>{label}</p>
      <p className={cn("mt-2 font-display tabular-nums text-fg", numberClass)}>{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  );
}

export function ScoreLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <p className="text-sm text-fg">
        <span className="font-medium text-primary">Delivery trust</span>
        <span className="text-muted"> — did buyers get exactly what was promised?</span>
      </p>
      <p className="text-sm text-fg">
        <span className="font-medium text-clay">Price fairness</span>
        <span className="text-muted"> — was the price fair, with no surprise extras?</span>
      </p>
    </div>
  );
}
