"use client";

import { CardSlot } from "../../features/floating-card/CardSlot";

const STEPS = [
  {
    num: "01",
    title: "Start with the decision",
    desc: "Define the decision the business needs to make, and what success looks like in plain terms.",
    tags: ["Outcome first", "Scope", "Success metric"],
  },
  {
    num: "02",
    title: "Design the system, not the prompt",
    desc: "Map data inputs, logic, guardrails, and outputs. Make it reliable before it is clever.",
    tags: ["Data flow", "Guardrails", "Fallbacks"],
  },
  {
    num: "03",
    title: "Ship small, learn fast",
    desc: "Release a thin slice, measure accuracy and cost, then iterate based on real usage.",
    tags: ["MVP", "Evaluation", "Cost control"],
  },
  {
    num: "04",
    title: "Own it in production",
    desc: "Add monitoring, retries, human override, and clear accountability so it survives reality.",
    tags: ["Monitoring", "Retries", "Human in loop"],
  },
];

export function HowIBuildAISystems() {
  return (
    <section className="section cardSectionBg" id="how-i-build-ai">
      <div className="wrap two-col howBuildGrid">
        <div className="col-text">
          <h2 className="h2 h2-tight">How I Build AI Systems</h2>

          <p className="p p-tight howBuildLead">
            I focus on systems that run inside the business. Real workflows, real decisions, real feedback loops.
          </p>

          <div className="howBuildSteps" role="list">
            {STEPS.map((s) => (
              <div key={s.num} className="howBuildStep" role="listitem">
                <div className="howBuildStepTop">
                  <div className="howBuildNum">{s.num}</div>
                  <div className="howBuildTitle">{s.title}</div>
                </div>

                <div className="howBuildDesc">{s.desc}</div>

                <div className="howBuildTags" aria-hidden="true">
                  {s.tags.map((t) => (
                    <span key={t} className="howBuildTag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-visual howBuildVisual">
          <div className="howBuildVisualBox">
            <div className="howBuildVisualTitle">System shape</div>
            <div className="howBuildFlow" aria-hidden="true">
              <div className="howBuildNode">Inputs</div>
              <div className="howBuildArrow">→</div>
              <div className="howBuildNode">Logic</div>
              <div className="howBuildArrow">→</div>
              <div className="howBuildNode">Guardrails</div>
              <div className="howBuildArrow">→</div>
              <div className="howBuildNode">Outputs</div>
            </div>

            <div className="howBuildFlowSub" aria-hidden="true">
              Monitoring • Retries • Human override • Cost and latency constraints
            </div>
          </div>

          {/* This anchor lets your traveling spring card lock onto this section */}
          <CardSlot imgSrc="/how-build.png" />
        </div>
      </div>
    </section>
  );
}
