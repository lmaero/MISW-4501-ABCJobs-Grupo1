'use client'

import Logo from '@/app/[lang]/components/Logo'
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Props {
  params: { lang: string }
}

export default function RegisterPage({ params }: Props) {
  const t = useTranslations('RegisterPage')

  return (
    <main className='flex h-full flex-col items-center justify-center space-y-6 bg-gray-100'>
      <Logo className='h-10' />
      <h1 className='text-3xl font-bold'>{t('title')}</h1>
      <Link
        className='text-right text-sm block mt-5 text-blue-600'
        href='/login'
      >
        {t('loginHere')}
      </Link>

      <div className='flex space-x-5'>
        <Link
          className='rounded-xl bg-white p-10 shadow-xl transition-all hover:scale-105 hover:bg-gray-100'
          href={`/${params.lang}/candidate/register`}
        >
          <UserIcon className='text-zinc-300' />
          <h2>{t('candidate')}</h2>
        </Link>
        <Link
          className='rounded-xl bg-white p-10 shadow-xl transition-all hover:scale-105 hover:bg-gray-100'
          href={`/${params.lang}/company/register`}
        >
          <BuildingOfficeIcon className='text-zinc-300' />
          <h2>{t('company')}</h2>
        </Link>
      </div>
    </main>
  )
}
