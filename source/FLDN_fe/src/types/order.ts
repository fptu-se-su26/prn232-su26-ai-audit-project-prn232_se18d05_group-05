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

export interface SupplyRequestResponse {
  orderId: string
  id?: string
  finalAmount: number
  shippingFee: number
  discountAmount: number
  status: 'Pending' | 'Accepted' | 'Delivering' | 'Completed' | 'Cancelled'
  createdAt: string
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
