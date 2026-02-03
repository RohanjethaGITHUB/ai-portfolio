"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./about.module.css";

type TimelineItem = {
  id: string;
  range: string;
  title: string;
  subtitle: string;
  context: string[];
  learnt: string;
  tags?: string[];
};

const ROAD_PATH =
  "M120 0 C 70 120, 170 260, 120 380 C 70 520, 170 640, 120 760 C 70 920, 170 1040, 120 1160 C 70 1280, 170 1360, 120 1400";

const TIMELINE: TimelineItem[] = [
  {
    id: "01",
    range: "2010 to 2014",
    title: "Education",
    subtitle: "Learning the fundamentals before real systems",
    context: [
      "Completed a Bachelor’s degree in Information Technology",
      "Built core programming and systems fundamentals",
      "Learned the language that later made product and systems work possible",
    ],
    learnt:
      "I learned that fundamentals compound. The ability to reason clearly about systems becomes more valuable as complexity increases.",
    tags: ["Education", "Learning"],
  },
  {
    id: "02",
    range: "2014 to 2017",
    title: "Foundations",
    subtitle: "Learning how to make (and break) real systems",
    context: [
      "Built and shipped full-stack features in production environments",
      "Debugged real failures, edge cases, and performance issues",
      "Worked close to code, infrastructure, and system boundaries",
    ],
    learnt:
      "I learned that systems rarely fail because of missing features. They fail because of unclear assumptions, weak boundaries, and poor handling of edge cases.",
    tags: ["Software Development", "Coding"],
  },
  {
    id: "03",
    range: "2017 to 2019",
    title: "Product",
    subtitle: "Deciding what actually matters",
    context: [
      "Moved closer to product and stakeholder decisions",
      "Translated ambiguous requirements into buildable scopes",
      "Managed trade-offs between speed, quality, and impact",
    ],
    learnt:
      "I learned that the hardest part of building products is not execution. It is deciding what problem you are truly solving.",
    tags: ["Product", "Trade-offs"],
  },
  {
    id: "04",
    range: "2019 to 2023",
    title: "Outcomes",
    subtitle: "Shipping is only the beginning",
    context: [
      "Owned systems with real users, volume, and consequences",
      "Handled operational issues after launch",
      "Worked across product, operations, and delivery",
    ],
    learnt:
      "I learned that shipping is the start of the problem, not the end. Systems must be designed for monitoring, recovery, and human workflows.",
    tags: ["Operations", "Delivery", "Leadership"],
  },
  {
    id: "05",
    range: "2023 to now",
    title: "Business Owner",
    subtitle: "Building systems where decisions have real cost",
    context: [
      "Owned a solo business across sales, delivery, and execution",
      "Designed AI assisted workflows used in live operations",
      "Built automation across data pipelines, tools, and human handoffs",
      "Made daily trade-offs across speed, cost, reliability, and risk",
      "Delivered continuously without buffers, teams, or safety nets",
    ],
    learnt:
      "I learned that AI is not the product. The system around it is. Guardrails, feedback loops, cost control, and human override define whether AI creates leverage or debt.",
    tags: ["Business", "Ownership", "AI", "Systems"],
  },
];

const PRINCIPLES = [
  {
    title: "AI is infrastructure",
    body: "Treat it like a system component with inputs, outputs, cost, and failure modes.",
  },
  {
    title: "Reduce decisions",
    body: "The best automation removes choice at the right moment.",
  },
  {
    title: "Design for failure",
    body: "Every workflow needs safe fallbacks, audits, and human override.",
  },
  {
    title: "Clarity beats cleverness",
    body: "Simple, testable flows win over magic nobody can debug.",
  },
];

const CAPABILITIES = [
  {
    title: "AI product strategy",
    body: "Turn messy goals into clear user jobs, constraints, and measurable outcomes.",
  },
  {
    title: "Automation systems",
    body: "Design end to end workflows across tools, data sources, and handoffs.",
  },
  {
    title: "AI experience design",
    body: "Shape interactions that feel predictable, useful, and low friction.",
  },
  {
    title: "Delivery and governance",
    body: "Ship with guardrails, observability, and practical QA for real operations.",
  },
  {
    title: "System design thinking",
    body: "Map flows, edges, and trade-offs like a platform, not a single feature.",
  },
  {
    title: "Execution under constraints",
    body: "Move fast without breaking trust, by cutting scope intelligently.",
  },
];

const NOW_FOCUS = [
  "Cost-aware AI product decisions",
  "Human-in-the-loop workflows that scale",
  "Failure-safe automation patterns",
  "AI systems that feel calm and predictable",
];

const WALKER_SRC = [
  "/walker/walker-1-education.png",
  "/walker/walker-2-foundations.png",
  "/walker/walker-3-product.png",
  "/walker/walker-4-outcomes.png",
  "/walker/walker-5-business-owner.png",
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [walkStage, setWalkStage] = useState(0);
  const [walkerPose, setWalkerPose] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const start = vh * 0.8;
      const end = vh * 0.2;

      const total = rect.height + (start - end);
      const travelled = start - rect.top;
      const raw = travelled / (total || 1);
      const t = clamp(raw, 0, 1);

      setWalkStage(Math.min(4, Math.floor(t * 5)));

      const p = pathRef.current;
      if (!p) return;

      const svg = p.ownerSVGElement;
      if (!svg) return;

      const len = p.getTotalLength();
      const pt = p.getPointAtLength(len * t);

      const ctm = svg.getScreenCTM();
      if (!ctm) return;

      const sp = svg.createSVGPoint();
      sp.x = pt.x;
      sp.y = pt.y;

      const screen = sp.matrixTransform(ctm);

      const localX = screen.x - rect.left;
      const localY = screen.y - rect.top;

      setWalkerPose({ x: localX, y: localY });
    };

    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    const t = window.setTimeout(update, 60);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(t);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const stage = clamp(walkStage, 0, 4);
  const walkerScaleByStage = [1.08, 1.1, 1.12, 1.14, 1.16];
  const walkerScale = walkerScaleByStage[stage];

  const walkerFace = stage % 2 === 0 ? "left" : "right";

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.stack}>
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.heroTopKicker}>ABOUT</div>

              <h1 className={styles.heroTitle}>
                I build AI systems that ship, scale, and stay reliable in the real world.
              </h1>

              <p className={styles.heroSub}>
                I help teams turn messy AI ideas into operational systems: clear inputs, safe fallbacks, measurable
                outcomes, and workflows people actually use.
              </p>

              <div className={styles.heroMetaRow}>
                <div className={styles.metaChip}>
                  <span className={styles.metaLabel}>Based in</span>
                  <span className={styles.metaValue}>Sydney</span>
                </div>
                <div className={styles.metaChip}>
                  <span className={styles.metaLabel}>Focus</span>
                  <span className={styles.metaValue}>AI systems, automation</span>
                </div>
                <div className={styles.metaChip}>
                  <span className={styles.metaLabel}>Style</span>
                  <span className={styles.metaValue}>Practical, calm, rigorous</span>
                </div>
              </div>
            </div>

            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroNoise} aria-hidden="true" />
          </section>

          <div className={styles.flowPanel}>
            {/* <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.h2}>How I think about AI systems</h2>
                <p className={styles.lede}>
                  Principles I use to keep systems useful in the real world, not just in demos.
                </p>
              </div>

              <div className={styles.grid2}>
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className={styles.card}>
                    <div className={styles.cardTitle}>{p.title}</div>
                    <div className={styles.cardBody}>{p.body}</div>
                  </div>
                ))}
              </div>
            </section> */}

            <div className={styles.panelDivider} aria-hidden="true" />

            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.h2}>Timeline</h2>
                <p className={styles.lede}>The chapters that shaped how I build systems.</p>
              </div>

              <div className={styles.timelineWrap} ref={timelineRef}>
                <div className={styles.road} aria-hidden="true">
                  <svg className={styles.roadSvg} viewBox="0 0 240 1400" preserveAspectRatio="none">
                    <path ref={pathRef} className={styles.roadBody} d={ROAD_PATH} />
                    <path className={styles.roadDash} d={ROAD_PATH} />
                  </svg>
                  <span className={styles.roadGlow} />
                </div>

                <div
                  className={styles.walkerWrap}
                  data-face={walkerFace}
                  style={
                    {
                      "--walkerX": `${walkerPose.x}px`,
                      "--walkerY": `${walkerPose.y}px`,
                      "--walkerScale": walkerScale,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                >
                  {stage >= 3 ? <span className={styles.aura} /> : null}

                  <img className={styles.walkerImg} src={WALKER_SRC[stage]} alt="" draggable={false} />
                </div>

                <div className={styles.timeline}>
                  {TIMELINE.map((t, idx) => {
                    const isLeft = idx % 2 === 0;
                    return (
                      <article
                        key={t.id}
                        className={`${styles.step} ${isLeft ? styles.left : styles.right}`}
                      >
                        <div className={styles.stepContent}>
                          <div className={styles.stepRange}>{t.range}</div>

                          <h3 className={styles.stepTitle}>{t.title}</h3>
                          <div className={styles.stepSubtitle}>{t.subtitle}</div>

                          <div className={styles.contextBlock}>
                            <div className={styles.contextLabel}>Context</div>
                            <ul className={styles.contextList}>
                              {t.context.map((c) => (
                                <li key={c} className={styles.contextItem}>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.learntBlock}>
                            <div className={styles.learntLabel}>Learnt</div>
                            <div className={styles.learntText}>{t.learnt}</div>
                          </div>

                          {t.tags?.length ? (
                            <div className={styles.tags}>
                              {t.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className={styles.markerWrap} aria-hidden="true">
                          <div className={styles.marker}>
                            <span className={styles.markerNum}>{t.id}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className={styles.panelDivider} aria-hidden="true" />

            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.h2}>What that journey gave me</h2>
                <p className={styles.lede}>Capabilities that show up consistently across my work.</p>
              </div>

              <div className={styles.grid3}>
                {CAPABILITIES.map((c) => (
                  <div key={c.title} className={styles.card}>
                    <div className={styles.cardTitle}>{c.title}</div>
                    <div className={styles.cardBody}>{c.body}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.panelDivider} aria-hidden="true" />

            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.h2}>What I am focused on now</h2>
                <p className={styles.lede}>
                  The direction I am leaning into as AI systems become more operational.
                </p>
              </div>

              <div className={styles.nowGrid}>
                {NOW_FOCUS.map((x) => (
                  <div key={x} className={styles.nowItem}>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span className={styles.nowText}>{x}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.panelDivider} aria-hidden="true" />

            <section className={styles.close}>
              <div className={styles.closeCard}>
                <h2 className={styles.closeTitle}>If this resonates</h2>
                <p className={styles.closeText}>
                  If you are building AI systems and want them to feel calm, reliable, and measurable,
                  we will probably work well together.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
