import './globals.css'

import '@mantine/core/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Provider from './context/auth_provider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Developed by Amaru',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme='auto'/>
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='auto'>
          <Provider session={session}>
          {children}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  )
}
