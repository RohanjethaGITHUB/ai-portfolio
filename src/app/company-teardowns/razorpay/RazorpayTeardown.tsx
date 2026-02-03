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
  n: 1 | 2 | 3 | 4;
};

export default function RazorpayTeardown() {
  const tabs: Tab[] = useMemo(
    () => [
      { id: "context", label: "Context", n: 1 },
      { id: "ai-capabilities", label: "AI Capabilities", n: 2 },
      { id: "execution-governance", label: "Governance", n: 3 },
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
          <div className={styles.ctBodyGrid}>
            {/* LEFT RAIL (like AI Money Coach) */}
            <aside className={styles.ctRail}>
              <div className={styles.ctRailCard}>
                <div className={styles.ctRailTitle}>SECTIONS</div>

                <div className={styles.ctRailList}>
                  {tabs.map((t) => {
                    const isActive = activeId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => switchTab(t.id)}
                        className={`${styles.ctRailBtn} ${isActive ? styles.ctRailBtnActive : ""}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className={styles.ctRailBtnLabel}>{t.label}</span>
                        <span className={styles.ctRailBtnNum}>{t.n}</span>
                      </button>
                    );
                  })}
                </div>

               
              </div>
            </aside>

            {/* RIGHT PANEL (connected box) */}
            <div
              className={styles.ctSectionTabsWrap}
              style={{ ["--ctPanelTopTint" as any]: panelTint }}
            >
              {/* Removed top sticky tabs bar */}

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
        </div>
      </section>
    </main>
  );
}
