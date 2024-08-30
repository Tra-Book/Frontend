import './globals.css'

import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { cn } from '@/lib/utils/cn'
import { mada, mcLaren, pretendard } from '@/public/fonts/font'

export const metadata: Metadata = {
  title: 'TraBook',
  description: 'Travel and Plan with TraBook',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko'>
      <body className={cn(pretendard.className, mcLaren.className, mada.className)}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
