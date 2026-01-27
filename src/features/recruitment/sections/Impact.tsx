import React from "react";
import styles from "./styles/Impact.module.css";

type Props = { id: string };

const ICONS = {
  speed: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 7v5l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12h-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  consistency: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 6h10M7 12h10M7 18h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 6h.01M5 12h.01M5 18h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 7h8M8 11h8M8 15h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 3.5h11A2.5 2.5 0 0 1 20 6v14a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 20V6a2.5 2.5 0 0 1 2.5-2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function Impact({ id }: Props) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.top}>
        <h2 className={styles.h2}>Impact</h2>
        <p className={styles.lead}>
          What changes for a recruitment leader once this system runs.
        </p>
      </div>

      <div className={styles.grid3}>
        <div className={styles.card}>
          <div className={styles.icon} aria-hidden="true">
            {ICONS.speed}
          </div>
          <div className={styles.cardTitle}>Faster hiring cycles</div>
          <div className={styles.cardValue}>Role brief to shortlist in minutes, not days.</div>
          <div className={styles.cardNote}>
            No waiting on manual sourcing and first pass screening.
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon} aria-hidden="true">
            {ICONS.consistency}
          </div>
          <div className={styles.cardTitle}>Standardised evaluation</div>
          <div className={styles.cardValue}>Same criteria and scoring every time.</div>
          <div className={styles.cardNote}>
            Reduces recruiter to recruiter variance in shortlists.
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon} aria-hidden="true">
            {ICONS.admin}
          </div>
          <div className={styles.cardTitle}>Less manual admin</div>
          <div className={styles.cardValue}>Auto logged notes, decisions, and approvals.</div>
          <div className={styles.cardNote}>
            Cleaner records without chasing updates across tools.
          </div>
        </div>
      </div>

      <div className={styles.compareWrap}>
        <div className={styles.compare}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Before</div>
            <ul className={styles.list}>
              <li>Role intake via email and chat threads</li>
              <li>CVs reviewed manually with inconsistent notes</li>
              <li>Information scattered across ATS, docs, and inbox</li>
              <li>Shortlists depend on who screened that week</li>
            </ul>
          </div>

          <div className={styles.colDivider} aria-hidden="true" />

          <div className={styles.col}>
            <div className={styles.colTitle}>After</div>
            <ul className={styles.list}>
              <li>Structured role intake with clear inputs</li>
              <li>AI assisted sourcing and screening logic</li>
              <li>Centralised logging with approvals and traceability</li>
              <li>Repeatable shortlist quality across recruiters</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricsTop}>
          <div className={styles.metricsTitle}>Indicative impact</div>
          <div className={styles.metricsHint}>
            These are directional targets used for the build, not client reported results.
          </div>
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Shortlist turnaround</div>
            <div className={styles.metricValue}>Same day</div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Manual screening time</div>
            <div className={styles.metricValue}>Reduced 60 to 70%</div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Evaluation variance</div>
            <div className={styles.metricValue}>Near zero</div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Admin follow ups</div>
            <div className={styles.metricValue}>Largely eliminated</div>
          </div>
        </div>
      </div>

      <div className={styles.forWho}>
        Designed for in house teams and solo recruiters who want control without scaling headcount.
      </div>
    </section>
  );
}
