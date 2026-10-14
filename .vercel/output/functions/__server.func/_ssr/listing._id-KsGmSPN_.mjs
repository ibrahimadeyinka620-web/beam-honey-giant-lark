import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as thinSample, T as scoreForSeller, a as LISTINGS, g as fulfillmentText, j as useOja, k as textLink, o as Missing, s as PEOPLE, u as Shell, v as insight, x as naira } from "./shell-JYFqk6o-.mjs";
import { a as Route$3, l as useHydrated } from "./router-BDTGt7T8.mjs";
import { n as ScorePair } from "./scores-D6nk1o1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing._id-KsGmSPN_.js
var import_jsx_runtime = require_jsx_runtime();
function ListingPage() {
	const { id } = Route$3.useParams();
	const ready = useHydrated();
	const mine = useOja((s) => s.myListings);
	const extra = useOja((s) => s.extraReviews);
	const listing = [...mine, ...LISTINGS].find((l) => l.id === id);
	if (!listing && (id.startsWith("mine-") ? !ready : true)) {
		if (id.startsWith("mine-") && !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Opening this listing…"
		}) });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
			title: "That listing isn't here.",
			body: "It may have been removed from this preview."
		});
	}
	if (!listing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		title: "That listing isn't here.",
		body: "It may have been removed from this preview."
	});
	const seller = PEOPLE[listing.sellerId];
	const score = scoreForSeller(listing.sellerId, extra);
	const note = insight(score);
	const thin = thinSample(score.orders);
	const yours = listing.sellerId === "you";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-muted",
			children: listing.category
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl md:text-5xl",
			children: listing.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-display text-4xl tabular-nums",
			children: naira(listing.price)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: listing.condition
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl",
			children: listing.description
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 max-w-xl",
			children: [
				seller ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/seller/$id",
					params: { id: seller.id },
					className: textLink,
					children: seller.name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePair, { score })
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: note
				}) : null,
				thin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: thin
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid max-w-xl gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-muted",
				children: "Pickup"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: listing.pickupPoints.join(" · ") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-muted",
				children: "Delivery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fulfillmentText(listing.deliveryFee) })] })]
		}),
		yours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-xl rounded-2xl bg-inset p-4 text-sm",
			children: "This is your listing. Other students would compare it on the truth board. You can’t hold escrow on your own item."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/checkout/$listingId",
			params: { listingId: listing.id },
			className: "mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-ink sm:w-auto",
			children: "Continue to escrow"
		})
	] });
}
//#endregion
export { ListingPage as component };
