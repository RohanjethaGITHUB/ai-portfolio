import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../razorpay.module.css";
import context from "./Context.module.css";

type Tone = "conversion" | "risk" | "ops" | "measurable" | "platform" | "compliance";

type HeaderTag = {
  label: string;
  tone: Tone;
};

type Slide = {
  key: "platform" | "constraints" | "lift";
  label: string;
  title: string;
  body: string;

  headerTags: HeaderTag[];

  tags: string[];
  bullets: string[];
  cards: { title: string; desc: string; tag?: string }[];
  calloutTitle: string;
  calloutBody: string;

  // New, non duplicate copy for the content card
  panelTitle: string;
  panelBody: string;
};

function IconChevronLeft() {
  return (
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.5 6.5L9.5 12l5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.5 6.5L14.5 12l-5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPause() {
  return (
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.5 7.5v9M15.5 7.5v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10 8.5l7 3.5-7 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StoryRotator({
  slides,
  ariaLabel,
  autoMs = 7500,
  onActiveChange,
}: {
  slides: Slide[];
  ariaLabel: string;
  autoMs?: number;
  onActiveChange?: (slide: Slide, index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const count = slides.length;

  const goTo = (idx: number) => {
    const next = (idx + count) % count;
    setActive(next);
    elapsedRef.current = 0;
    startedAtRef.current = null;
    setProgress(0);
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    onActiveChange?.(slides[active], active);
  }, [active, slides, onActiveChange]);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startedAtRef.current = null;
      return;
    }

    const tick = (t: number) => {
      if (startedAtRef.current === null) startedAtRef.current = t;

      const delta = t - startedAtRef.current;
      startedAtRef.current = t;

      elapsedRef.current += delta;

      const p = Math.min(1, elapsedRef.current / autoMs);
      setProgress(p);

      if (p >= 1) {
        goTo(active + 1);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startedAtRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, autoMs]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setPaused((v) => !v);
    }
  };

  const activeSlide = slides[active];

  return (
    <div
      className={context.storyWrap}
      role="group"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className={context.storyTop}>
        <div className={context.storyTopRow}>
          <div className={context.storyMetaRow}>
            <span className={context.storyPill}>{activeSlide.label}</span>
            <span className={context.storyPillMuted}>{paused ? "Paused" : "Auto"}</span>
          </div>

          <div className={context.storyNavTop}>
            <button type="button" className={context.iconBtn} onClick={prev} aria-label="Previous">
              <IconChevronLeft />
            </button>

            <button
              type="button"
              className={context.iconBtn}
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? "Play" : "Pause"}
              aria-pressed={paused}
            >
              {paused ? <IconPlay /> : <IconPause />}
            </button>

            <button type="button" className={context.iconBtn} onClick={next} aria-label="Next">
              <IconChevronRight />
            </button>
          </div>
        </div>

        <div
          className={context.storyBars}
          aria-hidden="true"
          style={{ ["--storyCount" as any]: slides.length }}
        >
          {slides.map((s, i) => {
            const isActive = i === active;
            const fill = isActive ? progress : i < active ? 1 : 0;

            return (
              <button
                key={`${s.label}-${i}`}
                type="button"
                className={`${context.storyBar} ${isActive ? context.storyBarActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Open: ${s.label}`}
              >
                <span className={context.storyFill} style={{ transform: `scaleX(${fill})` }} />
              </button>
            );
          })}
        </div>
      </div>

      <div className={context.storyViewport}>
        <div className={context.storyZones} aria-hidden="true">
          <button type="button" className={context.storyZone} onClick={prev} aria-label="Previous" tabIndex={-1} />
          <button type="button" className={context.storyZone} onClick={next} aria-label="Next" tabIndex={-1} />
        </div>

        <div className={context.storyGrid}>
          <article className={context.storySlide}>
            <div className={context.tagRow}>
              {activeSlide.tags.map((t) => (
                <span key={t} className={context.tag}>
                  {t}
                </span>
              ))}
            </div>

            {/* NEW COPY: no duplicate title/body */}
            <h3 className={context.panelTitle}>{activeSlide.panelTitle}</h3>
            <p className={context.panelBody}>{activeSlide.panelBody}</p>

            <div className={context.cardGrid}>
              {activeSlide.cards.map((c, idx) => (
                <div key={`${c.title}-${idx}`} className={context.miniCard}>
                  <div className={context.miniCardTop}>
                    <div className={context.miniCardTitle}>{c.title}</div>
                    {c.tag ? <span className={context.miniTag}>{c.tag}</span> : null}
                  </div>
                  <div className={context.miniCardDesc}>{c.desc}</div>
                </div>
              ))}
            </div>

            <ul className={context.storyList}>
              {activeSlide.bullets.map((b, idx) => (
                <li key={`${activeSlide.label}-b-${idx}`}>{b}</li>
              ))}
            </ul>

            <div className={context.callout}>
              <div className={context.calloutTitle}>{activeSlide.calloutTitle}</div>
              <div className={context.calloutBody}>{activeSlide.calloutBody}</div>
            </div>
          </article>

          {/* RIGHT COLUMN: image placeholder (PNG later) */}
          <aside className={context.storySide}>
            <div className={context.imageBox}>
              <img
                src="/context.png"
                alt="Core surface areas diagram"
                className={context.image}
                loading="lazy"
              />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default function Context() {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "platform",
        label: "Platform",
        title: "What the platform does",
        body:
          "Razorpay is a payments and money movement platform. It helps businesses accept payments, move funds, and reconcile money flows across multiple rails.",

        headerTags: [
          { label: "Payments OS", tone: "platform" },
          { label: "Money movement", tone: "ops" },
          { label: "Merchant tooling", tone: "measurable" },
        ],

        tags: ["Surface area", "Reliability first", "Multi product"],
        panelTitle: "Core surface areas (quick map)",
        panelBody:
          "Think of Razorpay as three connected surfaces: checkout completion, money movement, and reporting. The most important thing is not features. It is where failures show up and how teams recover.",

        cards: [
          { title: "Accept", desc: "Checkout orchestration across cards, UPI, netbanking, wallets.", tag: "Conversion" },
          { title: "Move", desc: "Payouts, refunds, settlements, dispute flows.", tag: "Reliability" },
          { title: "Reconcile", desc: "Ledger views, settlement reporting, ops workflows.", tag: "Ops" },
        ],
        bullets: [
          "More rails means more edge cases and integration variance",
          "Onboarding is product plus compliance, not just a form",
          "Trust is driven by success rate, latency, and clarity",
        ],
        calloutTitle: "Context lens",
        calloutBody: "Before AI, map the surface area and the failure modes. Safe automation starts there.",
      },
      {
        key: "constraints",
        label: "Constraints",
        title: "Primary constraints",
        body:
          "Payments systems operate under strict reliability, fraud, and compliance constraints. Small regressions can become expensive trust failures.",

        headerTags: [
          { label: "Latency budgets", tone: "conversion" },
          { label: "Fraud pressure", tone: "risk" },
          { label: "Auditability", tone: "compliance" },
        ],

        tags: ["Non negotiables", "Fallbacks", "Monitoring"],
        panelTitle: "Constraints you cannot negotiate",
        panelBody:
          "Payments is adversarial and time sensitive. Any intelligence layer must stay controllable, debuggable, and reversible. A smart feature that cannot be explained becomes a support liability.",

        cards: [
          { title: "Latency", desc: "Checkout must feel instant. Slow paths kill completion.", tag: "Real time" },
          { title: "Fraud", desc: "Adversarial behavior changes constantly.", tag: "Adaptive" },
          { title: "Compliance", desc: "KYC, audit trails, explainability, data handling.", tag: "Strict" },
        ],
        bullets: [
          "Every AI decision needs a deterministic fallback",
          "Observability matters: alerts, traces, and human override",
          "Risk controls cannot be a black box to the team",
        ],
        calloutTitle: "Guardrail rule",
        calloutBody: "If the system cannot explain a decision to a human, it should not be making that decision.",
      },
      {
        key: "lift",
        label: "AI lift",
        title: "Where AI can drive lift",
        body:
          "AI should lift conversion, reduce fraud losses, and improve ops efficiency while staying measurable and explainable.",

        // These are the new tags that will appear under the main heading (section header)
        headerTags: [
          { label: "Conversion", tone: "conversion" },
          { label: "Risk", tone: "risk" },
          { label: "Ops efficiency", tone: "ops" },
          { label: "Measurable", tone: "measurable" },
        ],

        tags: ["Start assistive", "Instrument first", "Scale carefully"],
        panelTitle: "Lift levers (practical and safe)",
        panelBody:
          "The fastest wins come from assistive workflows: explain patterns, suggest next actions, and reduce time to resolution. Automation comes after the system proves it can be measured and rolled back.",

        cards: [
          { title: "Conversion", desc: "Smarter retries, routing hints, drop off diagnosis.", tag: "Revenue" },
          { title: "Risk", desc: "Anomaly detection, merchant risk briefings, adaptive friction.", tag: "Losses" },
          { title: "Support", desc: "Ticket triage, plain language root cause, next best action.", tag: "Efficiency" },
        ],
        bullets: [
          "Tie lift to one metric per feature: success rate, chargeback rate, time to resolution",
          "Start with suggestions and summaries, then expand to automation",
          "Ship in increments: measure, then scale",
        ],
        calloutTitle: "What matters",
        calloutBody: "Lift is outcomes with guardrails. Every change needs a success metric and a rollback path.",
      },
    ],
    []
  );

  const [activeTitle, setActiveTitle] = useState(slides[0]?.title ?? "Context");
  const [activeSub, setActiveSub] = useState(slides[0]?.body ?? "");
  const [activeHeaderTags, setActiveHeaderTags] = useState<HeaderTag[]>(slides[0]?.headerTags ?? []);

  return (
    <section id="context" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{activeTitle}</h2>
        <p className={styles.sectionDesc}>{activeSub}</p>

        {/* NEW: colored tags under the heading in the same header box */}
        {activeHeaderTags.length > 0 ? (
          <div className={context.headerTagRow}>
            {activeHeaderTags.map((t) => (
              <span
                key={t.label}
                className={`${context.hTag} ${context[`hTag_${t.tone}`]}`}
              >
                {t.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={context.ctxSingle}>
        <StoryRotator
          slides={slides}
          ariaLabel="Context story"
          onActiveChange={(s) => {
            setActiveTitle(s.title);
            setActiveSub(s.body);
            setActiveHeaderTags(s.headerTags ?? []);
          }}
        />
      </div>
    </section>
  );
}
