import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "surface" | "ghost" | "ink" }) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-fg hover:bg-primary-ink",
        variant === "ink" && "bg-fg text-bg",
        variant === "surface" && "border border-border bg-surface text-fg hover:bg-inset",
        variant === "ghost" && "bg-transparent text-fg hover:bg-inset",
        className,
      )}
      {...props}
    />
  );
}

export const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-3 text-base text-fg outline-none";

export const areaClass =
  "min-h-28 w-full rounded-xl border border-border bg-surface px-3 py-3 text-base text-fg outline-none";

export const textLink =
  "font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint ? <span className="mt-1.5 block text-sm text-muted">{hint}</span> : null}
    </label>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? <p className="text-sm font-medium text-muted">{eyebrow}</p> : null}
      <h1 className="mt-1 text-4xl text-fg md:text-5xl">{title}</h1>
      {lede ? <p className="mt-3 text-lg text-fg">{lede}</p> : null}
    </header>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
      <path
        d="M8 21h16M8 16.5h16M11 16.5V11h10v5.5"
        fill="none"
        stroke="var(--color-primary-fg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BackHome() {
  return (
    <Link to="/" className={`${textLink} mt-6 inline-flex h-11 items-center`}>
      Back to the market
    </Link>
  );
}
