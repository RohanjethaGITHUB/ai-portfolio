"use client";

import { useEffect, useState } from "react";

type CardSlotProps = {
  imgSrc: string;
  rot?: number;
  scale?: number;
};

function useIsMobile(breakpoint = 980) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function CardSlot({ imgSrc, rot = 0, scale = 1 }: CardSlotProps) {
  const isMobile = useIsMobile(980);

  return (
    <div
      className="card-slot"
      data-img={imgSrc}
      data-rot={String(rot)}
      data-scale={String(scale)}
      aria-hidden="true"
    >
      {/* Mobile only: render a real card so something is visible when the floating layer is hidden */}
      {isMobile ? (
        <div className="cardMedia">
          <img className="cardImg is-hero" src={imgSrc} alt="" draggable={false} />
        </div>
      ) : null}
    </div>
  );
}
