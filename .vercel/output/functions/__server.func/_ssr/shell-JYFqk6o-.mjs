import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LockKeyhole, i as Plus, n as Store, o as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-JYFqk6o-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CAMPUS = "Creek Campus";
var YOU_ROOM = "New Hostel, B12";
var START_WALLET = 48500;
var CATEGORIES = [
	"Textbooks",
	"Gadgets",
	"Hostel",
	"Food & errands",
	"Fashion"
];
var CONDITIONS = [
	"New",
	"Like new",
	"Good",
	"Fair",
	"As ordered"
];
var PICKUP_POINTS = [
	"Main Gate shed",
	"Faculty of Science quad",
	"Library west steps",
	"New Hostel common room",
	"Engineering porch"
];
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function naira(n) {
	return `${n < 0 ? "-" : ""}₦${Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
function formatWhen(ts) {
	const d = new Date(ts + 36e5);
	return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}
function orderWord(n) {
	if (n === 0) return "No completed orders";
	if (n === 1) return "1 completed order";
	return `${n} completed orders`;
}
function fulfillmentText(fee) {
	if (fee == null) return "Pickup only";
	if (fee === 0) return "Pickup or free delivery";
	return `Pickup or delivery +${naira(fee)}`;
}
function sortPhrase(key, dir) {
	return `Sorted by ${key === "price" ? "price" : key === "delivery" ? "delivery trust" : "price fairness"}, ${dir === "asc" ? "low to high" : "high to low"}. Nothing else changes this order.`;
}
function statusLabel(status) {
	switch (status) {
		case "held": return "Money held — inspect first";
		case "revealed": return "Code revealed — seller still has to enter it";
		case "released": return "Paid out — two ratings left";
		case "rated": return "Complete";
		case "reported": return "Report open — money still held";
		case "refunded": return "Refunded to your wallet";
	}
}
function needsYou(status) {
	return status === "held" || status === "revealed" || status === "reported" || status === "released";
}
var PEOPLE = {
	you: {
		id: "you",
		name: "Adaeze Okonkwo",
		faculty: "Social Sciences",
		level: "300-level",
		hostel: "New Hostel",
		since: "2025",
		blurb: "You, in this preview. New Hostel, room B12. A listing you add joins the same board as everyone else."
	},
	tunde: {
		id: "tunde",
		name: "Tunde Adeyemi",
		faculty: "Engineering",
		level: "500-level",
		hostel: "Moremi Hall",
		since: "2023",
		blurb: "Course books and small electronics out of Moremi. He describes condition in the listing and meets where he says he will."
	},
	chioma: {
		id: "chioma",
		name: "Chioma Nwosu",
		faculty: "Law",
		level: "400-level",
		hostel: "Queen's Hall",
		since: "2024",
		blurb: "Law texts, bound notes, and the odd hostel item. Buyers usually pay exactly the price on the board."
	},
	ibrahim: {
		id: "ibrahim",
		name: "Ibrahim Sule",
		faculty: "Sciences",
		level: "300-level",
		hostel: "Male Hostel C",
		since: "2024",
		blurb: "Calculators, lab coats, and whatever the lab list asks for this semester."
	},
	amaka: {
		id: "amaka",
		name: "Amaka Eze",
		faculty: "Arts",
		level: "200-level",
		hostel: "New Hostel",
		since: "2025",
		blurb: "Clothes and small hostel things. She started recently, so the record is still short."
	},
	femi: {
		id: "femi",
		name: "Femi Balogun",
		faculty: "Engineering",
		level: "400-level",
		hostel: "Male Hostel A",
		since: "2023",
		blurb: "Often the low price on a textbook. Defects are written into the description — the delivery record is a separate question."
	},
	zainab: {
		id: "zainab",
		name: "Zainab Bello",
		faculty: "Social Sciences",
		level: "400-level",
		hostel: "Yaba, off campus",
		since: "2022",
		blurb: "Food and errands. Free pickup is the Main Gate shed. Room delivery is a fee set on the listing, not at the door."
	},
	kelechi: {
		id: "kelechi",
		name: "Kelechi Obi",
		faculty: "Management",
		level: "300-level",
		hostel: "Male Hostel B",
		since: "2024",
		blurb: "Gadgets and a pair of sneakers. Items usually show up. The price at the door is the number to read."
	}
};
var LISTINGS = [
	{
		id: "eng-math-tunde",
		sellerId: "tunde",
		title: "Engineering Mathematics",
		category: "Textbooks",
		condition: "Good",
		price: 8500,
		description: "Kreyszig, maths textbook, all chapters present. No writing in the margins. Cover is scuffed, pages are clean. I meet at Engineering porch or the library steps.",
		pickupPoints: [
			"Engineering porch",
			"Library west steps",
			"Faculty of Science quad"
		],
		deliveryFee: null
	},
	{
		id: "eng-math-chioma",
		sellerId: "chioma",
		title: "Engineering Mathematics",
		category: "Textbooks",
		condition: "Good",
		price: 6200,
		description: "Kreyszig maths textbook. A few pencil ticks in chapter 4, erased. Binding is tight. Pickup at the library steps or the Main Gate shed.",
		pickupPoints: [
			"Library west steps",
			"Main Gate shed",
			"New Hostel common room"
		],
		deliveryFee: null
	},
	{
		id: "eng-math-femi",
		sellerId: "femi",
		title: "Engineering Mathematics",
		category: "Textbooks",
		condition: "Fair",
		price: 4800,
		description: "Kreyszig maths textbook. Fair condition on purpose: the appendix is missing and the cover is taped. The price is lower because of that. I will not claim it is complete.",
		pickupPoints: ["Engineering porch", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "contract-chioma",
		sellerId: "chioma",
		title: "Law of Contract notes",
		category: "Textbooks",
		condition: "Good",
		price: 3500,
		description: "Bound Nigerian case notes for contract, this session's reading list. Tabs included. Not a textbook — notes only, and the listing says so.",
		pickupPoints: ["Library west steps", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "mth-femi",
		sellerId: "femi",
		title: "MTH201 past questions",
		category: "Textbooks",
		condition: "As ordered",
		price: 1500,
		description: "Loose past questions, five years, black and white. A few pages are faint. Count them at pickup.",
		pickupPoints: ["Engineering porch", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "mth-chioma",
		sellerId: "chioma",
		title: "MTH201 past questions",
		category: "Textbooks",
		condition: "Good",
		price: 2200,
		description: "Same five years, bound, with a contents page. Print is dark enough to read.",
		pickupPoints: ["Library west steps", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "casio-ibrahim",
		sellerId: "ibrahim",
		title: "Casio fx-991ES Plus",
		category: "Gadgets",
		condition: "Like new",
		price: 9e3,
		description: "Scientific calculator, fx-991ES Plus. Cover and battery included. Screen has no dead lines. I can walk it over for the delivery fee, or you pick it up free.",
		pickupPoints: ["Faculty of Science quad", "Engineering porch"],
		deliveryFee: 500
	},
	{
		id: "bank-kelechi",
		sellerId: "kelechi",
		title: "Oraimo 20000mAh power bank",
		category: "Gadgets",
		condition: "Like new",
		price: 14500,
		description: "Oraimo 20000mAh. Used for one semester. Cable included. Light scratches on the back, holds a charge.",
		pickupPoints: [
			"Main Gate shed",
			"New Hostel common room",
			"Library west steps"
		],
		deliveryFee: 700
	},
	{
		id: "bank-tunde",
		sellerId: "tunde",
		title: "Oraimo 20000mAh power bank",
		category: "Gadgets",
		condition: "New",
		price: 17500,
		description: "Oraimo 20000mAh, new in the box, seal intact. Cable in the box. Pickup only — I don't carry it across campus.",
		pickupPoints: ["Engineering porch", "Library west steps"],
		deliveryFee: null
	},
	{
		id: "bank-femi",
		sellerId: "femi",
		title: "Unbranded 20000mAh power bank",
		category: "Gadgets",
		condition: "Fair",
		price: 9e3,
		description: "Unbranded power bank, marked 20000mAh. It is not an Oraimo. Case is worn. It charged my phone twice yesterday. Don't pay an Oraimo price for this.",
		pickupPoints: ["Engineering porch", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "mouse-tunde",
		sellerId: "tunde",
		title: "HP wireless mouse",
		category: "Gadgets",
		condition: "Like new",
		price: 6500,
		description: "HP wireless mouse. Receiver in the slot. One battery included. Quiet click.",
		pickupPoints: ["Engineering porch", "Library west steps"],
		deliveryFee: null
	},
	{
		id: "sneakers-kelechi",
		sellerId: "kelechi",
		title: "Campus sneakers, size 43",
		category: "Fashion",
		condition: "Like new",
		price: 12e3,
		description: "Size 43. Worn for a semester and cleaned. Soles are even. Laces included. Not a boxed pair.",
		pickupPoints: ["Main Gate shed", "New Hostel common room"],
		deliveryFee: 700
	},
	{
		id: "lamp-amaka",
		sellerId: "amaka",
		title: "Reading lamp",
		category: "Hostel",
		condition: "New",
		price: 4500,
		description: "Warm LED reading lamp, new, with a clip and a USB cable. No bulb to replace.",
		pickupPoints: ["New Hostel common room", "Main Gate shed"],
		deliveryFee: 300
	},
	{
		id: "lamp-chioma",
		sellerId: "chioma",
		title: "Reading lamp",
		category: "Hostel",
		condition: "New",
		price: 5200,
		description: "Clip-on LED reading lamp, new in the pack. Two brightness steps. Pickup only.",
		pickupPoints: ["Library west steps", "New Hostel common room"],
		deliveryFee: null
	},
	{
		id: "fan-chioma",
		sellerId: "chioma",
		title: "Rechargeable bedside fan",
		category: "Hostel",
		condition: "Like new",
		price: 7800,
		description: "Small rechargeable fan. Used for a few weeks. All speeds work. USB cable included.",
		pickupPoints: ["Library west steps", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "fan-kelechi",
		sellerId: "kelechi",
		title: "Rechargeable bedside fan",
		category: "Hostel",
		condition: "Good",
		price: 6500,
		description: "Rechargeable fan. One scuff on the cage. Speeds work. Cable included.",
		pickupPoints: ["Main Gate shed", "New Hostel common room"],
		deliveryFee: 600
	},
	{
		id: "coat-ibrahim",
		sellerId: "ibrahim",
		title: "Lab coat, size M",
		category: "Hostel",
		condition: "Good",
		price: 4e3,
		description: "White lab coat, size M. Washed. A pen mark on the pocket. Buttons are all there.",
		pickupPoints: ["Faculty of Science quad", "Engineering porch"],
		deliveryFee: 500
	},
	{
		id: "ankara-amaka",
		sellerId: "amaka",
		title: "Ankara shirt, size M",
		category: "Fashion",
		condition: "New",
		price: 7e3,
		description: "New Ankara shirt, size M, unworn. Blue and gold print. No alterations.",
		pickupPoints: ["New Hostel common room", "Main Gate shed"],
		deliveryFee: null
	},
	{
		id: "jollof-zainab",
		sellerId: "zainab",
		title: "Jollof and chicken",
		category: "Food & errands",
		condition: "As ordered",
		price: 2800,
		description: "One plate of jollof and a piece of chicken from the Main Gate canteen. You can collect it there for free, or I walk it to your room for the delivery fee. No add-on at the door.",
		pickupPoints: ["Main Gate shed"],
		deliveryFee: 400
	},
	{
		id: "print-zainab",
		sellerId: "zainab",
		title: "Print and bind a project",
		category: "Food & errands",
		condition: "As ordered",
		price: 2500,
		description: "Print and spiral-bind up to 80 black-and-white pages. Send the file when we agree. Price covers that length — more pages is a new listing, not a surprise at handover.",
		pickupPoints: ["Main Gate shed"],
		deliveryFee: 500
	},
	{
		id: "snacks-zainab",
		sellerId: "zainab",
		title: "Meat pies and drinks",
		category: "Food & errands",
		condition: "As ordered",
		price: 2200,
		description: "Three meat pies and two bottled drinks from the Main Gate shops. Pickup at the shed, or room delivery for the fee shown.",
		pickupPoints: ["Main Gate shed"],
		deliveryFee: 300
	}
];
var BOTH = [
	(item) => `${item} — exactly as listed. No extra charge.`,
	(item) => `Got ${item}. The price at handover was the price on the board.`,
	(item) => `${item} matched what we agreed. Nothing added at the door.`
];
var PRICE_NO = [
	(item) => `${item} was the right item, but they asked for extra money at handover.`,
	(item) => `${item} matched the listing. The price did not — there was a surprise add-on.`,
	(item) => `${item} showed up as described. They still wanted more than the listed price.`
];
var ITEM_NO = [
	(item) => `The price for ${item} was as listed, but the item was not what was promised.`,
	(item) => `${item} — no extra charge, yet it did not match the listing.`,
	(item) => `Paid the agreed price. ${item} was not the thing described.`
];
var NEITHER = [(item) => `${item} did not match, and there was an extra charge.`, (item) => `Neither the item nor the price held up for ${item}.`];
function noteFor(kept, fair, item, i) {
	const pool = kept && fair ? BOTH : kept && !fair ? PRICE_NO : !kept && fair ? ITEM_NO : NEITHER;
	return pool[i % pool.length](item);
}
function spread(total, yes) {
	const out = [];
	let debt = 0;
	for (let i = 0; i < total; i++) {
		debt += yes;
		if (debt >= total) {
			out.push(true);
			debt -= total;
		} else out.push(false);
	}
	return out;
}
function daysBefore(index) {
	const d = /* @__PURE__ */ new Date(Date.UTC(2026, 9, 2) - index * 864e5);
	return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}
var HISTORY = [
	{
		id: "tunde",
		total: 24,
		kept: 23,
		fair: 17
	},
	{
		id: "chioma",
		total: 18,
		kept: 16,
		fair: 17
	},
	{
		id: "ibrahim",
		total: 15,
		kept: 12,
		fair: 11
	},
	{
		id: "amaka",
		total: 4,
		kept: 4,
		fair: 3
	},
	{
		id: "femi",
		total: 11,
		kept: 6,
		fair: 9
	},
	{
		id: "zainab",
		total: 31,
		kept: 29,
		fair: 28
	},
	{
		id: "kelechi",
		total: 8,
		kept: 7,
		fair: 5
	}
];
function buildSeed() {
	const all = [];
	let seq = 3100;
	for (const plan of HISTORY) {
		const items = LISTINGS.filter((l) => l.sellerId === plan.id).map((l) => l.title);
		const keptA = spread(plan.total, plan.kept);
		const fairA = spread(plan.total, plan.fair).reverse();
		for (let i = 0; i < plan.total; i++) {
			const item = items[i % items.length] ?? "the order";
			const kept = keptA[i];
			const fair = fairA[i];
			seq += 1;
			all.push({
				id: `${plan.id}-${i}`,
				sellerId: plan.id,
				orderCode: `OJ-${seq}`,
				item,
				kept,
				fair,
				note: noteFor(kept, fair, item, i),
				when: daysBefore(i)
			});
		}
	}
	return all;
}
var SEED_REVIEWS = buildSeed();
function scoreFrom(reviews) {
	const orders = reviews.length;
	const kept = reviews.filter((r) => r.kept).length;
	const fair = reviews.filter((r) => r.fair).length;
	return {
		orders,
		kept,
		fair,
		delivery: orders ? Math.round(kept / orders * 100) : null,
		fairness: orders ? Math.round(fair / orders * 100) : null
	};
}
for (const plan of HISTORY) {
	const got = scoreFrom(SEED_REVIEWS.filter((r) => r.sellerId === plan.id));
	if (got.orders !== plan.total || got.kept !== plan.kept || got.fair !== plan.fair) throw new Error(`Seed mismatch for ${plan.id}: expected ${plan.kept}/${plan.fair}/${plan.total} got ${got.kept}/${got.fair}/${got.orders}`);
}
function scoreForSeller(sellerId, extra) {
	const reviews = [...extra.filter((r) => r.sellerId === sellerId), ...SEED_REVIEWS.filter((r) => r.sellerId === sellerId)];
	return {
		...scoreFrom(reviews),
		reviews
	};
}
function insight(score) {
	if (score.delivery == null || score.fairness == null) return null;
	const gap = score.delivery - score.fairness;
	if (gap >= 15) return "Delivery trust is well ahead of price fairness. An honest handover can still be an expensive one.";
	if (gap <= -15) return "Price fairness is ahead of delivery trust. A fair listed price only helps if the item shows up as promised.";
	return null;
}
function thinSample(orders) {
	if (orders > 0 && orders < 5) return "Only a few completed orders. These percentages are real, but they can swing.";
	return null;
}
function listingFields(listing, extra) {
	const seller = PEOPLE[listing.sellerId];
	const score = scoreForSeller(listing.sellerId, extra);
	return {
		key: listing.id,
		title: listing.title,
		meta: `${listing.condition} · ${listing.category}`,
		listingId: listing.id,
		sellerId: listing.sellerId,
		sellerName: seller?.name ?? "Seller",
		price: listing.price,
		delivery: score.delivery,
		fairness: score.fairness,
		orders: score.orders,
		fulfillment: fulfillmentText(listing.deliveryFee)
	};
}
function proposalFields(proposal, extra) {
	const seller = PEOPLE[proposal.sellerId];
	const score = scoreForSeller(proposal.sellerId, extra);
	return {
		key: proposal.id,
		title: proposal.note,
		meta: "Offer",
		sellerId: proposal.sellerId,
		sellerName: seller?.name ?? "Seller",
		price: proposal.price,
		delivery: score.delivery,
		fairness: score.fairness,
		orders: score.orders,
		fulfillment: fulfillmentText(proposal.deliveryFee)
	};
}
function matchListing(listing, q) {
	const query = q.trim().toLowerCase();
	if (!query) return true;
	const seller = PEOPLE[listing.sellerId];
	const hay = `${listing.title} ${listing.category} ${listing.condition} ${listing.description} ${seller?.name ?? ""}`.toLowerCase();
	const flat = hay.replace(/\s+/g, "");
	return query.split(/\s+/).filter(Boolean).every((word) => {
		const token = word.replace(/\s+/g, "");
		return hay.includes(word) || flat.includes(token);
	});
}
function sortBoard(rows, key, dir) {
	const value = (row) => key === "price" ? row.price : key === "delivery" ? row.delivery : row.fairness;
	return [...rows].sort((a, b) => {
		const av = value(a);
		const bv = value(b);
		if (av == null && bv == null) return a.title.localeCompare(b.title);
		if (av == null) return 1;
		if (bv == null) return -1;
		if (av !== bv) return dir === "asc" ? av - bv : bv - av;
		return a.title.localeCompare(b.title);
	});
}
function walletFrom(orders) {
	let spent = 0;
	let held = 0;
	let released = 0;
	for (const order of orders) {
		if (order.status === "refunded") continue;
		const total = order.price + order.deliveryFee;
		spent += total;
		if (order.status === "held" || order.status === "revealed" || order.status === "reported") held += total;
		if (order.status === "released" || order.status === "rated") released += total;
	}
	return {
		spendable: START_WALLET - spent,
		held,
		released,
		spent
	};
}
function groupPin(pin) {
	return `${pin.slice(0, 3)} ${pin.slice(3)}`;
}
var blank = {
	myListings: [],
	orders: [],
	requests: [],
	proposals: [],
	extraReviews: [],
	sortKey: "price",
	sortDir: "asc"
};
var OFFER_NOTES = [
	"I can do this at the price below, and I won't add a charge at handover.",
	"Free pickup at my usual campus points. Delivery only if a fee is shown here.",
	"I can take this on. The price here is the price at the door."
];
var DELIVERY = {
	zainab: 400,
	kelechi: 700,
	amaka: 300,
	ibrahim: 500
};
function quote(budget, factor) {
	if (budget <= 0) return 0;
	const stepped = Math.round(budget * factor / 100) * 100;
	return Math.min(budget, stepped > 0 ? stepped : budget);
}
function makeProposals(requestId, budget) {
	const picked = [...[
		"chioma",
		"zainab",
		"tunde",
		"femi",
		"amaka",
		"kelechi",
		"ibrahim"
	]].sort(() => Math.random() - .5).slice(0, 3);
	const factors = [
		.96,
		.8,
		.68
	];
	return picked.map((sellerId, i) => ({
		id: crypto.randomUUID(),
		requestId,
		sellerId,
		price: quote(budget, factors[i] ?? .8),
		note: OFFER_NOTES[i] ?? OFFER_NOTES[0],
		deliveryFee: DELIVERY[sellerId] ?? null
	}));
}
function orderCode() {
	return `OJ-${7e3 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 3e3}`;
}
function handoverPin() {
	return (crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6).toString().padStart(6, "0");
}
var useOja = create()(persist((set, get) => ({
	...blank,
	setSort: (key) => set((s) => {
		if (s.sortKey === key) return { sortDir: s.sortDir === "asc" ? "desc" : "asc" };
		return {
			sortKey: key,
			sortDir: key === "price" ? "asc" : "desc"
		};
	}),
	addListing: (input) => {
		const id = `mine-${crypto.randomUUID().slice(0, 8)}`;
		set((s) => ({ myListings: [{
			...input,
			id,
			sellerId: "you"
		}, ...s.myListings] }));
		return id;
	},
	removeListing: (id) => set((s) => ({ myListings: s.myListings.filter((l) => l.id !== id) })),
	placeOrder: (input) => {
		const place = input.place.trim();
		if (!place) return {
			ok: false,
			reason: "Add where this changes hands."
		};
		if (input.sellerId === "you") return {
			ok: false,
			reason: "You can't hold money on your own listing."
		};
		if (input.fulfillment === "delivery" && input.deliveryFee == null) return {
			ok: false,
			reason: "This seller has not turned on delivery."
		};
		if (input.requestId) {
			if (get().requests.find((r) => r.id === input.requestId)?.orderId) return {
				ok: false,
				reason: "You already accepted an offer on this request."
			};
		}
		const deliveryFee = input.fulfillment === "delivery" ? input.deliveryFee ?? 0 : 0;
		const charge = input.price + deliveryFee;
		if (walletFrom(get().orders).spendable < charge) return {
			ok: false,
			reason: "Your practice wallet can't cover this. Money already held stays held."
		};
		const order = {
			id: crypto.randomUUID(),
			code: orderCode(),
			handover: handoverPin(),
			sellerId: input.sellerId,
			title: input.title,
			price: input.price,
			deliveryFee,
			fulfillment: input.fulfillment,
			place,
			status: "held",
			createdAt: Date.now(),
			requestId: input.requestId
		};
		set((s) => ({
			orders: [order, ...s.orders],
			requests: input.requestId ? s.requests.map((r) => r.id === input.requestId ? {
				...r,
				orderId: order.id
			} : r) : s.requests
		}));
		return {
			ok: true,
			orderId: order.id
		};
	},
	reveal: (id) => set((s) => ({ orders: s.orders.map((o) => o.id === id && o.status === "held" ? {
		...o,
		status: "revealed"
	} : o) })),
	enterCode: (id, code) => {
		const order = get().orders.find((o) => o.id === id);
		if (!order || order.status !== "revealed") return "closed";
		if (code.replace(/\D/g, "") !== order.handover) return "bad";
		set((s) => ({ orders: s.orders.map((o) => o.id === id ? {
			...o,
			status: "released"
		} : o) }));
		return "ok";
	},
	rate: (id, kept, fair) => {
		const order = get().orders.find((o) => o.id === id);
		if (!order || order.status !== "released") return;
		const review = {
			id: `extra-${order.id}`,
			sellerId: order.sellerId,
			orderCode: order.code,
			item: order.title,
			kept,
			fair,
			note: kept && fair ? `${order.title} — I released the code. The item and the price both held.` : kept && !fair ? `${order.title} matched, but the price was not fair.` : !kept && fair ? `The price for ${order.title} was fair. The item was not what was promised.` : `${order.title} — neither the item nor the price was right.`,
			when: formatWhen(Date.now())
		};
		set((s) => ({
			orders: s.orders.map((o) => o.id === id ? {
				...o,
				status: "rated",
				rating: {
					kept,
					fair
				}
			} : o),
			extraReviews: [review, ...s.extraReviews]
		}));
	},
	report: (id, reason, note) => set((s) => ({ orders: s.orders.map((o) => o.id === id && (o.status === "held" || o.status === "revealed") ? {
		...o,
		status: "reported",
		report: {
			reason,
			note: note.trim()
		}
	} : o) })),
	refund: (id) => set((s) => ({ orders: s.orders.map((o) => o.id === id && o.status === "reported" ? {
		...o,
		status: "refunded"
	} : o) })),
	resume: (id) => set((s) => ({ orders: s.orders.map((o) => o.id === id && o.status === "reported" ? {
		...o,
		status: "held",
		report: void 0
	} : o) })),
	postRequest: (input) => {
		const id = crypto.randomUUID();
		const request = {
			id,
			...input,
			createdAt: Date.now()
		};
		set((s) => ({
			requests: [request, ...s.requests],
			proposals: [...makeProposals(id, input.budget), ...s.proposals]
		}));
		return id;
	},
	reset: () => {
		set(blank);
		useOja.persist.clearStorage();
	}
}), {
	name: "oja-campus-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({
		myListings: s.myListings,
		orders: s.orders,
		requests: s.requests,
		proposals: s.proposals,
		extraReviews: s.extraReviews,
		sortKey: s.sortKey,
		sortDir: s.sortDir
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50", variant === "primary" && "bg-primary text-primary-fg hover:bg-primary-ink", variant === "ink" && "bg-fg text-bg", variant === "surface" && "border border-border bg-surface text-fg hover:bg-inset", variant === "ghost" && "bg-transparent text-fg hover:bg-inset", className),
		...props
	});
}
var fieldClass = "h-12 w-full rounded-xl border border-border bg-surface px-3 text-base text-fg outline-none";
var areaClass = "min-h-28 w-full rounded-xl border border-border bg-surface px-3 py-3 text-base text-fg outline-none";
var textLink = "font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5",
				children
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1.5 block text-sm text-muted",
				children: hint
			}) : null
		]
	});
}
function PageHeader({ eyebrow, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "max-w-2xl",
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-muted",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-4xl text-fg md:text-5xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg text-fg",
				children: lede
			}) : null
		]
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			fill: "var(--color-primary)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 21h16M8 16.5h16M11 16.5V11h10v5.5",
			fill: "none",
			stroke: "var(--color-primary-fg)",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})]
	});
}
function BackHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: `${textLink} mt-6 inline-flex h-11 items-center`,
		children: "Back to the market"
	});
}
var LINKS = [
	{
		to: "/",
		label: "Market"
	},
	{
		to: "/how",
		label: "How it works"
	},
	{
		to: "/requests",
		label: "Requests"
	},
	{
		to: "/orders",
		label: "Orders"
	},
	{
		to: "/sell",
		label: "Sell"
	}
];
var TABS = [
	{
		to: "/",
		label: "Market",
		icon: Store
	},
	{
		to: "/requests",
		label: "Requests",
		icon: MessageSquare
	},
	{
		to: "/orders",
		label: "Orders",
		icon: LockKeyhole
	},
	{
		to: "/sell",
		label: "Sell",
		icon: Plus
	}
];
function onPath(pathname, to) {
	if (to === "/") return pathname === "/";
	if (to === "/orders") return pathname === "/orders" || pathname.startsWith("/order/");
	if (to === "/requests") return pathname.startsWith("/request");
	return pathname === to || pathname.startsWith(`${to}/`);
}
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const orders = useOja((s) => s.orders);
	const reset = useOja((s) => s.reset);
	const { spendable } = walletFrom(orders);
	const attention = orders.filter((o) => needsYou(o.status)).length;
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl items-start justify-between gap-3 px-4 py-3 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl leading-none",
									children: "Oja"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									CAMPUS,
									" ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/how",
										className: "text-fg underline decoration-border underline-offset-4",
										children: "How it works"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Adaeze Okonkwo · New Hostel"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 rounded-xl bg-inset px-3 py-1.5 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tabular-nums",
							children: naira(spendable)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "practice wallet"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto hidden w-full max-w-5xl gap-1 px-6 pb-3 md:flex",
					"aria-label": "Sections",
					children: LINKS.map((item) => {
						const on = onPath(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("rounded-full px-3 py-2 text-sm", on ? "bg-fg text-bg" : "text-fg hover:bg-inset"),
							"aria-current": on ? "page" : void 0,
							children: [item.label, item.to === "/orders" && attention > 0 ? ` (${attention})` : ""]
						}, item.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-5xl px-4 pt-6 pb-28 md:px-6 md:pb-16",
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-16 border-t border-border pt-6 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You see the truth, you hold the money until you are happy, and every rating comes from a completed order." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "Creek Campus is fictional. Sample sellers live in this preview. Your orders and ratings stay on this device."
						}),
						confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-fg",
							children: [
								"This clears your orders, listings, requests, and ratings.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${textLink} ml-3`,
									onClick: () => {
										reset();
										setConfirm(false);
									},
									children: "Reset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ml-3 underline",
									onClick: () => setConfirm(false),
									children: "Cancel"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 underline",
							onClick: () => setConfirm(true),
							children: "Reset this preview"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "nav-pad fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg md:hidden",
				"aria-label": "Sections",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-lg grid-cols-4",
					children: TABS.map((item) => {
						const on = onPath(pathname, item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-16 flex-col items-center justify-center gap-1 text-xs", on ? "text-primary" : "text-muted"),
							"aria-current": on ? "page" : void 0,
							"aria-label": item.to === "/orders" && attention > 0 ? `Orders, ${attention} need attention` : item.label,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									"aria-hidden": true
								}), item.to === "/orders" && attention > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-0.5 -right-1 size-2 rounded-full bg-clay" }) : null]
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function Missing({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackHome, {})
	] });
}
//#endregion
export { thinSample as A, orderWord as C, sortPhrase as D, sortBoard as E, walletFrom as M, statusLabel as O, needsYou as S, scoreForSeller as T, groupPin as _, LISTINGS as a, matchListing as b, PICKUP_POINTS as c, YOU_ROOM as d, areaClass as f, fulfillmentText as g, formatWhen as h, Field as i, useOja as j, textLink as k, PageHeader as l, fieldClass as m, CATEGORIES as n, Missing as o, cn as p, CONDITIONS as r, PEOPLE as s, Button as t, Shell as u, insight as v, proposalFields as w, naira as x, listingFields as y };
