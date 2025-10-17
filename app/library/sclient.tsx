"use client";
import { useEffect, useMemo, useState } from 'react';
import type { Asset } from '@/components/types';
import { listAssets } from '@/lib/db';
import { useSearchParams } from 'next/navigation';
import { AssetCard } from '@/components/ui/AssetCard';

export default function LibraryClient() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const sp = useSearchParams();
  const q = sp.get('q')?.toLowerCase() ?? '';

  useEffect(() => {
    listAssets().then(setAssets);
  }, []);

  const filtered = useMemo(() => {
    if (!q) return assets;
    return assets.filter((a) =>
      a.name.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      (a.description?.toLowerCase().includes(q) ?? false)
    );
  }, [assets, q]);

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="text-gray-500">No assets yet. Try uploading some files.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}
