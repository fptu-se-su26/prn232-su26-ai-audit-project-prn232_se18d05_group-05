import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type {
  AcceptShipmentResponse,
  ConfirmDeliveryRequest,
  ShipmentItem,
  ShipmentListRequest,
  ShipmentStatus,
} from '@/types/logistics'

export const MOCK_SHIPMENTS: ShipmentItem[] = [
  {
    shipmentId: 'ship-90-uuid-0001',
    orderId: 'ORD-9001',
    shipmentCode: '#SHIP-90',
    retailerName: 'Farm Hòa Vang',
    receiverName: 'Siêu thị Co.op Mart',
    receiverPhone: '0905123456',
    pickupAddress: 'Thôn Thạch Nham, Xã Hòa Nhơn, Huyện Hòa Vang, TP. Đà Nẵng',
    deliveryAddress: '478 Điện Biên Phủ, Phường Thanh Khê Đông, Quận Thanh Khê, TP. Đà Nẵng',
    productName: 'Rau Cải Thìa',
    quantity: 200,
    unit: 'kg',
    priority: 'Urgent',
    tempRequirement: 'Cold',
    estimatedDeliveryDate: '2026-07-25T10:30:00Z',
    shipmentStatus: 'Pending',
    totalItems: 200,
    createdAt: '08:30 Hôm nay',
    distanceKm: 12.5,
    timeWindow: '08:30 - 10:30 Hôm nay',
  },
  {
    shipmentId: 'ship-89-uuid-0002',
    orderId: 'ORD-8902',
    shipmentCode: '#SHIP-89',
    retailerName: 'Sơn Trà Organic',
    receiverName: 'Hub Liên Chiểu',
    receiverPhone: '0905987654',
    pickupAddress: 'Đường Yết Kiêu, Phường Thọ Quang, Quận Sơn Trà, TP. Đà Nẵng',
    deliveryAddress: 'Khu công nghiệp Hòa Khánh, Quận Liên Chiểu, TP. Đà Nẵng',
    productName: 'Cà Chua Hữu Cơ',
    quantity: 500,
    unit: 'kg',
    priority: 'Standard',
    tempRequirement: 'Standard',
    estimatedDeliveryDate: '2026-07-25T14:00:00Z',
    shipmentStatus: 'Pending',
    totalItems: 500,
    createdAt: '07:15 Hôm nay',
    distanceKm: 18.2,
    timeWindow: '09:00 - 14:00 Hôm nay',
  },
  {
    shipmentId: 'ship-88-uuid-0003',
    orderId: 'ORD-8803',
    shipmentCode: '#SHIP-88',
    retailerName: 'HTX Rau sạch Hòa Tiến',
    receiverName: 'VinMart Đà Nẵng',
    receiverPhone: '0914223344',
    pickupAddress: 'Xã Hòa Tiến, Huyện Hòa Vang, TP. Đà Nẵng',
    deliveryAddress: 'Vincom Plaza, 910A Ngô Quyền, Quận Sơn Trà, TP. Đà Nẵng',
    productName: 'Khoai Tây Đà Lạt',
    quantity: 1200,
    unit: 'kg',
    priority: 'Standard',
    tempRequirement: 'Standard',
    estimatedDeliveryDate: '2026-07-26T09:00:00Z',
    shipmentStatus: 'Pending',
    totalItems: 1200,
    createdAt: 'Hôm qua',
    distanceKm: 15.8,
    timeWindow: '07:00 - 11:00 Ngày mai',
  },
  {
    shipmentId: 'ship-87-uuid-0004',
    orderId: 'ORD-8704',
    shipmentCode: '#SHIP-87',
    retailerName: 'Trang trại Sơn Trà',
    receiverName: 'Lotte Mart Đà Nẵng',
    receiverPhone: '0988556677',
    pickupAddress: 'Phường Hòa Hiệp Bắc, Quận Liên Chiểu, TP. Đà Nẵng',
    deliveryAddress: '6 Đại lộ Nam Kỳ Khởi Nghĩa, Quận Hải Châu, TP. Đà Nẵng',
    productName: 'Dâu Tây VietGAP',
    quantity: 150,
    unit: 'kg',
    priority: 'Urgent',
    tempRequirement: 'Cold',
    estimatedDeliveryDate: '2026-07-25T11:00:00Z',
    shipmentStatus: 'Pending',
    totalItems: 150,
    createdAt: '06:45 Hôm nay',
    distanceKm: 9.4,
    timeWindow: '08:00 - 11:00 Hôm nay',
  },
  {
    shipmentId: 'ship-86-uuid-0005',
    orderId: 'ORD-8605',
    shipmentCode: '#SHIP-86',
    retailerName: 'Farm Hòa Vang',
    receiverName: 'Chợ Đầu Mối Hòa Cường',
    receiverPhone: '0903112233',
    pickupAddress: 'Xã Hòa Phú, Huyện Hòa Vang, TP. Đà Nẵng',
    deliveryAddress: 'Chợ Đầu Mối Hòa Cường, Phường Hòa Cường Nam, Quận Hải Châu, TP. Đà Nẵng',
    productName: 'Bắp Cải Trắng',
    quantity: 800,
    unit: 'kg',
    priority: 'Low',
    tempRequirement: 'Standard',
    estimatedDeliveryDate: '2026-07-25T16:00:00Z',
    shipmentStatus: 'Pending',
    totalItems: 800,
    createdAt: '06:00 Hôm nay',
    distanceKm: 14.1,
    timeWindow: '13:00 - 16:00 Hôm nay',
  },
  {
    shipmentId: 'ship-85-uuid-0006',
    orderId: 'ORD-8506',
    shipmentCode: '#SHIP-85',
    retailerName: 'HTX Rau sạch Hòa Tiến',
    receiverName: 'Siêu thị Co.op Mart',
    receiverPhone: '0905123456',
    pickupAddress: 'Xã Hòa Tiến, Huyện Hòa Vang, TP. Đà Nẵng',
    deliveryAddress: '478 Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng',
    productName: 'Ớt Chuông Đà Lạt',
    quantity: 350,
    unit: 'kg',
    priority: 'Urgent',
    tempRequirement: 'Cold',
    estimatedDeliveryDate: '2026-07-25T12:00:00Z',
    shipmentStatus: 'Pending',
    totalItems: 350,
    createdAt: '09:00 Hôm nay',
    distanceKm: 11.2,
    timeWindow: '10:00 - 12:00 Hôm nay',
  },
]

const ACCEPTED_KEY = 'fldn_accepted_shipments'

export interface AcceptedShipmentData {
  status: ShipmentStatus
  assignedAt: string
  deliveredAt?: string
  receiverName?: string
  receiverPhone?: string
  deliveryNote?: string
  photos?: string[]
  signature?: string
}

function getAcceptedShipmentsMap(): Record<string, AcceptedShipmentData> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(ACCEPTED_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAcceptedShipment(
  id: string,
  status: ShipmentStatus = 'Assigned',
  extraData?: Partial<AcceptedShipmentData>
) {
  if (typeof window === 'undefined') return
  try {
    const map = getAcceptedShipmentsMap()
    const existing = map[id] || {}
    const entry: AcceptedShipmentData = {
      ...existing,
      ...extraData,
      status,
      assignedAt: existing.assignedAt || new Date().toISOString(),
    }
    map[id] = entry
    const cleanKey = id.replace('#', '').toLowerCase()
    map[cleanKey] = entry
    localStorage.setItem(ACCEPTED_KEY, JSON.stringify(map))
  } catch {
    // ignore
  }
}

function getAcceptedShipmentData(id: string): AcceptedShipmentData | undefined {
  const map = getAcceptedShipmentsMap()
  if (map[id]) return map[id]
  const cleanKey = id.replace('#', '').toLowerCase()
  if (map[cleanKey]) return map[cleanKey]
  for (const key of Object.keys(map)) {
    if (
      key.toLowerCase() === cleanKey ||
      key.toLowerCase().includes(cleanKey) ||
      cleanKey.includes(key.toLowerCase().replace('#', ''))
    ) {
      return map[key]
    }
  }
  return undefined
}

function getStatusFromMap(id: string): ShipmentStatus | undefined {
  return getAcceptedShipmentData(id)?.status
}

function isSamePickupLocation(s1: ShipmentItem, s2: ShipmentItem): boolean {
  if (
    s1.retailerName &&
    s2.retailerName &&
    s1.retailerName.trim().toLowerCase() === s2.retailerName.trim().toLowerCase()
  ) {
    return true
  }
  if (s1.pickupAddress && s2.pickupAddress) {
    const addr1 = s1.pickupAddress.trim().toLowerCase()
    const addr2 = s2.pickupAddress.trim().toLowerCase()
    if (addr1 === addr2 || addr1.includes(addr2) || addr2.includes(addr1)) {
      return true
    }
  }
  return false
}

export const logisticsService = {
  async getPendingShipments(params?: ShipmentListRequest): Promise<{
    items: ShipmentItem[]
    totalCount: number
  }> {
    try {
      const res = await api.get(API_ENDPOINTS.logistics.shipments, { params })
      const rawData = res.data?.data ?? res.data
      if (rawData && Array.isArray(rawData.items)) {
        const mappedItems: ShipmentItem[] = rawData.items
          .filter((item: any) => !item.logisticsOperatorId && item.shipmentStatus === 'Pending')
          .map((item: any, idx: number) => ({
            shipmentId: item.shipmentId || item.id,
            orderId: item.orderId || `ORD-${1000 + idx}`,
            shipmentCode: item.shipmentCode || `#SHIP-${90 - idx}`,
            retailerName: item.retailerName || item.supplierName || 'Farm Hòa Vang',
            receiverName: item.receiverName || 'Siêu thị Co.op Mart',
            receiverPhone: item.receiverPhone || '0905123456',
            deliveryAddress: item.deliveryAddress || 'Đà Nẵng',
            pickupAddress: item.pickupAddress || 'Hòa Vang, Đà Nẵng',
            productName: item.productName || 'Nông sản hỗn hợp',
            quantity: item.totalItems || 100,
            unit: item.unit || 'kg',
            priority: item.priority || 'Standard',
            tempRequirement: item.tempRequirement || 'Standard',
            estimatedDeliveryDate: item.estimatedDeliveryDate,
            shipmentStatus: (item.shipmentStatus || item.status || 'Pending') as ShipmentStatus,
            totalItems: item.totalItems || 100,
            assignedAt: item.assignedAt,
            createdAt: item.createdAt || 'Hôm nay',
            distanceKm: item.distanceKm || 10,
            timeWindow: item.timeWindow || 'Trong ngày',
          }))
        return {
          items: mappedItems,
          totalCount: rawData.totalCount ?? mappedItems.length,
        }
      }
    } catch {
      // Return local fallback on error / offline mode
    }

    const acceptedMap = getAcceptedShipmentsMap()
    let filtered = MOCK_SHIPMENTS.filter(
      (s) => !acceptedMap[s.shipmentId] && !acceptedMap[s.shipmentCode] && !getStatusFromMap(s.shipmentId) && !getStatusFromMap(s.shipmentCode)
    )

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.shipmentCode.toLowerCase().includes(q) ||
          s.productName.toLowerCase().includes(q) ||
          s.retailerName.toLowerCase().includes(q) ||
          s.receiverName.toLowerCase().includes(q) ||
          s.pickupAddress.toLowerCase().includes(q) ||
          s.deliveryAddress.toLowerCase().includes(q)
      )
    }

    if (params?.status && params.status !== ('ALL' as any)) {
      filtered = filtered.filter((s) => s.shipmentStatus === params.status)
    }

    return {
      items: filtered,
      totalCount: filtered.length,
    }
  },

  async acceptShipment(id: string): Promise<AcceptShipmentResponse> {
    const acceptedMap = getAcceptedShipmentsMap()
    if (acceptedMap[id] && acceptedMap[id].status !== 'Delivered') {
      throw new Error('Lô hàng này đã được một tài xế khác tiếp nhận trước đó!')
    }

    // Fetch active shipments of driver
    const myShipmentsRes = await this.getMyShipments()
    const activeShipments = myShipmentsRes.items.filter(
      (s) => s.shipmentStatus !== 'Delivered' && s.shipmentStatus !== 'Failed' && s.shipmentStatus !== 'Returned'
    )

    // Lookup target shipment
    let targetShipment: ShipmentItem | undefined = MOCK_SHIPMENTS.find(
      (s) =>
        s.shipmentId === id ||
        s.shipmentCode.toLowerCase() === id.toLowerCase() ||
        s.shipmentCode.replace('#', '').toLowerCase() === id.replace('#', '').toLowerCase()
    )

    if (!targetShipment) {
      const pendingRes = await this.getPendingShipments()
      targetShipment = pendingRes.items.find(
        (s) =>
          s.shipmentId === id ||
          s.shipmentCode.toLowerCase() === id.toLowerCase() ||
          s.shipmentCode.replace('#', '').toLowerCase() === id.replace('#', '').toLowerCase()
      )
    }

    if (activeShipments.length > 0 && targetShipment) {
      const isSameLocation = activeShipments.every((active) => isSamePickupLocation(active, targetShipment!))
      if (!isSameLocation) {
        const activeLocation = activeShipments[0].retailerName || activeShipments[0].pickupAddress
        throw new Error(
          `Tài xế đang có đơn hàng chưa hoàn tất tại điểm lấy: "${activeLocation}". Bạn chỉ được nhận thêm các đơn trùng điểm lấy hàng này, hoặc phải hoàn thành các đơn hiện tại trước khi nhận đơn ở điểm lấy hàng mới!`
        )
      }
    }

    try {
      const res = await api.put(API_ENDPOINTS.logistics.accept(id))
      saveAcceptedShipment(id, 'Assigned')
      return res.data?.data ?? res.data
    } catch {
      // Fallback mock success
      saveAcceptedShipment(id, 'Assigned')
      return {
        shipmentId: id,
        acceptedAt: new Date().toISOString(),
        currentStatus: 'Assigned',
      }
    }
  },

  async updateShipmentStatus(
    id: string,
    status: ShipmentStatus,
    note?: string
  ): Promise<boolean> {
    saveAcceptedShipment(id, status)
    try {
      await api.put(API_ENDPOINTS.logistics.updateStatus(id), {
        shipmentStatus: status,
        note,
      })
      return true
    } catch {
      return true
    }
  },

  async confirmDelivery(
    id: string,
    data: ConfirmDeliveryRequest & { photos?: string[]; signature?: string }
  ): Promise<boolean> {
    const podExtra: Partial<AcceptedShipmentData> = {
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      deliveryNote: data.deliveryNote,
      photos: data.photos || (data.deliveryImageUrl ? [data.deliveryImageUrl] : []),
      signature: data.signature,
      deliveredAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' Hôm nay',
    }
    saveAcceptedShipment(id, 'Delivered', podExtra)
    if (data.shipmentId) {
      saveAcceptedShipment(data.shipmentId, 'Delivered', podExtra)
    }
    try {
      await api.put(API_ENDPOINTS.logistics.complete(id), data)
      return true
    } catch {
      return true
    }
  },

  async getShipmentById(id: string): Promise<(ShipmentItem & { podData?: AcceptedShipmentData }) | null> {
    try {
      const res = await api.get(`${API_ENDPOINTS.logistics.shipments}/${id}`)
      const item = res.data?.data ?? res.data
      if (item && (item.shipmentId || item.id)) {
        const savedData = getAcceptedShipmentData(id)
        return {
          shipmentId: item.shipmentId || item.id,
          orderId: item.orderId || 'ORD-9001',
          shipmentCode: item.shipmentCode || '#SHIP-90',
          retailerName: item.retailerName || item.supplierName || 'Farm Hòa Vang',
          receiverName: savedData?.receiverName || item.receiverName || 'Siêu thị Co.op Mart',
          receiverPhone: savedData?.receiverPhone || item.receiverPhone || '0905123456',
          deliveryAddress: item.deliveryAddress || 'Đà Nẵng',
          pickupAddress: item.pickupAddress || 'Hòa Vang, Đà Nẵng',
          productName: item.productName || 'Rau Cải Thìa',
          quantity: item.quantity || item.totalItems || 200,
          unit: item.unit || 'kg',
          priority: item.priority || 'Urgent',
          tempRequirement: item.tempRequirement || 'Cold',
          estimatedDeliveryDate: item.estimatedDeliveryDate,
          shipmentStatus: (savedData?.status || item.shipmentStatus || item.status || 'Pending') as ShipmentStatus,
          totalItems: item.totalItems || 200,
          assignedAt: item.assignedAt,
          createdAt: item.createdAt || '08:30 Hôm nay',
          distanceKm: item.distanceKm || 12.5,
          timeWindow: item.timeWindow || '08:30 - 10:30 Hôm nay',
          podData: savedData,
        }
      }
    } catch {
      // Fallback local lookup
    }

    const cleanId = id.replace('#', '').toLowerCase()
    const found =
      MOCK_SHIPMENTS.find(
        (s) =>
          s.shipmentId === id ||
          s.shipmentCode.toLowerCase() === id.toLowerCase() ||
          s.shipmentCode.replace('#', '').toLowerCase() === cleanId ||
          s.shipmentId.toLowerCase() === cleanId ||
          s.shipmentId.toLowerCase().includes(cleanId) ||
          cleanId.includes(s.shipmentId.toLowerCase())
      ) || MOCK_SHIPMENTS[0]

    const savedData =
      getAcceptedShipmentData(id) ||
      getAcceptedShipmentData(found.shipmentId) ||
      getAcceptedShipmentData(found.shipmentCode)

    return {
      ...found,
      shipmentStatus: savedData?.status || found.shipmentStatus,
      receiverName: savedData?.receiverName || found.receiverName,
      receiverPhone: savedData?.receiverPhone || found.receiverPhone,
      podData: savedData,
    }
  },

  async getMyShipments(params?: ShipmentListRequest): Promise<{
    items: ShipmentItem[]
    totalCount: number
  }> {
    try {
      const res = await api.get(API_ENDPOINTS.logistics.shipments, { params })
      const rawData = res.data?.data ?? res.data
      if (rawData && Array.isArray(rawData.items)) {
        const mappedItems: ShipmentItem[] = rawData.items.map((item: any, idx: number) => {
          const savedStatus = getStatusFromMap(item.shipmentId || item.id)
          return {
            shipmentId: item.shipmentId || item.id,
            orderId: item.orderId || `ORD-${2000 + idx}`,
            shipmentCode: item.shipmentCode || `#SHIP-${95 - idx}`,
            retailerName: item.retailerName || item.supplierName || 'Farm Hòa Vang',
            receiverName: item.receiverName || 'Siêu thị Co.op Mart',
            receiverPhone: item.receiverPhone || '0905123456',
            deliveryAddress: item.deliveryAddress || '478 Điện Biên Phủ, Đà Nẵng',
            pickupAddress: item.pickupAddress || 'Hòa Vang, Đà Nẵng',
            productName: item.productName || 'Rau Cải Thìa',
            quantity: item.totalItems || 200,
            unit: item.unit || 'kg',
            priority: item.priority || 'Urgent',
            tempRequirement: item.tempRequirement || 'Cold',
            estimatedDeliveryDate: item.estimatedDeliveryDate,
            shipmentStatus: (savedStatus || item.shipmentStatus || item.status || 'Assigned') as ShipmentStatus,
            totalItems: item.totalItems || 200,
            assignedAt: item.assignedAt || new Date().toISOString(),
            createdAt: item.createdAt || '08:30 Hôm nay',
            distanceKm: item.distanceKm || 12.5,
            timeWindow: item.timeWindow || '08:30 - 10:30 Hôm nay',
          }
        })
        return {
          items: mappedItems,
          totalCount: rawData.totalCount ?? mappedItems.length,
        }
      }
    } catch {
      // Fallback
    }

    const activeMocks: ShipmentItem[] = [
      {
        shipmentId: 'ship-90-uuid-0001',
        orderId: 'ORD-9001',
        shipmentCode: '#SHIP-90',
        retailerName: 'Farm Hòa Vang',
        receiverName: 'Siêu thị Co.op Mart',
        receiverPhone: '0905123456',
        pickupAddress: 'Thôn Thạch Nham, Xã Hòa Nhơn, Huyện Hòa Vang, TP. Đà Nẵng',
        deliveryAddress: '478 Điện Biên Phủ, Phường Thanh Khê Đông, Quận Thanh Khê, TP. Đà Nẵng',
        productName: 'Rau Cải Thìa',
        quantity: 200,
        unit: 'kg',
        priority: 'Urgent',
        tempRequirement: 'Cold',
        estimatedDeliveryDate: '2026-07-25T10:30:00Z',
        shipmentStatus: 'Assigned',
        totalItems: 200,
        createdAt: '08:30 Hôm nay',
        distanceKm: 12.5,
        timeWindow: '08:30 - 10:30 Hôm nay',
      },
      {
        shipmentId: 'ship-89-uuid-0002',
        orderId: 'ORD-8902',
        shipmentCode: '#SHIP-89',
        retailerName: 'Sơn Trà Organic',
        receiverName: 'Hub Liên Chiểu',
        receiverPhone: '0905987654',
        pickupAddress: 'Đường Yết Kiêu, Phường Thọ Quang, Quận Sơn Trà, TP. Đà Nẵng',
        deliveryAddress: 'Khu công nghiệp Hòa Khánh, Quận Liên Chiểu, TP. Đà Nẵng',
        productName: 'Cà Chua Hữu Cơ',
        quantity: 500,
        unit: 'kg',
        priority: 'Standard',
        tempRequirement: 'Standard',
        estimatedDeliveryDate: '2026-07-25T14:00:00Z',
        shipmentStatus: 'InTransit',
        totalItems: 500,
        createdAt: '07:15 Hôm nay',
        distanceKm: 18.2,
        timeWindow: '09:00 - 14:00 Hôm nay',
      },
      {
        shipmentId: 'ship-88-uuid-0003',
        orderId: 'ORD-8803',
        shipmentCode: '#SHIP-88',
        retailerName: 'HTX Rau sạch Hòa Tiến',
        receiverName: 'VinMart Đà Nẵng',
        receiverPhone: '0914223344',
        pickupAddress: 'Xã Hòa Tiến, Huyện Hòa Vang, TP. Đà Nẵng',
        deliveryAddress: 'Vincom Plaza, 910A Ngô Quyền, Quận Sơn Trà, TP. Đà Nẵng',
        productName: 'Khoai Tây Đà Lạt',
        quantity: 1200,
        unit: 'kg',
        priority: 'Standard',
        tempRequirement: 'Standard',
        estimatedDeliveryDate: '2026-07-26T09:00:00Z',
        shipmentStatus: 'Arrived',
        totalItems: 1200,
        createdAt: 'Hôm qua',
        distanceKm: 15.8,
        timeWindow: '07:00 - 11:00 Ngày mai',
      },
    ]

    const extraAccepted = MOCK_SHIPMENTS.filter(
      (s) =>
        (getStatusFromMap(s.shipmentId) || getStatusFromMap(s.shipmentCode)) &&
        !activeMocks.some((am) => am.shipmentId === s.shipmentId)
    )

    const allItems = [...activeMocks, ...extraAccepted].map((item) => {
      const savedStatus = getStatusFromMap(item.shipmentId) || getStatusFromMap(item.shipmentCode)
      return savedStatus ? { ...item, shipmentStatus: savedStatus } : item
    })

    let filtered = [...allItems]
    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.shipmentCode.toLowerCase().includes(q) ||
          s.productName.toLowerCase().includes(q) ||
          s.retailerName.toLowerCase().includes(q) ||
          s.receiverName.toLowerCase().includes(q)
      )
    }

    if (params?.status && params.status !== ('ALL' as any)) {
      filtered = filtered.filter((s) => s.shipmentStatus === params.status)
    }

    return {
      items: filtered,
      totalCount: filtered.length,
    }
  },
}
