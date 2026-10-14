import { useNavigate } from "@tanstack/react-router";
import { Mic, Search } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  onresult: ((ev: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

export function SearchForm({ initial = "", large = false }: { initial?: string; large?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initial);
  const [listening, setListening] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const recRef = useRef<SpeechRec | null>(null);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  useEffect(() => {
    return () => recRef.current?.stop();
  }, []);

  function go(value: string) {
    void navigate({ to: "/board", search: { q: value.trim() } });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    go(q);
  }

  function toggleMic() {
    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRec;
      webkitSpeechRecognition?: new () => SpeechRec;
    };
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

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="oja-search" className="sr-only">
        What do you need?
      </label>
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="oja-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={listening ? "Listening…" : "Textbooks, a power bank, jollof…"}
            className={cn(
              "w-full rounded-2xl border border-border bg-surface pr-3 pl-11 text-fg outline-none",
              large ? "h-14 text-lg" : "h-12 text-base",
            )}
          />
        </div>
        <button
          type="button"
          onClick={toggleMic}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Speak your search"}
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border",
            listening ? "bg-fg text-bg" : "bg-surface text-fg",
            large && "size-14",
          )}
        >
          <Mic className="size-5" aria-hidden />
        </button>
        <button
          type="submit"
          className={cn(
            "inline-flex h-12 shrink-0 items-center rounded-2xl bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-ink",
            large && "h-14 px-5",
          )}
        >
          Search
        </button>
      </div>
      {msg ? (
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          {msg}
        </p>
      ) : null}
    </form>
  );
}
