import React from "react";
import styles from "./styles/recruitmentOS.module.css";

export default function Hero() {
  return (
    <section className={styles.rosHeroWrap}>
      <div className={styles.rosHeroCard}>
        <div className={styles.rosHeroEyebrow}>AI SYSTEMS BUILT</div>

        <h1 className={styles.rosHeroTitle}>AI End-to-End Recruiter</h1>

        <p className={styles.rosHeroSub}>
          Automates your recruitment workflow from job intake to outreach and pipeline tracking.
          Built to scale without scaling headcount.
        </p>

        <div className={styles.rosHeroChips}>
          <span className={styles.rosHeroChip}>
            <span className={styles.rosHeroDot} />
            Scope: intake + sourcing + screening + outreach
          </span>

          <span className={styles.rosHeroChip}>
            <span className={styles.rosHeroDot} />
            Stack: Make.com + OpenAI + Sheets or CRM
          </span>

          <span className={styles.rosHeroChip}>
            <span className={styles.rosHeroDot} />
            Status: prototype
          </span>
        </div>
      </div>
    </section>
  );
}
