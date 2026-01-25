"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  key: string;
  title: string;
  subtitle: string;
  what: string;

  // Stage specific tags that progress logically
  tagsIn: string[];
  tagsOut: string[];

  exampleTitle: string;
  example: string[];
  outputsTitle: string;
  outputs: string[];
};

export default function SystemDesignPanel() {
  const imgSrc = "/system-flow.png";

  const steps: Step[] = useMemo(
    () => [
      {
        key: "inputs",
        title: "1. Inputs",
        subtitle: "Transactions and user rules",
        what:
          "Pull raw transactions plus a few user settings. Keep it boring and reliable. If inputs are messy, every downstream step becomes guesswork.",

        tagsIn: ["Bank feed", "Account meta", "User budgets", "Rules"],
        tagsOut: ["Normalized rows", "User context", "Constraints"],

        exampleTitle: "Example input snapshot",
        example: [
          "Transaction: Uber Eats, $38.90, Tue 8:12pm",
          "Budget: Dining out $450 per month",
          "Rule: If overspend is trending, suggest one concrete pause",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Normalized transactions", "User preferences and budgets", "Simple rules and constraints"],
      },
      {
        key: "categorize",
        title: "2. Categorize",
        subtitle: "Group spend into a weekly view",
        what:
          "Map merchants to categories and create a weekly baseline. This is where the system becomes interpretable instead of a pile of line items.",

        tagsIn: ["Normalized rows", "Merchant hints"],
        tagsOut: ["Categories", "Weekly totals", "Recurring list"],

        exampleTitle: "Example grouping",
        example: ["Uber Eats → Dining out", "Spotify → Subscriptions", "Woolworths → Groceries"],
        outputsTitle: "Outputs from this stage",
        outputs: ["Category totals by week", "Recurring items detected", "Merchant mapping table"],
      },
      {
        key: "detect",
        title: "3. Detect",
        subtitle: "Find meaningful drift",
        what:
          "Compare current patterns to baseline and budget. The goal is high signal changes only. No spam. No tiny fluctuations.",

        tagsIn: ["Weekly totals", "Budgets", "Baseline"],
        tagsOut: ["Drift events", "Signal score", "Candidates"],

        exampleTitle: "Example drift detection",
        example: [
          "Dining out is +$220 vs usual by mid month",
          "Subscriptions increased from 6 to 9 active services",
          "Groceries are stable within normal range",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Drift events", "Confidence score", "Shortlist of candidate nudges"],
      },
      {
        key: "rank",
        title: "4. Rank",
        subtitle: "AI chooses one best action",
        what:
          "Rules shortlist options. AI ranks them. Then the system commits to one clear next step. This is the difference between a coach and a dashboard.",

        tagsIn: ["Drift events", "User context", "Action library"],
        tagsOut: ["One best action", "Rationale", "Guardrails"],

        exampleTitle: "Example nudge candidates",
        example: ["Pause food delivery for 7 days", "Set dining out cap for rest of month", "Switch one subscription off"],
        outputsTitle: "How the AI ranking works",
        outputs: [
          "Inputs: drift summary + user context + available actions",
          "AI ranks actions by impact, effort, and fit",
          "Guardrails: never invent numbers, never contradict budgets",
          "Final: one action with one sentence of rationale",
        ],
      },
      {
        key: "render",
        title: "5. Render",
        subtitle: "Per channel delivery",
        what:
          "Same nudge, different surface. Short, native, and action-led. The formatting changes, the intent does not.",

        tagsIn: ["Chosen action", "Channel", "Tone"],
        tagsOut: ["SMS copy", "WhatsApp copy", "Email copy", "In app card"],

        exampleTitle: "Same nudge, 3 formats",
        example: [
          "SMS: Quick check. Dining out is trending $220 over plan. Reply YES to pause delivery for 7 days.",
          "WhatsApp: You are trending over plan on dining out. Want a 7 day delivery pause? Tap YES.",
          "In app: Card with one button: Pause delivery for 7 days",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Channel-specific message", "CTA format (reply, tap, button)", "Tone matched to surface"],
      },
      {
        key: "log",
        title: "6. Log",
        subtitle: "Outcomes and learning loop",
        what:
          "Store what was sent and what happened. This is how the system gets smarter without becoming unpredictable.",

        tagsIn: ["Send event", "User action", "Timing"],
        tagsOut: ["Outcome metrics", "Preference hints", "Future tuning"],

        exampleTitle: "Example outcomes",
        example: [
          "User replied YES within 2 minutes",
          "User ignored 3 dining nudges but acts on subscription nudges",
          "Action taken reduced dining spend by 18% next week",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Message log", "Action log", "Outcome metrics (open, click, reply, change)"],
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Story progress
  const [progress, setProgress] = useState(0); // 0..1
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const holdRef = useRef(false);

  const DURATION_MS = 5200;

  const go = (next: number) => {
    const safe = (next + steps.length) % steps.length;
    setIdx(safe);
    setProgress(0);
    startRef.current = performance.now();
  };

  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // RAF based progress fill
  useEffect(() => {
    if (!isPlaying) return;

    startRef.current = performance.now() - progress * DURATION_MS;

    const tick = (t: number) => {
      if (!isPlaying) return;

      if (holdRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = t - startRef.current;
      const p = Math.max(0, Math.min(1, elapsed / DURATION_MS));
      setProgress(p);

      if (p >= 1) {
        setIdx((v) => (v + 1) % steps.length);
        setProgress(0);
        startRef.current = performance.now();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, steps.length, progress]);

  // Reset progress when step changes via auto or click
  useEffect(() => {
    startRef.current = performance.now();
    setProgress(0);
  }, [idx]);

  const step = steps[idx];

  return (
    <div className="amc-sysPanel">
      <div className="amc-kLabel">System design</div>
      <div className="amc-h2" style={{ marginTop: 8 }}>
        From data to one decision to delivery
      </div>
      <div className="amc-sub2">One pipeline. One best next step. Rendered in the channel the user actually sees.</div>

      {/* Diagram */}
      <div className="amc-sysDiagramCard">
        <div className="amc-sysDiagramFrame">
          <img className="amc-sysDiagramImg" src={imgSrc} alt="AI Money Coach system flow diagram" loading="lazy" />
        </div>
      </div>

      {/* Story */}
      <div
        className="amc-sysStory"
        onMouseEnter={() => {
          holdRef.current = true;
        }}
        onMouseLeave={() => {
          holdRef.current = false;
        }}
      >
        <div className="amc-sysStoryTop">
          <div className="amc-sysBars" role="tablist" aria-label="System steps">
            {steps.map((s, i) => {
              const isActive = i === idx;
              const isDone = i < idx;

              const fillPct = isActive ? `${Math.round(progress * 100)}%` : isDone ? "100%" : "0%";

              return (
                <button
                  key={s.key}
                  type="button"
                  className={"amc-sysBar" + (isActive ? " is-active" : isDone ? " is-done" : "")}
                  onClick={() => go(i)}
                  aria-label={`Go to ${s.title}`}
                  aria-selected={isActive}
                >
                  <span className="amc-sysBarFill" style={{ width: fillPct }} />
                </button>
              );
            })}
          </div>

          <div className="amc-sysControls" role="group" aria-label="Step controls">
            <button type="button" className="amc-sysBtn" onClick={prev} aria-label="Previous step">
              ‹
            </button>
            <button
              type="button"
              className="amc-sysBtn amc-sysBtnToggle"
              onClick={() => setIsPlaying((v) => !v)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button type="button" className="amc-sysBtn" onClick={next} aria-label="Next step">
              ›
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={"amc-sysStoryBody" + (step.key === "rank" ? " is-ai" : "")} aria-live="polite">
          <div className="amc-sysHeader">
            <div className="amc-sysStepTitle">{step.title}</div>
            <div className="amc-sysStepSub">{step.subtitle}</div>

            {/* Stage specific tag progression */}
            <div className="amc-tagRail">
              <div className="amc-tagGroup">
                <div className="amc-tagGroupK">Consumes</div>
                <div className="amc-tags">
                  {step.tagsIn.map((t) => (
                    <span key={t} className="amc-tag">
                      <span className="amc-tagDot" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="amc-tagGroup">
                <div className="amc-tagGroupK">Produces</div>
                <div className="amc-tags">
                  {step.tagsOut.map((t) => (
                    <span
                      key={t}
                      className={"amc-tag amc-tagOut" + (step.key === "rank" ? " is-ai" : "")}
                    >
                      <span className="amc-tagDot" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="amc-sysWhat">{step.what}</div>

          <div className="amc-sysGrid">
            <div className="amc-sysCard">
              <div className="amc-sysCardK">{step.exampleTitle}</div>
              <ul className="amc-sysList">
                {step.example.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="amc-sysCard">
              <div className="amc-sysCardK">{step.outputsTitle}</div>
              <ul className="amc-sysList">
                {step.outputs.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="amc-sysCoach">
              <div className="amc-sysCoachK">Coach moment</div>
              <div className="amc-sysCoachBody">
                {step.key === "inputs" &&
                  "Garbage in, garbage out. This step is about clean inputs so everything else stays explainable."}
                {step.key === "categorize" && "This is where raw data becomes human. Categories create meaning, not charts."}
                {step.key === "detect" &&
                  "The system must earn attention. Drift is only shown when it is actually worth acting on."}
                {step.key === "rank" && "This is the brain. The system commits to one next step so users do not feel overwhelmed."}
                {step.key === "render" && "Same intent, different surface. If the channel feels wrong, the nudge gets ignored."}
                {step.key === "log" && "Without outcomes, it stays static. With outcomes, it becomes a real coach over time."}
              </div>
            </div>
          </div>

          <div className="amc-sysMicro">Auto rotates. Hover pauses. Use arrows to step through.</div>
        </div>
      </div>
    </div>
  );
}
