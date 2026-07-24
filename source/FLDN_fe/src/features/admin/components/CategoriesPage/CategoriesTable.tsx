'use client'

import { useState } from 'react'
import { Pencil, Trash2, ChevronRight, ChevronDown, Image as ImageIcon, FolderOpen, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useDeleteCategoryMutation } from '../../hooks/use-admin'
import type { CategoryResponse } from '../../types/admin.types'

interface CategoriesTableProps {
  readonly categories: CategoryResponse[]
  readonly onEdit: (category: CategoryResponse) => void
}

interface CategoryRowProps {
  category: CategoryResponse
  depth: number
  onEdit: (category: CategoryResponse) => void
  onDelete: (id: string) => void
  pendingId: string | null
}

function CategoryRow({ category, depth, onEdit, onDelete, pendingId }: CategoryRowProps) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = category.children.length > 0

  return (
    <>
      <TableRow className={cn('hover:bg-muted/30 transition-colors', depth > 0 && 'bg-muted/10')}>
        {/* Name + description */}
        <TableCell className="py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: depth * 20 }}>
            {/* Expand toggle */}
            {hasChildren ? (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={expanded ? 'Thu gọn' : 'Mở rộng'}
              >
                {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              </button>
            ) : (
              <span className="size-3.5 shrink-0" />
            )}

            {/* Thumbnail */}
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="size-8 rounded object-cover shrink-0 border"
              />
            ) : (
              <div className="size-8 rounded bg-muted flex items-center justify-center shrink-0">
                {hasChildren
                  ? <FolderOpen className="size-3.5 text-muted-foreground" />
                  : <Folder className="size-3.5 text-muted-foreground" />
                }
              </div>
            )}

            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">{category.name}</p>
              {category.description && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{category.description}</p>
              )}
            </div>
          </div>
        </TableCell>

        {/* Children count */}
        <TableCell className="py-3 text-sm text-muted-foreground">
          {hasChildren ? (
            <span className="inline-flex items-center gap-1">
              <span className="font-medium text-foreground">{category.children.length}</span> danh mục con
            </span>
          ) : (
            <span className="text-xs">—</span>
          )}
        </TableCell>

        {/* Status */}
        <TableCell className="py-3">
          <span className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            category.isActive
              ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
              : 'bg-muted text-muted-foreground ring-1 ring-border',
          )}>
            {category.isActive ? 'Hiển thị' : 'Ẩn'}
          </span>
        </TableCell>

        {/* Actions */}
        <TableCell className="py-3 w-[90px]">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(category)}
              aria-label="Chỉnh sửa"
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={pendingId === category.categoryId}
              onClick={() => onDelete(category.categoryId)}
              aria-label="Ẩn danh mục"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Children rows */}
      {hasChildren && expanded && category.children.map((child) => (
        <CategoryRow
          key={child.categoryId}
          category={child}
          depth={depth + 1}
          onEdit={onEdit}
          onDelete={onDelete}
          pendingId={pendingId}
        />
      ))}
    </>
  )
}

export function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {
  const deleteMutation = useDeleteCategoryMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleDelete(id: string) {
    setPendingId(id)
    deleteMutation.mutate(id, { onSettled: () => setPendingId(null) })
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="py-3 font-semibold">Tên danh mục</TableHead>
            <TableHead className="py-3 font-semibold">Danh mục con</TableHead>
            <TableHead className="py-3 font-semibold">Trạng thái</TableHead>
            <TableHead className="py-3 w-[90px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <CategoryRow
              key={cat.categoryId}
              category={cat}
              depth={0}
              onEdit={onEdit}
              onDelete={handleDelete}
              pendingId={pendingId}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
