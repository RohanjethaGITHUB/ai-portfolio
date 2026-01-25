import { CardSlot } from "../../features/floating-card/CardSlot";

export function AboutMe() {
  return (
    <section className="section" id="about">
      <div className="wrap two-col flip">
        <div className="col-visual">
          <CardSlot imgSrc="/rohan-j.png" />
        </div>

        <div className="col-text">
          {/* Title + intro (matches reference structure) */}
          <h2 className="h2">ABOUT ME</h2>

          <p className="p">
            Hi, I am Rohan, a product focused builder working at the intersection of UX, automation,
            and AI. I care about crafting meaningful and impactful digital experiences that hold up
            in the real world.
          </p>

          {/* Stats row (3 columns) */}
          <div className="aboutRefStats">
            <div className="aboutRefStat">
              <div className="aboutRefStatNum">10+</div>
              <div className="aboutRefStatLabel">Years of Experience</div>
            </div>

            <div className="aboutRefStat">
              <div className="aboutRefStatNum">50+</div>
              <div className="aboutRefStatLabel">Automations Shipped</div>
            </div>

            <div className="aboutRefStat">
              <div className="aboutRefStatNum">20+</div>
              <div className="aboutRefStatLabel">Case Studies and Builds</div>
            </div>
          </div>

          {/* Contact row (2 columns) */}
          <div className="aboutRefContact">
            <div className="aboutRefContactItem">
              <div className="aboutRefContactTitle">Call Today :</div>
              <div className="aboutRefContactValue">+61 (000) 000 000</div>
            </div>

            <div className="aboutRefContactItem">
              <div className="aboutRefContactTitle">Email :</div>
              <div className="aboutRefContactValue">rohan@yourdomain.com</div>
            </div>
          </div>

          {/* Social icons row
          <div className="aboutRefSocials" aria-label="Social links">
            <a className="aboutRefSocial" href="#" aria-label="X">
              X
            </a>
            <a className="aboutRefSocial" href="#" aria-label="Instagram">
              IG
            </a>
            <a className="aboutRefSocial" href="#" aria-label="Behance">
              Be
            </a>
            <a className="aboutRefSocial" href="#" aria-label="Dribbble">
              Db
            </a>
          </div> */}

          {/* Button */}
          <a className="aboutRefBtn" href="https://www.linkedin.com/in/rohan-jetha-1fb13415133/">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
