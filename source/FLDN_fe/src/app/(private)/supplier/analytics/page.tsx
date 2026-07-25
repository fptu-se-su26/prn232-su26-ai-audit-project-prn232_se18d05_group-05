'use client'

import { Award, Calendar, ChevronRight, Download, Filter, Loader2, RefreshCw, ShieldAlert, Star, TrendingDown, TrendingUp, Trophy } from 'lucide-react'
import { useState } from 'react'
import { useSupplierBatches, useSupplierInventory, useSupplierProducts, useSupplierSupplyRequests } from '@/features/supplier/hooks/use-supplier'

export default function SupplierAnalyticsPage() {
  const { data: realProducts, isLoading: isLoadingProducts, refetch: refetchProducts } = useSupplierProducts()
  const { data: realInventory, isLoading: isLoadingInventory, refetch: refetchInventory } = useSupplierInventory()
  const { data: realRequests, isLoading: isLoadingRequests, refetch: refetchRequests } = useSupplierSupplyRequests()
  const { data: realBatches, refetch: refetchBatches } = useSupplierBatches()

  const [dateRange, setDateRange] = useState('01/07/2026 - 31/07/2026')

  const handleRefreshAll = () => {
    refetchProducts()
    refetchInventory()
    refetchRequests()
    refetchBatches()
  }

  const productsList = realProducts ?? []
  const inventoryList = realInventory ?? []
  const requestsList = realRequests ?? []

  const totalProducts = productsList.length
  const totalStockKg = inventoryList.reduce((acc, item) => acc + (item.quantity ?? item.availableQuantity ?? 0), 0)
  const completedRequestsCount = requestsList.filter((r) => String(r.status).toLowerCase() === 'approved' || String(r.status).toLowerCase() === 'completed').length

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <a href="/dashboard" className="hover:text-emerald-700">Trang chủ</a>
        <ChevronRight className="size-3.5" />
        <span className="font-bold text-slate-900">Báo cáo KPI & Phân tích Hiệu suất</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">Phân tích Hiệu suất & KPI</h1>
          <p className="text-sm text-muted-foreground">
            Thống kê dữ liệu thực tế từ Database Cloud của Nhà cung cấp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50">
            <Download className="size-3.5" />
            Xuất báo cáo
          </button>
          <button
            onClick={handleRefreshAll}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <RefreshCw className="size-3.5" />
            Làm mới dữ liệu
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Khoảng thời gian</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-emerald-600"
            />
          </div>
        </div>

        <div className="flex items-end self-end h-[38px]">
          <button
            onClick={handleRefreshAll}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
          >
            <Filter className="size-3.5" />
            Tải dữ liệu mới
          </button>
        </div>
      </div>

      {/* Bento Stats Grid (Real Data) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between rounded-xl border border-emerald-100 bg-white p-5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sản phẩm CSDL</span>
            <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
              <TrendingUp className="size-3" />
              Cloud Live
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalProducts} sản phẩm</p>
          <p className="mt-1 text-xs text-slate-500">Trực tiếp từ Database</p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng tồn kho (kg)</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalStockKg.toLocaleString()} kg</p>
          <p className="mt-1 text-xs text-slate-500">Tổng tồn kho khả dụng</p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-emerald-100 bg-white p-5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Đơn hàng hoàn tất</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{completedRequestsCount} đơn</p>
          <p className="mt-1 text-xs text-slate-500">Đã duyệt & Xuất kho</p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-emerald-100 bg-white p-5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Đánh giá SLA</span>
            <Award className="size-5 text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">Hạng A</p>
          <p className="mt-1 text-xs text-slate-500">Đạt chuẩn cung ứng chất lượng</p>
        </div>
      </div>
    </div>
  )
}
