import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jateri Demo',
  description: 'Community Dating App Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 m-0 p-0 overflow-hidden">{children}</body>
    </html>
  )
}
