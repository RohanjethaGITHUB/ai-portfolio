"use client";

import { useMemo, useState } from "react";
import styles from "./bambooHR.module.css";

import Context from "./sections/Context/Context";
import AICapabilities from "./sections/AICapabilities/AICapabilities";
import Governance from "./sections/Governance/Governance";

type TabId = "context" | "ai-capabilities" | "governance";

type Tab = {
  id: TabId;
  label: string;
  number: number;
};

export default function BambooHRTeardownPage() {
  const tabs: Tab[] = useMemo(
    () => [
      { id: "context", label: "Context", number: 1 },
      { id: "ai-capabilities", label: "AI Capabilities", number: 2 },
      { id: "governance", label: "Governance", number: 3 },
    ],
    []
  );

  const [activeId, setActiveId] = useState<TabId>("context");
  const [isFading, setIsFading] = useState(false);

  const setActive = (id: TabId) => {
    if (id === activeId) return;

    setIsFading(true);
    window.setTimeout(() => {
      setActiveId(id);
      setIsFading(false);
    }, 160);
  };

  return (
    <main className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Company Teardown</p>

          <h1 className={styles.heroTitle}>BambooHR</h1>

          <p className={styles.heroSub}>
            A portfolio view of HR constraints, realistic AI, and safe governance patterns.
          </p>

          <div className={styles.heroChips}>
            <span className={styles.chip}>
              <span className={styles.chipDot} />
              Focus: HR system of record
            </span>

            <span className={styles.chip}>
              <span className={styles.chipDot} />
              Lens: workflow plus trust
            </span>

            <span className={styles.chip}>
              <span className={styles.chipDot} />
              Status: draft teardown
            </span>
          </div>
        </div>
      </header>

      <section className={styles.shell}>
        <aside className={styles.side}>
          <div className={styles.sideCard}>
            <p className={styles.sideTitle}>Sections</p>

            <nav className={styles.sideNav} aria-label="BambooHR teardown sections">
              {tabs.map((t) => {
                const isActive = t.id === activeId;

                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.sideBtn} ${isActive ? styles.sideBtnActive : ""}`}
                    onClick={() => setActive(t.id)}
                  >
                    <span className={styles.sideLabel}>{t.label}</span>
                    <span className={styles.sideNum}>{t.number}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className={styles.panel}>
          <div className={`${styles.panelBody} ${isFading ? styles.fadeOut : styles.fadeIn}`}>
            {activeId === "context" && <Context />}
            {activeId === "ai-capabilities" && <AICapabilities />}
            {activeId === "governance" && <Governance />}
          </div>
        </div>
      </section>
    </main>
  );
}
