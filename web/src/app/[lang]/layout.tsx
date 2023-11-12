import { LanguageSelector } from '@/app/[lang]/components/LanguageSelector'
import { Navbar } from '@/app/[lang]/components/Navbar'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ABC Jobs',
  description: 'Human resources for tech talent',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

interface RootLayoutProps {
  children: ReactNode
  params: { lang: string }
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  let dictionary
  try {
    dictionary = (await import(`@/dictionaries/${params.lang}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={params.lang}>
      <head>
        <title>ABC Jobs</title>
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.lang} messages={dictionary}>
          <main className='relative h-screen'>
            <LanguageSelector />
            <Navbar params={params} />
            {children}
            <ToastContainer position='bottom-right' />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
