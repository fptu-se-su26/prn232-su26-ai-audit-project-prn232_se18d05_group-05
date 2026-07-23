export interface Category {
  categoryId: string
  name: string
  description?: string
  imageUrl?: string
  parentCategoryId?: string | null
  isActive?: boolean
  children?: Category[]
}

export interface ProductImage {
  imageId: string
  imageUrl: string
  isMain: boolean
}

export interface Product {
  productId: string
  name: string
  description?: string
  retailPrice: number
  wholesalePrice?: number
  unit: string
  packagingStandard?: string
  isActive?: boolean
  supplierName?: string
  supplierId?: string
  mainImage?: string
  images?: ProductImage[]
  categoryName?: string
  categoryId?: string
  quantity?: number // stock
  averageRating?: number
  totalReviews?: number
  season?: string
  districtName?: string
}

export interface ProductSearchParams {
  keyword?: string
  categoryId?: string
  supplierId?: string
  minPrice?: number
  maxPrice?: number
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'name_asc'
  page?: number
  pageSize?: number
}

export interface ProductSearchResponse {
  items: Product[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
