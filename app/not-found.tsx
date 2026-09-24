import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase text-white">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-400">That lift isn't in the library.</p>
      <Link href="/" className="btn btn-primary mt-6">Go to workouts</Link>
    </div>
  );
}
