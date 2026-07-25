export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SupplierProduct {
  id?: string
  productId?: string
  categoryId: string
  categoryName?: string
  name: string
  description?: string
  unitCost: number
  unit: string
  packagingStandard?: string
  isActive: boolean
  quantity?: number
  reservedQty?: number
  availableQuantity?: number
  createdAt?: string
}

export interface SupplierBatch {
  id?: string
  batchId?: string
  productId: string
  productName?: string
  batchCode: string
  quantity: number
  remainingQty: number
  harvestDate: string
  manufacturingDate?: string
  packagingDate?: string
  expiryDate: string
  growingRegion?: string
  certificateType?: string
  certificateUrl?: string
  qrCodeUrl?: string
  qrCodeData?: string
}

export interface SupplierSupplyRequest {
  id?: string
  requestId?: string
  requestNumber?: string
  distributionPointName: string
  distributionPointAddress?: string
  productName: string
  quantity: number
  unit: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'InTransit' | 'Completed'
  requestedDeliveryDate: string
  notes?: string
}

export interface CreateProductInput {
  categoryId: string
  name: string
  description?: string
  unitCost: number
  unit: string
  packagingStandard?: string
}

export interface CreateBatchInput {
  productId: string
  batchCode: string
  quantity: number
  harvestDate: string
  expiryDate: string
  growingRegion?: string
  certificateType?: number
  certificateUrl?: string
}
