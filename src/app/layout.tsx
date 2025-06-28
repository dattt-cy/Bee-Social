'use client'
import './verify/globals.css'
import '@/styles/typing.css'
import { Poppins } from 'next/font/google'
import * as React from 'react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/context/AuthContext'
import { SnackbarContextProvider } from '@/context/snackbarContext'
import ThemeProvider from '@/theme'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export default function RootLayout({ children, session }: { children: React.ReactNode; session?: any }) {
  return (
    <html lang='en'>
      <Head>
        <title>Beegin</title>
        <meta name='description' content='Login & Register Demo' />
      </Head>
      <body className={poppins.variable}>
        <AuthProvider>
          <SessionProvider session={session}>
            <SnackbarContextProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </SnackbarContextProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
