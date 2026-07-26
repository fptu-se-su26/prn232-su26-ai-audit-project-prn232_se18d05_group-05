export type ShipmentStatus =
  | 'Pending'
  | 'Assigned'
  | 'PickedUp'
  | 'InTransit'
  | 'Arrived'
  | 'Delivered'
  | 'Failed'
  | 'Returned'

export type PriorityLevel = 'Urgent' | 'Standard' | 'Low'
export type TempRequirement = 'Cold' | 'Standard' | 'Ambient'

export interface ShipmentItem {
  shipmentId: string
  orderId: string
  shipmentCode: string // e.g. #SHIP-90
  retailerName: string // e.g. Farm Hòa Vang
  receiverName: string // e.g. Siêu thị Co.op Mart
  receiverPhone: string
  deliveryAddress: string
  pickupAddress: string
  productName: string
  quantity: number
  unit: string
  priority: PriorityLevel
  tempRequirement?: TempRequirement
  estimatedDeliveryDate?: string
  shipmentStatus: ShipmentStatus
  totalItems: number
  assignedAt?: string
  createdAt: string
  distanceKm?: number
  timeWindow?: string
}

export interface ShipmentListRequest {
  search?: string
  status?: ShipmentStatus
  fromDate?: string
  toDate?: string
  page?: number
  pageSize?: number
}

export interface AcceptShipmentResponse {
  shipmentId: string
  acceptedAt: string
  currentStatus: string
}

export interface ConfirmDeliveryRequest {
  shipmentId: string
  receiverName: string
  receiverPhone: string
  deliveryNote?: string
  deliveryImageUrl?: string
}
