"use client";

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; r: number; s: number; flip: number };
type Vel = { x: number; y: number; r: number; s: number; flip: number };

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

    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function smoothstep(t: number) {
      t = clamp(t, 0, 1);
      return t * t * (3 - 2 * t);
    }

    let sections: HTMLElement[] = [];
    let slots: HTMLElement[] = [];
    let sectionTops: number[] = [];

    let target: Vec = { x: 0, y: 0, r: 0, s: 1, flip: 0 };
    let current: Vec = { x: 0, y: 0, r: 0, s: 1, flip: 0 };
    let vel: Vel = { x: 0, y: 0, r: 0, s: 0, flip: 0 };

    let lastPairKey = "";
    let lastT = performance.now();

    const SPRING = 22;
    const DAMPING = 10.5;

    const ROT_SPRING = 18;
    const ROT_DAMPING = 10;

    const FLIP_SPRING = 26;
    const FLIP_DAMPING = 12;

    const SNAP_POS = 0.1;
    const SNAP_ROT = 0.03;
    const SNAP_SCALE = 0.0006;
    const SNAP_FLIP = 0.2;

    const preload = new Map<string, HTMLImageElement>();
    function preloadImg(src: string) {
      if (!src || preload.has(src)) return;
      const im = new Image();
      im.decoding = "async";
      im.src = src;
      preload.set(src, im);
    }

    function slotTransform(i: number) {
      const rect = slots[i].getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        r: parseFloat(slots[i].dataset.rot || "0"),
        s: parseFloat(slots[i].dataset.scale || "1"),
      };
    }

    function getImg(i: number) {
      return slots[i]?.dataset.img ? slots[i].dataset.img : "";
    }

    function setPairImagesForSegment(segIndex: number) {
      const aImg = getImg(segIndex);
      const bImg = getImg(segIndex + 1) || aImg;
      if (!aImg) return;

      preloadImg(aImg);
      preloadImg(bImg);

      const even = segIndex % 2 === 0;
      const frontSrc = even ? aImg : bImg;
      const backSrc = even ? bImg : aImg;

      const key = `${segIndex}|${frontSrc}|${backSrc}`;
      if (key === lastPairKey) return;
      lastPairKey = key;

      imgFront.src = frontSrc;
      imgBack.src = backSrc;
    }

    // IMPORTANT: segment is always [0 .. n-2]
    function getSegmentIndex() {
      const y = window.scrollY;
      const n = sectionTops.length;
      if (n <= 1) return 0;

      if (y >= sectionTops[n - 2]) return n - 2;

      for (let i = 0; i < n - 2; i++) {
        if (y >= sectionTops[i] && y < sectionTops[i + 1]) return i;
      }
      return 0;
    }

    function updateTargetFromScroll() {
      if (!sections.length) return;

      const y = window.scrollY;
      const seg = getSegmentIndex();

      const a = seg;
      const b = seg + 1;

      const start = sectionTops[a];
      const end = sectionTops[b];
      const tRaw = clamp((y - start) / Math.max(1, end - start), 0, 1);
     

      const A = slotTransform(a);
      const B = slotTransform(b);

      target.x = lerp(A.x, B.x, tRaw);
      target.y = lerp(A.y, B.y, tRaw);
      target.s = lerp(A.s, B.s, tRaw);

      const straighten = smoothstep(Math.min(tRaw, 1 - tRaw) * 2);
      target.r = lerp(A.r, B.r, tRaw) * straighten;

      setPairImagesForSegment(a);

      const base = a * 180;
      target.flip = base + tRaw * 180;

      if (hiBubble) {
        hiBubble.classList.toggle("is-on", a === 0 && tRaw < 0.55);
      }
      card.classList.toggle("is-hero-seg", a === 0);

    }

    function springStep(curr: number, v: number, tgt: number, k: number, c: number, dt: number) {
      const a = k * (tgt - curr) - c * v;
      v += a * dt;
      curr += v * dt;
      return [curr, v] as const;
    }

    function applyTransform(immediate: boolean, dt: number) {
      if (immediate) {
        current = { ...target };
        vel = { x: 0, y: 0, r: 0, s: 0, flip: 0 };
      } else {
        [current.x, vel.x] = springStep(current.x, vel.x, target.x, SPRING, DAMPING, dt);
        [current.y, vel.y] = springStep(current.y, vel.y, target.y, SPRING, DAMPING, dt);
        [current.r, vel.r] = springStep(current.r, vel.r, target.r, ROT_SPRING, ROT_DAMPING, dt);
        [current.s, vel.s] = springStep(current.s, vel.s, target.s, SPRING, DAMPING, dt);

        const flipDiff = Math.abs(target.flip - current.flip);
        if (flipDiff < SNAP_FLIP) {
          current.flip = target.flip;
          vel.flip = 0;
        } else {
          [current.flip, vel.flip] = springStep(current.flip, vel.flip, target.flip, FLIP_SPRING, FLIP_DAMPING, dt);
        }

        if (Math.abs(target.x - current.x) < SNAP_POS) { current.x = target.x; vel.x = 0; }
        if (Math.abs(target.y - current.y) < SNAP_POS) { current.y = target.y; vel.y = 0; }
        if (Math.abs(target.r - current.r) < SNAP_ROT) { current.r = target.r; vel.r = 0; }
        if (Math.abs(target.s - current.s) < SNAP_SCALE) { current.s = target.s; vel.s = 0; }
      }

      card.style.transform =
        `translate3d(${current.x}px,${current.y}px,0) translate(-50%,-50%) rotate(${current.r}deg) scale(${current.s})`;

      inner.style.transform = `rotateY(${current.flip}deg)`;
    }

    function measure() {
        // Only sections that contain a card-slot participate in the animation
        const allSections = Array.from(root.querySelectorAll<HTMLElement>(".section"));
        const participatingSections = allSections.filter((s) => s.querySelector(".card-slot"));

        sections = participatingSections;
        slots = participatingSections
            .map((s) => s.querySelector<HTMLElement>(".card-slot"))
            .filter(Boolean) as HTMLElement[];

        if (!sections.length || sections.length !== slots.length) {
            console.warn("Mismatch: participating sections != slots", sections.length, slots.length);
            return;
        }

        sectionTops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY);

        // preload all slot images once
        for (let i = 0; i < slots.length; i++) preloadImg(getImg(i));

        lastPairKey = "";
        setPairImagesForSegment(0);
        updateTargetFromScroll();
        applyTransform(true, 0);
    }


    function raf() {
      const now = performance.now();
      let dt = (now - lastT) / 1000;
      lastT = now;

      dt = clamp(dt, 0.001, 0.033);

      // always update target so bottom/top edges never freeze
      updateTargetFromScroll();
      applyTransform(false, dt);

      requestAnimationFrame(raf);
    }

    window.addEventListener("resize", () => setTimeout(measure, 80));

    // initial measure after layout settles
    setTimeout(measure, 60);
    requestAnimationFrame(raf);

    return () => {
      // nothing critical to remove besides resize timer
      window.removeEventListener("resize", () => setTimeout(measure, 80));
    };
  }, []);

  return (
    <div className="card-layer" aria-hidden="true" ref={layerRef}>
      <div className="card" id="drCard">
        <div className="card-inner" id="drCardInner">
          <div className="card-face card-front">
            <div className="cardMedia">
              <img id="drImgFront" className="cardImg" alt="" draggable={false} />
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