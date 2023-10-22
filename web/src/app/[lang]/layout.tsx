import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
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
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.lang} messages={dictionary}>
          <main className='h-screen'>
            <Navbar />
            {children}
            <ToastContainer position='bottom-right' />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
