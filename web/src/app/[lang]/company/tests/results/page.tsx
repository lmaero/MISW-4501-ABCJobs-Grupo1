'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect } from 'react'
import axios from 'axios'
import { CANDIDATE_HOST } from '@/lib/api'

const testResults = [
  {
    id: 1,
    candidate: 'John Smith',
    testType: 'Technical Test',
    testName: 'React',
    result: 'Satisfactory',
    score: 80,
  },
  {
    id: 2,
    candidate: 'Alice Johnson',
    testType: 'Psychological Test',
    testName: 'Personality Assessment',
    result: 'Above Average',
    score: 60,
  },
  {
    id: 3,
    candidate: 'Michael Brown',
    testType: 'Technical Test',
    testName: 'JavaScript',
    result: 'Excellent',
    score: 95,
  },
  {
    id: 4,
    candidate: 'Emily Davis',
    testType: 'Psychological Test',
    testName: 'Emotional Intelligence',
    result: 'Average',
    score: 50,
  },
  {
    id: 5,
    candidate: 'Daniel Wilson',
    testType: 'Technical Test',
    testName: 'Python',
    result: 'Satisfactory',
    score: 70,
  },
  {
    id: 6,
    candidate: 'Sophia Lee',
    testType: 'Psychological Test',
    testName: 'Stress Management',
    result: 'Highly Effective',
    score: 100,
  },
]

interface Props {
  params: {
    lang: string
  }
}

export default function TestsResultsPage({ params }: Props) {
  const t = useTranslations('TestsResultsPage')

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`${CANDIDATE_HOST}/candidate/test`)
      console.log(response.data.results)
    }
    getData()
  }, [])

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
          {testResults.map((result) => (
            <>
              <article
                key={result.id}
                className='grid cursor-pointer grid-cols-2 rounded-md border-2 border-gray-50 p-5 hover:bg-gray-100'
              >
                <div className='space-y-2'>
                  <h3 className='font-bold'>{result.candidate}</h3>
                  <p className='text-sm text-gray-400'>{result.testType}</p>
                </div>
                <div className='space-y-0.5 justify-self-end text-right'>
                  <p className='font-medium'>{result.testName}</p>
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
