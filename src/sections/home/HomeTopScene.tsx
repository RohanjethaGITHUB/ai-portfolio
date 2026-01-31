"use client";

import HomeHero from "./HomeHero";
import QuoteBand from "./QuoteBand";
import { WhatICanDo } from "./MyCoreSkills";
import { HowIBuildAISystems } from "./HowIBuildAISystems";
import { AboutMe } from "./AboutMe";
import HeroParticles from "./HeroParticles";
import styles from "./HomeTopBand.module.css";


export default function HomeTopScene() {
  return (
    <section className={styles.scene} aria-label="Home top sections">
      <div className={styles.inner}>
        <div className={styles.block} data-block="core-skills">
          <WhatICanDo />
        </div>

        <div className={styles.block} data-block="about">
          <AboutMe />
        </div>

        <div className={styles.block} data-block="how-i-build">
          <HowIBuildAISystems />
        </div>
      </div>
    </section>
  );
}