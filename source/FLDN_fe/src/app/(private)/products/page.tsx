'use client'

import React, { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, X, ArrowUpDown, RefreshCw, PackageSearch, ClipboardList } from 'lucide-react'
import { productService } from '@/services/product.service'
import type { Category, Product, ProductSearchParams } from '@/types/product'
import { ProductCard } from '@/app/(private)/products/components/ProductCard'
import { ProductDetailModal } from '@/app/(private)/products/components/ProductDetailModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSupplyRequestDraftStore } from '@/stores/supply-request-draft.store'

export default function ProductsSearchPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isPending, startTransition] = useTransition()

  // Selected filters
  const [keyword, setKeyword] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [sortOption, setSortOption] = useState<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest')

  // UI states
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)
  const draftItems = useSupplyRequestDraftStore((state) => state.items)
  // Store persist từ localStorage — chỉ render sau mount để tránh lệch SSR/client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Fetch categories on mount
  useEffect(() => {
    productService.getCategories().then((cats) => setCategories(cats))
  }, [])

  // Fetch products whenever filters change
  const fetchProducts = React.useCallback(() => {
    setIsLoading(true)
    const params: ProductSearchParams = {
      keyword: keyword.trim() || undefined,
      categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort: sortOption,
      page: 1,
      pageSize: 20,
    }

    productService
      .searchProducts(params)
      .then((res) => {
        setProducts(res.items)
        setTotalCount(res.totalCount)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [keyword, selectedCategory, minPrice, maxPrice, sortOption])

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        fetchProducts()
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  const handleClearFilters = () => {
    setKeyword('')
    setSelectedCategory('all')
    setMinPrice('')
    setMaxPrice('')
    setSortOption('newest')
  }

  const activeCategoryName = categories.find((c) => c.categoryId === selectedCategory)?.name

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 mb-2">
              Chợ thực phẩm FoodLink
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Tìm kiếm sản phẩm
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Khám phá nông sản tươi sạch, thực phẩm chất lượng cao từ các nhà cung cấp uy tín.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-zinc-400" />
              <Input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm tên sản phẩm, nhà cung cấp..."
                className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              />
              {keyword && (
                <Button
                  onClick={() => setKeyword('')}
                  aria-label="Xóa từ khóa"
                  className="absolute right-3 rounded-full p-1 text-zinc-400 hover:text-zinc-600 bg-transparent shadow-none hover:bg-transparent"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm h-fit">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <SlidersHorizontal className="size-4" />
                Bộ lọc tìm kiếm
              </h3>
              {(selectedCategory !== 'all' || keyword || minPrice || maxPrice) && (
                <Button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-emerald-700 hover:underline bg-transparent shadow-none hover:bg-transparent p-0 h-auto"
                >
                  Xóa lọc
                </Button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Danh mục thực phẩm
              </label>
              <div className="space-y-1">
                <Button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors justify-start h-auto ${selectedCategory === 'all'
                      ? 'bg-black text-white hover:bg-black'
                      : 'text-zinc-700 hover:bg-zinc-100 bg-transparent shadow-none hover:text-zinc-700'
                    }`}
                >
                  Tất cả danh mục
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.categoryId}
                    onClick={() => setSelectedCategory(cat.categoryId)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors flex items-center justify-between h-auto ${selectedCategory === cat.categoryId
                        ? 'bg-black text-white hover:bg-black'
                        : 'text-zinc-700 hover:bg-zinc-100 bg-transparent shadow-none hover:text-zinc-700'
                      }`}
                  >
                    <span>{cat.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Khoảng giá (VND)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Từ (₫)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-black focus:bg-white focus:outline-none"
                />
                <Input
                  type="number"
                  placeholder="Đến (₫)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-black focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="flex items-center justify-between lg:hidden">
            <Button
              onClick={() => setShowMobileFilter(true)}
              className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-white"
            >
              <SlidersHorizontal className="size-4" />
              <span>Bộ lọc sản phẩm</span>
            </Button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-4 text-zinc-400" />
              <Select value={sortOption} onValueChange={(v) => setSortOption(v as typeof sortOption)}>
                <SelectTrigger className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 focus:outline-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price_asc">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="price_desc">Giá: Cao đến Thấp</SelectItem>
                  <SelectItem value="name_asc">Tên: A - Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Toolbar (Desktop Sort & Count) */}
            <div className="hidden lg:flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-5 py-3 shadow-sm">
              <div className="text-sm text-zinc-600 font-medium">
                Hiển thị <span className="font-bold text-zinc-900">{totalCount}</span> sản phẩm
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="size-4 text-zinc-400" />
                <span className="text-xs text-zinc-500 font-medium">Sắp xếp:</span>
                <Select value={sortOption} onValueChange={(v) => setSortOption(v as typeof sortOption)}>
                  <SelectTrigger className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-800 focus:border-black focus:outline-none cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price_asc">Giá: Thấp đến Cao</SelectItem>
                    <SelectItem value="price_desc">Giá: Cao đến Thấp</SelectItem>
                    <SelectItem value="name_asc">Tên: A - Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Bar */}
            {(selectedCategory !== 'all' || keyword || minPrice || maxPrice) && (
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100 text-xs">
                <span className="font-semibold text-emerald-900">Đang lọc theo:</span>
                {keyword && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200">
                    Từ khóa: &quot;{keyword}&quot;
                    <X className="size-3 cursor-pointer" onClick={() => setKeyword('')} />
                  </span>
                )}
                {selectedCategory !== 'all' && activeCategoryName && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200">
                    Danh mục: {activeCategoryName}
                    <X className="size-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200">
                    Giá: {minPrice ? `${Number(minPrice).toLocaleString()}₫` : '0₫'} - {maxPrice ? `${Number(maxPrice).toLocaleString()}₫` : '∞'}
                    <X className="size-3 cursor-pointer" onClick={() => { setMinPrice(''); setMaxPrice(''); }} />
                  </span>
                )}
                <Button
                  onClick={handleClearFilters}
                  className="ml-auto font-bold text-emerald-800 hover:underline bg-transparent shadow-none hover:bg-transparent p-0 h-auto text-xs"
                >
                  Xóa tất cả
                </Button>
              </div>
            )}

            {/* Loading / Grid / Empty State */}
            {isLoading || isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 animate-pulse rounded-2xl bg-zinc-200/60" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onQuickView={(p) => setSelectedProductForModal(p)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-sm">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                  <PackageSearch className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Không tìm thấy sản phẩm phù hợp</h3>
                <p className="mt-1 text-sm text-zinc-500 max-w-md">
                  Rất tiếc, không có sản phẩm nào phù hợp với bộ lọc hoặc từ khóa của bạn. Bạn hãy thử tìm kiếm từ khóa khác hoặc xóa bớt bộ lọc.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="mt-6 flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-all"
                >
                  <RefreshCw className="size-4" />
                  <span>Đặt lại bộ lọc</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)} />
          <div className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-zinc-900">Bộ lọc tìm kiếm</h3>
              <Button onClick={() => setShowMobileFilter(false)} className="rounded-full p-1 text-zinc-500 bg-transparent shadow-none hover:bg-transparent">
                <X className="size-5" />
              </Button>
            </div>

            <div className="mt-6 space-y-6 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Danh mục</label>
                <div className="space-y-1">
                  <Button
                    onClick={() => { setSelectedCategory('all'); setShowMobileFilter(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium justify-start h-auto ${selectedCategory === 'all' ? 'bg-black text-white hover:bg-black' : 'text-zinc-700 bg-transparent shadow-none hover:bg-transparent hover:text-zinc-700'}`}
                  >
                    Tất cả danh mục
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.categoryId}
                      onClick={() => { setSelectedCategory(cat.categoryId); setShowMobileFilter(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium justify-start h-auto ${selectedCategory === cat.categoryId ? 'bg-black text-white hover:bg-black' : 'text-zinc-700 bg-transparent shadow-none hover:bg-transparent hover:text-zinc-700'}`}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={() => setShowMobileFilter(false)}
                className="w-full rounded-full bg-black py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />

      {/* Thanh nổi: sản phẩm đã chọn cho yêu cầu cung ứng */}
      {mounted && draftItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <Link
            href="/orders/create"
            className="flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:bg-zinc-800"
          >
            <ClipboardList className="size-4" />
            <span>
              Tạo yêu cầu cung ứng ({draftItems.length} sản phẩm ·{' '}
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                draftItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
              )}
              )
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}
