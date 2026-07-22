'use client'

import { useState } from 'react'
import { Lock, Unlock } from 'lucide-react'
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
import { useLockUserMutation, useUnlockUserMutation } from '../../hooks/use-admin'
import type { UserResponse } from '../../types/admin.types'

interface UsersTableProps {
  readonly users: UserResponse[]
}

export function UsersTable({ users }: UsersTableProps) {
  const lockMutation = useLockUserMutation()
  const unlockMutation = useUnlockUserMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleToggle(user: UserResponse) {
    setPendingId(user.userId)
    const mutation = user.isActive ? lockMutation : unlockMutation
    mutation.mutate(user.userId, { onSettled: () => setPendingId(null) })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Họ tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>Vai trò</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="w-[80px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="font-medium">{user.fullName}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.role ?? '—'}</TableCell>
            <TableCell>
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Hoạt động' : 'Đã khóa'}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={pendingId === user.userId}
                onClick={() => handleToggle(user)}
                aria-label={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
              >
                {user.isActive ? (
                  <Lock className="size-4 text-destructive" />
                ) : (
                  <Unlock className="size-4 text-green-600" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
