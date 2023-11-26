'use client'

import { CANDIDATE_HOST } from '@/lib/api'
import { ChartBarSquareIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

interface Props {
  params: {
    lang: string
  }
}

interface Interview {
  interview_id: number
  company_name: string
  interviewType: string
  schedule: string
  result: boolean
}

export default function Page({ params }: Props) {
  const t = useTranslations('InterviewsPage')
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${CANDIDATE_HOST}/candidate/interviews`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()

      console.dir(data)

      if (!data.interviews) setInterviews([])
      else setInterviews(data.interviews)
    }

    void getData()
  }, [])

  if (interviews.length === 0)
    return (
      <div className='mx-auto max-w-7xl space-y-3 p-7'>
        <p className='font-semibold'>{t('notScheduled')}</p>
      </div>
    )

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6'>
        <header className='flex justify-between'>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            {t('title')}
          </h2>
        </header>

        <hr className='border-b-1' />

        <section className='space-y-3'>
          {interviews.map((interview: Interview) => {
            return (
              <article
                key={v4()}
                className={classNames({
                  'grid grid-cols-2 rounded-md border-2 border-gray-50 p-5 capitalize': true,
                })}
              >
                <div className='space-y-2'>
                  <h3 className='font-bold'>{interview.company_name}</h3>
                  {interview.result && (
                    <p className='text-sm'>{t('isFinished')}</p>
                  )}
                  <Link
                    data-cy='results'
                    href={`/${params.lang}/interviews/results/${interview.interview_id}`}
                    className={classNames({
                      'flex items-center text-sm text-gray-500 transition-all hover:text-gray-900': true,
                    })}
                  >
                    <ChartBarSquareIcon className='mr-2 h-6' />
                    {t('seeResults')}
                  </Link>
                </div>
                <div
                  className={classNames({
                    'text-gray-200 line-through': interview.result,
                    'space-y-0.5 justify-self-end text-right': true,
                  })}
                >
                  <p className='font-medium'>{interview.interviewType}</p>
                  <p className='text-sm text-gray-400'>
                    {interview.schedule.split('T')[0]}
                  </p>
                  <p>{interview.schedule.split('T')[1].split('.')[0]}</p>
                </div>
              </article>
            )
          })}
        </section>
      </form>
    </div>
  )
}
