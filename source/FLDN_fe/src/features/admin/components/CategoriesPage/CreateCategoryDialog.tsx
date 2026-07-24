'use client'

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
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { useCreateCategoryMutation } from '../../hooks/use-admin'
import type { CategoryResponse } from '../../types/admin.types'

const schema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  parentCategoryId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface CreateCategoryDialogProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly categories: CategoryResponse[]
}

export function CreateCategoryDialog({ open, onClose, categories }: CreateCategoryDialogProps) {
  const mutation = useCreateCategoryMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', parentCategoryId: '' },
  })

  function handleSubmit(values: FormValues) {
    mutation.mutate(
      { name: values.name, parentCategoryId: values.parentCategoryId || undefined },
      { onSuccess: () => { form.reset(); onClose() } },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) { form.reset(); onClose() }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Tạo danh mục mới</DialogTitle>
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
            <Label htmlFor="parentCategoryId">Danh mục cha</Label>
            <NativeSelect
              id="parentCategoryId"
              className="w-full"
              {...form.register('parentCategoryId')}
            >
              <NativeSelectOption value="">— Không có —</NativeSelectOption>
              {categories.map((cat) => (
                <NativeSelectOption key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang tạo...' : 'Tạo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
