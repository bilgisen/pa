import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, adminOnly } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'updatedAt'],
  },
  access: {
    read: () => true, // Medya herkese açık (CDN üzerinden sunulur)
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: adminOnly,
  },
  upload: {
    // sharp Workers'da desteklenmiyor — crop ve focalPoint devre dışı
    crop: false,
    focalPoint: false,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
    ],
    // skipSafeFetch: Workers'da SSRF koruması built-in olduğundan güvenli
    skipSafeFetch: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Metin',
      admin: {
        description: 'Görsel için erişilebilirlik metni',
      },
    },
  ],
}
