'use client'

import { AlertTriangle, Boxes, CheckCircle2, ChevronRight, Clock, Loader2, Package, Plus, QrCode, Search, ShieldAlert, Sparkles, TrendingUp, Truck } from 'lucide-react'
import { useState } from 'react'
import { useSupplierInventory, useSupplierProducts, useSupplierSupplyRequests } from '@/features/supplier/hooks/use-supplier'

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch data from API
  const { data: realProducts, isLoading: isLoadingProducts } = useSupplierProducts()
  const { data: realInventory, isLoading: isLoadingInventory } = useSupplierInventory()
  const { data: realSupplyRequests, isLoading: isLoadingRequests } = useSupplierSupplyRequests()

  const productsList = realProducts ?? []
  const inventoryList = realInventory ?? []
  const supplyRequestsList = realSupplyRequests ?? []

  // Calculated Stats
  const activeProductsCount = productsList.filter((p) => p.isActive).length
  const totalStockKg = inventoryList.reduce((acc, item) => acc + (item.quantity ?? item.availableQuantity ?? 0), 0)
  const pendingRequestsCount = supplyRequestsList.filter((r) => String(r.status).toLowerCase() === 'pending').length
  const approvedRequestsCount = supplyRequestsList.filter((r) => String(r.status).toLowerCase() === 'approved' || String(r.status).toLowerCase() === 'completed').length

  // Live Search Filtering
  const filteredRequests = supplyRequestsList.filter((item) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      (item.requestNumber && item.requestNumber.toLowerCase().includes(query)) ||
      (item.distributionPointName && item.distributionPointName.toLowerCase().includes(query)) ||
      (item.productName && item.productName.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb & Top Bar Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Trang chủ</span>
            <ChevronRight className="size-3.5" />
            <span className="font-bold text-emerald-800">Tổng quan vận hành Supplier</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">FoodLink B2B — Dashboard Vận Hành</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã đơn, đối tác, sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 rounded-full border bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 shadow-2xs focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <a
            href="/supplier/products"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <Plus className="size-4" />
            Tạo lô hàng mới
          </a>
        </div>
      </div>

      {/* Quick Stats Bento Widgets */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group flex items-center justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-xs transition-all hover:border-emerald-500">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sản phẩm đang kinh doanh</p>
            {isLoadingProducts ? (
              <Loader2 className="size-5 animate-spin text-emerald-700 my-2" />
            ) : (
              <h3 className="text-3xl font-extrabold text-emerald-900 mt-1">{activeProductsCount}</h3>
            )}
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
              <TrendingUp className="size-3.5" />
              Cập nhật theo thời gian thực
            </p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition-transform group-hover:scale-110">
            <Boxes className="size-7" />
          </div>
        </div>

        <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-500">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tổng tồn kho khả dụng</p>
            {isLoadingInventory ? (
              <Loader2 className="size-5 animate-spin text-emerald-700 my-2" />
            ) : (
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalStockKg.toLocaleString()} kg</h3>
            )}
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              <Clock className="size-3.5" />
              Tổng khối lượng hiện có
            </p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-800 transition-transform group-hover:scale-110">
            <Package className="size-7" />
          </div>
        </div>

        <div className="group flex items-center justify-between rounded-2xl border border-rose-100 bg-white p-5 shadow-xs transition-all hover:border-rose-400">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Yêu cầu chờ duyệt</p>
            {isLoadingRequests ? (
              <Loader2 className="size-5 animate-spin text-rose-700 my-2" />
            ) : (
              <h3 className="text-3xl font-extrabold text-rose-800 mt-1">{pendingRequestsCount}</h3>
            )}
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-rose-700">
              <AlertTriangle className="size-3.5" />
              Cần xử lý trong ngày
            </p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-800 transition-transform group-hover:scale-110">
            <CheckCircle2 className="size-7" />
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Incoming Supply Requests Table & Order Status Summary */}
        <div className="col-span-12 space-y-6 lg:col-span-8">
          {/* Table Yêu cầu cung ứng mới nhận */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50/60">
              <div>
                <h2 className="text-base font-bold text-slate-900">Yêu cầu cung ứng mới nhận</h2>
                {searchQuery && (
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    Kết quả tìm kiếm cho: "{searchQuery}"
                  </p>
                )}
              </div>
              <a href="/supplier/supply-requests" className="text-xs font-bold text-emerald-700 hover:underline">
                Xem tất cả
              </a>
            </div>

            <div className="overflow-x-auto">
              {isLoadingRequests ? (
                <div className="flex items-center justify-center p-8 text-slate-500 gap-2">
                  <Loader2 className="size-4 animate-spin text-emerald-700" />
                  <span className="text-xs">Đang tải danh sách yêu cầu cung ứng...</span>
                </div>
              ) : filteredRequests.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-3.5">Mã yêu cầu</th>
                      <th className="px-6 py-3.5">Điểm phân phối</th>
                      <th className="px-6 py-3.5">Mặt hàng</th>
                      <th className="px-6 py-3.5">Số lượng</th>
                      <th className="px-6 py-3.5">Trạng thái</th>
                      <th className="px-6 py-3.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredRequests.map((item) => {
                      const reqId = item.id || item.requestId || 'unknown'
                      return (
                        <tr key={reqId} className="transition-colors hover:bg-slate-50/60">
                          <td className="px-6 py-4 font-bold font-mono text-emerald-800">
                            {item.requestNumber ?? `#SR-${reqId.substring(0, 6)}`}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{item.distributionPointName}</td>
                          <td className="px-6 py-4 text-slate-700">{item.productName}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {item.quantity} {item.unit ?? 'kg'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href="/supplier/supply-requests"
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-emerald-800"
                            >
                              Xem & Duyệt
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  {searchQuery
                    ? `Không tìm thấy đơn yêu cầu nào khớp với từ khóa "${searchQuery}".`
                    : 'Hiện chưa có Yêu cầu cung ứng mới.'}
                </div>
              )}
            </div>
          </div>

          {/* Supplier Dispatch Status & SLA Performance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Trạng thái Xử lý Xuất kho hôm nay</h3>
                <p className="text-xs text-slate-500">Tiến độ đóng gói và bàn giao cho Đơn vị Vận chuyển</p>
              </div>
              <Truck className="size-5 text-emerald-700" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500 font-medium">Chờ duyệt & Đóng gói</p>
                <p className="text-xl font-bold text-amber-800 mt-1">{pendingRequestsCount} đơn</p>
                <p className="text-[11px] text-slate-400 mt-1">Cần hoàn tất trước 16:00</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500 font-medium">Đã xuất kho bàn giao</p>
                <p className="text-xl font-bold text-emerald-800 mt-1">{approvedRequestsCount} đơn</p>
                <p className="text-[11px] text-emerald-600 mt-1">Đã bàn giao vận chuyển</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500 font-medium">Tỉ lệ đáp ứng nguồn hàng</p>
                <p className="text-xl font-bold text-blue-800 mt-1">100%</p>
                <p className="text-[11px] text-blue-600 mt-1">Đạt chuẩn cam kết SLA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Expiry Alerts & Widgets */}
        <div className="col-span-12 space-y-6 lg:col-span-4">
          {/* Expiry Risk Box */}
          <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 border-b border-rose-100 bg-rose-50/70 px-5 py-3.5 text-rose-900">
              <AlertTriangle className="size-4 text-rose-600" />
              <h3 className="text-sm font-bold">Cảnh báo hết hạn (&lt; 7 ngày)</h3>
            </div>

            <div className="p-4 space-y-3">
              <div className="p-4 text-center text-xs text-slate-500">
                Không có lô hàng nào sắp hết hạn.
              </div>
            </div>
          </div>

          {/* Supply Capacity Widget */}
          <div className="relative overflow-hidden rounded-2xl bg-emerald-900 p-5 text-white shadow-md">
            <h3 className="text-base font-bold mb-1">Năng lực cung ứng</h3>
            <p className="text-xs text-emerald-200 mb-4">Đang sẵn sàng đáp ứng 100%</p>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Nông sản & Rau củ</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
