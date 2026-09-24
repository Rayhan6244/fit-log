"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/Store";
import logoImg from "../assets/logo.png";

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const { plan, saved } = useStore();
  const onPlan = pathname === "/my-plan";

  const active =
    "bg-[#1f2e05] text-[#a3e635] px-4 sm:px-5 py-1.5 rounded-full font-medium text-sm transition-all";
  const idle =
    "text-zinc-400 hover:text-white px-3 sm:px-4 py-1.5 text-sm font-medium transition-all";

  return (
    <header className="w-full bg-[#0a0a0a] text-white border-b border-zinc-800 px-4 sm:px-6 py-3">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="FITLOG Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="hidden sm:inline font-extrabold text-xl tracking-wider">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4 bg-zinc-900/60 p-1 rounded-full border border-zinc-800">
          <Link href="/" className={onPlan ? idle : active}>
            Workouts
          </Link>
          <Link href="/my-plan" className={onPlan ? active : idle}>
            My Plan
          </Link>
        </div>

        <Link
          href="/my-plan"
          className="flex items-center gap-4 sm:gap-6 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <span className="text-zinc-300">Plan</span>
            <span className="bg-[#a3e635] text-black font-bold min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs">
              {plan.length}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-zinc-300">Saved</span>
            <span className="border border-zinc-700 text-zinc-300 font-bold min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs">
              {saved.length}
            </span>
          </span>
        </Link>
      </nav>
    </header>
  );
}
