import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Bike, s as MapPin } from "../_libs/lucide-react.mjs";
import { M as walletFrom, d as YOU_ROOM, j as useOja, k as textLink, m as fieldClass, p as cn, t as Button, x as naira } from "./shell-JYFqk6o-.mjs";
import { n as ScorePair } from "./scores-D6nk1o1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hold-form-5W467Sc6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HoldForm({ sellerId, sellerName, score, price, detail, deliveryFee, pickupPoints, onSubmit }) {
	const orders = useOja((s) => s.orders);
	const { spendable, held } = walletFrom(orders);
	const [mode, setMode] = (0, import_react.useState)("pickup");
	const [point, setPoint] = (0, import_react.useState)(pickupPoints[0] ?? "");
	const [room, setRoom] = (0, import_react.useState)(YOU_ROOM);
	const [error, setError] = (0, import_react.useState)(null);
	const fee = mode === "delivery" ? deliveryFee ?? 0 : 0;
	const total = price + fee;
	const short = spendable < total;
	function submit(event) {
		event.preventDefault();
		if (mode === "delivery") {
			if (deliveryFee == null) return;
			if (!room.trim()) {
				setError("Add the room to deliver to.");
				return;
			}
		}
		if (mode === "pickup" && !point) {
			setError("Choose a pickup point.");
			return;
		}
		if (short) return;
		const reason = onSubmit({
			fulfillment: mode,
			place: mode === "pickup" ? point : room.trim()
		});
		setError(reason);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mt-6 grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Seller"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller/$id",
						params: { id: sellerId },
						className: textLink,
						children: sellerName
					}),
					detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: detail
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePair, { score })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-medium",
						children: "How should it change hands?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("block rounded-2xl border p-4", mode === "pickup" ? "border-fg bg-surface" : "border-border bg-bg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "fulfillment",
									className: "size-4 accent-primary",
									checked: mode === "pickup",
									onChange: () => setMode("pickup")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "size-4",
									"aria-hidden": true
								}),
								"Free campus pickup"
							]
						}), mode === "pickup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 grid gap-2",
							children: pickupPoints.map((spot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "point",
									className: "size-4 accent-primary",
									checked: point === spot,
									onChange: () => setPoint(spot)
								}), spot]
							}, spot))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-sm text-muted",
							children: "Fixed campus points. No fee."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("block rounded-2xl border p-4", deliveryFee == null && "opacity-70", mode === "delivery" ? "border-fg bg-surface" : "border-border bg-bg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "fulfillment",
									className: "size-4 accent-primary",
									checked: mode === "delivery",
									disabled: deliveryFee == null,
									onChange: () => setMode("delivery")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, {
									className: "size-4",
									"aria-hidden": true
								}),
								deliveryFee == null ? "Delivery not offered" : `Deliver to my room + ${naira(deliveryFee)}`
							]
						}), deliveryFee == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-sm text-muted",
							children: "This seller left delivery off. Pickup stays free."
						}) : mode === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-3 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Room"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${fieldClass} mt-1.5`,
								value: room,
								onChange: (e) => setRoom(e.target.value)
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-sm text-muted",
							children: "Same escrow. The fee is set now, not at the door."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-2 rounded-2xl bg-inset p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: naira(price)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: mode === "pickup" || fee === 0 ? "Free" : naira(fee)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 border-t border-border pt-2 text-base font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Held in escrow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: naira(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							"After this, ",
							naira(Math.max(0, spendable - total)),
							" stays spendable. ",
							naira(total),
							" sits held, not with ",
							sellerName,
							".",
							held > 0 ? ` ${naira(held)} is already held on open orders.` : ""
						]
					})
				]
			}),
			short ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					"This needs ",
					naira(total),
					". Your practice wallet has ",
					naira(spendable),
					"."
				]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				"aria-live": "polite",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				disabled: short,
				className: "w-full sm:w-auto",
				children: [
					"Hold ",
					naira(total),
					" in escrow"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Oja does not guess a delivery time. You inspect, then you reveal the code."
			})
		]
	});
}
//#endregion
export { HoldForm as t };
