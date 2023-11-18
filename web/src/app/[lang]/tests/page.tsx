'use client'

import { CANDIDATE_HOST } from '@/lib/api'
import { CalendarDaysIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

interface Props {
  params: {
    lang: string
  }
}

interface Result {
  id: number
  candidate: string
  test_type: string
  test_name: string
  result: string
  score: number
}

export default function TestsResultsPage({ params }: Props) {
  const t = useTranslations('TestsResultsPage')
  const [results, setResults] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${CANDIDATE_HOST}/candidate/tests`)
      const data = await response.json()

      if (!data.results) setResults([])
      else setResults(data.results)
    }
    void getData()
  }, [])

  if (results.length === 0)
    return (
      <div className='mx-auto max-w-7xl p-7 space-y-3'>
        <p className='font-semibold'>{t('notCreated')}</p>
        <Link
          className='relative max-w-fit inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          href='/tests/create'
        >
          {t('createTest')}
        </Link>
      </div>
    )

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6'>
        <header className='flex justify-between'>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            {t('title')}
          </h2>

          <Link
            className='relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            href='/tests/create'
          >
            {t('createTest')}
          </Link>
        </header>
        <hr className='border-b-1' />
        <section className='space-y-3'>
          {results.map((result: Result) => (
            <article
              key={v4()}
              className='grid capitalize grid-cols-2 rounded-md border-2 border-gray-50 p-5'
            >
              <div className='space-y-2'>
                <h3 className='font-bold'>{result.candidate}</h3>
                <p className='text-sm text-gray-400'>{result.test_type}</p>
                <Link
                  href={`/${params.lang}/interviews/schedule/${result.id}`}
                  className='flex items-center text-sm text-gray-500 hover:text-gray-900 transition-all'
                >
                  <CalendarDaysIcon className='h-6 mr-2' />
                  Schedule Interview
                </Link>
              </div>
              <div className='space-y-0.5 justify-self-end text-right'>
                <p className='font-medium'>{result.test_name}</p>
                <p className='text-sm text-gray-400'>{result.result}</p>
                <p>{result.score}%</p>
              </div>
            </article>
          ))}
        </section>
      </form>
    </div>
  )
}
