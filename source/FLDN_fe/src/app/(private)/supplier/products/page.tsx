'use client'

import { AlertTriangle, Boxes, Download, Filter, Loader2, PackageCheck, Plus, QrCode, Search, ShieldCheck, Sparkles, TrendingUp, X } from 'lucide-react'
import { useState } from 'react'
import { useCreateBatch, useCreateProduct, useSupplierBatches, useSupplierInventory, useSupplierProducts } from '@/features/supplier/hooks/use-supplier'

export default function SupplierProductsPage() {
  const { data: realProducts, isLoading: isLoadingProducts } = useSupplierProducts()
  const { data: realInventory, isLoading: isLoadingInventory } = useSupplierInventory()
  const { data: realBatches, isLoading: isLoadingBatches } = useSupplierBatches()
  
  const createProductMutation = useCreateProduct()
  const createBatchMutation = useCreateBatch()

  // Modals state
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  // Batch Form state
  const [generatedQr, setGeneratedQr] = useState<string | null>(null)
  const [batchCode, setBatchCode] = useState('BTC-20260724-001')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('300')
  const [harvestDate, setHarvestDate] = useState('2026-07-24')
  const [expiryDate, setExpiryDate] = useState('2026-07-31')

  // New Product Form state
  const [newProdName, setNewProdName] = useState('')
  const [newProdCategory, setNewProdCategory] = useState('f26c8af4-142a-4011-b4f6-4bf0216ce0e5')
  const [newProdCost, setNewProdCost] = useState('25000')
  const [newProdUnit, setNewProdUnit] = useState('Kg')
  const [newProdPkg, setNewProdPkg] = useState('Túi 1kg')
  const [newProdDesc, setNewProdDesc] = useState('')

  const productsList = realProducts ?? []
  const inventoryList = realInventory ?? []
  const batchesList = realBatches ?? []

  // Calculated Stats
  const totalProductsCount = productsList.length
  const pendingBatchesCount = batchesList.length
  const expiringBatchesCount = batchesList.filter((b) => {
    if (!b.expiryDate) return false
    const exp = new Date(b.expiryDate).getTime()
    const now = new Date().getTime()
    const diffDays = (exp - now) / (1000 * 3600 * 24)
    return diffDays >= 0 && diffDays <= 7
  }).length

  const totalStockKg = inventoryList.reduce((acc, inv) => acc + (inv.quantity ?? inv.availableQuantity ?? 0), 0)

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProdName.trim()) return

    try {
      await createProductMutation.mutateAsync({
        categoryId: newProdCategory,
        name: newProdName,
        description: newProdDesc,
        unitCost: Number(newProdCost) || 0,
        unit: newProdUnit,
        packagingStandard: newProdPkg,
      })
      setIsProductModalOpen(false)
      setNewProdName('')
      setNewProdDesc('')
    } catch {
      setIsProductModalOpen(false)
    }
  }

  const handleGenerateQR = async () => {
    const targetProdId = selectedProductId || productsList[0]?.id || productsList[0]?.productId || ''
    if (!targetProdId) return

    try {
      await createBatchMutation.mutateAsync({
        productId: targetProdId,
        batchCode,
        quantity: Number(quantity) || 100,
        harvestDate,
        expiryDate,
      })
      setGeneratedQr(`FOODLINK-TRACE-${batchCode}`)
    } catch {
      setGeneratedQr(`FOODLINK-TRACE-${batchCode}`)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">Danh mục Sản phẩm & Lô hàng</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý vòng đời sản phẩm từ thu hoạch đến kho bãi và mã QR truy xuất nguồn gốc.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-700 bg-white px-3.5 py-2 text-sm font-bold text-emerald-800 shadow-xs hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Plus className="size-4 text-emerald-700" />
            Thêm sản phẩm mới
          </button>
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <QrCode className="size-4" />
            Tạo lô hàng mới
          </button>
        </div>
      </div>

      {/* Calculated Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100/70 text-emerald-800">
            <Boxes className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tổng sản phẩm</p>
            {isLoadingProducts ? (
              <Loader2 className="size-4 animate-spin text-emerald-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{totalProductsCount}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100/70 text-blue-800">
            <QrCode className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lô hàng đang có</p>
            {isLoadingBatches ? (
              <Loader2 className="size-4 animate-spin text-blue-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{pendingBatchesCount}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100/70 text-amber-800">
            <AlertTriangle className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sắp hết hạn</p>
            <p className="text-2xl font-bold text-amber-900">{expiringBatchesCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-teal-100/70 text-teal-800">
            <TrendingUp className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tổng tồn kho</p>
            {isLoadingInventory ? (
              <Loader2 className="size-4 animate-spin text-teal-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{totalStockKg.toLocaleString()} kg</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          {isLoadingProducts ? (
            <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
              <Loader2 className="size-5 animate-spin text-emerald-700" />
              <span>Đang tải danh sách sản phẩm...</span>
            </div>
          ) : productsList.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-slate-50/80 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                  <th className="px-6 py-3.5">Sản phẩm</th>
                  <th className="px-6 py-3.5">Phân loại</th>
                  <th className="px-6 py-3.5">Giá sỉ (VND/kg)</th>
                  <th className="px-6 py-3.5">Quy cách</th>
                  <th className="px-6 py-3.5">Tồn kho khả dụng</th>
                  <th className="px-6 py-3.5">Trạng thái</th>
                  <th className="px-6 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productsList.map((item) => {
                  const itemId = item.id || item.productId || 'unknown'
                  return (
                    <tr key={itemId} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-900">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500 font-mono">{itemId.substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {item.categoryName ?? 'Nông sản'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {item.unitCost ? item.unitCost.toLocaleString() : '0'} đ
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">{item.packagingStandard ?? item.unit ?? 'Kg'}</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-900">
                        {item.availableQuantity ?? item.quantity ?? 0} {item.unit ?? 'kg'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            item.isActive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.isActive ? 'Đang kinh doanh' : 'Ngưng bán'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedProductId(itemId)
                            setIsBatchModalOpen(true)
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border p-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                        >
                          <QrCode className="size-4" />
                          Tạo Lô
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Hiện chưa có sản phẩm nào. Hãy bấm "Thêm sản phẩm mới" để đăng ký nông sản đầu tiên!
            </div>
          )}
        </div>
      </div>

      {/* Modal Add New Product */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Khai báo Sản phẩm Nông sản Mới</h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên sản phẩm nông sản *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Dải lợn quế, Cà chua bi VietGAP..."
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full rounded-lg border p-2.5 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá sỉ (VND/kg) *</label>
                  <input
                    type="number"
                    required
                    value={newProdCost}
                    onChange={(e) => setNewProdCost(e.target.value)}
                    className="w-full rounded-lg border p-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị tính *</label>
                  <input
                    type="text"
                    required
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    className="w-full rounded-lg border p-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quy cách đóng gói</label>
                <input
                  type="text"
                  value={newProdPkg}
                  onChange={(e) => setNewProdPkg(e.target.value)}
                  className="w-full rounded-lg border p-2.5 text-sm focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả sản phẩm</label>
                <textarea
                  placeholder="Nhập mô tả nguồn gốc, tiêu chuẩn VietGAP/GlobalGAP..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full rounded-lg border p-2.5 text-xs h-20 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="rounded-xl border py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isPending}
                  className="rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 disabled:opacity-50"
                >
                  {createProductMutation.isPending ? 'Đang tạo...' : 'Lưu sản phẩm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Batch & QR Code Creation */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tạo Lô hàng (Batch) & QR Truy xuất</h3>
                <p className="text-xs text-slate-500">Đăng ký thông tin lô sản phẩm mới & Sinh mã QR Code.</p>
              </div>
              <button
                onClick={() => setIsBatchModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              {/* Form Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sản phẩm áp dụng</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full rounded-lg border bg-slate-50 p-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-emerald-600"
                  >
                    {productsList.length > 0 ? (
                      productsList.map((p) => {
                        const pid = p.id || p.productId || ''
                        return (
                          <option key={pid} value={pid}>
                            {p.name} ({p.unitCost?.toLocaleString()} đ/{p.unit})
                          </option>
                        )
                      })
                    ) : (
                      <option value="">Chưa có sản phẩm nào trong danh mục</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mã Lô hàng</label>
                    <input
                      type="text"
                      value={batchCode}
                      onChange={(e) => setBatchCode(e.target.value)}
                      className="w-full rounded-lg border bg-slate-100 p-2.5 font-mono text-xs font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số lượng (kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-lg border p-2.5 text-sm focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ngày thu hoạch</label>
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      className="w-full rounded-lg border p-2.5 text-xs focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hạn sử dụng</label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full rounded-lg border p-2.5 text-xs focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giấy chứng nhận VietGAP / ATTP</label>
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center hover:bg-slate-100/70 cursor-pointer">
                    <ShieldCheck className="size-7 text-emerald-600 mb-1" />
                    <p className="text-xs font-medium text-slate-700">Kéo thả file chứng nhận hoặc chọn tải lên</p>
                    <p className="text-[10px] text-slate-400">PDF, JPG, PNG tối đa 10MB</p>
                  </div>
                </div>
              </div>

              {/* QR Preview Column */}
              <div className="flex flex-col items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
                <p className="self-start text-xs font-bold text-emerald-950">Mã QR Code Truy xuất nguồn gốc</p>

                <div className="my-4 flex flex-col items-center text-center">
                  <div className="flex size-48 items-center justify-center rounded-2xl border bg-white p-3 shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        generatedQr ?? `FOODLINK-TRACE-${batchCode}`
                      )}`}
                      alt="QR Code Preview"
                      className="size-full object-contain"
                    />
                  </div>
                  <p className="mt-3 font-mono text-xs font-bold text-emerald-900">{batchCode}</p>
                  <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest mt-0.5">
                    FoodLink Đà Nẵng • Verified
                  </p>
                </div>

                <div className="w-full space-y-2">
                  <button
                    onClick={handleGenerateQR}
                    disabled={createBatchMutation.isPending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles className="size-4" />
                    {createBatchMutation.isPending ? 'Đang đăng ký Lô hàng...' : 'Sinh mã QR & Đăng ký Lô hàng'}
                  </button>

                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    <Download className="size-4" />
                    Tải tem in PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
