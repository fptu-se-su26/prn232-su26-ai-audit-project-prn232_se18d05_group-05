export const DISTRIBUTION_POINT_TYPES = ['Market', 'Supermarket', 'RetailStore', 'Canteen'] as const

export type DistributionPointType = (typeof DISTRIBUTION_POINT_TYPES)[number]

export const DISTRIBUTION_POINT_TYPE_LABELS_VI: Record<DistributionPointType, string> = {
  Market: 'Chợ',
  Supermarket: 'Siêu thị',
  RetailStore: 'Cửa hàng bán lẻ',
  Canteen: 'Bếp ăn tập thể',
}

export interface DistributionPointProfile {
  profileId: string
  userId: string
  pointName: string
  pointType: DistributionPointType
  capacity: number
  capacityUnit?: string | null
  address?: string | null
  districtId?: string | null
  districtName?: string | null
  contactPerson?: string | null
  contactPhone?: string | null
  operatingHours?: string | null
  createdAt: string
}

export interface UpsertDistributionPointProfilePayload {
  pointName: string
  pointType: DistributionPointType
  capacity: number
  capacityUnit?: string
  address?: string
  districtId?: string | null
  contactPerson?: string
  contactPhone?: string
  operatingHours?: string
}
