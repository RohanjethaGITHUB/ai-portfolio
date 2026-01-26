"use client";

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; r: number; s: number; flip: number };

export function FloatingCardLayer() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("dr-portfolio");
    if (!root) return;

    const layer = layerRef.current;
    if (!layer) return;

    const card = layer.querySelector<HTMLDivElement>("#drCard");
    const inner = layer.querySelector<HTMLDivElement>("#drCardInner");
    const imgFront = layer.querySelector<HTMLImageElement>("#drImgFront");
    const imgBack = layer.querySelector<HTMLImageElement>("#drImgBack");
    const hiBubble = layer.querySelector<HTMLDivElement>("#drHiBubble");

    if (!card || !inner || !imgFront || !imgBack) return;

    // TypeScript-safe aliases for nested functions
    const rootEl = root;
    const innerEl = inner;
    const imgFrontEl = imgFront;
    const imgBackEl = imgBack;

    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    const segments = [
      {
        k: "whatsapp",
        front: "/images/amc/phone_whatsapp.webp",
        back: "/images/amc/phone_sms.webp",
        hi: true,
      },
      {
        k: "sms",
        front: "/images/amc/phone_sms.webp",
        back: "/images/amc/phone_gmail.webp",
        hi: false,
      },
      {
        k: "gmail",
        front: "/images/amc/phone_gmail.webp",
        back: "/images/amc/phone_bank.webp",
        hi: false,
      },
      {
        k: "bank",
        front: "/images/amc/phone_bank.webp",
        back: "/images/amc/phone_whatsapp.webp",
        hi: false,
      },
    ] as const;

    let lastPairKey = "";
    function setPairImagesForSegment(idx: number) {
      const seg = segments[idx % segments.length];
      const next = segments[(idx + 1) % segments.length];
      const key = `${seg.k}-${next.k}`;
      if (key === lastPairKey) return;

      lastPairKey = key;

      imgFrontEl.src = seg.front;
      imgBackEl.src = next.back;

      if (hiBubble) hiBubble.style.opacity = seg.hi ? "1" : "0";
    }

    // Layout measurements
    let rootTop = 0;
    let rootH = 1;

    function measure() {
      const rect = rootEl.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset || 0;
      rootTop = rect.top + scrollY;
      rootH = Math.max(1, rect.height);
    }

    function normalizedProgress() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const y = scrollY - rootTop;
      return clamp(y / rootH, 0, 1);
    }

    // Motion state
    let last = performance.now();

    const target: Vec = { x: 0, y: 0, r: 0, s: 1, flip: 0 };
    const cur: Vec = { x: 0, y: 0, r: 0, s: 1, flip: 0 };

    function updateTargetFromScroll() {
      const p = normalizedProgress();

      const segFloat = p * segments.length;
      const segIdx = Math.floor(segFloat) % segments.length;
      const localT = segFloat - Math.floor(segFloat);

      setPairImagesForSegment(segIdx);

      const wave = Math.sin(p * Math.PI * 2);
      const wave2 = Math.sin(p * Math.PI * 4 + 0.6);

      target.x = wave * 10;
      target.y = wave2 * 6;
      target.r = wave * 2.2;
      target.s = lerp(1.02, 0.98, easeOutCubic(localT));
      target.flip = clamp(localT, 0, 1);
    }

    function applyTransform(dt: number) {
      const k = clamp(dt * 10, 0, 1);

      cur.x = lerp(cur.x, target.x, k);
      cur.y = lerp(cur.y, target.y, k);
      cur.r = lerp(cur.r, target.r, k);
      cur.s = lerp(cur.s, target.s, k);
      cur.flip = lerp(cur.flip, target.flip, k);

      const frontOpacity = 1 - clamp(cur.flip, 0, 1);
      const backOpacity = clamp(cur.flip, 0, 1);

      imgFrontEl.style.opacity = String(frontOpacity);
      imgBackEl.style.opacity = String(backOpacity);

      const rot = `rotate(${cur.r}deg)`;
      const trans = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      const scale = `scale(${cur.s})`;

      innerEl.style.transform = `${trans} ${rot} ${scale}`;
    }

    function raf(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      updateTargetFromScroll();
      applyTransform(dt);

      requestAnimationFrame(raf);
    }

    const onResize = () => setTimeout(measure, 80);
    window.addEventListener("resize", onResize);

    setTimeout(measure, 60);
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="card-layer" aria-hidden="true" ref={layerRef}>
      <div className="card" id="drCard">
        <div className="card-inner" id="drCardInner">
          <div className="card-face card-front">
            <div className="cardMedia">
              <img
                id="drImgFront"
                className="cardImg"
                alt=""
                draggable={false}
              />
            </div>

            <div className="hi-bubble" id="drHiBubble" aria-hidden="true">
              <span className="hi-icon">👋</span>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="cardMedia">
              <img id="drImgBack" className="cardImg" alt="" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
