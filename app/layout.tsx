import './globals.css'

import '@mantine/core/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Developed by Amaru',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='auto'>{children}</MantineProvider>
      </body>
    </html>
  )
}
