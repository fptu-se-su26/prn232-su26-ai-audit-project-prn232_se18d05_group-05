'use client'

import { useState } from 'react'
import { useCategoriesQuery } from '../hooks/use-admin'
import { CategoriesTable, EditCategoryDialog } from '../components/CategoriesPage'
import type { CategoryResponse } from '../types/admin.types'

export function CategoriesPage() {
  const { data, isPending, isError } = useCategoriesQuery()
  const [editing, setEditing] = useState<CategoryResponse | null>(null)

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh mục.</p>

  const categories = data?.data ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quản lý danh mục</h1>
      {categories.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có danh mục nào.</p>
      ) : (
        <CategoriesTable categories={categories} onEdit={setEditing} />
      )}
      <EditCategoryDialog category={editing} onClose={() => setEditing(null)} />
    </div>
  )
}
