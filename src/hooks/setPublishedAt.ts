import type { CollectionBeforeChangeHook } from 'payload'

/**
 * setPublishedAt: draft → published geçişinde publishedAt otomatik atanır.
 * - publishedAt boşsa ve status 'published' ise: UTC zamanını ata
 * - publishedAt dolu ise: mevcut değeri koru
 * Gereksinimler: 1.4
 */
export const setPublishedAt: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (data?.status !== 'published') return data
  if (data?.publishedAt || originalDoc?.publishedAt) return data
  return {
    ...data,
    publishedAt: new Date().toISOString(),
  }
}
