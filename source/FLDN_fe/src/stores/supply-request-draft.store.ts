import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SupplyRequestItem } from '@/types/order'

interface SupplyRequestDraftState {
  items: SupplyRequestItem[]
  addItem: (item: SupplyRequestItem) => void
  removeItem: (productId: string) => void
  clear: () => void
}

/**
 * Draft các sản phẩm DP đã chọn từ trang tìm kiếm, chờ đưa vào yêu cầu cung ứng.
 * Persist qua localStorage để không mất khi điều hướng giữa /products và /orders/create.
 */
export const useSupplyRequestDraftStore = create<SupplyRequestDraftState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'supply-request-draft' }
  )
)
