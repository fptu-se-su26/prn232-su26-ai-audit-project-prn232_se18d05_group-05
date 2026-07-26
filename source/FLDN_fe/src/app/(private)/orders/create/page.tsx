'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Package,
  Plus,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck
} from 'lucide-react'
import { toast } from 'sonner'
import { MOCK_PRODUCTS, productService } from '@/services/product.service'
import { orderService } from '@/services/order.service'
import type { Product } from '@/types/product'
import type {
  DeliveryAddress,
  District,
  SupplyRequestItem,
  VoucherValidationResponse,
} from '@/types/order'
import { APP_ROUTES } from '@/routes/app-routes'
import { useSupplyRequestDraftStore } from '@/stores/supply-request-draft.store'

export default function CreateSupplyRequestPage() {
  const router = useRouter()

  // State
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  
  // Custom new address form
  const [districts, setDistricts] = useState<District[]>([])
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false)
  const [newReceiverName, setNewReceiverName] = useState('')
  const [newReceiverPhone, setNewReceiverPhone] = useState('')
  const [newFullAddress, setNewFullAddress] = useState('')
  const [newDistrictId, setNewDistrictId] = useState('')
  const [newIsDefault, setNewIsDefault] = useState(false)
  const [isSavingAddress, setIsSavingAddress] = useState(false)

  // Delivery type & schedule
  const [deliveryType, setDeliveryType] = useState<'Standard' | 'Scheduled'>('Standard')
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  )
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState<string>('08:00 - 10:00')

  // Selected products for supply request
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [quantityInput, setQuantityInput] = useState<number>(10)
  const [requestItems, setRequestItems] = useState<SupplyRequestItem[]>([])

  // Voucher
  const [voucherInput, setVoucherInput] = useState<string>('')
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherValidationResponse | null>(null)
  const [isValidatingVoucher, setIsValidatingVoucher] = useState<boolean>(false)

  // Note
  const [note, setNote] = useState<string>('')

  // Submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [successOrder, setSuccessOrder] = useState<{ orderId: string; finalAmount: number } | null>(null)

  // Nhận các sản phẩm đã chọn từ trang tìm kiếm (/products) vào yêu cầu
  useEffect(() => {
    const draftItems = useSupplyRequestDraftStore.getState().items
    if (draftItems.length === 0) return
    setRequestItems((current) => {
      const merged = [...current]
      for (const draft of draftItems) {
        const idx = merged.findIndex((i) => i.productId === draft.productId)
        if (idx > -1) merged[idx] = { ...merged[idx], quantity: merged[idx].quantity + draft.quantity }
        else merged.push(draft)
      }
      return merged
    })
    useSupplyRequestDraftStore.getState().clear()
    toast.info(`Đã đưa ${draftItems.length} sản phẩm đã chọn vào yêu cầu cung ứng.`)
  }, [])

  // Load initial data
  useEffect(() => {
    orderService
      .getDeliveryAddresses()
      .then((res) => {
        setAddresses(res)
        if (res.length > 0) {
          const defaultAddr = res.find((a) => a.isDefault) || res[0]
          setSelectedAddressId(defaultAddr.addressId)
        }
      })
      .catch(() => toast.error('Không tải được danh sách địa chỉ giao hàng.'))

    orderService
      .getDistricts()
      .then((res) => {
        setDistricts(res)
        if (res.length > 0) setNewDistrictId(res[0].districtId)
      })
      .catch(() => toast.error('Không tải được danh sách quận/huyện.'))

    productService.searchProducts({ pageSize: 50 }).then((res) => {
      const items = res.items.length > 0 ? res.items : MOCK_PRODUCTS
      setAvailableProducts(items)
      if (items.length > 0) {
        setSelectedProductId(items[0].productId)
      }
    })
  }, [])

  // Add product to list
  const handleAddItem = () => {
    if (!selectedProductId) return
    const prod = availableProducts.find((p) => p.productId === selectedProductId)
    if (!prod) return

    const existingIndex = requestItems.findIndex((item) => item.productId === prod.productId)
    if (existingIndex > -1) {
      const updated = [...requestItems]
      updated[existingIndex].quantity += Number(quantityInput)
      setRequestItems(updated)
    } else {
      setRequestItems([
        ...requestItems,
        {
          productId: prod.productId,
          productName: prod.name,
          unit: prod.unit,
          unitPrice: prod.wholesalePrice || prod.retailPrice,
          quantity: Number(quantityInput),
          supplierName: prod.supplierName,
          mainImage: prod.mainImage,
        },
      ])
    }

    toast.success(`Đã thêm ${quantityInput} ${prod.unit} "${prod.name}" vào yêu cầu!`)
  }

  const handleRemoveItem = (index: number) => {
    const updated = [...requestItems]
    updated.splice(index, 1)
    setRequestItems(updated)
  }

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty < 1) return
    const updated = [...requestItems]
    updated[index].quantity = newQty
    setRequestItems(updated)
  }

  // Calculate totals
  const subtotal = requestItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const shippingFee = requestItems.length > 0 ? (deliveryType === 'Scheduled' ? 50000 : 30000) : 0
  const discountAmount = appliedVoucher?.isValid ? appliedVoucher.discountAmount : 0
  const totalAmount = Math.max(0, subtotal + shippingFee - discountAmount)

  // Validate & Apply Voucher
  const handleApplyVoucher = async () => {
    if (!voucherInput.trim()) return
    setIsValidatingVoucher(true)
    const result = await orderService.validateVoucher(voucherInput, subtotal)
    setIsValidatingVoucher(false)
    setAppliedVoucher(result)
    if (result.isValid) {
      toast.success(result.message || 'Áp dụng mã ưu đãi thành công!')
    } else {
      toast.error(result.message || 'Mã ưu đãi không hợp lệ.')
    }
  }

  // Add new custom address
  const handleCreateNewAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReceiverName || !newReceiverPhone || !newFullAddress) {
      toast.error('Vui lòng điền đầy đủ thông tin địa chỉ!')
      return
    }
    if (!newDistrictId) {
      toast.error('Vui lòng chọn quận/huyện!')
      return
    }

    setIsSavingAddress(true)
    try {
      const created = await orderService.createAddress({
        receiverName: newReceiverName,
        receiverPhone: newReceiverPhone,
        fullAddress: newFullAddress,
        districtId: newDistrictId,
        isDefault: newIsDefault,
      })

      // Đặt mặc định làm cả server đổi cờ isDefault của các địa chỉ khác, nên nạp lại danh sách
      const refreshed = await orderService.getDeliveryAddresses()
      setAddresses(refreshed)
      setSelectedAddressId(created.addressId)

      setShowAddAddress(false)
      setNewReceiverName('')
      setNewReceiverPhone('')
      setNewFullAddress('')
      setNewIsDefault(false)
      toast.success(
        created.isDefault
          ? 'Đã lưu địa chỉ và đặt làm mặc định!'
          : 'Đã lưu địa chỉ giao hàng mới!'
      )
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Lưu địa chỉ thất bại. Vui lòng thử lại.'
      toast.error(message)
    } finally {
      setIsSavingAddress(false)
    }
  }

  // Đặt địa chỉ có sẵn làm mặc định
  const handleSetDefaultAddress = async (id: string) => {
    try {
      await orderService.setDefaultAddress(id)
      const refreshed = await orderService.getDeliveryAddresses()
      setAddresses(refreshed)
      setSelectedAddressId(id)
      toast.success('Đã đặt làm địa chỉ mặc định.')
    } catch {
      toast.error('Không đặt được địa chỉ mặc định.')
    }
  }

  // Xoá địa chỉ
  const handleDeleteAddress = async (id: string) => {
    try {
      await orderService.deleteAddress(id)
      const refreshed = await orderService.getDeliveryAddresses()
      setAddresses(refreshed)
      if (selectedAddressId === id) {
        const fallback = refreshed.find((a) => a.isDefault) || refreshed[0]
        setSelectedAddressId(fallback?.addressId ?? '')
      }
      toast.success('Đã xoá địa chỉ.')
    } catch {
      toast.error('Không xoá được địa chỉ.')
    }
  }

  // Submit Supply Request
  const handleSubmitRequest = async () => {
    if (requestItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm vào yêu cầu cung ứng!')
      return
    }
    if (!selectedAddressId) {
      toast.error('Vui lòng chọn địa chỉ nhận hàng!')
      return
    }

    setIsSubmitting(true)
    const startTime = scheduledTimeSlot.split(' ')[0] || '08:00'
    const parsedDate = new Date(`${scheduledDate}T${startTime}:00`)
    const formattedScheduledTime = isNaN(parsedDate.getTime())
      ? new Date().toISOString()
      : parsedDate.toISOString()
    const fullNote = `[Khung giờ nhận: ${scheduledTimeSlot}] ${note}`.trim()

    const payload = {
      addressId: selectedAddressId,
      deliveryType,
      scheduledTime: formattedScheduledTime,
      voucherCode: appliedVoucher?.isValid ? appliedVoucher.code : undefined,
      note: fullNote,
      items: requestItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    }

    const response = await orderService.createSupplyRequest(payload)
    setIsSubmitting(false)

    setSuccessOrder({
      orderId: response.orderId,
      finalAmount: response.finalAmount,
    })
    toast.success('Gửi yêu cầu cung ứng thành công!')
  }

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="border-b border-zinc-200/80 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 mb-2">
              UC22 • Yêu cầu cung ứng thực phẩm
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Lập yêu cầu cung ứng
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Điểm phân phối đặt hàng trực tiếp từ nhà cung cấp theo quy cách chuẩn FoodLink.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
              <ShieldCheck className="size-4 text-emerald-600" />
              Cam kết chất lượng VietGAP
            </span>
          </div>
        </div>

        {/* Main 2-column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column (Form Controls) - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Chọn sản phẩm cung ứng */}
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Package className="size-5 text-emerald-600" />
                  1. Chọn danh sách sản phẩm cung ứng
                </h2>
                <span className="text-xs text-zinc-400 font-medium">
                  {requestItems.length} mặt hàng đã chọn
                </span>
              </div>

              {/* Product selector row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/60">
                <div className="sm:col-span-7">
                  <label className="text-xs font-semibold text-zinc-600 mb-1 block">Sản phẩm</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm font-medium text-zinc-900 focus:border-black focus:outline-none"
                  >
                    {availableProducts.map((p) => (
                      <option key={p.productId} value={p.productId}>
                        {p.name} - {formatPrice(p.wholesalePrice || p.retailPrice)}/{p.unit} ({p.supplierName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-zinc-600 mb-1 block">Số lượng</label>
                  <input
                    type="number"
                    min={1}
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm font-bold text-zinc-900 focus:border-black focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <button
                    onClick={handleAddItem}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-black py-2.5 px-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95"
                  >
                    <Plus className="size-4" />
                    <span>Thêm</span>
                  </button>
                </div>
              </div>

              {/* Request Items Table / List */}
              {requestItems.length > 0 ? (
                <div className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200/80 overflow-hidden">
                  {requestItems.map((item, index) => (
                    <div
                      key={item.productId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-zinc-50/50 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-xl bg-zinc-100 overflow-hidden relative shrink-0 border border-zinc-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.mainImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'}
                            alt={item.productName}
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{item.productName}</h4>
                          <p className="text-xs text-zinc-500">
                            {item.supplierName} • {formatPrice(item.unitPrice)}/{item.unit}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Qty Controls */}
                        <div className="flex items-center rounded-lg border border-zinc-200 bg-white">
                          <button
                            onClick={() => handleUpdateQty(index, item.quantity - 1)}
                            className="size-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(index, item.quantity + 1)}
                            className="size-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal for item */}
                        <span className="text-sm font-extrabold text-zinc-900 min-w-[90px] text-right">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>

                        {/* Delete button */}
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-500 text-sm">
                  Chưa có sản phẩm nào được chọn. Hãy chọn sản phẩm ở trên và nhấn &quot;Thêm&quot;.
                </div>
              )}
            </div>

            {/* Step 2: Địa chỉ giao hàng */}
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <MapPin className="size-5 text-emerald-600" />
                  2. Địa chỉ nhận hàng (Điểm phân phối)
                </h2>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Plus className="size-3.5" />
                  Thêm địa chỉ mới
                </button>
              </div>

              {/* Add New Address Form */}
              {showAddAddress && (
                <form onSubmit={handleCreateNewAddress} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Nhập địa chỉ giao mới
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tên người / Tên kho nhận"
                      value={newReceiverName}
                      onChange={(e) => setNewReceiverName(e.target.value)}
                      className="rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Số điện thoại liên hệ"
                      value={newReceiverPhone}
                      onChange={(e) => setNewReceiverPhone(e.target.value)}
                      className="rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Địa chỉ đầy đủ (Số nhà, Đường, Phường/Xã, Quận/Huyện...)"
                    value={newFullAddress}
                    onChange={(e) => setNewFullAddress(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none"
                  />
                  <select
                    value={newDistrictId}
                    onChange={(e) => setNewDistrictId(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none"
                  >
                    <option value="">-- Chọn quận/huyện --</option>
                    {districts.map((d) => (
                      <option key={d.districtId} value={d.districtId}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                    <input
                      type="checkbox"
                      checked={newIsDefault}
                      onChange={(e) => setNewIsDefault(e.target.checked)}
                      className="accent-black"
                    />
                    Đặt làm địa chỉ nhận hàng mặc định
                  </label>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-3 py-1.5 text-xs font-medium text-zinc-600 rounded-lg hover:bg-zinc-200"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingAddress}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-black rounded-lg hover:bg-zinc-800 disabled:opacity-50"
                    >
                      {isSavingAddress ? 'Đang lưu...' : 'Lưu địa chỉ'}
                    </button>
                  </div>
                </form>
              )}

              {/* Address Radio Select Cards */}
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.addressId}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.addressId
                        ? 'border-black bg-zinc-50 shadow-sm ring-1 ring-black'
                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.addressId}
                      onChange={() => setSelectedAddressId(addr.addressId)}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900">{addr.receiverName}</span>
                        <span className="text-zinc-500 font-medium">• {addr.receiverPhone}</span>
                        {addr.isDefault && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-zinc-600">
                        {addr.fullAddress}
                        {addr.districtName ? ` — ${addr.districtName}` : ''}
                      </p>
                      <div className="mt-2 flex gap-3 text-[11px] font-semibold">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleSetDefaultAddress(addr.addressId)
                            }}
                            className="text-emerald-700 hover:underline"
                          >
                            Đặt mặc định
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDeleteAddress(addr.addressId)
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </label>
                ))}

                {addresses.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
                    Chưa có địa chỉ nhận hàng. Nhấn &quot;Thêm địa chỉ mới&quot; để tạo.
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Phương thức & Thời gian hẹn giao */}
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Truck className="size-5 text-emerald-600" />
                  3. Hình thức vận chuyển & Hẹn giờ giao
                </h2>
              </div>

              {/* Delivery Type Option */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'Standard'
                      ? 'border-black bg-zinc-50 ring-1 ring-black'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={deliveryType === 'Standard'}
                        onChange={() => setDeliveryType('Standard')}
                        className="accent-black"
                      />
                      <span className="font-bold text-zinc-900">Giao tiêu chuẩn</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-700">30.000 ₫</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 pl-5">Giao trong 24h từ khi duyệt đơn</p>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'Scheduled'
                      ? 'border-black bg-zinc-50 ring-1 ring-black'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={deliveryType === 'Scheduled'}
                        onChange={() => setDeliveryType('Scheduled')}
                        className="accent-black"
                      />
                      <span className="font-bold text-zinc-900">Giao hẹn giờ</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-700">50.000 ₫</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 pl-5">Giao đúng khung giờ đã đặt trước</p>
                </label>
              </div>

              {/* Schedule time picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 mb-1 flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    Ngày nhận hàng dự kiến
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-600 mb-1 flex items-center gap-1">
                    <Clock className="size-3.5" />
                    Khung giờ nhận
                  </label>
                  <select
                    value={scheduledTimeSlot}
                    onChange={(e) => setScheduledTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:border-black focus:outline-none"
                  >
                    <option value="08:00 - 10:00">08:00 - 10:00 (Sáng)</option>
                    <option value="10:00 - 12:00">10:00 - 12:00 (Trưa)</option>
                    <option value="14:00 - 16:00">14:00 - 16:00 (Chiều)</option>
                    <option value="16:00 - 18:00">16:00 - 18:00 (Tối)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Ghi chú đơn hàng */}
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-3">
              <label className="text-sm font-bold text-zinc-900 block">Ghi chú cho Nhà cung cấp / Tài xế</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Yêu cầu đóng gói thùng xốp, liên hệ trước khi giao 15 phút..."
                className="w-full rounded-xl border border-zinc-200 p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column (Order Summary & Checkout Action) - 1 col */}
          <div className="space-y-6">
            {/* Card Summary */}
            <div className="sticky top-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Receipt className="size-5 text-emerald-600" />
                Tóm tắt yêu cầu cung ứng
              </h3>

              {/* Voucher Code Form */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-600 flex items-center gap-1">
                  <Tag className="size-3.5 text-emerald-600" />
                  Mã giảm giá / Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="VD: FOODLINK10"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 uppercase focus:border-black focus:outline-none"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    disabled={isValidatingVoucher || !voucherInput}
                    className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-black disabled:opacity-50"
                  >
                    Áp dụng
                  </button>
                </div>
                {appliedVoucher && (
                  <p
                    className={`text-xs font-medium ${
                      appliedVoucher.isValid ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {appliedVoucher.message}
                  </p>
                )}
                <p className="text-[11px] text-zinc-400">Gợi ý mã thử nghiệm: FOODLINK10 hoặc FREESHIP</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-zinc-100 pt-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Tạm tính ({requestItems.length} món)</span>
                  <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Phí vận chuyển ({deliveryType === 'Scheduled' ? 'Hẹn giờ' : 'Tiêu chuẩn'})</span>
                  <span className="font-semibold text-zinc-900">{formatPrice(shippingFee)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Mã giảm giá</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="border-t border-zinc-200 pt-3 flex justify-between items-baseline">
                  <span className="text-base font-bold text-zinc-900">Tổng thanh toán</span>
                  <span className="text-2xl font-extrabold text-zinc-900">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Primary Black Pill Action Button */}
              <button
                onClick={handleSubmitRequest}
                disabled={isSubmitting || requestItems.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-black py-3.5 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50 shadow-md"
              >
                <ShoppingBag className="size-4" />
                <span>{isSubmitting ? 'Đang khởi tạo...' : 'Gửi yêu cầu cung ứng'}</span>
              </button>

              <div className="text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1">
                <Building2 className="size-3" />
                Đơn hàng được xác nhận trực tiếp bởi Nhà cung cấp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-zinc-900">Gửi yêu cầu thành công!</h3>
            <p className="text-sm text-zinc-600">
              Yêu cầu cung ứng mã <strong className="text-zinc-900">{successOrder.orderId}</strong> đã được chuyển đến Nhà cung cấp xử lý.
            </p>

            <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-100 text-sm text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Mã yêu cầu:</span>
                <span className="font-bold text-zinc-900">{successOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tổng giá trị:</span>
                <span className="font-extrabold text-emerald-800">{formatPrice(successOrder.finalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Trạng thái:</span>
                <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs">
                  Đang chờ xác nhận (Pending)
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSuccessOrder(null)
                  setRequestItems([])
                }}
                className="flex-1 rounded-full border border-zinc-300 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Tạo đơn khác
              </button>
              <button
                onClick={() => router.push(APP_ROUTES.products)}
                className="flex-1 rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Về danh mục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
