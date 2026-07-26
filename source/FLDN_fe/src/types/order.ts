export interface SupplyRequestItem {
  productId: string
  productName: string
  unit: string
  unitPrice: number
  quantity: number
  supplierId?: string
  supplierName?: string
  mainImage?: string
}

export interface DeliveryAddress {
  addressId: string
  receiverName: string
  receiverPhone: string
  fullAddress: string
  districtName?: string
  isDefault?: boolean
}

export interface CreateSupplyRequestRequest {
  addressId: string
  deliveryType: 'Standard' | 'Scheduled'
  scheduledTime?: string
  voucherCode?: string
  note?: string
  items: {
    productId: string
    quantity: number
    unitPrice: number
  }[]
}

export interface ConfirmReceiptRequest {
  isFullReceived: boolean
  note?: string
}

export interface OrderStatusHistory {
  id: string
  status: 'Pending' | 'Approved' | 'Dispatched' | 'InTransit' | 'Received' | 'Rejected' | 'Cancelled' | 'Completed'
  note?: string
  createdAt: string
}

export interface SupplyRequestResponse {
  orderId: string
  id?: string
  distributionPointId?: string
  addressId?: string
  fullAddress?: string
  totalAmount?: number
  finalAmount: number
  shippingFee: number
  discountAmount?: number
  status: 'Pending' | 'Approved' | 'Dispatched' | 'InTransit' | 'Received' | 'Rejected' | 'Cancelled' | 'Completed'
  fulfillmentType?: 'Standard' | 'Scheduled'
  scheduledTime?: string
  note?: string
  createdAt: string
  items?: SupplyRequestItem[]
  statusHistories?: OrderStatusHistory[]
  message?: string
}

export interface VoucherValidationResponse {
  voucherId: string
  code: string
  discountAmount: number
  minOrderValue?: number
  isValid: boolean
  message?: string
}
