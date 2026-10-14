import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as walletFrom, O as statusLabel, S as needsYou, h as formatWhen, j as useOja, k as textLink, l as PageHeader, u as Shell, x as naira } from "./shell-JYFqk6o-.mjs";
import { l as useHydrated } from "./router-BDTGt7T8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BR1X6Vnj.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const ready = useHydrated();
	const orders = useOja((s) => s.orders);
	const wallet = walletFrom(orders);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Escrow",
			title: "Your orders",
			lede: "Money you held, and whether it is still held."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-inset p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: "Spendable"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-xl tabular-nums",
						children: naira(wallet.spendable)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-moss p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-primary",
						children: "Held now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-xl tabular-nums",
						children: naira(wallet.held)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sand p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-clay",
						children: "Released"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-xl tabular-nums",
						children: naira(wallet.released)
					})]
				})
			]
		}),
		!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: "Opening your orders…"
		}) : null,
		ready && orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Nothing held yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Search the market, or post a request. Money moves only when you hold it in escrow."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/board",
					search: { q: "" },
					className: `${textLink} mt-4 inline-flex h-11 items-center`,
					children: "Open the truth board"
				})
			]
		}) : null,
		ready && orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-border border-y border-border",
			children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/order/$id",
				params: { id: order.id },
				className: "flex items-start justify-between gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: order.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block text-sm text-muted",
						children: [
							order.code,
							" · ",
							formatWhen(order.createdAt),
							needsYou(order.status) ? "" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm",
						children: statusLabel(order.status)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 tabular-nums",
					children: naira(order.price + order.deliveryFee)
				})]
			}) }, order.id))
		}) : null
	] });
}
//#endregion
export { OrdersPage as component };
