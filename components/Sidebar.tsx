import Link from 'next/link';
import CollectionsList from './sidebar/CollectionsList';

export default function Sidebar() {
  return (
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
        <CollectionsList />
      </nav>
      <div className="p-4 text-sm text-gray-500">Google Drive for brands</div>
    </aside>
  );
}
