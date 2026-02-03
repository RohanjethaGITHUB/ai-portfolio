import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.shell}>
        <div className={styles.inner}>
          <div className={styles.top}>
            {/* Email */}
            <div className={styles.block}>
              <div className={styles.label}>Email :</div>
              <a className={styles.value} href="mailto:contact@RohanJetha.me">
                Contact@RohanJetha.me
              </a>
            </div>

            {/* Call */}
            <div className={styles.blockCenter}>
              <div className={styles.label}>Call Today :</div>
              <a className={styles.value} href="tel:+61400000000">
                +61 426 836 741
              </a>
            </div>

            {/* Social */}
            <div className={styles.blockRight}>
              <div className={styles.label}>Social :</div>
              <div className={styles.social}>
                <a
                  className={styles.iconBtn}
                  href="https://www.linkedin.com/in/rohan-jetha-1fb13415133/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  in
                </a>
                {/* <a
                  className={styles.iconBtn}
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  gh
                </a> */}
                {/* <a
                  className={styles.iconBtn}
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  yt
                </a>
                <a
                  className={styles.iconBtn}
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  title="X"
                >
                  x
                </a> */}
              </div>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.bottom}>
            <div className={styles.copy}>
              © {year}. All Rights Reserved by{" "}
              <a className={styles.link} href="/" aria-label="Home">
                Rohan Jetha
              </a>
            </div>

            <div className={styles.created}>
              <span className={styles.createdLabel}>Website created and maintained by</span>
              <span className={styles.avatar} aria-hidden="true">
                RJ
              </span>
              <a
                className={styles.link}
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                Rohan Jetha
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
