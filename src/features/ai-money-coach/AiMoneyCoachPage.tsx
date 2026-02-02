"use client";

import Image from "next/image";
import { useEffect } from "react";
import SystemDesignPanel from "./SystemDesignPanel";
import Demo from "./Demo";
import RoadmapMetrics from "./RoadmapMetrics";

export default function AiMoneyCoachPage() {
  useEffect(() => {
      document.body.classList.add("amcDarkNav");
  const root = document.querySelector(".amc");
    if (!root) return;

    // Tabs
    const stageTitle = root.querySelector<HTMLElement>("#amcStageTitle");
    const stageCaption = root.querySelector<HTMLElement>("#amcStageCaption");
    const navButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".amc-navBtn"));
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".amc-panel"));

    const meta: Record<string, { title: string; caption: string }> = {
      ps: { title: "Problem & Solution", caption: "Preview the output, then skim the why and how." },
      system: { title: "System Design", caption: "A simple pipeline from data to one decision to delivery." },
      prototype: { title: "Prototype & Demo", caption: "Screens, scenario, and walkthrough links." },
      roadmap: { title: "Roadmap & Metrics", caption: "What ships now, what improves next, and how to measure it." },
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

    // Rotator
    const rotator = root.querySelector<HTMLElement>("#amcRotator");
    const barsWrap = root.querySelector<HTMLElement>("#amcStoryBars");
    if (!rotator || !barsWrap) return;

    const slides = Array.from(rotator.querySelectorAll<HTMLElement>(".amc-rotSlide"));
    const fills = Array.from(barsWrap.querySelectorAll<HTMLElement>(".amc-storyFill"));

    const btnPrev = root.querySelector<HTMLButtonElement>("#amcBtnPrev");
    const btnNext = root.querySelector<HTMLButtonElement>("#amcBtnNext");
    const btnToggle = root.querySelector<HTMLButtonElement>("#amcBtnToggle");

    const prevZone = root.querySelector<HTMLElement>("#amcPrevZone");
    const nextZone = root.querySelector<HTMLElement>("#amcNextZone");

    const slideDot = root.querySelector<HTMLElement>("#amcSlideDot");
    const slideName = root.querySelector<HTMLElement>("#amcSlideName");

    let idx = 0;
    let paused = false;

    const DURATION_MS = 5200;
    let startTs = 0;
    let rafId = 0;
    let elapsed = 0;

    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    function renderBars(progress: number) {
      fills.forEach((fillEl, i) => {
        if (i < idx) fillEl.style.width = "100%";
        else if (i > idx) fillEl.style.width = "0%";
        else fillEl.style.width = `${progress * 100}%`;
      });
    }

    function updateLabel() {
      const active = slides[idx];
      if (!active) return;

      const name = active.getAttribute("data-name") || "Preview";
      const dot = active.getAttribute("data-dot") || "sms";

      if (slideName) slideName.textContent = name;
      if (slideDot) slideDot.className = `amc-slideDot ${dot}`;
    }

    function show(i: number) {
      idx = (i + slides.length) % slides.length;

      slides.forEach((s) => s.classList.toggle("is-active", s.getAttribute("data-slide") === String(idx)));

      elapsed = 0;
      startTs = performance.now();
      renderBars(0);
      updateLabel();
    }

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function startLoop() {
      stopLoop();
      if (paused) return;
      rafId = requestAnimationFrame(tick);
    }

    function setPaused(v: boolean) {
      paused = v;

      if (btnToggle) {
        btnToggle.textContent = paused ? "▶" : "❚❚";
        btnToggle.setAttribute("aria-label", paused ? "Play" : "Pause");
      }

      if (paused) stopLoop();
      else {
        startTs = performance.now() - elapsed;
        startLoop();
      }
    }

    function nextAuto() {
      show(idx + 1);
      startLoop();
    }

    function prev() {
      show(idx - 1);
    }

    function next() {
      show(idx + 1);
    }

    function tick() {
      if (paused) return;

      const now = performance.now();
      elapsed = now - startTs;

      const p = clamp01(elapsed / DURATION_MS);
      renderBars(p);

      if (p >= 1) {
        nextAuto();
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    const onPrev = (e: Event) => {
      e.stopPropagation();
      setPaused(true);
      prev();
    };
    const onNext = (e: Event) => {
      e.stopPropagation();
      setPaused(true);
      next();
    };
    const onToggle = (e: Event) => {
      e.stopPropagation();
      setPaused(!paused);
    };

    btnPrev?.addEventListener("click", onPrev);
    btnNext?.addEventListener("click", onNext);
    btnToggle?.addEventListener("click", onToggle);

    const onPrevZone = (e: Event) => {
      e.stopPropagation();
      setPaused(true);
      prev();
    };
    const onNextZone = (e: Event) => {
      e.stopPropagation();
      setPaused(true);
      next();
    };

    prevZone?.addEventListener("click", onPrevZone);
    nextZone?.addEventListener("click", onNextZone);

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);

    rotator.addEventListener("pointerenter", onEnter);
    rotator.addEventListener("pointerleave", onLeave);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPaused(true);
        prev();
      }
      if (e.key === "ArrowRight") {
        setPaused(true);
        next();
      }
      if (e.key === " ") {
        e.preventDefault();
        setPaused(!paused);
      }
    };
    rotator.addEventListener("keydown", onKeyDown);

    show(0);
    setPaused(false);
    startLoop();

    return () => {
      document.body.classList.remove("amcDarkNav");
      navButtons.forEach((btn) => btn.removeEventListener("click", onNavClick));
      jumpEls.forEach((el) => el.removeEventListener("click", onJumpClick));

      btnPrev?.removeEventListener("click", onPrev);
      btnNext?.removeEventListener("click", onNext);
      btnToggle?.removeEventListener("click", onToggle);

      prevZone?.removeEventListener("click", onPrevZone);
      nextZone?.removeEventListener("click", onNextZone);

      rotator.removeEventListener("pointerenter", onEnter);
      rotator.removeEventListener("pointerleave", onLeave);
      rotator.removeEventListener("keydown", onKeyDown);

      stopLoop();
    };
  }, []);

  // IMPORTANT:
  // Paste your FULL JSX content here (including all 4 slides, problem/solution, system, prototype, roadmap)
  // If your current file still has TODO sections, it will look broken.

 return (
    <main className="amc amc-themeDark">
      {/* HERO */}
      <div className="amc-hero">
        <div className="amc-wrap">
          <div className="amc-heroInner">
            <div className="amc-kicker">AI Systems Built</div>
            <h1 className="amc-h1">AI Money Coach</h1>
            <p className="amc-sub">
              Turns bank transactions into one clear, personalized next step. Delivered in the channel the user actually
              sees.
            </p>
            <div className="amc-pills">
              <div className="amc-pill">
                <span className="amc-dot" /> Scope: spending + saving + subscriptions
              </div>
              <div className="amc-pill">
                <span className="amc-dot" /> Stack: Make.com + OpenAI + Google Sheets
              </div>
              <div className="amc-pill">
                <span className="amc-dot" /> Status: prototype
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="amc-wrap">
        <div className="amc-shell">
          {/* LEFT NAV */}
          <aside className="amc-nav amc-card" aria-label="AI Money Coach navigation">
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

            <div className="amc-navMeta">Skim friendly: outputs first, then how it works, then what ships next.</div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="amc-stage amc-card">
            <div className="amc-stageTop">
              <h2 className="amc-title" id="amcStageTitle">
                Problem &amp; Solution
              </h2>
              <p className="amc-caption" id="amcStageCaption">
                Output preview first, then problem and solution side by side.
              </p>
            </div>

            <div className="amc-panels">
              {/* 1) PROBLEM & SOLUTION */}
              <div className="amc-panel is-active" data-panel="ps">
                {/* Preview block */}
                <div className="amc-block">
                  <div className="amc-row">
                    <div>
                      <div className="amc-kLabel">Output preview</div>
                      <div className="amc-h2">Live nudge preview</div>
                      <div className="amc-sub2">
                        What you are seeing: the same nudge rendered across common delivery channels.
                      </div>
                    </div>
                    <div className="amc-metaPill">
                      <span className="amc-dot2" />
                      Auto rotates
                    </div>
                  </div>

                  <div className="amc-previewFrame">
                    <div className="amc-rotator" id="amcRotator" tabIndex={0} aria-label="Auto rotating nudge preview">
                      {/* Click zones (only over the stage area) */}
                      <div className="amc-zone prev" id="amcPrevZone" aria-label="Previous" />
                      <div className="amc-zone next" id="amcNextZone" aria-label="Next" />

                      {/* Top bar */}
                      <div className="amc-rotTop">
                        <div className="amc-rotTopLeft">
                          <div className="amc-slideLabel" aria-live="polite" id="amcChannelPill">
                            <span className="amc-slideDot sms" id="amcSlideDot" />
                            <span id="amcSlideName">SMS</span>
                          </div>
                        </div>

                        <div className="amc-rotTopRight">
                          <div className="amc-ctrlBtns" role="group" aria-label="Preview controls">
                            <button className="amc-ctrlBtn" type="button" id="amcBtnPrev" aria-label="Previous">‹</button>
                            <button className="amc-ctrlBtn amc-ctrlBtnToggle" type="button" id="amcBtnToggle" aria-label="Pause">❚❚</button>
                            <button className="amc-ctrlBtn" type="button" id="amcBtnNext" aria-label="Next">›</button>
                          </div>
                        </div>
                      </div>

                      {/* Story timeline */}
                      <div className="amc-storyBars" id="amcStoryBars" aria-hidden="true">
                        <div className="amc-storyBar"><div className="amc-storyFill" /></div>
                        <div className="amc-storyBar"><div className="amc-storyFill" /></div>
                        <div className="amc-storyBar"><div className="amc-storyFill" /></div>
                        <div className="amc-storyBar"><div className="amc-storyFill" /></div>
                      </div>

                      {/* Stage */}
                      <div className="amc-rotViewport">
                        <div className="amc-rotStage">
                          {/* SLIDE 1: SMS */}
                          <div className="amc-rotSlide is-active" data-slide="0" data-name="SMS" data-dot="sms">
                            <div className="amc-screen">
                              <Image
                                className="amc-screenImg amc-screenImgBig"
                                src="/sms.png"
                                alt="SMS nudge preview"
                                width={1053}
                                height={1629}
                                priority
                              />
                            </div>
                          </div>

                          {/* SLIDE 2: WhatsApp */}
                          <div className="amc-rotSlide" data-slide="1" data-name="WhatsApp" data-dot="wa">
                            <div className="amc-screen">
                              <Image
                                className="amc-screenImg amc-screenImgBig"
                                src="/whatsapp.png"
                                alt="SMS nudge preview"
                                width={1053}
                                height={1629}
                                priority
                              />
                            </div>
                          </div>

                          {/* SLIDE 3: Email */}
                          <div className="amc-rotSlide" data-slide="2" data-name="Email" data-dot="email">
                            <div className="amc-screen">
                              <Image
                                className="amc-screenImg amc-screenImgBig"
                                src="/email.png"
                                alt="SMS nudge preview"
                                width={1053}
                                height={1629}
                                priority
                              />
                            </div>
                          </div>

                          {/* SLIDE 4: Bank app */}
                          <div className="amc-rotSlide" data-slide="3" data-name="Bank app" data-dot="bank">
                            <div className="amc-screen">
                              <Image
                                className="amc-screenImg amc-screenImgBig"
                                src="/bank.png"
                                alt="SMS nudge preview"
                                width={1200}
                                height={2400}
                                priority
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer chips (uses the empty side space without ruining layout) */}
                      <div className="amc-rotFooter">
                        <div className="amc-footChip">
                          <div className="amc-footK">What you are seeing</div>
                          <div className="amc-footP">The same nudge rendered across common delivery channels.</div>
                        </div>

                        <div className="amc-footChip amc-footChipRight">
                          <div className="amc-footK">Auto rotates</div>
                          <div className="amc-footP">Hover pauses. Tap arrows to step through.</div>
                        </div>
                      </div>
                    </div>
                  </div>




                </div>

                {/* Problem + solution block */}
                <div className="amc-block">
                  <div className="amc-row">
                    <div>
                      <div className="amc-kLabel">Problem and solution</div>
                      <div className="amc-h2">From ledger to action</div>
                      <div className="amc-sub2">
                        Most finance apps show numbers. This system turns patterns into a single next step with a clear
                        action.
                      </div>
                    </div>
                    <div className="amc-metaPill">
                      <span className="amc-dot2" />
                      Designed for fast skim
                    </div>
                  </div>

                  <div className="amc-psGrid">
                    {/* PROBLEM */}
                    <div className="amc-mini">
                      <h4>Problem</h4>
                      <div className="amc-heavyH">
                        <span className="amc-iconBadge">📉</span>
                        Alerts exist, outcomes do not
                      </div>
                      <div className="amc-psText">
                        Users get noisy notifications and late insights. The app becomes a ledger, not a coach.
                      </div>

                      <div className="amc-chipRow">
                        <span className="amc-chip p">Low signal</span>
                        <span className="amc-chip p">Late timing</span>
                        <span className="amc-chip p">No next step</span>
                      </div>

                      <ul className="amc-miniList">
                        <li className="amc-miniLi">
                          <div className="amc-mark is-problem" aria-hidden="true">✕</div>

                          <div>
                            <div className="t">Notification fatigue</div>
                            <div className="d">Frequent pings that do not match intent get ignored.</div>
                          </div>
                        </li>
                        <li className="amc-miniLi">
                          <div className="amc-mark is-problem" aria-hidden="true">✕</div>

                          <div>
                            <div className="t">Patterns are buried</div>
                            <div className="d">Users cannot see what is changing until it is costly.</div>
                          </div>
                        </li>
                        <li className="amc-miniLi">
                          <div className="amc-mark is-problem" aria-hidden="true">✕</div>

                          <div>
                            <div className="t">No single decision</div>
                            <div className="d">Dashboards show many options, so nothing happens.</div>
                          </div>
                        </li>
                      </ul>

                      <div className="amc-psOutcome">
                        <strong>Result:</strong> overspend repeats, savings is inconsistent, subscriptions creep.
                      </div>
                    </div>

                    {/* SOLUTION */}
                    <div className="amc-mini">
                      <h4>Solution</h4>
                      <div className="amc-heavyH">
                        <span className="amc-iconBadge">✅</span>
                        One best action, delivered well
                      </div>
                      <div className="amc-psText">
                        Categorize transactions, detect drift, choose the highest impact nudge, then format it for the
                        right channel.
                      </div>

                      <div className="amc-chipRow">
                        <span className="amc-chip s">Personalized</span>
                        <span className="amc-chip s">Single action</span>
                        <span className="amc-chip s">Channel aware</span>
                      </div>

                      <ul className="amc-miniList">
                        <li className="amc-miniLi solution">
                          <div className="amc-mark is-solution" aria-hidden="true">✓</div>

                          <div>
                            <div className="t">Categorize and baseline</div>
                            <div className="d">Maps merchants and learns weekly patterns.</div>
                          </div>
                        </li>
                        <li className="amc-miniLi solution">
                          <div className="amc-mark is-solution" aria-hidden="true">✓</div>

                          <div>
                            <div className="t">Detect drift early</div>
                            <div className="d">Spots overspend spikes, buffer risk, and repeat waste.</div>
                          </div>
                        </li>
                        <li className="amc-miniLi solution">
                          <div className="amc-mark is-solution" aria-hidden="true">✓</div>

                          <div>
                            <div className="t">Choose one next step</div>
                            <div className="d">Turns insight into a single button or reply.</div>
                          </div>
                        </li>
                      </ul>

                      <div className="amc-psOutcome">
                        <strong>Result:</strong> higher action rate and measurable savings moved.
                      </div>
                    </div>
                  </div>

                  <div className="amc-actions">
                    <button className="amc-btn amc-btnPrimary" type="button" data-jump="prototype">
                      See prototype
                    </button>
                    <button className="amc-btn" type="button" data-jump="system">
                      See system design
                    </button>
                  </div>
                </div>
              </div>

              {/* 2) SYSTEM DESIGN */}
              <div className="amc-panel" data-panel="system">
              <SystemDesignPanel />
            </div>

              {/* 3) PROTOTYPE & DEMO */}
              <div className="amc-panel" data-panel="prototype">
                <Demo />
              </div>


            {/* 4) ROADMAP & METRICS */}
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
