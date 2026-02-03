import styles from "./Governance.module.css";

export default function Governance() {
  return (
    <section className={styles.wrap} aria-label="Governance">
      {/* Top card (match Context sizing + bloom) */}
      <div className={styles.topCard}>
        <div className={styles.topLeft}>
          <p className={styles.eyebrow}>GOVERNANCE</p>
          <h2 className={styles.bigTitle}>HR is not the place for black-box AI</h2>
          <p className={styles.lead}>
            HR data includes compensation, performance, leave, and sensitive notes. Any AI feature must
            prioritize auditability, access control, and predictable failure modes.
          </p>

          <div className={styles.chips}>
            <span className={styles.chip}>Access control</span>
            <span className={styles.chip}>Evidence</span>
            <span className={styles.chip}>Audits</span>
          </div>
        </div>

        <div className={styles.topRight}>
          <span className={styles.metaPill}>DEFAULT SAFE</span>
          <p className={styles.metaText}>Treat AI as assistance, not authority.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Decision boundaries</h3>
          <ul className={styles.list}>
            <li>AI can suggest and draft</li>
            <li>Humans approve high impact actions</li>
            <li>No automatic termination or compensation changes</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Privacy and access</h3>
          <ul className={styles.list}>
            <li>Role-based access controls by default</li>
            <li>Separation between HR admin and managers</li>
            <li>Explicit consent for sensitive summaries</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Audit and traceability</h3>
          <ul className={styles.list}>
            <li>Show source fields used in the suggestion</li>
            <li>Log prompt, model, and output metadata</li>
            <li>Store approvals and overrides for review</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Bias and harm checks</h3>
          <ul className={styles.list}>
            <li>Language bias detection in reviews</li>
            <li>Quality gates for missing evidence</li>
            <li>Escalation paths for flagged items</li>
          </ul>
        </div>
      </div>

      <div className={styles.reco}>
        <div className={styles.recoTop}>
          <p className={styles.recoEyebrow}>My Practical Recommendation</p>
          <span className={styles.recoPill}>Default safe</span>
        </div>

        <p className={styles.recoText}>
          If BambooHR ships AI, every feature should start in "suggest mode" with clear evidence and a
          one-click way to reject. Only after the product proves accuracy and fairness over time should
          it earn limited automation, and even then only for low impact workflows.
        </p>

        <div className={styles.recoRow}>
          <div className={styles.recoItem}>
            <span className={styles.recoDot} />
            <span className={styles.recoLabel}>Explainability</span>
            <span className={styles.recoDesc}>Show why, not just what</span>
          </div>
          <div className={styles.recoItem}>
            <span className={styles.recoDot} />
            <span className={styles.recoLabel}>Approvals</span>
            <span className={styles.recoDesc}>Human-in-the-loop for impact</span>
          </div>
          <div className={styles.recoItem}>
            <span className={styles.recoDot} />
            <span className={styles.recoLabel}>Logging</span>
            <span className={styles.recoDesc}>Audit trails for trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
