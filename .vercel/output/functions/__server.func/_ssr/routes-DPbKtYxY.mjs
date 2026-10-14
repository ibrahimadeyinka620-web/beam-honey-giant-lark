import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as sortBoard, S as needsYou, a as LISTINGS, j as useOja, k as textLink, u as Shell, x as naira, y as listingFields } from "./shell-JYFqk6o-.mjs";
import { t as SearchForm } from "./search-form-OEomf1mI.mjs";
import { t as TruthBoard } from "./truth-board-DO6L10Mm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DPbKtYxY.js
var import_jsx_runtime = require_jsx_runtime();
var QUICK = [
	["Maths textbook", "engineering mathematics"],
	["Power bank", "power bank"],
	["Jollof", "jollof"],
	["Reading lamp", "reading lamp"],
	["Past questions", "past questions"]
];
function Home() {
	const extra = useOja((s) => s.extraReviews);
	const orders = useOja((s) => s.orders);
	const sortKey = useOja((s) => s.sortKey);
	const sortDir = useOja((s) => s.sortDir);
	const setSort = useOja((s) => s.setSort);
	const sample = sortBoard(LISTINGS.filter((l) => l.title === "Engineering Mathematics").map((l) => listingFields(l, extra)), sortKey, sortDir);
	const open = orders.filter((o) => needsYou(o.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-muted",
			children: "Campus marketplace · Creek Campus"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-xl text-4xl md:text-5xl",
			children: "Trust you can see. Money held until you are satisfied."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { large: true })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: QUICK.map(([label, q]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/board",
				search: { q },
				className: "inline-flex h-11 items-center rounded-full border border-border bg-surface px-3 text-sm",
				children: label
			}, q))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 max-w-xl text-sm text-muted",
			children: [
				"Nothing listed?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/requests",
					className: textLink,
					children: "Post a request"
				}),
				" ",
				"with your budget. Sellers send offers."
			]
		}),
		open.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Still in your hands"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border border-y border-border",
				children: open.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/order/$id",
					params: { id: order.id },
					className: "flex items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: order.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: order.code
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums",
						children: naira(order.price + order.deliveryFee)
					})]
				}) }, order.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-moss p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-primary",
					children: "Delivery trust"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg text-fg",
					children: "Will the seller actually give you what they promised?"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-sand p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-clay",
					children: "Price fairness"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg text-fg",
					children: "Are you paying a fair price, or extra because you are stuck on campus?"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-sm text-muted",
			children: "A seller can be completely honest and still charge too much. Oja never blends these into one score."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Same book. Read across."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl",
					children: "Three sellers listed Engineering Mathematics. Price, delivery trust, and price fairness sit in one row. You choose the sort."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruthBoard, {
						rows: sample,
						sortKey,
						sortDir,
						onSort: setSort
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/board",
					search: { q: "engineering mathematics" },
					className: `${textLink} mt-4 inline-flex h-11 items-center`,
					children: "Open this on the full board"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "The handover code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-4 grid gap-4 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl text-primary",
									children: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-xl",
									children: "Inspect first"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "The code stays hidden while you check the item in front of you."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl text-primary",
									children: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-xl",
									children: "You reveal it"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Only when you are satisfied. A button tap alone does not pay the seller."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl text-primary",
									children: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-xl",
									children: "They type it"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "The seller enters the code to take the money. Both sides take a step."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/how",
					className: `${textLink} mt-4 inline-flex h-11 items-center`,
					children: "Read how Oja works"
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
