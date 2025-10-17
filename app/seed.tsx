"use client";
import { useEffect } from 'react';
import { listAssets, listCollections, putCollection } from '@/lib/db';
import { uid } from '@/lib/utils';

export default function SeedOnFirstRun() {
  useEffect(() => {
    (async () => {
      const [assets, collections] = await Promise.all([listAssets(), listCollections()]);
      if (assets.length === 0 && collections.length === 0) {
        const now = Date.now();
        await Promise.all([
          putCollection({ id: uid('col'), name: 'Q4 Launch', color: '#93c5fd', createdAt: now, updatedAt: now, assetIds: [] }),
          putCollection({ id: uid('col'), name: 'Brand Guidelines', color: '#fca5a5', createdAt: now, updatedAt: now, assetIds: [] }),
        ]);
      }
    })();
  }, []);
  return null;
}
