"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  key: string;
  title: string;
  subtitle: string;
  what: string;

  tagsIn: string[];
  tagsOut: string[];

  exampleTitle: string;
  example: string[];
  outputsTitle: string;
  outputs: string[];
};

export default function SystemDesignPanel() {
  // Placeholder: you will generate the final image later.
  // Put your image in /public and update this path when ready.
  const imgSrc = "/leadgen-system-flow.png";

  const steps: Step[] = useMemo(
    () => [
      {
        key: "sector",
        title: "1. Input",
        subtitle: "Target sector definition",
        what:
          "The operator provides one targeting instruction. Keep it structured so downstream decisions are deterministic and auditable.",

        tagsIn: ["Sector", "Geo", "Company size", "Optional exclusions"],
        tagsOut: ["Targeting spec", "Query plan", "Constraints"],

        exampleTitle: "Example input",
        example: [
          "Industry: SaaS",
          "Employee size: 51 to 200",
          "Location: India",
          "Exclude: agencies, freelancers",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Targeting spec JSON", "Search queries", "Limits and exclusions"],
      },
      {
        key: "source",
        title: "2. Source",
        subtitle: "Find matching companies and contacts",
        what:
          "The system pulls a large pool of leads from data sources. Speed matters, but coverage and freshness matter more.",

        tagsIn: ["Targeting spec", "Data sources", "Rate limits"],
        tagsOut: ["Lead pool", "Company list", "Raw contacts"],

        exampleTitle: "Example source results",
        example: [
          "Companies found: 3,240",
          "Contacts pulled: 14,800",
          "Initial filters: duplicates removed, missing roles flagged",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Company entities", "Contact entities", "Raw source provenance"],
      },
      {
        key: "enrich",
        title: "3. Enrich",
        subtitle: "Email, LinkedIn, role, and firmographic context",
        what:
          "Enrichment fills gaps that matter for personalization. The goal is to build reliable lead context, not scrape everything.",

        tagsIn: ["Raw contacts", "Company entities", "Enrichment APIs"],
        tagsOut: ["Verified email", "Role + seniority", "Firmographics"],

        exampleTitle: "Example enrichment fields",
        example: [
          "Contact: name, title, team, seniority band",
          "Company: industry, headcount, revenue range, HQ location",
          "Identity: LinkedIn URL, domain, email confidence score",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Enriched lead profiles", "Confidence scores", "Enrichment audit trail"],
      },
      {
        key: "qualify",
        title: "4. Qualify",
        subtitle: "Fit scoring and persona attributes",
        what:
          "Not every lead should be messaged. Qualification applies objective filters and creates a WHO persona per lead that informs tone and angle.",

        tagsIn: ["Enriched profiles", "ICP rules", "Seniority logic"],
        tagsOut: ["Qualified leads", "WHO persona", "Priority score"],

        exampleTitle: "Example qualification logic",
        example: [
          "Seniority: exclude interns and students",
          "Geo: must be India based",
          "Function: product, growth, engineering, ops",
          "Priority: managers and above score higher",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Qualified lead set", "Persona attributes", "Ranked priority list"],
      },
      {
        key: "match",
        title: "5. Match",
        subtitle: "WHAT to pitch to WHO",
        what:
          "This is the core intelligence layer. The system selects the best use case of ABC’s product for each persona and company context.",

        tagsIn: ["WHO persona", "Firmographics", "ABC product context"],
        tagsOut: ["WHAT angle", "Use case selection", "Reasoning"],

        exampleTitle: "Example mapping",
        example: [
          "Junior: workflow and speed benefits",
          "Team lead: team throughput and adoption",
          "Manager: KPI impact and reporting",
          "C suite: ROI, risk, and strategic advantage",
        ],
        outputsTitle: "How matching works",
        outputs: [
          "Inputs: persona + company context + product capabilities",
          "Select: best use case and proof points",
          "Guardrails: no invented claims, avoid unsafe assumptions",
          "Output: one chosen angle with short rationale",
        ],
      },
      {
        key: "compose",
        title: "6. Compose",
        subtitle: "Generate multi step messages per channel",
        what:
          "Create messages that feel native to each channel. The content changes, but the pitch angle stays consistent across email and LinkedIn.",

        tagsIn: ["WHAT angle", "WHO persona", "Channel tone rules"],
        tagsOut: ["Email sequence", "LinkedIn message", "Subject lines"],

        exampleTitle: "Example outputs",
        example: [
          "Email 1: personalized opener + angle + soft CTA",
          "Email 2: value proof or example relevant to persona",
          "Email 3: short bump with a single question",
          "LinkedIn: concise connect note and follow up message",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["3 email drafts", "LinkedIn drafts", "Personalization tokens used"],
      },
      {
        key: "orchestrate",
        title: "7. Orchestrate",
        subtitle: "Multichannel sending with deliverability guardrails",
        what:
          "Run outreach safely. Respect limits, warm up rules, and anti spam controls. Messages are scheduled, monitored, and automatically paused on risk signals.",

        tagsIn: ["Campaign rules", "Send accounts", "Queue"],
        tagsOut: ["Send events", "Delivery health", "Paused leads"],

        exampleTitle: "Example guardrails",
        example: [
          "Throttle: per inbox daily limit",
          "Spacing: minimum interval between sends",
          "Stop: on bounce, spam signal, or unsubscribe",
          "LinkedIn: safe connect and follow up pacing",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Message send log", "Deliverability status", "Queue state per lead"],
      },
      {
        key: "track",
        title: "8. Track",
        subtitle: "Engagement signals, alerts, and CRM sync",
        what:
          "Every action is logged. Opens, replies, bounces, and unsubscribes change the lead state. Admin gets alerts when a human decision is needed.",

        tagsIn: ["Send events", "Engagement signals", "CRM mapping"],
        tagsOut: ["Lead status", "Alerts", "CRM updates"],

        exampleTitle: "Example state transitions",
        example: [
          "Opened but no reply: stay in sequence",
          "Reply received: stop automation and alert admin",
          "Unsubscribed: suppress lead permanently",
          "Hard bounce: suppress and flag source quality",
        ],
        outputsTitle: "Outputs from this stage",
        outputs: ["Lead lifecycle status", "Admin alerts", "CRM timeline entries"],
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    startRef.current = performance.now();
    setProgress(0);
  }, [idx]);

  const step = steps[idx];

  return (
    <div className="amc-sysPanel">
      <div className="amc-kLabel">System design</div>
      <div className="amc-h2" style={{ marginTop: 8 }}>
        From sector input to multichannel execution
      </div>
      <div className="amc-sub2">
        One pipeline. WHO persona per lead. WHAT pitch per persona. Fully trackable and safe to run at scale.
      </div>

      {/* Diagram */}
      <div className="amc-sysDiagramCard">
        <div className="amc-sysDiagramFrame">
          <img className="amc-sysDiagramImg" src={imgSrc} alt="AI Lead Gen system flow diagram" loading="lazy" />
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
        <div className={"amc-sysStoryBody" + (step.key === "match" ? " is-ai" : "")} aria-live="polite">
          <div className="amc-sysHeader">
            <div className="amc-sysStepTitle">{step.title}</div>
            <div className="amc-sysStepSub">{step.subtitle}</div>

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
                    <span key={t} className={"amc-tag amc-tagOut" + (step.key === "match" ? " is-ai" : "")}>
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
                {step.key === "sector" &&
                  "Keep inputs structured. A clean targeting spec prevents the system from drifting into guesswork."}
                {step.key === "source" &&
                  "Coverage beats perfection. Start broad, then qualify down to the leads you actually want to pay for."}
                {step.key === "enrich" &&
                  "Only enrich what drives decisions. Seniority and firmographics matter more than vanity fields."}
                {step.key === "qualify" &&
                  "If you message everyone, you message no one. Qualification protects relevance and deliverability."}
                {step.key === "match" &&
                  "This is the brain. The system chooses one best pitch angle per lead, based on WHO and context."}
                {step.key === "compose" &&
                  "Write like a human in that channel. The same pitch can feel spammy if the surface is wrong."}
                {step.key === "orchestrate" &&
                  "Guardrails are non negotiable. Safe pacing keeps inboxes warm and avoids long term damage."}
                {step.key === "track" &&
                  "Automation is useless without state. Tracking and CRM sync turn outreach into a repeatable system."}
              </div>
            </div>
          </div>

          <div className="amc-sysMicro">Auto rotates. Hover pauses. Use arrows to step through.</div>
        </div>
      </div>
    </div>
  );
}
