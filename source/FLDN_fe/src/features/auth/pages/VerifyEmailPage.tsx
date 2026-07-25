'use client'

import { useEffect, useState } from 'react'
import { useVerifyEmailMutation } from '../hooks/use-auth'
import { VerifyEmailStatus } from '../components/VerifyEmailPage'

interface VerifyEmailPageProps {
  readonly token: string | null
}

export function VerifyEmailPage({ token }: VerifyEmailPageProps) {
  const verifyMutation = useVerifyEmailMutation()
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'missing-token'>(
    token ? 'loading' : 'missing-token',
  )

  useEffect(() => {
    if (!token) return

    verifyMutation.mutate(token, {
      onSuccess: () => setStatus('success'),
      onError: () => setStatus('error'),
    })
    // ponytail: run once on mount — token from URL never changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <VerifyEmailStatus status={status} />
}
