import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as thinSample, C as orderWord, T as scoreForSeller, a as LISTINGS, j as useOja, k as textLink, o as Missing, s as PEOPLE, u as Shell, v as insight, x as naira } from "./shell-JYFqk6o-.mjs";
import { n as Route } from "./router-BDTGt7T8.mjs";
import { n as ScorePair } from "./scores-D6nk1o1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller._id-CK-hcT5c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellerPage() {
	const { id } = Route.useParams();
	const person = PEOPLE[id];
	const extra = useOja((s) => s.extraReviews);
	const mine = useOja((s) => s.myListings);
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		title: "No seller by that name.",
		body: "They aren't on this campus preview."
	});
	const scored = scoreForSeller(id, extra);
	const note = insight(scored);
	const thin = thinSample(scored.orders);
	const visible = showAll ? scored.reviews : scored.reviews.slice(0, 4);
	const listed = [...mine, ...LISTINGS].filter((l) => l.sellerId === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-medium text-muted",
			children: [
				person.faculty,
				" · ",
				person.level,
				" · ",
				person.hostel
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl md:text-5xl",
			children: person.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl",
			children: person.blurb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: ["On Creek Campus since ", person.since]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePair, {
				score: scored,
				size: "lg"
			})
		}),
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm",
			children: note
		}) : null,
		thin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: thin
		}) : null,
		scored.orders === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm text-muted",
			children: "No completed orders yet. There is no delivery trust score and no price fairness score until there is one."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Experience"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: orderWord(scored.orders)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "That count is finished orders only. It is not a badge, and it is not mixed into one rank."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "On the board now"
			}), listed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: id === "you" ? "You haven't listed anything yet." : "Nothing listed right now."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border border-y border-border",
				children: listed.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listing/$id",
						params: { id: listing.id },
						className: textLink,
						children: listing.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums",
						children: naira(listing.price)
					})]
				}, listing.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Reviews from completed orders"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Every review is tied to a finished order. The two scores count all of them. Showing ",
						visible.length,
						" of ",
						scored.reviews.length,
						"."
					]
				}),
				scored.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm",
					children: "None yet."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: visible.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border-b border-border py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								review.orderCode,
								" · ",
								review.when
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-lg",
							children: review.item
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-sm font-medium text-primary",
								children: "Got what was promised"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: review.kept ? "Yes" : "No"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-sm font-medium text-clay",
								children: "Price was fair"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: review.fair ? "Yes" : "No"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: review.note
						})
					]
				}, review.id)) }),
				scored.reviews.length > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${textLink} mt-4`,
					onClick: () => setShowAll((v) => !v),
					children: showAll ? "Show the latest four" : `Show all ${scored.reviews.length} reviews`
				}) : null
			]
		})
	] });
}
//#endregion
export { SellerPage as component };
