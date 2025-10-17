"use client";
import Link from 'next/link';
import type { Asset } from '@/components/types';
import { formatBytes } from '@/lib/utils';

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link href={`/asset/${asset.id}`} className="group block overflow-hidden rounded border bg-white shadow-sm hover:shadow">
      <div className="aspect-square w-full bg-gray-100">
        {asset.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset.blobUrl} alt={asset.name} className="h-full w-full object-cover" />
        ) : asset.type === 'video' ? (
          <video src={asset.blobUrl} className="h-full w-full object-cover" muted playsInline />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">{asset.type.toUpperCase()}</div>
        )}
      </div>
      <div className="space-y-0.5 p-2">
        <div className="truncate text-sm font-medium" title={asset.name}>{asset.name}</div>
        <div className="text-xs text-gray-500">{formatBytes(asset.sizeBytes)}</div>
      </div>
    </Link>
  );
}
