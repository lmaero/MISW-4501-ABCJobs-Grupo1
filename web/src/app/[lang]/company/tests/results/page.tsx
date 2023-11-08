'use client'

import { CANDIDATE_HOST } from '@/lib/api'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
      console.log(data.results)
      setResults(data.results)
    }
    void getData()
  }, [])

  if (results.length === 0)
    return (
      <p className='font-semibold mx-auto max-w-7xl p-7'>{t('notCreated')}</p>
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
            href='/company/tests/create'
          >
            {t('createTest')}
          </Link>
        </header>
        <hr className='border-b-1' />
        <section className='space-y-3'>
          {results.map((result: Result) => (
            <>
              <article
                key={result.id}
                className='grid capitalize cursor-pointer grid-cols-2 rounded-md border-2 border-gray-50 p-5 hover:bg-gray-100'
              >
                <div className='space-y-2'>
                  <h3 className='font-bold'>{result.candidate}</h3>
                  <p className='text-sm text-gray-400'>{result.test_type}</p>
                </div>
                <div className='space-y-0.5 justify-self-end text-right'>
                  <p className='font-medium'>{result.test_name}</p>
                  <p className='text-sm text-gray-400'>{result.result}</p>
                  <p>{result.score}%</p>
                </div>
              </article>
            </>
          ))}
        </section>
      </form>
    </div>
  )
}
