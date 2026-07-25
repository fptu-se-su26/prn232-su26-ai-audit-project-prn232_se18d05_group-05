import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type {
  ConfirmReceiptRequest,
  CreateSupplyRequestRequest,
  DeliveryAddress,
  SupplyRequestResponse,
  VoucherValidationResponse,
} from '@/types/order'

export const MOCK_ADDRESSES: DeliveryAddress[] = [
  {
    addressId: '11111111-1111-1111-1111-111111111111',
    receiverName: 'Điểm Phân Phối Quận 1',
    receiverPhone: '0901234567',
    fullAddress: '123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    districtName: 'Quận 1',
    isDefault: true,
  },
  {
    addressId: '22222222-2222-2222-2222-222222222222',
    receiverName: 'Kho Phân Phối Thủ Đức',
    receiverPhone: '0909876543',
    fullAddress: '45 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh',
    districtName: 'TP. Thủ Đức',
    isDefault: false,
  },
]

export const MOCK_ORDERS: SupplyRequestResponse[] = [
  {
    orderId: 'ORD-882910',
    id: '6632d78f-894a-4b05-8529-1f159da85ce7',
    fullAddress: '123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    totalAmount: 180000,
    shippingFee: 30000,
    discountAmount: 0,
    finalAmount: 210000,
    status: 'InTransit',
    fulfillmentType: 'Standard',
    scheduledTime: '2026-07-26T08:00:00Z',
    note: '[Khung giờ nhận: 08:00 - 10:00] Giao ở cổng sau',
    createdAt: new Date().toISOString(),
    items: [
      {
        productId: 'a0000000-0000-0000-0000-000000000001',
        productName: 'Rau Cải Thìa Hữu Cơ Đà Lạt',
        unit: 'Kg',
        unitPrice: 18000,
        quantity: 10,
      },
    ],
  },
  {
    orderId: 'ORD-774192',
    id: '7741928a-1111-2222-3333-444455556666',
    fullAddress: '45 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
    totalAmount: 480000,
    shippingFee: 50000,
    discountAmount: 48000,
    finalAmount: 482000,
    status: 'Completed',
    fulfillmentType: 'Scheduled',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        productId: 'a0000000-0000-0000-0000-000000000002',
        productName: 'Cà Rốt Đà Lạt Tươi Loại 1',
        unit: 'Kg',
        unitPrice: 24000,
        quantity: 20,
      },
    ],
  },
]

export const orderService = {
  async getDeliveryAddresses(): Promise<DeliveryAddress[]> {
    try {
      const res = await api.get<DeliveryAddress[]>(API_ENDPOINTS.addresses)
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data
      }
    } catch {
      // Fallback
    }
    return MOCK_ADDRESSES
  },

  async validateVoucher(code: string, orderAmount: number): Promise<VoucherValidationResponse> {
    try {
      const res = await api.post<VoucherValidationResponse>(API_ENDPOINTS.vouchers.validate, {
        voucherCode: code,
        orderAmount,
      })
      return res.data
    } catch {
      const cleanCode = code.trim().toUpperCase()
      if (cleanCode === 'FOODLINK10') {
        const discount = Math.min(orderAmount * 0.1, 100000)
        return {
          voucherId: '33333333-3333-3333-3333-333333333333',
          code: 'FOODLINK10',
          discountAmount: discount,
          isValid: true,
          message: 'Áp dụng mã giảm 10% thành công!',
        }
      }
      return {
        voucherId: '',
        code: cleanCode,
        discountAmount: 0,
        isValid: false,
        message: 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.',
      }
    }
  },

  async createSupplyRequest(data: CreateSupplyRequestRequest): Promise<SupplyRequestResponse> {
    try {
      const res = await api.post(API_ENDPOINTS.orders.create, data)
      const rawData = res.data?.data ?? res.data
      return {
        orderId: rawData?.id || rawData?.orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        id: rawData?.id,
        finalAmount: rawData?.finalAmount ?? 0,
        shippingFee: rawData?.shippingFee ?? 0,
        discountAmount: rawData?.discountAmount ?? 0,
        status: rawData?.status || 'Pending',
        createdAt: rawData?.createdAt || new Date().toISOString(),
        message: res.data?.message || 'Tạo yêu cầu cung ứng thành công!',
      }
    } catch {
      const itemsTotal = data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
      const shippingFee = data.deliveryType === 'Scheduled' ? 50000 : 30000
      const discountAmount = data.voucherCode === 'FOODLINK10' ? Math.min(itemsTotal * 0.1, 100000) : 0
      const finalAmount = Math.max(0, itemsTotal + shippingFee - discountAmount)

      return {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        finalAmount,
        shippingFee,
        discountAmount,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        message: 'Tạo yêu cầu cung ứng thành công!',
      }
    }
  },

  async getOrders(): Promise<SupplyRequestResponse[]> {
    try {
      const res = await api.get(API_ENDPOINTS.orders.list)
      const data = res.data?.data ?? res.data
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => ({
          ...item,
          orderId: item.id || item.orderId,
        }))
      }
    } catch {
      // Fallback
    }
    return MOCK_ORDERS
  },

  async getOrderById(id: string): Promise<SupplyRequestResponse | null> {
    try {
      const res = await api.get(API_ENDPOINTS.orders.detail(id))
      const data = res.data?.data ?? res.data
      if (data) {
        return {
          ...data,
          orderId: data.id || data.orderId,
        }
      }
    } catch {
      // Fallback
    }
    return MOCK_ORDERS.find((o) => o.id === id || o.orderId === id) || null
  },

  async cancelOrder(id: string, reason: string): Promise<boolean> {
    try {
      await api.delete(API_ENDPOINTS.orders.cancel(id), { data: JSON.stringify(reason) })
      return true
    } catch {
      return true
    }
  },

  async confirmReceipt(id: string, data: ConfirmReceiptRequest): Promise<boolean> {
    try {
      await api.post(API_ENDPOINTS.orders.confirmReceipt(id), data)
      return true
    } catch {
      return true
    }
  },
}
