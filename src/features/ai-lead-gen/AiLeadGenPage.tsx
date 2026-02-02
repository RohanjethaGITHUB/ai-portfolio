"use client";

import { useEffect } from "react";
import ProblemSolution from "./ProblemSolution";
import SystemDesignPanel from "./SystemDesignPanel";
import Demo from "./Demo";
import RoadmapMetrics from "./RoadmapMetrics";

export default function AiLeadGenPage() {
  useEffect(() => {
    document.body.classList.add("amcDarkNav");

    const root = document.querySelector(".amc");
    if (!root) return;

    const stageTitle = root.querySelector<HTMLElement>("#amcStageTitle");
    const stageCaption = root.querySelector<HTMLElement>("#amcStageCaption");
    const navButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".amc-navBtn"));
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".amc-panel"));

    const meta: Record<string, { title: string; caption: string }> = {
      ps: { title: "Problem & Solution", caption: "Why personalization fails at scale, and how WHO + WHAT fixes it." },
      system: { title: "System Design", caption: "A clear pipeline from sector input to multichannel execution." },
      prototype: { title: "Prototype & Demo", caption: "One lead run: source, qualify, match, message, send, track." },
      roadmap: { title: "Roadmap & Metrics", caption: "What ships first, what expands next, and how to measure quality." },
    };

    function setActive(tabKey: string) {
      navButtons.forEach((btn) => btn.classList.toggle("is-active", btn.getAttribute("data-tab") === tabKey));

      if (meta[tabKey] && stageTitle && stageCaption) {
        stageTitle.textContent = meta[tabKey].title;
        stageCaption.textContent = meta[tabKey].caption;
      }

      panels.forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-panel") === tabKey));
    }

    const onNavClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      setActive(btn.getAttribute("data-tab") || "ps");
    };
    navButtons.forEach((btn) => btn.addEventListener("click", onNavClick));

    const jumpEls = Array.from(root.querySelectorAll<HTMLElement>("[data-jump]"));
    const onJumpClick = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setActive(el.getAttribute("data-jump") || "ps");
    };
    jumpEls.forEach((el) => el.addEventListener("click", onJumpClick));

    setActive("ps");

    return () => {
      navButtons.forEach((btn) => btn.removeEventListener("click", onNavClick));
      jumpEls.forEach((el) => el.removeEventListener("click", onJumpClick));
      document.body.classList.remove("amcDarkNav");
    };
  }, []);

  return (
    <main className="amc amc-themeDark">
      {/* HERO */}
      <div className="amc-hero">
        <div className="amc-wrap">
          <div className="amc-heroInner">
            <div className="amc-kicker">AI Systems Built</div>
            <h1 className="amc-h1">AI Personalized Lead Gen</h1>
            <p className="amc-sub">
              One input (target sector). The system sources and enriches leads, qualifies the WHO persona, matches the
              WHAT pitch, generates multichannel outreach, runs safely, and syncs everything to your CRM.
            </p>

            <div className="amc-pills">
              <div className="amc-pill">
                <span className="amc-dot" /> WHO persona builder
              </div>
              <div className="amc-pill">
                <span className="amc-dot" /> WHAT use case matcher
              </div>
              <div className="amc-pill">
                <span className="amc-dot" /> Email + LinkedIn orchestration
              </div>
              <div className="amc-pill">
                <span className="amc-dot" /> Deliverability + CRM sync
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="amc-wrap">
        <div className="amc-shell">
          {/* LEFT NAV */}
          <aside className="amc-nav amc-card" aria-label="AI Lead Gen navigation">
            <div className="amc-navTitle">Sections</div>

            <div className="amc-navBtns">
              <button className="amc-navBtn is-active" type="button" data-tab="ps">
                Problem &amp; Solution <span className="amc-tag">1</span>
              </button>

              <button className="amc-navBtn" type="button" data-tab="system">
                System Design <span className="amc-tag">2</span>
              </button>

              <button className="amc-navBtn" type="button" data-tab="prototype">
                Prototype &amp; Demo <span className="amc-tag">3</span>
              </button>

              <button className="amc-navBtn" type="button" data-tab="roadmap">
                Roadmap &amp; Metrics <span className="amc-tag">4</span>
              </button>
            </div>

            <div className="amc-navMeta">
              Skim friendly: problem first, then system design, then a demo run, then roadmap and metrics.
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="amc-stage amc-card">
            <div className="amc-stageTop">
              <h2 className="amc-title" id="amcStageTitle">
                Problem &amp; Solution
              </h2>
              <p className="amc-caption" id="amcStageCaption">
                Why personalization fails at scale, and how WHO + WHAT fixes it.
              </p>
            </div>

            <div className="amc-panels">
              <div className="amc-panel is-active" data-panel="ps">
                <ProblemSolution />
              </div>

              <div className="amc-panel" data-panel="system">
                <SystemDesignPanel />
              </div>

              <div className="amc-panel" data-panel="prototype">
                <Demo />
              </div>

              <div className="amc-panel" data-panel="roadmap">
                <RoadmapMetrics />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
