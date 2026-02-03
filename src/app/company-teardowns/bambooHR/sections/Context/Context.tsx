"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Context.module.css";

type SlideId = "platform" | "constraints" | "ai-lift";
type DetailTabId = "overview" | "non-negotiables" | "examples";

type DetailTab = {
  id: DetailTabId;
  label: string;
  title: string;
  body: string;
  points: string[];
};

type ExtraBelow = {
  intro: string;
  cards: { title: string; body: string }[];
  note: string;
};

type Slide = {
  id: SlideId;
  tab: string;
  eyebrow: string;
  title: string;
  description: string;
  pills: string[];
  image: { src: string; alt: string };
  details: DetailTab[];
  extraBelow?: ExtraBelow;
};

export default function Context() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "platform",
        tab: "Platform",
        eyebrow: "Context",
        title: "What the platform does",
        description:
          "BambooHR is a system of record for employee data, onboarding, time off, and core HR workflows. It keeps people operations consistent and auditable across the org.",
        pills: ["System of record", "Workflows", "Approvals"],
        image: {
          src: "/bamboohr/context-1-platform.png",
          alt: "BambooHR system of record visualization",
        },
        details: [
          {
            id: "overview",
            label: "Platform",
            title: "Core jobs to be done",
            body:
              "Most value comes from keeping HR workflows predictable and reducing admin overhead without breaking trust.",
            points: [
              "Maintain a consistent employee record over time",
              "Standardize onboarding tasks and acknowledgements",
              "Manage time off with clear approval boundaries",
              "Create a reliable baseline for reporting and audits",
            ],
          },
          {
            id: "non-negotiables",
            label: "Non negotiables",
            title: "What must stay true",
            body:
              "Because this becomes the source of truth, the platform must be stable, explainable, and easy to audit.",
            points: [
              "Every meaningful change is attributable and traceable",
              "Permissions are explicit and role based",
              "Workflows behave consistently across teams",
              "The record is durable, not opinionated",
            ],
          },
          {
            id: "examples",
            label: "Examples",
            title: "Where it shows up",
            body:
              "These are the moments where people feel the system either works or creates friction.",
            points: [
              "Onboarding task lists and document signing",
              "Org changes and reporting lines",
              "Policy updates and acknowledgements",
              "Manager handoffs and access changes",
            ],
          },
        ],
        // This is the extra below-image content you asked for, without overloading text
        extraBelow: {
          intro:
            "BambooHR acts as the system of record for employee data. It defines what is true about a person at any point in time, and every downstream workflow depends on that truth.",
          cards: [
            {
              title: "Single source of employee truth",
              body:
                "Core details like role, manager, and employment status are not suggestions. They are authoritative inputs consumed by payroll, benefits, performance, and compliance workflows.",
            },
            {
              title: "Anchor for people workflows",
              body:
                "Hiring, onboarding, changes, and exits all resolve back to the record. When data here is wrong or unclear, every connected process slows down or breaks.",
            },
            {
              title: "Trust boundary between people and systems",
              body:
                "Access and visibility are defined at the record level. The platform’s job is to make it obvious who can see or change what, and why.",
            },
          ],
          note:
            "In HR systems, stability and clarity matter more than speed. The value comes from being dependable, not clever.",
        },
      },

      {
        id: "constraints",
        tab: "Constraints",
        eyebrow: "Context",
        title: "Primary constraints",
        description:
          "HR data is sensitive and mistakes carry real risk. The product must prioritize clarity, access boundaries, and predictable workflows over clever automation.",
        pills: ["Data sensitivity", "Auditability", "Low tolerance for errors"],
        image: {
          src: "/bamboohr/context-2.png",
          alt: "Primary constraints in HR systems",
        },
        details: [
          {
            id: "overview",
            label: "Constraints",
            title: "Why small errors hurt",
            body:
              "HR incidents escalate quickly because they affect pay, performance, and legal exposure. Unlike most SaaS tools, HR systems directly shape trust between employees and the company.",
            points: [
              "Incorrect access is a breach, even if accidental",
              "Ambiguous suggestions create distrust and pushback",
              "Inconsistent workflows cause support load and churn risk",
              "Silent changes are unacceptable in people data",
            ],
          },
          {
            id: "non-negotiables",
            label: "Non negotiables",
            title: "Constraints that cannot move",
            body:
              "These are table stakes for shipping anything intelligent in HR. Assist is fine, ambiguity is not.",
            points: [
              "Human decision ownership stays explicit",
              "Evidence beats confidence every time",
              "Reversibility by default for workflow actions",
              "Audit trails must capture what changed and why",
            ],
          },
          {
            id: "examples",
            label: "Examples",
            title: "Common risk zones",
            body:
              "These are the places where mistakes become high impact for customers and painful to unwind.",
            points: [
              "Performance reviews and manager notes",
              "Compensation related fields and approvals",
              "Termination and disciplinary workflows",
              "Permission changes and role transitions",
            ],
          },
        ],
        extraBelow: {
        intro:
            "HR constraints exist because mistakes compound fast. A small error at the record level quickly turns into payroll issues, legal exposure, or loss of employee trust.",
        cards: [
            {
            title: "Incorrect access is a breach, even if accidental",
            body:
                "When sensitive data is exposed to the wrong role, intent does not matter. The platform is judged on outcome, not explanation.",
            },
            {
            title: "Ambiguity creates escalation, not efficiency",
            body:
                "If managers do not understand why something was suggested or blocked, they escalate to HR. What looks like helpful automation becomes friction overnight.",
            },
            {
            title: "Silent changes erode trust",
            body:
                "Any update that happens without clear acknowledgment makes people uneasy. In HR systems, surprise is a failure mode.",
            },
        ],
        note:
            "In practice, the safest systems are conservative by design. They prefer being questioned for slowness over being blamed for harm.",
        },

      },

      {
        id: "ai-lift",
        tab: "AI Lift",
        eyebrow: "Context",
        title: "Where AI can drive lift",
        description:
          "AI should reduce admin load and improve consistency without changing decision rights. The best lift comes from drafting, summarizing, routing, and quality checks with evidence.",
        pills: ["Drafting", "Summaries", "Quality checks"],
        image: {
          src: "/bamboohr/context-3.png",
          alt: "Where AI can drive lift in HR workflows",
        },
        details: [
          {
            id: "overview",
            label: "Lift areas",
            title: "High value, low risk lift",
            body:
              "Focus on assistive workflows where humans remain the decision layer and the system stays easy to audit.",
            points: [
              "Draft policy summaries, manager messages, and review prompts",
              "Summarize employee history within permission boundaries",
              "Triage HR requests and route to the right owner with context",
              "Flag missing fields or inconsistent workflow steps",
            ],
          },
          {
            id: "non-negotiables",
            label: "Rules",
            title: "What AI must not do",
            body:
              "If a feature influences outcomes without evidence and an explicit approval step, it will fail in the real world.",
            points: [
              "No performance rating or termination recommendations",
              "No hidden policy interpretations presented as truth",
              "No access expansion through summarization",
              "No silent edits to employee records",
            ],
          },
          {
            id: "examples",
            label: "Practical examples",
            title: "Shippable use cases",
            body:
              "These are features you can realistically build while keeping the platform safe and predictable.",
            points: [
              "Manager drafting assistant with tone and bias checks",
              "HR help desk answers grounded in policy documents",
              "Onboarding checklist generation from templates",
              "Change request summaries with suggested next steps",
            ],
          },
        ],
        extraBelow: {
        intro:
            "In HR systems, AI is most valuable when it reduces cognitive load and admin work, while keeping decisions explicit and reversible.",
        cards: [
            {
            title: "Drafting, not deciding",
            body:
                "AI can help draft manager messages, policy summaries, and review inputs. Final wording and intent should always remain human-owned.",
            },
            {
            title: "Summarization with boundaries",
            body:
                "Long employee histories can be summarized for context, as long as the source fields and permissions are respected. Compression is useful. Interpretation is risky.",
            },
            {
            title: "Routing and triage",
            body:
                "Repetitive HR requests can be categorized and routed faster, giving HR teams more time for judgment-heavy work.",
            },
        ],
        note:
            "The most effective AI in HR feels like a good assistant. Helpful, quiet, and never mistaken for the decision maker.",
        },

      },
    ],
    []
  );

  const DURATION_MS = 7000;

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const activeSlide = slides[activeSlideIdx];

  const [detailTabId, setDetailTabId] = useState<DetailTabId>("overview");

  useEffect(() => {
    setDetailTabId("overview");
  }, [activeSlideIdx]);

  useEffect(() => {
    if (!auto) return;

    const t = window.setInterval(() => {
      setActiveSlideIdx((v) => (v + 1) % slides.length);
    }, DURATION_MS);

    return () => window.clearInterval(t);
  }, [auto, slides.length]);

  const switchSlide = (idx: number) => {
    if (idx === activeSlideIdx) return;

    setIsFading(true);
    window.setTimeout(() => {
      setActiveSlideIdx(idx);
      setIsFading(false);
    }, 160);
  };

  const prev = () => switchSlide((activeSlideIdx - 1 + slides.length) % slides.length);
  const next = () => switchSlide((activeSlideIdx + 1) % slides.length);

  const detail =
    activeSlide.details.find((d) => d.id === detailTabId) ?? activeSlide.details[0];

  return (
    <section className={styles.wrap} aria-label="Context">
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.eyebrow}>{activeSlide.eyebrow}</p>
            <h2 className={styles.title}>{activeSlide.title}</h2>
          </div>

          <div className={styles.controls}>
            <button className={styles.iconBtn} type="button" onClick={prev} aria-label="Previous">
              ‹
            </button>

            <button
              className={styles.iconBtn}
              type="button"
              onClick={() => setAuto((v) => !v)}
              aria-label={auto ? "Pause" : "Play"}
              title={auto ? "Pause" : "Play"}
            >
              {auto ? "Ⅱ" : "▶"}
            </button>

            <button className={styles.iconBtn} type="button" onClick={next} aria-label="Next">
              ›
            </button>
          </div>
        </div>

        <p className={styles.desc}>{activeSlide.description}</p>

        <div className={styles.pills}>
          {activeSlide.pills.map((p) => (
            <span key={p} className={styles.pill}>
              {p}
            </span>
          ))}
        </div>

        <div className={styles.storyBars} aria-hidden="true">
          {slides.map((_, idx) => {
            const done = idx < activeSlideIdx;
            const isActive = idx === activeSlideIdx;

            return (
              <div key={idx} className={styles.storyBar}>
                <div
                  className={`${styles.storyFill} ${done ? styles.storyFillDone : ""} ${
                    isActive && auto ? styles.storyFillActive : ""
                  }`}
                  style={
                    isActive && auto
                      ? ({ ["--dur" as any]: `${DURATION_MS}ms` } as React.CSSProperties)
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </header>

      <div className={styles.deck}>
        <div className={styles.deckTop}>
          <div className={styles.tabs} role="tablist" aria-label="Context slides">
            {slides.map((s, idx) => {
              const isActive = idx === activeSlideIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => switchSlide(idx)}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>

          <div className={styles.autoMeta}>
            <span className={styles.autoPill}>{auto ? "Auto" : "Paused"}</span>
            <span className={styles.autoText}>Use tabs or controls</span>
          </div>
        </div>

        <div className={`${styles.body} ${isFading ? styles.fadeOut : styles.fadeIn}`}>
          {/* Image */}
          <div className={styles.imageFrame}>
            <div className={styles.imageInner}>
              <Image
                src={activeSlide.image.src}
                alt={activeSlide.image.alt}
                width={1200}
                height={700}
                className={styles.image}
                priority
              />
            </div>
          </div>

          {/* Extra below-image content for Slide 1 */}
          {activeSlide.extraBelow ? (
            <div className={styles.belowImageContent}>
                <div className={styles.belowImageHeader}>
                <span className={styles.belowImagePill}>Platform</span>
                <span className={styles.belowImageHint}>Why this matters in practice</span>
                </div>

                <p className={styles.contextIntro}>{activeSlide.extraBelow.intro}</p>

                <div className={styles.contextGrid}>
                {activeSlide.extraBelow.cards.map((c) => (
                    <div key={c.title} className={styles.contextCard}>
                    <h4 className={styles.contextCardTitle}>{c.title}</h4>
                    <p className={styles.contextCardBody}>{c.body}</p>
                    </div>
                ))}
                </div>

                <div className={styles.contextCallout}>
                <p className={styles.contextCalloutText}>{activeSlide.extraBelow.note}</p>
                </div>
            </div>
            ) : null}

          {/* Below image details area */}
          <div className={styles.below}>
            <div className={styles.belowTop}>
              <div className={styles.detailTabs} role="tablist" aria-label="Slide details">
                {activeSlide.details.map((d) => {
                  const isActive = d.id === detailTabId;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.detailTab} ${isActive ? styles.detailTabActive : ""}`}
                      onClick={() => setDetailTabId(d.id)}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>

              <div className={styles.detailMeta}>
                <span className={styles.detailMetaPill}>Details</span>
              </div>
            </div>

            <div className={styles.belowDivider} />

            <h3 className={styles.detailTitle}>{detail.title}</h3>
            <p className={styles.detailBody}>{detail.body}</p>

            <div className={styles.cards}>
              {detail.points.map((pt) => (
                <div key={pt} className={styles.card}>
                  <p className={styles.cardText}>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
