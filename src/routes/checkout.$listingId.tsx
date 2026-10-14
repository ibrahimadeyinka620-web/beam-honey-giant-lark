import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LISTINGS, PEOPLE, scoreForSeller, YOU_ID } from "@/lib/oja/data";
import { useHydrated } from "@/lib/oja/hydration";
import { useOja } from "@/lib/oja/store";
import { HoldForm } from "@/components/oja/hold-form";
import { Missing, Shell } from "@/components/oja/shell";
import { PageHeader, textLink } from "@/components/oja/ui";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/$listingId")({
  head: () => ({ meta: [{ title: "Escrow — Oja" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { listingId } = Route.useParams();
  const ready = useHydrated();
  const mine = useOja((s) => s.myListings);
  const extra = useOja((s) => s.extraReviews);
  const placeOrder = useOja((s) => s.placeOrder);
  const navigate = useNavigate();
  const listing = [...mine, ...LISTINGS].find((l) => l.id === listingId);

  if (!listing) {
    if (listingId.startsWith("mine-") && !ready) {
      return (
        <Shell>
          <p className="text-muted">Opening escrow…</p>
        </Shell>
      );
    }
    return <Missing title="That listing isn't here." body="There is nothing to hold money against." />;
  }

  const seller = PEOPLE[listing.sellerId];
  if (!seller) return <Missing title="Seller missing." body="This listing has no seller on the campus preview." />;

  if (listing.sellerId === YOU_ID) {
    return (
      <Shell>
        <PageHeader title="This is your listing" lede="You can't hold money on your own item." />
        <Link to="/listing/$id" params={{ id: listing.id }} className={`${textLink} mt-6 inline-flex h-11 items-center`}>
          Back to the listing
        </Link>
      </Shell>
    );
  }

  const score = scoreForSeller(listing.sellerId, extra);

  return (
    <Shell>
      <PageHeader
        eyebrow="Escrow"
        title={listing.title}
        lede="Choose pickup or delivery, then hold the money. It is not sent to the seller."
      />
      <HoldForm
        sellerId={seller.id}
        sellerName={seller.name}
        score={score}
        price={listing.price}
        detail={`${listing.condition} · ${listing.category}`}
        deliveryFee={listing.deliveryFee}
        pickupPoints={listing.pickupPoints}
        onSubmit={(choice) => {
          const result = placeOrder({
            sellerId: listing.sellerId,
            title: listing.title,
            price: listing.price,
            deliveryFee: listing.deliveryFee,
            fulfillment: choice.fulfillment,
            place: choice.place,
          });
          if (!result.ok) return result.reason;
          void navigate({ to: "/order/$id", params: { id: result.orderId } });
          return null;
        }}
      />
    </Shell>
  );
}
