import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type {
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

export const orderService = {
  async getDeliveryAddresses(): Promise<DeliveryAddress[]> {
    try {
      const res = await api.get<DeliveryAddress[]>(API_ENDPOINTS.addresses)
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data
      }
    } catch {
      // Fallback to mock
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
      // Fallback mock logic for testing
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
      if (cleanCode === 'FREESHIP') {
        return {
          voucherId: '44444444-4444-4444-4444-444444444444',
          code: 'FREESHIP',
          discountAmount: 30000,
          isValid: true,
          message: 'Miễn phí vận chuyển 30.000₫!',
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
      // Mock creation success fallback
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
}
