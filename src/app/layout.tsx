'use client'

import '@/app/verify/globals.css'
import '@/styles/typing.css'
import { Poppins } from 'next/font/google'
import ThemeProvider from '../theme'
import * as React from 'react'
import Layout from '@/layouts'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { Snackbar } from '@mui/material'
import { SnackbarContextProvider } from '@/context/snackbarContext'
import { PostProvider } from '@/context/PostContext'
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ArticleIcon from '@mui/icons-material/Article'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import SummarizeIcon from '@mui/icons-material/Summarize'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined'
import TanstackProvider from '@/providers/TanstackProvider'
import { FaHouseChimney, FaRegUser, FaUser, FaCircleUser, FaRegCircleUser } from 'react-icons/fa6'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export default function RootLayout({ children, session }: { children: React.ReactNode; session: any }) {
  const pathname = usePathname()
  const [role, setRole] = useState<string>('user')
  const noLayoutPaths = ['/login', '/register', '/register/personal']

  useEffect(() => {
    const originalRemoveChild = Element.prototype.removeChild

    Element.prototype.removeChild = function <T extends Node>(child: T): T {
      // chỉ gọi removeChild khi child thật sự là con của this
      if (this.contains(child)) {
        return originalRemoveChild.call(this, child) as T
      } else {
        console.warn('[removeChild guard] skipping removal of non-child node:', child)
        return child
      }
    }

    return () => {
      // restore lại nguyên bản khi unmount
      Element.prototype.removeChild = originalRemoveChild
    }
  }, [])

  const menuItems = [
    { icon: <AiOutlineHome />, iconActive: <AiFillHome />, label: 'Home', path: '/home' },
    { icon: <FaRegCircleUser />, iconActive: <FaCircleUser />, label: 'Profile', path: '/profile' }
  ]

  return (
    <html lang='en'>
      <head>
        {/* Metadata */}
        <title>Beegin</title>
        <meta name='description' content='A new next generation social media application! Where your stories beegin.' />

        {/* Favicon - Đảm bảo đường dẫn đúng */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Beegin' />
        <meta
          property='og:description'
          content='A new next generation social media application! Where your stories beegin.'
        />
      </head>
      <body className={poppins.variable}>
        <AuthProvider>
          <TanstackProvider>
            <SnackbarContextProvider>
              <SessionProvider session={session}>
                <PostProvider>
                  {noLayoutPaths.includes(pathname) || pathname.startsWith('/verify') ? (
                    <ThemeProvider>{children}</ThemeProvider>
                  ) : (
                    <ThemeProvider>{<Layout menuItems={menuItems}>{children}</Layout>}</ThemeProvider>
                  )}
                </PostProvider>
              </SessionProvider>
            </SnackbarContextProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
