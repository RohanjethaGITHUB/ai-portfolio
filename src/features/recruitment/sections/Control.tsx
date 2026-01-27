// src/features/recruitment/sections/Control.tsx
import React from "react";
import styles from "./styles/recruitmentOS.module.css";

type Props = { id: string };

export function Control({ id }: Props) {
  return (
    <section id={id} className={styles.rosSection}>
      <div className={styles.rosSectionTop}>
        <h2 className={styles.rosH2}>Control</h2>
        <p className={styles.rosLead}>
          The automation runs fast, but the recruiter stays in charge with approval gates and audit
          logs.
        </p>
      </div>

      <div className={styles.rosGrid2}>
        <div className={styles.rosMini}>
          <div className={styles.rosMiniKicker}>Approval gates</div>
          <ul className={styles.rosList}>
            <li>Approve role brief before sourcing starts</li>
            <li>Approve top candidates before shortlist is produced</li>
            <li>Optional hold before any outbound is sent</li>
          </ul>
        </div>

        <div className={styles.rosMini}>
          <div className={styles.rosMiniKicker}>Traceability</div>
          <ul className={styles.rosList}>
            <li>Every run creates a log record and timestamps</li>
            <li>Inputs, model outputs, and decisions stored</li>
            <li>Easy rollback and rerun with new constraints</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
