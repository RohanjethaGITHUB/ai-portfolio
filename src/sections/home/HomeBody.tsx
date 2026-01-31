import styles from "./HomeBody.module.css";
import { MyCoreSkills } from "./MyCoreSkills";
import { HowIBuildAISystems } from "./HowIBuildAISystems";
import { AboutMe } from "./AboutMe";




export default function HomeBody() {
  return (
    <section className={styles.body} aria-label="Home body">
      <div className={styles.inner}>
        <div className={styles.block}>
          <MyCoreSkills />
        </div>

        <div className={styles.block}>
          <AboutMe />
        </div>

        <div className={styles.block}>
          <HowIBuildAISystems />
        </div>
      </div>
    </section>
  );
}
