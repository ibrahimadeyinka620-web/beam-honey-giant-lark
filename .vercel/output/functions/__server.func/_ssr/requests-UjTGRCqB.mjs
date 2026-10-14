import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as areaClass, h as formatWhen, i as Field, j as useOja, l as PageHeader, m as fieldClass, t as Button, u as Shell, x as naira } from "./shell-JYFqk6o-.mjs";
import { l as useHydrated, s as Route$6 } from "./router-BDTGt7T8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests-UjTGRCqB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequestsPage() {
	const { draft } = Route$6.useSearch();
	const ready = useHydrated();
	const requests = useOja((s) => s.requests);
	const postRequest = useOja((s) => s.postRequest);
	const navigate = useNavigate();
	const [kind, setKind] = (0, import_react.useState)("item");
	const [title, setTitle] = (0, import_react.useState)(draft ?? "");
	const [details, setDetails] = (0, import_react.useState)("");
	const [budget, setBudget] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	function submit(event) {
		event.preventDefault();
		const name = title.trim();
		const amount = Number(budget);
		if (name.length < 3) {
			setError("Name what you need.");
			return;
		}
		if (!Number.isInteger(amount) || amount <= 0) {
			setError("Set a maximum budget in naira.");
			return;
		}
		const id = postRequest({
			kind,
			title: name,
			details: details.trim(),
			budget: amount
		});
		navigate({
			to: "/request/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Request",
			title: "Ask the campus",
			lede: "Post an item or an errand with the most you will pay. Offers come back on the same truth board."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-sm text-muted",
			children: "In this preview, sellers reply straight away so you can try the whole path. On a real campus they would reply when they see the request."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-6 grid max-w-xl gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium",
					children: "What is it?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: kind === "item" ? "ink" : "surface",
						"aria-pressed": kind === "item",
						onClick: () => setKind("item"),
						children: "Item"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: kind === "errand" ? "ink" : "surface",
						"aria-pressed": kind === "errand",
						onClick: () => setKind("errand"),
						children: "Errand"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What you need",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Details",
					hint: "Condition, size, where it has to get to. Optional.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: areaClass,
						value: details,
						onChange: (e) => setDetails(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Maximum budget",
					hint: "Offers above this are not shown.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						inputMode: "numeric",
						value: budget,
						onChange: (e) => setBudget(e.target.value.replace(/\D/g, ""))
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full sm:w-auto",
					children: "Post request"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Your requests"
				}),
				!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Opening your requests…"
				}) : null,
				ready && requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "None yet."
				}) : null,
				ready && requests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border border-y border-border",
					children: requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/request/$id",
						params: { id: request.id },
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: request.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								request.kind === "errand" ? "Errand" : "Item",
								" · ",
								formatWhen(request.createdAt),
								" ·",
								" ",
								request.orderId ? "Accepted" : "Open"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-sm tabular-nums",
							children: ["up to ", naira(request.budget)]
						})]
					}) }, request.id))
				}) : null
			]
		})
	] });
}
//#endregion
export { RequestsPage as component };
