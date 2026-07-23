'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, ShoppingBag, Star, Store, MapPin } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(
    product.mainImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'
  )

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() =>
            setImgSrc('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800')
          }
        />

        {/* Category Mint Tag */}
        {product.categoryName && (
          <div className="absolute left-2.5 top-2.5">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur-md">
              {product.categoryName}
            </span>
          </div>
        )}

        {/* Quick view hover action button */}
        <button
          onClick={() => onQuickView(product)}
          aria-label="Xem nhanh sản phẩm"
          className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-110 hover:bg-black"
        >
          <Eye className="size-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col justify-between gap-3">
        <div>
          {/* Supplier & Rating Info */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            {product.supplierName && (
              <span className="inline-flex items-center gap-1 font-medium truncate max-w-[70%]" title={product.supplierName}>
                <Store className="size-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{product.supplierName}</span>
              </span>
            )}
            {product.averageRating ? (
              <span className="flex items-center gap-1 font-semibold text-amber-600">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                {product.averageRating}
              </span>
            ) : null}
          </div>

          {/* Location if present */}
          {product.districtName && (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{product.districtName}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="mt-1.5 text-base font-semibold tracking-tight text-zinc-900 line-clamp-2 group-hover:text-black">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Section */}
        <div className="border-t border-zinc-100 pt-3">
          <div className="flex items-baseline justify-between gap-1 mb-3">
            <div>
              <span className="text-lg font-bold text-zinc-900">
                {formatPrice(product.retailPrice)}
              </span>
              <span className="ml-1 text-xs text-zinc-500 font-medium">/{product.unit}</span>
            </div>
            {product.wholesalePrice && (
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Sỉ: {formatPrice(product.wholesalePrice)}
              </span>
            )}
          </div>

          {/* Black Pill Button */}
          <button
            onClick={() => onQuickView(product)}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="size-4" />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  )
}
