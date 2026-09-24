'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Workout } from '@/lib/api';

type StoreT = {
  plan: Workout[]; saved: Workout[]; done: string[]; ready: boolean;
  addPlan: (w: Workout) => void; addSaved: (w: Workout) => void;
  remove: (kind: 'plan' | 'saved', w: Workout) => void; markDone: (w: Workout) => void;
};
const Ctx = createContext<StoreT | null>(null);
export const useStore = () => useContext(Ctx) as StoreT;
export const CAP = 5;

export default function Store({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('fitlog') || '{}');
      setPlan(s.plan || []); setSaved(s.saved || []); setDone(s.done || []);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem('fitlog', JSON.stringify({ plan, saved, done }));
  }, [plan, saved, done, ready]);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(''), 2200);
    return () => clearTimeout(t);
  }, [msg]);

  const say = (m: string) => { setMsg(''); setTimeout(() => setMsg(m), 10); };

  const addPlan = (w: Workout) => {
    if (plan.some((x) => x.id === w.id)) return say('Already in today\u2019s plan');
    if (plan.length >= CAP) return say('Plan is full \u2014 5 lifts max');
    setPlan([...plan, w]); say('Added to today\u2019s plan');
  };
  const addSaved = (w: Workout) => {
    if (saved.some((x) => x.id === w.id)) return say('Already saved');
    setSaved([...saved, w]); say('Saved for later');
  };
  const remove = (kind: 'plan' | 'saved', w: Workout) => {
    if (kind === 'plan') setPlan(plan.filter((x) => x.id !== w.id));
    else setSaved(saved.filter((x) => x.id !== w.id));
    say('Removed from ' + (kind === 'plan' ? 'today\u2019s plan' : 'saved'));
  };
  const markDone = (w: Workout) => { setDone([...done, w.id]); say('Marked as done \u2014 nice work'); };

  return (
    <Ctx.Provider value={{ plan, saved, done, ready, addPlan, addSaved, remove, markDone }}>
      {children}
      {msg && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-lg">
          {msg}
        </div>
      )}
    </Ctx.Provider>
  );
}
