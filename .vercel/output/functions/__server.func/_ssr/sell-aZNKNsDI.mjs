import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as scoreForSeller, c as PICKUP_POINTS, f as areaClass, g as fulfillmentText, i as Field, j as useOja, k as textLink, l as PageHeader, m as fieldClass, n as CATEGORIES, r as CONDITIONS, t as Button, u as Shell, x as naira } from "./shell-JYFqk6o-.mjs";
import { l as useHydrated } from "./router-BDTGt7T8.mjs";
import { n as ScorePair } from "./scores-D6nk1o1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-aZNKNsDI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellPage() {
	const ready = useHydrated();
	const extra = useOja((s) => s.extraReviews);
	const mine = useOja((s) => s.myListings);
	const addListing = useOja((s) => s.addListing);
	const removeListing = useOja((s) => s.removeListing);
	const navigate = useNavigate();
	const score = scoreForSeller("you", extra);
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Hostel");
	const [condition, setCondition] = (0, import_react.useState)("Good");
	const [price, setPrice] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [points, setPoints] = (0, import_react.useState)(["New Hostel common room"]);
	const [delivery, setDelivery] = (0, import_react.useState)(false);
	const [fee, setFee] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	function togglePoint(point) {
		setPoints((current) => current.includes(point) ? current.filter((p) => p !== point) : [...current, point]);
	}
	function submit(event) {
		event.preventDefault();
		const name = title.trim();
		const amount = Number(price);
		const about = description.trim();
		if (name.length < 3) {
			setError("Give the listing a name.");
			return;
		}
		if (!Number.isInteger(amount) || amount <= 0 || amount > 1e6) {
			setError("Set a price in naira, up to ₦1,000,000.");
			return;
		}
		if (about.length < 10) {
			setError("Describe the condition, what’s included, and what isn’t.");
			return;
		}
		if (points.length === 0) {
			setError("Pick at least one free pickup point.");
			return;
		}
		let deliveryFee = null;
		if (delivery) {
			if (fee.trim() === "" || !Number.isInteger(Number(fee)) || Number(fee) < 0) {
				setError("Set a delivery fee, or turn delivery off. Type 0 if you want it free.");
				return;
			}
			deliveryFee = Number(fee);
		}
		const id = addListing({
			title: name,
			category,
			condition,
			price: amount,
			description: about,
			pickupPoints: points,
			deliveryFee
		});
		navigate({
			to: "/listing/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Sell",
			title: "Put it on the board",
			lede: "Your listing is sorted like everyone else’s. Buyers see two scores, or a blank until a completed order exists."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePair, { score }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "You are the only buyer in this preview, so you can’t purchase your own listing. It still appears on the truth board the way another student would see it."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-8 grid max-w-xl gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Condition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: condition,
							onChange: (e) => setCondition(e.target.value),
							children: CONDITIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Price",
					hint: "The item only. Delivery is a separate fee.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						inputMode: "numeric",
						value: price,
						onChange: (e) => setPrice(e.target.value.replace(/\D/g, ""))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: areaClass,
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium",
					children: "Free pickup points"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: PICKUP_POINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: points.includes(point),
							onChange: () => togglePoint(point)
						}), point]
					}, point))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "size-4 accent-primary",
						checked: delivery,
						onChange: (e) => setDelivery(e.target.checked)
					}), "Offer delivery to a room, with a fee I set now"]
				}),
				delivery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Delivery fee",
					hint: "Type 0 if room delivery is free.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						inputMode: "numeric",
						value: fee,
						onChange: (e) => setFee(e.target.value.replace(/\D/g, ""))
					})
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full sm:w-auto",
					children: "Publish on the board"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Your listings"
				}),
				!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Opening your listings…"
				}) : null,
				ready && mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Nothing of yours is on the board yet."
				}) : null,
				ready && mine.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border border-y border-border",
					children: mine.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listing/$id",
							params: { id: listing.id },
							className: textLink,
							children: listing.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: fulfillmentText(listing.deliveryFee)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: naira(listing.price)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm underline",
								onClick: () => removeListing(listing.id),
								children: "Remove"
							})]
						})]
					}, listing.id))
				}) : null
			]
		})
	] });
}
//#endregion
export { SellPage as component };
