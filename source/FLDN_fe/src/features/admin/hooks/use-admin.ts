import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/types/api'
import { adminService } from '../services/admin.service'
import type {
  AdminResetPasswordRequest,
  CreateCategoryRequest,
  CreateZoneRequest,
  LogisticsListRequest,
  RejectSupplierRequest,
  SupplierListRequest,
  UpdateCategoryRequest,
  UpdateSupplierFeeRequest,
  UpdateZoneRequest,
  UserListRequest,
} from '../types/admin.types'

const QUERY_KEYS = {
  users: (params?: UserListRequest) => ['admin', 'users', params] as const,
  user: (id: string) => ['admin', 'users', id] as const,
  suppliers: (params?: SupplierListRequest) => ['admin', 'suppliers', params] as const,
  supplier: (id: string) => ['admin', 'suppliers', id] as const,
  categories: ['admin', 'categories'] as const,
  dashboard: ['admin', 'dashboard'] as const,
  logistics: (params?: LogisticsListRequest) => ['admin', 'logistics', params] as const,
  logisticsOperator: (id: string) => ['admin', 'logistics', id] as const,
  zones: ['admin', 'zones'] as const,
  districts: ['admin', 'districts'] as const,
}

// ── Users ──────────────────────────────────────────────────────

export function useUsersQuery(params?: UserListRequest) {
  return useQuery({
    queryKey: QUERY_KEYS.users(params),
    queryFn: () => adminService.getUsers(params),
  })
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => adminService.getUserById(id),
    enabled: Boolean(id),
  })
}

export function useLockUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.lockUser(id),
    onSuccess: () => {
      toast.success('Đã khóa tài khoản')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể khóa tài khoản')
    },
  })
}

export function useUnlockUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.unlockUser(id),
    onSuccess: () => {
      toast.success('Đã mở khóa tài khoản')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể mở khóa tài khoản')
    },
  })
}

export function useResetUserPasswordMutation() {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AdminResetPasswordRequest }) =>
      adminService.resetUserPassword(id, body),
    onSuccess: () => toast.success('Đã reset mật khẩu'),
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể reset mật khẩu')
    },
  })
}

// ── Suppliers ──────────────────────────────────────────────────

export function useSuppliersQuery(params?: SupplierListRequest) {
  return useQuery({
    queryKey: QUERY_KEYS.suppliers(params),
    queryFn: () => adminService.getSuppliers(params),
  })
}

export function useSupplierQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.supplier(id),
    queryFn: () => adminService.getSupplierById(id),
    enabled: Boolean(id),
  })
}

export function useApproveSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.approveSupplier(id),
    onSuccess: () => {
      toast.success('Đã phê duyệt nhà cung cấp')
      queryClient.invalidateQueries({ queryKey: ['admin', 'suppliers'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể phê duyệt nhà cung cấp')
    },
  })
}

export function useRejectSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RejectSupplierRequest }) =>
      adminService.rejectSupplier(id, body),
    onSuccess: () => {
      toast.success('Đã từ chối hồ sơ')
      queryClient.invalidateQueries({ queryKey: ['admin', 'suppliers'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể từ chối hồ sơ')
    },
  })
}

export function useUpdateSupplierFeeMutation() {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateSupplierFeeRequest }) =>
      adminService.updateSupplierFee(id, body),
    onSuccess: () => toast.success('Đã cập nhật biểu phí'),
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể cập nhật biểu phí')
    },
  })
}

// ── Categories ─────────────────────────────────────────────────

export function useCategoriesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => adminService.getCategories(),
  })
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateCategoryRequest) => adminService.createCategory(body),
    onSuccess: () => {
      toast.success('Đã tạo danh mục')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể tạo danh mục')
    },
  })
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateCategoryRequest }) =>
      adminService.updateCategory(id, body),
    onSuccess: () => {
      toast.success('Đã cập nhật danh mục')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể cập nhật danh mục')
    },
  })
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.deleteCategory(id),
    onSuccess: () => {
      toast.success('Đã ẩn danh mục')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể ẩn danh mục')
    },
  })
}

// ── Dashboard ──────────────────────────────────────────────────

export function useDashboardQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: () => adminService.getDashboard(),
  })
}

// ── Logistics Operators ────────────────────────────────────────

export function useLogisticsQuery(params?: LogisticsListRequest) {
  return useQuery({
    queryKey: QUERY_KEYS.logistics(params),
    queryFn: () => adminService.getLogisticsOperators(params),
  })
}

export function useLogisticsOperatorQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.logisticsOperator(id),
    queryFn: () => adminService.getLogisticsOperatorById(id),
    enabled: Boolean(id),
  })
}

export function useActivateOperatorMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.activateOperator(id),
    onSuccess: () => {
      toast.success('Đã kích hoạt tài xế')
      queryClient.invalidateQueries({ queryKey: ['admin', 'logistics'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể kích hoạt')
    },
  })
}

export function useDeactivateOperatorMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.deactivateOperator(id),
    onSuccess: () => {
      toast.success('Đã vô hiệu hóa tài xế')
      queryClient.invalidateQueries({ queryKey: ['admin', 'logistics'] })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể vô hiệu hóa')
    },
  })
}

// ── Distribution Zones ─────────────────────────────────────────

export function useZonesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.zones,
    queryFn: () => adminService.getZones(),
  })
}

export function useDistrictsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.districts,
    queryFn: () => adminService.getDistricts(),
  })
}

export function useCreateZoneMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateZoneRequest) => adminService.createZone(body),
    onSuccess: () => {
      toast.success('Đã tạo vùng giao hàng')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.zones })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể tạo vùng')
    },
  })
}

export function useUpdateZoneMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateZoneRequest }) =>
      adminService.updateZone(id, body),
    onSuccess: () => {
      toast.success('Đã cập nhật vùng giao hàng')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.zones })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể cập nhật vùng')
    },
  })
}

export function useDeleteZoneMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.deleteZone(id),
    onSuccess: () => {
      toast.success('Đã xóa vùng giao hàng')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.zones })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể xóa vùng')
    },
  })
}
