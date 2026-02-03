"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TopMenu = "portfolio" | null;

function isPathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const [openTop, setOpenTop] = useState<TopMenu>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() || "/";

  const closeTimerRef = useRef<number | null>(null);
  const isTouchRef = useRef(false);

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
  };

  useEffect(() => {
    const mqHoverNone = window.matchMedia("(hover: none)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    isTouchRef.current = mqHoverNone.matches || mqCoarse.matches;

    const update = () => {
      isTouchRef.current = mqHoverNone.matches || mqCoarse.matches;
    };

    mqHoverNone.addEventListener("change", update);
    mqCoarse.addEventListener("change", update);
    return () => {
      mqHoverNone.removeEventListener("change", update);
      mqCoarse.removeEventListener("change", update);
    };
  }, []);

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
    if (isTouchRef.current) return;
    clearCloseTimer();
    setOpenTop("portfolio");
  }

  function scheduleClose(ms = 120) {
    if (isTouchRef.current) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenTop(null);
      closeTimerRef.current = null;
    }, ms);
  }

  function togglePortfolio() {
    clearCloseTimer();
    setOpenTop((v) => (v === "portfolio" ? null : "portfolio"));
  }

  useEffect(() => {
    function onDocPointerDown(e: PointerEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) closeAll();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }

    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Active states
  const isHome = isPathActive(pathname, "/");
  const isAbout = isPathActive(pathname, "/about");
  const isContact = isPathActive(pathname, "/contact");

  // Portfolio should be active for any child route under portfolio or company-teardowns
  const isPortfolio =
    isPathActive(pathname, "/portfolio") || isPathActive(pathname, "/company-teardowns");

  const topIsOpen = openTop === "portfolio";

  return (
    <div
      className="siteNavWrap"
      ref={rootRef}
      data-portfolio-open={topIsOpen ? "true" : "false"}
    >
      <nav className="siteNav" aria-label="Primary">
        <Link
          className={`siteNavLink ${isHome ? "isActive" : ""}`}
          href="/"
          style={linkStyle}
        >
          Home
        </Link>

        {/* Portfolio */}
        <div
          className="siteNavItem"
          onMouseEnter={openPortfolio}
          onMouseLeave={() => scheduleClose(140)}
        >
          <button
            type="button"
            className={`siteNavBtn ${isPortfolio ? "isActive" : ""}`}
            aria-haspopup="menu"
            aria-expanded={topIsOpen}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePortfolio();
            }}
          >
            Portfolio <span className={`chev ${topIsOpen ? "isOpen" : ""}`}>▾</span>
          </button>

          <div
            className={`megaMenu ${topIsOpen ? "isOpen" : "isClosed"}`}
            role="menu"
            aria-label="Portfolio"
            onMouseEnter={openPortfolio}
            onMouseLeave={() => scheduleClose(140)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="megaGrid">
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
                    href="/company-teardowns/bambooHR"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">BambooHR</span>
                    <span className="megaLinkArrow">›</span>
                  </Link>

                  {/* <Link
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
                  </Link> */}
                </div>
              </div>

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

                  {/* <Link
                    className="megaLink"
                    role="menuitem"
                    href="/portfolio/influencer-discovery"
                    onClick={closeAll}
                    style={linkStyle}
                  >
                    <span className="megaLinkTitle">Influencer Discovery (dummy)</span>
                    <span className="megaLinkArrow">›</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          className={`siteNavLink ${isAbout ? "isActive" : ""}`}
          href="/about"
          style={linkStyle}
        >
          About
        </Link>

        {/* Contact CTA: only looks "CTA highlighted" when active */}
        {/* <Link
          className={`siteNavCta ${isContact ? "isActive" : ""}`}
          href="/contact"
          style={linkStyle}
        >
          Contact
        </Link> */}
      </nav>
    </div>
  );
}
