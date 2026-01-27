// src/features/recruitment/sections/HowItRuns.tsx
import React from "react";
import styles from "./styles/recruitmentOS.module.css";

type Props = { id: string };

const STEPS = [
  { title: "1) Ingest", desc: "Role enters from job board, email, or CRM." },
  { title: "2) Structure", desc: "LLM converts it into a clean role brief." },
  { title: "3) Match", desc: "Candidates are pulled and ranked to the brief." },
  { title: "4) Review", desc: "Human approves the top set and final constraints." },
  { title: "5) Deliver", desc: "Shortlist pack is generated and shared." },
];

export function HowItRuns({ id }: Props) {
  return (
    <section id={id} className={styles.rosSection}>
      <div className={styles.rosSectionTop}>
        <h2 className={styles.rosH2}>How it runs</h2>
        <p className={styles.rosLead}>A simple end to end loop you can run per role.</p>
      </div>

      <div className={styles.rosSteps}>
        {STEPS.map((s) => (
          <div key={s.title} className={styles.rosStep}>
            <div className={styles.rosStepTitle}>{s.title}</div>
            <div className={styles.rosStepDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
