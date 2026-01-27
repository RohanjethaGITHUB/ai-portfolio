// src/features/recruitment/sections/Impact.tsx
import React from "react";
import styles from "./styles/recruitmentOS.module.css";

type Props = { id: string };

export function Impact({ id }: Props) {
  return (
    <section id={id} className={styles.rosSection}>
      <div className={styles.rosSectionTop}>
        <h2 className={styles.rosH2}>Impact</h2>
        <p className={styles.rosLead}>
          What a recruitment leader gets: speed, consistency, and less manual admin.
        </p>
      </div>

      <div className={styles.rosGrid3}>
        <div className={styles.rosStat}>
          <div className={styles.rosStatNum}>Faster cycles</div>
          <div className={styles.rosStatText}>Role brief to shortlist in minutes, not days.</div>
        </div>
        <div className={styles.rosStat}>
          <div className={styles.rosStatNum}>Cleaner data</div>
          <div className={styles.rosStatText}>Deduped candidates and standardised notes.</div>
        </div>
        <div className={styles.rosStat}>
          <div className={styles.rosStatNum}>Repeatable quality</div>
          <div className={styles.rosStatText}>Same evaluation logic across every recruiter.</div>
        </div>
      </div>
    </section>
  );
}
