export type AssetType = 'image' | 'video' | 'pdf' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  sizeBytes: number;
  createdAt: number;
  updatedAt: number;
  blobUrl: string; // object URL for preview
  collectionIds: string[];
  tags: string[];
  description?: string;
  width?: number;
  height?: number;
  durationSec?: number;
  checksum?: string;
}

export interface Collection {
  id: string;
  name: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
  assetIds: string[];
}

export interface Comment {
  id: string;
  assetId: string;
  author: string;
  body: string;
  createdAt: number;
}
