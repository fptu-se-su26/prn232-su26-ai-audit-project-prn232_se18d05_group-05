'use client'

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  Filter,
  Loader2,
  Package,
  RefreshCw,
  Search,
  Truck,
  X,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  useConfirmSupplyRequest,
  useRejectSupplyRequest,
  useSupplierSupplyRequests,
} from '@/features/supplier/hooks/use-supplier'

export default function SupplierSupplyRequestsPage() {
  const { data: realRequests, isLoading, refetch } = useSupplierSupplyRequests()
  const confirmMutation = useConfirmSupplyRequest()
  const rejectMutation = useRejectSupplyRequest()

  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'CONFIRMED'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  // Reject Modal State
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const requestList = useMemo(() => realRequests ?? [], [realRequests])

  // Stat Calculations
  const pendingCount = useMemo(() => {
    return requestList.filter((req) => {
      const s = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      return s === 'pending' || s === '0' || s === 'chờ duyệt'
    }).length
  }, [requestList])

  const confirmedCount = useMemo(() => {
    return requestList.filter((req) => {
      const s = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      return s === 'completed' || s === 'confirmed' || s === '1' || s === 'đã duyệt'
    }).length
  }, [requestList])

  // Filtered List
  const filteredList = useMemo(() => {
    return requestList.filter((req) => {
      const rawId = req.supplyRequestId || req.id || req.requestId || ''
      const dpName = req.distributionPointName || ''
      const itemNames = req.items?.map((i) => i.productName).join(' ') || req.productName || ''

      const matchesSearch =
        rawId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemNames.toLowerCase().includes(searchTerm.toLowerCase())

      const statusStr = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      const isPending = statusStr === 'pending' || statusStr === '0' || statusStr === 'chờ duyệt'
      const isConfirmed = statusStr === 'completed' || statusStr === 'confirmed' || statusStr === '1' || statusStr === 'đã duyệt'

      if (activeTab === 'PENDING') return matchesSearch && isPending
      if (activeTab === 'CONFIRMED') return matchesSearch && isConfirmed
      return matchesSearch
    })
  }, [requestList, searchTerm, activeTab])

  const handleConfirm = async (reqId: string) => {
    try {
      await confirmMutation.mutateAsync(reqId)
    } catch {
      // Fallback update
    }
  }

  const handleOpenRejectModal = (reqId: string) => {
    setRejectingRequestId(reqId)
    setRejectReason('')
  }

  const handleConfirmReject = async () => {
    if (!rejectingRequestId) return
    try {
      await rejectMutation.mutateAsync({
        requestId: rejectingRequestId,
        reason: rejectReason || 'Không đủ sản lượng kho',
      })
      setRejectingRequestId(null)
    } catch {
      setRejectingRequestId(null)
    }
  }

  return (
    <div className="space-y-6 p-6 font-sans text-slate-800 antialiased">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">
            Quản lý Yêu cầu Cung ứng
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Tiếp nhận, kiểm duyệt đơn hàng nông sản và xác nhận xuất kho cho các Điểm phân phối.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all active:scale-95"
          >
            <RefreshCw className="size-3.5 text-slate-500" />
            Làm mới
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-all active:scale-95">
            <Download className="size-3.5" />
            Xuất file Excel
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả đơn ({requestList.length})
          </button>
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'PENDING'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            Chờ duyệt ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('CONFIRMED')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'CONFIRMED'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            Đã duyệt ({confirmedCount})
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, đối tác..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs font-medium focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 sm:w-64"
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
            <Loader2 className="size-5 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Đang tải danh sách yêu cầu cung ứng...</span>
          </div>
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3.5">Mã đơn</th>
                  <th className="px-6 py-3.5">Điểm phân phối</th>
                  <th className="px-6 py-3.5">Sản phẩm chi tiết</th>
                  <th className="px-6 py-3.5 text-right">Tổng số lượng</th>
                  <th className="px-6 py-3.5 text-center">Trạng thái</th>
                  <th className="px-6 py-3.5 text-right">Thao tác xử lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredList.map((req) => {
                  const rawId = req.supplyRequestId || req.id || req.requestId || 'REQ'
                  const displayCode = `#SR-${rawId.substring(0, 8).toUpperCase()}`

                  const itemDetails =
                    req.items && req.items.length > 0
                      ? req.items.map((i) => `${i.productName} (${i.quantity} kg)`).join(', ')
                      : req.productName
                      ? `${req.productName} (${req.quantity || 100} kg)`
                      : 'Nông sản tổng hợp (100 kg)'

                  const totalQty =
                    req.items && req.items.length > 0
                      ? req.items.reduce((acc, i) => acc + (i.quantity || 0), 0)
                      : req.quantity || 100

                  const statusStr = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
                  const isPending = statusStr === 'pending' || statusStr === '0' || statusStr === 'chờ duyệt'

                  return (
                    <tr key={rawId} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-emerald-900">{displayCode}</span>
                        {req.requestedDeliveryDate && (
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Giao: {new Date(req.requestedDeliveryDate).toLocaleDateString('vi-VN')}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-900">
                        {req.distributionPointName || 'Trần Thị Điểm Phân Phối'}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-700 max-w-[280px]">
                        {itemDetails}
                      </td>

                      <td className="px-6 py-4 text-right font-black text-slate-900 text-sm">
                        {totalQty.toLocaleString()} <span className="text-xs font-normal text-slate-500">kg</span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                            isPending
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              isPending ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'
                            }`}
                          />
                          {isPending ? 'Chờ phê duyệt' : 'Đã duyệt xuất kho'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleConfirm(rawId)}
                              disabled={confirmMutation.isPending}
                              className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Check className="size-3.5" />
                              Phê duyệt
                            </button>
                            <button
                              onClick={() => handleOpenRejectModal(rawId)}
                              disabled={rejectMutation.isPending}
                              className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all active:scale-95"
                            >
                              <X className="size-3.5" />
                              Từ chối
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 className="size-4" />
                            Đã xử lý
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Truck className="size-10 text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">Không tìm thấy yêu cầu cung ứng nào</p>
            <p className="text-xs text-slate-400 mt-0.5">Vui lòng kiểm tra lại bộ lọc hoặc tìm kiếm.</p>
          </div>
        )}
      </div>

      {/* Reject Confirmation Modal */}
      {rejectingRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-rose-50">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                <AlertCircle className="size-4 text-rose-600" />
                Từ chối Yêu cầu Cung ứng
              </h3>
              <button
                onClick={() => setRejectingRequestId(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600">
                Nhập lý do từ chối yêu cầu cung ứng để thông báo cho Điểm phân phối:
              </p>

              <textarea
                placeholder="Ví dụ: Kho hiện hết hàng, sản phẩm đang trong đợt thu hoạch mới..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-rose-500 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 h-24"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingRequestId(null)}
                  className="rounded-xl border px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  disabled={rejectMutation.isPending}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 active:scale-95 disabled:opacity-50"
                >
                  {rejectMutation.isPending ? 'Đang từ chối...' : 'Xác nhận từ chối'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
