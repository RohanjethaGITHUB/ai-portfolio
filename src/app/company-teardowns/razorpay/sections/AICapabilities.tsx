import styles from "../razorpay.module.css";

export default function AICapabilities() {
  return (
    <section id="ai-capabilities" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>AI Capabilities</h2>
        <p className={styles.sectionDesc}>Now, Next, Later capability portfolio.</p>
      </div>

      <div className={styles.columns3}>
        <div className={styles.pillar}>
          <div className={styles.pillarTop}>
            <h3 className={styles.pillarTitle}>Now</h3>
            <p className={styles.pillarHint}>0 to 90 days</p>
          </div>
          <ul className={styles.bullets}>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
          </ul>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarTop}>
            <h3 className={styles.pillarTitle}>Next</h3>
            <p className={styles.pillarHint}>3 to 9 months</p>
          </div>
          <ul className={styles.bullets}>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
          </ul>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarTop}>
            <h3 className={styles.pillarTitle}>Later</h3>
            <p className={styles.pillarHint}>9 to 18 months</p>
          </div>
          <ul className={styles.bullets}>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
            <li>Placeholder capability</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
