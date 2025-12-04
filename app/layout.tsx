import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Improper Brewery | Gulf Breeze's Rebellious New Brewery (Coming 2026)",
  description: "Proudly brewed outside Gulf Breeze Proper. Join the Improper 500 for lifetime discounts and first access.",
  openGraph: {
    title: "Improper Brewery | Gulf Breeze's Rebellious New Brewery",
    description: "Proudly brewed outside Gulf Breeze Proper. Join the Improper 500 for lifetime discounts and first access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} font-body`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

