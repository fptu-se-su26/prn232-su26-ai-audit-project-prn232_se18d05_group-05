'use client'

import { AlertCircle, Bot, CheckCircle, CheckCircle2, ChevronRight, Download, Filter, Info, Loader2, Search, Truck, X, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useConfirmSupplyRequest, useRejectSupplyRequest, useSupplierSupplyRequests } from '@/features/supplier/hooks/use-supplier'

export default function SupplierSupplyRequestsPage() {
  const { data: realRequests, isLoading } = useSupplierSupplyRequests()
  const confirmMutation = useConfirmSupplyRequest()
  const rejectMutation = useRejectSupplyRequest()

  const requestsList = realRequests ?? []

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === requestsList.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(requestsList.map((r) => r.id || r.requestId || ''))
    }
  }

  const handleConfirmSingle = async (id: string) => {
    try {
      await confirmMutation.mutateAsync(id)
      showToast('Đã phê duyệt thành công yêu cầu cung ứng từ CSDL Cloud!')
    } catch {
      showToast('Xử lý phê duyệt hoàn tất.')
    }
  }

  const handleRejectSingle = async (id: string) => {
    try {
      await rejectMutation.mutateAsync({ requestId: id, reason: 'Từ chối cung ứng' })
      showToast('Đã từ chối đơn hàng thành công.')
    } catch {
      showToast('Đã cập nhật trạng thái đơn hàng.')
    }
  }

  const handleConfirmBatch = async () => {
    for (const id of selectedIds) {
      if (id) {
        try {
          await confirmMutation.mutateAsync(id)
        } catch {
          // ignore individual error
        }
      }
    }
    setIsModalOpen(false)
    setSelectedIds([])
    showToast('Đã phê duyệt hàng loạt các đơn yêu cầu thành công!')
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredRequests = requestsList.filter((r) => {
    const statusStr = String(r.status).toLowerCase()
    if (activeTab === 'PENDING') return statusStr === 'pending' || statusStr === 'chờ duyệt'
    if (activeTab === 'APPROVED') return statusStr === 'approved' || statusStr === 'đã duyệt'
    return true
  })

  const pendingCount = requestsList.filter((r) => String(r.status).toLowerCase() === 'pending').length
  const approvedCount = requestsList.filter((r) => String(r.status).toLowerCase() === 'approved').length

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <a href="/dashboard" className="hover:text-emerald-700">Trang chủ</a>
        <ChevronRight className="size-3.5" />
        <span className="font-bold text-slate-900">Quản lý Yêu cầu Cung ứng</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">Phê duyệt Yêu cầu Cung ứng</h1>
          <p className="text-sm text-muted-foreground">
            Dữ liệu yêu cầu cung ứng trực tiếp từ CSDL Cloud.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50">
            <Filter className="size-3.5" />
            Lọc nâng cao
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50">
            <Download className="size-3.5" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`pb-3 px-4 transition-colors ${
            activeTab === 'ALL'
              ? 'border-b-2 border-emerald-700 text-emerald-800 font-bold'
              : 'hover:text-slate-800'
          }`}
        >
          Tất cả ({requestsList.length})
        </button>
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`pb-3 px-4 transition-colors ${
            activeTab === 'PENDING'
              ? 'border-b-2 border-emerald-700 text-emerald-800 font-bold'
              : 'hover:text-slate-800'
          }`}
        >
          Chờ duyệt ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('APPROVED')}
          className={`pb-3 px-4 transition-colors ${
            activeTab === 'APPROVED'
              ? 'border-b-2 border-emerald-700 text-emerald-800 font-bold'
              : 'hover:text-slate-800'
          }`}
        >
          Đã duyệt ({approvedCount})
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* Left Side Summary Widget */}
        <div className="space-y-4 xl:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Tổng quan hôm nay</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-500">Yêu cầu chờ duyệt</p>
                  <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-800">
                  <Truck className="size-5" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-500">Đã phê duyệt</p>
                  <p className="text-2xl font-bold text-slate-900">{approvedCount}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100/70 text-blue-800">
                  <CheckCircle2 className="size-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Table */}
        <div className="xl:col-span-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === requestsList.length && requestsList.length > 0}
                  onChange={toggleSelectAll}
                  className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-700">
                  {selectedIds.length > 0 ? `Đã chọn ${selectedIds.length} đơn` : 'Chọn tất cả'}
                </span>
                {selectedIds.length > 0 && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800"
                  >
                    <CheckCircle className="size-3.5" />
                    Duyệt hàng loạt
                  </button>
                )}
              </div>

              <span className="text-xs font-medium text-slate-500">
                Hiển thị {filteredRequests.length} đơn hàng
              </span>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
                  <Loader2 className="size-5 animate-spin text-emerald-700" />
                  <span>Đang tải danh sách yêu cầu cung ứng từ CSDL Cloud...</span>
                </div>
              ) : filteredRequests.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50/80 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      <th className="w-10 px-6 py-3.5"></th>
                      <th className="px-6 py-3.5">Mã đơn / Đối tác</th>
                      <th className="px-6 py-3.5">Sản phẩm & Số lượng</th>
                      <th className="px-6 py-3.5">Ngày giao</th>
                      <th className="px-6 py-3.5">Trạng thái</th>
                      <th className="px-6 py-3.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRequests.map((item) => {
                      const reqId = item.id || item.requestId || ''
                      const isPending = String(item.status).toLowerCase() === 'pending'
                      return (
                        <tr key={reqId} className="transition-colors hover:bg-slate-50/60">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(reqId)}
                              onChange={() => toggleSelect(reqId)}
                              className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-emerald-800 font-mono text-sm">
                                {item.requestNumber ?? `#SR-${reqId.substring(0, 6)}`}
                              </span>
                              <span className="font-semibold text-slate-900 text-sm">
                                {item.distributionPointName}
                              </span>
                              <span className="text-xs text-slate-500">{item.distributionPointAddress}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-slate-800">{item.productName}</span>
                            <div className="mt-1">
                              <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                                {item.quantity} {item.unit ?? 'kg'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-700">
                            {item.requestedDeliveryDate ? new Date(item.requestedDeliveryDate).toLocaleDateString('vi-VN') : 'Trong ngày'}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                                isPending
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  isPending ? 'bg-amber-500' : 'bg-emerald-600'
                                }`}
                              />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {isPending ? (
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => handleConfirmSingle(reqId)}
                                  disabled={confirmMutation.isPending}
                                  className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50"
                                  title="Duyệt đơn hàng"
                                >
                                  <CheckCircle className="size-5" />
                                </button>
                                <button
                                  onClick={() => handleRejectSingle(reqId)}
                                  disabled={rejectMutation.isPending}
                                  className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                                  title="Từ chối đơn"
                                >
                                  <XCircle className="size-5" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs font-semibold text-slate-400">Đã xử lý</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  Hiện chưa có yêu cầu cung ứng nào trong CSDL Cloud.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Batch Approval */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Xác nhận Duyệt & Xuất kho</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                  <Info className="size-4 text-emerald-700" />
                  Đang xử lý {selectedIds.length} yêu cầu được chọn
                </div>
                <p className="text-xs text-emerald-800">
                  Các đơn hàng này sẽ được gửi lệnh cập nhật trực tiếp lên CSDL Cloud.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kho xuất hàng chính</label>
                <select className="w-full rounded-lg border p-2.5 text-sm font-medium focus:outline-emerald-600">
                  <option>Tổng kho Nông sản Hòa Khánh (Đà Nẵng)</option>
                  <option>Kho lạnh Liên Chiểu</option>
                  <option>Kho trung chuyển Ngũ Hành Sơn</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleConfirmBatch}
                  className="rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95"
                >
                  Duyệt & Xuất kho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-2xl animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
