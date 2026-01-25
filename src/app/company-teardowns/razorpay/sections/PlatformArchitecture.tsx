import styles from "../razorpay.module.css";

export default function PlatformArchitecture() {
  return (
    <section id="platform-architecture" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Platform Architecture</h2>
        <p className={styles.sectionDesc}>Shared components reused across the portfolio.</p>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Shared components</h3>
          <ul className={styles.bullets}>
            <li>Data layer</li>
            <li>LLM layer</li>
            <li>Orchestration (Make or n8n)</li>
            <li>Event bus</li>
            <li>Identity and profile service</li>
          </ul>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramPlaceholder}>
            Diagram placeholder
          </div>
          <p className={styles.miniNote}>
            Replace with a clean diagram showing reuse across Now, Next, Later.
          </p>
        </div>
      </div>
    </section>
  );
}
