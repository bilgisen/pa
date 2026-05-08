import type { Access } from 'payload'

export type UserRole = 'admin' | 'editor' | 'author'

/**
 * isAdmin: Yalnızca admin rolüne sahip kullanıcılar tam erişime sahiptir.
 * Gereksinimler: 7.1, 7.2
 */
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

/**
 * isAdminOrEditor: Admin veya editor rolüne sahip kullanıcılar erişebilir.
 * Gereksinimler: 7.2, 7.3
 */
export const isAdminOrEditor: Access = ({ req }) =>
  ['admin', 'editor'].includes(req.user?.role ?? '')

/**
 * isAuthenticated: Kimliği doğrulanmış herhangi bir kullanıcı erişebilir.
 */
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

/**
 * adminOnly: Yalnızca admin silebilir.
 * Gereksinimler: 7.2
 */
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin'

/**
 * isOwnAuthorProfile: Admin/editor tam erişim; author yalnızca kendi kaydını görür.
 * Gereksinimler: 7.4, 7.5
 */
export const isOwnAuthorProfile: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  if (req.user.role === 'editor') return true
  if (req.user.role === 'author' && req.user.authorProfileId) {
    return {
      id: { equals: req.user.authorProfileId },
    }
  }
  return false
}

/**
 * publicReadPublished: Public kullanıcılar yalnızca published içeriği görür.
 * Admin/editor tüm içeriğe (draft dahil) erişebilir.
 * Gereksinimler: 7.2, 7.3
 */
export const publicReadPublished: Access = ({ req }) => {
  if (req.user?.role === 'admin' || req.user?.role === 'editor') return true
  return {
    status: { equals: 'published' },
  }
}
