"use client";
import { useCallback, useState } from 'react';
import { extToType, uid } from '@/lib/utils';
import type { Asset } from '@/components/types';
import { putAsset } from '@/lib/db';

export default function UploadClient() {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onFiles = useCallback(async (files: FileList | File[]) => {
    const errs: string[] = [];
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const blobUrl = URL.createObjectURL(file);
        const asset: Asset = {
          id: uid('asset'),
          name: file.name,
          type: extToType(file.name),
          sizeBytes: file.size,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          blobUrl,
          collectionIds: [],
          tags: [],
          description: '',
        };
        if (asset.type === 'image') {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => { asset.width = img.width; asset.height = img.height; resolve(); };
            img.src = blobUrl;
          });
        }
        if (asset.type === 'video') {
          await new Promise<void>((resolve) => {
            const v = document.createElement('video');
            v.onloadedmetadata = () => { asset.durationSec = v.duration; resolve(); };
            v.src = blobUrl;
          });
        }
        await putAsset(asset);
      }
    } catch (e: any) {
      errs.push(String(e?.message || e));
    } finally {
      setBusy(false);
      setErrors(errs);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
  }, [onFiles]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onFiles(e.target.files);
  }, [onFiles]);

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex h-64 items-center justify-center rounded border-2 border-dashed"
      >
        <div className="text-center">
          <div className="mb-2 text-lg font-semibold">Drag & drop assets</div>
          <div className="text-sm text-gray-500">Images, videos and PDFs</div>
          <div className="mt-4">
            <label className="inline-block cursor-pointer rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
              <input type="file" multiple className="hidden" onChange={onChange} accept="image/*,video/*,application/pdf" />
              Select files
            </label>
          </div>
          {busy && <div className="mt-3 text-sm text-gray-600">Uploading…</div>}
          {errors.length > 0 && (
            <ul className="mt-3 list-disc text-left text-sm text-red-600">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
