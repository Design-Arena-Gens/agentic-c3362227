"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Collection } from '@/components/types';
import { listCollections } from '@/lib/db';

export default function CollectionsList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    listCollections().then(setCollections);
  }, []);
  return (
    <div className="mt-4">
      <div className="px-3 text-xs font-semibold uppercase text-gray-500">Collections</div>
      <ul className="mt-2 space-y-1 px-2">
        {collections.map((c) => (
          <li key={c.id}>
            <Link href={`/collections/${c.id}` as any} className="block truncate rounded px-3 py-1.5 text-sm hover:bg-gray-100">
              <span className="inline-block h-2 w-2 rounded-full align-middle mr-2" style={{ backgroundColor: c.color || '#93c5fd' }} />
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
