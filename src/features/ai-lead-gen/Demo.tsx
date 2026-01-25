"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StepKey = "input" | "source" | "enrich" | "persona" | "match" | "compose" | "orchestrate" | "track";

type Step = {
  key: StepKey;
  label: string; // number label in pill
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  code?: { label: string; value: string }[];
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export default function Demo() {
  const steps: Step[] = useMemo(
    () => [
      {
        key: "input",
        label: "1",
        kicker: "Input",
        title: "Target sector provided",
        body: "The demo starts with a single targeting instruction. This is the only required input from the user.",
        bullets: ["Industry, company size, and geography", "Optional exclusions and constraints", "No lead list required"],
        code: [
          { label: "Industry", value: "SaaS" },
          { label: "Employees", value: "51 to 200" },
          { label: "Location", value: "India" },
          { label: "Exclude", value: "Agencies" },
        ],
      },
      {
        key: "source",
        label: "2",
        kicker: "Source",
        title: "Companies and contacts discovered",
        body: "The system pulls a broad lead pool first, then narrows down after enrichment and qualification.",
        bullets: ["Company discovery first, then contacts", "De-dupe and freshness checks", "Coverage before precision"],
        code: [
          { label: "Companies found", value: "3,240" },
          { label: "Contacts pulled", value: "14,800" },
          { label: "Duplicates removed", value: "2,130" },
        ],
      },
      {
        key: "enrich",
        label: "3",
        kicker: "Enrich",
        title: "Lead context filled in",
        body: "Enrichment adds role clarity and firmographic context that is required to personalize properly.",
        bullets: ["Email confidence and LinkedIn URL", "Role, function, and seniority band", "Company size, industry, and location"],
        code: [
          { label: "Email", value: "verified or scored" },
          { label: "Role", value: "Engineering Manager" },
          { label: "Company", value: "B2B SaaS, 120 employees" },
          { label: "Context", value: "India based product org" },
        ],
      },
      {
        key: "persona",
        label: "4",
        kicker: "WHO",
        title: "Persona built per lead",
        body: "Each lead becomes a WHO persona so tone and value framing can be adapted, not templated.",
        bullets: ["Persona is more than job title", "Seniority influences what they care about", "Persona drives channel tone"],
        code: [
          { label: "Persona", value: "Mid management" },
          { label: "Likely focus", value: "Delivery and team velocity" },
          { label: "Tone", value: "Practical, low fluff" },
        ],
      },
      {
        key: "match",
        label: "5",
        kicker: "WHAT",
        title: "Best pitch selected",
        body: "This is the core intelligence layer. The system chooses one best use case for this specific WHO and company context.",
        bullets: ["One clear angle per lead", "Different angles by seniority", "Avoids generic feature dumping"],
        code: [
          { label: "Selected angle", value: "Faster onboarding for new engineers" },
          { label: "Proof point", value: "Reduced ramp time" },
          { label: "CTA", value: "Quick question" },
        ],
      },
      {
        key: "compose",
        label: "6",
        kicker: "Compose",
        title: "Email and LinkedIn created",
        body: "The same WHAT is expressed differently depending on the channel. Messages feel native, not copied across channels.",
        bullets: ["3-step email sequence", "LinkedIn connect note and follow up", "Personalization tokens inserted safely"],
        code: [
          { label: "Email 1", value: "Context + angle + soft CTA" },
          { label: "Email 2", value: "Proof or example" },
          { label: "Email 3", value: "Short bump" },
          { label: "LinkedIn", value: "Concise connect note" },
        ],
      },
      {
        key: "orchestrate",
        label: "7",
        kicker: "Send",
        title: "Multichannel outreach runs safely",
        body: "Deliverability and platform limits are enforced. The system paces sends, pauses on risk, and respects opt-outs.",
        bullets: ["Per inbox send caps", "Spacing rules and throttling", "Auto pause on bounce or unsubscribe"],
        code: [
          { label: "Daily cap", value: "Enforced" },
          { label: "Spacing", value: "Minimum interval applied" },
          { label: "Unsubscribes", value: "Permanent suppression" },
        ],
      },
      {
        key: "track",
        label: "8",
        kicker: "Track",
        title: "Statuses, alerts, and CRM sync",
        body: "Every event updates lead state. Replies trigger a handoff to the operator, and the CRM stays up to date.",
        bullets: ["Open, reply, bounce, unsubscribe tracked", "Alerts when human action is needed", "Full timeline written to CRM"],
        code: [
          { label: "Lead status", value: "Replied" },
          { label: "Sequence", value: "Stopped" },
          { label: "CRM", value: "Updated with timeline event" },
        ],
      },
    ],
    []
  );

  const [isPlaying, setIsPlaying] = useState(true);
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const stepStartRef = useRef<number>(0);
  const stepIdxRef = useRef(0);

  const DURATION_MS = 5200;

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const tick = (t: number) => {
      if (!stepStartRef.current) stepStartRef.current = t;

      const elapsed = t - stepStartRef.current;
      const p = clamp01(elapsed / DURATION_MS);
      setProgress(p);

      if (p >= 1) {
        const len = steps.length || 1;
        const next = (stepIdxRef.current + 1) % len;
        stepStartRef.current = t;
        stepIdxRef.current = next;
        setStepIdx(next);
        setProgress(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, steps.length]);

  // reset if steps length changes (safe)
  useEffect(() => {
    stepStartRef.current = 0;
    stepIdxRef.current = 0;
    setStepIdx(0);
    setProgress(0);
  }, [steps.length]);

  const step = steps[stepIdx];

  const goPrev = () => {
    const len = steps.length || 1;
    const next = (stepIdxRef.current - 1 + len) % len;
    stepStartRef.current = 0;
    stepIdxRef.current = next;
    setProgress(0);
    setStepIdx(next);
  };

  const goNext = () => {
    const len = steps.length || 1;
    const next = (stepIdxRef.current + 1) % len;
    stepStartRef.current = 0;
    stepIdxRef.current = next;
    setProgress(0);
    setStepIdx(next);
  };

  const stepStackStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  return (
    <section className="amc-demo">
      <div className="amc-demoPlayback">
        <div className="amc-demoPlaybackTop">
          <div>
            <div className="amc-demoPlaybackTitle">Run playback</div>
            <div className="amc-demoPlaybackHint">A single lead run, broken into steps, from sector input to CRM sync.</div>
          </div>

          <div className="amc-demoPlaybackRight">
            <div className="amc-demoPlaybackControls">
              <button className="amc-demoBtn" type="button" onClick={goPrev} aria-label="Previous step">
                ◀
              </button>
              <button
                className="amc-demoBtn"
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label="Play or pause"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button className="amc-demoBtn" type="button" onClick={goNext} aria-label="Next step">
                ▶
              </button>
            </div>
          </div>
        </div>

        <div
          className="amc-demoStory"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          role="region"
          aria-label="Step timeline"
        >
          <div className="amc-demoStoryBars" aria-hidden="true">
            {steps.map((s, i) => {
              const isDone = i < stepIdx;
              const isNow = i === stepIdx;
              const w = isNow ? `${Math.round(clamp01(progress) * 100)}%` : isDone ? "100%" : "0%";
              return (
                <div key={s.key} className={"bar" + (isNow ? " is-now" : isDone ? " is-done" : "")}>
                  <span className="fill" style={{ width: w }} />
                </div>
              );
            })}
          </div>

          <div className="amc-demoStepCard">
            <div style={stepStackStyle}>
              <div>
                <div className="amc-demoStepTop">
                  <div className="amc-demoStepPill">
                    <span className="num">{step.label}</span>
                    <span className="kicker">{step.kicker}</span>
                  </div>
                  <div className="amc-demoStepTitle">{step.title}</div>
                </div>

                <div className="amc-demoStepBody">{step.body}</div>

                {!!step.bullets?.length && (
                  <ul className="amc-demoBullets">
                    {step.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {!!step.code?.length && (
                  <div className="amc-demoCodeGrid">
                    {step.code.map((c, i) => (
                      <div key={i} className="amc-demoCodeRow">
                        <div className="k">{c.label}</div>
                        <div className="v">{c.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="amc-demoFootnote">Auto rotates. Hover pauses. Use arrows to step through.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
