'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getOne, type Workout } from '@/lib/api';
import { useStore, CAP } from '@/components/Store';
import NotFound from '@/app/not-found';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const { plan, addPlan, addSaved } = useStore();
  const [w, setW] = useState<Workout | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    getOne(id).then((d) => { setW(d); setState('ok'); }).catch(() => setState('error'));
  }, [id]);

  if (state === 'error') return <NotFound />;
  if (state === 'loading' || !w) return <p className="py-24 text-center text-neutral-400">Loading workout…</p>;

  const rows = [['Equipment', w.equipment], ['Difficulty', w.difficulty], ['Sets', w.sets], ['Reps', w.reps],
    ['Duration', `${w.duration} min`], ['Calories', `${w.calories} kcal`], ['Rating', w.rating]];
  const full = plan.length >= CAP && !plan.some((x) => x.id === w.id);

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <img src={w.image} alt={w.title} className="w-full rounded-2xl object-cover" />
      <div>
        <h1 className="font-display text-4xl font-bold uppercase text-white sm:text-5xl">{w.title}</h1>
        <p className="mt-2 text-neutral-400">{w.description}</p>
        <div className="mt-3 flex gap-2">{w.categories.map((c) => <span key={c} className="pill capitalize">{c}</span>)}</div>
        <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between px-5 py-3 text-sm">
              <dt className="text-xs uppercase tracking-wider text-neutral-400">{k}</dt><dd className="text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-8 font-display text-lg font-bold uppercase text-white">Instructions</h2>
        <ol className="mt-3 space-y-2 text-sm text-neutral-300">
          {w.instructions.map((s, i) => <li key={i}>{i + 1}. {s}</li>)}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="btn btn-primary" disabled={full} onClick={() => addPlan(w)}>📅 Add to today's plan</button>
          <button className="btn btn-outline" onClick={() => addSaved(w)}>🔖 Save for later</button>
        </div>
      </div>
    </div>
  );
}
