import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import "@/features/ai-money-coach/ai-money-coach.css";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="contentsquare-tag"
          strategy="afterInteractive"
          src="https://t.contentsquare.net/uxa/4db637a313d77.js"
        />
      </head>

      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
