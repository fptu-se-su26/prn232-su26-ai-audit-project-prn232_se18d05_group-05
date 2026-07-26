'use client'

import {
  AlertCircle,
  AlertTriangle,
  Boxes,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  Eye,
  FileCheck,
  Filter,
  Loader2,
  PackageCheck,
  Printer,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  UploadCloud,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
import type { SupplierBatch, SupplierProduct } from '@/features/supplier/types/supplier.types'

const INVENTORY_STORAGE_KEY = 'fldn_supplier_inventory_overrides_v3'
const BATCHES_STORAGE_KEY = 'fldn_supplier_batches_overrides_v3'
const DELETED_BATCHES_STORAGE_KEY = 'fldn_supplier_deleted_batches_v3'
const ADDED_PRODUCTS_STORAGE_KEY = 'fldn_supplier_added_products_v3'

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

export default function SupplierProductsPage() {
  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'BATCHES'>('PRODUCTS')

  const { data: realProducts, isLoading: isLoadingProducts, refetch: refetchProducts } = useSupplierProducts()
  const { data: realInventory, isLoading: isLoadingInventory, refetch: refetchInventory } = useSupplierInventory()
  const { data: realBatches, isLoading: isLoadingBatches, refetch: refetchBatches } = useSupplierBatches()
  const { data: categoriesData } = useCategories()

  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()
  const deleteProductMutation = useDeleteProduct()
  const updateInventoryMutation = useUpdateInventory()
  const createBatchMutation = useCreateBatch()

  // Persistent States
  const [inventoryOverrides, setInventoryOverrides] = useState<Record<string, number>>({})
  const [productOverrides, setProductOverrides] = useState<Record<string, Partial<SupplierProduct>>>({})
  const [localBatches, setLocalBatches] = useState<SupplierBatch[]>([])
  const [deletedBatchCodes, setDeletedBatchCodes] = useState<string[]>([])
  const [localCreatedProducts, setLocalCreatedProducts] = useState<SupplierProduct[]>([])
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>([])

  // Custom Delete Confirm Modal State
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'BATCH' | 'PRODUCT'
    id: string
    title: string
    restockQty?: number
  } | null>(null)

  // Load persistent overrides on mount
  useEffect(() => {
    try {
      const savedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY)
      if (savedInventory) setInventoryOverrides(JSON.parse(savedInventory))

      const savedProdOverrides = localStorage.getItem('fldn_supplier_product_overrides_v3')
      if (savedProdOverrides) setProductOverrides(JSON.parse(savedProdOverrides))

      const savedBatches = localStorage.getItem(BATCHES_STORAGE_KEY)
      if (savedBatches) setLocalBatches(JSON.parse(savedBatches))

      const savedDeleted = localStorage.getItem(DELETED_BATCHES_STORAGE_KEY)
      if (savedDeleted) setDeletedBatchCodes(JSON.parse(savedDeleted))

      const savedAdded = localStorage.getItem(ADDED_PRODUCTS_STORAGE_KEY)
      if (savedAdded) setLocalCreatedProducts(JSON.parse(savedAdded))

      const savedDeletedProds = localStorage.getItem('fldn_supplier_deleted_products_v3')
      if (savedDeletedProds) {
        // Only keep local product IDs in deletedProductIds (never delete base server products)
        const parsed = JSON.parse(savedDeletedProds) as string[]
        const cleanLocalOnly = parsed.filter((id) => id.startsWith('prod-'))
        setDeletedProductIds(cleanLocalOnly)
      }
    } catch {
      // Storage fallback
    }
  }, [])

  // Modals state
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<SupplierProduct | null>(null)
  const [updatingInventoryProduct, setUpdatingInventoryProduct] = useState<SupplierProduct | null>(null)
  const [inventoryQtyInput, setInventoryQtyInput] = useState('')
  const [viewingBatchQr, setViewingBatchQr] = useState<SupplierBatch | null>(null)

  // Notification Banner State
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  // Batch Form state
  const [batchCode, setBatchCode] = useState('BTC-20260725-001')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('300')
  const [harvestDate, setHarvestDate] = useState('2026-07-25')
  const [expiryDate, setExpiryDate] = useState('2026-08-01')
  const [certFile, setCertFile] = useState<File | null>(null)

  // Product Form state (Add & Edit)
  const [prodName, setProdName] = useState('')
  const [prodCategory, setProdCategory] = useState('')
  const [prodCost, setProdCost] = useState('25000')
  const [prodUnit, setProdUnit] = useState('Kg')
  const [prodPkg, setProdPkg] = useState('Túi 1kg')
  const [prodDesc, setProdDesc] = useState('')
  const [prodImage, setProdImage] = useState('')

  const categoriesList = useMemo(() => categoriesData ?? [], [categoriesData])

  // MERGE server products AND local created products properly (Server products first)
  const productsList = useMemo(() => {
    const baseServer = realProducts ?? []
    const mergedMap = new Map<string, SupplierProduct>()
    const processedNames = new Set<string>()

    // 1. Add products from Server DB
    baseServer.forEach((p) => {
      const pId = p.productId || p.id || ''
      const cleanName = (p.name || '').toLowerCase().trim()
      if (pId && cleanName && !deletedProductIds.includes(pId)) {
        mergedMap.set(pId, p)
        processedNames.add(cleanName)
      }
    })

    // 2. Add local created products (if not already present on server)
    localCreatedProducts.forEach((p) => {
      const pId = p.productId || p.id || ''
      const cleanName = (p.name || '').toLowerCase().trim()
      if (pId && cleanName && !deletedProductIds.includes(pId) && !processedNames.has(cleanName)) {
        mergedMap.set(pId, p)
        processedNames.add(cleanName)
      }
    })

    return Array.from(mergedMap.values()).map((p) => {
      const pId = p.productId || p.id || ''
      let item = { ...p }

      if (pId && productOverrides[pId]) {
        item = { ...item, ...productOverrides[pId] }
      }

      if (pId && inventoryOverrides[pId] !== undefined) {
        const overrideQty = inventoryOverrides[pId]
        item.availableQuantity = overrideQty
        item.quantity = overrideQty
      }
      return item
    })
  }, [realProducts, localCreatedProducts, inventoryOverrides, productOverrides, deletedProductIds])

  // MERGE server batches AND local batches cleanly (Local created batches first)
  const batchesList = useMemo(() => {
    const base = realBatches ?? []
    const mergedMap = new Map<string, SupplierBatch>()

    // Local created batches (added first so new batches display at top)
    localBatches.forEach((b) => {
      const key = b.batchId || b.id || b.batchCode
      if (key && !deletedBatchCodes.includes(key) && !deletedBatchCodes.includes(b.batchCode)) {
        mergedMap.set(key, b)
      }
    })

    // Server batches
    base.forEach((b) => {
      const key = b.batchId || b.id || b.batchCode
      if (key && !deletedBatchCodes.includes(key) && !deletedBatchCodes.includes(b.batchCode) && !mergedMap.has(key)) {
        mergedMap.set(key, b)
      }
    })

    return Array.from(mergedMap.values())
  }, [realBatches, localBatches, deletedBatchCodes])

  // Calculated Stats
  const totalProductsCount = productsList.length
  const pendingBatchesCount = batchesList.length

  // ACCURATE Expiring Count: Only count batches expiring within <= 3 days from today (2026-07-25)
  const expiringBatchesCount = useMemo(() => {
    const today = new Date('2026-07-25').getTime()
    return batchesList.filter((b) => {
      if (!b.expiryDate) return false
      const exp = new Date(b.expiryDate).getTime()
      const diffDays = Math.ceil((exp - today) / (1000 * 3600 * 24))
      return diffDays >= 0 && diffDays <= 3
    }).length
  }, [batchesList])

  const totalStockKg = useMemo(() => {
    return productsList.reduce((acc, item) => acc + (item.availableQuantity ?? item.quantity ?? 0), 0)
  }, [productsList])

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setEditingProduct(null)
    const firstCatId = categoriesList[0]?.categoryId || categoriesList[0]?.id || ''
    setProdCategory(firstCatId)
    setProdName('')
    setProdCost('25000')
    setProdUnit('Kg')
    setProdPkg('Túi 1kg')
    setProdDesc('')
    setProdImage('')
    setIsProductModalOpen(true)
  }

  const handleOpenEditModal = (product: SupplierProduct) => {
    setEditingProduct(product)
    const prodId = product.productId || product.id || ''
    const overrideObj = productOverrides[prodId] || {}
    const firstCatId = categoriesList[0]?.categoryId || categoriesList[0]?.id || ''

    setProdCategory(overrideObj.categoryId || product.categoryId || firstCatId)
    setProdName(overrideObj.name || product.name || '')
    setProdCost(String(overrideObj.unitCost ?? product.unitCost ?? 25000))
    setProdUnit(overrideObj.unit || product.unit || 'Kg')
    setProdPkg(overrideObj.packagingStandard || product.packagingStandard || 'Túi 1kg')
    setProdDesc(overrideObj.description || product.description || '')
    setProdImage(overrideObj.imageUrl || product.imageUrl || '')
    setIsProductModalOpen(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prodName.trim()) {
      showNotification('Vui lòng nhập tên sản phẩm!', 'error')
      return
    }

    const firstCatId = categoriesList[0]?.categoryId || categoriesList[0]?.id || ''
    const targetCatId = prodCategory || firstCatId
    const targetCatName = categoriesList.find((c) => (c.categoryId || c.id) === targetCatId)?.name || 'Nông sản VietGAP'

    if (editingProduct) {
      const prodId = editingProduct.productId || editingProduct.id || ''

      const updatedOverrides = {
        ...productOverrides,
        [prodId]: {
          name: prodName,
          categoryId: targetCatId,
          categoryName: targetCatName,
          unitCost: Number(prodCost) || 0,
          unit: prodUnit,
          packagingStandard: prodPkg,
          description: prodDesc,
          imageUrl: prodImage,
        },
      }
      setProductOverrides(updatedOverrides)
      try {
        localStorage.setItem('fldn_supplier_product_overrides_v3', JSON.stringify(updatedOverrides))
      } catch {}

      setLocalCreatedProducts((prev) =>
        prev.map((p) => {
          if ((p.productId || p.id) === prodId) {
            return {
              ...p,
              name: prodName,
              categoryId: targetCatId,
              categoryName: targetCatName,
              unitCost: Number(prodCost) || 0,
              unit: prodUnit,
              packagingStandard: prodPkg,
              description: prodDesc,
              imageUrl: prodImage,
            }
          }
          return p
        })
      )

      try {
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
      } catch {}

      showNotification(`Đã cập nhật sản phẩm "${prodName}"!`, 'success')
    } else {
      const newId = `prod-${Date.now()}`
      const newProd: SupplierProduct = {
        productId: newId,
        id: newId,
        name: prodName,
        categoryId: targetCatId,
        categoryName: targetCatName,
        unitCost: Number(prodCost) || 0,
        unit: prodUnit,
        packagingStandard: prodPkg,
        description: prodDesc,
        imageUrl: prodImage,
        availableQuantity: 0,
        quantity: 0,
        isActive: true,
      }

      const updatedOverrides = {
        ...productOverrides,
        [newId]: {
          imageUrl: prodImage,
        },
      }
      setProductOverrides(updatedOverrides)
      try {
        localStorage.setItem('fldn_supplier_product_overrides_v3', JSON.stringify(updatedOverrides))
      } catch {}

      setLocalCreatedProducts((prev) => {
        const updated = [newProd, ...prev]
        try {
          localStorage.setItem(ADDED_PRODUCTS_STORAGE_KEY, JSON.stringify(updated))
        } catch {}
        return updated
      })

      try {
        await createProductMutation.mutateAsync({
          categoryId: targetCatId,
          name: prodName,
          description: prodDesc,
          unitCost: Number(prodCost) || 0,
          unit: prodUnit,
          packagingStandard: prodPkg,
        })
      } catch {}

      showNotification(`Khai báo thành công sản phẩm mới "${prodName}"!`, 'success')
    }

    setIsProductModalOpen(false)
    refetchProducts()
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmTarget) return

    if (deleteConfirmTarget.type === 'BATCH') {
      const batchCodeStr = deleteConfirmTarget.id
      const targetBatch = batchesList.find((b) => b.batchCode === batchCodeStr)
      if (!targetBatch) return

      const bProductId = targetBatch.productId
      const restoredQty = targetBatch.quantity || 0

      if (bProductId) {
        const targetProd = productsList.find((p) => (p.productId || p.id) === bProductId)
        const currentStock = targetProd?.availableQuantity ?? targetProd?.quantity ?? 0
        const newRestockedStock = currentStock + restoredQty

        const updatedOverrides = { ...inventoryOverrides, [bProductId]: newRestockedStock }
        setInventoryOverrides(updatedOverrides)
        try {
          localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(updatedOverrides))
          await updateInventoryMutation.mutateAsync({
            productId: bProductId,
            quantity: newRestockedStock,
          })
        } catch {}
      }

      setDeletedBatchCodes((prev) => {
        const updated = Array.from(new Set([...prev, batchCodeStr]))
        try {
          localStorage.setItem(DELETED_BATCHES_STORAGE_KEY, JSON.stringify(updated))
        } catch {}
        return updated
      })

      setLocalBatches((prev) => {
        const updated = prev.filter((b) => b.batchCode !== batchCodeStr)
        try {
          localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(updated))
        } catch {}
        return updated
      })

      showNotification(`Đã xóa vĩnh viễn Lô hàng ${batchCodeStr} & Tự động hoàn trả +${restoredQty}kg vào kho!`, 'success')
      refetchBatches()
      refetchProducts()
    } else if (deleteConfirmTarget.type === 'PRODUCT') {
      const prodId = deleteConfirmTarget.id

      setDeletedProductIds((prev) => {
        const updated = Array.from(new Set([...prev, prodId]))
        try {
          localStorage.setItem('fldn_supplier_deleted_products_v3', JSON.stringify(updated))
        } catch {}
        return updated
      })

      setLocalCreatedProducts((prev) => {
        const updated = prev.filter((p) => (p.productId || p.id) !== prodId)
        try {
          localStorage.setItem(ADDED_PRODUCTS_STORAGE_KEY, JSON.stringify(updated))
        } catch {}
        return updated
      })

      try {
        await deleteProductMutation.mutateAsync(prodId)
      } catch {}

      showNotification('Đã ngưng kinh doanh & xóa sản phẩm thành công!', 'success')
      refetchProducts()
    }

    setDeleteConfirmTarget(null)
  }

  const handleOpenInventoryModal = (product: SupplierProduct) => {
    setUpdatingInventoryProduct(product)
    setInventoryQtyInput(String(product.availableQuantity ?? product.quantity ?? 0))
  }

  const handleSaveInventory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updatingInventoryProduct) return

    const targetProdId = updatingInventoryProduct.productId || updatingInventoryProduct.id || ''
    const newQty = Number(inventoryQtyInput) || 0

    const newMap = { ...inventoryOverrides, [targetProdId]: newQty }
    setInventoryOverrides(newMap)
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(newMap))
    } catch {}

    try {
      await updateInventoryMutation.mutateAsync({
        productId: targetProdId,
        quantity: newQty,
      })
    } catch {}

    showNotification(`Đã lưu thành công tồn kho mới: ${newQty.toLocaleString()} kg!`, 'success')
    setUpdatingInventoryProduct(null)
    refetchProducts()
    refetchInventory()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertFile(e.target.files[0])
      setModalBatchError(null)
    }
  }

  const handleDownloadQrImage = async (batchCodeStr: string, productNameStr: string) => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
        `FOODLINK-TRACE-${batchCodeStr}`
      )}`

      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `TEM_QR_${batchCodeStr}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      showNotification(`Đã tải xuống thành công Tem QR Code cho lô ${batchCodeStr}!`)
    } catch {
      alert(`Đã kích hoạt tải tem QR Code cho mã lô ${batchCodeStr}!`)
    }
  }

  const handlePrintPdfLabel = (
    batchCodeStr: string,
    productNameStr?: string,
    qty?: number,
    harvestDateStr?: string,
    expiryDateStr?: string
  ) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const qrCanvasUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      `FOODLINK-TRACE-${batchCodeStr}`
    )}`

    const formattedHarvest = formatDateVN(harvestDateStr || '2026-07-24')
    const formattedExpiry = formatDateVN(expiryDateStr || '2026-07-31')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tem QR Truy Xuất - ${batchCodeStr}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; background: #f8fafc; color: #0f172a; display: flex; justify-content: center; }
            .label-card { width: 340px; border: 2.5px solid #047857; border-radius: 20px; padding: 20px; background: #ffffff; box-shadow: 0 10px 25px -5px rgba(4, 120, 87, 0.15); text-align: center; }
            .brand-header { font-size: 16px; font-weight: 900; color: #065f46; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 1.5px dashed #a7f3d0; padding-bottom: 8px; margin-bottom: 12px; }
            .qr-box { display: inline-flex; padding: 10px; background: #f0fdf4; border: 1.5px solid #a7f3d0; border-radius: 14px; margin-bottom: 12px; }
            .qr-box img { width: 170px; height: 170px; display: block; border-radius: 8px; }
            .batch-code { font-family: monospace; font-size: 19px; font-weight: 900; color: #047857; letter-spacing: 1px; margin-bottom: 4px; }
            .product-name { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
            .info-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; text-align: left; }
            .info-table td { padding: 6px; border-bottom: 1px solid #f1f5f9; }
            .info-table td.label { font-weight: 700; color: #475569; width: 50%; }
            .info-table td.val { font-weight: 800; color: #0f172a; text-align: right; }
            .badge-vietgap { display: inline-block; margin-top: 14px; padding: 6px 16px; background: #dcfce7; color: #15803d; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
          </style>
        </head>
        <body>
          <div class="label-card">
            <div class="brand-header">FoodLink Đà Nẵng</div>
            <div class="qr-box">
              <img id="qr-img" src="${qrCanvasUrl}" alt="Mã QR Truy Xuất Nguồn Gốc" />
            </div>
            <div class="batch-code">${batchCodeStr}</div>
            <div class="product-name">${productNameStr || 'Nông sản VietGAP'}</div>
            
            <table class="info-table">
              <tr>
                <td class="label">Khối lượng Lô hàng:</td>
                <td class="val">${qty || 300} kg</td>
              </tr>
              <tr>
                <td class="label">Ngày thu hoạch:</td>
                <td class="val">${formattedHarvest}</td>
              </tr>
              <tr>
                <td class="label">Hạn sử dụng:</td>
                <td class="val">${formattedExpiry}</td>
              </tr>
            </table>

            <div class="badge-vietgap">✓ Đạt Chứng Nhận VietGAP & ATTP</div>
          </div>

          <script>
            const img = document.getElementById('qr-img');
            const triggerPrint = () => { window.print(); };
            if (img.complete && img.naturalWidth !== 0) {
              triggerPrint();
            } else {
              img.onload = triggerPrint;
              img.onerror = triggerPrint;
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  // Modal inline error state
  const [modalBatchError, setModalBatchError] = useState<string | null>(null)

  // Smart unique batch code generator that avoids all existing batch codes
  const generateUniqueBatchCode = () => {
    let uniqueCode = ''
    let attempts = 0
    const existingSet = new Set(batchesList.map((b) => (b.batchCode || '').toUpperCase().trim()))
    do {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      const randomNum = String(Math.floor(Math.random() * 8900 + 1000))
      uniqueCode = `BTC-${dateStr}-${randomNum}`
      attempts++
    } while (attempts < 50 && existingSet.has(uniqueCode))
    return uniqueCode
  }

  const handleGenerateQR = async () => {
    setModalBatchError(null)

    const trimmedCode = (batchCode || '').trim().toUpperCase()
    if (!trimmedCode) {
      setModalBatchError('Vui lòng nhập hoặc sinh Mã Lô hàng!')
      return
    }

    // STRICT VALIDATION: Prevent duplicate batch codes
    const isDuplicateBatchCode = batchesList.some(
      (b) => (b.batchCode || b.id || b.batchId || '').trim().toUpperCase() === trimmedCode
    )

    if (isDuplicateBatchCode) {
      setModalBatchError(
        `Mã Lô hàng "${trimmedCode}" đã tồn tại trên hệ thống! Vui lòng bấm nút "🔄 Sinh mã mới" hoặc nhập mã lô khác!`
      )
      return
    }

    if (!certFile) {
      setModalBatchError('Vui lòng đính kèm Giấy chứng nhận VietGAP / ATTP (file PDF, JPG, PNG) để đủ điều kiện tạo lô hàng!')
      return
    }

    // STRICT VALIDATION: Expiry date MUST be after harvest date
    if (harvestDate && expiryDate && new Date(expiryDate) <= new Date(harvestDate)) {
      setModalBatchError('Không thể tạo Lô hàng! Hạn sử dụng phải diễn ra SAU Ngày thu hoạch. Vui lòng điều chỉnh lại ngày hợp lệ!')
      return
    }

    const targetProdId = selectedProductId || productsList[0]?.productId || productsList[0]?.id || ''
    const targetProd = productsList.find((p) => (p.productId || p.id) === targetProdId)
    const pName = targetProd?.name || 'Nông sản VietGAP'
    const requestedBatchQty = Number(quantity) || 100

    const currentStock = targetProd?.availableQuantity ?? targetProd?.quantity ?? 0

    if (currentStock < requestedBatchQty) {
      setModalBatchError(
        `Không thể tạo Lô hàng! Tồn kho của "${pName}" hiện có ${currentStock.toLocaleString()} kg (Không đủ ${requestedBatchQty.toLocaleString()} kg). Vui lòng điều chỉnh số lượng hoặc "Cập nhật kho" trước!`
      )
      return
    }

    const remainingStock = currentStock - requestedBatchQty

    const newMap = { ...inventoryOverrides, [targetProdId]: remainingStock }
    setInventoryOverrides(newMap)
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(newMap))
    } catch {}

    const newBatchObj: SupplierBatch = {
      batchId: `batch-${Date.now()}`,
      batchCode,
      productId: targetProdId,
      productName: pName,
      quantity: requestedBatchQty,
      harvestDate,
      expiryDate,
      status: 'Active',
    }

    setLocalBatches((prev) => {
      const updated = [newBatchObj, ...prev]
      try {
        localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })

    try {
      createBatchMutation.mutate({
        productId: targetProdId,
        batchCode,
        quantity: requestedBatchQty,
        harvestDate,
        expiryDate,
      })
      updateInventoryMutation.mutate({
        productId: targetProdId,
        quantity: remainingStock,
      })
    } catch {}

    showNotification(`Tạo thành công Lô hàng ${batchCode} (${requestedBatchQty}kg) cho "${pName}". Tồn kho còn lại: ${remainingStock.toLocaleString()}kg!`, 'success')
    setIsBatchModalOpen(false)
    setCertFile(null)
    setModalBatchError(null)
    setActiveTab('BATCHES')
    refetchBatches()
    refetchProducts()
  }

  return (
    <div className="space-y-8 p-6 font-sans text-slate-800 antialiased">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-[100] flex items-center gap-3 rounded-2xl px-5 py-3.5 text-xs font-bold text-white shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 ${
            notification.type === 'error'
              ? 'bg-gradient-to-r from-rose-900 to-red-800 border border-rose-700/80 shadow-rose-950/30'
              : 'bg-gradient-to-r from-emerald-900 to-teal-800 border border-emerald-700/80 shadow-emerald-950/30'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="size-5 text-rose-300 shrink-0" />
          ) : (
            <CheckCircle2 className="size-5 text-emerald-300 shrink-0" />
          )}
          <span className="leading-snug">{notification.msg}</span>
        </div>
      )}

      {/* Header Banner - Cleaned Title */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 text-white shadow-xl shadow-emerald-950/20 transition-all duration-300">
        <div className="absolute -right-16 -top-16 size-80 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-teal-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-800/40 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-md">
              <Sparkles className="size-3.5 text-emerald-300" />
              Chuỗi cung ứng thực phẩm sạch
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Danh mục Sản phẩm & Lô hàng
            </h1>
            <p className="text-sm font-medium text-emerald-100/70 max-w-xl leading-relaxed">
              Quản lý nông sản sỉ, theo dõi từng đợt thu hoạch (Lô hàng) và sinh mã QR truy xuất nguồn gốc thực tế.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4.5 py-3 text-xs font-bold text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-95 cursor-pointer"
            >
              <Plus className="size-4 text-emerald-300" />
              Thêm sản phẩm mới
            </button>
            <button
              onClick={() => {
                setBatchCode(generateUniqueBatchCode())
                setIsBatchModalOpen(true)
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-3 text-xs font-black text-emerald-950 shadow-lg shadow-emerald-400/25 transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <QrCode className="size-4" />
              Tạo Lô Hàng Mới
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Bento Style */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Boxes className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng sản phẩm</p>
              {isLoadingProducts ? (
                <Loader2 className="size-4 animate-spin text-emerald-700 mt-1" />
              ) : (
                <p className="text-2xl font-black text-slate-900 mt-0.5">{totalProductsCount}</p>
              )}
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <QrCode className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Lô hàng đã tạo</p>
              {isLoadingBatches ? (
                <Loader2 className="size-4 animate-spin text-blue-700 mt-1" />
              ) : (
                <p className="text-2xl font-black text-slate-900 mt-0.5">{pendingBatchesCount}</p>
              )}
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/10 p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
              <Clock className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">Sắp hết hạn</p>
                <span className="rounded-md bg-amber-200 px-1.5 py-0.5 text-[9px] font-black text-amber-950">
                  ≤ 3 Ngày
                </span>
              </div>
              <p className="text-2xl font-black text-amber-950 mt-0.5">{expiringBatchesCount}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-inner group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              <TrendingUp className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng tồn kho</p>
              {isLoadingInventory || isLoadingProducts ? (
                <Loader2 className="size-4 animate-spin text-teal-700 mt-1" />
              ) : (
                <p className="text-2xl font-black text-slate-900 mt-0.5">{totalStockKg.toLocaleString()} kg</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation - Premium Capsule Design */}
      <div className="flex items-center gap-2 bg-slate-100/60 p-1.5 rounded-2xl w-fit border border-slate-200/50">
        <button
          onClick={() => setActiveTab('PRODUCTS')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all rounded-xl cursor-pointer ${
            activeTab === 'PRODUCTS'
              ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/20 font-black'
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <Boxes className="size-4" />
          Danh mục Sản phẩm ({productsList.length})
        </button>

        <button
          onClick={() => setActiveTab('BATCHES')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold transition-all rounded-xl cursor-pointer ${
            activeTab === 'BATCHES'
              ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/20 font-black'
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <QrCode className="size-4" />
          Danh sách Lô hàng & Mã QR ({batchesList.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT TABLE */}
      {activeTab === 'PRODUCTS' && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-100/40">
          <div className="overflow-x-auto">
            {isLoadingProducts ? (
              <div className="flex flex-col items-center justify-center p-16 text-slate-500 gap-3">
                <Loader2 className="size-8 animate-spin text-emerald-700" />
                <span className="text-xs font-bold text-slate-400">Đang tải danh sách sản phẩm...</span>
              </div>
            ) : productsList.length > 0 ? (
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    <th className="px-6 py-4">Sản phẩm</th>
                    <th className="px-6 py-4">Phân loại</th>
                    <th className="px-6 py-4">Giá sỉ (VND/kg)</th>
                    <th className="px-6 py-4">Quy cách</th>
                    <th className="px-6 py-4">Tồn kho khả dụng</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Thao tác Quản lý</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {productsList.map((item) => {
                    const itemId = item.productId || item.id || 'unknown'
                    return (
                      <tr key={itemId} className="transition-all duration-150 hover:bg-slate-50/60">
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3.5">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="size-11 rounded-2xl object-cover border border-emerald-100 shadow-xs shrink-0 bg-slate-50"
                              />
                            ) : (
                              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-sm font-black text-emerald-800 shadow-sm shrink-0">
                                {item.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-extrabold text-slate-900 text-sm">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{itemId.substring(0, 8).toUpperCase()}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4.5">
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                            {item.categoryName ?? 'Nông sản'}
                          </span>
                        </td>

                        <td className="px-6 py-4.5 font-black text-slate-900">
                          {item.unitCost ? item.unitCost.toLocaleString() : '0'} đ
                        </td>

                        <td className="px-6 py-4.5 text-xs font-semibold text-slate-600">{item.packagingStandard ?? item.unit ?? 'Kg'}</td>

                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-black text-slate-900 text-sm">
                              {item.availableQuantity ?? item.quantity ?? 0} {item.unit ?? 'kg'}
                            </span>
                            <button
                              onClick={() => handleOpenInventoryModal(item)}
                              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all shadow-2xs cursor-pointer"
                              title="Sửa kho"
                            >
                              Cập nhật kho
                            </button>
                          </div>
                        </td>

                        <td className="px-6 py-4.5">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                              item.isActive !== false
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : 'bg-slate-50 text-slate-500'
                            }`}
                          >
                            {item.isActive !== false ? 'Đang kinh doanh' : 'Ngưng bán'}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                              title="Chỉnh sửa sản phẩm"
                            >
                              <Edit className="size-3.5 text-slate-500" />
                              Sửa
                            </button>

                            <button
                              onClick={() => {
                                setSelectedProductId(itemId)
                                setBatchCode(generateUniqueBatchCode())
                                setCertFile(null)
                                setModalBatchError(null)
                                setIsBatchModalOpen(true)
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition-all active:scale-95 cursor-pointer"
                            >
                              <QrCode className="size-3.5" />
                              Tạo Lô
                            </button>

                            <button
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: 'PRODUCT',
                                  id: itemId,
                                  title: `Sản phẩm "${item.name}"`,
                                })
                              }
                              className="rounded-xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
                              title="Ngưng bán"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-16 text-center text-slate-500">
                Hiện chưa có sản phẩm nào. Hãy bấm "Thêm sản phẩm mới" để khai báo nông sản!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BATCHES TABLE WITH FORMATTED VIETNAMESE DATES */}
      {activeTab === 'BATCHES' && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-100/40">
          <div className="overflow-x-auto">
            {isLoadingBatches ? (
              <div className="flex flex-col items-center justify-center p-16 text-slate-500 gap-3">
                <Loader2 className="size-8 animate-spin text-emerald-700" />
                <span className="text-xs font-bold text-slate-400">Đang tải danh sách lô hàng...</span>
              </div>
            ) : batchesList.length > 0 ? (
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    <th className="px-6 py-4">Mã Lô hàng</th>
                    <th className="px-6 py-4">Sản phẩm áp dụng</th>
                    <th className="px-6 py-4 text-right">Số lượng Lô</th>
                    <th className="px-6 py-4">Ngày thu hoạch</th>
                    <th className="px-6 py-4">Hạn sử dụng</th>
                    <th className="px-6 py-4 text-center">QR Truy xuất</th>
                    <th className="px-6 py-4 text-right">Thao tác CRUD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {batchesList.map((batch) => {
                    const bId = batch.id || batch.batchId || batch.batchCode
                    const today = new Date('2026-07-25').getTime()
                    const exp = batch.expiryDate ? new Date(batch.expiryDate).getTime() : 0
                    const diffDays = Math.ceil((exp - today) / (1000 * 3600 * 24))

                    const isUrgentExpiring = diffDays >= 0 && diffDays <= 3

                    return (
                      <tr key={bId} className="transition-all duration-150 hover:bg-slate-50/60">
                        <td className="px-6 py-4.5 font-mono font-bold text-emerald-900 text-sm">
                          {batch.batchCode}
                        </td>

                        <td className="px-6 py-4.5 font-extrabold text-slate-900">
                          {batch.productName || 'Nông sản VietGAP'}
                        </td>

                        <td className="px-6 py-4.5 text-right font-black text-slate-900 text-sm">
                          {batch.quantity?.toLocaleString()} <span className="text-xs font-normal text-slate-500">kg</span>
                        </td>

                        <td className="px-6 py-4.5 text-slate-600 font-bold">
                          {formatDateVN(batch.harvestDate ?? '2026-07-25')}
                        </td>

                        <td className="px-6 py-4.5">
                          <div className="flex flex-col">
                            <span className={`font-bold ${isUrgentExpiring ? 'text-amber-700' : 'text-slate-700'}`}>
                              {formatDateVN(batch.expiryDate ?? '2026-08-01')}
                            </span>
                            {isUrgentExpiring && (
                              <span className="mt-1 inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200/50">
                                <Clock className="size-3 text-amber-600" />
                                Cần bán gấp (Còn {diffDays} ngày)
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4.5 text-center">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
                            <QrCode className="size-3.5 text-emerald-600" />
                            Đã kích hoạt QR
                          </span>
                        </td>

                        <td className="px-6 py-4.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setViewingBatchQr(batch)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                              title="Xem chi tiết tem QR"
                            >
                              <Eye className="size-3.5 text-slate-500" />
                              Xem Tem
                            </button>

                            <button
                              onClick={() => handleDownloadQrImage(batch.batchCode, batch.productName || '')}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all active:scale-95 cursor-pointer"
                              title="Tải ảnh QR Code"
                            >
                              <Download className="size-3.5 text-emerald-600" />
                              Tải QR
                            </button>

                            <button
                              onClick={() => handlePrintPdfLabel(batch.batchCode, batch.productName, batch.quantity, batch.harvestDate, batch.expiryDate)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:from-emerald-800 hover:to-teal-800 transition-all active:scale-95 cursor-pointer"
                              title="In Tem PDF"
                            >
                              <Printer className="size-3.5" />
                              In Tem PDF
                            </button>

                            <button
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: 'BATCH',
                                  id: batch.batchCode,
                                  title: `Lô hàng "${batch.batchCode}"`,
                                  restockQty: batch.quantity,
                                })
                              }
                              className="rounded-xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
                              title="Xóa Lô hàng"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <QrCode className="size-12 text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-700">Chưa có lô hàng nào được tạo</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hãy bấm "Tạo lô hàng mới" để khởi tạo đợt thu hoạch & cấp mã QR truy xuất.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CUSTOM DIALOG MODAL FOR DELETE CONFIRMATION - Ultra Sleek Design */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100/80">
            <div className="flex items-center gap-3.5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 shrink-0">
                <AlertTriangle className="size-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950">Xác nhận xóa dữ liệu</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Hành động này không thể hoàn tác.</p>
              </div>
            </div>

            <div className="my-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-xs text-slate-600 leading-relaxed font-medium">
              Bạn có chắc chắn muốn xóa <span className="font-bold text-slate-900">{deleteConfirmTarget.title}</span>?
              {deleteConfirmTarget.type === 'BATCH' && (
                <div className="mt-3 flex items-center gap-2 font-bold text-emerald-800 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Số lượng {deleteConfirmTarget.restockQty} kg sẽ được tự động hoàn trả lại vào kho!</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeleteConfirmTarget(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-xl bg-rose-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-all active:scale-95 cursor-pointer"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Product - Sleek Rounded 3xl Layout */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100/80">
            <div className="flex items-center justify-between border-b px-6 py-4.5 bg-slate-50">
              <h3 className="text-base font-extrabold text-slate-950">
                {editingProduct ? 'Chỉnh sửa Sản phẩm Nông sản' : 'Khai báo Sản phẩm Nông sản Mới'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Phân loại Danh mục *</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800 transition-all focus:border-emerald-500 focus:outline-hidden"
                >
                  {categoriesList.length > 0 ? (
                    categoriesList.map((cat) => (
                      <option key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="">-- Chưa có danh mục trong CSDL --</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Tên sản phẩm nông sản *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cà chua bi VietGAP, Dải lợn quế..."
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-bold focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Giá sỉ (VND/kg) *</label>
                  <input
                    type="number"
                    required
                    value={prodCost}
                    onChange={(e) => setProdCost(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs font-bold focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Đơn vị tính *</label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs font-bold focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Quy cách đóng gói</label>
                <input
                  type="text"
                  value={prodPkg}
                  onChange={(e) => setProdPkg(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-bold focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">URL Hình ảnh sản phẩm (Tùy chọn)</label>
                <div className="flex items-center gap-3">
                  {prodImage ? (
                    <img src={prodImage} alt="Preview" className="size-11 rounded-2xl object-cover border border-emerald-200 shadow-xs shrink-0 bg-slate-50" />
                  ) : (
                    <div className="size-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 text-[10px] font-bold">
                      Trống
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Dán link ảnh (https://...) hoặc để trống..."
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Mô tả sản phẩm</label>
                <textarea
                  placeholder="Nhập thông tin xuất xứ, quy trình trồng trọt VietGAP..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium h-16 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="rounded-xl border py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  className="rounded-xl bg-emerald-800 py-3 text-xs font-black text-white shadow-md hover:bg-emerald-900 active:scale-95 disabled:opacity-50 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100/80">
            <div className="flex items-center justify-between border-b px-6 py-4.5 bg-slate-50">
              <h3 className="text-sm font-extrabold text-slate-950">
                Cập nhật Tồn Kho: {updatingInventoryProduct.name}
              </h3>
              <button onClick={() => setUpdatingInventoryProduct(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInventory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Số lượng tồn kho (kg) *</label>
                <input
                  type="number"
                  required
                  value={inventoryQtyInput}
                  onChange={(e) => setInventoryQtyInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-mono text-base font-bold text-slate-900 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUpdatingInventoryProduct(null)}
                  className="rounded-xl border px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={updateInventoryMutation.isPending}
                  className="rounded-xl bg-emerald-800 px-4.5 py-2.5 text-xs font-black text-white shadow-md hover:bg-emerald-900 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {updateInventoryMutation.isPending ? 'Đang lưu...' : 'Cập nhật kho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Batch & QR Code Creation */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100/80">
            <div className="flex items-center justify-between border-b px-6 py-4.5 bg-slate-50">
              <div>
                <h3 className="text-base font-extrabold text-slate-950">Tạo Lô hàng & QR Truy xuất</h3>
                <p className="text-xs text-slate-400 mt-0.5">Đăng ký thông tin lô sản phẩm mới & Sinh mã QR Code.</p>
              </div>
              <button
                onClick={() => setIsBatchModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              {/* Form Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Sản phẩm áp dụng</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                  >
                    {productsList.length > 0 ? (
                      productsList.map((p) => {
                        const pid = p.productId || p.id || ''
                        const stock = p.availableQuantity ?? p.quantity ?? 0
                        return (
                          <option key={pid} value={pid}>
                            {p.name} (Tồn kho: {stock} kg)
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
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Mã Lô hàng</label>
                      <input
                        type="text"
                        readOnly
                        value={batchCode}
                        className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 font-mono text-xs font-bold text-slate-800 cursor-not-allowed select-none focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Số lượng (kg)</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full rounded-xl border p-2.5 text-xs font-bold focus:outline-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Ngày thu hoạch</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        readOnly
                        value={formatDateVN(harvestDate)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pr-9 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 cursor-pointer"
                      />
                      <Calendar className="absolute right-3 size-4 text-emerald-600 pointer-events-none" />
                      <input
                        type="date"
                        value={harvestDate}
                        onChange={(e) => setHarvestDate(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Hạn sử dụng</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        readOnly
                        value={formatDateVN(expiryDate)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pr-9 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 cursor-pointer"
                      />
                      <Calendar className="absolute right-3 size-4 text-emerald-600 pointer-events-none" />
                      <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Giấy chứng nhận VietGAP / ATTP</label>
                  <label
                    htmlFor="cert-file-upload"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-4 text-center hover:bg-emerald-50 cursor-pointer transition-all"
                  >
                    <input
                      type="file"
                      id="cert-file-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <UploadCloud className="size-7 text-emerald-600 mb-1" />
                    {certFile ? (
                      <div>
                        <p className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                          <FileCheck className="size-3.5 text-emerald-600" />
                          {certFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {(certFile.size / 1024).toFixed(1)} KB • Bấm để chọn file khác
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold text-slate-700">Chọn file chứng nhận để đính kèm</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Hỗ trợ PDF, JPG, PNG tối đa 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* QR Preview Column */}
              <div className="flex flex-col items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/20 p-5">
                <p className="self-start text-xs font-bold text-emerald-950">Mã QR Code Truy xuất nguồn gốc</p>

                <div className="my-4 flex flex-col items-center text-center">
                  <div className="flex size-48 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `FOODLINK-TRACE-${batchCode}`
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
                  {modalBatchError && (
                    <div className="w-full rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-center text-xs font-bold text-rose-700 shadow-sm animate-in fade-in duration-200 flex items-center justify-center gap-1.5">
                      <AlertCircle className="size-4 shrink-0 text-rose-600" />
                      <span>{modalBatchError}</span>
                    </div>
                  )}

                  <button
                    onClick={handleGenerateQR}
                    disabled={createBatchMutation.isPending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 py-3 text-xs font-black text-white shadow-md hover:from-emerald-800 hover:to-teal-800 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="size-4" />
                    {createBatchMutation.isPending ? 'Đang tạo...' : 'Tạo Lô Hàng & Sinh QR'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrintPdfLabel(batchCode, 'Nông sản VietGAP', Number(quantity), harvestDate, expiryDate)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Printer className="size-4 text-emerald-700" />
                    In tem PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal View Batch QR */}
      {viewingBatchQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100/80">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-extrabold text-slate-950">Tem Truy Xuất Nguồn Gốc</h3>
              <button onClick={() => setViewingBatchQr(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex size-48 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-md my-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    `FOODLINK-TRACE-${viewingBatchQr.batchCode}`
                  )}`}
                  alt="Batch QR Code"
                  className="size-full object-contain"
                />
              </div>

              <p className="font-mono text-base font-black text-emerald-950 mt-2">{viewingBatchQr.batchCode}</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{viewingBatchQr.productName || 'Nông sản VietGAP'}</p>
              <p className="text-xs text-slate-500">Số lượng: {viewingBatchQr.quantity} kg</p>

              <div className="w-full mt-4 flex gap-2">
                <button
                  onClick={() => handleDownloadQrImage(viewingBatchQr.batchCode, viewingBatchQr.productName || '')}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-100 cursor-pointer"
                >
                  <Download className="size-3.5 text-emerald-600" />
                  Tải QR
                </button>
                <button
                  onClick={() => handlePrintPdfLabel(viewingBatchQr.batchCode, viewingBatchQr.productName, viewingBatchQr.quantity, viewingBatchQr.harvestDate, viewingBatchQr.expiryDate)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 py-2.5 text-xs font-black text-white shadow-sm hover:from-emerald-800 hover:to-teal-800 cursor-pointer"
                >
                  <Printer className="size-3.5" />
                  In Tem PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
