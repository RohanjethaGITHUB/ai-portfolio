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

        title: "MVP: prove personalization beats templates",
        goal: "Run end to end for one ICP and show higher reply quality with safe deliverability.",

        highlights: ["Single ICP", "Email only", "Human approval option"],

        leftTitle: "What ships",
        leftItems: [
          "One targeting spec input (industry, geo, size)",
          "Lead sourcing + basic enrichment (email and LinkedIn)",
          "WHO persona by seniority and function",
          "WHAT use case selection per persona",
          "3 step email sequence generated and queued",
          "Tracking: sent, bounced, reply, unsubscribe",
          "Sync to one CRM pipeline",
        ],

        rightTitle: "Guardrails and scope discipline",
        rightItems: [
          "Strict inbox limits and send pacing",
          "Stop rules: reply, bounce, unsubscribe",
          "No invented claims: only allowed proof points",
          "Human review toggle for message approval",
          "Audit trail: source and enrichment confidence",
          "Goal: validate outcomes before scaling channels",
        ],

        metricsTitle: "MVP metrics",
        metrics: [
          { k: "Time per lead", v: "< 60s", s: "From lead identified to first draft ready" },
          { k: "Deliverability", v: "95%+", s: "Low bounce rate, inbox health stable" },
          { k: "Reply rate", v: "3 to 8%", s: "Baseline for cold outbound in target market" },
          { k: "Positive reply", v: "35%+", s: "Of replies, percentage that is not a rejection" },
          { k: "Unsubscribe", v: "< 1%", s: "Low opt out indicates relevance and pacing" },
          { k: "Lead fit", v: "80%+", s: "Qualified leads match ICP rules on spot checks" },
        ],
      },

      {
        key: "v2",
        label: "V2",
        kicker: "Quality",

        title: "V2: improve WHO and WHAT accuracy",
        goal: "Increase relevance by adding richer context and smarter matching logic.",

        highlights: ["Better enrichment", "Scoring", "Suppression rules"],

        leftTitle: "What improves",
        leftItems: [
          "Richer enrichment: tech stack, funding, hiring signals, growth indicators",
          "Seniority detection improves for ambiguous titles",
          "Lead scoring: prioritize highest intent and best fit",
          "Message quality controls: length, tone, jargon checks",
          "Suppression rules for low confidence data",
          "Template libraries by persona, still personalized per lead",
        ],

        rightTitle: "What users see",
        rightItems: [
          "Lead list is ranked with reason codes",
          "Drafts show why this angle was selected",
          "Approval queue for batches (optional)",
          "Cleaner CRM timeline and notes",
          "Safer send scheduling with time window controls",
          "Lower noise, fewer wasted sends",
        ],

        metricsTitle: "V2 metrics",
        metrics: [
          { k: "Positive reply lift", v: "+25%+", s: "Relative lift vs MVP baseline" },
          { k: "Bounce rate", v: "< 3%", s: "Data quality and verification improves" },
          { k: "ICP precision", v: "90%+", s: "Qualified leads that truly match ICP" },
          { k: "Spam signals", v: "Near zero", s: "Complaints and provider warnings stay minimal" },
          { k: "Time to qualified list", v: "Faster", s: "Time from input to ranked lead list drops" },
          { k: "Review efficiency", v: "< 10s", s: "Median time to approve or reject a draft" },
        ],
      },

      {
        key: "v3",
        label: "V3",
        kicker: "Scale",

        title: "V3: multichannel orchestration with learning",
        goal: "Scale safely across email and LinkedIn, and learn what works by persona and segment.",

        highlights: ["Email + LinkedIn", "Sequencing", "Experimentation"],

        leftTitle: "Scale layer",
        leftItems: [
          "LinkedIn connect plus follow up flows",
          "Multichannel sequencing rules and stop conditions",
          "Persona specific cadence and channel preference",
          "Batch processing with throttling per account",
          "Automatic routing: hot replies to operator queue",
          "Calendar booking suggestions and handoff notes",
        ],

        rightTitle: "Learning layer",
        rightItems: [
          "A/B tests for subject lines and CTAs",
          "Segment level reporting: persona, industry, size",
          "Use case performance tracking by WHAT angle",
          "Suppression for underperforming segments",
          "Copy improvements based on observed lift",
          "Weekly insight summary for operator decisions",
        ],

        metricsTitle: "V3 metrics",
        metrics: [
          { k: "Meetings booked", v: "Up", s: "Booked calls per 1,000 leads messaged" },
          { k: "Reply quality", v: "Up", s: "More replies that progress the conversation" },
          { k: "Channel mix lift", v: "Positive", s: "Incremental lift from adding LinkedIn" },
          { k: "Rate limit health", v: "Stable", s: "No account blocks or platform warnings" },
          { k: "Learning velocity", v: "2 tests", s: "Experiments run per month minimum" },
          { k: "Operator workload", v: "Controlled", s: "Alerts and queues prevent overload" },
        ],
      },

      {
        key: "future",
        label: "Future",
        kicker: "Optimize",

        title: "Future: autonomous optimization and CRM intelligence",
        goal: "Move from execution to optimization and pipeline intelligence.",

        highlights: ["Auto re ranking", "CRM feedback", "Personalized nurture"],

        leftTitle: "Optimization",
        leftItems: [
          "Auto re ranking of leads based on observed outcomes",
          "Dynamic angle selection per segment over time",
          "Nurture sequences for not now leads",
          "Company level account based grouping and sequencing",
          "Better compliance controls and regional rules",
        ],

        rightTitle: "CRM intelligence",
        rightItems: [
          "Pipeline insights: where leads drop off",
          "Next best action suggestions for operators",
          "Conversation summaries and handover notes",
          "Deduping across inbound and outbound",
          "Revenue attribution by segment and channel",
        ],

        metricsTitle: "Future metrics",
        metrics: [
          { k: "CAC efficiency", v: "Down", s: "Cost per meeting and cost per opportunity improves" },
          { k: "Segment ROI", v: "Clear", s: "ROI by persona, industry, and company size" },
          { k: "Nurture conversion", v: "Up", s: "Not now leads convert later via nurture" },
          { k: "Lead reactivation", v: "Up", s: "Dormant leads revived without spamming" },
          { k: "Attribution", v: "Strong", s: "Better tie between outreach and revenue" },
          { k: "Trust", v: "High", s: "Low complaints, low suppression overrides" },
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
              What ships now and what scales next
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
                <div className={styles.metricsHint}>Deliverability, relevance, outcomes, and trust.</div>
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
      </div>
    </div>
  );
}
