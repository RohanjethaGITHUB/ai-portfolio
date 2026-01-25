"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./RoadmapMetrics.module.css";

type StageKey = "mvp" | "v2" | "v3" | "future";
type Metric = { k: string; v: string; s: string };

type Stage = {
  key: StageKey;
  label: string;
  kicker: string;

  title: string;
  goal: string;

  highlights: string[];

  leftTitle: string;
  leftItems: string[];

  rightTitle: string;
  rightItems: string[];

  metricsTitle: string;
  metrics: Metric[];
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export default function RoadmapMetrics() {
  const stages: Stage[] = useMemo(
    () => [
      {
        key: "mvp",
        label: "MVP",
        kicker: "Validate",

        title: "MVP: prove the loop",
        goal: "One action should change weekly spending behavior.",

        highlights: ["Single account", "3 to 5 categories", "One action per run"],

        leftTitle: "What exists",
        leftItems: [
          "Ingest, normalize, categorize",
          "Weekly baseline and drift flags",
          "Rules and guardrails pick one action",
          "Send via one channel with one CTA",
        ],

        rightTitle: "What it takes",
        rightItems: [
          "Build: 4 to 5 weeks",
          "Team: 1 engineer + 1 designer (lean)",
          "Run cost: low hundreds per month",
          "Goal: validate impact before scaling",
        ],

        metricsTitle: "MVP metrics",
        metrics: [
          { k: "Delivery", v: "98%+", s: "Messages delivered successfully" },
          { k: "Time to send", v: "< 2 min", s: "From drift detected to message delivered" },
          { k: "Action rate", v: "8 to 15%", s: "Tap, click, or reply on the suggested action" },
          { k: "Ignore rate", v: "< 55%", s: "If higher, signal is too noisy or too frequent" },
          { k: "False positives", v: "< 20%", s: "Spot checks show nudges are relevant" },
          { k: "Early impact", v: "7 to 14 days", s: "Repeat overspend events reduce in targeted categories" },
        ],
      },

      {
        key: "v2",
        label: "V2",
        kicker: "Precision",

        title: "V2: improve decision quality",
        goal: "Fewer false positives. Higher action rate.",

        highlights: ["Personal thresholds", "Smarter ranking", "User controls"],

        leftTitle: "What improves",
        leftItems: [
          "Personal thresholds per category",
          "Rank actions by past behavior",
          "Suppress weak signals with confidence",
          "Simple cadence controls to prevent repeats",
        ],

        rightTitle: "What users see",
        rightItems: [
          "History: nudges with outcomes",
          "Preferences: topics and frequency",
          "Short why line: why now",
          "Cleaner channel formatting",
        ],

        metricsTitle: "V2 metrics",
        metrics: [
          { k: "Action lift", v: "+20%+", s: "Relative action rate improvement vs MVP" },
          { k: "Ignore rate", v: "Down", s: "Lower ignores on high severity nudges" },
          { k: "Opt out", v: "< 3% monthly", s: "Mute and opt out remains low" },
          { k: "Time to action", v: "Faster", s: "Median time from send to action drops" },
          { k: "Helpful rating", v: "4.2+", s: "Quick feedback after nudges (optional)" },
          { k: "Repeat cap", v: "< 2", s: "No more than two nudges on one theme in a window" },
        ],
      },

      {
        key: "v3",
        label: "V3",
        kicker: "Impact",

        title: "V3: prove measurable outcomes",
        goal: "Show real financial impact, not just engagement.",

        highlights: ["Attribution", "Experiments", "Holdout lift"],

        leftTitle: "Outcome layer",
        leftItems: [
          "Attribution windows: 7 and 30 days",
          "Savings moved and buffer days tracked",
          "Recurring spend outcomes (subscriptions)",
          "Overspend recurrence tracked over time",
        ],

        rightTitle: "Proof layer",
        rightItems: [
          "A/B tests for nudges and copy",
          "Holdout group for lift",
          "Channel mix testing",
          "Re-rank actions using measured lift",
        ],

        metricsTitle: "V3 metrics",
        metrics: [
          { k: "Savings moved", v: "A$ per user", s: "Attributed net change over 30 days" },
          { k: "Buffer days", v: "+ days", s: "Improvement vs baseline period" },
          { k: "Lift vs holdout", v: "Positive", s: "Outcome lift measured against holdout" },
          { k: "Recurrence", v: "Down", s: "Repeat overspend events reduce month over month" },
          { k: "Retention", v: "WAU", s: "Weekly active use holds over multiple weeks" },
          { k: "Experiment rate", v: "2 to 4 per month", s: "Experiments shipped with decisions" },
        ],
      },

      {
        key: "future",
        label: "Future",
        kicker: "Expand",

        title: "Future: expand coverage responsibly",
        goal: "Scale only after trust and impact are stable.",

        highlights: ["Multi account", "Planning", "Proactive timing"],

        leftTitle: "Coverage",
        leftItems: [
          "Multi account aggregation",
          "Bills calendar and cashflow timeline",
          "Forecast and scenario nudges",
          "Household and shared budgets",
        ],

        rightTitle: "Coaching",
        rightItems: [
          "Goal progress nudges",
          "Context aware timing (paydays, bills)",
          "Long term habit insights",
          "Clear override controls for trust",
        ],

        metricsTitle: "Future metrics",
        metrics: [
          { k: "Multi account", v: "Up", s: "Users connect and keep multiple accounts" },
          { k: "Forecast error", v: "Down", s: "Accuracy improves over time" },
          { k: "Goal completion", v: "Up", s: "More users hit defined savings goals" },
          { k: "Churn", v: "Down", s: "Retention improves with proactive coaching" },
          { k: "Trust", v: "High", s: "Low complaint rate, low overrides" },
          { k: "Satisfaction", v: "CSAT", s: "Users report clarity and usefulness" },
        ],
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const idxRef = useRef<number>(0);
  const lenRef = useRef<number>(stages.length);

  const DURATION_MS = 5200;

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    lenRef.current = stages.length;
  }, [stages.length]);

  const go = (next: number) => {
    const len = stages.length || 1;
    const safe = (next + len) % len;
    startRef.current = 0;
    idxRef.current = safe;
    setIdx(safe);
    setProgress(0);
  };

  const goPrev = () => go(idxRef.current - 1);
  const goNext = () => go(idxRef.current + 1);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t;

      const elapsed = t - startRef.current;

      if (elapsed >= DURATION_MS) {
        const len = lenRef.current || stages.length || 1;
        const nextIdx = (idxRef.current + 1) % len;

        startRef.current = t;
        idxRef.current = nextIdx;

        setIdx(nextIdx);
        setProgress(0);
      } else {
        setProgress(elapsed / DURATION_MS);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, stages.length]);

  const stage = stages[idx];

  return (
    <div className={styles.scope}>
      <div className="amc-block">
        <div className="amc-kLabel">Roadmap and metrics</div>

        <div className={styles.topRow}>
          <div>
            <div className="amc-h2" style={{ marginTop: 8 }}>
              What ships now and what improves next
            </div>
            <div className="amc-sub2">Four stages with scope discipline and measurable success.</div>
          </div>

          <div className={styles.controls} role="group" aria-label="Roadmap controls">
            <button className={styles.ctrlBtn} type="button" onClick={goPrev} aria-label="Previous stage">
              ‹
            </button>
            <button
              className={styles.ctrlBtn + " " + styles.ctrlToggle}
              type="button"
              onClick={() => setIsPlaying((v) => !v)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button className={styles.ctrlBtn} type="button" onClick={goNext} aria-label="Next stage">
              ›
            </button>
          </div>
        </div>

        <div
          className={styles.storyShell}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          role="region"
          aria-label="Roadmap stage timeline"
        >
          <div className={styles.bars} aria-hidden="true">
            {stages.map((s, i) => {
              const isDone = i < idx;
              const isNow = i === idx;
              const w = isNow ? `${Math.round(clamp01(progress) * 100)}%` : isDone ? "100%" : "0%";

              return (
                <button
                  key={s.key}
                  type="button"
                  className={styles.bar + (isNow ? " " + styles.isNow : isDone ? " " + styles.isDone : "")}
                  onClick={() => go(i)}
                  aria-label={`Go to ${s.label}`}
                >
                  <span className={styles.fill} style={{ width: w }} />
                </button>
              );
            })}
          </div>

          <div className={styles.stageCard}>
            <div className={styles.stageTop}>
              <div className={styles.stagePill}>
                <span className={styles.stageNum}>{stage.label}</span>
                <span className={styles.stageKicker}>{stage.kicker}</span>
              </div>

              <div className={styles.stageTitle}>{stage.title}</div>

              <div className={styles.goalRow}>
                <div className={styles.goalLabel}>Goal</div>
                <div className={styles.goalText}>{stage.goal}</div>
              </div>

              <div className={styles.highlights}>
                {stage.highlights.map((h) => (
                  <span key={h} className={styles.hChip}>
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.sectionHead}>
              <div className={styles.sectionTitle}>{stage.label} scope</div>
              <div className={styles.sectionHint}>Build and validate before expanding.</div>
            </div>

            <div className={styles.cols}>
              <div className={styles.colCard}>
                <div className={styles.colTitle}>{stage.leftTitle}</div>
                <ul className={styles.list}>
                  {stage.leftItems.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.colCard}>
                <div className={styles.colTitle}>{stage.rightTitle}</div>
                <ul className={styles.list}>
                  {stage.rightItems.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.sectionDivider} aria-hidden="true" />

            <div className={styles.metricsWrap} aria-label={stage.metricsTitle}>
              <div className={styles.metricsHead}>
                <div className={styles.metricsKicker}>{stage.metricsTitle}</div>
                <div className={styles.metricsHint}>Delivery, actions, outcomes, and trust.</div>
              </div>

              <div className={styles.metricsGrid}>
                {stage.metrics.map((m) => (
                  <div key={m.k} className={styles.metric}>
                    <div className={styles.metricK}>{m.k}</div>
                    <div className={styles.metricV}>{m.v}</div>
                    <div className={styles.metricS}>{m.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.micro}>Auto rotates. Hover pauses. Click bars to jump.</div>
          </div>
        </div>

        <div className="amc-actions">
          <button className="amc-btn" type="button" data-jump="ps">
            Back to preview
          </button>
          <button className="amc-btn amc-btnPrimary" type="button" data-jump="system">
            See system design
          </button>
        </div>
      </div>
    </div>
  );
}
