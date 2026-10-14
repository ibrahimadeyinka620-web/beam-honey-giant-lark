import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ChevronUp, u as ChevronDown } from "../_libs/lucide-react.mjs";
import { D as sortPhrase, k as textLink, p as cn, x as naira } from "./shell-JYFqk6o-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/truth-board-DO6L10Mm.js
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		key: "price",
		label: "Price"
	},
	{
		key: "delivery",
		label: "Delivery trust"
	},
	{
		key: "fairness",
		label: "Price fairness"
	}
];
function TruthBoard({ rows, sortKey, sortDir, onSort, selectedKey, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			role: "group",
			"aria-label": "Sort the board",
			children: SORTS.map((sort) => {
				const on = sortKey === sort.key;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => onSort(sort.key),
					className: cn("inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-medium", on ? "bg-fg text-bg" : "border border-border bg-surface text-fg"),
					children: [sort.label, on ? sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
						className: "size-4",
						"aria-hidden": true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: "size-4",
						"aria-hidden": true
					}) : null]
				}, sort.key);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: sortPhrase(sortKey, sortDir)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-col lg:hidden",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("border-t border-border py-4", selectedKey === row.key && "bg-moss px-3"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowBody, { row }), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: action(row)
				}) : null]
			}, row.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 hidden lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pr-3 font-medium",
							children: "Item"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pr-3 font-medium",
							children: "Seller"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pr-3 text-right font-medium",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pr-3 text-right font-medium",
							children: "Delivery trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pr-3 text-right font-medium",
							children: "Price fairness"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 font-medium",
							children: "Pickup or delivery"
						}),
						action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pl-3 font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Choose"
							})
						}) : null
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: cn("border-b border-border align-top", selectedKey === row.key && "bg-moss"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 pr-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { row }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: row.meta
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellerLink, { row })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 text-right font-display text-xl tabular-nums",
							children: naira(row.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
								value: row.delivery,
								orders: row.orders,
								label: "Delivery trust"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
								value: row.fairness,
								orders: row.orders,
								label: "Price fairness"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: row.fulfillment
						}),
						action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pl-3",
							children: action(row)
						}) : null
					]
				}, row.key)) })]
			})
		})
	] });
}
function RowBody({ row }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { row }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: row.meta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellerLink, { row })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shrink-0 font-display text-2xl tabular-nums",
				children: naira(row.price)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
				value: row.delivery,
				orders: row.orders,
				label: "Delivery trust",
				stacked: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
				value: row.fairness,
				orders: row.orders,
				label: "Price fairness",
				stacked: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm",
			children: row.fulfillment
		})
	] });
}
function Title({ row }) {
	if (!row.listingId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base font-medium text-fg",
		children: row.title
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/listing/$id",
		params: { id: row.listingId },
		className: `${textLink} text-base`,
		children: row.title
	});
}
function SellerLink({ row }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/seller/$id",
		params: { id: row.sellerId },
		className: "text-sm text-fg underline decoration-border underline-offset-4",
		children: row.sellerName
	});
}
function Percent({ value, orders, label, stacked = false }) {
	const text = value == null ? "No score yet" : `${value}% from ${orders} orders`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-label": `${label}, ${text}`,
		className: stacked ? "" : "",
		children: [
			stacked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs font-medium", label === "Delivery trust" ? "text-primary" : "text-clay"),
				children: label
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tabular-nums text-fg",
				children: value == null ? "—" : `${value}%`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: orders === 0 ? "No completed orders" : `${orders} orders`
			})
		]
	});
}
//#endregion
export { TruthBoard as t };
