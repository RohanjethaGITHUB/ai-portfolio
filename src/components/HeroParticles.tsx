"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function HeroParticles() {
  const init = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
  <Particles
    init={init}
    className="heroParticles"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    options={{
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 120,
      detectRetina: true,
      particles: {
        number: {
          value: 150,
          density: { enable: true, area: 650 },
        },
        color: { value: "#8e0a3f" },
        opacity: { value: { min: 0.18, max: 0.55 } },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.75,
          direction: "none",
          outModes: "out",
        },
        links: {
          enable: true,
          distance: 165,
          color: "#ffffff",
          opacity: 0.12,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: false, mode: "push" },
        },
        modes: {
          repulse: { distance: 100, duration: 0.35 },
          push: { quantity: 5 },
        },
      },
    }}
  />
);

}
