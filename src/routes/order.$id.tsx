import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { groupPin, naira, PEOPLE, scoreForSeller, statusLabel } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { ScorePair } from "@/components/oja/scores";
import { Missing, Shell } from "@/components/oja/shell";
import { Button, fieldClass, textLink } from "@/components/oja/ui";

export const Route = createFileRoute("/order/$id")({
  head: () => ({ meta: [{ title: "Order — Oja" }] }),
  component: OrderPage,
});

const REASONS = ["Not what was promised", "They asked for extra money", "They did not show up"];

function OrderPage() {
  const { id } = Route.useParams();
  const ready = useHydrated();
  const order = useOja((s) => s.orders.find((o) => o.id === id));
  const extra = useOja((s) => s.extraReviews);
  const reveal = useOja((s) => s.reveal);
  const enterCode = useOja((s) => s.enterCode);
  const rate = useOja((s) => s.rate);
  const report = useOja((s) => s.report);
  const refund = useOja((s) => s.refund);
  const resume = useOja((s) => s.resume);

  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Opening this order…</p>
      </Shell>
    );
  }
  if (!order) return <Missing title="No order with that id." body="It isn't in this preview." />;

  const seller = PEOPLE[order.sellerId];
  const total = order.price + order.deliveryFee;
  const score = scoreForSeller(order.sellerId, extra);

  return (
    <Shell>
      <p className="text-sm text-muted">{order.code}</p>
      <h1 className="mt-1 text-4xl">{order.title}</h1>
      <p className="mt-2 text-sm text-muted">{statusLabel(order.status)}</p>
      <p className="mt-4 font-display text-4xl tabular-nums">{naira(total)}</p>
      <p className="mt-1 max-w-xl">
        {order.status === "refunded"
          ? "This came back to your practice wallet. It was never sent to the seller."
          : order.status === "released" || order.status === "rated"
            ? `Released to ${seller?.name ?? "the seller"} after they entered the code.`
            : `Held. Not sent to ${seller?.name ?? "the seller"}.`}
      </p>
      <p className="mt-2 text-sm text-muted">
        {order.fulfillment === "pickup" ? `Free pickup · ${order.place}` : `Deliver to ${order.place}`}
        {order.deliveryFee > 0 ? ` · delivery ${naira(order.deliveryFee)}` : ""}
      </p>
      {seller ? (
        <p className="mt-3">
          <Link to="/seller/$id" params={{ id: seller.id }} className={textLink}>
            {seller.name}
          </Link>
        </p>
      ) : null}

      {order.status === "reported" || order.status === "refunded" ? null : <Stepper status={order.status} />}

      {order.status === "held" ? <Held orderId={order.id} onReveal={() => reveal(order.id)} onReport={report} /> : null}
      {order.status === "revealed" ? (
        <Revealed pin={order.handover} onEnter={(code) => enterCode(order.id, code)} onReport={report} orderId={order.id} />
      ) : null}
      {order.status === "released" ? <Rate onRate={(kept, fair) => rate(order.id, kept, fair)} /> : null}
      {order.status === "rated" && order.rating ? (
        <section className="mt-8 max-w-xl">
          <h2 className="text-2xl">Your two answers</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-moss p-4">
              <dt className="text-sm font-medium text-primary">Got what was promised</dt>
              <dd className="mt-1 text-lg font-medium">{order.rating.kept ? "Yes" : "No"}</dd>
            </div>
            <div className="rounded-2xl bg-sand p-4">
              <dt className="text-sm font-medium text-clay">Price was fair</dt>
              <dd className="mt-1 text-lg font-medium">{order.rating.fair ? "Yes" : "No"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted">Each answer moved one score. They were not averaged.</p>
          <div className="mt-4">
            <ScorePair score={score} />
          </div>
        </section>
      ) : null}
      {order.status === "reported" ? (
        <ReportOpen
          reason={order.report?.reason ?? "Report"}
          note={order.report?.note ?? ""}
          onRefund={() => refund(order.id)}
          onResume={() => resume(order.id)}
        />
      ) : null}
      {order.status === "refunded" ? (
        <p className="mt-8 max-w-xl text-sm text-muted">No ratings were recorded. A refund is not a completed order.</p>
      ) : null}
    </Shell>
  );
}

function Stepper({ status }: { status: "held" | "revealed" | "released" | "rated" }) {
  const labels = ["Money held", "You reveal", "Seller enters", "Two ratings"];
  const current = status === "held" ? 1 : status === "revealed" ? 2 : status === "released" ? 3 : 4;
  return (
    <ol className="mt-6 grid grid-cols-4 gap-2 text-xs" aria-label="Order progress">
      {labels.map((label, index) => {
        const done = index < current;
        const now = index === current;
        return (
          <li key={label} className={done || now ? "text-fg" : "text-muted"} aria-current={now ? "step" : undefined}>
            <span className={`mb-1 block h-1 rounded-full ${done || now ? "bg-primary" : "bg-border"}`} />
            {label}
          </li>
        );
      })}
    </ol>
  );
}

function Held({
  orderId,
  onReveal,
  onReport,
}: {
  orderId: string;
  onReveal: () => void;
  onReport: (id: string, reason: string, note: string) => void;
}) {
  const [reporting, setReporting] = useState(false);
  return (
    <section className="mt-8 max-w-xl">
      <h2 className="text-2xl">Inspect, then decide</h2>
      <p className="mt-2">
        Check the item against the listing. Check the price against what you are holding. The code stays hidden until you reveal it.
      </p>
      {reporting ? (
        <ReportForm
          onCancel={() => setReporting(false)}
          onSubmit={(reason, note) => onReport(orderId, reason, note)}
        />
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button type="button" onClick={onReveal}>
            I’m satisfied — reveal the code
          </Button>
          <Button type="button" variant="surface" onClick={() => setReporting(true)}>
            Something’s wrong
          </Button>
        </div>
      )}
    </section>
  );
}

function Revealed({
  pin,
  orderId,
  onEnter,
  onReport,
}: {
  pin: string;
  orderId: string;
  onEnter: (code: string) => "ok" | "bad" | "closed";
  onReport: (id: string, reason: string, note: string) => void;
}) {
  const [code, setCode] = useState("");
  const [bad, setBad] = useState(false);
  const [reporting, setReporting] = useState(false);
  return (
    <section className="mt-8 max-w-xl">
      <h2 className="text-2xl">Your code</h2>
      <p className="mt-2">Read this out only because you are happy with the item. Hiding it again means filing a report.</p>
      <p className="oja-rise mt-4 font-display text-5xl tracking-widest tabular-nums">{groupPin(pin)}</p>
      <div className="mt-6 rounded-2xl bg-fg p-5 text-bg">
        <p className="text-sm text-sand">Seller’s step</p>
        <h3 className="mt-1 text-2xl text-bg">They type the code to take the money</h3>
        <p className="mt-2 text-sm text-sand">You already revealed it. A tap from you does not release anything.</p>
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            const result = onEnter(code);
            setBad(result === "bad");
          }}
        >
          <label className="text-sm" htmlFor="handover">
            Handover code
          </label>
          <input
            id="handover"
            inputMode="numeric"
            autoComplete="off"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setBad(false);
            }}
            className={`${fieldClass} mt-1.5 tracking-widest`}
          />
          {bad ? <p className="mt-2 text-sm font-medium">That isn’t the code. The money stays held.</p> : null}
          <Button type="submit" className="mt-3" disabled={code.length !== 6}>
            Enter code and release the money
          </Button>
        </form>
      </div>
      {reporting ? (
        <ReportForm onCancel={() => setReporting(false)} onSubmit={(reason, note) => onReport(orderId, reason, note)} />
      ) : (
        <button type="button" className={`${textLink} mt-4`} onClick={() => setReporting(true)}>
          Something’s wrong — hide the code and report
        </button>
      )}
    </section>
  );
}

function Rate({ onRate }: { onRate: (kept: boolean, fair: boolean) => void }) {
  const [kept, setKept] = useState<boolean | null>(null);
  const [fair, setFair] = useState<boolean | null>(null);
  return (
    <section className="mt-8 max-w-xl">
      <h2 className="text-2xl">Two ratings</h2>
      <p className="mt-2">These stay separate. Oja will not average them into one score.</p>
      <Choice legend="Did you get exactly what was promised?" value={kept} onChange={setKept} />
      <Choice legend="Was the price fair, with no surprise extras?" value={fair} onChange={setFair} />
      <Button
        type="button"
        className="mt-4"
        disabled={kept == null || fair == null}
        onClick={() => {
          if (kept == null || fair == null) return;
          onRate(kept, fair);
        }}
      >
        Save the two answers
      </Button>
    </section>
  );
}

function Choice({
  legend,
  value,
  onChange,
}: {
  legend: string;
  value: boolean | null;
  onChange: (next: boolean) => void;
}) {
  return (
    <fieldset className="mt-4">
      <legend className="font-medium">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button type="button" variant={value === true ? "ink" : "surface"} aria-pressed={value === true} onClick={() => onChange(true)}>
          Yes
        </Button>
        <Button type="button" variant={value === false ? "ink" : "surface"} aria-pressed={value === false} onClick={() => onChange(false)}>
          No
        </Button>
      </div>
    </fieldset>
  );
}

function ReportForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (reason: string, note: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState(REASONS[0]!);
  const [note, setNote] = useState("");
  return (
    <form
      className="mt-4 grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(reason, note);
      }}
    >
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">What went wrong?</legend>
        {REASONS.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="reason"
              className="size-4 accent-primary"
              checked={reason === item}
              onChange={() => setReason(item)}
            />
            {item}
          </label>
        ))}
      </fieldset>
      <label className="text-sm font-medium">
        Note, if you want one
        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-1.5 min-h-20 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base" />
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit">Hold the money and file this</Button>
        <Button type="button" variant="surface" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function ReportOpen({
  reason,
  note,
  onRefund,
  onResume,
}: {
  reason: string;
  note: string;
  onRefund: () => void;
  onResume: () => void;
}) {
  return (
    <section className="mt-8 max-w-xl">
      <h2 className="text-2xl">Report open</h2>
      <p className="mt-2">Money stays held until this is resolved. The code is hidden again.</p>
      <p className="mt-3 font-medium">{reason}</p>
      {note ? <p className="mt-1 text-sm">{note}</p> : null}
      <p className="mt-3 text-sm text-muted">
        In this preview you resolve it yourself, the way a campus desk would. The money does not move until you do.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={onRefund}>
          Resolve: refund my wallet
        </Button>
        <Button type="button" variant="surface" onClick={onResume}>
          We sorted it — back to inspection
        </Button>
      </div>
    </section>
  );
}
