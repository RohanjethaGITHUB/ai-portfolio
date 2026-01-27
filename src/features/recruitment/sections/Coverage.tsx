"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles/recruitmentOS.module.css";
import cstyles from "./styles/Coverage.module.css";

type Props = { id: string };

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  bullets: string[];
  impacts: { label: string; value: string }[];
  imageSrc: string;
  imageAlt: string;
};

const AUTO_MS = 6500;

function toneForImpactLabel(label: string): string {
  const t = label.trim().toLowerCase();

  if (t.includes("time")) return "time";
  if (t.includes("quality")) return "quality";
  if (t.includes("risk")) return "risk";
  if (t.includes("signal")) return "signal";
  if (t.includes("ops")) return "ops";
  if (t.includes("effort")) return "effort";
  if (t.includes("speed")) return "speed";
  if (t.includes("alignment")) return "alignment";
  if (t.includes("focus")) return "focus";
  if (t.includes("consistency")) return "consistency";

  return "neutral";
}

export function Coverage({ id }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "intake",
        title: "Job Intake & Role Structuring",
        subtitle: "Turn vague role requests into a structured brief the system can execute on.",
        bullets: [
          "AI converts job ads, emails, notes, or CRM entries into a single structured role brief.",
          "Missing inputs and conflicting signals are flagged before sourcing begins.",
        ],
        impacts: [
          { label: "Time saved", value: "30–60 min per role" },
          { label: "Quality", value: "Consistent briefs" },
          { label: "Risk", value: "Fewer false starts" },
        ],
        imageSrc: "/jobs.png",
        imageAlt: "Job intake and role structuring illustration",
      },
      {
        key: "talent-pool",
        title: "Talent Pool Assembly",
        subtitle: "Build a clean, usable candidate pool without manual spreadsheets.",
        bullets: [
          "Candidates are pulled from past applicants, internal databases, inbound profiles, and referrals.",
          "AI standardizes skills and experience signals, and merges duplicates automatically.",
        ],
        impacts: [
          { label: "Time saved", value: "1–2 hrs per role" },
          { label: "Signal", value: "Less noise" },
          { label: "Ops", value: "Cleaner CRM" },
        ],
        imageSrc: "/talent-pool-assembly.png",
        imageAlt: "Talent pool assembly illustration",
      },
      {
        key: "screening",
        title: "AI Screening & Risk Detection",
        subtitle: "Review signal summaries instead of reading CVs end-to-end.",
        bullets: [
          "AI extracts role-relevant skills, domain evidence, and seniority signals from CVs.",
          "Flags gaps, risks, and missing must-haves for fast human review.",
        ],
        impacts: [
          { label: "Effort", value: "50–70% less screening" },
          { label: "Speed", value: "Faster shortlists" },
          { label: "Risk", value: "Earlier red flags" },
        ],
        imageSrc: "/Screening.png",
        imageAlt: "AI screening illustration",
      },
      {
        key: "shortlist",
        title: "Shortlisting & Decision Support",
        subtitle: "Transparent rankings that hiring managers can understand and trust.",
        bullets: [
          "Candidates are scored against the role brief using consistent criteria.",
          "Each score includes rationale, so decisions are explainable, not black-box.",
        ],
        impacts: [
          { label: "Time saved", value: "30–90 min per role" },
          { label: "Quality", value: "Defensible decisions" },
          { label: "Alignment", value: "Faster approvals" },
        ],
        imageSrc: "/shtl.png",
        imageAlt: "Shortlisting and decision support illustration",
      },
      {
        key: "outreach",
        title: "Outreach & Follow-ups",
        subtitle: "Automated sequences with human attention only where it matters.",
        bullets: [
          "Outreach and follow-ups run automatically across channels and stages.",
          "AI detects intent and routes high-signal replies to humans immediately.",
        ],
        impacts: [
          { label: "Speed", value: "No dropped candidates" },
          { label: "Focus", value: "Humans on high intent" },
          { label: "Consistency", value: "Same playbook every role" },
        ],
        imageSrc: "/outreach.png",
        imageAlt: "Outreach and follow-ups illustration",
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
        <h2 className={styles.rosH2}>System Overview</h2>
        <p className={styles.rosLead}>
          A story-style walkthrough of how the system automates recruitment from intake to shortlist.
        </p>
      </div>

      <div
        className={cstyles.storyShell}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={cstyles.storyBars} aria-hidden="true">
          {slides.map((s, i) => {
            const isDone = i < idx;
            const isActive = i === idx;
            return (
              <div key={s.key} className={cstyles.storyBar}>
                <div
                  className={[
                    cstyles.storyBarFill,
                    isDone ? cstyles.isDone : "",
                    isActive && !paused ? cstyles.isRunning : "",
                    isActive && paused ? cstyles.isPaused : "",
                  ].join(" ")}
                />
              </div>
            );
          })}
        </div>

        <div className={cstyles.storySlide}>
          <div className={cstyles.storyTopRow}>
            <div className={cstyles.storySlideMeta}>
              <div className={cstyles.storyKicker}>SYSTEM OVERVIEW</div>
              <div className={cstyles.storyTitle}>{active.title}</div>
              <div className={cstyles.storySubtitle}>{active.subtitle}</div>
            </div>

            <div className={cstyles.storyControls}>
              <button
                type="button"
                className={cstyles.storyIconBtn}
                onClick={prev}
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                type="button"
                className={cstyles.storyIconBtn}
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play" : "Pause"}
                title={paused ? "Play" : "Pause"}
              >
                {paused ? "▶" : "❚❚"}
              </button>

              <button
                type="button"
                className={cstyles.storyIconBtn}
                onClick={next}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          <div className={cstyles.storyImageSlot}>
            <div className={cstyles.ovImageFrame}>
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                sizes="(max-width: 980px) 92vw, 760px"
                className={cstyles.storyImage}
                priority={idx === 0}
              />
            </div>
          </div>

          <div className={cstyles.storyBody}>
            <div className={cstyles.storyBlockTitle}>How it works</div>

            <ul className={cstyles.storyBullets}>
              {active.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className={cstyles.storyImpactRow}>
              {active.impacts.map((x) => {
                const tone = toneForImpactLabel(x.label);
                return (
                  <div key={x.label} className={cstyles.storyImpactChip} data-tone={tone}>
                    <span className={cstyles.storyImpactDot} aria-hidden="true" />
                    <span className={cstyles.storyImpactLabel}>{x.label}</span>
                    <span className={cstyles.storyImpactValue}>{x.value}</span>
                  </div>
                );
              })}
            </div>

            <div className={cstyles.storyFooter}>
              <div className={cstyles.storyCount}>
                {idx + 1}/{total}
              </div>
              <div className={cstyles.storyHint}>Hover to pause</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed section below the rotator */}
      <div className={cstyles.fixedBelow}>
        <div className={cstyles.designDecisions}>
          <div className={cstyles.designTitle}>Design decisions I made</div>

          <p className={cstyles.designOneLiner}>
  Built by running this system live, watching it break, and tightening it based on cost,
  latency, and recruiter feedback.
</p>

<ul className={cstyles.designList}>
  <li>
    <span className={cstyles.ddKey}>I added approval gates</span>
    <span className={cstyles.ddVal}>
      {" "}after early runs showed automation moving faster than recruiter comfort
    </span>
  </li>
  <li>
    <span className={cstyles.ddKey}>I made every decision traceable</span>
    <span className={cstyles.ddVal}>
      {" "}so I could debug outcomes instead of guessing
    </span>
  </li>
  <li>
    <span className={cstyles.ddKey}>I routed models by impact</span>
    <span className={cstyles.ddVal}>
      {" "}after testing where heavier models actually changed decisions
    </span>
  </li>
  <li>
    <span className={cstyles.ddKey}>I treated token budgets as a hard constraint</span>
    <span className={cstyles.ddVal}>
      {" "}once costs started compounding at scale
    </span>
  </li>
</ul>


          <div className={cstyles.designTags}>
            <span className={cstyles.designTag}>Live-tested in Placify</span>
            <span className={cstyles.designTag}>Cost and latency constrained</span>
            <span className={cstyles.designTag}>Peer reviewed by recruiters</span>
            <span className={cstyles.designTag}>Iterated across runs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
