"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAll, type Workout } from "@/lib/api";
import { Stats } from "@/components/stats";
import Image from "next/image";
import logoImg from "../assets/banner.png";

export default function Home() {
  const [items, setItems] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    getAll()
      .then(setItems)
      .catch(() => setErr("Could not load workouts. Try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mt-8 grid items-center gap-8 rounded-2xl border border-line bg-card p-6 sm:p-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight text-white sm:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-md text-neutral-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <a href="#library" className="btn btn-primary mt-6">
            BROWSE WORKOUTS ↓
          </a>
        </div>
        <Image
          src={logoImg}
          alt="Workout illustration"
          priority
          className="mx-auto h-auto max-h-[320px] w-full object-contain"
        />
      </section>

      <section id="library" className="mt-14 scroll-mt-6">
        <h2 className="font-display text-3xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Twelve lifts covering every major muscle group.
        </p>

        {loading && (
          <div className="flex justify-center py-20" aria-label="Loading">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
          </div>
        )}
        {err && <p className="py-10 text-center text-red-400">{err}</p>}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w) => (
            <Link
              key={w.id}
              href={`/workout/${w.id}`}
              className="group overflow-hidden rounded-xl border border-line bg-card transition hover:border-accent/60"
            >
              <img
                src={w.image}
                alt={w.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="space-y-2 p-4">
                <div className="flex flex-wrap gap-1.5">
                  {w.categories.map((c) => (
                    <span key={c} className="pill">
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white">
                  {w.title}
                </h3>
                <p className="text-xs text-neutral-400">{w.equipment}</p>
                <div className="border-t border-line pt-3">
                  <Stats w={w} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
