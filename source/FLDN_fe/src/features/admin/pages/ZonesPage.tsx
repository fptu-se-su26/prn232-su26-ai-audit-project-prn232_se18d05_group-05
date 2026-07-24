'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ZonesTable, CreateZoneDialog, EditZoneDialog } from '../components/ZonesPage'
import { useZonesQuery } from '../hooks/use-admin'
import type { DistributionZoneResponse } from '../types/admin.types'

export function ZonesPage() {
  const [creating, setCreating] = useState(false)
  const [editing, setEditing]   = useState<DistributionZoneResponse | null>(null)

  const { data, isPending } = useZonesQuery()
  const zones = data?.data ?? []

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Vùng giao hàng</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Quản lý phí vận chuyển theo khu vực</p>
        </div>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="size-4 mr-1.5" />
          Tạo vùng
        </Button>
      </div>

      {isPending && <p className="text-sm text-muted-foreground py-8 text-center">Đang tải...</p>}

      {!isPending && zones.length === 0 && (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-muted-foreground text-sm">Chưa có vùng giao hàng nào</p>
          <Button size="sm" variant="outline" className="mt-3" onClick={() => setCreating(true)}>
            <Plus className="size-4 mr-1.5" />
            Tạo vùng đầu tiên
          </Button>
        </div>
      )}

      {zones.length > 0 && (
        <ZonesTable zones={zones} onEdit={setEditing} />
      )}

      <CreateZoneDialog open={creating} onClose={() => setCreating(false)} />
      <EditZoneDialog zone={editing} onClose={() => setEditing(null)} />
    </div>
  )
}
