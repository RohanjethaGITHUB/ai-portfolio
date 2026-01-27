/* src/features/recruitment/sections/styles/Coverage.module.css */

.storyShell {
  border-radius: 22px;
  border: 1px solid rgba(92, 64, 45, 0.16);
  background: rgba(255, 255, 255, 0.70);
  box-shadow: 0 18px 60px rgba(30, 18, 10, 0.10);
  padding: 14px;
}

.storyBars {
  display: flex;
  gap: 8px;
  padding: 8px 8px 12px 8px;
}

.storyBar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: rgba(92, 64, 45, 0.10);
  overflow: hidden;
}

.storyBarFill {
  height: 100%;
  width: 0%;
  border-radius: 999px;
  background: rgba(139, 90, 60, 0.70);
  opacity: 0.55;
}

.isDone {
  width: 100%;
  opacity: 0.75;
}

.isRunning {
  animation: storyRun 6.5s linear forwards;
  opacity: 0.85;
}

.isPaused {
  width: 60%;
  opacity: 0.45;
}

@keyframes storyRun {
  from { width: 0%; }
  to { width: 100%; }
}

.storySlide {
  border-radius: 18px;
  border: 1px solid rgba(92, 64, 45, 0.14);
  background:
    radial-gradient(720px 340px at 50% 0%, rgba(192, 138, 69, 0.10), transparent 60%),
    rgba(255, 255, 255, 0.76);
  overflow: hidden;
}

.storyTopRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 14px 10px 14px;
}

.storySlideMeta {
  min-width: 0;
}

.storyKicker {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(56, 43, 33, 0.60);
  font-weight: 820;
}

.storyTitle {
  margin-top: 8px;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 820;
  color: rgba(34, 26, 20, 0.90);
}

.storySubtitle {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.65;
  font-weight: 620;
  color: rgba(56, 43, 33, 0.70);
  max-width: 520px;
}

.storyControls {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.storyIconBtn {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(92, 64, 45, 0.14);
  background: rgba(255, 255, 255, 0.70);
  color: rgba(34, 26, 20, 0.78);
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(30, 18, 10, 0.06);
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
  font-weight: 760;
}

.storyIconBtn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.82);
  border-color: rgba(139, 90, 60, 0.18);
}

/* Updated: no fixed height, use framed image so it feels full and premium */
.storyImageSlot {
  padding: 16px;
  border-top: 1px solid rgba(92, 64, 45, 0.10);
  border-bottom: 1px solid rgba(92, 64, 45, 0.10);
  background:
    radial-gradient(520px 260px at 50% 10%, rgba(176, 122, 85, 0.10), transparent 60%),
    rgba(255, 255, 255, 0.60);
}

.ovImageFrame {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  aspect-ratio: 16 / 7;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.95), rgba(245,239,231,0.92));
  border: 1px solid rgba(55, 35, 20, 0.10);
  box-shadow:
    0 18px 45px rgba(30, 20, 10, 0.10),
    inset 0 1px 0 rgba(255,255,255,0.70);
  overflow: hidden;
}

.storyImage {
  object-fit: cover;
  padding: 0;
  filter: saturate(1.02) contrast(1.04) drop-shadow(0 18px 30px rgba(30, 18, 10, 0.12));
}

.storyBody {
  padding: 14px;
}

.storyBlockTitle {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(56, 43, 33, 0.60);
  font-weight: 820;
  margin-bottom: 10px;
}

.storyBullets {
  margin: 0;
  padding-left: 18px;
  color: rgba(56, 43, 33, 0.70);
  font-size: 13px;
  line-height: 1.65;
  font-weight: 620;
}

.storyBullets li {
  margin: 6px 0;
}

.storyImpactRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.storyImpactChip {
  border-radius: 999px;
  border: 1px solid rgba(92, 64, 45, 0.12);
  background: rgba(255, 255, 255, 0.70);
  padding: 8px 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.storyImpactLabel {
  font-size: 11px;
  color: rgba(56, 43, 33, 0.62);
  font-weight: 760;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.storyImpactValue {
  font-size: 12px;
  color: rgba(34, 26, 20, 0.82);
  font-weight: 700;
}

.storyFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(92, 64, 45, 0.10);
}

.storyCount {
  font-size: 12px;
  font-weight: 760;
  color: rgba(34, 26, 20, 0.70);
}

.storyHint {
  font-size: 12px;
  font-weight: 620;
  color: rgba(56, 43, 33, 0.62);
}

@media (max-width: 980px) {
  .storyTopRow {
    flex-direction: column;
    align-items: flex-start;
  }

  .storyControls {
    width: 100%;
    justify-content: flex-start;
  }

  .storyImageSlot {
    padding: 14px;
  }

  .ovImageFrame {
    aspect-ratio: 16 / 8;
  }
}
