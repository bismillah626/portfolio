import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP, Orbitron } from "next/font/google";
import Navbar from "@/components/Navbar";
import AmbientCanvas from "@/components/AmbientCanvas";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-red-xi-76.vercel.app"),
  title: {
    default: "Bismillah Khan // AI/ML Engineer",
    template: "%s // Bismillah Khan",
  },
  description:
    "AI/ML Engineer building modular, scalable systems and high-accuracy predictive models.",
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bismillah Khan // AI/ML Engineer",
    description:
      "AI/ML Engineer building modular, scalable systems and high-accuracy predictive models.",
    type: "website",
    url: "https://portfolio-red-xi-76.vercel.app",
    siteName: "Bismillah Khan Portfolio",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Bismillah Khan AI/ML Engineer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bismillah Khan // AI/ML Engineer",
    description:
      "AI/ML Engineer building modular, scalable systems and high-accuracy predictive models.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${notoSansJp.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="page-shell">
            <div className="site-background" aria-hidden="true" />
            <AmbientCanvas />
            <Navbar />
            <div>
              <PageTransition>
                {children}
              </PageTransition>
            </div>
            <Footer />
            <Chatbot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
