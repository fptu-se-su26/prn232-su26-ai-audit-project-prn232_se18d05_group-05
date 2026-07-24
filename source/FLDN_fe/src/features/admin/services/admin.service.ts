import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiResponse } from '@/types/api'
import type {
  AdminDashboardResponse,
  AdminResetPasswordRequest,
  CategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  CreateZoneRequest,
  DistrictResponse,
  DistributionZoneResponse,
  LogisticsDetailResponse,
  LogisticsListRequest,
  LogisticsListResponse,
  PagedResult,
  RejectSupplierRequest,
  SupplierDetailResponse,
  SupplierListRequest,
  SupplierListResponse,
  UpdateCategoryRequest,
  UpdateSupplierFeeRequest,
  UpdateZoneRequest,
  UserListRequest,
  UserResponse,
} from '../types/admin.types'

export const adminService = {
  // Users
  getUsers: (params?: UserListRequest) =>
    api
      .get<ApiResponse<PagedResult<UserResponse>>>(API_ENDPOINTS.admin.users, { params })
      .then((r) => r.data),

  getUserById: (id: string) =>
    api
      .get<ApiResponse<UserResponse>>(API_ENDPOINTS.admin.user(id))
      .then((r) => r.data),

  lockUser: (id: string) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.lockUser(id))
      .then((r) => r.data),

  unlockUser: (id: string) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.unlockUser(id))
      .then((r) => r.data),

  resetUserPassword: (id: string, body: AdminResetPasswordRequest) =>
    api
      .post<ApiResponse<unknown>>(API_ENDPOINTS.admin.resetUserPassword(id), body)
      .then((r) => r.data),

  // Suppliers
  getSuppliers: (params?: SupplierListRequest) =>
    api
      .get<ApiResponse<PagedResult<SupplierListResponse>>>(API_ENDPOINTS.admin.suppliers, { params })
      .then((r) => r.data),

  getSupplierById: (id: string) =>
    api
      .get<ApiResponse<SupplierDetailResponse>>(API_ENDPOINTS.admin.supplier(id))
      .then((r) => r.data),

  approveSupplier: (id: string) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.approveSupplier(id))
      .then((r) => r.data),

  rejectSupplier: (id: string, body: RejectSupplierRequest) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.rejectSupplier(id), body)
      .then((r) => r.data),

  updateSupplierFee: (id: string, body: UpdateSupplierFeeRequest) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.supplierFee(id), body)
      .then((r) => r.data),

  // Categories
  getCategories: () =>
    api
      .get<ApiResponse<CategoryResponse[]>>(API_ENDPOINTS.admin.categories)
      .then((r) => r.data),

  createCategory: (body: CreateCategoryRequest) =>
    api
      .post<ApiResponse<CreateCategoryResponse>>(API_ENDPOINTS.admin.categories, body)
      .then((r) => r.data),

  updateCategory: (id: string, body: UpdateCategoryRequest) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.category(id), body)
      .then((r) => r.data),

  deleteCategory: (id: string) =>
    api
      .delete<ApiResponse<unknown>>(API_ENDPOINTS.admin.category(id))
      .then((r) => r.data),

  // Dashboard
  getDashboard: () =>
    api
      .get<ApiResponse<AdminDashboardResponse>>(API_ENDPOINTS.admin.dashboard)
      .then((r) => r.data),

  // Logistics Operators
  getLogisticsOperators: (params?: LogisticsListRequest) =>
    api
      .get<ApiResponse<PagedResult<LogisticsListResponse>>>(API_ENDPOINTS.admin.logistics, { params })
      .then((r) => r.data),

  getLogisticsOperatorById: (id: string) =>
    api
      .get<ApiResponse<LogisticsDetailResponse>>(API_ENDPOINTS.admin.logisticsOperator(id))
      .then((r) => r.data),

  activateOperator: (id: string) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.activateOperator(id))
      .then((r) => r.data),

  deactivateOperator: (id: string) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.deactivateOperator(id))
      .then((r) => r.data),

  // Distribution Zones
  getZones: () =>
    api
      .get<ApiResponse<DistributionZoneResponse[]>>(API_ENDPOINTS.admin.zones)
      .then((r) => r.data),

  getDistricts: () =>
    api
      .get<ApiResponse<DistrictResponse[]>>(API_ENDPOINTS.admin.districts)
      .then((r) => r.data),

  createZone: (body: CreateZoneRequest) =>
    api
      .post<ApiResponse<DistributionZoneResponse>>(API_ENDPOINTS.admin.zones, body)
      .then((r) => r.data),

  updateZone: (id: string, body: UpdateZoneRequest) =>
    api
      .put<ApiResponse<unknown>>(API_ENDPOINTS.admin.zone(id), body)
      .then((r) => r.data),

  deleteZone: (id: string) =>
    api
      .delete<ApiResponse<unknown>>(API_ENDPOINTS.admin.zone(id))
      .then((r) => r.data),
}
