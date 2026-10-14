import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as statusLabel, T as scoreForSeller, _ as groupPin, j as useOja, k as textLink, m as fieldClass, o as Missing, s as PEOPLE, t as Button, u as Shell, x as naira } from "./shell-JYFqk6o-.mjs";
import { i as Route$2, l as useHydrated } from "./router-BDTGt7T8.mjs";
import { n as ScorePair } from "./scores-D6nk1o1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-3TGNjXjJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REASONS = [
	"Not what was promised",
	"They asked for extra money",
	"They did not show up"
];
function OrderPage() {
	const { id } = Route$2.useParams();
	const ready = useHydrated();
	const order = useOja((s) => s.orders.find((o) => o.id === id));
	const extra = useOja((s) => s.extraReviews);
	const reveal = useOja((s) => s.reveal);
	const enterCode = useOja((s) => s.enterCode);
	const rate = useOja((s) => s.rate);
	const report = useOja((s) => s.report);
	const refund = useOja((s) => s.refund);
	const resume = useOja((s) => s.resume);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening this order…"
	}) });
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		title: "No order with that id.",
		body: "It isn't in this preview."
	});
	const seller = PEOPLE[order.sellerId];
	const total = order.price + order.deliveryFee;
	const score = scoreForSeller(order.sellerId, extra);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: order.code
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: order.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: statusLabel(order.status)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-display text-4xl tabular-nums",
			children: naira(total)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-xl",
			children: order.status === "refunded" ? "This came back to your practice wallet. It was never sent to the seller." : order.status === "released" || order.status === "rated" ? `Released to ${seller?.name ?? "the seller"} after they entered the code.` : `Held. Not sent to ${seller?.name ?? "the seller"}.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [order.fulfillment === "pickup" ? `Free pickup · ${order.place}` : `Deliver to ${order.place}`, order.deliveryFee > 0 ? ` · delivery ${naira(order.deliveryFee)}` : ""]
		}),
		seller ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/seller/$id",
				params: { id: seller.id },
				className: textLink,
				children: seller.name
			})
		}) : null,
		order.status === "reported" || order.status === "refunded" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { status: order.status }),
		order.status === "held" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Held, {
			orderId: order.id,
			onReveal: () => reveal(order.id),
			onReport: report
		}) : null,
		order.status === "revealed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Revealed, {
			pin: order.handover,
			onEnter: (code) => enterCode(order.id, code),
			onReport: report,
			orderId: order.id
		}) : null,
		order.status === "released" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rate, { onRate: (kept, fair) => rate(order.id, kept, fair) }) : null,
		order.status === "rated" && order.rating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Your two answers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-moss p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm font-medium text-primary",
							children: "Got what was promised"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-lg font-medium",
							children: order.rating.kept ? "Yes" : "No"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-sand p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm font-medium text-clay",
							children: "Price was fair"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-lg font-medium",
							children: order.rating.fair ? "Yes" : "No"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Each answer moved one score. They were not averaged."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePair, { score })
				})
			]
		}) : null,
		order.status === "reported" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportOpen, {
			reason: order.report?.reason ?? "Report",
			note: order.report?.note ?? "",
			onRefund: () => refund(order.id),
			onResume: () => resume(order.id)
		}) : null,
		order.status === "refunded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 max-w-xl text-sm text-muted",
			children: "No ratings were recorded. A refund is not a completed order."
		}) : null
	] });
}
function Stepper({ status }) {
	const labels = [
		"Money held",
		"You reveal",
		"Seller enters",
		"Two ratings"
	];
	const current = status === "held" ? 1 : status === "revealed" ? 2 : status === "released" ? 3 : 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-6 grid grid-cols-4 gap-2 text-xs",
		"aria-label": "Order progress",
		children: labels.map((label, index) => {
			const done = index < current;
			const now = index === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: done || now ? "text-fg" : "text-muted",
				"aria-current": now ? "step" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mb-1 block h-1 rounded-full ${done || now ? "bg-primary" : "bg-border"}` }), label]
			}, label);
		})
	});
}
function Held({ orderId, onReveal, onReport }) {
	const [reporting, setReporting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Inspect, then decide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Check the item against the listing. Check the price against what you are holding. The code stays hidden until you reveal it."
			}),
			reporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportForm, {
				onCancel: () => setReporting(false),
				onSubmit: (reason, note) => onReport(orderId, reason, note)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: onReveal,
					children: "I’m satisfied — reveal the code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "surface",
					onClick: () => setReporting(true),
					children: "Something’s wrong"
				})]
			})
		]
	});
}
function Revealed({ pin, orderId, onEnter, onReport }) {
	const [code, setCode] = (0, import_react.useState)("");
	const [bad, setBad] = (0, import_react.useState)(false);
	const [reporting, setReporting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Your code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Read this out only because you are happy with the item. Hiding it again means filing a report."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "oja-rise mt-4 font-display text-5xl tracking-widest tabular-nums",
				children: groupPin(pin)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl bg-fg p-5 text-bg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sand",
						children: "Seller’s step"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-2xl text-bg",
						children: "They type the code to take the money"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-sand",
						children: "You already revealed it. A tap from you does not release anything."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4",
						onSubmit: (event) => {
							event.preventDefault();
							const result = onEnter(code);
							setBad(result === "bad");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm",
								htmlFor: "handover",
								children: "Handover code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "handover",
								inputMode: "numeric",
								autoComplete: "off",
								value: code,
								onChange: (e) => {
									setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
									setBad(false);
								},
								className: `${fieldClass} mt-1.5 tracking-widest`
							}),
							bad ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium",
								children: "That isn’t the code. The money stays held."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "mt-3",
								disabled: code.length !== 6,
								children: "Enter code and release the money"
							})
						]
					})
				]
			}),
			reporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportForm, {
				onCancel: () => setReporting(false),
				onSubmit: (reason, note) => onReport(orderId, reason, note)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `${textLink} mt-4`,
				onClick: () => setReporting(true),
				children: "Something’s wrong — hide the code and report"
			})
		]
	});
}
function Rate({ onRate }) {
	const [kept, setKept] = (0, import_react.useState)(null);
	const [fair, setFair] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Two ratings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "These stay separate. Oja will not average them into one score."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				legend: "Did you get exactly what was promised?",
				value: kept,
				onChange: setKept
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				legend: "Was the price fair, with no surprise extras?",
				value: fair,
				onChange: setFair
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "mt-4",
				disabled: kept == null || fair == null,
				onClick: () => {
					if (kept == null || fair == null) return;
					onRate(kept, fair);
				},
				children: "Save the two answers"
			})
		]
	});
}
function Choice({ legend, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "font-medium",
			children: legend
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: value === true ? "ink" : "surface",
				"aria-pressed": value === true,
				onClick: () => onChange(true),
				children: "Yes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: value === false ? "ink" : "surface",
				"aria-pressed": value === false,
				onClick: () => onChange(false),
				children: "No"
			})]
		})]
	});
}
function ReportForm({ onSubmit, onCancel }) {
	const [reason, setReason] = (0, import_react.useState)(REASONS[0]);
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 grid gap-3",
		onSubmit: (event) => {
			event.preventDefault();
			onSubmit(reason, note);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium",
					children: "What went wrong?"
				}), REASONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "reason",
						className: "size-4 accent-primary",
						checked: reason === item,
						onChange: () => setReason(item)
					}), item]
				}, item))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-medium",
				children: ["Note, if you want one", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					className: "mt-1.5 min-h-20 w-full rounded-xl border border-border bg-surface px-3 py-2 text-base"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Hold the money and file this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "surface",
					onClick: onCancel,
					children: "Cancel"
				})]
			})
		]
	});
}
function ReportOpen({ reason, note, onRefund, onResume }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Report open"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Money stays held until this is resolved. The code is hidden again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-medium",
				children: reason
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "In this preview you resolve it yourself, the way a campus desk would. The money does not move until you do."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: onRefund,
					children: "Resolve: refund my wallet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "surface",
					onClick: onResume,
					children: "We sorted it — back to inspection"
				})]
			})
		]
	});
}
//#endregion
export { OrderPage as component };
