"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./BelowHeroFlow.module.css";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type ActiveIdx = 0 | 1 | 2;

export default function BelowHeroFlow() {
  const sceneRef = useRef<HTMLElement | null>(null);

  const a1Ref = useRef<HTMLDivElement | null>(null);
  const a2Ref = useRef<HTMLDivElement | null>(null);
  const a3Ref = useRef<HTMLDivElement | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<ActiveIdx>(0);
  const activeRef = useRef<ActiveIdx>(0);

  // Smooth progress coming from scroll to reduce target jitter
  const smoothProgressRef = useRef(0);

  // Motion values (targets)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rZ = useMotionValue(0);
  const rY = useMotionValue(0);
  const opacity = useMotionValue(0);

  // Springs (rendered values)
  const sx = useSpring(x, { stiffness: 160, damping: 32, mass: 0.95 });
  const sy = useSpring(y, { stiffness: 160, damping: 32, mass: 0.95 });
  const sRZ = useSpring(rZ, { stiffness: 140, damping: 30, mass: 1.0 });

  // Critical damping for rotateY so it does not overshoot and vanish edge on
  const sRY = useSpring(rY, {
    stiffness: 90,
    damping: 40,
    mass: 1.2,
    bounce: 0,
  });

  const sO = useSpring(opacity, { stiffness: 180, damping: 34, mass: 1.0 });

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const sceneEl = sceneRef.current;
      const cardEl = cardRef.current;
      const a0 = a1Ref.current;
      const a1 = a2Ref.current;
      const a2 = a3Ref.current;

      if (!sceneEl || !cardEl || !a0 || !a1 || !a2) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const sceneRect = sceneEl.getBoundingClientRect();

      const inView =
        sceneRect.bottom > window.innerHeight * 0.15 &&
        sceneRect.top < window.innerHeight * 0.85;

      opacity.set(inView ? 1 : 0);

      // keep looping, but skip heavy reads when far away
      if (!inView) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Progress through the scene (0..1)
      const sceneTopPage = window.scrollY + sceneRect.top;
      const sceneHeight = sceneEl.offsetHeight || 1;

      const viewportMid = window.scrollY + window.innerHeight * 0.5;
      const raw = (viewportMid - sceneTopPage) / sceneHeight;
      const rawProgress = clamp(raw, 0, 1);

      // Smooth the progress
      const prev = smoothProgressRef.current;
      const smoothed = lerp(prev, rawProgress, 0.10);
      smoothProgressRef.current = smoothed;

      // 3 anchors means 2 transitions (segments 0..2)
      const seg = smoothed * 2; // 0..2
      const segIdx = clamp(Math.floor(seg), 0, 1); // 0 or 1
      const t = seg - segIdx;

      const nextActive = (seg < 0.66 ? 0 : seg < 1.33 ? 1 : 2) as ActiveIdx;

      // Update state only when it changes
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }

      // Anchor centers in viewport coords
      const r0 = a0.getBoundingClientRect();
      const r1 = a1.getBoundingClientRect();
      const r2 = a2.getBoundingClientRect();

      const c0 = { cx: r0.left + r0.width / 2, cy: r0.top + r0.height / 2 };
      const c1 = { cx: r1.left + r1.width / 2, cy: r1.top + r1.height / 2 };
      const c2 = { cx: r2.left + r2.width / 2, cy: r2.top + r2.height / 2 };

      const from = segIdx === 0 ? c0 : c1;
      const to = segIdx === 0 ? c1 : c2;

      // Card size: use offsetWidth/offsetHeight (stable, not affected by transforms)
      const halfW = (cardEl.offsetWidth || 0) / 2;
      const halfH = (cardEl.offsetHeight || 0) / 2;

      const tx = lerp(from.cx, to.cx, t) - halfW;
      const ty = lerp(from.cy, to.cy, t) - halfH;

      // Reduce subpixel shimmer
      x.set(Math.round(tx * 100) / 100);
      y.set(Math.round(ty * 100) / 100);

      rZ.set(lerp(-1.5, 1.5, t));
      rY.set(activeRef.current * 180);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      smoothProgressRef.current = clamp(smoothProgressRef.current, 0, 1);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [x, y, rZ, rY, opacity]);

  return (
    <section ref={sceneRef as React.RefObject<HTMLElement>} className={styles.scene}>
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={styles.meshOverlay} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Fixed viewport layer so x/y targets make sense */}
        <div className={styles.cardLayer} aria-hidden="true">
          <motion.div
            ref={cardRef}
            className={styles.sharedCard}
            style={{
              translateX: sx,
              translateY: sy,
              rotateZ: sRZ,
              rotateY: sRY,
              opacity: sO,
              transformPerspective: 1200,
            }}
          >
            <div className={styles.cardFace + " " + styles.cardFront}>
              <CardVisual active={active} />
            </div>
            <div className={styles.cardFace + " " + styles.cardBack}>
              <CardVisual active={active} />
            </div>
          </motion.div>
        </div>

        {/* SECTION 1 */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.left}>
              <h2 className={styles.kicker}>MY CORE SKILLS</h2>
              <p className={styles.sub}>
                I build AI-first product experiences and automation workflows that reduce effort and increase clarity.
              </p>

              <div className={styles.accordion}>
                {[
                "AI product strategy",
                "Automation systems",
                "AI experience design",
                "AI delivery and governance",
              ].map((t, i) => (
                <button key={t} className={styles.accRow} type="button">
                  <span className={styles.pill}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.accTitle}>{t}</span>
                </button>
              ))}
              </div>
            </div>

            <div className={styles.lane}>
              <div ref={a1Ref} className={styles.anchor} />
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.lane}>
              <div ref={a2Ref} className={styles.anchor} />
            </div>

            <div className={styles.rightText}>
              <h2 className={styles.kicker}>ABOUT ME</h2>
              <p className={styles.sub}>
                Hi, I am Rohan, a product focused builder working at the intersection of UX, automation, and AI.
                I care about crafting meaningful and impactful digital experiences that hold up in the real world.
              </p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNum}>12+</div>
                  <div className={styles.statLabel}>Years of Experience</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>50+</div>
                  <div className={styles.statLabel}>AI Systems Shipped</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>20+</div>
                  <div className={styles.statLabel}>Case Studies and Builds</div>
                </div>
              </div>

              {/* <div className={styles.ctaRow}>
                <button className={styles.ctaGhost} type="button">
                  About Me
                </button>
                <button className={styles.ctaGhost} type="button">
                  LINKEDIN
                </button>
              </div> */}
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.left}>
              <h2 className={styles.kicker}>HOW I BUILD AI SYSTEMS</h2>
              <p className={styles.sub}>
                A practical, repeatable loop that takes you from idea to working system with measurable outcomes.
              </p>

              <ol className={styles.steps}>
                <li className={styles.step}>
                  <span className={styles.stepDot} />
                  <div>
                    <div className={styles.stepTitle}>Clarify the user job</div>
                    <div className={styles.stepText}>
                      Define input, output, and the single decision the system must support.
                    </div>
                  </div>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepDot} />
                  <div>
                    <div className={styles.stepTitle}>Design the data flow</div>
                    <div className={styles.stepText}>Events, storage, transformations, and guardrails.</div>
                  </div>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepDot} />
                  <div>
                    <div className={styles.stepTitle}>Prototype fast</div>
                    <div className={styles.stepText}>Build a thin end-to-end slice, then harden the edges.</div>
                  </div>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepDot} />
                  <div>
                    <div className={styles.stepTitle}>Measure and iterate</div>
                    <div className={styles.stepText}>Latency, cost, accuracy, and the human feedback loop.</div>
                  </div>
                </li>
              </ol>
            </div>

            <div className={styles.lane}>
              <div ref={a3Ref} className={styles.anchor} />
            </div>
          </div>
        </section>

        <div className={styles.fadeBottom} aria-hidden="true" />
      </div>
    </section>
  );
}

function CardVisual({ active }: { active: 0 | 1 | 2 }) {
  const visuals = [
    { title: "AI product strategy", src: "/coreSkills.png" },
    { title: "About me", src: "/aboutMe.png" },
    { title: "How I build AI systems", src: "/buildSystem.png" },
  ][active];

  return (
    <div className={styles.cardVisual}>
      <img
  className={`${styles.cardImg} ${active === 1 ? styles.cardImgContain : ""}`}
  src={visuals.src}
  alt={visuals.title}
/>

    </div>
  );
}
