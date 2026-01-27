// src/features/recruitment/sections/RecruitmentSectionsNav.tsx
"use client";

import React from "react";
import styles from "./styles/recruitmentOS.module.css";

type NavSection = { id: string; label: string; tag?: string };

type Props = {
  sections: NavSection[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function RecruitmentSectionsNav({ sections, activeId, onSelect }: Props) {
  return (
    <div className={styles.rosNav}>
      <div className={styles.rosNavTitle}>SECTIONS</div>

      <div className={styles.rosNavBtns}>
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              className={`${styles.rosNavBtn} ${isActive ? styles.isActive : ""}`}
              onClick={() => onSelect(s.id)}
            >
              <span className={styles.rosNavLabel}>{s.label}</span>
              {s.tag ? <span className={styles.rosTag}>{s.tag}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RecruitmentSectionsNav;
