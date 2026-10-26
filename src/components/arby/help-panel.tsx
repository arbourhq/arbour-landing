"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Link from "next/link";
import { ArrowUpRight, Send, X } from "lucide-react";
import { Mark } from "@/components/wordmark";
import { APP } from "@/content/site";
import {
  HISTORY_LIMIT,
  MESSAGE_LIMIT,
  type HelpMessage,
} from "@/lib/arby-help/messages";
import "./help-panel.css";

type Props = {
  open: boolean;
  panelRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

const starters = [
  "How does the trial work?",
  "Can I move from another CRM?",
  "Which plan suits my business?",
];

export function HelpPanel({ open, panelRef, onClose }: Props) {
  const [messages, setMessages] = useState<HelpMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const followLatest = useRef(true);
  const exitAnimation = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    // Clear the held exit frame only after the dialog is hidden, or before
    // the next opening paints. Otherwise opacity flashes back to one.
    exitAnimation.current?.cancel();
    exitAnimation.current = null;
  }, [open]);

  useEffect(() => () => request.current?.abort(), []);

  useEffect(() => {
    if (!open) return;
    // Focus the close control first so opening on a phone does not summon the keyboard.
    closeButton.current?.focus({ preventScroll: true });
    const panel = panelRef.current;
    if (!panel) return;
    function fitViewport() {
      if (!panel) return;
      const viewport = window.visualViewport;
      const height = viewport?.height ?? window.innerHeight;
      panel.dataset.compact = String(height < 520);
      const bottom = Math.max(
        0,
        window.innerHeight - height - (viewport?.offsetTop ?? 0),
      );
      panel.style.setProperty("--help-viewport-height", `${height}px`);
      panel.style.setProperty("--help-keyboard-inset", `${bottom}px`);
    }
    fitViewport();
    window.visualViewport?.addEventListener("resize", fitViewport);
    window.visualViewport?.addEventListener("scroll", fitViewport);
    return () => {
      window.visualViewport?.removeEventListener("resize", fitViewport);
      window.visualViewport?.removeEventListener("scroll", fitViewport);
    };
  }, [open, panelRef]);

  useEffect(() => {
    if (open && followLatest.current && log.current)
      log.current.scrollTop = messages.length ? log.current.scrollHeight : 0;
  }, [messages, pending, error, open]);

  async function close() {
    if (closing) return;
    setClosing(true);
    const duration = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 160;
    try {
      const panel = panelRef.current;
      const animation = panel?.animate(
        [{ opacity: getComputedStyle(panel).opacity }, { opacity: 0 }],
        {
          duration,
          fill: "forwards",
        },
      );
      exitAnimation.current = animation ?? null;
      await animation?.finished;
    } catch {
      /* An interrupted exit still closes. */
    }
    setClosing(false);
    onClose();
  }

  async function send(text: string, retry = false) {
    const content = text.trim();
    if (!content || request.current || content.length > MESSAGE_LIMIT) return;
    const next: HelpMessage[] = retry
      ? messages
      : [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setError("");
    setPending(true);
    followLatest.current = true;
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/arby-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Retain complete user/assistant pairs, ending with this question.
        body: JSON.stringify({ messages: next.slice(-(HISTORY_LIMIT - 1)) }),
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(35_000),
        ]),
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          data &&
            typeof data === "object" &&
            "error" in data &&
            typeof data.error === "string"
            ? data.error
            : "That reply did not come through. Try again.",
        );
      }
      if (
        !data ||
        typeof data !== "object" ||
        !("message" in data) ||
        typeof data.message !== "string" ||
        !data.message.trim()
      ) {
        throw new Error("That reply did not come through. Try again.");
      }
      if (request.current === controller)
        setMessages([...next, { role: "assistant", content: data.message }]);
    } catch (cause) {
      if (!controller.signal.aborted)
        setError(
          cause instanceof Error && cause.name === "Error"
            ? cause.message
            : "The connection dropped or took too long. Try again, or contact Ben and Alex.",
        );
    } finally {
      if (request.current === controller) {
        request.current = null;
        setPending(false);
      }
    }
  }

  function reset() {
    request.current?.abort();
    request.current = null;
    setPending(false);
    setMessages([]);
    setDraft("");
    setError("");
    input.current?.focus({ preventScroll: true });
  }

  return (
    <dialog
      ref={panelRef}
      id="arby-help"
      className="arby-help"
      open={open}
      hidden={!open}
      data-arby-ui
      aria-labelledby="arby-help-title"
      aria-describedby="arby-help-description"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          void close();
        }
      }}
    >
      <header className="arby-help-header">
        {/* The console's Arby mark: the white A on a Bottle square, square
            because it is the brand, not a person. */}
        <span className="arby-help-mark" aria-hidden="true">
          <Mark tone="white" className="size-5" />
        </span>
        <div>
          <h2 id="arby-help-title">Arby Help</h2>
          <p id="arby-help-description">A little help from Arbour's AI.</p>
        </div>
        <button
          ref={closeButton}
          type="button"
          className="arby-help-close"
          onClick={() => void close()}
          aria-label="Close Arby Help"
          disabled={closing}
        >
          <X aria-hidden />
        </button>
      </header>
      <div
        ref={log}
        className="arby-help-log"
        role="log"
        aria-label="Conversation with Arby Help"
        aria-live="polite"
        onScroll={() => {
          if (log.current)
            followLatest.current =
              log.current.scrollHeight -
                log.current.scrollTop -
                log.current.clientHeight <
              48;
        }}
      >
        {messages.length === 0 && (
          <div className="arby-help-welcome">
            <h3>What can I help with?</h3>
            <p>
              Ask about getting started, moving your work across, or how Arbour
              works.
            </p>
            <p className="arby-help-note">
              I can explain the product. I can't see your account.
            </p>
          </div>
        )}
        {messages.length === 0 && (
          <div className="arby-help-starters">
            {starters.map((text) => (
              <button key={text} type="button" onClick={() => void send(text)}>
                {text}
              </button>
            ))}
          </div>
        )}
        {messages.map((message, index) => (
          <div
            className="arby-help-message"
            data-role={message.role}
            key={index}
          >
            <span className="mono-label">
              {message.role === "user" ? "You" : "Arby Help"}
            </span>
            <p>{message.content}</p>
          </div>
        ))}
        {pending && (
          <output className="arby-help-pending">
            <span aria-hidden="true" />
            Arby is having a look...
          </output>
        )}
        {error && (
          <div className="arby-help-error" role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void send(messages.at(-1)?.content ?? "", true)}
            >
              Try again
            </button>
            <button type="button" onClick={reset}>
              Start a new chat
            </button>
          </div>
        )}
      </div>
      <form
        className="arby-help-composer"
        onSubmit={(event) => {
          event.preventDefault();
          void send(draft);
        }}
      >
        <label className="sr-only" htmlFor="arby-help-question">
          Your question
        </label>
        <textarea
          ref={input}
          id="arby-help-question"
          rows={2}
          value={draft}
          maxLength={MESSAGE_LIMIT}
          disabled={!!error}
          placeholder="Ask Arby a question..."
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              void send(draft);
            }
          }}
        />
        <button
          type="submit"
          disabled={!draft.trim() || pending || !!error}
          aria-label="Send"
        >
          <Send aria-hidden />
        </button>
      </form>
      <footer className="arby-help-footer">
        <p>AI can get things wrong. Keep private details out.</p>
        <div>
          <a href={APP.help} target="_blank" rel="noreferrer">
            Help centre
            <ArrowUpRight aria-hidden />
          </a>
          <Link href="/contact">Contact us</Link>
          {messages.length > 0 && (
            <button type="button" onClick={reset}>
              New chat
            </button>
          )}
        </div>
      </footer>
    </dialog>
  );
}
