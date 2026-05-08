import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: 'Rol',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editör', value: 'editor' },
        { label: 'Yazar', value: 'author' },
      ],
      access: {
        // Yalnızca admin rol değiştirebilir
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'authorProfileId',
      type: 'text',
      label: 'Yazar Profil ID',
      admin: {
        description: 'Author rolü için Authors koleksiyonundaki kayıt ID\'si',
        condition: (data) => data?.role === 'author',
      },
    },
    {
      name: 'wpLogin',
      type: 'text',
      label: 'WordPress Login',
      admin: {
        description: 'WordPress dc:creator eşleştirmesi için (örn. guldem, caner)',
      },
    },
  ],
}
