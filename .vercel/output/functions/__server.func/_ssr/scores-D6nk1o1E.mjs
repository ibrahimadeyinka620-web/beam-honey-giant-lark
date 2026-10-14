import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as orderWord, p as cn } from "./shell-JYFqk6o-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scores-D6nk1o1E.js
var import_jsx_runtime = require_jsx_runtime();
function figure(value) {
	if (value == null) return "—";
	return `${value}%`;
}
function ScorePair({ score, size = "md" }) {
	const number = size === "lg" ? "text-5xl" : "text-3xl";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
			label: "Delivery trust",
			tone: "primary",
			value: figure(score.delivery),
			detail: score.orders === 0 ? "No completed orders" : orderWord(score.orders),
			numberClass: number,
			described: score.delivery == null ? "Delivery trust, no completed orders yet" : `Delivery trust ${score.delivery} percent from ${score.orders} orders`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
			label: "Price fairness",
			tone: "clay",
			value: figure(score.fairness),
			detail: score.orders === 0 ? "No completed orders" : orderWord(score.orders),
			numberClass: number,
			described: score.fairness == null ? "Price fairness, no completed orders yet" : `Price fairness ${score.fairness} percent from ${score.orders} orders`
		})]
	});
}
function Cell({ label, tone, value, detail, numberClass, described }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("bg-bg p-4", tone === "primary" ? "bg-moss" : "bg-sand"),
		"aria-label": described,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-sm font-medium", tone === "primary" ? "text-primary" : "text-clay"),
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 font-display tabular-nums text-fg", numberClass),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: detail
			})
		]
	});
}
function ScoreLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-primary",
				children: "Delivery trust"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: " — did buyers get exactly what was promised?"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-clay",
				children: "Price fairness"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: " — was the price fair, with no surprise extras?"
			})]
		})]
	});
}
//#endregion
export { ScorePair as n, ScoreLegend as t };
