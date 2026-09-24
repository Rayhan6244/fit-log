'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/components/Store';
import type { Workout } from '@/lib/api';
import { Stats } from '@/components/Stats';

type Tab = 'plan' | 'saved';
const sorters: Record<string, (a: Workout, b: Workout) => number> = {
  Duration: (a, b) => a.duration - b.duration,
  Calories: (a, b) => a.calories - b.calories,
  Rating: (a, b) => b.rating - a.rating,
};

export default function MyPlan() {
  const { plan, saved, done, ready, remove, markDone } = useStore();
  const [tab, setTab] = useState<Tab>('plan');
  const [sort, setSort] = useState('Duration');

  const list = [...(tab === 'plan' ? plan : saved)].sort(sorters[sort]);
  const sum = (k: 'duration' | 'calories') => plan.reduce((s, w) => s + w[k], 0);
  const tabBtn = (id: Tab, label: string) => (
    <button onClick={() => setTab(id)} className={`rounded-lg px-4 py-1.5 text-sm ${tab === id ? 'bg-white/10 font-semibold text-white' : 'text-neutral-400'}`}>{label}</button>
  );

  return (
    <div className="mt-8">
      <h1 className="font-display text-4xl font-bold uppercase text-white">My Plan</h1>
      <p className="mt-1 text-sm text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-card p-5">
        {([['Exercises', plan.length, true], ['Minutes', sum('duration')], ['Calories', sum('calories')]] as [string, number, boolean?][]).map(([l, v, a]) => (
          <div key={l} className="px-3 first:pl-0">
            <p className="text-xs text-neutral-400 sm:text-sm">{l}</p>
            <p className={`font-display text-3xl font-bold sm:text-5xl ${a ? 'text-accent' : 'text-white'}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex rounded-xl border border-line bg-card p-1">{tabBtn('plan', "Today's Plan")}{tabBtn('saved', 'Saved')}</div>
        <label className="flex items-center gap-2 text-sm text-neutral-400">Sort By
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-line bg-card px-3 py-1.5 text-white">
            {Object.keys(sorters).map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>

      {!ready ? (
        <p className="py-16 text-center text-neutral-400">Loading workouts…</p>
      ) : list.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-line py-16 text-center">
          <h2 className="font-display text-2xl font-bold uppercase text-white">Nothing here yet</h2>
          <p className="mt-2 text-sm text-neutral-400">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn btn-primary mt-5">Go to workouts</Link>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {list.map((w) => {
            const isDone = tab === 'plan' && done.includes(w.id);
            return (
              <li key={w.id} className={`flex flex-col gap-4 rounded-xl border border-line bg-card p-3 sm:flex-row sm:items-center ${isDone ? 'opacity-60' : ''}`}>
                <img src={w.image} alt="" className="h-20 w-full rounded-lg object-cover sm:w-32" />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold uppercase text-white">{w.title}</h3>
                  <p className="mb-1 text-xs text-neutral-400">{w.equipment}</p>
                  <Stats w={w} />
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/workout/${w.id}`} className="btn btn-outline">View Details</Link>
                  {tab === 'plan' && (
                    <button className="btn btn-primary" disabled={isDone} onClick={() => markDone(w)}>✓ {isDone ? 'Done' : 'Mark as Done'}</button>
                  )}
                  <button aria-label="Remove" className="px-2 text-neutral-400 hover:text-white" onClick={() => remove(tab, w)}>✕</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
