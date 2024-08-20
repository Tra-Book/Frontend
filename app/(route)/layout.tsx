import './globals.css'

import type { Metadata } from 'next'

import { pretendard } from '@/public/fonts/font'

export const metadata: Metadata = {
  title: 'TraBook',
  description: 'Travel and Plan with TraBook',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={pretendard.className}>{children}</body>
    </html>
  )
}
