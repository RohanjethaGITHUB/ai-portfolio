"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../razorpay.module.css";
import gov from "./ExecutionGovernance.module.css";

type SlideTone = "exec" | "measure" | "guard";

type Card = {
  title: string;
  body: string;
};

type Slide = {
  label: string;
  tone: SlideTone;
  title: string;
  principle: string;
  cards: Card[];
  calloutTitle: string;
  calloutBody: string;
  dontAutomate?: string[];
};

function IconChevronLeft() {
  return (
    <svg className={gov.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={gov.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={gov.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={gov.icon} viewBox="0 0 24 24" aria-hidden="true">
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

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function StoryLite({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const slide = slides[Math.max(0, Math.min(slides.length - 1, active))];

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    setActive(clamped);
    setProgress(0);
  };

  const next = () => goTo(active + 1 >= slides.length ? 0 : active + 1);
  const prev = () => goTo(active - 1 < 0 ? slides.length - 1 : active - 1);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
      return;
    }

    // calmer pacing than other sections
    const durationMs = 13000;

    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;

      setProgress((p) => {
        const nextP = p + dt / durationMs;
        if (nextP >= 1) {
          setTimeout(() => next(), 0);
          return 0;
        }
        return nextP;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, active]);

  return (
    <div className={gov.wrap}>
      <div className={gov.top}>
        <div className={gov.topRow}>
          <div className={gov.meta}>
            <span className={`${gov.pill} ${gov[`pill_${slide.tone}`]}`}>{slide.label}</span>
            <span className={gov.pillMuted}>{paused ? "Paused" : "Auto"}</span>
          </div>

          <div className={gov.controls}>
            <button type="button" className={gov.iconBtn} onClick={prev} aria-label="Previous">
              <IconChevronLeft />
            </button>

            <button
              type="button"
              className={gov.iconBtn}
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play" : "Pause"}
              aria-pressed={!paused}
            >
              {paused ? <IconPlay /> : <IconPause />}
            </button>

            <button type="button" className={gov.iconBtn} onClick={next} aria-label="Next">
              <IconChevronRight />
            </button>
          </div>
        </div>

        <div className={gov.bars} aria-hidden="true" style={{ ["--count" as any]: slides.length }}>
          {slides.map((s, i) => {
            const isActive = i === active;
            const fill = isActive ? progress : i < active ? 1 : 0;

            return (
              <button
                key={`${s.label}-${i}`}
                type="button"
                className={`${gov.bar} ${isActive ? gov.barActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Open: ${s.label}`}
              >
                <span className={gov.fill} style={{ transform: `scaleX(${clamp01(fill)})` }} />
              </button>
            );
          })}
        </div>
      </div>

      <div className={gov.viewport}>
        <div className={gov.zones} aria-hidden="true">
          <button type="button" className={gov.zone} onClick={prev} aria-label="Previous" tabIndex={-1} />
          <button type="button" className={gov.zone} onClick={next} aria-label="Next" tabIndex={-1} />
        </div>

        <article className={gov.panel}>
          <header className={gov.header}>
            <h3 className={gov.title}>{slide.title}</h3>
            <p className={gov.principle}>{slide.principle}</p>
          </header>

          <div className={gov.grid}>
            {slide.cards.map((c, idx) => (
              <div className={gov.card} key={`${slide.label}-c-${idx}`}>
                <div className={gov.cardTitle}>{c.title}</div>
                <div className={gov.cardBody}>{c.body}</div>
              </div>
            ))}
          </div>

          <div className={gov.callout}>
            <div className={gov.calloutTitle}>{slide.calloutTitle}</div>
            <div className={gov.calloutBody}>{slide.calloutBody}</div>
          </div>

          {slide.dontAutomate && slide.dontAutomate.length > 0 ? (
            <div className={gov.noAuto}>
              <div className={gov.noAutoTitle}>What I would not automate</div>
              <ul className={gov.noAutoList}>
                {slide.dontAutomate.map((x, i) => (
                  <li key={`${slide.label}-na-${i}`}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}

export default function Governance() {
  const slides: Slide[] = useMemo(
    () => [
      {
        label: "Execution",
        tone: "exec",
        title: "Ship AI in phases, earn trust before automation",
        principle:
          "If it cannot run safely in shadow mode, it is not ready to influence the payments path.",
        cards: [
          { title: "Shadow mode", body: "Run in parallel, compare against human outcomes, and measure deltas." },
          { title: "Assisted decisions", body: "Advisory only, with overrides and rationale captured by default." },
          { title: "Narrow automation", body: "Automate low-risk decisions only, behind thresholds and guardrails." },
          { title: "Portfolio reviews", body: "Quarterly review models as a portfolio. Pause or retire quickly." },
        ],
        calloutTitle: "My governance stance",
        calloutBody:
          "Treat AI like financial infrastructure. Shipping is a rollout discipline, not a model accuracy contest.",
      },
      {
        label: "Measurement",
        tone: "measure",
        title: "Measure outcomes, not vibes",
        principle:
          "Every model owns a small set of metrics and a clear rollback trigger.",
        cards: [
          { title: "Ops efficiency", body: "Backlog, time-to-resolution, manual review hours reduced." },
          { title: "Risk outcomes", body: "False positives, false negatives, dispute rates, fraud loss deltas." },
          { title: "Merchant impact", body: "Success rate changes, support dependency, retention signals." },
          { title: "Decision quality", body: "Override rate and post-override outcomes, reviewed weekly." },
        ],
        calloutTitle: "My practical recommendation",
        calloutBody:
          "Pick 2–3 metrics that matter and publish them weekly. If you cannot explain movement in those metrics, the model is not ready to scale.",
      },
      {
        label: "Guardrails",
        tone: "guard",
        title: "Make failures boring and reversible",
        principle:
          "When confidence drops, the system should fail safely back to deterministic rules.",
        cards: [
          { title: "Data access and retention", body: "Minimum data needed, with clear retention windows and access logs." },
          { title: "Auditability", body: "Reconstruct any decision: inputs, model version, thresholds, and overrides." },
          { title: "Drift monitoring", body: "Monitor drift by segment, rail, and geography. Investigate before changing." },
          { title: "Kill switches", body: "Rollback plans and toggles are mandatory, tested like incident runbooks." },
        ],
        calloutTitle: "My practical recommendation",
        calloutBody:
          "Do not automate high-stakes decisions unless you can trace, explain, override, and roll back within minutes during an incident.",
        dontAutomate: [
          "Dispute approvals or reversals without human review",
          "High-value payout blocks based only on model output",
          "Risk rule changes that self-deploy without an approval workflow",
        ],
      },
    ],
    []
  );

  return (
    <section id="governance" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Execution & AI Governance</h2>
        <p className={styles.sectionDesc}>Phasing, measurement, reviews, and guardrails.</p>
      </div>

      <StoryLite slides={slides} />
    </section>
  );
}
