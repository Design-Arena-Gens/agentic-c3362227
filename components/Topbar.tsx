"use client";
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') ?? '');

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set('q', q); else params.delete('q');
      // Using typedRoutes can make dynamic strings incompatible; cast for runtime navigation
      router.push(`${pathname}?${params.toString()}` as any);
    },
    [q, pathname, router, searchParams]
  );

  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-white p-3">
      <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search assets…"
          className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Search</button>
      </form>
      <Link href="/upload" className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">Upload</Link>
    </header>
  );
}
