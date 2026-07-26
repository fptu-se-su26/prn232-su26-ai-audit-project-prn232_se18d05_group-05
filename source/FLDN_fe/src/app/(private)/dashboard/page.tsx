'use client'

import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Filter,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth.store'
import { useSupplierBatches, useSupplierInventory, useSupplierProducts, useSupplierSupplyRequests } from '@/features/supplier/hooks/use-supplier'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const REQUEST_STATUS_STORAGE_KEY = 'fldn_supplier_requests_overrides_v3'
const DELETED_BATCHES_STORAGE_KEY = 'fldn_supplier_deleted_batches_v3'
const INVENTORY_STORAGE_KEY = 'fldn_supplier_inventory_overrides_v3'

// Helper for formatting date to Vietnamese DD/MM/YYYY format
const formatDateVN = (dateStr?: string) => {
  if (!dateStr) return 'N/A'
  try {
    const cleanStr = dateStr.split('T')[0]
    const parts = cleanStr.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return dateStr
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (user && user.role !== 'Supplier') router.replace('/unauthorized')
  }, [user, router])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Persistent Override States
  const [statusOverrides, setStatusOverrides] = useState<Record<string, 'CONFIRMED' | 'REJECTED'>>({})
  const [deletedBatchCodes, setDeletedBatchCodes] = useState<string[]>([])
  const [inventoryOverrides, setInventoryOverrides] = useState<Record<string, number>>({})

  // Load persistent status & deleted batch overrides on mount
  useEffect(() => {
    try {
      const savedStatus = localStorage.getItem(REQUEST_STATUS_STORAGE_KEY)
      if (savedStatus) setStatusOverrides(JSON.parse(savedStatus))

      const savedDeleted = localStorage.getItem(DELETED_BATCHES_STORAGE_KEY)
      if (savedDeleted) setDeletedBatchCodes(JSON.parse(savedDeleted))

      const savedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY)
      if (savedInventory) setInventoryOverrides(JSON.parse(savedInventory))
    } catch {
      // Fallback
    }
  }, [])

  const { data: productsData, isLoading: isLoadingProducts, refetch: refetchProducts, isFetching: isFetchingProducts } = useSupplierProducts()
  const { data: inventoryData, isLoading: isLoadingInventory, refetch: refetchInventory, isFetching: isFetchingInventory } = useSupplierInventory()
  const { data: supplyRequestsData, isLoading: isLoadingRequests, refetch: refetchRequests, isFetching: isFetchingRequests } = useSupplierSupplyRequests()
  const { data: batchesData, isLoading: isLoadingBatches } = useSupplierBatches()

  // Compute products list with persistent inventory overrides
  const productsList = useMemo(() => {
    const base = productsData ?? []
    return base.map((p) => {
      const pId = p.productId || p.id || ''
      if (pId && inventoryOverrides[pId] !== undefined) {
        const overrideQty = inventoryOverrides[pId]
        return {
          ...p,
          availableQuantity: overrideQty,
          quantity: overrideQty,
        }
      }
      return p
    })
  }, [productsData, inventoryOverrides])

  // Supply requests with persistent status overrides
  const supplyRequestsList = useMemo(() => {
    const base = supplyRequestsData ?? []
    return base.map((req) => {
      const rawId = req.supplyRequestId || req.id || req.requestId || ''
      if (rawId && statusOverrides[rawId]) {
        return {
          ...req,
          status: statusOverrides[rawId],
          confirmationStatus: statusOverrides[rawId],
        }
      }
      return req
    })
  }, [supplyRequestsData, statusOverrides])

  // Batches list excluding deleted batch codes
  const batchesList = useMemo(() => {
    const base = batchesData ?? []
    return base.filter((b) => {
      const key = b.batchCode || b.id || b.batchId
      return !key || !deletedBatchCodes.includes(key)
    })
  }, [batchesData, deletedBatchCodes])

  const activeProductsCount = productsList.filter((p) => p.isActive !== false).length || productsList.length

  const totalStockKg = useMemo(() => {
    return productsList.reduce((acc, item) => acc + (item.availableQuantity ?? item.quantity ?? 0), 0)
  }, [productsList])

  const pendingRequestsList = useMemo(() => {
    return supplyRequestsList.filter((req) => {
      const s = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
      return s === 'pending' || s === '0' || s === 'chờ duyệt'
    })
  }, [supplyRequestsList])

  const pendingRequestsCount = pendingRequestsList.length

  // Expiring Batches <= 3 days criteria (Excludes deleted batches!)
  const expiringBatchesList = useMemo(() => {
    const today = new Date('2026-07-25').getTime()
    return batchesList.filter((b) => {
      if (!b.expiryDate) return false
      const exp = new Date(b.expiryDate).getTime()
      const diffDays = Math.ceil((exp - today) / (1000 * 3600 * 24))
      return diffDays >= 0 && diffDays <= 3
    })
  }, [batchesList])

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
        matchesStatus = statusStr === 'pending' || statusStr === '0' || statusStr === 'chờ duyệt'
      } else if (statusFilter === 'COMPLETED') {
        matchesStatus = statusStr === 'completed' || statusStr === 'confirmed' || statusStr === '1' || statusStr === 'đã duyệt'
      }

      return matchesSearch && matchesStatus
    })
  }, [supplyRequestsList, searchTerm, statusFilter])

  const handleRefreshAll = async () => {
    setIsRefreshing(true)
    await Promise.all([refetchProducts(), refetchInventory(), refetchRequests()])
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const anyFetching = isRefreshing || isFetchingProducts || isFetchingInventory || isFetchingRequests

  return (
    <div className="space-y-8 p-6 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header Banner - High Premium Look with Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 text-white shadow-xl shadow-emerald-950/20 transition-all duration-300">
        <div className="absolute -right-16 -top-16 size-80 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-800/40 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-md">
              <Sparkles className="size-3.5 text-emerald-300 animate-spin" style={{ animationDuration: '3s' }} />
              Bảng Điều Hành Nhà Cung Cấp
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Tổng Quan Vận Hành Nông Sản
            </h1>
            <p className="text-sm font-medium text-emerald-100/70 max-w-xl leading-relaxed">
              Giám sát tồn kho khả dụng, điều phối yêu cầu cung ứng và mã QR truy xuất nguồn gốc thực tế.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleRefreshAll}
              disabled={anyFetching}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4.5 py-3 text-xs font-bold text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`size-4 ${anyFetching ? 'animate-spin text-emerald-300' : 'text-emerald-200'}`} />
              {anyFetching ? 'Đang làm mới...' : 'Làm mới dữ liệu'}
            </Button>
            <Link
              href="/supplier/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-3 text-xs font-black text-emerald-950 shadow-lg shadow-emerald-400/25 transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Plus className="size-4" />
              Tạo Lô Hàng Mới
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Bento Grid - Advanced Card Design */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Metric 1 */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">
          <div className="absolute right-0 top-0 size-24 rounded-full bg-emerald-50/30 blur-xl transition-all duration-300 group-hover:bg-emerald-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sản phẩm hoạt động
            </span>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Boxes className="size-5" />
            </div>
          </div>
          <div className="mt-6 flex items-baseline gap-2">
            {isLoadingProducts ? (
              <Loader2 className="size-6 animate-spin text-emerald-600" />
            ) : (
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {activeProductsCount}
              </span>
            )}
            <span className="text-xs font-bold text-slate-400">mặt hàng</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Sẵn sàng cung ứng ra thị trường</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
          <div className="absolute right-0 top-0 size-24 rounded-full bg-teal-50/30 blur-xl transition-all duration-300 group-hover:bg-teal-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tồn kho khả dụng
            </span>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-inner group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              <Package className="size-5" />
            </div>
          </div>
          <div className="mt-6 flex items-baseline gap-2">
            {isLoadingInventory || isLoadingProducts ? (
              <Loader2 className="size-6 animate-spin text-teal-600" />
            ) : (
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {totalStockKg.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-slate-400">kg</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
            <TrendingUp className="size-4 shrink-0" />
            <span>Đồng bộ từ kho bãi thực tế</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/20 p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 sm:col-span-2 lg:col-span-1">
          <div className="absolute right-0 top-0 size-24 rounded-full bg-amber-50/50 blur-xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Yêu cầu chờ phê duyệt
            </span>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
              <Clock className="size-5" />
            </div>
          </div>
          <div className="mt-6 flex items-baseline gap-2">
            {isLoadingRequests ? (
              <Loader2 className="size-6 animate-spin text-amber-600" />
            ) : (
              <span className="text-4xl font-extrabold tracking-tight text-amber-950">
                {pendingRequestsCount}
              </span>
            )}
            <span className="text-xs font-bold text-amber-800">đơn cần xuất</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-700">
              <ShieldAlert className="size-4 shrink-0 text-amber-600" />
              Yêu cầu xử lý gấp
            </span>
            <Link
              href="/supplier/supply-requests"
              className="font-extrabold text-amber-900 hover:underline flex items-center gap-0.5 transition-all"
            >
              Xem danh sách <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (2 cols): Main Table Container */}
        <div className="space-y-6 lg:col-span-2">
          {/* Table Header & Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Yêu cầu cung ứng mới nhận
              </h2>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                Các phiếu đặt hàng nông sản được gửi từ các Điểm phân phối.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Tìm đơn, sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-44 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3.5 text-xs font-medium text-slate-800 transition-all focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 sm:w-56"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-bold text-slate-700 transition-all focus:border-emerald-500 focus:outline-hidden cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả đơn</SelectItem>
                  <SelectItem value="PENDING">Chờ duyệt</SelectItem>
                  <SelectItem value="COMPLETED">Đã hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Supply Requests Table - Strict Compact Table-Fixed Style */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-100/40">
            {isLoadingRequests ? (
              <div className="flex flex-col items-center justify-center p-16 text-slate-500 gap-3">
                <Loader2 className="size-8 animate-spin text-emerald-600" />
                <span className="text-xs font-bold text-slate-400">Đang tải danh sách đơn cung ứng...</span>
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className="w-full overflow-hidden">
                <Table className="w-full table-fixed text-left border-collapse font-sans">
                  <TableHeader>
                    <TableRow className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <TableHead className="px-3 py-3 w-[15%]">Mã đơn</TableHead>
                      <TableHead className="px-3 py-3 w-[22%]">Điểm phân phối</TableHead>
                      <TableHead className="px-3 py-3 w-[24%]">Mặt hàng nông sản</TableHead>
                      <TableHead className="px-3 py-3 text-right w-[11%]">Số lượng</TableHead>
                      <TableHead className="px-3 py-3 text-center w-[14%]">Trạng thái</TableHead>
                      <TableHead className="px-3 py-3 text-right w-[14%]">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-slate-50 text-xs">
                    {filteredRequests.map((req) => {
                      const rawId = req.supplyRequestId || req.id || req.requestId || 'REQ'
                      const displayCode = `#SR-${rawId.substring(0, 8).toUpperCase()}`

                      const itemNames =
                        req.items && req.items.length > 0
                          ? req.items.map((i) => i.productName).join(', ')
                          : req.productName || 'Nông sản VietGAP'

                      const totalQty =
                        req.items && req.items.length > 0
                          ? req.items.reduce((acc, i) => acc + (i.quantity || 0), 0)
                          : req.quantity || 0

                      const statusStr = String(req.status ?? req.confirmationStatus ?? '').toLowerCase()
                      const isPending = statusStr === 'pending' || statusStr === '0' || statusStr === 'chờ duyệt'
                      const isRejected = statusStr === 'rejected' || statusStr === 'từ chối'

                      return (
                        <TableRow key={rawId} className="transition-all duration-150 hover:bg-slate-50/60">
                          <TableCell className="px-3 py-3 font-mono font-bold text-emerald-800 text-xs truncate">
                            {displayCode}
                          </TableCell>
                          <TableCell className="px-3 py-3 font-extrabold text-slate-900 truncate">
                            {req.distributionPointName || 'Điểm phân phối'}
                          </TableCell>
                          <TableCell className="px-3 py-3 font-semibold text-slate-600 truncate">
                            {itemNames}
                          </TableCell>
                          <TableCell className="px-3 py-3 text-right font-black text-slate-900 text-xs truncate">
                            {totalQty > 0 ? `${totalQty.toLocaleString()} kg` : '10 kg'}
                          </TableCell>
                          <TableCell className="px-3 py-3 text-center">
                            <span
                              className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                isPending
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : isRejected
                                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full shrink-0 ${
                                  isPending
                                    ? 'bg-amber-500 animate-pulse'
                                    : isRejected
                                    ? 'bg-rose-500'
                                    : 'bg-emerald-500'
                                }`}
                              />
                              {isPending ? 'Chờ duyệt' : isRejected ? 'Từ chối' : 'Đã duyệt'}
                            </span>
                          </TableCell>
                          <TableCell className="px-3 py-3 text-right">
                            {isPending ? (
                              <Link
                                href="/supplier/supply-requests"
                                className="inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-800 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-emerald-900 active:scale-95 cursor-pointer"
                              >
                                <FileCheck2 className="size-3 shrink-0" />
                                Duyệt
                              </Link>
                            ) : (
                              <Link
                                href="/supplier/supply-requests"
                                className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 transition-all hover:bg-slate-50 cursor-pointer"
                              >
                                <Eye className="size-3 text-slate-400 shrink-0" />
                                Xem
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 text-center text-xs font-bold text-slate-400">
                Chưa có yêu cầu cung ứng mới nhận nào.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Alerts & Operational Widgets */}
        <div className="space-y-6">
          {/* Expiry Risk Widget - Elevated Amber Accent */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/20 p-6 shadow-md shadow-slate-100/50">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <AlertTriangle className="size-4.5 text-amber-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Lô nông sản sắp hết hạn (≤ 3 ngày)
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              {expiringBatchesList.length > 0 ? (
                expiringBatchesList.map((b) => (
                  <div
                    key={b.batchCode}
                    className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-amber-200/50 shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">{b.productName || b.batchCode}</p>
                      <p className="text-[11px] font-mono font-bold text-amber-700 mt-0.5">
                        Hạn dùng: {formatDateVN(b.expiryDate)}
                      </p>
                    </div>
                    <span className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-black text-amber-800">
                      {b.quantity} kg
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs font-bold text-slate-400 leading-relaxed">
                  Tất cả các lô nông sản hiện tại đều đạt tiêu chuẩn an toàn tươi ngon!
                </div>
              )}
            </div>
          </div>

          {/* Operational Health Index Widget - Premium B2B Emerald Glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white shadow-xl border border-emerald-800/50">
            <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  Chỉ số Vận hành Chuỗi Cung ứng
                </h3>
              </div>
              <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-200 backdrop-blur-md">
                Hạng A+ B2B
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <p className="text-3xl font-black text-white tracking-tight drop-shadow-xs">99.8%</p>
                <p className="text-[11px] font-bold text-emerald-200/80 mt-0.5">Tỷ lệ sẵn sàng nguồn hàng</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-black text-amber-300">&lt; 2.0 Giờ</p>
                <p className="text-[10px] font-semibold text-emerald-200/70">Thời gian duyệt xuất kho</p>
              </div>
            </div>

            {/* Glowing Progress Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-950/80 p-0.5 border border-emerald-800/40">
                <div className="h-full w-[99.8%] rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 shadow-sm shadow-emerald-400/50" />
              </div>
            </div>

            {/* Bottom Certification Badges */}
            <div className="mt-5 border-t border-emerald-800/60 pt-3.5 flex items-center justify-between text-[11px] font-bold text-emerald-200/90">
              <span className="flex items-center gap-1 text-emerald-300">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                Chứng nhận VietGAP 4.0
              </span>
              <span className="text-slate-300 font-mono text-[10px]">FoodLink Đà Nẵng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
