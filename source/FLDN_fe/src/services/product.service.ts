import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { Category, Product, ProductSearchParams, ProductSearchResponse } from '@/types/product'

// Mock categories for fallback / demonstration
export const MOCK_CATEGORIES: Category[] = [
  { categoryId: 'c1111111-1111-1111-1111-111111111111', name: 'Rau củ tươi', description: 'Các loại rau củ hữu cơ tươi sạch' },
  { categoryId: 'c2222222-2222-2222-2222-222222222222', name: 'Trái cây Việt', description: 'Trái cây tươi ngon theo mùa' },
  { categoryId: 'c3333333-3333-3333-3333-333333333333', name: 'Thịt tươi & Trứng', description: 'Thịt heo, bò, gà đạt chuẩn ATVSTP' },
  { categoryId: 'c4444444-4444-4444-4444-444444444444', name: 'Hải sản tươi sống', description: 'Hải sản cá, tôm, mực đánh bắt hàng ngày' },
  { categoryId: 'c5555555-5555-5555-5555-555555555555', name: 'Gia vị & Khô', description: 'Gia vị truyền thống và thực phẩm khô' },
  { categoryId: 'c6666666-6666-6666-6666-666666666666', name: 'Đồ uống & Sữa', description: 'Sữa tươi, nước ép trái cây đóng chai' },
]

// Mock products for fallback / demonstration
export const MOCK_PRODUCTS: Product[] = [
  {
    productId: 'a0000000-0000-0000-0000-000000000001',
    name: 'Rau Cải Thìa Hữu Cơ Đà Lạt',
    description: 'Rau cải thìa trồng theo phương pháp hữu cơ tại Đà Lạt, lá xanh giòn, không hóa chất bảo quản. Đạt tiêu chuẩn VietGAP.',
    retailPrice: 25000,
    wholesalePrice: 18000,
    unit: 'Kg',
    packagingStandard: 'Túi 500g bọc màng thực phẩm',
    categoryId: 'c1111111-1111-1111-1111-111111111111',
    categoryName: 'Rau củ tươi',
    supplierName: 'Nông trại Xanh Đà Lạt',
    supplierId: 's1111111-1111-1111-1111-111111111111',
    mainImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    quantity: 120,
    averageRating: 4.8,
    totalReviews: 32,
    season: 'Quanh năm',
    districtName: 'Đà Lạt, Lâm Đồng',
  },
  {
    productId: 'a0000000-0000-0000-0000-000000000002',
    name: 'Cà Rốt Đà Lạt Tươi Loại 1',
    description: 'Cà rốt tươi đỏ củ chắc, vị ngọt thanh tự nhiên. Rất giàu Vitamin A và khoáng chất.',
    retailPrice: 32000,
    wholesalePrice: 24000,
    unit: 'Kg',
    packagingStandard: 'Túi lưới 1Kg',
    categoryId: 'c1111111-1111-1111-1111-111111111111',
    categoryName: 'Rau củ tươi',
    supplierName: 'Nông trại Xanh Đà Lạt',
    supplierId: 's1111111-1111-1111-1111-111111111111',
    mainImage: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&q=80&w=800',
    quantity: 85,
    averageRating: 4.6,
    totalReviews: 18,
    season: 'Mùa đông',
    districtName: 'Đà Lạt, Lâm Đồng',
  },
  {
    productId: 'a0000000-0000-0000-0000-000000000003',
    name: 'Xoài Cát Hòa Lộc Tiền Giang',
    description: 'Xoài cát Hòa Lộc đặc sản Tiền Giang, thịt dày, ngọt đậm đà, thơm lừng khi chín.',
    retailPrice: 85000,
    wholesalePrice: 65000,
    unit: 'Kg',
    packagingStandard: 'Thùng giấy 5Kg',
    categoryId: 'c2222222-2222-2222-2222-222222222222',
    categoryName: 'Trái cây Việt',
    supplierName: 'Hợp tác xã Nông sản Tiền Giang',
    supplierId: 's2222222-2222-2222-2222-222222222222',
    mainImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800',
    quantity: 50,
    averageRating: 4.9,
    totalReviews: 45,
    season: 'Mùa hè',
    districtName: 'Cái Bè, Tiền Giang',
  },
  {
    productId: 'a0000000-0000-0000-0000-000000000004',
    name: 'Dưa Hấu Không Hạt Long An',
    description: 'Dưa hấu vỏ mỏng, ruột đỏ mọng nước, ngọt mát thanh nhiệt ngày hè.',
    retailPrice: 28000,
    wholesalePrice: 20000,
    unit: 'Kg',
    packagingStandard: 'Trái từ 3-4kg',
    categoryId: 'c2222222-2222-2222-2222-222222222222',
    categoryName: 'Trái cây Việt',
    supplierName: 'Vườn Trái Cây Miền Tây',
    supplierId: 's3333333-3333-3333-3333-333333333333',
    mainImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    quantity: 200,
    averageRating: 4.7,
    totalReviews: 29,
    season: 'Quanh năm',
    districtName: 'Long An',
  },
  {
    productId: 'a0000000-0000-0000-0000-000000000005',
    name: 'Thịt Thăn Heo Thảo Mộc',
    description: 'Thịt thăn heo tươi ngon nuôi theo công nghệ thảo mộc, thịt mềm thơm ngọt tự nhiên không chất tăng trọng.',
    retailPrice: 145000,
    wholesalePrice: 120000,
    unit: 'Kg',
    packagingStandard: 'Khay hút chân không 500g',
    categoryId: 'c3333333-3333-3333-3333-333333333333',
    categoryName: 'Thịt tươi & Trứng',
    supplierName: 'Trang trại Heo Thảo Mộc Đồng Nai',
    supplierId: 's4444444-4444-4444-4444-444444444444',
    mainImage: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
    quantity: 40,
    averageRating: 4.9,
    totalReviews: 60,
    season: 'Quanh năm',
    districtName: 'Trảng Bom, Đồng Nai',
  },
  {
    productId: 'a0000000-0000-0000-0000-000000000006',
    name: 'Cá Thổ Kim Sa Phú Quốc',
    description: 'Cá tươi cấp đông nhanh ngay tại tàu đánh bắt Phú Quốc, giữ trọn độ tươi ngon nguyên bản.',
    retailPrice: 180000,
    wholesalePrice: 150000,
    unit: 'Kg',
    packagingStandard: 'Khay 1Kg đóng đông',
    categoryId: 'c4444444-4444-4444-4444-444444444444',
    categoryName: 'Hải sản tươi sống',
    supplierName: 'Hải Sản Biển Phú Quốc',
    supplierId: 's5555555-5555-5555-5555-555555555555',
    mainImage: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=800',
    quantity: 35,
    averageRating: 4.8,
    totalReviews: 22,
    season: 'Quanh năm',
    districtName: 'Phú Quốc, Kiên Giang',
  },
]

export const productService = {
  async getCategories(): Promise<Category[]> {
    try {
      const res = await api.get<Category[]>(API_ENDPOINTS.categories)
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data
      }
    } catch {
      // API fallback
    }
    return MOCK_CATEGORIES
  },

  async searchProducts(params: ProductSearchParams): Promise<ProductSearchResponse> {
    try {
      const res = await api.get(API_ENDPOINTS.products.search, { params })
      const data = res.data?.data ?? res.data
      if (Array.isArray(data)) {
        return {
          items: data,
          totalCount: data.length,
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 12,
          totalPages: 1,
        }
      }
      if (data?.items) {
        return data as ProductSearchResponse
      }
    } catch {
      // Backend offline or endpoint fallback
    }

    let filtered = [...MOCK_PRODUCTS]

    if (params.keyword && params.keyword.trim().length > 0) {
      const kw = params.keyword.toLowerCase().trim()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.description?.toLowerCase().includes(kw) ||
          p.categoryName?.toLowerCase().includes(kw) ||
          p.supplierName?.toLowerCase().includes(kw)
      )
    }

    if (params.categoryId && params.categoryId !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === params.categoryId)
    }

    if (typeof params.minPrice === 'number' && !isNaN(params.minPrice)) {
      filtered = filtered.filter((p) => p.retailPrice >= params.minPrice!)
    }

    if (typeof params.maxPrice === 'number' && !isNaN(params.maxPrice)) {
      filtered = filtered.filter((p) => p.retailPrice <= params.maxPrice!)
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filtered.sort((a, b) => a.retailPrice - b.retailPrice)
          break
        case 'price_desc':
          filtered.sort((a, b) => b.retailPrice - a.retailPrice)
          break
        case 'name_asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
          break
        case 'newest':
        default:
          break
      }
    }

    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 12
    const startIndex = (page - 1) * pageSize
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize)

    return {
      items: paginatedItems,
      totalCount: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize) || 1,
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await api.get(API_ENDPOINTS.products.detail(id))
      return res.data?.data ?? res.data
    } catch {
      const found = MOCK_PRODUCTS.find((p) => p.productId === id)
      return found || null
    }
  },
}
