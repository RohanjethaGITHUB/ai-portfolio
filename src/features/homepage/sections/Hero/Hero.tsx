'use client';

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import HeroParticles from "@/components/HeroParticles";

const WORDS = ["Leader", "Product Builder", "Enthusiast", "Coach"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = WORDS[wordIndex];
    const typingSpeed = deleting ? 55 : 130;
    const pauseAfterFull = 1600;

    let t: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), typingSpeed);
      } else {
        t = setTimeout(() => setDeleting(true), pauseAfterFull);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), typingSpeed);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }
    }

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        <HeroParticles />
      </div>

      <div className={styles.inner}>
        <div className={styles.kicker}>Rohan Jetha</div>

        <h1 className={styles.h1}>
          Artificial Intelligence
          <br />
          <span className={styles.typingWrap}>
            <span className={styles.typingWord}>{text}</span>
            <span className={styles.caret} aria-hidden="true" />
          </span>
        </h1>

        <p className={styles.p}>
          I design AI first products, automate workflows end to end, and ship systems that are practical, measurable, and
          reliable.
        </p>

        <div className={styles.btnRow}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="/about">
            About Me
          </a>
          {/* <a className={styles.btn} href="/company-teardowns">
            Company Teardowns
          </a> */}
        </div>
      </div>
    </section>
  );
}
