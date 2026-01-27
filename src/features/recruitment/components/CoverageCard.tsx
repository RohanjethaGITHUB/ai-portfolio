// src/features/recruitment/components/CoverageCard.tsx
import React from "react";
import styles from "../sections/styles/recruitmentOS.module.css";

type CoverageCardProps = {
  title: string;
  bullets: string[];
  outputs: string[];
};

export function CoverageCard({ title, bullets, outputs }: CoverageCardProps) {
  return (
    <article className={styles.rosCoverageCard} tabIndex={0} aria-label={title}>
      <div className={styles.rosCoverageAccent} aria-hidden="true" />

      <div className={styles.rosCoverageBody}>
        <h3 className={styles.rosCoverageTitle}>{title}</h3>

        <ul className={styles.rosCoverageBullets}>
          {bullets.slice(0, 2).map((b) => (
            <li key={b} className={styles.rosCoverageBullet}>
              {b}
            </li>
          ))}
        </ul>

        <div className={styles.rosCoverageOutputs}>
          <div className={styles.rosCoverageOutputsLabel}>Outputs</div>
          <div className={styles.rosCoverageChips}>
            {outputs.map((o) => (
              <span key={o} className={styles.rosCoverageChip}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
