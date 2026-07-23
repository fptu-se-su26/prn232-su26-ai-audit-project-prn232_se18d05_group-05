'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Store, PackageCheck, ShieldCheck, MapPin, Star, QrCode, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types/product'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedQty, setSelectedQty] = useState(1)

  if (!isOpen || !product) return null

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const handleAddToCart = () => {
    toast.success(`Đã thêm ${selectedQty} ${product.unit} "${product.name}" vào giỏ hàng!`)
    onClose()
  }

  const mainImage = product.mainImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all border border-zinc-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-black"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              {product.categoryName && (
                <span className="absolute left-3 top-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">
                  {product.categoryName}
                </span>
              )}
            </div>

            {/* Badges / Micro Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50 p-3 border border-zinc-100">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-800">ATVSTP VietGAP</p>
                  <p className="text-zinc-500">Đảm bảo an toàn</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50 p-3 border border-zinc-100">
                <QrCode className="size-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-800">Truy xuất nguồn gốc</p>
                  <p className="text-zinc-500">Mã QR chính hãng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              {/* Supplier header */}
              {product.supplierName && (
                <div className="flex items-center justify-between text-xs font-medium text-zinc-500 mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Store className="size-3.5" />
                    {product.supplierName}
                  </span>
                  {product.districtName && (
                    <span className="flex items-center gap-1 text-zinc-500">
                      <MapPin className="size-3" />
                      {product.districtName}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{product.name}</h2>

              {/* Rating */}
              {product.averageRating && (
                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                  <div className="flex items-center text-amber-500">
                    <Star className="size-4 fill-amber-500" />
                    <span className="ml-1 font-bold">{product.averageRating}</span>
                  </div>
                  {product.totalReviews && (
                    <span className="text-zinc-400">({product.totalReviews} đánh giá)</span>
                  )}
                </div>
              )}

              {/* Price block */}
              <div className="mt-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-zinc-900">
                    {formatPrice(product.retailPrice)}
                  </span>
                  <span className="text-sm font-medium text-zinc-500">/ {product.unit}</span>
                </div>
                {product.wholesalePrice && (
                  <div className="mt-1 flex items-center gap-2 text-xs font-medium text-emerald-700">
                    <span>Giá sỉ đại lý: {formatPrice(product.wholesalePrice)} /{product.unit}</span>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                {product.packagingStandard && (
                  <div className="flex items-start gap-2">
                    <PackageCheck className="size-4 text-zinc-400 mt-0.5 shrink-0" />
                    <span><strong className="text-zinc-800">Quy cách:</strong> {product.packagingStandard}</span>
                  </div>
                )}
                {product.quantity !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span><strong className="text-zinc-800">Tồn kho:</strong> {product.quantity} {product.unit} sẵn có</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Mô tả sản phẩm</h4>
                  <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>

            {/* Quantity picker & Action */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-700">Số lượng:</span>
                <div className="flex items-center rounded-full border border-zinc-300 bg-white p-1">
                  <button
                    onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                    className="flex size-7 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-zinc-900">{selectedQty}</span>
                  <button
                    onClick={() => setSelectedQty((q) => q + 1)}
                    className="flex size-7 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-black py-3 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 shadow-md"
                >
                  <ShoppingCart className="size-4" />
                  <span>Thêm vào giỏ hàng ({formatPrice(product.retailPrice * selectedQty)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
