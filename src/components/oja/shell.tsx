import { Link, useRouterState } from "@tanstack/react-router";
import { LockKeyhole, MessageSquare, Plus, Store } from "lucide-react";
import { useState } from "react";
import { CAMPUS, needsYou, walletFrom } from "@/lib/oja/data";
import { naira } from "@/lib/oja/data";
import { useOja } from "@/lib/oja/store";
import { cn } from "@/lib/cn";
import { BackHome, Mark, textLink } from "@/components/oja/ui";

const LINKS = [
  { to: "/", label: "Market" },
  { to: "/how", label: "How it works" },
  { to: "/requests", label: "Requests" },
  { to: "/orders", label: "Orders" },
  { to: "/sell", label: "Sell" },
] as const;

const TABS = [
  { to: "/", label: "Market", icon: Store },
  { to: "/requests", label: "Requests", icon: MessageSquare },
  { to: "/orders", label: "Orders", icon: LockKeyhole },
  { to: "/sell", label: "Sell", icon: Plus },
] as const;

function onPath(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  if (to === "/orders") return pathname === "/orders" || pathname.startsWith("/order/");
  if (to === "/requests") return pathname.startsWith("/request");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const orders = useOja((s) => s.orders);
  const reset = useOja((s) => s.reset);
  const { spendable } = walletFrom(orders);
  const attention = orders.filter((o) => needsYou(o.status)).length;
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg">
        <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-3 px-4 py-3 md:px-6">
          <div className="min-w-0">
            <Link to="/" className="inline-flex items-center gap-2">
              <Mark className="size-9" />
              <span className="font-display text-3xl leading-none">Oja</span>
            </Link>
            <p className="mt-1 text-sm text-muted">
              {CAMPUS} ·{" "}
              <Link to="/how" className="text-fg underline decoration-border underline-offset-4">
                How it works
              </Link>
            </p>
            <p className="text-sm text-muted">Adaeze Okonkwo · New Hostel</p>
          </div>
          <div className="shrink-0 rounded-xl bg-inset px-3 py-1.5 text-right">
            <p className="text-sm font-medium tabular-nums">{naira(spendable)}</p>
            <p className="text-xs text-muted">practice wallet</p>
          </div>
        </div>
        <nav className="mx-auto hidden w-full max-w-5xl gap-1 px-6 pb-3 md:flex" aria-label="Sections">
          {LINKS.map((item) => {
            const on = onPath(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn("rounded-full px-3 py-2 text-sm", on ? "bg-fg text-bg" : "text-fg hover:bg-inset")}
                aria-current={on ? "page" : undefined}
              >
                {item.label}
                {item.to === "/orders" && attention > 0 ? ` (${attention})` : ""}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-28 md:px-6 md:pb-16">
        {children}
        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
          <p>You see the truth, you hold the money until you are happy, and every rating comes from a completed order.</p>
          <p className="mt-2">
            Creek Campus is fictional. Sample sellers live in this preview. Your orders and ratings stay on this device.
          </p>
          {confirm ? (
            <p className="mt-3 text-fg">
              This clears your orders, listings, requests, and ratings.
              <button type="button" className={`${textLink} ml-3`} onClick={() => { reset(); setConfirm(false); }}>
                Reset
              </button>
              <button type="button" className="ml-3 underline" onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </p>
          ) : (
            <button type="button" className="mt-3 underline" onClick={() => setConfirm(true)}>
              Reset this preview
            </button>
          )}
        </footer>
      </div>

      <nav className="nav-pad fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg md:hidden" aria-label="Sections">
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {TABS.map((item) => {
            const on = onPath(pathname, item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn("flex h-16 flex-col items-center justify-center gap-1 text-xs", on ? "text-primary" : "text-muted")}
                  aria-current={on ? "page" : undefined}
                  aria-label={item.to === "/orders" && attention > 0 ? `Orders, ${attention} need attention` : item.label}
                >
                  <span className="relative">
                    <Icon className="size-5" aria-hidden />
                    {item.to === "/orders" && attention > 0 ? (
                      <span className="absolute -top-0.5 -right-1 size-2 rounded-full bg-clay" />
                    ) : null}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Missing({ title, body }: { title: string; body: string }) {
  return (
    <Shell>
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-3 max-w-xl text-muted">{body}</p>
      <BackHome />
    </Shell>
  );
}
