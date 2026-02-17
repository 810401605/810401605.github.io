import { API_DOMAIN, ASSET_PATH, LAYERS } from '../types';

export const cacheAllAssets = async (onProgress: (progress: number) => void): Promise<void> => {
  const cacheName = 'flastro-assets-v1';
  
  // Open cache
  const cache = await caches.open(cacheName);
  
  // Generate all possible URLs (11 layers * 12 signs = 132 images)
  const urlsToCache: string[] = [];
  
  LAYERS.forEach(layer => {
    for (let i = 1; i <= 12; i++) {
      urlsToCache.push(`${API_DOMAIN}${ASSET_PATH}${layer}${i}.png`);
    }
  });

  const total = urlsToCache.length;
  let completed = 0;

  // Fetch and cache each one
  // We do this in batches to avoid overwhelming the browser/network
  const batchSize = 5;
  
  for (let i = 0; i < total; i += batchSize) {
    const batch = urlsToCache.slice(i, i + batchSize);
    await Promise.all(batch.map(async (url) => {
      try {
        // Check if already cached
        const match = await cache.match(url);
        if (!match) {
          await cache.add(url);
        }
      } catch (e) {
        console.error(`Failed to cache ${url}`, e);
      } finally {
        completed++;
        onProgress(Math.round((completed / total) * 100));
      }
    }));
  }
};

export const getAssetUrl = (layer: string, index: number): string => {
  return `${API_DOMAIN}${ASSET_PATH}${layer}${index}.png`;
};