import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { formatWhen, naira } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { Shell } from "@/components/oja/shell";
import { Button, fieldClass, areaClass, Field, PageHeader } from "@/components/oja/ui";

export const Route = createFileRoute("/requests")({
  validateSearch: (search: Record<string, unknown>): { draft?: string } => {
    const draft = typeof search.draft === "string" ? search.draft.trim() : "";
    return draft ? { draft } : {};
  },
  head: () => ({ meta: [{ title: "Requests — Oja" }] }),
  component: RequestsPage,
});

function RequestsPage() {
  const { draft } = Route.useSearch();
  const ready = useHydrated();
  const requests = useOja((s) => s.requests);
  const postRequest = useOja((s) => s.postRequest);
  const navigate = useNavigate();
  const [kind, setKind] = useState<"item" | "errand">("item");
  const [title, setTitle] = useState(draft ?? "");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const name = title.trim();
    const amount = Number(budget);
    if (name.length < 3) {
      setError("Name what you need.");
      return;
    }
    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Set a maximum budget in naira.");
      return;
    }
    const id = postRequest({ kind, title: name, details: details.trim(), budget: amount });
    void navigate({ to: "/request/$id", params: { id } });
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="Request"
        title="Ask the campus"
        lede="Post an item or an errand with the most you will pay. Offers come back on the same truth board."
      />
      <p className="mt-3 max-w-2xl text-sm text-muted">
        In this preview, sellers reply straight away so you can try the whole path. On a real campus they would reply when they see the request.
      </p>
      <form onSubmit={submit} className="mt-6 grid max-w-xl gap-4">
        <fieldset>
          <legend className="text-sm font-medium">What is it?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button type="button" variant={kind === "item" ? "ink" : "surface"} aria-pressed={kind === "item"} onClick={() => setKind("item")}>
              Item
            </Button>
            <Button type="button" variant={kind === "errand" ? "ink" : "surface"} aria-pressed={kind === "errand"} onClick={() => setKind("errand")}>
              Errand
            </Button>
          </div>
        </fieldset>
        <Field label="What you need">
          <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label="Details" hint="Condition, size, where it has to get to. Optional.">
          <textarea className={areaClass} value={details} onChange={(e) => setDetails(e.target.value)} />
        </Field>
        <Field label="Maximum budget" hint="Offers above this are not shown.">
          <input
            className={fieldClass}
            inputMode="numeric"
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
          />
        </Field>
        {error ? <p className="text-sm">{error}</p> : null}
        <Button type="submit" className="w-full sm:w-auto">
          Post request
        </Button>
      </form>

      <section className="mt-12">
        <h2 className="text-2xl">Your requests</h2>
        {!ready ? <p className="mt-3 text-sm text-muted">Opening your requests…</p> : null}
        {ready && requests.length === 0 ? <p className="mt-3 text-sm text-muted">None yet.</p> : null}
        {ready && requests.length > 0 ? (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {requests.map((request) => (
              <li key={request.id}>
                <Link to="/request/$id" params={{ id: request.id }} className="flex items-center justify-between gap-3 py-3">
                  <span>
                    <span className="block font-medium">{request.title}</span>
                    <span className="text-sm text-muted">
                      {request.kind === "errand" ? "Errand" : "Item"} · {formatWhen(request.createdAt)} ·{" "}
                      {request.orderId ? "Accepted" : "Open"}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm tabular-nums">up to {naira(request.budget)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </Shell>
  );
}
