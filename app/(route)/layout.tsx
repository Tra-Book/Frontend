import './globals.css'

import type { Metadata } from 'next'

import { pretendard } from '@/public/fonts/font'

export const metadata: Metadata = {
  title: 'TraBook',
  description: 'Travel and Plan with TraBook',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>{children}</body>
    </html>
  )
}
