import type { Workout } from '@/lib/api';

export const Stats = ({ w }: { w: Workout }) => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
    <span>⏱ {w.duration} min</span>
    <span>🔥 {w.calories} kcal</span>
    <span>⭐ {w.rating}</span>
  </div>
);
