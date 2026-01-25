import styles from "../razorpay.module.css";

export default function Context() {
  return (
    <section id="context" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Context</h2>
        <p className={styles.sectionDesc}>Quick diagnosis and AI opportunity framing.</p>
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>What the platform does</h3>
          <p className={styles.cardBody}>Placeholder summary.</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Primary constraints</h3>
          <p className={styles.cardBody}>Placeholder summary.</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Where AI can drive lift</h3>
          <p className={styles.cardBody}>Placeholder summary.</p>
        </div>
      </div>
    </section>
  );
}
