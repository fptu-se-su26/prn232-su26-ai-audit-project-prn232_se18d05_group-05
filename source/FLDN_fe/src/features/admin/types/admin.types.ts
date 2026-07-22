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
  status: SupplierStatus
  createdAt: string
}

export interface SupplierDetailResponse {
  supplierId: string
  businessName: string
  taxCode?: string
  licenseNumber?: string
  attpCertificateUrl?: string
  status: SupplierStatus
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
