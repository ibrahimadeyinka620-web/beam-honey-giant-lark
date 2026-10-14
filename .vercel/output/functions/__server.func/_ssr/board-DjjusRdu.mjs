import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as sortBoard, a as LISTINGS, b as matchListing, j as useOja, k as textLink, l as PageHeader, n as CATEGORIES, p as cn, u as Shell, y as listingFields } from "./shell-JYFqk6o-.mjs";
import { c as Route$9 } from "./router-BDTGt7T8.mjs";
import { t as SearchForm } from "./search-form-OEomf1mI.mjs";
import { t as ScoreLegend } from "./scores-D6nk1o1E.mjs";
import { t as TruthBoard } from "./truth-board-DO6L10Mm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-DjjusRdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoardPage() {
	const { q } = Route$9.useSearch();
	const extra = useOja((s) => s.extraReviews);
	const mine = useOja((s) => s.myListings);
	const sortKey = useOja((s) => s.sortKey);
	const sortDir = useOja((s) => s.sortDir);
	const setSort = useOja((s) => s.setSort);
	const [category, setCategory] = (0, import_react.useState)("All");
	const rows = sortBoard([...mine, ...LISTINGS].filter((l) => matchListing(l, q)).filter((l) => category === "All" || l.category === category).map((l) => listingFields(l, extra)), sortKey, sortDir);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Truth board",
			title: q ? `“${q}”` : "Everything listed",
			lede: "Price, delivery trust, and price fairness. You pick the sort. No paid placement, no hidden ranking."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { initial: q })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			role: "group",
			"aria-label": "Filter by category",
			children: ["All", ...CATEGORIES].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": category === item,
				onClick: () => setCategory(item),
				className: cn("inline-flex h-11 items-center rounded-full px-3 text-sm", category === item ? "bg-fg text-bg" : "border border-border bg-surface text-fg"),
				children: item
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreLegend, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [rows.length === 1 ? "1 listing." : `${rows.length} listings.`, " Price is the item. A delivery fee is separate, and you see it before anything is held."]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Nothing matches."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Post a request with your budget. Sellers reply with a price, and you compare them on this same board."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: [category !== "All" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: textLink,
						onClick: () => setCategory("All"),
						children: "Clear the category"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/requests",
						search: q ? { draft: q } : {},
						className: `${textLink} inline-flex h-11 items-center`,
						children: "Post a request"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruthBoard, {
				rows,
				sortKey,
				sortDir,
				onSort: setSort
			})
		})
	] });
}
//#endregion
export { BoardPage as component };
