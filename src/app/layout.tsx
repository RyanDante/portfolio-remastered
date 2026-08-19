import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CommandPalette from "@/components/ui/CommandPalette";
import { SITE } from "@/data/site";

// ── Fonts ──────────────────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Ryan Dante — Principal Engineer & Systems Architect",
    template: "%s | Ryan Dante",
  },
  description:
    "Portfolio of Ryan Dante — Principal Software Engineer specialising in distributed systems, AI integration, security, and high-performance computing.",
  keywords: [
    "Software Engineer",
    "Portfolio",
    "Distributed Systems",
    "AI",
    "Next.js",
    "TypeScript",
    "Rust",
    "Go",
  ],
  authors: [{ name: "Ryan Dante" }],
  creator: "Ryan Dante",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ryandante.dev",
    title: "Ryan Dante — Principal Engineer",
    description:
      "Cyberpunk-themed portfolio of a Principal Software Engineer building distributed systems, AI tools, and security-first products.",
    siteName: "Ryan Dante Portfolio",
    images: [{ url: SITE.images.ogImage, width: 1200, height: 630, alt: "Ryan Dante" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Dante — Principal Engineer",
    description: "Principal SE portfolio — distributed systems, AI, security.",
    images: [SITE.images.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <CommandPalette />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

