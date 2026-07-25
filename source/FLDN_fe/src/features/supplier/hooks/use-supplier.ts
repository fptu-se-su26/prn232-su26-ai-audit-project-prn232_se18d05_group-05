import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supplierService } from '../services/supplier.service'
import type { CreateBatchInput, CreateProductInput, UpdateProductInput } from '../types/supplier.types'

export const SUPPLIER_KEYS = {
  all: ['supplier'] as const,
  categories: () => [...SUPPLIER_KEYS.all, 'categories'] as const,
  products: () => [...SUPPLIER_KEYS.all, 'products'] as const,
  inventory: () => [...SUPPLIER_KEYS.all, 'inventory'] as const,
  batches: () => [...SUPPLIER_KEYS.all, 'batches'] as const,
  supplyRequests: () => [...SUPPLIER_KEYS.all, 'supply-requests'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: SUPPLIER_KEYS.categories(),
    queryFn: supplierService.getCategories,
  })
}

export function useSupplierProducts() {
  return useQuery({
    queryKey: SUPPLIER_KEYS.products(),
    queryFn: supplierService.getProducts,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductInput) => supplierService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) =>
      supplierService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => supplierService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
    },
  })
}

export function useSupplierInventory() {
  return useQuery({
    queryKey: SUPPLIER_KEYS.inventory(),
    queryFn: supplierService.getInventory,
  })
}

export function useUpdateInventory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      supplierService.updateInventory(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
    },
  })
}

export function useSupplierBatches() {
  return useQuery({
    queryKey: SUPPLIER_KEYS.batches(),
    queryFn: supplierService.getBatches,
  })
}

export function useCreateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBatchInput) => supplierService.createBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.batches() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
    },
  })
}

export function useSupplierSupplyRequests() {
  return useQuery({
    queryKey: SUPPLIER_KEYS.supplyRequests(),
    queryFn: supplierService.getSupplyRequests,
  })
}

export function useConfirmSupplyRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: string) => supplierService.confirmSupplyRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.supplyRequests() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.inventory() })
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.products() })
    },
  })
}

export function useRejectSupplyRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ requestId, reason }: { requestId: string; reason: string }) =>
      supplierService.rejectSupplyRequest(requestId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.supplyRequests() })
    },
  })
}
