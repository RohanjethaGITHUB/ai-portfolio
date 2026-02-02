import styles from "./home.module.css";
import { Hero } from "./sections/Hero/Hero";
import BelowHeroFlow from "./sections/BelowHeroFlow/BelowHeroFlow";
import FeaturedProjects from "./sections/Featured Projects/FeaturedProjects";



export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Hero />
        <BelowHeroFlow />
        <FeaturedProjects />
      </div>
    </div>
  );
}
