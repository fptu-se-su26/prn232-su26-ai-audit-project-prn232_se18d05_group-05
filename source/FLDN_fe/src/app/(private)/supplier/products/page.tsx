'use client'

import {
  AlertTriangle,
  Boxes,
  Download,
  Edit,
  Filter,
  Loader2,
  PackageCheck,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'
import { useState } from 'react'
import {
  useCategories,
  useCreateBatch,
  useCreateProduct,
  useDeleteProduct,
  useSupplierBatches,
  useSupplierInventory,
  useSupplierProducts,
  useUpdateInventory,
  useUpdateProduct,
} from '@/features/supplier/hooks/use-supplier'
import type { SupplierProduct } from '@/features/supplier/types/supplier.types'

export default function SupplierProductsPage() {
  const { data: realProducts, isLoading: isLoadingProducts } = useSupplierProducts()
  const { data: realInventory, isLoading: isLoadingInventory } = useSupplierInventory()
  const { data: realBatches, isLoading: isLoadingBatches } = useSupplierBatches()
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()

  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()
  const deleteProductMutation = useDeleteProduct()
  const updateInventoryMutation = useUpdateInventory()
  const createBatchMutation = useCreateBatch()

  // Modals state
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<SupplierProduct | null>(null)
  const [updatingInventoryProduct, setUpdatingInventoryProduct] = useState<SupplierProduct | null>(null)
  const [inventoryQtyInput, setInventoryQtyInput] = useState('')

  // Batch Form state
  const [generatedQr, setGeneratedQr] = useState<string | null>(null)
  const [batchCode, setBatchCode] = useState('BTC-20260725-001')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('300')
  const [harvestDate, setHarvestDate] = useState('2026-07-25')
  const [expiryDate, setExpiryDate] = useState('2026-08-01')

  // Product Form state (Add & Edit)
  const [prodName, setProdName] = useState('')
  const [prodCategory, setProdCategory] = useState('')
  const [prodCost, setProdCost] = useState('25000')
  const [prodUnit, setProdUnit] = useState('Kg')
  const [prodPkg, setProdPkg] = useState('Túi 1kg')
  const [prodDesc, setProdDesc] = useState('')

  const productsList = realProducts ?? []
  const inventoryList = realInventory ?? []
  const batchesList = realBatches ?? []
  const categoriesList = categoriesData ?? []

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

  const handleOpenAddModal = () => {
    setEditingProduct(null)
    setProdName('')
    setProdCategory(categoriesList[0]?.categoryId || 'f26c8af4-142a-4011-b4f6-4bf0216ce0e5')
    setProdCost('25000')
    setProdUnit('Kg')
    setProdPkg('Túi 1kg')
    setProdDesc('')
    setIsProductModalOpen(true)
  }

  const handleOpenEditModal = (product: SupplierProduct) => {
    setEditingProduct(product)
    setProdName(product.name || '')
    setProdCategory(product.categoryId || categoriesList[0]?.categoryId || 'f26c8af4-142a-4011-b4f6-4bf0216ce0e5')
    setProdCost(String(product.unitCost || 0))
    setProdUnit(product.unit || 'Kg')
    setProdPkg(product.packagingStandard || 'Túi 1kg')
    setProdDesc(product.description || '')
    setIsProductModalOpen(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prodName.trim()) return

    const targetCatId = prodCategory || categoriesList[0]?.categoryId || 'f26c8af4-142a-4011-b4f6-4bf0216ce0e5'

    try {
      if (editingProduct) {
        const prodId = editingProduct.id || editingProduct.productId || ''
        await updateProductMutation.mutateAsync({
          id: prodId,
          data: {
            categoryId: targetCatId,
            name: prodName,
            description: prodDesc,
            unitCost: Number(prodCost) || 0,
            unit: prodUnit,
            packagingStandard: prodPkg,
            isActive: editingProduct.isActive !== false,
          },
        })
      } else {
        await createProductMutation.mutateAsync({
          categoryId: targetCatId,
          name: prodName,
          description: prodDesc,
          unitCost: Number(prodCost) || 0,
          unit: prodUnit,
          packagingStandard: prodPkg,
        })
      }
      setIsProductModalOpen(false)
    } catch {
      setIsProductModalOpen(false)
    }
  }

  const handleDeleteProduct = async (prodId: string) => {
    if (confirm('Bạn có chắc chắn muốn ngưng kinh doanh sản phẩm này?')) {
      try {
        await deleteProductMutation.mutateAsync(prodId)
      } catch {
        // Fallback
      }
    }
  }

  const handleOpenInventoryModal = (product: SupplierProduct) => {
    setUpdatingInventoryProduct(product)
    setInventoryQtyInput(String(product.availableQuantity ?? product.quantity ?? 0))
  }

  const handleSaveInventory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updatingInventoryProduct) return
    const prodId = updatingInventoryProduct.id || updatingInventoryProduct.productId || ''
    try {
      await updateInventoryMutation.mutateAsync({
        productId: prodId,
        quantity: Number(inventoryQtyInput) || 0,
      })
      setUpdatingInventoryProduct(null)
    } catch {
      setUpdatingInventoryProduct(null)
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
    <div className="space-y-6 p-6 font-sans text-slate-800 antialiased">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">
            Danh mục Sản phẩm & Lô hàng
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Quản lý danh mục nông sản, cập nhật số lượng tồn kho khả dụng và sinh mã QR truy xuất.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-white px-3.5 py-2 text-xs font-bold text-emerald-950 shadow-xs hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Plus className="size-4 text-emerald-700" />
            Thêm sản phẩm mới
          </button>
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <QrCode className="size-4" />
            Tạo lô hàng mới
          </button>
        </div>
      </div>

      {/* Calculated Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Boxes className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng sản phẩm</p>
            {isLoadingProducts ? (
              <Loader2 className="size-4 animate-spin text-emerald-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{totalProductsCount}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
            <QrCode className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Lô hàng đang có</p>
            {isLoadingBatches ? (
              <Loader2 className="size-4 animate-spin text-blue-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{pendingBatchesCount}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs">
          <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Sắp hết hạn</p>
            <p className="text-2xl font-bold text-amber-900">{expiringBatchesCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex size-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng tồn kho</p>
            {isLoadingInventory ? (
              <Loader2 className="size-4 animate-spin text-teal-700 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{totalStockKg.toLocaleString()} kg</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          {isLoadingProducts ? (
            <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
              <Loader2 className="size-5 animate-spin text-emerald-700" />
              <span className="text-xs font-medium">Đang tải danh sách sản phẩm...</span>
            </div>
          ) : productsList.length > 0 ? (
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  <th className="px-6 py-3.5">Sản phẩm</th>
                  <th className="px-6 py-3.5">Phân loại</th>
                  <th className="px-6 py-3.5">Giá sỉ (VND/kg)</th>
                  <th className="px-6 py-3.5">Quy cách</th>
                  <th className="px-6 py-3.5">Tồn kho khả dụng</th>
                  <th className="px-6 py-3.5">Trạng thái</th>
                  <th className="px-6 py-3.5 text-right">Thao tác Quản lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {productsList.map((item) => {
                  const itemId = item.id || item.productId || 'unknown'
                  return (
                    <tr key={itemId} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-xs font-bold text-emerald-900">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{itemId.substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {item.categoryName ?? 'Nông sản'}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-800">
                        {item.unitCost ? item.unitCost.toLocaleString() : '0'} đ
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-600">{item.packagingStandard ?? item.unit ?? 'Kg'}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">
                            {item.availableQuantity ?? item.quantity ?? 0} {item.unit ?? 'kg'}
                          </span>
                          <button
                            onClick={() => handleOpenInventoryModal(item)}
                            className="rounded-md border bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 hover:bg-emerald-50"
                            title="Sửa kho"
                          >
                            Cập nhật kho
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            item.isActive !== false
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.isActive !== false ? 'Đang kinh doanh' : 'Ngưng bán'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            title="Chỉnh sửa sản phẩm"
                          >
                            <Edit className="size-3.5 text-slate-600" />
                            Sửa
                          </button>

                          <button
                            onClick={() => {
                              setSelectedProductId(itemId)
                              setIsBatchModalOpen(true)
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            <QrCode className="size-3.5" />
                            Tạo Lô
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(itemId)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Ngưng bán"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Hiện chưa có sản phẩm nào. Hãy bấm "Thêm sản phẩm mới" để khai báo nông sản!
            </div>
          )}
        </div>
      </div>

      {/* Modal Add / Edit Product */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Chỉnh sửa Sản phẩm Nông sản' : 'Khai báo Sản phẩm Nông sản Mới'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phân loại Danh mục *</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 focus:border-emerald-500 focus:outline-hidden"
                >
                  {categoriesList.length > 0 ? (
                    categoriesList.map((cat) => (
                      <option key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="f26c8af4-142a-4011-b4f6-4bf0216ce0e5">Rau củ quả tươi Đà Lạt</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên sản phẩm nông sản *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cà chua bi VietGAP, Dải lợn quế..."
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá sỉ (VND/kg) *</label>
                  <input
                    type="number"
                    required
                    value={prodCost}
                    onChange={(e) => setProdCost(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị tính *</label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quy cách đóng gói</label>
                <input
                  type="text"
                  value={prodPkg}
                  onChange={(e) => setProdPkg(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả sản phẩm</label>
                <textarea
                  placeholder="Nhập thông tin xuất xứ, quy trình trồng trọt VietGAP..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs h-20 focus:border-emerald-500 focus:outline-hidden"
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
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  className="rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 disabled:opacity-50"
                >
                  {createProductMutation.isPending || updateProductMutation.isPending
                    ? 'Đang lưu...'
                    : editingProduct
                    ? 'Lưu thay đổi'
                    : 'Khai báo sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Quick Inventory Update */}
      {updatingInventoryProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Cập nhật Tồn Kho: {updatingInventoryProduct.name}
              </h3>
              <button onClick={() => setUpdatingInventoryProduct(null)} className="text-slate-400 hover:text-slate-700">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInventory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số lượng tồn kho khả dụng (kg) *</label>
                <input
                  type="number"
                  required
                  value={inventoryQtyInput}
                  onChange={(e) => setInventoryQtyInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-mono text-base font-bold text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUpdatingInventoryProduct(null)}
                  className="rounded-xl border px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={updateInventoryMutation.isPending}
                  className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 active:scale-95 disabled:opacity-50"
                >
                  {updateInventoryMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật kho'}
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600"
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
                      className="w-full rounded-xl border bg-slate-100 p-2.5 font-mono text-xs font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số lượng (kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-xl border p-2.5 text-xs font-bold focus:outline-emerald-600"
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
                      className="w-full rounded-xl border p-2.5 text-xs focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hạn sử dụng</label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full rounded-xl border p-2.5 text-xs focus:outline-emerald-600"
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
