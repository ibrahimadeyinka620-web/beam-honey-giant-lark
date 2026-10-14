import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as sortBoard, T as scoreForSeller, a as LISTINGS, j as useOja, k as textLink, o as Missing, s as PEOPLE, t as Button, u as Shell, w as proposalFields, x as naira } from "./shell-JYFqk6o-.mjs";
import { l as useHydrated, r as Route$1 } from "./router-BDTGt7T8.mjs";
import { t as ScoreLegend } from "./scores-D6nk1o1E.mjs";
import { t as TruthBoard } from "./truth-board-DO6L10Mm.mjs";
import { t as HoldForm } from "./hold-form-5W467Sc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request._id-BcRJMrmW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequestPage() {
	const { id } = Route$1.useParams();
	const ready = useHydrated();
	const request = useOja((s) => s.requests.find((r) => r.id === id));
	const proposals = useOja((s) => s.proposals).filter((p) => p.requestId === id);
	const extra = useOja((s) => s.extraReviews);
	const sortKey = useOja((s) => s.sortKey);
	const sortDir = useOja((s) => s.sortDir);
	const setSort = useOja((s) => s.setSort);
	const placeOrder = useOja((s) => s.placeOrder);
	const navigate = useNavigate();
	const [chosen, setChosen] = (0, import_react.useState)(null);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening this request…"
	}) });
	if (!request) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		title: "That request isn't here.",
		body: "It isn't in this preview."
	});
	const rows = sortBoard(proposals.map((p) => proposalFields(p, extra)), sortKey, sortDir);
	const proposal = proposals.find((p) => p.id === chosen);
	const seller = proposal ? PEOPLE[proposal.sellerId] : null;
	const score = proposal ? scoreForSeller(proposal.sellerId, extra) : null;
	const pickupPoints = proposal ? [...new Set(LISTINGS.filter((l) => l.sellerId === proposal.sellerId).flatMap((l) => l.pickupPoints))] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-medium text-muted",
			children: [
				request.kind === "errand" ? "Errand" : "Item",
				" · up to ",
				naira(request.budget)
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: request.title
		}),
		request.details ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl",
			children: request.details
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-sm text-muted",
			children: "Offers at or under your budget. Sorted only by the column you pick. In this preview they arrive together; a real campus would reply over time."
		}),
		request.orderId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/order/$id",
				params: { id: request.orderId },
				className: textLink,
				children: "This became a protected order"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreLegend, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruthBoard, {
					rows,
					sortKey,
					sortDir,
					onSort: setSort,
					selectedKey: chosen ?? void 0,
					action: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: chosen === row.key ? "ink" : "surface",
						onClick: () => setChosen(row.key),
						children: chosen === row.key ? "Chosen" : "Choose"
					})
				})
			}),
			proposal && seller && score ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 max-w-xl",
				id: "hold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Hold this offer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							seller.name,
							" · ",
							naira(proposal.price),
							" for the item or errand. Delivery, if any, is extra and shown below."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldForm, {
						sellerId: seller.id,
						sellerName: seller.name,
						score,
						price: proposal.price,
						detail: proposal.note,
						deliveryFee: proposal.deliveryFee,
						pickupPoints: pickupPoints.length > 0 ? pickupPoints : ["Main Gate shed"],
						onSubmit: (choice) => {
							const result = placeOrder({
								sellerId: proposal.sellerId,
								title: request.title,
								price: proposal.price,
								deliveryFee: proposal.deliveryFee,
								fulfillment: choice.fulfillment,
								place: choice.place,
								requestId: request.id
							});
							if (!result.ok) return result.reason;
							navigate({
								to: "/order/$id",
								params: { id: result.orderId }
							});
							return null;
						}
					})
				]
			}) : null
		] })
	] });
}
//#endregion
export { RequestPage as component };
