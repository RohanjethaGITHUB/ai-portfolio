"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TopMenu = "portfolio" | null;

export function SiteNav() {
  const [openTop, setOpenTop] = useState<TopMenu>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const closeTimerRef = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function closeAll() {
    clearCloseTimer();
    setOpenTop(null);
  }

  function openPortfolio() {
    clearCloseTimer();
    setOpenTop("portfolio");
  }

  function scheduleClose(ms = 120) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenTop(null);
      closeTimerRef.current = null;
    }, ms);
  }

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) closeAll();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const topIsOpen = openTop === "portfolio";

  // Treat both /portfolio/* and /company-teardowns/* as Portfolio routes
  const isPortfolioRoute =
    pathname?.startsWith("/portfolio") || pathname?.startsWith("/company-teardowns");

  const isAboutRoute = pathname === "/about";
  const isHomeRoute = pathname === "/";
  const isContactRoute = pathname === "/contact";

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
  };

  const btnReset: React.CSSProperties = {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    margin: 0,
    font: "inherit",
    color: "inherit",
    lineHeight: "inherit",
    cursor: "pointer",
  };

  return (
    <div
      className="siteNavWrap"
      ref={rootRef}
      data-portfolio-open={topIsOpen ? "true" : "false"}
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "max-content",
      }}
      onMouseEnter={() => clearCloseTimer()}
      onMouseLeave={() => scheduleClose(140)}
    >
      <nav className="siteNav" aria-label="Primary">
        <Link
          className={`siteNavLink ${isHomeRoute ? "isActive" : ""}`}
          href="/"
          style={linkStyle}
        >
          Home
        </Link>

        {/* Portfolio */}
        <div
          className="siteNavItem"
          style={{ position: "relative" }}
          onMouseEnter={() => openPortfolio()}
          onMouseLeave={() => scheduleClose(140)}
        >
          <button
            type="button"
            className={`siteNavBtn ${isPortfolioRoute ? "isActive" : ""}`}
            aria-haspopup="menu"
            aria-expanded={topIsOpen}
            onMouseEnter={() => openPortfolio()}
            onFocus={() => openPortfolio()}
            onClick={() => {
              setOpenTop((v) => (v === "portfolio" ? null : "portfolio"));
            }}
            style={{ ...btnReset }}
          >
            Portfolio <span className={`chev ${topIsOpen ? "isOpen" : ""}`}>▾</span>
          </button>

          {/* 2-column mega menu */}
          <div
            className={`megaMenu ${topIsOpen ? "isOpen" : "isClosed"}`}
            role="menu"
            aria-label="Portfolio"
            onMouseEnter={() => openPortfolio()}
            onMouseLeave={() => scheduleClose(140)}
          >
            <div className="megaGrid">
              {/* Column 1 */}
              <div className="megaCol">
                <div className="megaHeading">Company Tear Downs</div>
                <div className="megaLinks">
                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/company-teardowns/razorpay"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Razorpay</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/company-teardowns/google"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Google</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/company-teardowns/stripe"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Stripe (dummy)</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/company-teardowns/canva"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Canva (dummy)</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div className="megaCol">
                <div className="megaHeading">AI Systems Built</div>
                <div className="megaLinks">
                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/ai-money-coach"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">AI Money Coach</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/ai-lead-gen"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">AI Personalized Lead Gen</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/ai-end-to-end-recruiter"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">AI End-to-End Recruiter</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/influencer-discovery"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Influencer Discovery (dummy)</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          className={`siteNavLink ${isAboutRoute ? "isActive" : ""}`}
          href="/about"
          style={linkStyle}
        >
          About
        </Link>

        <Link
          className={`siteNavCta ${isContactRoute ? "isActive" : "isGhost"}`}
          href="/contact"
          style={linkStyle}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
