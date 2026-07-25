import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supplierService } from '../services/supplier.service'
import type { CreateBatchInput, CreateProductInput } from '../types/supplier.types'

export function useSupplierProducts() {
  return useQuery({
    queryKey: ['supplier', 'products'],
    queryFn: supplierService.getProducts,
  })
}

export function useSupplierInventory() {
  return useQuery({
    queryKey: ['supplier', 'inventory'],
    queryFn: supplierService.getInventory,
  })
}

export function useSupplierBatches() {
  return useQuery({
    queryKey: ['supplier', 'batches'],
    queryFn: supplierService.getBatches,
  })
}

export function useSupplierSupplyRequests() {
  return useQuery({
    queryKey: ['supplier', 'supply-requests'],
    queryFn: supplierService.getSupplyRequests,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProductInput) => supplierService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', 'products'] })
      queryClient.invalidateQueries({ queryKey: ['supplier', 'inventory'] })
    },
  })
}

export function useCreateBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateBatchInput) => supplierService.createBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', 'batches'] })
      queryClient.invalidateQueries({ queryKey: ['supplier', 'inventory'] })
    },
  })
}

export function useConfirmSupplyRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestId: string) => supplierService.confirmSupplyRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', 'supply-requests'] })
      queryClient.invalidateQueries({ queryKey: ['supplier', 'inventory'] })
    },
  })
}

export function useRejectSupplyRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ requestId, reason }: { requestId: string; reason: string }) =>
      supplierService.rejectSupplyRequest(requestId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', 'supply-requests'] })
    },
  })
}
