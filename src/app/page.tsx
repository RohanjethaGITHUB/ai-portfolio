import { FloatingCardLayer } from "../components/FloatingCardLayer";
import { HomeHero } from "../sections/HomeHero";
import { WhatICanDo } from "../sections/WhatICanDo";
import { AboutMe } from "../sections/AboutMe";
import { FeaturedProjects } from "../sections/FeaturedProjects";

export default function Page() {
  return (
    <main id="dr-portfolio">
      <FloatingCardLayer />

      <HomeHero />
      <WhatICanDo />
      <AboutMe />

      {/* Animation stops after AboutMe because FeaturedProjects has no CardSlot */}
      <FeaturedProjects />
    </main>
  );
}
