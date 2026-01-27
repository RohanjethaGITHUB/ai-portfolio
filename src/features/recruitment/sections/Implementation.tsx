// src/features/recruitment/sections/Implementation.tsx
import React from "react";
import styles from "./styles/recruitmentOS.module.css";

type Props = { id: string };

export function Implementation({ id }: Props) {
  return (
    <section id={id} className={styles.rosSection}>
      <div className={styles.rosSectionTop}>
        <h2 className={styles.rosH2}>Implementation</h2>
        <p className={styles.rosLead}>
          Designed to plug into your current tools first, then evolve into deeper automation.
        </p>
      </div>

      <div className={styles.rosGrid2}>
        <div className={styles.rosMini}>
          <div className={styles.rosMiniKicker}>Tooling</div>
          <div className={styles.rosChipRow}>
            <span className={styles.rosChip}>Make.com</span>
            <span className={styles.rosChip}>OpenAI</span>
            <span className={styles.rosChip}>Google Sheets</span>
            <span className={styles.rosChip}>Airtable</span>
            <span className={styles.rosChip}>Email</span>
          </div>
        </div>

        <div className={styles.rosMini}>
          <div className={styles.rosMiniKicker}>Rollout plan</div>
          <ul className={styles.rosList}>
            <li>Start with one workflow: intake to shortlist</li>
            <li>Add control gates and logging</li>
            <li>Expand to outreach, follow ups, and reporting</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
