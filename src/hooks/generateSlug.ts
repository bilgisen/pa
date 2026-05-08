import type { CollectionBeforeValidateHook } from 'payload'
import { toSlug } from '../utils/slug'

/**
 * generateSlug: title alanından otomatik slug üretir.
 * - Slug alanı boşsa title'dan türetir
 * - Slug alanı dolu ise (manuel override) dokunmaz
 * Gereksinimler: 1.2, 2.2
 */
export const generateSlug: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation !== 'create' && operation !== 'update') return data
  if (data?.slug && data.slug.trim() !== '') return data
  if (data?.title) {
    return {
      ...data,
      slug: toSlug(data.title),
    }
  }
  return data
}
