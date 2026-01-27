// src/features/recruitment/components/SectionShell.tsx
import React from "react";
import styles from "../sections/styles/recruitmentOS.module.css";

type SectionShellProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export function SectionShell({ left, right }: SectionShellProps) {
  return (
    <div className={styles.rosWrap}>
      <div className={styles.rosShell}>
        <aside className={`${styles.rosCard} ${styles.rosNavCard}`}>{left}</aside>
        <section className={`${styles.rosCard} ${styles.rosStage}`}>{right}</section>
      </div>
    </div>
  );
}
