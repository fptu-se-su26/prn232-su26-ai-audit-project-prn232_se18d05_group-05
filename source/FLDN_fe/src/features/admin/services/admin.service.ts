import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiResponse } from '@/types/api'
import type {
  AdminResetPasswordRequest,
  CategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  PagedResult,
  RejectSupplierRequest,
  SupplierDetailResponse,
  SupplierListRequest,
  SupplierListResponse,
  UpdateCategoryRequest,
  UpdateSupplierFeeRequest,
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
}
