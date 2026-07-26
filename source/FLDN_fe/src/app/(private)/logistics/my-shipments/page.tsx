'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Flag,
  Forklift,
  Info,
  Loader2,
  MapPin,
  Navigation,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  Thermometer,
  Truck,
  Upload,
  UserCheck,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { logisticsService } from '@/services/logistics.service'
import type { ConfirmDeliveryRequest, ShipmentItem, ShipmentStatus } from '@/types/logistics'

type TabStatus = 'ALL' | 'Assigned' | 'PickedUp' | 'InTransit' | 'Arrived' | 'Delivered'

const STATUS_STEP_INDEX: Record<ShipmentStatus, number> = {
  Pending: 0,
  Assigned: 1,
  PickedUp: 2,
  InTransit: 3,
  Arrived: 4,
  Delivered: 5,
  Failed: -1,
  Returned: -1,
}

export default function UpdateShipmentStatusPage() {
  const [shipments, setShipments] = useState<ShipmentItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<TabStatus>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // State for status update processing
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Status Note / GPS Modal State
  const [gpsModalShipment, setGpsModalShipment] = useState<ShipmentItem | null>(null)
  const [noteInput, setNoteInput] = useState<string>('')
  const [latInput, setLatInput] = useState<string>('16.0544')
  const [lngInput, setLngInput] = useState<string>('108.2022')

  // Confirm Delivery Modal State (UC30)
  const [deliveryModalShipment, setDeliveryModalShipment] = useState<ShipmentItem | null>(null)
  const [receiverName, setReceiverName] = useState<string>('')
  const [receiverPhone, setReceiverPhone] = useState<string>('')
  const [deliveryNote, setDeliveryNote] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [confirmingDelivery, setConfirmingDelivery] = useState<boolean>(false)

  // Fetch assigned / active shipments
  const fetchMyShipments = async (showToast = false) => {
    if (showToast) setRefreshing(true)
    else setLoading(true)

    try {
      const data = await logisticsService.getMyShipments()
      setShipments(data.items)
      if (showToast) {
        toast.success('Đã cập nhật danh sách vận chuyển mới nhất!')
      }
    } catch {
      toast.error('Không thể lấy danh sách lô hàng vận chuyển!')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchMyShipments()
  }, [])

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    return shipments.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.shipmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.retailerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.receiverName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTab = activeTab === 'ALL' || item.shipmentStatus === activeTab

      return matchesSearch && matchesTab
    })
  }, [shipments, searchQuery, activeTab])

  // Handle status transition update (Assigned -> PickedUp -> InTransit -> Arrived)
  const handleUpdateStatus = async (
    shipment: ShipmentItem,
    nextStatus: ShipmentStatus,
    customNote?: string
  ) => {
    setUpdatingId(shipment.shipmentId)

    try {
      await logisticsService.updateShipmentStatus(
        shipment.shipmentId,
        nextStatus,
        customNote || `Cập nhật trạng thái sang ${nextStatus}`
      )

      // Optimistic update locally
      setShipments((prev) =>
        prev.map((s) => (s.shipmentId === shipment.shipmentId ? { ...s, shipmentStatus: nextStatus } : s))
      )

      const statusLabels: Record<string, string> = {
        PickedUp: 'Đã lấy hàng tại trang trại',
        InTransit: 'Đang di chuyển giao hàng',
        Arrived: 'Đã tới điểm giao hàng',
        Delivered: 'Giao hàng thành công',
        Failed: 'Giao hàng thất bại',
      }

      toast.success(
        `Cập nhật lô hàng ${shipment.shipmentCode} thành "${statusLabels[nextStatus] || nextStatus}"!`
      )

      if (gpsModalShipment) {
        setGpsModalShipment(null)
      }
    } catch {
      toast.error(`Có lỗi khi cập nhật trạng thái lô hàng ${shipment.shipmentCode}!`)
    } finally {
      setUpdatingId(null)
    }
  }

  // Handle Confirm Delivery Submission (UC30 / Complete Shipment)
  const handleConfirmDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryModalShipment || confirmingDelivery) return

    if (!receiverName.trim()) {
      toast.error('Vui lòng nhập tên người nhận hàng!')
      return
    }

    setConfirmingDelivery(true)

    try {
      const payload: ConfirmDeliveryRequest = {
        shipmentId: deliveryModalShipment.shipmentId,
        receiverName: receiverName.trim(),
        receiverPhone: receiverPhone.trim(),
        deliveryNote: deliveryNote.trim(),
        deliveryImageUrl: previewImage || undefined,
      }

      await logisticsService.confirmDelivery(deliveryModalShipment.shipmentId, payload)

      // Optimistic status update to Delivered
      setShipments((prev) =>
        prev.map((s) =>
          s.shipmentId === deliveryModalShipment.shipmentId
            ? { ...s, shipmentStatus: 'Delivered' as ShipmentStatus }
            : s
        )
      )

      toast.success(`Hoàn tất giao lô hàng ${deliveryModalShipment.shipmentCode} thành công!`, {
        description: `Xác nhận bởi: ${receiverName.trim()}`,
      })

      setDeliveryModalShipment(null)
      setPreviewImage(null)
      setDeliveryNote('')
    } catch {
      toast.error('Có lỗi xảy ra khi hoàn thành giao hàng!')
    } finally {
      setConfirmingDelivery(false)
    }
  }

  // Open Confirm Delivery Modal
  const openDeliveryModal = (shipment: ShipmentItem) => {
    setDeliveryModalShipment(shipment)
    setReceiverName(shipment.receiverName)
    setReceiverPhone(shipment.receiverPhone)
    setDeliveryNote('Đã bàn giao đầy đủ nông sản đúng quy cách bảo quản.')
    setPreviewImage('https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Forklift className="w-3.5 h-3.5" /> Quản lý giao vận (UC29)
            </span>
            <span className="text-xs text-gray-500">FoodLink Đà Nẵng</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cập nhật trạng thái vận chuyển</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cập nhật tiến độ giao nhận nông sản theo thời gian thực (Đã tiếp nhận → Đã lấy hàng → Đang giao → Đã đến điểm giao → Hoàn thành).
          </p>
        </div>

        <button
          onClick={() => fetchMyShipments(true)}
          disabled={refreshing}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Cập nhật tiến độ</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {(
              [
                { key: 'ALL', label: 'Tất cả' },
                { key: 'Assigned', label: 'Đã phân công' },
                { key: 'PickedUp', label: 'Đã lấy hàng' },
                { key: 'InTransit', label: 'Đang giao' },
                { key: 'Arrived', label: 'Đã đến' },
                { key: 'Delivered', label: 'Đã hoàn thành' },
              ] as { key: TabStatus; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo Mã lô hàng, nông sản..."
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main List of Shipments */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-sm font-medium text-gray-500">Đang tải tiến độ giao vận...</p>
        </div>
      ) : filteredShipments.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-gray-100">
          <Package className="w-12 h-12 text-gray-300" />
          <p className="text-base font-bold text-gray-700">Không tìm thấy lô hàng vận chuyển nào</p>
          <p className="text-xs text-gray-500">Vui lòng thay đổi từ khóa hoặc tab trạng thái.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredShipments.map((shipment) => {
            const stepIdx = STATUS_STEP_INDEX[shipment.shipmentStatus] ?? 1
            const isProcessing = updatingId === shipment.shipmentId

            return (
              <div
                key={shipment.shipmentId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-emerald-200 transition-all"
              >
                {/* Shipment Header Bar */}
                <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-emerald-700">{shipment.shipmentCode}</span>
                    <span className="text-xs text-gray-400 font-medium">Đơn hàng: {shipment.orderId}</span>
                    {shipment.tempRequirement === 'Cold' && (
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Thermometer className="w-3 h-3" /> Bảo quản Lạnh
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    {shipment.shipmentStatus === 'Assigned' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Đã phân công (Assigned)
                      </span>
                    )}
                    {shipment.shipmentStatus === 'PickedUp' && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <Store className="w-3.5 h-3.5" /> Đã lấy hàng (PickedUp)
                      </span>
                    )}
                    {shipment.shipmentStatus === 'InTransit' && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" /> Đang di chuyển (InTransit)
                      </span>
                    )}
                    {shipment.shipmentStatus === 'Arrived' && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Đã đến điểm giao (Arrived)
                      </span>
                    )}
                    {shipment.shipmentStatus === 'Delivered' && (
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Giao thành công (Delivered)
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">
                  {/* Stepper Progress Bar */}
                  <div className="relative py-2">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100">
                      <div
                        style={{
                          width: `${Math.min(100, Math.max(20, (stepIdx / 5) * 100))}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-600 transition-all duration-500"
                      />
                    </div>

                    <div className="grid grid-cols-5 text-center text-xs font-semibold">
                      <div className={stepIdx >= 1 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                        1. Tiếp nhận
                      </div>
                      <div className={stepIdx >= 2 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                        2. Đã lấy hàng
                      </div>
                      <div className={stepIdx >= 3 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                        3. Đang giao hàng
                      </div>
                      <div className={stepIdx >= 4 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                        4. Đã tới nơi
                      </div>
                      <div className={stepIdx >= 5 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                        5. Hoàn thành
                      </div>
                    </div>
                  </div>

                  {/* Route & Item Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                    {/* Origin */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-emerald-600" /> Điểm lấy hàng (Trang trại)
                      </p>
                      <p className="text-sm font-bold text-gray-900">{shipment.retailerName}</p>
                      <p className="text-xs text-gray-500">{shipment.pickupAddress}</p>
                    </div>

                    {/* Destination */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Flag className="w-3.5 h-3.5 text-rose-600" /> Điểm giao hàng (Hub / Siêu thị)
                      </p>
                      <p className="text-sm font-bold text-gray-900">{shipment.receiverName}</p>
                      <p className="text-xs text-gray-500">{shipment.deliveryAddress}</p>
                      <p className="text-xs text-emerald-700 font-medium">SĐT: {shipment.receiverPhone}</p>
                    </div>

                    {/* Product & Weight */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-amber-600" /> Thông tin hàng hóa
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {shipment.productName} - {shipment.quantity} {shipment.unit}
                      </p>
                      <p className="text-xs text-gray-500">Khung giờ: {shipment.timeWindow || 'Trong ngày'}</p>
                    </div>
                  </div>

                  {/* Action Buttons to Transition Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setGpsModalShipment(shipment)
                          setNoteInput('')
                        }}
                        className="px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cập nhật GPS &amp; Ghi chú</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Step 1 -> Step 2: PickedUp */}
                      {shipment.shipmentStatus === 'Assigned' && (
                        <button
                          onClick={() => handleUpdateStatus(shipment, 'PickedUp')}
                          disabled={isProcessing}
                          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Store className="w-3.5 h-3.5" />
                          )}
                          <span>Xác nhận đã lấy hàng tại trang trại</span>
                        </button>
                      )}

                      {/* Step 2 -> Step 3: InTransit */}
                      {shipment.shipmentStatus === 'PickedUp' && (
                        <button
                          onClick={() => handleUpdateStatus(shipment, 'InTransit')}
                          disabled={isProcessing}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Truck className="w-3.5 h-3.5" />
                          )}
                          <span>Bắt đầu di chuyển giao hàng (InTransit)</span>
                        </button>
                      )}

                      {/* Step 3 -> Step 4: Arrived */}
                      {shipment.shipmentStatus === 'InTransit' && (
                        <button
                          onClick={() => handleUpdateStatus(shipment, 'Arrived')}
                          disabled={isProcessing}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                          <span>Đã tới điểm giao hàng (Arrived)</span>
                        </button>
                      )}

                      {/* Step 4 -> Step 5: Delivered (UC30 Complete) */}
                      {shipment.shipmentStatus === 'Arrived' && (
                        <button
                          onClick={() => openDeliveryModal(shipment)}
                          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Xác nhận Hoàn tất Giao hàng</span>
                        </button>
                      )}

                      {/* Completed State */}
                      {shipment.shipmentStatus === 'Delivered' && (
                        <button
                          disabled
                          className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-default"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Giao hàng hoàn tất
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* GPS & Note Modal */}
      {gpsModalShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setGpsModalShipment(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                Cập nhật vị trí GPS &amp; Ghi chú #{gpsModalShipment.shipmentCode}
              </h3>
              <button
                onClick={() => setGpsModalShipment(null)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Tọa độ GPS (Vĩ độ / Kinh độ Đà Nẵng)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={latInput}
                    onChange={(e) => setLatInput(e.target.value)}
                    placeholder="Latitude"
                    className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={lngInput}
                    onChange={(e) => setLngInput(e.target.value)}
                    placeholder="Longitude"
                    className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Ghi chú giao vận hiện tại</label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Nhập tình trạng giao hàng, kẹt xe, hoặc nhiệt độ thùng lạnh..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setGpsModalShipment(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  handleUpdateStatus(
                    gpsModalShipment,
                    gpsModalShipment.shipmentStatus,
                    `[GPS: ${latInput}, ${lngInput}] ${noteInput || 'Cập nhật vị trí hành trình'}`
                  )
                }
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
              >
                Lưu vết hành trình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delivery Modal (UC30 Integration) */}
      {deliveryModalShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDeliveryModalShipment(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
            <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">
                  Xác nhận giao hàng thành công #{deliveryModalShipment.shipmentCode}
                </h3>
              </div>
              <button
                onClick={() => setDeliveryModalShipment(null)}
                className="p-1 hover:bg-emerald-100 text-gray-400 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmDeliverySubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Tên người thực tế nhận hàng *</label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Số điện thoại người nhận *</label>
                  <input
                    type="text"
                    required
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Ghi chú xác nhận giao hàng</label>
                  <textarea
                    rows={2}
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Photo Proof Simulation */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Ảnh chụp minh chứng bàn giao nông sản
                  </label>
                  {previewImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 h-32 bg-gray-100">
                      <img src={previewImage} alt="Delivery proof" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setPreviewImage('https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80')
                      }
                      className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors flex flex-col items-center justify-center gap-1 text-gray-400"
                    >
                      <Camera className="w-6 h-6 text-emerald-600" />
                      <span>Nhấp để tải lên / chụp ảnh thực tế</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setDeliveryModalShipment(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={confirmingDelivery}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {confirmingDelivery ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>Xác nhận Hoàn tất Giao hàng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
