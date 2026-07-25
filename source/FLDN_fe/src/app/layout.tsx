import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/query-provider'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'FLDN',
  description: 'FoodLink Distribution Network',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
