'use client'

import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Clock,
  FileCheck2,
  Filter,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSupplierBatches, useSupplierInventory, useSupplierProducts, useSupplierSupplyRequests } from '@/features/supplier/hooks/use-supplier'

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const { data: productsData, isLoading: isLoadingProducts, refetch: refetchProducts } = useSupplierProducts()
  const { data: inventoryData, isLoading: isLoadingInventory, refetch: refetchInventory } = useSupplierInventory()
  const { data: supplyRequestsData, isLoading: isLoadingRequests, refetch: refetchRequests } = useSupplierSupplyRequests()
  const { data: batchesData, isLoading: isLoadingBatches } = useSupplierBatches()

  const productsList = useMemo(() => productsData ?? [], [productsData])
  const inventoryList = useMemo(() => inventoryData ?? [], [inventoryData])
  const supplyRequestsList = useMemo(() => supplyRequestsData ?? [], [supplyRequestsData])
  const batchesList = useMemo(() => batchesData ?? [], [batchesData])

  // Calculated Real Metrics
  const activeProductsCount = productsList.filter((p) => p.isActive !== false).length || productsList.length

  const totalStockKg = useMemo(() => {
    if (inventoryList.length > 0) {
      return inventoryList.reduce((acc, item) => acc + (item.quantity ?? item.availableQuantity ?? 0), 0)
    }
    return productsList.reduce((acc, item) => acc + (item.availableQuantity ?? item.quantity ?? 0), 0)
  }, [inventoryList, productsList])

  const pendingRequestsList = useMemo(() => {
    return supplyRequestsList.filter((req) => {
      const s = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      return s === 'pending' || s === '0' || s === 'chờ duyệt'
    })
  }, [supplyRequestsList])

  const pendingRequestsCount = pendingRequestsList.length

  const expiringBatchesList = useMemo(() => {
    return batchesList.filter((b) => {
      if (!b.expiryDate) return false
      const exp = new Date(b.expiryDate).getTime()
      const now = new Date().getTime()
      const diffDays = (exp - now) / (1000 * 3600 * 24)
      return diffDays >= 0 && diffDays <= 7
    })
  }, [batchesList])

  // Filtered Supply Requests for table
  const filteredRequests = useMemo(() => {
    return supplyRequestsList.filter((req) => {
      const reqId = req.supplyRequestId || req.id || req.requestId || ''
      const dpName = req.distributionPointName || ''
      const itemNames = req.items?.map((i) => i.productName).join(' ') || req.productName || ''

      const matchesSearch =
        reqId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemNames.toLowerCase().includes(searchTerm.toLowerCase())

      const statusStr = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      let matchesStatus = true
      if (statusFilter === 'PENDING') {
        matchesStatus = statusStr === 'pending' || statusStr === '0'
      } else if (statusFilter === 'COMPLETED') {
        matchesStatus = statusStr === 'completed' || statusStr === 'confirmed' || statusStr === '1'
      }

      return matchesSearch && matchesStatus
    })
  }, [supplyRequestsList, searchTerm, statusFilter])

  const handleRefreshAll = () => {
    refetchProducts()
    refetchInventory()
    refetchRequests()
  }

  return (
    <div className="space-y-8 p-6 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-7 text-white shadow-xl shadow-emerald-950/10">
        <div className="absolute -right-10 -top-10 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-40 -bottom-10 size-48 rounded-full bg-teal-400/10 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-800/50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-md">
              <Sparkles className="size-3.5 text-emerald-300" />
              Bảng Điều Hành Nhà Cung Cấp
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Tổng Quan Vận Hành Nông Sản
            </h1>
            <p className="text-sm font-medium text-emerald-100/80">
              Giám sát tồn kho khả dụng, điều phối yêu cầu cung ứng và mã QR truy xuất nguồn gốc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefreshAll}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white shadow-xs backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <RefreshCw className="size-3.5" />
              Làm mới
            </button>
            <Link
              href="/supplier/products"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-emerald-950 shadow-md transition-all hover:bg-emerald-300 active:scale-95"
            >
              <Plus className="size-4" />
              Tạo Lô Hàng Mới
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Bento Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Metric 1 */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Sản phẩm hoạt động
            </span>
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Boxes className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            {isLoadingProducts ? (
              <Loader2 className="size-6 animate-spin text-emerald-600" />
            ) : (
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {activeProductsCount}
              </span>
            )}
            <span className="text-xs font-semibold text-slate-500">loại mặt hàng</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="size-3.5" />
            <span>Sẵn sàng cung ứng ra thị trường</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-teal-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tổng tồn kho khả dụng
            </span>
            <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Package className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            {isLoadingInventory || isLoadingProducts ? (
              <Loader2 className="size-6 animate-spin text-teal-600" />
            ) : (
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {totalStockKg.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-slate-500">kg</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-teal-700">
            <TrendingUp className="size-3.5" />
            <span>Cập nhật trực tiếp từ kho bãi</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="group relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/30 p-6 shadow-xs transition-all hover:border-amber-400 hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Yêu cầu chờ phê duyệt
            </span>
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Clock className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            {isLoadingRequests ? (
              <Loader2 className="size-6 animate-spin text-amber-600" />
            ) : (
              <span className="text-3xl font-black tracking-tight text-amber-950">
                {pendingRequestsCount}
              </span>
            )}
            <span className="text-xs font-bold text-amber-800">đơn chờ xuất kho</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
              <ShieldAlert className="size-3.5" />
              Cần xử lý trong ngày
            </span>
            <Link
              href="/supplier/supply-requests"
              className="font-bold text-amber-900 hover:underline flex items-center gap-0.5"
            >
              Xử lý ngay <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (2 cols): Main Table */}
        <div className="space-y-4 lg:col-span-2">
          {/* Table Header & Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Yêu cầu cung ứng mới nhận
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Các đơn đặt hàng nông sản từ Điểm phân phối gửi đến.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm đơn, sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-44 rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 sm:w-56"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-1.5 px-2.5 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-hidden"
              >
                <option value="ALL">Tất cả đơn</option>
                <option value="PENDING">Chờ duyệt</option>
                <option value="COMPLETED">Đã hoàn thành</option>
              </select>
            </div>
          </div>

          {/* Supply Requests Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
            {isLoadingRequests ? (
              <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
                <Loader2 className="size-5 animate-spin text-emerald-600" />
                <span className="text-xs font-medium">Đang tải danh sách đơn cung ứng...</span>
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-3.5">Mã đơn</th>
                      <th className="px-5 py-3.5">Điểm phân phối</th>
                      <th className="px-5 py-3.5">Mặt hàng nông sản</th>
                      <th className="px-5 py-3.5 text-right">Số lượng</th>
                      <th className="px-5 py-3.5 text-center">Trạng thái</th>
                      <th className="px-5 py-3.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredRequests.map((req) => {
                      const rawId = req.supplyRequestId || req.id || req.requestId || 'REQ'
                      const displayCode = `#SR-${rawId.substring(0, 8).toUpperCase()}`

                      const itemNames =
                        req.items && req.items.length > 0
                          ? req.items.map((i) => i.productName).join(', ')
                          : req.productName || 'Nông sản tổng hợp'

                      const totalQty =
                        req.items && req.items.length > 0
                          ? req.items.reduce((acc, i) => acc + (i.quantity || 0), 0)
                          : req.quantity || 0

                      const statusStr = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
                      const isPending = statusStr === 'pending' || statusStr === '0' || statusStr === 'chờ duyệt'

                      return (
                        <tr key={rawId} className="transition-colors hover:bg-slate-50/70">
                          <td className="px-5 py-4 font-mono font-bold text-emerald-800">
                            {displayCode}
                          </td>
                          <td className="px-5 py-4 font-semibold text-slate-900">
                            {req.distributionPointName || 'Điểm phân phối'}
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-700 max-w-[200px] truncate">
                            {itemNames}
                          </td>
                          <td className="px-5 py-4 text-right font-black text-slate-900">
                            {totalQty > 0 ? `${totalQty.toLocaleString()} kg` : '100 kg'}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
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
                              {isPending ? 'Chờ duyệt' : 'Đã hoàn thành'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Link
                              href="/supplier/supply-requests"
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-all active:scale-95"
                            >
                              <FileCheck2 className="size-3.5" />
                              Xem & Duyệt
                            </Link>
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
                <p className="text-sm font-bold text-slate-700">Chưa có yêu cầu cung ứng nào</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Các yêu cầu mới từ Điểm phân phối sẽ xuất hiện tự động tại đây.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Alerts & Operational Widgets */}
        <div className="space-y-6">
          {/* Expiry Risk Widget */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
              <AlertTriangle className="size-4 text-amber-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Cảnh báo nông sản sắp hết hạn (≤ 7 ngày)
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              {expiringBatchesList.length > 0 ? (
                expiringBatchesList.map((b) => (
                  <div
                    key={b.batchCode}
                    className="flex items-center justify-between rounded-xl bg-white p-3 border border-amber-200/80 shadow-2xs"
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900">{b.productName || b.batchCode}</p>
                      <p className="text-[11px] font-mono text-amber-800">
                        Hạn: {b.expiryDate}
                      </p>
                    </div>
                    <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-900">
                      {b.quantity} kg
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs font-medium text-slate-500">
                  Tất cả các lô nông sản hiện tại đều đạt chất lượng an toàn tươi ngon!
                </div>
              )}
            </div>
          </div>

          {/* Operational Progress Bar Widget */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-900 to-teal-950 p-6 text-white shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Năng lực đáp ứng nguồn cung
            </h3>
            <p className="text-2xl font-black text-white mt-1">100% Khả Dụng</p>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-emerald-100">
                <span>Rau củ quả tươi Đà Lạt</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-950/60">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
              </div>
            </div>

            <div className="mt-5 border-t border-emerald-800/80 pt-4 text-[11px] text-emerald-200/80 flex items-center justify-between">
              <span>Đạt chứng nhận VietGAP</span>
              <span className="font-bold text-emerald-300">FoodLink Đà Nẵng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
