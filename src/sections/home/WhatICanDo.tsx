"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { CardSlot } from "../../features/floating-card/CardSlot";

type Item = {
  title: string;
  points: string[];
  hoverImg: string;
};

type XY = { x: number; y: number };

export function WhatICanDo() {
  const items: Item[] = useMemo(
    () => [
      {
        title: "AI product strategy",
        points: [
          "Define the core user problem and success metric",
          "Map the journey and identify highest leverage friction",
          "Scope the MVP so it ships fast and proves value",
          "Align stakeholders with a simple decision narrative",
        ],
        // local PNG from /public
        hoverImg: "/ai-product-strategy.png",
      },
      {
        title: "Automation systems",
        points: [
          "Design robust flows with retries and guardrails",
          "Connect tools and data sources cleanly",
          "Add monitoring so failures do not go silent",
          "Ship in iterations with measurable impact",
        ],
        hoverImg: "/automation-systems.png",
      },
      {
        title: "AI experience design",
        points: [
          "User journeys around AI decisions",
          "Making AI outputs understandable",
          "Guardrails, confidence, clarity",
        ],
        hoverImg: "/ai-experience.png",
      },
      {
        title: "AI delivery & governance",
        points: [
          "Pick the right model for the use case",
          "Add lightweight evaluation for consistency",
          "Handle edge cases and failure modes",
          "Ship a working system with clean handover",
        ],
        hoverImg: "/governance.png",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const followerRef = useRef<HTMLDivElement | null>(null);
  const followerImgRef = useRef<HTMLImageElement | null>(null);

  const targetRef = useRef<XY>({ x: 0, y: 0 });
  const currentRef = useRef<XY>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const el = followerRef.current;
      if (!el) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const t = targetRef.current;
      const c = currentRef.current;

      const lerp = 0.18;
      c.x = c.x + (t.x - c.x) * lerp;
      c.y = c.y + (t.y - c.y) * lerp;

      el.style.left = `${c.x}px`;
      el.style.top = `${c.y}px`;

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const showFollower = (idx: number) => {
    setHoverIndex(idx);

    const el = followerRef.current;
    const img = followerImgRef.current;

    if (img) {
      img.src = items[idx].hoverImg;
    }

    if (el) el.style.opacity = "1";
    if (img) img.style.opacity = "1";
  };

  const hideFollower = (idx: number) => {
    setHoverIndex((v) => (v === idx ? null : v));

    const el = followerRef.current;
    const img = followerImgRef.current;
    if (el) el.style.opacity = "0";
    if (img) img.style.opacity = "0";
  };

  const moveFollower = (e: React.MouseEvent) => {
    const offsetX = 22;
    const offsetY = 16;

    targetRef.current = {
      x: e.clientX + offsetX,
      y: e.clientY - offsetY,
    };
  };

  return (
    <section className="section" id="what-i-can-do">
      <div className="wrap two-col what-grid">
        <div className="col-text">
          <h2 className="h2 h2-tight">My Core skills</h2>
          <p className="p p-tight">
            I build AI-first product experiences and automation workflows that reduce effort
            and increase clarity.
          </p>

          <div className="dr-accordion" role="list">
            {items.map((it, idx) => {
              const isOpen = openIndex === idx;
              const num = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={it.title}
                  className={`dr-acc-item ${isOpen ? "is-open" : ""}`}
                  role="listitem"
                >
                  <button
                    className="dr-acc-btn"
                    type="button"
                    onClick={() => setOpenIndex((v) => (v === idx ? null : idx))}
                    aria-expanded={isOpen}
                    aria-controls={`dr-acc-panel-${idx}`}
                  >
                    <span className="dr-acc-left">
                      <span className="dr-acc-num">{num}</span>

                      <span className="dr-acc-head">
                        <span
                          className="dr-acc-titleRow"
                          onMouseEnter={() => showFollower(idx)}
                          onMouseLeave={() => hideFollower(idx)}
                          onMouseMove={moveFollower}
                        >
                          <span className="dr-acc-title">{it.title}</span>
                        </span>
                      </span>
                    </span>

                    <span className="dr-acc-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={`dr-acc-panel-${idx}`}
                    className="dr-acc-panel"
                    aria-hidden={!isOpen}
                  >
                    <ul className="dr-acc-list">
                      {it.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={followerRef} className="dr-hover-follower" aria-hidden="true">
            {hoverIndex !== null ? (
              <img
                ref={followerImgRef}
                className="dr-hover-follower-img"
                src={items[hoverIndex].hoverImg}
                alt=""
                draggable={false}
              />
            ) : null}
          </div>
        </div>

        <div className="col-visual what-visual">
          <CardSlot imgSrc="/what-p.png" />
        </div>
      </div>
    </section>
  );
}
