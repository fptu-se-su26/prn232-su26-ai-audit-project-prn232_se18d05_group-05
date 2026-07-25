'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  Search,
  Truck,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import { orderService } from '@/services/order.service'
import type { SupplyRequestResponse } from '@/types/order'

type FilterStatus = 'ALL' | 'Pending' | 'Approved' | 'InTransit' | 'Completed' | 'Cancelled'

export default function OrdersListPage() {
  const [orders, setOrders] = useState<SupplyRequestResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('ALL')

  // Selected Order for Detail Modal
  const [detailOrder, setDetailOrder] = useState<SupplyRequestResponse | null>(null)

  // Selected Order for Confirm Receipt Modal (UC23)
  const [confirmOrder, setConfirmOrder] = useState<SupplyRequestResponse | null>(null)
  const [isFullReceived, setIsFullReceived] = useState<boolean>(true)
  const [confirmNote, setConfirmNote] = useState<string>('')
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  // Load orders
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await orderService.getOrders()
      setOrders(data)
    } catch {
      toast.error('Không thể tải danh sách yêu cầu cung ứng!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const formatPrice = (val?: number) =>
    typeof val === 'number'
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
      : '0 ₫'

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return 'N/A'
    try {
      const d = new Date(isoStr)
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoStr
    }
  }

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.fullAddress || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items?.some((i) => i.productName.toLowerCase().includes(searchQuery.toLowerCase()))

    if (selectedStatus === 'ALL') return matchesSearch
    if (selectedStatus === 'Pending') return matchesSearch && order.status === 'Pending'
    if (selectedStatus === 'Approved') return matchesSearch && order.status === 'Approved'
    if (selectedStatus === 'InTransit')
      return matchesSearch && (order.status === 'InTransit' || order.status === 'Dispatched')
    if (selectedStatus === 'Completed')
      return matchesSearch && (order.status === 'Completed' || order.status === 'Received')
    if (selectedStatus === 'Cancelled')
      return matchesSearch && (order.status === 'Cancelled' || order.status === 'Rejected')

    return matchesSearch
  })

  // Handle UC23: Submit Confirm Receipt
  const handleConfirmReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmOrder) return

    setIsConfirming(true)
    try {
      const targetId = confirmOrder.id || confirmOrder.orderId
      await orderService.confirmReceipt(targetId, {
        isFullReceived,
        note: confirmNote,
      })

      // Update state locally
      const updatedStatus = isFullReceived ? 'Completed' : 'Received'
      setOrders((prev) =>
        prev.map((o) =>
          o.id === targetId || o.orderId === targetId
            ? { ...o, status: updatedStatus }
            : o
        )
      )

      toast.success(
        isFullReceived
          ? 'Xác nhận đã nhận đủ 100% hàng hóa thành công!'
          : 'Đã ghi nhận phản hồi nhận hàng (Báo thiếu/hư hỏng).'
      )
      setConfirmOrder(null)
      setConfirmNote('')
    } catch {
      toast.error('Có lỗi xảy ra khi xác nhận nhận hàng!')
    } finally {
      setIsConfirming(false)
    }
  }

  // Helper status badge
  const renderStatusBadge = (status: SupplyRequestResponse['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
            <Clock className="size-3.5" />
            Đang chờ duyệt (Pending)
          </span>
        )
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
            <CheckCircle2 className="size-3.5" />
            Đã duyệt (Approved)
          </span>
        )
      case 'Dispatched':
      case 'InTransit':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200">
            <Truck className="size-3.5" />
            Đang vận chuyển (In Transit)
          </span>
        )
      case 'Received':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-200">
            <CheckCircle2 className="size-3.5" />
            Đã nhận (Báo thiếu/hỏng)
          </span>
        )
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="size-3.5" />
            Hoàn thành (Completed)
          </span>
        )
      case 'Cancelled':
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">
            <XCircle className="size-3.5" />
            Đã hủy / Từ chối
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                UC23 & UC24 - Quản lý Cung ứng
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
              Yêu cầu cung ứng thực phẩm
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Theo dõi tiến độ giao hàng và thực hiện xác nhận nhận thực phẩm cho điểm phân phối.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-all"
            >
              <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
            <Link
              href={APP_ROUTES.orders.create}
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-zinc-800 transition-all hover:scale-[1.02]"
            >
              <Plus className="size-4" />
              Tạo yêu cầu mới
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Search input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm mã đơn, địa chỉ, sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200/80 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {(
                [
                  { id: 'ALL', label: 'Tất cả' },
                  { id: 'Pending', label: 'Chờ duyệt' },
                  { id: 'Approved', label: 'Đã duyệt' },
                  { id: 'InTransit', label: 'Đang vận chuyển' },
                  { id: 'Completed', label: 'Đã nhận / Hoàn thành' },
                  { id: 'Cancelled', label: 'Đã hủy' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id as FilterStatus)}
                  className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${selectedStatus === tab.id
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-100'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Cards List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-200/80 shadow-sm">
            <RefreshCw className="size-8 animate-spin text-emerald-600 mb-3" />
            <p className="text-sm font-medium text-zinc-500">Đang tải danh sách yêu cầu cung ứng...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-200/80 shadow-sm text-center p-6">
            <div className="size-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
              <FileText className="size-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Không tìm thấy yêu cầu nào</h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-md">
              Chưa có yêu cầu cung ứng nào phù hợp với bộ lọc tìm kiếm của bạn.
            </p>
            <Link
              href={APP_ROUTES.orders.create}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-zinc-800 transition-all"
            >
              <Plus className="size-4" />
              Tạo đơn ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const displayId = order.orderId || order.id || 'N/A'
              const isEligibleForConfirm =
                order.status !== 'Completed' &&
                order.status !== 'Cancelled' &&
                order.status !== 'Rejected'

              return (
                <div
                  key={displayId}
                  className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold border border-emerald-100">
                        <Package className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-extrabold text-zinc-900">
                            #{displayId}
                          </span>
                          {renderStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Tạo lúc: {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-xs text-zinc-500 font-medium">Tổng giá trị đơn</p>
                      <p className="text-lg font-black text-emerald-800">
                        {formatPrice(order.finalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Sản phẩm đăng ký ({order.items?.length || 0} sản phẩm)
                      </p>
                      <div className="space-y-2">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50/80 text-sm border border-zinc-100"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                <span className="font-semibold text-zinc-900">
                                  {item.productName}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs font-medium text-zinc-600">
                                <span>
                                  {item.quantity} {item.unit} x {formatPrice(item.unitPrice)}
                                </span>
                                <span className="font-bold text-zinc-900">
                                  = {formatPrice(item.unitPrice * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-zinc-500 italic">Thực phẩm chuẩn theo đơn vị sỉ</p>
                        )}
                      </div>
                    </div>

                    {/* Delivery Address & Note */}
                    <div className="space-y-3 bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100 text-xs">
                      <div className="flex items-start gap-2">
                        <MapPin className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-zinc-900">Địa chỉ giao hàng</p>
                          <p className="text-zinc-600 mt-0.5">{order.fullAddress || 'Địa chỉ mặc định'}</p>
                        </div>
                      </div>

                      {order.note && (
                        <div className="border-t border-zinc-200/60 pt-2">
                          <p className="font-bold text-zinc-700">Ghi chú:</p>
                          <p className="text-zinc-600 italic">{order.note}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                    <button
                      onClick={() => setDetailOrder(order)}
                      className="text-xs font-bold text-zinc-600 hover:text-black transition-colors flex items-center gap-1"
                    >
                      Xem chi tiết tiến độ
                      <ArrowRight className="size-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {/* UC23 Action Button */}
                      {isEligibleForConfirm && (
                        <button
                          onClick={() => {
                            setConfirmOrder(order)
                            setIsFullReceived(true)
                            setConfirmNote('')
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition-all hover:scale-[1.02]"
                        >
                          <CheckCircle2 className="size-4" />
                          Xác nhận đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* UC23: Confirm Receipt Modal Dialog */}
      {confirmOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    UC23: Xác nhận nhận hàng
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Đơn hàng #{confirmOrder.orderId || confirmOrder.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfirmOrder(null)}
                className="size-8 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmReceiptSubmit} className="space-y-5">
              {/* Option 1: Full received vs Partial received */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-700 block">
                  Tình trạng kiểm nhận thực phẩm tại điểm phân phối:
                </label>

                <div className="grid grid-cols-1 gap-3">
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${isFullReceived
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="receivedStatus"
                      checked={isFullReceived}
                      onChange={() => setIsFullReceived(true)}
                      className="mt-1 accent-emerald-700"
                    />
                    <div>
                      <span className="font-bold text-sm text-zinc-900 block">
                        🟢 Nhận đủ 100% số lượng & Đạt chất lượng
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5 block">
                        Thực phẩm tươi ngon, đóng gói nguyên vẹn đúng số lượng đăng ký.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${!isFullReceived
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="receivedStatus"
                      checked={!isFullReceived}
                      onChange={() => setIsFullReceived(false)}
                      className="mt-1 accent-amber-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                        <AlertCircle className="size-4 text-amber-600" />
                        ⚠️ Nhận hàng có báo thiếu / Thực phẩm hư hỏng
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5 block">
                        Ghi nhận sự cố hư hỏng hoặc giao thiếu để hệ thống xử lý hỗ trợ.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Note / Feedback */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  Ghi chú hoặc phản hồi khi nhận hàng:
                </label>
                <textarea
                  rows={3}
                  value={confirmNote}
                  onChange={(e) => setConfirmNote(e.target.value)}
                  placeholder={
                    isFullReceived
                      ? 'Ghi chú thêm cho tài xế hoặc nhà cung cấp (không bắt buộc)...'
                      : 'Mô tả chi tiết sản phẩm thiếu hoặc bị hư hỏng (ví dụ: dập 2kg rau, thiếu 1 thùng xoài)...'
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-4">
                <button
                  type="button"
                  onClick={() => setConfirmOrder(null)}
                  className="rounded-2xl border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isConfirming}
                  className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {isConfirming ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Đang lưu xác nhận...
                    </>
                  ) : (
                    'Hoàn tất xác nhận (UC23)'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Progress Modal */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Chi tiết Yêu cầu cung ứng #{detailOrder.orderId || detailOrder.id}
                </h3>
                <p className="text-xs text-zinc-500">
                  Khởi tạo ngày: {formatDate(detailOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className="size-8 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-xs font-bold text-zinc-600">Trạng thái hiện tại</span>
                {renderStatusBadge(detailOrder.status)}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-zinc-900 uppercase">Danh sách thực phẩm</p>
                {detailOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-zinc-50 text-xs">
                    <span className="font-semibold text-zinc-900">{item.productName}</span>
                    <span className="font-bold text-zinc-700">
                      {item.quantity} {item.unit} x {formatPrice(item.unitPrice)} = {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Tạm tính:</span>
                  <span className="font-bold text-zinc-900">{formatPrice(detailOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold text-zinc-900">{formatPrice(detailOrder.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 text-sm font-black border-t border-zinc-200 pt-2">
                  <span>Tổng tiền:</span>
                  <span>{formatPrice(detailOrder.finalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-zinc-100 pt-4">
              <button
                onClick={() => setDetailOrder(null)}
                className="rounded-2xl bg-black px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-all"
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
