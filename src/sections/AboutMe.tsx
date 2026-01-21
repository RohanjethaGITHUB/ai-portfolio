import { CardSlot } from "../components/CardSlot";

export function AboutMe() {
  return (
    <section className="section" id="about">
      <div className="wrap two-col flip">
        <div className="col-visual">
          <CardSlot imgSrc="/rohan.png" />
        </div>

        <div className="col-text">
          <div className="mini-kicker">ABOUT</div>
          <h2 className="h2">Builder mindset, product clarity</h2>
          <p className="p">
            I care about two things: making decisions obvious, and shipping systems that hold up in
            the real world.
          </p>

          <div className="about-blocks">
            <div className="about-card">
              <div className="about-title">How I work</div>
              <div className="about-body">
                Start with the user journey, pick a single decision to improve, then build the
                smallest system that moves the metric.
              </div>
            </div>

            <div className="about-card">
              <div className="about-title">What I optimize for</div>
              <div className="about-body">
                Reliability, speed to value, and clean interfaces. If it needs constant babysitting,
                it is not done.
              </div>
            </div>

            <div className="about-card">
              <div className="about-title">Where I add leverage</div>
              <div className="about-body">
                Turning messy requirements into a crisp plan, then executing with automation and
                strong UX details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
