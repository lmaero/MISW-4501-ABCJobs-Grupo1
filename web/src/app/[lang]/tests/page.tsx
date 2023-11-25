'use client'

import { useJWT } from '@/hooks/useToken'
import { CANDIDATE_HOST } from '@/lib/api'
import {
  ArrowUpOnSquareIcon,
  CalendarDaysIcon,
} from '@heroicons/react/20/solid'
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
  test_id: number
  candidate: string
  candidateid: number
  test_type: string
  test_name: string
  result: string
  score: number
}

export default function TestsResultsPage({ params }: Props) {
  const t = useTranslations('TestsResultsPage')
  const payload = useJWT()
  const [results, setResults] = useState([])
  const [order, setOrder] = useState<string>('high')

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${CANDIDATE_HOST}/candidate/tests`)
      const data = await response.json()

      console.log(data)

      if (!data.results) setResults([])
      else setResults(data.results)
    }

    void getData()
  }, [])

  if (results.length === 0)
    return (
      <div className='mx-auto max-w-7xl space-y-3 p-7'>
        <p className='font-semibold'>{t('notCreated')}</p>
        <Link
          className='relative inline-flex max-w-fit items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          href='/tests/create'
        >
          {t('createTest')}
        </Link>
      </div>
    )

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6'>
        <header>
          <div className='mb-3 flex justify-between'>
            <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
              {t('title')}
            </h2>

            <Link
              className='relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              href='/tests/create'
            >
              {t('createTest')}
            </Link>
          </div>
          <div className='space-y-2'>
            <p>Sort by</p>
            <select
              className='w-full rounded-lg'
              onChange={(event) => setOrder(event.target.value)}
            >
              <option value='high'>High performant</option>
              <option value='less'>Less performant</option>
            </select>
          </div>
        </header>
        <hr className='border-b-1' />
        <section className='space-y-3'>
          {results
            .sort((a: Result, b: Result) => {
              if (order === 'high') {
                return b.score - a.score
              } else {
                return a.score - b.score
              }
            })
            .map((result: Result) => (
              <article
                key={v4()}
                className='grid grid-cols-2 rounded-md border-2 border-gray-50 p-5 capitalize'
              >
                <div className='space-y-2'>
                  <h3 className='font-bold'>{result.candidate}</h3>
                  <p className='text-sm text-gray-400'>{result.test_type}</p>
                  <Link
                    href={`/${params.lang}/interviews/schedule/${result.test_id}`}
                    className='flex items-center text-sm text-gray-500 transition-all hover:text-gray-900'
                  >
                    <CalendarDaysIcon className='mr-2 h-6' />
                    {t('schedule')}
                  </Link>

                  <Link
                    href={`/${params.lang}/interviews/publish/${result.candidateid}/${result.candidate}/${result.test_id}/${payload?.company_id}`}
                    className='flex items-center text-sm text-gray-500 transition-all hover:text-gray-900'
                  >
                    <ArrowUpOnSquareIcon className='mr-2 h-6' />
                    {t('publish')}
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
