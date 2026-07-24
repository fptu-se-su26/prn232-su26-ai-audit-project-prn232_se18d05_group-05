export type SupplierStatus = 'Pending' | 'Approved' | 'Rejected'

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PagedRequest {
  page?: number
  pageSize?: number
}

// ── Users ──────────────────────────────────────────────────────
export interface UserResponse {
  userId: string
  fullName: string
  email: string
  phone: string
  role?: string
  isActive: boolean
  createdAt: string
}

export interface UserListRequest extends PagedRequest {
  role?: string
  isActive?: boolean
}

export interface AdminResetPasswordRequest {
  newPassword: string
}

// ── Suppliers ──────────────────────────────────────────────────
export interface SupplierListResponse {
  supplierId: string
  businessName: string
  taxCode?: string
  status: SupplierStatus
  createdAt: string
}

export interface SupplierDetailResponse {
  supplierId: string
  businessName: string
  taxCode?: string
  licenseNumber?: string
  attpCertificateUrl?: string
  address?: string
  status: SupplierStatus
  rejectedReason?: string
  approvedByName?: string
  approvedAt?: string
  serviceFeeRate: number
  discountRate: number
}

export interface SupplierListRequest extends PagedRequest {
  status?: SupplierStatus
}

export interface RejectSupplierRequest {
  reason: string
}

export interface UpdateSupplierFeeRequest {
  serviceFeeRate: number
  discountRate: number
}

// ── Categories ─────────────────────────────────────────────────
export interface CategoryResponse {
  categoryId: string
  name: string
  description?: string
  imageUrl?: string
  parentCategoryId?: string
  isActive: boolean
  children: CategoryResponse[]
}

export interface CreateCategoryRequest {
  name: string
  description?: string
  imageUrl?: string
  parentCategoryId?: string
}

export interface UpdateCategoryRequest {
  name: string
  description?: string
  imageUrl?: string
  isActive: boolean
}

export interface CreateCategoryResponse {
  categoryId: string
  name: string
}

// ── Dashboard ──────────────────────────────────────────────────
export interface AdminDashboardResponse {
  totalUsers: number
  lockedUsers: number
  totalSuppliers: number
  pendingSuppliers: number
  approvedSuppliers: number
  rejectedSuppliers: number
  totalLogisticsOperators: number
  availableOperators: number
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  totalRevenue: number
  totalZones: number
  activeZones: number
}

// ── Logistics Operators ────────────────────────────────────────
export type LogisticsOperatorStatus = 'Available' | 'InTransit' | 'Off'

export interface LogisticsListResponse {
  logisticsId: string
  fullName: string
  email: string
  phone?: string
  vehicleType?: string
  licensePlate?: string
  status: LogisticsOperatorStatus
  totalShipments: number
  createdAt: string
}

export interface LogisticsDetailResponse {
  logisticsId: string
  fullName: string
  email: string
  phone?: string
  identityCard?: string
  vehicleType?: string
  licensePlate?: string
  status: LogisticsOperatorStatus
  totalShipments: number
  approvedByName?: string
  approvedAt?: string
  createdAt: string
}

export interface LogisticsListRequest extends PagedRequest {
  status?: LogisticsOperatorStatus
}

// ── Distribution Zones ─────────────────────────────────────────
export interface DistributionZoneResponse {
  zoneId: string
  zoneName: string
  description?: string
  shippingFee: number
  isActive: boolean
  districtId: string
  districtName: string
}

export interface DistrictResponse {
  districtId: string
  name: string
  code: string
}

export interface CreateZoneRequest {
  districtId: string
  zoneName: string
  description?: string
  shippingFee: number
}

export interface UpdateZoneRequest {
  zoneName: string
  description?: string
  shippingFee: number
  isActive: boolean
}
