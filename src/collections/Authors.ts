import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isOwnAuthorProfile, adminOnly } from '../access/roles'
import { preventAuthorDelete } from '../hooks/preventDeleteIfHasContent'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'displayOrder', 'updatedAt'],
  },
  access: {
    read: isOwnAuthorProfile,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: adminOnly,
  },
  hooks: {
    beforeDelete: [preventAuthorDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Ad Soyad',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'URL-safe benzersiz tanımlayıcı (örn. evren-bolgun)',
      },
    },
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'Kısa Biyografi',
    },
    {
      name: 'longBio',
      type: 'richText',
      label: 'Uzun Biyografi',
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Profil Fotoğrafı',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Sosyal Medya Linkleri',
      fields: [
        { name: 'twitter', type: 'text', label: 'Twitter/X' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn' },
        { name: 'facebook', type: 'text', label: 'Facebook' },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      index: true,
      label: 'Gösterim Sırası',
      admin: {
        description: "Frontend'de yazar listesi sıralaması için (küçük sayı önce gelir)",
      },
    },
  ],
}
