import { api } from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type {
  CategoryItem,
  CreateBatchInput,
  CreateProductInput,
  PagedResult,
  SupplierBatch,
  SupplierProduct,
  SupplierSupplyRequest,
  UpdateProductInput,
} from '../types/supplier.types'

const extractItems = <T>(data: PagedResult<T> | T[] | undefined | null): T[] => {
  if (!data) return []
  if (Array.isArray(data)) return data
  if ('items' in data && Array.isArray(data.items)) return data.items
  return []
}

export const supplierService = {
  // Synchronized 100% with real Backend DB Categories created by Admin
  getCategories: async (): Promise<CategoryItem[]> => {
    try {
      // Try public /categories first
      const res = await api.get<ApiResponse<CategoryItem[] | PagedResult<CategoryItem>>>('/categories')
      const items = extractItems(res.data?.data)
      if (items.length > 0) return items

      // Try admin categories endpoint if public endpoint is empty
      const adminRes = await api.get<ApiResponse<CategoryItem[] | PagedResult<CategoryItem>>>('/admin/categories')
      const adminItems = extractItems(adminRes.data?.data)
      return adminItems
    } catch {
      try {
        const adminRes = await api.get<ApiResponse<CategoryItem[] | PagedResult<CategoryItem>>>('/admin/categories')
        return extractItems(adminRes.data?.data)
      } catch {
        return []
      }
    }
  },

  getProducts: async (): Promise<SupplierProduct[]> => {
    const response = await api.get<ApiResponse<PagedResult<SupplierProduct> | SupplierProduct[]>>('/supplier/products')
    return extractItems(response.data.data)
  },

  createProduct: async (data: CreateProductInput): Promise<SupplierProduct> => {
    const response = await api.post<ApiResponse<SupplierProduct>>('/supplier/products', data)
    return response.data.data
  },

  updateProduct: async (id: string, data: UpdateProductInput): Promise<void> => {
    await api.put(`/supplier/products/${id}`, data)
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/supplier/products/${id}`)
  },

  getInventory: async (): Promise<SupplierProduct[]> => {
    const response = await api.get<ApiResponse<PagedResult<SupplierProduct> | SupplierProduct[]>>('/supplier/inventory')
    return extractItems(response.data.data)
  },

  getBatches: async (): Promise<SupplierBatch[]> => {
    const response = await api.get<ApiResponse<PagedResult<SupplierBatch> | SupplierBatch[]>>('/supplier/batches')
    return extractItems(response.data.data)
  },

  createBatch: async (data: CreateBatchInput): Promise<SupplierBatch> => {
    const response = await api.post<ApiResponse<SupplierBatch>>('/supplier/batches', data)
    return response.data.data
  },

  getSupplyRequests: async (): Promise<SupplierSupplyRequest[]> => {
    const response = await api.get<ApiResponse<PagedResult<SupplierSupplyRequest> | SupplierSupplyRequest[]>>('/supplier/supply-requests')
    return extractItems(response.data.data)
  },

  confirmSupplyRequest: async (id: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${id}/confirm`)
  },

  rejectSupplyRequest: async (id: string, reason: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${id}/reject`, { reason })
  },
}
