'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useUpdateCategoryMutation } from '../../hooks/use-admin'
import type { CategoryResponse } from '../../types/admin.types'

const schema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface EditCategoryDialogProps {
  readonly category: CategoryResponse | null
  readonly onClose: () => void
}

export function EditCategoryDialog({ category, onClose }: EditCategoryDialogProps) {
  const updateMutation = useUpdateCategoryMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '', imageUrl: '', isActive: true },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description ?? '',
        imageUrl: category.imageUrl ?? '',
        isActive: category.isActive,
      })
    }
  }, [category, form])

  async function handleSubmit(values: FormValues) {
    if (!category) return
    updateMutation.mutate(
      { id: category.categoryId, body: values },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog open={Boolean(category)} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Tên danh mục <span className="text-destructive">*</span></Label>
            <Input id="name" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Mô tả</Label>
            <Input id="description" {...form.register('description')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="imageUrl">URL hình ảnh</Label>
            <Input id="imageUrl" {...form.register('imageUrl')} />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isActive"
              checked={form.watch('isActive')}
              onCheckedChange={(val) => form.setValue('isActive', val)}
            />
            <Label htmlFor="isActive">Hiển thị danh mục</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
