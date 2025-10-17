"use client";
import { useEffect, useMemo, useState } from 'react';
import type { Asset, Comment } from '@/components/types';
import { addComment, getAsset, getComments, putAsset } from '@/lib/db';
import { formatBytes } from '@/lib/utils';

export default function AssetDetailClient({ id }: { id: string }) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    getAsset(id).then((a) => a && setAsset(a));
    getComments(id).then(setComments);
  }, [id]);

  const onAddTag = async () => {
    if (!asset) return;
    const tag = tagInput.trim();
    if (!tag) return;
    const updated: Asset = { ...asset, tags: Array.from(new Set([...asset.tags, tag])) };
    await putAsset(updated);
    setAsset(updated);
    setTagInput('');
  };

  const onRemoveTag = async (tag: string) => {
    if (!asset) return;
    const updated: Asset = { ...asset, tags: asset.tags.filter((t) => t !== tag) };
    await putAsset(updated);
    setAsset(updated);
  };

  const onAddComment = async () => {
    if (!asset) return;
    const body = commentBody.trim();
    if (!body) return;
    const comment: Comment = {
      id: Math.random().toString(36).slice(2),
      assetId: asset.id,
      author: 'You',
      body,
      createdAt: Date.now(),
    };
    await addComment(comment);
    setComments((c) => [comment, ...c]);
    setCommentBody('');
  };

  const preview = useMemo(() => {
    if (!asset) return null;
    if (asset.type === 'image') return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset.blobUrl} alt={asset.name} className="max-h-[60vh] w-auto rounded border object-contain" />
    );
    if (asset.type === 'video') return (
      <video src={asset.blobUrl} className="max-h-[60vh] w-auto rounded border" controls playsInline />
    );
    if (asset.type === 'pdf') return (
      <iframe src={asset.blobUrl} className="h-[60vh] w-full rounded border" />
    );
    return <div className="flex h-64 items-center justify-center rounded border">No preview</div>;
  }, [asset]);

  if (!asset) return <div>Loading…</div>;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-3 text-xl font-semibold">{asset.name}</div>
        {preview}
      </div>
      <div className="space-y-6">
        <section>
          <div className="mb-2 text-sm font-semibold uppercase text-gray-500">Details</div>
          <div className="space-y-1 text-sm text-gray-700">
            <div><span className="text-gray-500">Type:</span> {asset.type}</div>
            <div><span className="text-gray-500">Size:</span> {formatBytes(asset.sizeBytes)}</div>
            {asset.width && asset.height && (
              <div><span className="text-gray-500">Dimensions:</span> {asset.width}×{asset.height}</div>
            )}
            {asset.durationSec && (
              <div><span className="text-gray-500">Duration:</span> {asset.durationSec.toFixed(2)}s</div>
            )}
          </div>
        </section>
        <section>
          <div className="mb-2 text-sm font-semibold uppercase text-gray-500">Tags</div>
          <div className="flex flex-wrap gap-2">
            {asset.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
                {t}
                <button onClick={() => onRemoveTag(t)} className="text-gray-500 hover:text-gray-700">×</button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 rounded border px-2 py-1" placeholder="Add tag" />
            <button onClick={onAddTag} className="rounded bg-gray-900 px-2 py-1 text-white">Add</button>
          </div>
        </section>
        <section>
          <div className="mb-2 text-sm font-semibold uppercase text-gray-500">Comments</div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input value={commentBody} onChange={(e) => setCommentBody(e.target.value)} className="flex-1 rounded border px-2 py-1" placeholder="Write a comment" />
              <button onClick={onAddComment} className="rounded bg-brand-600 px-3 py-1 text-white">Post</button>
            </div>
            <ul className="space-y-2">
              {comments.map((c) => (
                <li key={c.id} className="rounded border p-2">
                  <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()} — {c.author}</div>
                  <div className="text-sm">{c.body}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
