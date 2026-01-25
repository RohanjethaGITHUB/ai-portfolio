import styles from "../razorpay.module.css";

export default function ExecutionGovernance() {
  return (
    <section id="execution-governance" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Execution & AI Governance</h2>
        <p className={styles.sectionDesc}>Phasing, measurement, reviews, and guardrails.</p>
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Execution</h3>
          <ul className={styles.bullets}>
            <li>Pilot phases</li>
            <li>Impact metrics</li>
            <li>Portfolio reviews</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Governance</h3>
          <ul className={styles.bullets}>
            <li>Data access and retention</li>
            <li>Compliance and auditability</li>
            <li>Bias checks and monitoring</li>
            <li>Model drift and rollback</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
