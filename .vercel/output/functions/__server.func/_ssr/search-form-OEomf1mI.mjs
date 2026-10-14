import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mic, r as Search } from "../_libs/lucide-react.mjs";
import { p as cn } from "./shell-JYFqk6o-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-form-OEomf1mI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchForm({ initial = "", large = false }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)(initial);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const recRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setQ(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		return () => recRef.current?.stop();
	}, []);
	function go(value) {
		navigate({
			to: "/board",
			search: { q: value.trim() }
		});
	}
	function onSubmit(event) {
		event.preventDefault();
		go(q);
	}
	function toggleMic() {
		const w = window;
		const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
		if (!Ctor) {
			setMsg("Speaking isn’t available in this browser. Type what you need.");
			return;
		}
		if (listening && recRef.current) {
			recRef.current.stop();
			return;
		}
		const rec = new Ctor();
		rec.lang = "en-NG";
		rec.interimResults = false;
		rec.onresult = (ev) => {
			const said = ev.results[0]?.[0]?.transcript ?? "";
			setQ(said);
			setListening(false);
			if (said.trim()) go(said);
		};
		rec.onerror = () => {
			setMsg("Couldn’t hear that. Type it instead.");
			setListening(false);
		};
		rec.onend = () => setListening(false);
		recRef.current = rec;
		setMsg(null);
		setListening(true);
		try {
			rec.start();
		} catch {
			setListening(false);
			setMsg("Couldn’t start the microphone. Type what you need.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "oja-search",
				className: "sr-only",
				children: "What do you need?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "oja-search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: listening ? "Listening…" : "Textbooks, a power bank, jollof…",
							className: cn("w-full rounded-2xl border border-border bg-surface pr-3 pl-11 text-fg outline-none", large ? "h-14 text-lg" : "h-12 text-base")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleMic,
						"aria-pressed": listening,
						"aria-label": listening ? "Stop listening" : "Speak your search",
						className: cn("inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border", listening ? "bg-fg text-bg" : "bg-surface text-fg", large && "size-14"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
							className: "size-5",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: cn("inline-flex h-12 shrink-0 items-center rounded-2xl bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-ink", large && "h-14 px-5"),
						children: "Search"
					})
				]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				"aria-live": "polite",
				children: msg
			}) : null
		]
	});
}
//#endregion
export { SearchForm as t };
