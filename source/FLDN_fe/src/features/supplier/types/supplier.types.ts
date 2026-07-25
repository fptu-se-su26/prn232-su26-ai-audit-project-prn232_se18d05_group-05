export interface CategoryItem {
  categoryId: string
  id?: string
  name: string
  description?: string
}

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  pageNumber?: number
  pageSize?: number
  totalPages?: number
}

export interface SupplierProduct {
  id?: string
  productId?: string
  categoryId?: string
  categoryName?: string
  name: string
  description?: string
  unitCost?: number
  unit?: string
  packagingStandard?: string
  isActive?: boolean
  availableQuantity?: number
  quantity?: number
  createdAt?: string
}

export interface SupplierBatch {
  id?: string
  batchId?: string
  batchCode: string
  productId: string
  productName?: string
  quantity: number
  remainingQty?: number
  harvestDate?: string
  expiryDate?: string
  status?: string | number
  qrCodeUrl?: string
}

export interface SupplierSupplyRequestItem {
  productId: string
  productName: string
  batchId?: string
  batchCode?: string
  quantity: number
  unitPrice?: number
  subTotal?: number
}

export interface SupplierSupplyRequest {
  supplyRequestId?: string
  id?: string
  requestId?: string
  distributionPointName: string
  status: string | number
  confirmationStatus?: string | number
  requestedDeliveryDate?: string
  supplierSubTotal?: number
  note?: string
  items?: SupplierSupplyRequestItem[]
  productName?: string
  quantity?: number
  createdAt?: string
}

export interface CreateProductInput {
  categoryId: string
  name: string
  description?: string
  unitCost: number
  unit: string
  packagingStandard?: string
}

export interface UpdateProductInput {
  categoryId?: string
  name: string
  description?: string
  unitCost: number
  unit: string
  packagingStandard?: string
  isActive?: boolean
}

export interface CreateBatchInput {
  productId: string
  batchCode: string
  quantity: number
  harvestDate: string
  expiryDate: string
}
