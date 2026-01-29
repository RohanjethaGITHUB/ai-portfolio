// Context.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../razorpay.module.css";
import context from "./Context.module.css";

type Tone = "conversion" | "risk" | "ops" | "measurable" | "platform" | "compliance";

type HeaderTag = {
  label: string;
  tone: Tone;
};

type Rice = {
  reach: number; // 1..10
  impact: number; // 1..10
  confidence: number; // 1..10
  effort: number; // 1..10 (lower is better)
};

type LiftItem = {
  tone: "conversion" | "risk" | "ops";
  title: string;
  subtitle: string;
  chips: string[];
  bullets: string[];
  metric: string;
  rice: Rice;
};

type SlideKey = "platform" | "constraints" | "lift";
type SlideLayout = "default" | "lift";

type Slide = {
  key: SlideKey;
  label: string;
  title: string;
  body: string;
  headerTags: HeaderTag[];

  layout: SlideLayout;

  // default layout fields
  tags?: string[];
  bullets?: string[];
  cards?: { title: string; desc: string; tag?: string }[];
  calloutTitle?: string;
  calloutBody?: string;
  panelTitle?: string;
  panelBody?: string;
  imageSrc?: string;

  // lift layout fields
  bannerSrc?: string;
  liftItems?: LiftItem[];
};

function IconChevronLeft() {
  return (
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className={context.icon} viewBox="0 0 24 24" aria-hidden="true">
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

function riceScore(r: Rice) {
  const score = (r.reach * r.impact * r.confidence) / Math.max(1, r.effort);
  return Math.round(score * 10) / 10;
}

function RiceRow({ tone, rice }: { tone: LiftItem["tone"]; rice: Rice }) {
  const score = riceScore(rice);

  const mkBar = (value: number) => {
    const p = clamp01(value / 10);
    return <span className={context.riceBarFill} style={{ transform: `scaleX(${p})` }} />;
  };

  return (
    <div className={context.riceWrap}>
      <div className={context.riceTop}>
        <div className={context.riceLabel}>RICE</div>
        <div className={`${context.riceScore} ${context[`toneText_${tone}`]}`}>{score}</div>
      </div>

      <div className={context.riceGrid}>
        <div className={context.riceItem}>
          <div className={context.riceKey}>Reach</div>
          <div className={context.riceBar}>{mkBar(rice.reach)}</div>
        </div>

        <div className={context.riceItem}>
          <div className={context.riceKey}>Impact</div>
          <div className={context.riceBar}>{mkBar(rice.impact)}</div>
        </div>

        <div className={context.riceItem}>
          <div className={context.riceKey}>Confidence</div>
          <div className={context.riceBar}>{mkBar(rice.confidence)}</div>
        </div>

        <div className={context.riceItem}>
          <div className={context.riceKey}>Effort</div>
          <div className={context.riceBarEffort}>{mkBar(10 - rice.effort)}</div>
          <div className={context.riceHint}>Lower effort scores higher</div>
        </div>
      </div>
    </div>
  );
}

function LiftCard({ item }: { item: LiftItem }) {
  return (
    <div className={`${context.liftCard} ${context[`toneBorder_${item.tone}`]}`}>
      <div className={context.solutionBadgeRow}>
        <span className={`${context.solutionBadge} ${context[`tonePill_${item.tone}`]}`}>
          Suggested AI solution
        </span>
      </div>

      <div className={context.liftCardHead}>
        <div className={context.liftTitleRow}>
          <div className={`${context.liftTitle} ${context[`toneText_${item.tone}`]}`}>{item.title}</div>
          <span className={`${context.liftMetric} ${context[`tonePill_${item.tone}`]}`}>
            Metric: {item.metric}
          </span>
        </div>

        <div className={context.liftSubtitle}>{item.subtitle}</div>

        <div className={context.chipRow}>
          {item.chips.map((c) => (
            <span key={c} className={`${context.chip} ${context[`toneChip_${item.tone}`]}`}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <ul className={context.liftList}>
        {item.bullets.map((b, idx) => (
          <li key={`${item.title}-b-${idx}`}>{b}</li>
        ))}
      </ul>

      <RiceRow tone={item.tone} rice={item.rice} />
    </div>
  );
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
    <div className={context.storyWrap} aria-label={ariaLabel} tabIndex={0}>
      <div className={context.slideHeader}>
        <h2 className={context.slideTitle}>{activeSlide.title}</h2>
        <p className={context.slideDesc}>{activeSlide.body}</p>

        {activeSlide.headerTags?.length ? (
          <div className={context.headerTagRow}>
            {activeSlide.headerTags.map((t) => (
              <span key={t.label} className={`${context.hTag} ${context[`hTag_${t.tone}`]}`}>
                {t.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={context.storyTop}>
        <div className={context.storyTopRow}>
          <div className={context.storyMetaRow}>
            <span className={context.storyPill}>{activeSlide.label}</span>
            <span className={context.storyPillMuted}>{paused ? "Paused" : "Auto"}</span>
          </div>

          <div className={context.storyNavTop}>
            <button type="button" className={context.iconBtn} onClick={prev} aria-label="Previous">
              <IconChevronLeft />
            </button>

            <button
              type="button"
              className={context.iconBtn}
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play" : "Pause"}
              aria-pressed={!paused}
            >
              {paused ? <IconPlay /> : <IconPause />}
            </button>

            <button type="button" className={context.iconBtn} onClick={next} aria-label="Next">
              <IconChevronRight />
            </button>
          </div>
        </div>

        <div className={context.storyBars} aria-hidden="true" style={{ ["--storyCount" as any]: slides.length }}>
          {slides.map((s, i) => {
            const isActive = i === active;
            const fill = isActive ? progress : i < active ? 1 : 0;

            return (
              <button
                key={`${s.label}-${i}`}
                type="button"
                className={`${context.storyBar} ${isActive ? context.storyBarActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Open: ${s.label}`}
              >
                <span className={context.storyFill} style={{ transform: `scaleX(${fill})` }} />
              </button>
            );
          })}
        </div>
      </div>

      <div className={context.storyViewport}>
        <div className={context.storyZones} aria-hidden="true">
          <button type="button" className={context.storyZone} onClick={prev} aria-label="Previous" tabIndex={-1} />
          <button type="button" className={context.storyZone} onClick={next} aria-label="Next" tabIndex={-1} />
        </div>

        {activeSlide.layout === "lift" ? (
          <div className={context.liftViewport}>
            <div className={context.bannerBox}>
              <img
                src={activeSlide.bannerSrc ?? "/lift.png"}
                alt="AI lift summary"
                className={context.bannerImg}
                loading="lazy"
              />
            </div>

            <div className={context.recommendedRow}>
              <span className={context.recommendedBadge}>Recommended</span>
            </div>

            <div className={context.solutionsHead}>
              <h3 className={context.solutionsTitle}>Suggested AI solutions</h3>
              <p className={context.solutionsSub}>
                Three solution packs, each tied to a primary metric and a quick RICE estimate.
              </p>
            </div>

            <div className={context.liftGrid}>
              {(activeSlide.liftItems ?? []).map((it) => (
                <LiftCard key={it.title} item={it} />
              ))}
            </div>
          </div>
        ) : (
          /* DEFAULT LAYOUT: Image on top, text below */
          <div className={context.defaultStack}>
            <div className={context.imageTop}>
              <div className={context.imageBoxFixed}>
                <img
                  src={activeSlide.imageSrc ?? "/context.png"}
                  alt={`${activeSlide.title} diagram`}
                  className={context.imageFixed}
                  loading="lazy"
                />
              </div>
            </div>

            <article className={context.storySlide}>
              {activeSlide.tags?.length ? (
                <div className={context.tagRow}>
                  {activeSlide.tags.map((t) => (
                    <span key={t} className={context.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {activeSlide.panelTitle ? <h3 className={context.panelTitle}>{activeSlide.panelTitle}</h3> : null}
              {activeSlide.panelBody ? <p className={context.panelBody}>{activeSlide.panelBody}</p> : null}

              {activeSlide.cards?.length ? (
                <div className={context.cardGrid}>
                  {activeSlide.cards.map((c, idx) => (
                    <div key={`${c.title}-${idx}`} className={context.miniCard}>
                      <div className={context.miniCardTop}>
                        <div className={context.miniCardTitle}>{c.title}</div>
                        {c.tag ? <span className={context.miniTag}>{c.tag}</span> : null}
                      </div>
                      <div className={context.miniCardDesc}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeSlide.bullets?.length ? (
                <ul className={context.storyList}>
                  {activeSlide.bullets.map((b, idx) => (
                    <li key={`${activeSlide.label}-b-${idx}`}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {activeSlide.calloutTitle || activeSlide.calloutBody ? (
                <div className={context.callout}>
                  {activeSlide.calloutTitle ? <div className={context.calloutTitle}>{activeSlide.calloutTitle}</div> : null}
                  {activeSlide.calloutBody ? <div className={context.calloutBody}>{activeSlide.calloutBody}</div> : null}
                </div>
              ) : null}
            </article>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Context() {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "platform",
        label: "Platform",
        title: "What the platform does",
        body:
          "Razorpay is a payments and money movement platform. It helps businesses accept payments, move funds, and reconcile money flows across multiple rails.",
        headerTags: [
          { label: "Payments OS", tone: "platform" },
          { label: "Money movement", tone: "ops" },
          { label: "Merchant tooling", tone: "measurable" },
        ],
        layout: "default",
        tags: ["Surface area", "Reliability first", "Multi product"],
        panelTitle: "Core surface areas (quick map)",
        panelBody:
          "Think of Razorpay as three connected surfaces: checkout completion, money movement, and reporting. The most important thing is where failures show up and how teams recover.",
        cards: [
          { title: "Accept", desc: "Checkout orchestration across cards, UPI, netbanking, wallets.", tag: "Conversion" },
          { title: "Move", desc: "Payouts, refunds, settlements, dispute flows.", tag: "Reliability" },
          { title: "Reconcile", desc: "Ledger views, settlement reporting, ops workflows.", tag: "Ops" },
        ],
        bullets: [
          "More rails means more edge cases and integration variance",
          "Onboarding is product plus compliance, not just a form",
          "Trust is driven by success rate, latency, and clarity",
        ],
        calloutTitle: "Context lens",
        calloutBody: "Before AI, map the surface area and the failure modes. Safe automation starts there.",
        imageSrc: "/context.png",
      },
      {
        key: "constraints",
        label: "Constraints",
        title: "Primary constraints",
        body:
          "Payments systems operate under strict reliability, fraud, and compliance constraints. Small regressions can become expensive trust failures.",
        headerTags: [
          { label: "Latency budgets", tone: "conversion" },
          { label: "Fraud pressure", tone: "risk" },
          { label: "Auditability", tone: "compliance" },
        ],
        layout: "default",
        tags: ["Non negotiables", "Fallbacks", "Monitoring"],
        panelTitle: "Constraints you cannot negotiate",
        panelBody:
          "Payments is adversarial and time sensitive. Any intelligence layer must stay controllable, debuggable, and reversible. A smart feature that cannot be explained becomes a support liability.",
        cards: [
          { title: "Latency", desc: "Checkout must feel instant. Slow paths kill completion.", tag: "Real time" },
          { title: "Fraud", desc: "Adversarial behavior changes constantly.", tag: "Adaptive" },
          { title: "Compliance", desc: "KYC, audit trails, explainability, data handling.", tag: "Strict" },
        ],
        bullets: [
          "Every AI decision needs a deterministic fallback",
          "Observability matters: alerts, traces, and human override",
          "Risk controls cannot be a black box to the team",
        ],
        calloutTitle: "Guardrail rule",
        calloutBody: "If the system cannot explain a decision to a human, it should not be making that decision.",
        imageSrc: "/constraints.png",
      },
      {
        key: "lift",
        label: "AI lift",
        title: "Where AI can drive lift",
        body:
          "AI should lift conversion, reduce fraud losses, and improve ops efficiency while staying measurable and explainable.",
        headerTags: [
          { label: "Conversion", tone: "conversion" },
          { label: "Risk", tone: "risk" },
          { label: "Ops efficiency", tone: "ops" },
          { label: "Measurable", tone: "measurable" },
        ],
        layout: "lift",
        bannerSrc: "/lift.png",
        liftItems: [
          {
            tone: "conversion",
            title: "Conversion lift",
            subtitle: "Reduce avoidable checkout failures and shorten the path to success.",
            metric: "Payment success rate",
            chips: ["Retry intelligence", "Drop off diagnosis", "Routing hints"],
            bullets: [
              "Explain why failures cluster by method, issuer, device, or time",
              "Recommend the next best retry path based on recent patterns",
              "Surface the top friction points by cohort, not raw logs",
            ],
            rice: { reach: 9, impact: 7, confidence: 8, effort: 5 },
          },
          {
            tone: "risk",
            title: "Risk lift",
            subtitle: "Improve loss outcomes with explainable signals and targeted friction.",
            metric: "Chargeback rate",
            chips: ["Anomaly narratives", "Merchant risk brief", "Adaptive friction"],
            bullets: [
              "Summarize what changed and why it matters for risk teams",
              "Prioritize investigations using clusters, not single events",
              "Suggest where to add friction with a clear reason and rollback",
            ],
            rice: { reach: 6, impact: 6, confidence: 7, effort: 5 },
          },
          {
            tone: "ops",
            title: "Ops efficiency",
            subtitle: "Cut time to resolution by turning system signals into clear actions.",
            metric: "Time to resolution",
            chips: ["Ticket triage", "Plain language root cause", "Next steps"],
            bullets: [
              "Classify tickets by likely root cause, not symptom text",
              "Translate logs and webhooks into readable incident summaries",
              "Recommend next best actions and owner routing for faster closure",
            ],
            rice: { reach: 9, impact: 7, confidence: 8, effort: 4 },
          },
        ],
      },
    ],
    []
  );

  return (
    <section id="context" className={styles.section}>
      <div className={context.ctxSingle}>
        <StoryRotator slides={slides} ariaLabel="Context story" />
      </div>
    </section>
  );
}
