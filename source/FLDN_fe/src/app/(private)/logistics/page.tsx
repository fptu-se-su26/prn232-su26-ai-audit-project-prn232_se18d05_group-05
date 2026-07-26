'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Flag,
  Forklift,
  Info,
  Loader2,
  Map,
  MapPin,
  Package,
  PriorityHigh,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Store,
  Thermometer,
  Truck,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { logisticsService } from '@/services/logistics.service'
import type { PriorityLevel, ShipmentItem, ShipmentStatus } from '@/types/logistics'

export default function PendingShipmentsPage() {
  const [shipments, setShipments] = useState<ShipmentItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedFarm, setSelectedFarm] = useState<string>('')
  const [selectedHub, setSelectedHub] = useState<string>('')
  const [selectedPriority, setSelectedPriority] = useState<string>('')

  // State for accepted shipment IDs in session
  const [acceptedIds, setAcceptedIds] = useState<Record<string, boolean>>({})
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Modal State
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5

  // Fetch pending shipments
  const fetchShipments = async (showToast = false) => {
    if (showToast) setRefreshing(true)
    else setLoading(true)

    try {
      const data = await logisticsService.getPendingShipments({ status: 'Pending' })
      setShipments(data.items)
      if (showToast) {
        toast.success('Đã cập nhật danh sách lô hàng mới nhất!')
      }
    } catch {
      toast.error('Không thể lấy danh sách lô hàng!')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchShipments()
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

      const matchesFarm = selectedFarm === '' || item.retailerName === selectedFarm
      const matchesHub = selectedHub === '' || item.receiverName === selectedHub

      let matchesPriority = true
      if (selectedPriority === 'Urgent') matchesPriority = item.priority === 'Urgent'
      if (selectedPriority === 'Standard') matchesPriority = item.priority === 'Standard'
      if (selectedPriority === 'Low') matchesPriority = item.priority === 'Low'

      return matchesSearch && matchesFarm && matchesHub && matchesPriority
    })
  }, [shipments, searchQuery, selectedFarm, selectedHub, selectedPriority])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize))
  const paginatedShipments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredShipments.slice(start, start + pageSize)
  }, [filteredShipments, currentPage, pageSize])

  // Stats calculation
  const totalPending = filteredShipments.filter((s) => !acceptedIds[s.shipmentId]).length
  const urgentCount = filteredShipments.filter((s) => s.priority === 'Urgent' && !acceptedIds[s.shipmentId]).length

  // Action: Accept Shipment
  const handleAcceptShipment = async (shipment: ShipmentItem) => {
    if (acceptedIds[shipment.shipmentId]) return
    setProcessingId(shipment.shipmentId)

    try {
      await logisticsService.acceptShipment(shipment.shipmentId)
      setAcceptedIds((prev) => ({ ...prev, [shipment.shipmentId]: true }))
      toast.success(`Đã nhận lô hàng ${shipment.shipmentCode} thành công!`, {
        description: 'Vui lòng kiểm tra tab "My Logistics" để cập nhật tiến độ giao hàng.',
      })
      if (selectedShipment?.shipmentId === shipment.shipmentId) {
        setIsModalOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.message || `Có lỗi xảy ra hoặc lô hàng ${shipment.shipmentCode} đã được tài xế khác tiếp nhận!`)
      fetchShipments()
    } finally {
      setProcessingId(null)
    }
  }

  // Action: Export Report
  const handleExportReport = () => {
    const csvContent =
      'Mã lô hàng,Nhà cung cấp,Điểm giao,Sản phẩm,Số lượng,Mức độ ưu tiên,Trạng thái\n' +
      filteredShipments
        .map(
          (s) =>
            `"${s.shipmentCode}","${s.retailerName}","${s.receiverName}","${s.productName}",${s.quantity} ${s.unit},"${s.priority}","${acceptedIds[s.shipmentId] ? 'Đã nhận' : 'Chờ lấy hàng'}"`
        )
        .join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Lo_Hang_Cho_Van_Chuyen_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Đã xuất báo cáo danh sách lô hàng!')
  }

  // Options for Dropdowns
  const farmOptions = Array.from(new Set(shipments.map((s) => s.retailerName)))
  const hubOptions = Array.from(new Set(shipments.map((s) => s.receiverName)))

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Logistics Operator
            </span>
            <span className="text-xs text-gray-500">FoodLink Đà Nẵng</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lô hàng chờ vận chuyển</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý và điều phối các chuyến hàng nông sản đang chờ lấy tại các trang trại Đà Nẵng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất báo cáo</span>
          </button>
          <button
            onClick={() => fetchShipments(true)}
            disabled={refreshing}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-emerald-100 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Bento Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Tổng lô hàng chờ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl group-hover:scale-105 transition-transform">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tổng lô hàng chờ</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5">{totalPending}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Sẵn sàng nhận ngay</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-r-2xl" />
        </div>

        {/* Card 2: Yêu cầu khẩn cấp */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-rose-200 transition-all">
          <div className="p-4 bg-rose-100 text-rose-700 rounded-2xl group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Yêu cầu khẩn cấp</p>
            <h3 className="text-3xl font-black text-rose-600 mt-0.5">
              {urgentCount < 10 ? `0${urgentCount}` : urgentCount}
            </h3>
            <p className="text-xs text-rose-500 font-medium mt-1">Cần lấy hàng trong 2-4 giờ</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-rose-500 rounded-r-2xl" />
        </div>

        {/* Card 3: Năng lực vận tải */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-blue-200 transition-all">
          <div className="p-4 bg-blue-100 text-blue-800 rounded-2xl group-hover:scale-105 transition-transform">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Năng lực vận tải</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5">85%</h3>
            <p className="text-xs text-blue-600 font-medium mt-1">Đã tối ưu hóa lộ trình xe</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-2xl" />
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Tìm kiếm theo Mã vận đơn, tên nông sản..."
              className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter: Farm */}
          <div className="lg:col-span-3">
            <select
              value={selectedFarm}
              onChange={(e) => {
                setSelectedFarm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">Điểm lấy hàng (Tất cả Trang trại)</option>
              {farmOptions.map((farm) => (
                <option key={farm} value={farm}>
                  {farm}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Hub */}
          <div className="lg:col-span-3">
            <select
              value={selectedHub}
              onChange={(e) => {
                setSelectedHub(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">Điểm giao hàng (Tất cả Hub/Siêu thị)</option>
              {hubOptions.map((hub) => (
                <option key={hub} value={hub}>
                  {hub}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Priority */}
          <div className="lg:col-span-2">
            <select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">Mức độ ưu tiên</option>
              <option value="Urgent">Khẩn cấp (Hàng dễ hỏng)</option>
              <option value="Standard">Tiêu chuẩn</option>
              <option value="Low">Ưu tiên thấp</option>
            </select>
          </div>
        </div>

        {/* Filter Reset Indicator if active */}
        {(searchQuery || selectedFarm || selectedHub || selectedPriority) && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-500 font-medium">
              Đang lọc theo: {searchQuery && `"${searchQuery}" `}
              {selectedFarm && `• Trang trại: ${selectedFarm} `}
              {selectedHub && `• Hub: ${selectedHub} `}
              {selectedPriority && `• Ưu tiên: ${selectedPriority}`}
            </span>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedFarm('')
                setSelectedHub('')
                setSelectedPriority('')
                setCurrentPage(1)
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center gap-1"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-sm font-medium text-gray-500">Đang tải danh sách lô hàng...</p>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
            <Package className="w-12 h-12 text-gray-300" />
            <p className="text-base font-bold text-gray-700">Không tìm thấy lô hàng nào phù hợp</p>
            <p className="text-xs text-gray-500">Vui lòng thay đổi từ khóa hoặc bộ lọc tìm kiếm.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Mã vận đơn</th>
                  <th className="px-6 py-4">Tuyến đường</th>
                  <th className="px-6 py-4">Sản phẩm & Yêu cầu</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {paginatedShipments.map((shipment) => {
                  const isAccepted = acceptedIds[shipment.shipmentId]
                  const isProcessing = processingId === shipment.shipmentId

                  return (
                    <tr key={shipment.shipmentId} className="hover:bg-gray-50/70 transition-colors group">
                      {/* Column 1: Mã vận đơn */}
                      <td className="px-6 py-5 font-medium">
                        <span className="font-bold text-emerald-700 text-base">{shipment.shipmentCode}</span>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" /> Tạo: {shipment.createdAt}
                        </p>
                      </td>

                      {/* Column 2: Tuyến đường */}
                      <td className="px-6 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <MapPin className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                            </span>
                            <span className="font-semibold text-gray-800 text-sm">{shipment.retailerName}</span>
                          </div>
                          <div className="h-3.5 w-0.5 bg-gray-200 ml-2.5" />
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                              <Flag className="w-3 h-3 text-rose-600" />
                            </span>
                            <span className="font-semibold text-gray-800 text-sm">{shipment.receiverName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Column 3: Sản phẩm & Yêu cầu */}
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-900 text-sm">
                            {shipment.productName} - {shipment.quantity}
                            {shipment.unit}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {shipment.tempRequirement === 'Cold' && (
                              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Thermometer className="w-3 h-3" /> Lạnh
                              </span>
                            )}

                            {shipment.priority === 'Urgent' ? (
                              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-full text-xs font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Khẩn cấp
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                Standard
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Column 4: Trạng thái */}
                      <td className="px-6 py-5">
                        {isAccepted ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Đã nhận đơn
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                            Chờ lấy hàng
                          </span>
                        )}
                      </td>

                      {/* Column 5: Thao tác */}
                      <td className="px-6 py-5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedShipment(shipment)
                            setIsModalOpen(true)
                          }}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
                        >
                          Chi tiết
                        </button>

                        {isAccepted ? (
                          <button
                            disabled
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold cursor-default inline-flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã nhận
                          </button>
                        ) : (
                          <a
                            href={`/logistics/${shipment.shipmentId}/confirm`}
                            className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 inline-flex items-center gap-1.5"
                          >
                            Nhận vận chuyển
                          </a>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="font-medium">
            Hiển thị {filteredShipments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
            {Math.min(currentPage * pageSize, filteredShipments.length)} trong số {filteredShipments.length} lô hàng
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-gray-600 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 font-bold rounded-lg text-xs transition-colors ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-gray-600 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Route Map Action Quick Link */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setIsMapModalOpen(true)}
          className="flex items-center gap-2 text-emerald-700 font-bold hover:underline text-sm bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 transition-colors"
        >
          <Map className="w-4 h-4 text-emerald-600" />
          <span>Xem bản đồ lộ trình tối ưu tại Đà Nẵng</span>
        </button>
      </div>

      {/* Shipment Details Modal */}
      {isModalOpen && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Package className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Chi tiết lô hàng {selectedShipment.shipmentCode}</h3>
                  <p className="text-xs text-gray-500">Mã đơn hàng liên kết: {selectedShipment.orderId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Supplier / Farm */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nhà cung cấp</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">{selectedShipment.retailerName}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedShipment.pickupAddress}</p>
                  </div>
                </div>

                {/* Receiver / Hub */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Điểm giao</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">{selectedShipment.receiverName}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedShipment.deliveryAddress}</p>
                    <p className="text-xs text-emerald-700 font-medium mt-1">SĐT: {selectedShipment.receiverPhone}</p>
                  </div>
                </div>

                {/* Product */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hàng hóa</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">
                      {selectedShipment.productName} - {selectedShipment.quantity} {selectedShipment.unit}
                    </p>
                  </div>
                </div>

                {/* Time Window */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Khung thời gian</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">
                      {selectedShipment.timeWindow || '08:30 - 10:30 Hôm nay'}
                    </p>
                  </div>
                </div>

                {/* Distance */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Khoảng cách di chuyển</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">{selectedShipment.distanceKm || 12.5} km</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold transition-colors"
              >
                Quay lại
              </button>
              {acceptedIds[selectedShipment.shipmentId] ? (
                <button
                  disabled
                  className="px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold inline-flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đã nhận vận chuyển
                </button>
              ) : (
                <button
                  onClick={() => handleAcceptShipment(selectedShipment)}
                  disabled={processingId === selectedShipment.shipmentId}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2"
                >
                  {processingId === selectedShipment.shipmentId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Đang xử lý...
                    </>
                  ) : (
                    'Xác nhận nhận lô hàng'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Optimal Route Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMapModalOpen(false)}
          />
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Bản đồ lộ trình tối ưu Đà Nẵng</h3>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 hover:bg-gray-200 text-gray-500 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-center">
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center gap-3">
                <Map className="w-16 h-16 text-emerald-600 animate-pulse" />
                <h4 className="text-lg font-bold text-gray-900">Tối ưu hóa tuyến đường vận tải</h4>
                <p className="text-sm text-gray-600 max-w-md">
                  Hệ thống đề xuất tuyến đường ngắn nhất từ Farm Hòa Vang → Siêu thị Co.op Mart qua đường Quốc lộ 14B &amp; Điện Biên Phủ (Tiết kiệm 22% nhiên liệu &amp; thời gian).
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
