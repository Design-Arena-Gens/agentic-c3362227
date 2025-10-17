import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        <aside className="hidden md:flex w-64 flex-col border-r bg-gray-50">
          <div className="p-4 text-xl font-semibold">air.inc</div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              <li>
                <Link href="/library" className="block rounded px-3 py-2 hover:bg-gray-100">Library</Link>
              </li>
              <li>
                <Link href="/collections" className="block rounded px-3 py-2 hover:bg-gray-100">Collections</Link>
              </li>
              <li>
                <Link href="/upload" className="block rounded px-3 py-2 hover:bg-gray-100">Upload</Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 text-sm text-gray-500">Google Drive for brands</div>
        </aside>
        <section className="flex-1">
          <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-white p-3">
            <input placeholder="Search assets…" className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500" />
            <Link href="/upload" className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Upload</Link>
          </header>
          <div className="p-6">
            <h1 className="mb-2 text-2xl font-semibold">Welcome</h1>
            <p className="text-gray-600">Start by visiting your <Link className="text-brand-600 underline" href="/library">Library</Link> or creating <Link className="text-brand-600 underline" href="/collections">Collections</Link>.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
