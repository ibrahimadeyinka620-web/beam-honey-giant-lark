import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as scoreForSeller, a as LISTINGS, j as useOja, k as textLink, l as PageHeader, o as Missing, s as PEOPLE, u as Shell } from "./shell-JYFqk6o-.mjs";
import { l as useHydrated, o as Route$4 } from "./router-BDTGt7T8.mjs";
import { t as HoldForm } from "./hold-form-5W467Sc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout._listingId-B7PuLe95.js
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { listingId } = Route$4.useParams();
	const ready = useHydrated();
	const mine = useOja((s) => s.myListings);
	const extra = useOja((s) => s.extraReviews);
	const placeOrder = useOja((s) => s.placeOrder);
	const navigate = useNavigate();
	const listing = [...mine, ...LISTINGS].find((l) => l.id === listingId);
	if (!listing) {
		if (listingId.startsWith("mine-") && !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Opening escrow…"
		}) });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
			title: "That listing isn't here.",
			body: "There is nothing to hold money against."
		});
	}
	const seller = PEOPLE[listing.sellerId];
	if (!seller) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		title: "Seller missing.",
		body: "This listing has no seller on the campus preview."
	});
	if (listing.sellerId === "you") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "This is your listing",
		lede: "You can't hold money on your own item."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/listing/$id",
		params: { id: listing.id },
		className: `${textLink} mt-6 inline-flex h-11 items-center`,
		children: "Back to the listing"
	})] });
	const score = scoreForSeller(listing.sellerId, extra);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Escrow",
		title: listing.title,
		lede: "Choose pickup or delivery, then hold the money. It is not sent to the seller."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldForm, {
		sellerId: seller.id,
		sellerName: seller.name,
		score,
		price: listing.price,
		detail: `${listing.condition} · ${listing.category}`,
		deliveryFee: listing.deliveryFee,
		pickupPoints: listing.pickupPoints,
		onSubmit: (choice) => {
			const result = placeOrder({
				sellerId: listing.sellerId,
				title: listing.title,
				price: listing.price,
				deliveryFee: listing.deliveryFee,
				fulfillment: choice.fulfillment,
				place: choice.place
			});
			if (!result.ok) return result.reason;
			navigate({
				to: "/order/$id",
				params: { id: result.orderId }
			});
			return null;
		}
	})] });
}
//#endregion
export { CheckoutPage as component };
