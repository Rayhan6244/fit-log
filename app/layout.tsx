import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, Inter } from "next/font/google";
import Store from "@/components/Store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today\u2019s plan, log every set.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <Store>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 sm:px-6">{children}</main>
          <Footer />
        </Store>
      </body>
    </html>
  );
}
