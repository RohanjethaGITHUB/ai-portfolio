import { CardSlot } from "../../features/floating-card/CardSlot";

export function HomeHero() {
  return (
    <section className="section" id="hero">
      <div className="wrap">
        <div className="hero-orbits" aria-hidden="true">
          <svg viewBox="0 0 800 800" className="orbits-svg" role="presentation">
            <g className="orbit orbit-a">
              <ellipse cx="400" cy="400" rx="300" ry="205" />
            </g>
            <g className="orbit orbit-b">
              <ellipse cx="400" cy="400" rx="330" ry="175" />
            </g>
            <g className="orbit orbit-c">
              <ellipse cx="400" cy="400" rx="250" ry="250" />
            </g>
            <g className="orbit orbit-d">
              <ellipse cx="400" cy="400" rx="360" ry="235" />
            </g>

            {/* moving nodes for stronger AI feel */}
            <g className="orbit-dot" style={{ animationDuration: "9s" }}>
              <circle cx="700" cy="400" r="6" />
            </g>

            <g className="orbit-dot is-cool" style={{ animationDuration: "13s" }}>
              <circle cx="400" cy="150" r="4" />
            </g>

            <g className="orbit-dot" style={{ animationDuration: "17s" }}>
              <circle cx="560" cy="620" r="5" />
            </g>
          </svg>
        </div>

        {/* subtle AI glow behind the hero card so the orbit layer reads better */}
        <div className="hero-aura" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-left">
            <div className="kicker">ROHAN JETHA</div>
            <h1 className="h1">ARTIFICIAL</h1>
          </div>

          <CardSlot imgSrc="/hero2.png" />

          <div className="hero-right">
            <h1 className="h1">INTELLIGENCE</h1>
            <p className="sub">
              I turn AI into a real, durable capability that compounds over time, not a side project that fades after a quarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
