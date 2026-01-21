import { FloatingCardLayer } from "../features/floating-card/FloatingCardLayer";
import { HomeHero } from "../sections/home/HomeHero";
import { WhatICanDo } from "../sections/home/WhatICanDo";
import { AboutMe } from "../sections/home/AboutMe";
import { FeaturedProjects } from "../sections/home/FeaturedProjects";

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
