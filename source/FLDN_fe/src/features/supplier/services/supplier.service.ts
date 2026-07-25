import { api } from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type {
  CreateBatchInput,
  CreateProductInput,
  PagedResult,
  SupplierBatch,
  SupplierProduct,
  SupplierSupplyRequest,
} from '../types/supplier.types'

const extractItems = <T>(data: PagedResult<T> | T[] | undefined | null): T[] => {
  if (!data) return []
  if (Array.isArray(data)) return data
  if ('items' in data && Array.isArray(data.items)) return data.items
  return []
}

export const supplierService = {
  getProducts: async (): Promise<SupplierProduct[]> => {
    const response = await api.get<ApiResponse<PagedResult<SupplierProduct> | SupplierProduct[]>>('/supplier/products')
    return extractItems(response.data.data)
  },

  createProduct: async (data: CreateProductInput): Promise<SupplierProduct> => {
    const response = await api.post<ApiResponse<SupplierProduct>>('/supplier/products', data)
    return response.data.data
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

  confirmSupplyRequest: async (requestId: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${requestId}/confirm`)
  },

  rejectSupplyRequest: async (requestId: string, reason: string): Promise<void> => {
    await api.put(`/supplier/supply-requests/${requestId}/reject`, { reason })
  },
}
