"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ModelKey = "gpt-5.2-2025-12-11" | "gpt-4o-2024-08-06" | "gpt-4.1-mini-2025-04-14";

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

type ChannelPayload =
  | { kind: "email"; subject: string; body: string }
  | { kind: "sms"; text: string }
  | { kind: "whatsapp"; text: string }
  | { kind: "inapp"; title: string; message: string };

type DemoRun = {
  key: ModelKey;
  label: string;

  createdISO: string;
  completionId: string;
  systemFingerprint?: string;

  usage: Usage;

  verdict: {
    label: string;
    summary: string;
    tone: "good" | "ok" | "warn";
  };

  computed: {
    spend_7d: number;
    spend_30d: number;
    income_30d: number;
    net_cashflow_30d: number;
    latest_balance_after: number;
    avg_daily_spend_30d: number;
    buffer_days_est: number;
  };

  decision: {
    title: string;
    message: string;
    type?: string;
    why?: string;
    steps?: string[];
    patterns?: { type: string; severity: string; note?: string }[];
    dataQualityNotes?: string[];
  };

  channels: ChannelPayload[];

  pricingUSDPer1M: {
    input: number;
    output: number;
    note: string;
  };
};

type StepKey = "inputs" | "compute" | "decide" | "render" | "trace";

type StepVisualKind = "single" | "duo" | "grid";

type StepVisual = {
  kind: StepVisualKind;
  label: string;
  images: { src: string; alt: string; caption?: string }[];
};

type Step = {
  key: StepKey;
  label: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  code?: { label: string; value: string }[];
  visual?: StepVisual;
};

function money(n: number) {
  const rounded = Math.round(n * 100) / 100;
  const s = rounded.toString();
  if (!s.includes(".")) return `${s}.00`;
  const [a, b] = s.split(".");
  return `${a}.${(b || "").padEnd(2, "0")}`;
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function estimateCostUSD(run: DemoRun) {
  const inRate = run.pricingUSDPer1M.input;
  const outRate = run.pricingUSDPer1M.output;

  const inTok = run.usage.prompt_tokens || 0;
  const outTok = run.usage.completion_tokens || 0;

  const inCost = (inTok / 1_000_000) * inRate;
  const outCost = (outTok / 1_000_000) * outRate;

  const total = inCost + outCost;
  return { inCost, outCost, total };
}

function StepVisuals({ visual }: { visual?: StepVisual }) {
  if (!visual) return null;

  const frameStyle: React.CSSProperties = {
    borderRadius: 18,
    border: "1px solid var(--line2)",
    background:
      "radial-gradient(900px 420px at 30% 0%, var(--a3), transparent 62%), var(--panel2)",
    padding: 12,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: ".10em",
    textTransform: "uppercase",
    color: "var(--muted2)",
    margin: 0,
  };

  const kindPillStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 900,
    padding: "7px 10px",
    borderRadius: 999,
    border: "1px solid var(--line2)",
    background: "var(--panel2)",
    color: "var(--muted)",
    whiteSpace: "nowrap",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    borderRadius: 14,
    border: "1px solid var(--line2)",
    background: "var(--panel)",
    boxShadow: "0 12px 26px rgba(0,0,0,.28)",
  };

  const captionStyle: React.CSSProperties = {
    marginTop: 8,
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".10em",
    textTransform: "uppercase",
    color: "var(--muted2)",
  };

  const singleStage: React.CSSProperties = {
    borderRadius: 16,
    border: "1px solid var(--line2)",
    background: "var(--panel2)",
    padding: 12,
  };

  const mediaBox: React.CSSProperties = {
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 14,
    overflow: "hidden",
  };

  // Bigger for duo comparisons (Step 2)
  const mediaBoxLarge: React.CSSProperties = {
    width: "100%",
    aspectRatio: "4 / 5",
    borderRadius: 14,
    overflow: "hidden",
  };

  const duoGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 32px 1fr",
    gap: 14,
    alignItems: "center",
  };

  const arrowWrap: React.CSSProperties = {
    display: "grid",
    placeItems: "center",
    height: "100%",
  };

  const arrow: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: "1px solid var(--a2)",
    background: "var(--a3)",
    display: "grid",
    placeItems: "center",
    fontWeight: 950,
    color: "var(--text)",
  };

  const grid2x2: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  };

  const gridThumbBox: React.CSSProperties = {
    width: "100%",
    aspectRatio: "16 / 10",
    borderRadius: 14,
    overflow: "hidden",
  };

  return (
    <aside style={frameStyle} aria-label={`${visual.label} visuals`}>
      <div style={headerStyle}>
        <p style={titleStyle}>{visual.label}</p>
        <span style={kindPillStyle}>
          {visual.kind === "duo" ? "Before to After" : visual.kind === "grid" ? "Multi preview" : "Preview"}
        </span>
      </div>

      {visual.kind === "single" && visual.images[0] && (
        <div style={singleStage}>
          <div style={mediaBox}>
            <img src={visual.images[0].src} alt={visual.images[0].alt} style={imgStyle} loading="lazy" />
          </div>
          {!!visual.images[0].caption && <div style={captionStyle}>{visual.images[0].caption}</div>}
        </div>
      )}

      {visual.kind === "duo" && visual.images.length >= 2 && (
        <div style={singleStage}>
          <div style={duoGrid}>
            <div>
              <div style={mediaBoxLarge}>
                <img src={visual.images[0].src} alt={visual.images[0].alt} style={imgStyle} loading="lazy" />
              </div>
              {!!visual.images[0].caption && <div style={captionStyle}>{visual.images[0].caption}</div>}
            </div>

            <div style={arrowWrap} aria-hidden="true">
              <div style={arrow}>→</div>
            </div>

            <div>
              <div style={mediaBoxLarge}>
                <img src={visual.images[1].src} alt={visual.images[1].alt} style={imgStyle} loading="lazy" />
              </div>
              {!!visual.images[1].caption && <div style={captionStyle}>{visual.images[1].caption}</div>}
            </div>
          </div>
        </div>
      )}

      {visual.kind === "grid" && (
        <div style={singleStage}>
          <div style={grid2x2}>
            {visual.images.slice(0, 4).map((im, i) => (
              <div key={i}>
                <div style={gridThumbBox}>
                  <img src={im.src} alt={im.alt} style={imgStyle} loading="lazy" />
                </div>
                {!!im.caption && <div style={captionStyle}>{im.caption}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default function Demo() {
  // Keep only ONE definition of exampleRows to avoid redeclare errors
  const exampleRows = useMemo(() => {
    return [
      "2026-01-22 • Woolworths • debit $152",
      "2026-01-21 • Anytime Fitness • debit $79",
      "2026-01-19 • Uber • debit $24",
      "2026-01-18 • Coles • debit $164",
      "…",
    ];
  }, []);

  const runs: DemoRun[] = useMemo(
    () => [
      {
        key: "gpt-5.2-2025-12-11",
        label: "GPT-5.2",
        createdISO: "2026-01-22T06:14:51.000Z",
        completionId: "chatcmpl-D0iFv8jHa7g17X1euSENmm1QONFRU",
        usage: { prompt_tokens: 5313, completion_tokens: 785, total_tokens: 6098 },
        verdict: {
          label: "Highly actionable",
          summary: "Clear constraints, concrete steps, minimal ambiguity",
          tone: "good",
        },
        computed: {
          spend_7d: 670,
          spend_30d: 3826,
          income_30d: 4200,
          net_cashflow_30d: 374,
          latest_balance_after: 230,
          avg_daily_spend_30d: 127.53,
          buffer_days_est: 1.8,
        },
        decision: {
          title: "48-hour essentials-only reset",
          message: "",
          steps: [
            "Essentials only for 48 hours (groceries, transport, bills).",
            "Daily cap: $80 until balance is back above $500.",
            "Transfer $50 to a Buffer bucket today.",
          ],
          patterns: [
            { type: "low_cash_buffer", severity: "high", note: "Estimated buffer is 1.8 days vs goal of 10." },
            { type: "tight_monthly_margin", severity: "medium", note: "Net cashflow is +$374 on $4,200 income." },
          ],
        },
        channels: [
          {
            kind: "email",
            subject: "Rohan, quick 48-hour essentials-only reset",
            body:
              "Hi Rohan,\n\nYour cash buffer is currently about 1.8 days (balance $230). A short essentials-only reset for 48 hours can help you avoid a squeeze and rebuild breathing room.\n\nTry this:\n1) Essentials only for 48 hours.\n2) Set a daily cap of $80 until your balance is back above $500.\n3) Move $50 today into a separate Buffer bucket/account.\n\nNot financial advice.",
          },
          {
            kind: "sms",
            text: "Your buffer is about 1.8 days (balance $230). Try a 48h essentials-only reset plus a $80/day cap. If you can, move $50 to a Buffer today. Not financial advice.",
          },
          {
            kind: "whatsapp",
            text: "Rohan, your buffer is about 1.8 days (balance $230). Next 48h: essentials only. Then $80/day cap until balance above $500. If possible, move $50 to a Buffer today. Not financial advice.",
          },
          {
            kind: "inapp",
            title: "48-hour essentials-only reset",
            message:
              "Essentials-only for 48 hours. Then $80/day cap until balance is above $500. Move $50 to Buffer today if you can. Not financial advice.",
          },
        ],
        pricingUSDPer1M: {
          input: 1.75,
          output: 14.0,
          note: "Prices per 1M tokens (USD).",
        },
      },
      {
        key: "gpt-4o-2024-08-06",
        label: "GPT-4o",
        createdISO: "2026-01-22T06:15:59.000Z",
        completionId: "chatcmpl-D0iH1XCAGYNaRgBdVjo5E5Xg1NTMu",
        systemFingerprint: "fp_a0e9480a2f",
        usage: { prompt_tokens: 5314, completion_tokens: 521, total_tokens: 5835 },
        verdict: {
          label: "Correct but generic",
          summary: "Flags the issue but lacks specific execution guidance",
          tone: "ok",
        },
        computed: {
          spend_7d: 670,
          spend_30d: 3826,
          income_30d: 4200,
          net_cashflow_30d: 374,
          latest_balance_after: 230,
          avg_daily_spend_30d: 127.53,
          buffer_days_est: 1.8,
        },
        decision: {
          title: "Low buffer alert",
          message: "",
          steps: [
            "Review recent transactions for non-essential spend.",
            "Temporarily cut back for a week.",
            "Rebuild the buffer before discretionary purchases.",
          ],
          patterns: [{ type: "low_buffer", severity: "high", note: "Buffer is below the desired 10 days." }],
        },
        channels: [
          {
            kind: "email",
            subject: "Let's create some financial breathing room",
            body:
              "Hi Rohan, your buffer is currently below your target at about 1.8 days. Consider reviewing non-essential spend and temporarily cutting back to rebuild your cushion. Not financial advice.",
          },
          {
            kind: "sms",
            text: "Your buffer is low at about 1.8 days. Consider reviewing spending to rebuild the buffer. Not financial advice.",
          },
          {
            kind: "whatsapp",
            text: "Hi Rohan, your buffer is low at about 1.8 days. Consider reviewing spending to rebuild your cushion. Not financial advice.",
          },
          {
            kind: "inapp",
            title: "Low buffer alert",
            message:
              "Your buffer is about 1.8 days. Consider adjusting spending to rebuild breathing room. Not financial advice.",
          },
        ],
        pricingUSDPer1M: {
          input: 2.5,
          output: 10.0,
          note: "Prices per 1M tokens (USD).",
        },
      },
      {
        key: "gpt-4.1-mini-2025-04-14",
        label: "GPT-4.1 mini",
        createdISO: "2026-01-22T06:17:00.000Z",
        completionId: "chatcmpl-D0iI0aSVmTxIY7GRgqizhx9EzNsVJ",
        systemFingerprint: "fp_376a7ccef1",
        usage: { prompt_tokens: 5314, completion_tokens: 630, total_tokens: 5944 },
        verdict: {
          label: "Broad advice",
          summary: "Safe suggestions, lower product readiness for a single next step",
          tone: "warn",
        },
        computed: {
          spend_7d: 670,
          spend_30d: 3826,
          income_30d: 4200,
          net_cashflow_30d: 374,
          latest_balance_after: 230,
          avg_daily_spend_30d: 127.53,
          buffer_days_est: 1.8,
        },
        decision: {
          title: "Boost your buffer",
          message: "",
          steps: [
            "Look for small weekly cuts.",
            "Delay discretionary purchases this week.",
            "Reduce dining and takeaway until buffer improves.",
          ],
          patterns: [
            { type: "low_buffer", severity: "high", note: "Buffer is below 10 days goal." },
            { type: "weekly_overspending", severity: "medium", note: "Spend 7d is $670 vs weekly target $850." },
            { type: "low_savings", severity: "medium", note: "Net cashflow $374 vs savings target $600." },
          ],
        },
        channels: [
          {
            kind: "email",
            subject: "A gentle nudge to grow your financial buffer",
            body:
              "Hi Rohan,\n\nYour buffer is under 2 days, below your goal of 10 days. Try reviewing spend and delaying discretionary purchases this week.\n\nNot financial advice.",
          },
          {
            kind: "sms",
            text: "Your buffer is under 2 days. Review spend and delay non-essential buys to build a safety net. Not financial advice.",
          },
          {
            kind: "whatsapp",
            text: "Your buffer is low right now. Consider reviewing expenses and postponing non-urgent spending to grow it. Not financial advice.",
          },
          {
            kind: "inapp",
            title: "Build your buffer",
            message:
              "Your buffer is below your goal. Try small spending cuts or delay discretionary buys to increase your safety net. Not financial advice.",
          },
        ],
        pricingUSDPer1M: {
          input: 0.4,
          output: 1.6,
          note: "Prices per 1M tokens (USD).",
        },
      },
    ],
    []
  );

  const [selectedKey, setSelectedKey] = useState<ModelKey>("gpt-5.2-2025-12-11");
  const selectedRun = useMemo(() => runs.find((r) => r.key === selectedKey) || runs[0], [runs, selectedKey]);

  const costs = useMemo(() => {
    const byKey: Record<string, { inCost: number; outCost: number; total: number }> = {};
    runs.forEach((r) => {
      byKey[r.key] = estimateCostUSD(r);
    });
    return byKey;
  }, [runs]);

  const steps: Step[] = useMemo(() => {
    const c = selectedRun.computed;

    return [
      {
        key: "inputs",
        label: "1",
        kicker: "Inputs",
        title: "Sheet payload arrives",
        body: "A batch of transactions and user preferences enter the scenario. The point is consistency: same inputs go to every model run.",
        bullets: [
          "User context: goals, quiet hours, nudge frequency",
          "Transactions: amount, direction, category, posted_at, balance_after",
          "Window end date fixed so each model computes the same metrics",
        ],
        code: [
          { label: "Input rows (sample)", value: exampleRows.join("\n") },
          { label: "Run id", value: "usr_1-2026-01-22T06:14:51.458Z" },
        ],
        visual: {
          kind: "single",
          label: "Inputs snapshot",
          images: [{ src: "/amc-step1-inputs.png", alt: "Inputs flowing into a single run payload", caption: "Inputs" }],
        },
      },
      {
        key: "compute",
        label: "2",
        kicker: "Compute",
        title: "Metrics computed from raw transactions",
        body: "Deterministic metrics are calculated first. These do not change across models in this demo run.",
        bullets: [
          `Cash buffer: ${c.buffer_days_est.toFixed(1)} days (balance $${money(c.latest_balance_after)})`,
          `Spend (7d): $${money(c.spend_7d)} · Spend (30d): $${money(c.spend_30d)}`,
          `Income (30d): $${money(c.income_30d)} · Net cashflow: +$${money(c.net_cashflow_30d)}`,
          `Avg daily spend (30d): $${money(c.avg_daily_spend_30d)}`,
        ],
        visual: {
          kind: "duo",
          label: "Compute transition",
          images: [
            { src: "/amc-step1-inputs.png", alt: "Transactions snapshot before compute", caption: "Before" },
            { src: "/demo-step-2.png", alt: "Computed metrics snapshot after compute", caption: "After" },
          ],
        },
      },
      {
        key: "decide",
        label: "3",
        kicker: "Decide",
        title: "Model produces a single next action",
        body: "This is the difference between models: how specific the recommendation is, how runnable it is, and whether it contains constraints.",
        bullets: [
          "Problem pattern detection (severity and evidence)",
          "Title and message for one recommended action",
          "Optional steps list for execution guidance",
        ],
        visual: {
          kind: "single",
          label: "Decision card",
          images: [{ src: "/demo-step-3.png", alt: "Decision card preview", caption: "Decision" }],
        },
      },
      {
        key: "render",
        label: "4",
        kicker: "Render",
        title: "Same recommendation, formatted for each channel",
        body:
          "The model output is rendered into channel-specific payloads. In a real product, each channel has constraints (length, tone, CTA), so payload shape matters.",
        bullets: ["Email: subject + body", "SMS and WhatsApp: short, mobile-friendly", "In-app: title + message"],
        visual: {
          kind: "single",
          label: "Channel previews",
          images: [{ src: "/demo-step-4.png", alt: "Channel previews", caption: "Channel previews" }],
        },
      },
      {
        key: "trace",
        label: "5",
        kicker: "Trace",
        title: "Trace: run metadata",
        body: "This is the audit trail that makes the run reviewable in production logs.",
        bullets: [
          `Completion id: ${selectedRun.completionId}`,
          `Model: ${selectedRun.key}`,
          `Tokens: ${selectedRun.usage.total_tokens.toLocaleString()} (prompt ${selectedRun.usage.prompt_tokens.toLocaleString()}, output ${selectedRun.usage.completion_tokens.toLocaleString()})`,
          selectedRun.systemFingerprint ? `System fingerprint: ${selectedRun.systemFingerprint}` : "System fingerprint: n/a",
        ],
        visual: {
          kind: "single",
          label: "Trace preview",
          images: [{ src: "/step-5.png", alt: "Run trace log preview", caption: "Trace" }],
        },
      },
    ];
  }, [selectedRun, exampleRows]);

  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const stepStartRef = useRef<number>(0);
  const stepIdxRef = useRef<number>(0);
  const stepsLenRef = useRef<number>(0);
  const DURATION_MS = 5200;

  useEffect(() => {
    stepIdxRef.current = stepIdx;
  }, [stepIdx]);

  useEffect(() => {
    stepsLenRef.current = steps.length;
  }, [steps.length]);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = (t: number) => {
      if (!stepStartRef.current) stepStartRef.current = t;

      const elapsed = t - stepStartRef.current;

      if (elapsed >= DURATION_MS) {
        const len = stepsLenRef.current || steps.length || 1;
        const nextIdx = (stepIdxRef.current + 1) % len;

        stepStartRef.current = t;
        stepIdxRef.current = nextIdx;

        setStepIdx(nextIdx);
        setProgress(0);
      } else {
        setProgress(elapsed / DURATION_MS);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, steps.length]);

  // Reset on model change (prevents random skipping)
  useEffect(() => {
    stepStartRef.current = 0;
    stepIdxRef.current = 0;
    setStepIdx(0);
    setProgress(0);
  }, [selectedKey]);

  const step = steps[stepIdx];

  const goPrev = () => {
    const len = steps.length || 1;
    const next = (stepIdxRef.current - 1 + len) % len;
    stepStartRef.current = 0;
    stepIdxRef.current = next;
    setProgress(0);
    setStepIdx(next);
  };

  const goNext = () => {
    const len = steps.length || 1;
    const next = (stepIdxRef.current + 1) % len;
    stepStartRef.current = 0;
    stepIdxRef.current = next;
    setProgress(0);
    setStepIdx(next);
  };

  const stepStackStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  return (
    <section className="amc-demo">
      <div className="amc-demoPlayback">
        <div className="amc-demoPlaybackTop">
          <div>
            <div className="amc-demoPlaybackTitle">Run playback</div>
            <div className="amc-demoPlaybackHint">A single run, broken into steps, with a visual for each transition.</div>
          </div>

          <div className="amc-demoPlaybackRight">
            <div className="amc-demoPlaybackControls">
              <button className="amc-demoBtn" type="button" onClick={goPrev} aria-label="Previous step">
                ◀
              </button>
              <button className="amc-demoBtn" type="button" onClick={() => setIsPlaying((p) => !p)} aria-label="Play or pause">
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button className="amc-demoBtn" type="button" onClick={goNext} aria-label="Next step">
                ▶
              </button>
            </div>
          </div>
        </div>

        <div className="amc-demoStory" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)} role="region" aria-label="Step timeline">
          <div className="amc-demoStoryBars" aria-hidden="true">
            {steps.map((s, i) => {
              const isDone = i < stepIdx;
              const isNow = i === stepIdx;
              const w = isNow ? `${Math.round(clamp01(progress) * 100)}%` : isDone ? "100%" : "0%";
              return (
                <div key={s.key} className={"bar" + (isNow ? " is-now" : isDone ? " is-done" : "")}>
                  <span className="fill" style={{ width: w }} />
                </div>
              );
            })}
          </div>

          <div className="amc-demoStepCard">
            <div style={stepStackStyle}>
              <div>
                <div className="amc-demoStepTop">
                  <div className="amc-demoStepPill">
                    <span className="num">{step.label}</span>
                    <span className="kicker">{step.kicker}</span>
                  </div>
                  <div className="amc-demoStepTitle">{step.title}</div>
                </div>

                <div className="amc-demoStepBody">{step.body}</div>

                {!!step.bullets?.length && (
                  <ul className="amc-demoBullets">
                    {step.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {!!step.code?.length && (
                  <div className="amc-demoCodeGrid">
                    {step.code.map((c, i) => (
                      <div key={i} className="amc-demoCode">
                        <div className="lbl">{c.label}</div>
                        <pre className="mono">{c.value}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <StepVisuals visual={step.visual} />
            </div>
          </div>
        </div>
      </div>

      <div className="amc-demoCompareWrap" role="group" aria-label="Model comparison">
        <div className="amc-demoCompareHeader">
          <div className="amc-demoCompareHeaderLeft">
            <div className="amc-demoCompareEyebrow">Model comparison</div>
            <div className="amc-demoCompareTitle">Model comparison on identical inputs</div>
            <div className="amc-demoCompareHint">How recommendation quality changes across models</div>
          </div>
        </div>

        <div className="amc-demoCompareGrid">
          {runs.map((r) => {
            const isActive = r.key === selectedKey;

            const cost = costs[r.key];
            const costLabel = cost && cost.total > 0 ? `$${cost.total.toFixed(5)}` : "$0.00000";

            const msg = (r.decision.message || "").trim();
            const msgFirstLine = msg.length > 140 ? msg.slice(0, 140).trim() + "…" : msg;

            const promptTokens = r.usage.prompt_tokens || 0;
            const completionTokens = r.usage.completion_tokens || 0;
            const totalTokens = r.usage.total_tokens || promptTokens + completionTokens;

            const tone = r.verdict.tone || "ok";

            return (
              <button
                key={r.key}
                type="button"
                className={"amc-demoModelCard" + (isActive ? " is-active" : "")}
                onClick={() => setSelectedKey(r.key)}
                aria-label={`Select ${r.label}`}
              >
                <div className="amc-demoModelTopBar">
                  <span className={"amc-chip " + (isActive ? "amc-chip--solid" : "amc-chip--ghost")}>{isActive ? "Selected" : "Select"}</span>
                </div>

                <div className="amc-demoModelNameRow">
                  <div className="amc-demoModelName">
                    <span className="dot" aria-hidden="true" />
                    <span className="name">{r.label}</span>
                  </div>
                </div>

                <div className="amc-demoMetaRow">
                  <div className="amc-demoMetaBox" aria-label="Token usage">
                    <div className="k">Tokens</div>
                    <div className="v">{totalTokens.toLocaleString()}</div>
                    <div className="s">
                      Input {promptTokens.toLocaleString()} · Output {completionTokens.toLocaleString()}
                    </div>

                    <div className="amc-demoCostRow" aria-label="Estimated cost per run">
                      <span className="k2">Est cost</span>
                      <span className="v2">{costLabel}</span>
                      <span className="s2">per run</span>
                    </div>
                  </div>
                </div>

                <div className="amc-demoPrimary">
                  <div className="amc-demoPrimaryK">AI recommendation</div>
                  <div className="amc-demoPrimaryTitle">{r.decision.title}</div>
                  {!!msgFirstLine && <div className="amc-demoPrimarySub">{msgFirstLine}</div>}
                </div>

                <div className={"amc-demoVerdict amc-demoVerdict--" + tone}>
                  <div className="amc-demoVerdictK">Model Verdict</div>
                  <div className="amc-demoVerdictLabel">{r.verdict.label}</div>
                  <div className="amc-demoVerdictSummary">{r.verdict.summary}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="amc-demoChannelsBox">
        <div className="amc-demoChannelsHeader">
          <div className="amc-demoChannelsTitle">Channel payloads</div>
          <div className="amc-demoChannelsHint">Same recommendation, formatted for each channel.</div>
        </div>

        <div className="amc-demoChannelsGrid">
          {selectedRun.channels.map((ch, idx) => (
            <div key={idx} className="amc-demoChannel">
              <div className="amc-demoChannelTop">
                <span className="amc-chip amc-chip--ghost">{ch.kind}</span>
                <span className="amc-demoChannelMeta">Model: {selectedRun.label}</span>
              </div>

              {"subject" in ch && (
                <div className="amc-demoChannelSubject">
                  <span className="k">Subject</span>
                  <span className="v">{ch.subject}</span>
                </div>
              )}

              {"title" in ch && (
                <div className="amc-demoChannelSubject">
                  <span className="k">Title</span>
                  <span className="v">{ch.title}</span>
                </div>
              )}

              <div className="amc-demoChannelBody mono">{"body" in ch ? ch.body : "message" in ch ? ch.message : ch.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
