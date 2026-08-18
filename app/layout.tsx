import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "When Tomorrow Remembers — Book 1",
  description: "A secret archive for Aurelia Veyne's time-travel story.",
  metadataBase: new URL("https://when-tomorrow-remembers.com"),
  keywords: [
    "When Tomorrow Remembers",
    "time travel mystery",
    "science fiction romance",
    "Aurelia Veyne",
    "interactive story archive",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "When Tomorrow Remembers — Book 1",
    description: "Enter Aurelia Veyne's interactive time-travel archive.",
    type: "website",
    url: "https://when-tomorrow-remembers.com/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

