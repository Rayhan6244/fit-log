import React from "react";
import Image from "next/image";
import logoImg from "../assets/logo.png"; // Set your logo image path here

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-400 border-t border-zinc-800 px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6">
            <Image
              src={logoImg}
              alt="FITLOG Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Right Side: Copyright & Tagline text */}
        <div className="text-sm text-zinc-400 font-normal">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </div>
      </div>
    </footer>
  );
}
