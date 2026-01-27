// src/features/recruitment/pages/RecruitmentOSPage.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "../sections/styles/recruitmentOS.module.css";

import { SectionShell } from "../components/SectionShell";
import RecruitmentSectionsNav from "../sections/RecruitmentSectionsNav";

import { Coverage } from "../sections/Coverage";
import { Control } from "../sections/Control";
import { HowItRuns } from "../sections/HowItRuns";
import { Impact } from "../sections/Impact";

const SECTIONS = [
  { id: "recruitment-coverage", label: "System Overview", tag: "1" },
  { id: "control", label: "Control", tag: "2" },
  { id: "how-it-runs", label: "How it runs", tag: "3" },
  { id: "impact", label: "Impact", tag: "4" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function RecruitmentOSPage() {
  const firstId = useMemo(() => SECTIONS[0].id, []);
  const [activeId, setActiveId] = useState<SectionId>(firstId);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [pendingId, setPendingId] = useState<SectionId>(firstId);

  function requestSwitch(id: SectionId) {
    if (id === activeId) return;
    setPendingId(id);
    setPhase("out");
  }

  useEffect(() => {
    if (phase !== "out") return;

    const t = window.setTimeout(() => {
      setActiveId(pendingId);
      setPhase("in");
    }, 180);

    return () => window.clearTimeout(t);
  }, [phase, pendingId]);

  return (
    <main className={styles.ros}>
      <header className={styles.rosHero}>
        <div className={styles.rosHeroWash} aria-hidden="true" />
        <div className={styles.rosWrap}>
          <div className={styles.rosHeroInner}>
            <div className={styles.rosKicker}>AI SYSTEMS BUILT</div>
            <h1 className={styles.rosH1}>AI End to End Recruiter</h1>
            <p className={styles.rosSub}>
              Automates the core recruitment workflow from role intake to shortlist delivery, with
              approvals, logging, and clear control points.
            </p>

            <div className={styles.rosPills}>
              <span className={styles.rosPill}>
                <span className={styles.rosDot} aria-hidden="true" />
                Scope: intake + sourcing + screening + shortlist
              </span>
              <span className={styles.rosPill}>
                <span className={styles.rosDot} aria-hidden="true" />
                Stack: Make.com + OpenAI + Sheets/Airtable
              </span>
              <span className={styles.rosPill}>
                <span className={styles.rosDot} aria-hidden="true" />
                Status: build in progress
              </span>
            </div>
          </div>
        </div>
      </header>

      <SectionShell
        left={
          <RecruitmentSectionsNav
            sections={SECTIONS as any}
            activeId={activeId}
            onSelect={(id) => requestSwitch(id as SectionId)}
          />
        }
        right={
          <div className={styles.rosStageInner}>
            <div className={`${styles.rosFade} ${phase === "out" ? styles.rosFadeOut : styles.rosFadeIn}`}>
              {activeId === "recruitment-coverage" ? <Coverage id="recruitment-coverage" /> : null}
              {activeId === "control" ? <Control id="control" /> : null}
              {activeId === "how-it-runs" ? <HowItRuns id="how-it-runs" /> : null}
              {activeId === "impact" ? <Impact id="impact" /> : null}
            </div>
          </div>
        }
      />
    </main>
  );
}
