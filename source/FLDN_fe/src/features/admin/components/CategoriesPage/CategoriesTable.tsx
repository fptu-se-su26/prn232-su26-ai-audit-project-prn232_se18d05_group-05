'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteCategoryMutation } from '../../hooks/use-admin'
import type { CategoryResponse } from '../../types/admin.types'

interface CategoriesTableProps {
  readonly categories: CategoryResponse[]
  readonly onEdit: (category: CategoryResponse) => void
}

export function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {
  const deleteMutation = useDeleteCategoryMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleDelete(id: string) {
    setPendingId(id)
    deleteMutation.mutate(id, { onSettled: () => setPendingId(null) })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên danh mục</TableHead>
          <TableHead>Danh mục cha</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="w-[100px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.categoryId}>
            <TableCell className="font-medium">{cat.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {cat.parentCategoryId ?? '—'}
            </TableCell>
            <TableCell>
              <Badge variant={cat.isActive ? 'default' : 'secondary'}>
                {cat.isActive ? 'Hiển thị' : 'Ẩn'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onEdit(cat)}
                  aria-label="Chỉnh sửa"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={pendingId === cat.categoryId}
                  onClick={() => handleDelete(cat.categoryId)}
                  aria-label="Ẩn danh mục"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
