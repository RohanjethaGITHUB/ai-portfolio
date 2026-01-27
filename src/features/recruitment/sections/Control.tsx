// src/features/recruitment/sections/Control.tsx
import React from "react";
import ros from "./styles/recruitmentOS.module.css";
import s from "./styles/control.module.css";

type Props = { id: string };

function Icon({
  name,
  className,
}: {
  name: "pause" | "log" | "rerun";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "pause") {
    return (
      <svg {...common}>
        <path d="M7 6.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 6.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M4.5 4.5H19.5V19.5H4.5V4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
      </svg>
    );
  }

  if (name === "log") {
    return (
      <svg {...common}>
        <path
          d="M7 7.5H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M7 12H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M7 16.5H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M6.5 3.75H17.5C18.6046 3.75 19.5 4.64543 19.5 5.75V18.25C19.5 19.3546 18.6046 20.25 17.5 20.25H6.5C5.39543 20.25 4.5 19.3546 4.5 18.25V5.75C4.5 4.64543 5.39543 3.75 6.5 3.75Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 6V3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path
        d="M7.2 7.2L5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path d="M6 12H3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path
        d="M7.2 16.8L5.5 18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M12 20.5V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M16.8 16.8L18.5 18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M20.5 12H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M16.8 7.2L18.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Control({ id }: Props) {
  return (
    <section id={id} className={`${ros.rosSection} ${s.controlSection}`}>
      <div className={`${ros.rosSectionTop} ${s.top}`}>
        <h2 className={`${ros.rosH2} ${s.h2}`}>Control</h2>
        <p className={`${ros.rosLead} ${s.lead}`}>
          I built approval gates and audit logs so automation stays fast, but I stay in control.
        </p>
      </div>

      <div className={s.grid}>
        {/* Card 1 */}
        <article className={s.card}>
          <header className={s.cardTop}>
            <div className={s.iconWrap} aria-hidden="true">
              <Icon name="pause" className={s.icon} />
            </div>
            <div className={s.cardTitleBlock}>
              <div className={s.kicker}>Human approval gates</div>
              <h3 className={s.h3}>Checkpoints built into the flow</h3>
            </div>
          </header>

          <p className={s.cardBodyText}>
            I added gates after early runs showed speed without confidence.
          </p>

          <ol className={s.stepList}>
            <li className={s.stepItem}>
              <span className={s.stepDot} aria-hidden="true" />
              <div className={s.stepContent}>
                <div className={s.stepTitle}>Role brief approved</div>
                <div className={s.stepMeta}>Before sourcing starts</div>
              </div>
            </li>

            <li className={s.stepItem}>
              <span className={s.stepDot} aria-hidden="true" />
              <div className={s.stepContent}>
                <div className={s.stepTitle}>Shortlist reviewed</div>
                <div className={s.stepMeta}>Before candidates are prioritised</div>
              </div>
            </li>

            <li className={s.stepItem}>
              <span className={s.stepDot} aria-hidden="true" />
              <div className={s.stepContent}>
                <div className={s.stepTitle}>Outbound hold (optional)</div>
                <div className={s.stepMeta}>Before any outreach is sent</div>
              </div>
            </li>
          </ol>
        </article>

        {/* Card 2 */}
        <article className={s.card}>
          <header className={s.cardTop}>
            <div className={s.iconWrap} aria-hidden="true">
              <Icon name="log" className={s.icon} />
            </div>
            <div className={s.cardTitleBlock}>
              <div className={s.kicker}>Traceability</div>
              <h3 className={s.h3}>A run log you can inspect later</h3>
            </div>
          </header>

          <p className={s.cardBodyText}>
            I log every run so I can audit, debug, and explain decisions later.
          </p>

          <div className={s.logPreview} aria-label="Run log preview">
            <div className={s.logRow}>
              <span className={s.logKey}>Timestamp</span>
              <span className={s.logVal}>Recorded</span>
            </div>
            <div className={s.logRow}>
              <span className={s.logKey}>Inputs</span>
              <span className={s.logVal}>Role brief, constraints</span>
            </div>
            <div className={s.logRow}>
              <span className={s.logKey}>Model output</span>
              <span className={s.logVal}>Reasoned shortlist</span>
            </div>
            <div className={s.logRow}>
              <span className={s.logKey}>Decision</span>
              <span className={s.logVal}>Approved or held</span>
            </div>
          </div>

          <ul className={s.miniBullets}>
            <li>Model and configuration tracked per run</li>
            <li>Clear lineage for review and reporting</li>
          </ul>
        </article>

        {/* Card 3 */}
        <article className={s.card}>
          <header className={s.cardTop}>
            <div className={s.iconWrap} aria-hidden="true">
              <Icon name="rerun" className={s.icon} />
            </div>
            <div className={s.cardTitleBlock}>
              <div className={s.kicker}>Reversibility</div>
              <h3 className={s.h3}>Safe to adjust, safe to rerun</h3>
            </div>
          </header>

          <p className={s.cardBodyText}>
            I designed reruns and rollbacks so tightening constraints is safe.
          </p>

          <div className={s.pills} aria-label="Rerun controls preview">
            <span className={s.pill}>Add constraints</span>
            <span className={s.pill}>Rerun shortlist</span>
            <span className={s.pill}>Rollback outcome</span>
          </div>

          <ul className={s.miniBullets}>
            <li>Rerun with updated filters and priorities</li>
            <li>No irreversible actions by default</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
