import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { naira, PEOPLE, proposalFields, scoreForSeller, sortBoard, LISTINGS } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { HoldForm } from "@/components/oja/hold-form";
import { ScoreLegend } from "@/components/oja/scores";
import { Missing, Shell } from "@/components/oja/shell";
import { Button, textLink } from "@/components/oja/ui";
import { TruthBoard } from "@/components/oja/truth-board";

export const Route = createFileRoute("/request/$id")({
  head: () => ({ meta: [{ title: "Offers — Oja" }] }),
  component: RequestPage,
});

function RequestPage() {
  const { id } = Route.useParams();
  const ready = useHydrated();
  const request = useOja((s) => s.requests.find((r) => r.id === id));
  const allProposals = useOja((s) => s.proposals);
  const proposals = allProposals.filter((p) => p.requestId === id);
  const extra = useOja((s) => s.extraReviews);
  const sortKey = useOja((s) => s.sortKey);
  const sortDir = useOja((s) => s.sortDir);
  const setSort = useOja((s) => s.setSort);
  const placeOrder = useOja((s) => s.placeOrder);
  const navigate = useNavigate();
  const [chosen, setChosen] = useState<string | null>(null);

  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Opening this request…</p>
      </Shell>
    );
  }
  if (!request) return <Missing title="That request isn't here." body="It isn't in this preview." />;

  const rows = sortBoard(
    proposals.map((p) => proposalFields(p, extra)),
    sortKey,
    sortDir,
  );
  const proposal = proposals.find((p) => p.id === chosen);
  const seller = proposal ? PEOPLE[proposal.sellerId] : null;
  const score = proposal ? scoreForSeller(proposal.sellerId, extra) : null;
  const pickupPoints = proposal
    ? [...new Set(LISTINGS.filter((l) => l.sellerId === proposal.sellerId).flatMap((l) => l.pickupPoints))]
    : [];

  return (
    <Shell>
      <p className="text-sm font-medium text-muted">{request.kind === "errand" ? "Errand" : "Item"} · up to {naira(request.budget)}</p>
      <h1 className="mt-1 text-4xl">{request.title}</h1>
      {request.details ? <p className="mt-3 max-w-2xl">{request.details}</p> : null}
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Offers at or under your budget. Sorted only by the column you pick. In this preview they arrive together; a real campus would reply over time.
      </p>

      {request.orderId ? (
        <p className="mt-6">
          <Link to="/order/$id" params={{ id: request.orderId }} className={textLink}>
            This became a protected order
          </Link>
        </p>
      ) : (
        <>
          <div className="mt-6">
            <ScoreLegend />
          </div>
          <div className="mt-4">
            <TruthBoard
              rows={rows}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={setSort}
              selectedKey={chosen ?? undefined}
              action={(row) => (
                <Button type="button" variant={chosen === row.key ? "ink" : "surface"} onClick={() => setChosen(row.key)}>
                  {chosen === row.key ? "Chosen" : "Choose"}
                </Button>
              )}
            />
          </div>
          {proposal && seller && score ? (
            <div className="mt-8 max-w-xl" id="hold">
              <h2 className="text-2xl">Hold this offer</h2>
              <p className="mt-2 text-sm text-muted">{seller.name} · {naira(proposal.price)} for the item or errand. Delivery, if any, is extra and shown below.</p>
              <HoldForm
                sellerId={seller.id}
                sellerName={seller.name}
                score={score}
                price={proposal.price}
                detail={proposal.note}
                deliveryFee={proposal.deliveryFee}
                pickupPoints={pickupPoints.length > 0 ? pickupPoints : ["Main Gate shed"]}
                onSubmit={(choice) => {
                  const result = placeOrder({
                    sellerId: proposal.sellerId,
                    title: request.title,
                    price: proposal.price,
                    deliveryFee: proposal.deliveryFee,
                    fulfillment: choice.fulfillment,
                    place: choice.place,
                    requestId: request.id,
                  });
                  if (!result.ok) return result.reason;
                  void navigate({ to: "/order/$id", params: { id: result.orderId } });
                  return null;
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </Shell>
  );
}
