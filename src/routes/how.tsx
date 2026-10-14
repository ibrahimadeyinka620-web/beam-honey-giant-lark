import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/oja/shell";
import { textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/how")({
  head: () => ({ meta: [{ title: "How Oja works" }] }),
  component: HowPage,
});

const STEPS = [
  {
    n: "1",
    title: "Search or request",
    body: "Type or speak what you need. If nothing is listed, post a request with your budget. Sellers can send offers.",
  },
  {
    n: "2",
    title: "Compare on the truth board",
    body: "Every matching seller is one row: price, delivery trust, price fairness, pickup or delivery. You choose how to sort. No paid placement.",
  },
  {
    n: "3",
    title: "Check the seller",
    body: "Open either score. Reviews come only from completed orders. Experience is the count of those orders — not a badge.",
  },
  {
    n: "4",
    title: "Pay into escrow",
    body: "Money is held, not sent to the seller. Choose free pickup at a campus point, or room delivery if the seller turned it on and priced it.",
  },
  {
    n: "5",
    title: "Inspect, then reveal the code",
    body: "When the item is in front of you, check it. The code stays hidden until you reveal it. The seller types that code to be paid.",
  },
  {
    n: "6",
    title: "Leave two ratings",
    body: "Did you get exactly what was promised? Was the price fair, with no surprise extras? Each answer feeds one score. They are never averaged.",
  },
];

export function HowPage() {
  return (
    <Shell>
      <p className="text-sm font-medium text-muted">Campus marketplace for students</p>
      <h1 className="mt-2 text-4xl md:text-5xl">How Oja works</h1>
      <p className="mt-3 max-w-2xl text-lg">Trust you can see. Money held until you are satisfied.</p>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-2xl">The two problems</h2>
        <p className="mt-2">On campus, two different issues get mixed together. Oja keeps them apart.</p>
        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          <div className="bg-moss p-4">
            <h3 className="text-sm font-medium text-primary">Delivery trust</h3>
            <p className="mt-2">Will the seller actually give you what they promised?</p>
          </div>
          <div className="bg-sand p-4">
            <h3 className="text-sm font-medium text-clay">Price fairness</h3>
            <p className="mt-2">Are you paying a fair price, or extra because you are stuck on campus?</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">A seller can be completely honest and still charge too much. Showing both scores side by side protects you.</p>
      </section>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-2xl">In one sentence</h2>
        <p className="mt-2 text-lg">
          You describe what you need, compare real sellers on price, delivery trust and price fairness, pay into escrow, inspect the item first, and only then release the money with a short code.
        </p>
      </section>

      <ol className="mt-10 grid gap-6">
        {STEPS.map((step) => (
          <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4">
            <span className="font-display text-3xl text-primary">{step.n}</span>
            <div>
              <h2 className="text-2xl">{step.title}</h2>
              <p className="mt-1 max-w-2xl text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 max-w-2xl">
        <h2 className="text-2xl">Why the code matters</h2>
        <p className="mt-2">
          The code stays hidden until you decide to show it. You inspect first. You reveal it only when you are happy. The seller, or the person delivering, must enter the code to get paid. Both sides take an active step — stronger evidence than a single button, and close to the cardless withdrawal pattern many students already trust.
        </p>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-xl">Optional paid delivery</h2>
          <p className="mt-2 text-sm">
            The default is free pickup at fixed campus points. A seller can turn delivery on for a listing and set the fee. At checkout you choose free pickup or “deliver to my room”, with the fee visible. Same escrow. Same inspect-then-code.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-xl">Request and proposal</h2>
          <p className="mt-2 text-sm">
            Can’t find it? Post an item or an errand with a maximum budget. Sellers reply with a price and a short note. You compare offers on the same price / delivery trust / price fairness board, pick one, and it becomes a normal protected order.
          </p>
        </article>
      </section>

      <section className="mt-12 max-w-2xl">
        <h2 className="text-2xl">What Oja never does</h2>
        <ul className="mt-4 grid gap-3">
          {[
            "Never mixes delivery trust and price fairness into one score.",
            "Never shows a review that is not tied to a completed order.",
            "Never releases your money until you inspect and reveal the code, or a report is resolved.",
            "Never ranks sellers in secret, and never takes payment for a higher spot.",
            "Never invents a delivery time, a guarantee, or a badge that is not a real completed order.",
          ].map((line) => (
            <li key={line} className="border-l-2 border-fg pl-3">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 max-w-2xl border-t border-border pt-6 text-lg">
        You see the truth, you hold the money until you are happy, and every rating comes from a real transaction.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/board" search={{ q: "" }} className={`${textLink} inline-flex h-11 items-center`}>
          Open the truth board
        </Link>
        <Link to="/requests" className={`${textLink} inline-flex h-11 items-center`}>
          Post a request
        </Link>
      </div>
    </Shell>
  );
}
