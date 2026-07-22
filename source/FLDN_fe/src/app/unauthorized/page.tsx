'use client'

import Link from 'next/link'
import { ShieldOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/routes/app-routes'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <ShieldOff className="text-muted-foreground size-12" aria-hidden="true" />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Không có quyền truy cập</h1>
        <p className="text-muted-foreground text-sm">
          Tài khoản của bạn không có quyền vào trang này.
        </p>
      </div>
      <Button variant="outline" render={<Link href={APP_ROUTES.auth.login} />}>
        Quay lại đăng nhập
      </Button>
    </div>
  )
}
