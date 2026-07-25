import { ResetPasswordPage } from '@/features/auth/pages'

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams
  return <ResetPasswordPage token={token ?? null} />
}
