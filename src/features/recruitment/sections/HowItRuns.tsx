"use client";

// src/features/recruitment/sections/HowItRuns.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles/recruitmentOS.module.css";
import hstyles from "./styles/HowItWorks.module.css";

type Props = { id: string };

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  bullets: string[];
  impacts: { label: string; value: string }[];
};

const AUTO_MS = 6500;

function toneForImpactLabel(label: string): string {
  const t = label.trim().toLowerCase();
  if (t.includes("reliability")) return "quality";
  if (t.includes("quality")) return "quality";
  if (t.includes("risk")) return "risk";
  if (t.includes("speed")) return "speed";
  if (t.includes("signal")) return "signal";
  if (t.includes("ops")) return "ops";
  if (t.includes("trace")) return "consistency";
  if (t.includes("feedback")) return "alignment";
  return "neutral";
}

export function HowItRuns({ id }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "entry",
        title: "How work enters the system",
        subtitle: "Every run starts from a real business event, not a demo input.",
        imageSrc: "/how-it-enters.png",
        bullets: [
          "Role requests arrive from job boards, inbound leads, CRM updates, or email",
          "Inputs are normalised into a consistent run payload",
          "Missing fields are flagged early so runs do not proceed blindly",
        ],
        impacts: [
          { label: "Ops", value: "Cleaner inputs" },
          { label: "Risk", value: "Fewer bad runs" },
          { label: "Speed", value: "Faster kickoff" },
        ],
      },
      {
        key: "decisions",
        title: "How decisions are made",
        subtitle: "Decisions are constrained, explainable, and repeatable.",
        imageSrc: "/how-it-decisions.png",
        bullets: [
          "Enrichment runs before any decision step to reduce guesswork",
          "LLM outputs are constrained by structured prompts and rules",
          "Decisions use combined signals, not a single model response",
        ],
        impacts: [
          { label: "Quality", value: "More consistent" },
          { label: "Signal", value: "Less noise" },
          { label: "Trace", value: "Clear rationale" },
        ],
      },
      {
        key: "failures",
        title: "How failures are handled",
        subtitle: "Runs fail safely, with retries and clear visibility.",
        imageSrc: "/how-it-fails.png",
        bullets: [
          "Retries handle transient API errors and timeouts",
          "Fallback paths prevent silent failures and partial actions",
          "Failed runs are logged and surfaced for review",
        ],
        impacts: [
          { label: "Reliability", value: "Safer runs" },
          { label: "Risk", value: "Fewer breakages" },
          { label: "Ops", value: "Debuggable" },
        ],
      },
      {
        key: "quality",
        title: "How quality is controlled",
        subtitle: "Quality gates stop low-confidence outputs from becoming actions.",
        imageSrc: "/how-it-quality.png",
        bullets: [
          "QA checks validate outputs before outbound actions execute",
          "Thresholds catch inconsistent or low-confidence results",
          "Human review is used selectively where it adds leverage",
        ],
        impacts: [
          { label: "Quality", value: "Higher trust" },
          { label: "Risk", value: "Less leakage" },
          { label: "Ops", value: "Fewer reruns" },
        ],
      },
      {
        key: "measurement",
        title: "How outcomes are measured",
        subtitle: "Every run closes the loop with measurable feedback.",
        imageSrc: "/how-it-measurement.png",
        bullets: [
          "Inputs, decisions, and outcomes are logged per run",
          "Results inform prompt tuning, thresholds, and routing logic",
          "The system improves based on operational feedback over time",
        ],
        impacts: [
          { label: "Feedback", value: "Continuous improvement" },
          { label: "Trace", value: "Auditable" },
          { label: "Ops", value: "Repeatable" },
        ],
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const total = slides.length;
  const active = slides[idx];

  function go(next: number) {
    const wrapped = (next + total) % total;
    setIdx(wrapped);
  }

  function next() {
    go(idx + 1);
  }

  function prev() {
    go(idx - 1);
  }

  useEffect(() => {
    if (paused) return;

    timerRef.current = window.setTimeout(() => {
      setIdx((v) => (v + 1) % total);
    }, AUTO_MS);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [idx, paused, total]);

  return (
    <section id={id} className={styles.rosSection}>
      <div className={styles.rosSectionTop}>
        <h2 className={styles.rosH2}>How it runs</h2>
        <p className={styles.rosLead}>A story-style view of the run mechanics behind the system.</p>
      </div>

      <div
        className={hstyles.storyShell}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={hstyles.storyBars} aria-hidden="true">
          {slides.map((s, i) => {
            const isDone = i < idx;
            const isActive = i === idx;

            return (
              <div key={s.key} className={hstyles.storyBar}>
                <div
                  className={[
                    hstyles.storyBarFill,
                    isDone ? hstyles.isDone : "",
                    isActive && !paused ? hstyles.isRunning : "",
                    isActive && paused ? hstyles.isPaused : "",
                  ].join(" ")}
                />
              </div>
            );
          })}
        </div>

        <div className={hstyles.storySlide}>
          <div className={hstyles.storyTopRow}>
            <div className={hstyles.storySlideMeta}>
              <div className={hstyles.storyKicker}>HOW IT RUNS</div>
              <div className={hstyles.storyTitle}>{active.title}</div>
              <div className={hstyles.storySubtitle}>{active.subtitle}</div>
            </div>

            <div className={hstyles.storyControls}>
              <button type="button" className={hstyles.storyIconBtn} onClick={prev} aria-label="Previous">
                ‹
              </button>

              <button
                type="button"
                className={hstyles.storyIconBtn}
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play" : "Pause"}
                title={paused ? "Play" : "Pause"}
              >
                {paused ? "▶" : "❚❚"}
              </button>

              <button type="button" className={hstyles.storyIconBtn} onClick={next} aria-label="Next">
                ›
              </button>
            </div>
          </div>

          <div className={hstyles.storyImageSlot}>
            <div className={hstyles.storyImageFrame} aria-label={`${active.title} diagram`}>
              <Image
                key={active.imageSrc}
                src={active.imageSrc}
                alt={`${active.title} diagram`}
                fill
                priority
                className={hstyles.storyImage}
                sizes="(max-width: 980px) 92vw, 760px"
              />
            </div>
          </div>

          <div className={hstyles.storyBody}>
            <div className={hstyles.storyBlockTitle}>How it works</div>

            <ul className={hstyles.storyBullets}>
              {active.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className={hstyles.storyImpactRow}>
              {active.impacts.map((x) => {
                const tone = toneForImpactLabel(x.label);
                return (
                  <div key={`${x.label}-${x.value}`} className={hstyles.storyImpactChip} data-tone={tone}>
                    <span className={hstyles.storyImpactDot} aria-hidden="true" />
                    <span className={hstyles.storyImpactLabel}>{x.label}</span>
                    <span className={hstyles.storyImpactValue}>{x.value}</span>
                  </div>
                );
              })}
            </div>

            <div className={hstyles.storyFooter}>
              <div className={hstyles.storyCount}>
                {idx + 1}/{total}
              </div>
              <div className={hstyles.storyHint}>Hover to pause</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
