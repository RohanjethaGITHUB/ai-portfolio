"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../razorpay.module.css";
import cap from "./AICapabilities.module.css";

type Tone = "now" | "next" | "later";

type Item = {
  title: string;
  body: string;
};

type Slide = {
  label: "Now" | "Next" | "Later";
  timeframe: string;
  title: string;
  desc: string;
  tone: Tone;
  ships: Item[];
  realistic: Item[];
  recommendation: string;
};

function IconChevronLeft() {
  return (
    <svg className={cap.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={cap.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={cap.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={cap.icon} viewBox="0 0 24 24" aria-hidden="true">
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

function StoryRotator({ slides, ariaLabel }: { slides: Slide[]; ariaLabel: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const activeSlide = slides[Math.max(0, Math.min(slides.length - 1, active))];

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

    const durationMs = 9000;

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
    <div className={cap.storyWrap} aria-label={ariaLabel} tabIndex={0}>
      <div className={cap.slideHeader}>
        <h2 className={cap.slideTitle}>{activeSlide.title}</h2>
        <p className={cap.slideDesc}>{activeSlide.desc}</p>
      </div>

      <div className={cap.storyTop}>
        <div className={cap.storyTopRow}>
          <div className={cap.storyMetaRow}>
            <span className={`${cap.storyPill} ${cap[`pill_${activeSlide.tone}`]}`}>{activeSlide.label}</span>
            <span className={cap.storyPillMuted}>{activeSlide.timeframe}</span>
            <span className={cap.storyPillMuted}>{paused ? "Paused" : "Auto"}</span>
          </div>

          <div className={cap.storyNavTop}>
            <button type="button" className={cap.iconBtn} onClick={prev} aria-label="Previous">
              <IconChevronLeft />
            </button>

            <button
              type="button"
              className={cap.iconBtn}
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play" : "Pause"}
              aria-pressed={!paused}
            >
              {paused ? <IconPlay /> : <IconPause />}
            </button>

            <button type="button" className={cap.iconBtn} onClick={next} aria-label="Next">
              <IconChevronRight />
            </button>
          </div>
        </div>

        <div className={cap.storyBars} aria-hidden="true" style={{ ["--storyCount" as any]: slides.length }}>
          {slides.map((s, i) => {
            const isActive = i === active;
            const fill = isActive ? progress : i < active ? 1 : 0;

            return (
              <button
                key={`${s.label}-${i}`}
                type="button"
                className={`${cap.storyBar} ${isActive ? cap.storyBarActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Open: ${s.label}`}
              >
                <span className={cap.storyFill} style={{ transform: `scaleX(${clamp01(fill)})` }} />
              </button>
            );
          })}
        </div>
      </div>

      <div className={cap.storyViewport}>
        <div className={cap.storyZones} aria-hidden="true">
          <button type="button" className={cap.storyZone} onClick={prev} aria-label="Previous" tabIndex={-1} />
          <button type="button" className={cap.storyZone} onClick={next} aria-label="Next" tabIndex={-1} />
        </div>

        <article className={cap.capSlide}>
          <div className={cap.capGrid}>
            <div className={cap.capBlock}>
              <div className={cap.capBlockTitle}>What ships</div>

              <div className={cap.cardList}>
                {activeSlide.ships.map((it, idx) => (
                  <div className={cap.miniCard} key={`${activeSlide.label}-ship-${idx}`}>
                    <div className={cap.miniTitle}>{it.title}</div>
                    <div className={cap.miniBody}>{it.body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={cap.capBlock}>
              <div className={cap.capBlockTitle}>Why it is realistic</div>

              <div className={cap.cardList}>
                {activeSlide.realistic.map((it, idx) => (
                  <div className={`${cap.miniCard} ${cap.miniCardMuted}`} key={`${activeSlide.label}-real-${idx}`}>
                    <div className={cap.miniTitle}>{it.title}</div>
                    <div className={cap.miniBody}>{it.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cap.reco}>
            <div className={cap.recoTitle}>My Practical Recommendation</div>
            <div className={cap.recoBody}>{activeSlide.recommendation}</div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function AICapabilities() {
  const slides: Slide[] = useMemo(
    () => [
      {
        label: "Now",
        timeframe: "0 to 90 days",
        tone: "now",
        title: "Now: operational AI that reduces manual load",
        desc:
          "Start where teams already feel pain. Improve triage, explain anomalies, and assist risk analysts without touching the core payment path.",
        ships: [
          {
            title: "Support triage and routing",
            body: "Classify tickets and route them to the right ops queue with consistent tags.",
          },
          {
            title: "Anomaly explanations for ops",
            body: "Flag unusual patterns and generate plain-language summaries with evidence links.",
          },
          {
            title: "Risk rule tuning assistant",
            body: "Suggest rule changes, but keep approval with risk analysts and audit trails.",
          },
        ],
        realistic: [
          {
            title: "Low blast radius",
            body: "Advisory or workflow-level automation, not payments path automation.",
          },
          {
            title: "Fast feedback loops",
            body: "Measure time-to-resolution, queue backlog, and false positive reduction quickly.",
          },
          {
            title: "Minimal org change",
            body: "Fits current ops and risk workflows without new platform dependencies.",
          },
        ],
        recommendation:
          "Ship the triage and anomaly explanations first. Treat risk tuning as advisory only until you have stable monitoring, weekly analyst review, and a rollback playbook.",
      },
      {
        label: "Next",
        timeframe: "3 to 9 months",
        tone: "next",
        title: "Next: merchant-facing intelligence inside the dashboard",
        desc:
          "Once internal confidence is high, surface helpful insights to merchants. Keep it explainable and tied to outcomes like success rate and disputes.",
        ships: [
          {
            title: "Merchant health insights",
            body: "Highlight success rate drops, bank-level issues, settlement delays, and trends.",
          },
          {
            title: "Guided onboarding",
            body: "Detect integration blockers and suggest the next action based on telemetry.",
          },
          {
            title: "Dispute prediction",
            body: "Identify high risk transactions and recommend preventive steps for merchants.",
          },
        ],
        realistic: [
          {
            title: "Works if UX is calm",
            body: "Insights must be selective, explainable, and tied to actions, not alert spam.",
          },
          {
            title: "Clear ownership",
            body: "Product and ops need a shared loop for tuning models and merchant messaging.",
          },
          {
            title: "Data contracts matter",
            body: "Requires stable event tracking and consistent definitions across teams.",
          },
        ],
        recommendation:
          "Make every merchant-facing insight earn its spot. If an insight cannot map to a clear action and a measurable outcome, it stays internal.",
      },
      {
        label: "Later",
        timeframe: "9 to 18 months",
        tone: "later",
        title: "Later: platform intelligence that compounds over time",
        desc:
          "Build a shared intelligence layer that improves risk, pricing, and operations across products. This is where AI becomes a durable advantage.",
        ships: [
          {
            title: "Adaptive risk and pricing intelligence",
            body: "Suggest thresholds and pricing bands with approvals, monitoring, and audits.",
          },
          {
            title: "Unified merchant intelligence layer",
            body: "A shared view across payments and adjacent products for consistent decisions.",
          },
          {
            title: "Ops forecasting",
            body: "Forecast spikes, disputes, and load to plan infra and ops capacity proactively.",
          },
        ],
        realistic: [
          {
            title: "Governance first",
            body: "Model monitoring, drift checks, and review workflows need to be non-negotiable.",
          },
          {
            title: "Cross-team alignment",
            body: "Shared layer only works if inputs and definitions are standardised.",
          },
          {
            title: "Compounding payoff",
            body: "Once stable, improvements lift multiple products and segments together.",
          },
        ],
        recommendation:
          "Do not start the shared intelligence layer until you have a clean event taxonomy and a single source of truth for merchant and transaction state. Otherwise you build an expensive opinion engine.",
      },
    ],
    []
  );

  return (
    <section id="ai-capabilities" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>AI Capabilities</h2>
        <p className={styles.sectionDesc}>Now, Next, Later capability portfolio.</p>
      </div>

      <StoryRotator slides={slides} ariaLabel="AI capabilities story rotator" />
    </section>
  );
}
