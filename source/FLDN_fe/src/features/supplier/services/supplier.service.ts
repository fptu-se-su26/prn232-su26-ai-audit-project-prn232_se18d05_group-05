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
  getCategories: async (): Promise<CategoryItem[]> => {
    try {
      const response = await api.get<ApiResponse<CategoryItem[]>>('/categories')
      const raw = response.data?.data
      if (Array.isArray(raw)) return raw
      return []
    } catch {
      return [
        { categoryId: 'f26c8af4-142a-4011-b4f6-4bf0216ce0e5', name: 'Rau củ quả tươi Đà Lạt' },
        { categoryId: 'cat-fruit-01', name: 'Trái cây tươi' },
        { categoryId: 'cat-meat-01', name: 'Thịt tươi sống' },
        { categoryId: 'cat-seafood-01', name: 'Thủy hải sản' },
      ]
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

  updateInventory: async (productId: string, quantity: number): Promise<void> => {
    await api.put(`/supplier/inventory/${productId}`, { quantity })
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

  confirmSupplyRequest: async (requestId: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${requestId}/confirm`)
  },

  rejectSupplyRequest: async (requestId: string, reason: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${requestId}/reject`, { reason })
  },
}
