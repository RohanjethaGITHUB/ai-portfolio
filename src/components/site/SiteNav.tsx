"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuKey = "portfolio" | "teardowns" | "systems" | null;

export function SiteNav() {
  const [open, setOpen] = useState<MenuKey>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(null);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const toggle = (key: MenuKey) => setOpen((v) => (v === key ? null : key));

  return (
    <div className="siteNavWrap" ref={rootRef}>
      <nav className="siteNav" aria-label="Primary">
        <Link className="siteNavLink" href="/">
          Home
        </Link>

        <div
            className="siteNavItem"
            onMouseEnter={() => setOpen("portfolio")}
            onMouseLeave={() => setOpen(null)}
            >
          <button
            type="button"
            className="siteNavBtn"
            aria-haspopup="menu"
            aria-expanded={open === "portfolio"}
            onClick={() => setOpen((v) => (v === "portfolio" ? null : "portfolio"))}
          >
            Portfolio <span className={`chev ${open === "portfolio" ? "isOpen" : ""}`}>▾</span>
          </button>

          {open === "portfolio" ? (
            <div className="menu menuLvl1" role="menu">
              <div className="menuRow">
                <button
                  type="button"
                  className="menuBtn"
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={open === "teardowns"}
                  onMouseEnter={() => setOpen("teardowns")}
                  onFocus={() => setOpen("teardowns")}
                  onClick={() => toggle("teardowns")}
                >
                  Company Tear Downs <span className="menuArrow">›</span>
                </button>

                {open === "teardowns" ? (
                  <div className="menu menuLvl2" role="menu">
                    <Link className="menuLink" role="menuitem" href="/portfolio/company-teardowns/marlee">
                      Marlee
                    </Link>
                    <Link className="menuLink" role="menuitem" href="/portfolio/company-teardowns/google">
                      Google
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="menuRow">
                <button
                  type="button"
                  className="menuBtn"
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={open === "systems"}
                  onMouseEnter={() => setOpen("systems")}
                  onFocus={() => setOpen("systems")}
                  onClick={() => toggle("systems")}
                >
                  AI Systems Built <span className="menuArrow">›</span>
                </button>

                {open === "systems" ? (
                  <div className="menu menuLvl2" role="menu">
                    <Link className="menuLink" role="menuitem" href="/portfolio/ai-systems/ai-money-coach">
                      AI Money Coach
                    </Link>
                    <Link className="menuLink" role="menuitem" href="/portfolio/ai-systems/ai-personalized-lead-gen">
                      AI Personalized Lead Gen
                    </Link>
                    <Link className="menuLink" role="menuitem" href="/portfolio/ai-systems/ai-end-to-end-recruiter">
                      AI End-to-End Recruiter
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <Link className="siteNavLink" href="/about">
          About
        </Link>

        <Link className="siteNavCta" href="/contact">
          Contact
        </Link>
      </nav>
    </div>
  );
}
