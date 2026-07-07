import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import AtmosphereParticles from "@/components/AtmosphereParticles";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";
import LampToggle from "@/components/LampToggle";
import ThemeBackground from "@/components/ThemeBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bismillah Khan — AI/ML Engineer",
  description:
    "Portfolio of Bismillah Khan, an AI/ML Engineer specializing in LLM-driven systems, NLP pipelines, and high-accuracy predictive models.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "LangChain",
    "NLP",
    "LLM",
    "Portfolio",
    "Bismillah Khan",
  ],
  authors: [{ name: "Bismillah Khan" }],
  openGraph: {
    title: "Bismillah Khan — AI/ML Engineer",
    description:
      "AI/ML Engineer building modular, scalable systems and high-accuracy predictive models.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            {/* ===== BACKGROUND (switches with theme) ===== */}
            <ThemeBackground />

            <AtmosphereParticles />
            <Sidebar />
            <LampToggle />

            <main className="relative z-20">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
