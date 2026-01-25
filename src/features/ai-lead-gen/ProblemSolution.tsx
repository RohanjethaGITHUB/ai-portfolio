import styles from "./ProblemSolution.module.css";

export default function ProblemSolution() {
  return (
    <div className={styles.wrap}>
      {/* Top summary strip */}
      <div className={styles.topStrip}>
        <div className={styles.stripTitle}>At a glance</div>
        <div className={styles.stripGrid}>
          <div className={styles.stripItem}>
            <div className={styles.stripK}>Input</div>
            <div className={styles.stripV}>Target sector definition</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripK}>Core idea</div>
            <div className={styles.stripV}>Match WHAT to pitch to WHO</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripK}>Output</div>
            <div className={styles.stripV}>Personalized email + LinkedIn messaging</div>
          </div>
        </div>
      </div>

      {/* Two column cards */}
      <div className={styles.grid}>
        {/* Problem */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.h3}>Problem</h3>
            <p className={styles.sub}>
              Outbound lead gen breaks the moment you try to scale relevance.
            </p>
          </div>

          <ul className={styles.list}>
            <li>
              <span className={styles.b}>Sourcing is fragmented.</span> Lists come from different tools, with missing
              emails, weak role data, or stale company info.
            </li>
            <li>
              <span className={styles.b}>Personalization does not scale.</span> Teams default to templates, so messages
              feel generic and response rates drop.
            </li>
            <li>
              <span className={styles.b}>Wrong persona, wrong angle.</span> A junior cares about execution and workload,
              a manager cares about KPIs, a C suite cares about ROI and risk.
            </li>
            <li>
              <span className={styles.b}>Deliverability gets worse over time.</span> Higher volume without controls
              triggers spam filters and damages domains.
            </li>
            <li>
              <span className={styles.b}>Ops overhead increases.</span> Replies, unsubscribes, and follow ups become a
              manual mess across tools.
            </li>
          </ul>

          <div className={styles.smallNote}>
            Most teams can do one of these well. Very few can do all of them at once.
          </div>
        </section>

        {/* Solution */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.h3}>Solution</h3>
            <p className={styles.sub}>
              One input. End to end lead gen that stays persona matched and trackable.
            </p>
          </div>

          <div className={styles.solutionSteps}>
            <div className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepTitle}>Sector in</div>
              </div>
              <div className={styles.stepBody}>
                ABC defines the target, for example SaaS, 51 to 200 employees, India.
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepTitle}>Leads sourced and enriched</div>
              </div>
              <div className={styles.stepBody}>
                Finds matching companies and contacts, then enriches role, seniority, location, and company context.
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepTitle}>WHO persona built</div>
              </div>
              <div className={styles.stepBody}>
                Builds a persona per lead based on seniority and context, not just a job title.
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>4</span>
                <div className={styles.stepTitle}>WHAT pitch selected</div>
              </div>
              <div className={styles.stepBody}>
                Matches ABCs product use case to that persona, choosing the best angle for that specific lead.
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>5</span>
                <div className={styles.stepTitle}>Multichannel outreach runs</div>
              </div>
              <div className={styles.stepBody}>
                Generates a 3 step email sequence plus LinkedIn messaging, then runs campaigns with deliverability
                guardrails and CRM sync.
              </div>
            </div>
          </div>

          <div className={styles.callout}>
            <div className={styles.calloutTitle}>The key shift</div>
            <div className={styles.calloutBody}>
              Instead of mass outreach with light personalization, the system decides the best{" "}
              <span className={styles.b}>WHAT</span> to pitch to each{" "}
              <span className={styles.b}>WHO</span> and then generates messaging that fits that persona.
            </div>
          </div>
        </section>
      </div>

      {/* Bottom outcomes row */}
      <div className={styles.outcomes}>
        <div className={styles.outcome}>
          <div className={styles.outcomeK}>Relevance</div>
          <div className={styles.outcomeV}>Persona matched angles, not generic templates</div>
        </div>
        <div className={styles.outcome}>
          <div className={styles.outcomeK}>Scale</div>
          <div className={styles.outcomeV}>Lead sourcing and personalization runs continuously</div>
        </div>
        <div className={styles.outcome}>
          <div className={styles.outcomeK}>Control</div>
          <div className={styles.outcomeV}>Guardrails, alerts, and optional human approval</div>
        </div>
        <div className={styles.outcome}>
          <div className={styles.outcomeK}>Tracking</div>
          <div className={styles.outcomeV}>Every step logged and synced to your CRM</div>
        </div>
      </div>
    </div>
  );
}
