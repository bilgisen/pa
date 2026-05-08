import type { CollectionBeforeValidateHook } from 'payload'
import { toSlug } from '../utils/slug'

/**
 * generateSlug: title veya name alanından otomatik slug üretir.
 * - Slug alanı boşsa title/name'den türetir
 * - Slug alanı dolu ise (manuel override) dokunmaz
 * Gereksinimler: 1.2, 2.2, 3.1 (Authors slug from name)
 */
export const generateSlug: CollectionBeforeValidateHook = ({ data, operation, collection }) => {
  if (operation !== 'create' && operation !== 'update') return data
  if (data?.slug && data.slug.trim() !== '') return data

  // Authors koleksiyonu için name'den slug üret
  if (collection.slug === 'authors' && data?.name) {
    return {
      ...data,
      slug: toSlug(data.name),
    }
  }

  // News ve Blog koleksiyonları için title'dan slug üret
  if (collection.slug === 'news' || collection.slug === 'blog') {
    if (data?.title) {
      return {
        ...data,
        slug: toSlug(data.title),
      }
    }
  }

  return data
}
