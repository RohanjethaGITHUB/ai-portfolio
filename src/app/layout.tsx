import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import "@/features/ai-money-coach/ai-money-coach.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
