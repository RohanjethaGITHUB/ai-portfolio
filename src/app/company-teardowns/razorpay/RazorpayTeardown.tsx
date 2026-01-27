"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./razorpay.module.css";

import Context from "./sections/Context";
import AICapabilities from "./sections/AICapabilities";
import PlatformArchitecture from "./sections/PlatformArchitecture";
import ExecutionGovernance from "./sections/ExecutionGovernance";

type Tab = {
  id: "context" | "ai-capabilities" | "platform-architecture" | "execution-governance";
  label: string;
};

export default function RazorpayTeardown() {
  const tabs: Tab[] = useMemo(
    () => [
      { id: "context", label: "Context" },
      { id: "ai-capabilities", label: "AI Capabilities" },
      { id: "platform-architecture", label: "Platform Architecture" },
      { id: "execution-governance", label: "Execution & AI Governance" },
    ],
    []
  );

  const [activeId, setActiveId] = useState<Tab["id"]>("context");
  const [isFading, setIsFading] = useState(false);

  const panelTint = useMemo(() => {
    // Keep these subtle so the panel wash and arrow notch feel premium
    switch (activeId) {
      case "context":
        return "rgba(120, 72, 40, 0.18)";
      case "ai-capabilities":
        return "rgba(70, 85, 120, 0.16)";
      case "platform-architecture":
        return "rgba(55, 95, 80, 0.14)";
      case "execution-governance":
        return "rgba(105, 75, 120, 0.14)";
      default:
        return "rgba(120, 72, 40, 0.18)";
    }
  }, [activeId]);

  const switchTab = (nextId: Tab["id"]) => {
    if (nextId === activeId) return;

    setIsFading(true);

    window.setTimeout(() => {
      setActiveId(nextId);
      window.setTimeout(() => setIsFading(false), 20);
    }, 160);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      const idx = tabs.findIndex((t) => t.id === activeId);
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + tabs.length) % tabs.length;
      switchTab(tabs[next].id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, tabs]);

  return (
    <main className={styles.ctPage}>
      <header className={styles.ctHero}>
        <div className={styles.ctHeroInner}>
          <p className={styles.ctKicker}>COMPANY TEARDOWN</p>
          <h1 className={styles.ctTitle}>Razorpay</h1>
          <p className={styles.ctSubTitle}>
            A portfolio view of AI capabilities, shared platform architecture, and governance.
          </p>

          <div className={styles.ctMetaRow}>
            <span className={styles.ctMetaPill}>
              <span className={styles.ctDot} />
              Focus: payments + risk + ops
            </span>
            <span className={styles.ctMetaPill}>
              <span className={styles.ctDot} />
              Lens: portfolio + platform
            </span>
            <span className={styles.ctMetaPill}>
              <span className={styles.ctDot} />
              Status: draft teardown
            </span>
          </div>
        </div>
      </header>

      <section className={styles.ctShell}>
        <div className={styles.ctShellInner}>
          {/* One connected box, but ONLY the tabs bar is sticky */}
          <div
            className={styles.ctSectionTabsWrap}
            style={{ ["--ctPanelTopTint" as any]: panelTint }}
          >
            <div className={styles.ctStickyTabsBar}>
              <nav className={styles.ctTopTabs} aria-label="Sections">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => switchTab(t.id)}
                    className={`${styles.ctTab} ${activeId === t.id ? styles.ctTabActive : ""}`}
                    aria-current={activeId === t.id ? "page" : undefined}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>

            <div
              className={`${styles.ctPanel} ${isFading ? styles.ctPanelFading : ""}`}
              aria-live="polite"
            >
              {activeId === "context" && <Context />}
              {activeId === "ai-capabilities" && <AICapabilities />}
              {activeId === "platform-architecture" && <PlatformArchitecture />}
              {activeId === "execution-governance" && <ExecutionGovernance />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
