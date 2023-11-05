'use client'

import Logo from '@/components/Logo'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    lang: string
  }
}

export default function Home({ params }: Props) {
  const t = useTranslations('Home')
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      router.push(`/${params.lang}/dashboard`)
    } else router.push(`/${params.lang}/login`)
  }, [params.lang, router])

  return (
    <main className='flex h-full flex-col items-center justify-center space-y-6'>
      <Logo className='h-20' />
      <h1 className='text-6xl font-bold'>{t('title')}</h1>
      <p>{t('localizationText')}</p>
    </main>
  )
}
