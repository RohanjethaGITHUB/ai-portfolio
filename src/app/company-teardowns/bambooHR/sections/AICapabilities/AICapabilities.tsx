"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AICapabilities.module.css";

type SlideKey = "now" | "next" | "later";

type Slide = {
  key: SlideKey;
  label: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export default function AICapabilities() {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "now",
        label: "Now",
        title: "Assistive AI that cuts effort without shifting authority",
        subtitle:
          "I’ve built and tested these patterns personally. They ship well because humans still own the decision, and the system stays auditable.",
        bullets: [
          "Drafting, not deciding: manager notes, policy summaries, review inputs, internal comms",
          "Summaries with boundaries: compress long histories, show sources, respect permissions",
          "Classification and routing: triage HR requests and route with context, not guesses",
          "Quality checks: missing fields, inconsistent approvals, and workflow gaps",
        ],
      },
      {
        key: "next",
        label: "Next",
        title: "Workflow intelligence and guardrails that improve consistency",
        subtitle:
          "This is where it starts to feel genuinely useful, but only if it stays visible, reversible, and policy-aware.",
        bullets: [
          "Guided next steps: suggest what to do next based on workflow state, not intuition",
          "Consistency checks at scale: flag anomalies before they become incidents",
          "Bias and tone flags: catch risky language early, keep final intent human-owned",
          "Context surfacing: pull the right facts at the right time for managers",
        ],
      },
      {
        key: "later",
        label: "Later",
        title: "Expanded intelligence after trust is earned and measured",
        subtitle:
          "Only go here once the basics are proven and instrumented. The failure mode is subtle harm, not just a bad suggestion.",
        bullets: [
          "Insights from derived signals: patterns across workflows that inform, not decide",
          "Policy interpretation with evidence: answers that cite source docs and record fields",
          "Incremental recommendations: reversible, monitored, and designed for overrides",
          "Hard boundary: avoid AI-driven decisions around pay, performance, or termination",
        ],
      },
    ],
    []
  );

  const DURATION_MS = 6500;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goPrev = () => setActive((v) => (v - 1 + slides.length) % slides.length);
  const goNext = () => setActive((v) => (v + 1) % slides.length);
  const togglePaused = () => setPaused((p) => !p);

  useEffect(() => {
    if (paused) return;

    const t = window.setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, DURATION_MS);

    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  const activeSlide = slides[active];

  return (
    <section className={styles.wrap} aria-label="AI Capabilities">
      <div
        className={styles.story}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Top card (match Context) */}
        <div className={styles.topCard}>
          <div className={styles.topLeft}>
            <p className={styles.eyebrow}>AI CAPABILITIES</p>
            <h2 className={styles.bigTitle}>Realistic AI for HR systems</h2>
            <p className={styles.lead}>
              I’m conservative here on purpose. I’ve built and tested similar AI systems personally,
              and the wins come from assistive workflows that stay auditable and controlled.
            </p>

            <div className={styles.chips}>
              <span className={styles.chip}>Suggest mode</span>
              <span className={styles.chip}>Human approvals</span>
              <span className={styles.chip}>Audit trails</span>
            </div>
          </div>

          {/* Context-style controls: prev, pause/play, next */}
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={goPrev}
              aria-label="Previous slide"
              title="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={togglePaused}
              aria-label={paused ? "Play" : "Pause"}
              title={paused ? "Play" : "Pause"}
            >
              {paused ? "▶" : "II"}
            </button>

            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={goNext}
              aria-label="Next slide"
              title="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Instagram story bars */}
        <div className={styles.storyBars} aria-hidden="true">
          {slides.map((_, idx) => {
            const done = idx < active;
            const isActive = idx === active;

            return (
              <div key={idx} className={styles.storyBar}>
                <div
                  className={`${styles.storyFill} ${done ? styles.storyFillDone : ""} ${
                    isActive && !paused ? styles.storyFillActive : ""
                  }`}
                  style={
                    isActive && !paused
                      ? ({ ["--dur" as any]: `${DURATION_MS}ms` } as React.CSSProperties)
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Slide area with tabs (Now/Next/Later headings) */}
        <div className={styles.slide}>
          <div className={styles.slideTabs} role="tablist" aria-label="AI Capability timeline">
            {slides.map((s, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActive(idx)}
                >
                  <span className={styles.tabDot} />
                  <span className={styles.tabLabel}>{s.label}</span>
                </button>
              );
            })}

            <div className={styles.slideMeta}>
              <span className={styles.metaPill}>{paused ? "PAUSED" : "AUTO"}</span>
              <span className={styles.metaText}>Hover to pause</span>
            </div>
          </div>

          <div className={styles.slideHeader}>
            <h3 className={styles.slideTitle}>{activeSlide.title}</h3>
            <p className={styles.slideSub}>{activeSlide.subtitle}</p>
          </div>

          <div className={styles.bullets}>
            {activeSlide.bullets.map((b) => (
              <div key={b} className={styles.bullet}>
                <span className={styles.bulletMark} />
                <p className={styles.bulletText}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footerNote}>
          <span className={styles.footerDot} />
          <p className={styles.footerText}>
            Rule I follow: AI suggests, humans approve, the system logs everything.
          </p>
        </div>
      </div>
    </section>
  );
}
