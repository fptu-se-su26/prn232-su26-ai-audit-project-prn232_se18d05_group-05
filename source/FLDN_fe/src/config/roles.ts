export const USER_ROLES = {
  Admin: 'Admin',
  Supplier: 'Supplier',
  DistributionPoint: 'DistributionPoint',
  LogisticsOperator: 'LogisticsOperator',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const ROLE_LABELS_VI: Record<UserRole, string> = {
  [USER_ROLES.Admin]: 'Quản trị viên',
  [USER_ROLES.Supplier]: 'Nhà cung cấp',
  [USER_ROLES.DistributionPoint]: 'Điểm phân phối',
  [USER_ROLES.LogisticsOperator]: 'Vận hành logistics',
}
