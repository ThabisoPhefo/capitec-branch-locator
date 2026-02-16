import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Capitec Branch Locator',
  description: 'Find your nearest Capitec Bank branch with hours, services, and directions.',
  icons: {
    icon: '/capiteclogo-preview.png',
    apple: '/capiteclogo-preview.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
