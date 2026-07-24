'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCategoriesQuery } from '../hooks/use-admin'
import { CategoriesTable, EditCategoryDialog, CreateCategoryDialog } from '../components/CategoriesPage'
import { Button } from '@/components/ui/button'
import type { CategoryResponse } from '../types/admin.types'

export function CategoriesPage() {
  const { data, isPending, isError } = useCategoriesQuery()
  const [editing, setEditing] = useState<CategoryResponse | null>(null)
  const [creating, setCreating] = useState(false)

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh mục.</p>

  const categories = data?.data ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Quản lý danh mục</h1>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="size-4" />
          Tạo danh mục
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có danh mục nào.</p>
      ) : (
        <CategoriesTable categories={categories} onEdit={setEditing} />
      )}

      <EditCategoryDialog category={editing} onClose={() => setEditing(null)} />
      <CreateCategoryDialog
        open={creating}
        onClose={() => setCreating(false)}
        categories={categories}
      />
    </div>
  )
}
