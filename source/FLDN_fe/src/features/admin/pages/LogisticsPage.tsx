'use client'

import { useState } from 'react'
import { LogisticsTable, LogisticsDetailSheet } from '../components/LogisticsPage'
import { useLogisticsQuery } from '../hooks/use-admin'
import type { LogisticsOperatorStatus } from '../types/admin.types'

const STATUS_OPTIONS: { label: string; value: LogisticsOperatorStatus | '' }[] = [
  { label: 'Tất cả trạng thái', value: '' },
  { label: 'Hoạt động',         value: 'Available' },
  { label: 'Đang giao',         value: 'InTransit' },
  { label: 'Không hoạt động',   value: 'Off' },
]

export function LogisticsPage() {
  const [status, setStatus]   = useState<LogisticsOperatorStatus | ''>('')
  const [page, setPage]       = useState(1)
  const [detailId, setDetailId] = useState<string | null>(null)

  const params = { page, pageSize: 10, ...(status ? { status } : {}) }
  const { data, isPending } = useLogisticsQuery(params)
  const result = data?.data

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Tài xế logistics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Quản lý kích hoạt / vô hiệu hóa tài xế</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value as LogisticsOperatorStatus | ''); setPage(1) }}
          className="h-9 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {result && (
          <span className="text-sm text-muted-foreground ml-auto">
            {result.totalCount} tài xế
          </span>
        )}
      </div>

      {isPending && <p className="text-sm text-muted-foreground py-8 text-center">Đang tải...</p>}

      {result && (
        <>
          <LogisticsTable operators={result.items} onViewDetail={setDetailId} />

          {result.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-sm rounded border hover:bg-muted disabled:opacity-50"
              >
                Trước
              </button>
              <span className="text-sm text-muted-foreground">
                Trang {page} / {result.totalPages}
              </span>
              <button
                disabled={page === result.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm rounded border hover:bg-muted disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}

      <LogisticsDetailSheet operatorId={detailId} onClose={() => setDetailId(null)} />
    </div>
  )
}
