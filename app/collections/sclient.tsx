"use client";
import { useEffect, useState } from 'react';
import type { Asset, Collection } from '@/components/types';
import { listAssets, listCollections, putCollection, putAsset, deleteCollection } from '@/lib/db';
import { uid } from '@/lib/utils';

export default function CollectionsClient() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    Promise.all([listCollections(), listAssets()]).then(([cs, as]) => { setCollections(cs); setAssets(as); });
  }, []);

  const createCollection = async () => {
    const name = newName.trim();
    if (!name) return;
    const col: Collection = {
      id: uid('col'),
      name,
      color: randomColor(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      assetIds: [],
    };
    await putCollection(col);
    setCollections((c) => [...c, col]);
    setNewName('');
  };

  const remove = async (id: string) => {
    await deleteCollection(id);
    setCollections((c) => c.filter((x) => x.id !== id));
  };

  const moveAsset = async (assetId: string, toCollectionId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    if (!asset) return;
    const updated: Asset = { ...asset, collectionIds: Array.from(new Set([...(asset.collectionIds || []), toCollectionId])) };
    await putAsset(updated);
    setAssets((as) => as.map((a) => a.id === assetId ? updated : a));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4">
        <div className="text-lg font-semibold">New collection</div>
        <div className="flex gap-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} className="flex-1 rounded border px-2 py-1" placeholder="Collection name" />
          <button onClick={createCollection} className="rounded bg-brand-600 px-3 py-1 text-white">Create</button>
        </div>
        <ul className="space-y-2">
          {collections.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded border p-2">
              <div className="truncate"><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c.color || '#93c5fd' }} />{c.name}</div>
              <button onClick={() => remove(c.id)} className="text-sm text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-2">
        <div className="mb-2 text-lg font-semibold">Assets</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Collections</th>
              <th className="p-2">Add to</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.type}</td>
                <td className="p-2">{collections.filter((c) => a.collectionIds.includes(c.id)).map((c) => c.name).join(', ')}</td>
                <td className="p-2">
                  <select className="rounded border px-2 py-1" onChange={(e) => e.target.value && moveAsset(a.id, e.target.value)} defaultValue="">
                    <option value="" disabled>Choose…</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function randomColor() {
  const colors = ['#93c5fd', '#fca5a5', '#86efac', '#fef08a', '#fdba74', '#c4b5fd'];
  return colors[Math.floor(Math.random() * colors.length)];
}
