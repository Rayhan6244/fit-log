const BASE = 'https://api.abcz.workers.dev/api/fitlog';

export type Workout = {
  id: string; title: string; description: string; image: string; categories: string[];
  equipment: string; difficulty: string; sets: string | number; reps: string | number;
  duration: number; calories: number; rating: number; instructions: string[];
};
export function norm(w: any): Workout {
  let cats: unknown = w.muscleGroups ?? w.categories ?? w.tags ?? w.category ?? w.muscles ?? [];
  if (!Array.isArray(cats)) cats = String(cats).split(',');
  let steps: unknown = w.instructions ?? w.steps ?? [];
  if (!Array.isArray(steps)) steps = String(steps).split(/\n|\./).filter(Boolean);
  return {
    id: String(w.id ?? w._id),
    title: w.title ?? w.name ?? 'Workout',
    description: w.description ?? w.subtitle ?? '',
    image: w.image ?? w.thumbnail ?? w.img ?? w.imageUrl ?? '',
    categories: (cats as unknown[]).map((c) => String(c).trim()).filter(Boolean),
    equipment: Array.isArray(w.equipment) ? w.equipment.join(', ') : w.equipment ?? '',
    difficulty: w.difficulty ?? w.level ?? '',
    sets: w.sets ?? '',
    reps: w.reps ?? '',
    duration: parseFloat(w.duration ?? w.minutes ?? 0) || 0,
    calories: parseFloat(w.caloriesBurned ?? w.calories ?? w.kcal ?? 0) || 0,
    rating: parseFloat(w.rating ?? 0) || 0,
    instructions: steps as string[],
  };
}
const list = (j: any): any[] => (Array.isArray(j) ? j : j.data ?? j.workouts ?? j.items ?? []);
export async function getAll(): Promise<Workout[]> {
  const r = await fetch(BASE);
  if (!r.ok) throw new Error('Failed to load');
  return list(await r.json()).map(norm);
}
export async function getOne(id: string): Promise<Workout> {
  const r = await fetch(`${BASE}/${id}`);
  if (!r.ok) throw new Error('Not found');
  const j = await r.json();
  return norm(j.data ?? j.workout ?? j);
}
