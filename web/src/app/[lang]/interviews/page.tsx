'use client'

import { CANDIDATE_HOST } from '@/lib/api'
import { ChartBarSquareIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

<<<<<<< HEAD
const fakeData = [
  {
    id: 1,
    company: 'Google',
    interviewType: 'Virtual',
    date: '2023-11-11T10:00:00',
    isFinished: false,
  },
  {
    id: 2,
    company: 'Microsoft',
    interviewType: 'Onsite',
    date: '2023-11-14T13:00:00',
    isFinished: false,
  },
  {
    id: 3,
    company: 'Amazon',
    interviewType: 'Virtual',
    date: '2023-11-16T11:00:00',
    isFinished: true,
  },
  {
    id: 4,
    company: 'Facebook',
    interviewType: 'Virtual',
    date: '2023-11-18T14:00:00',
    isFinished: false,
  },
  {
    id: 5,
    company: 'Apple',
    interviewType: 'Onsite',
    date: '2023-11-21T09:00:00',
    isFinished: true,
  },
]

=======
>>>>>>> ABC-55
interface Props {
  params: {
    lang: string
  }
}

interface Interview {
  id: number
<<<<<<< HEAD
  company: string
  interviewType: string
  date: string
  isFinished: boolean
=======
  company_name: string
  interviewType: string
  schedule: string
  result: boolean
>>>>>>> ABC-55
}

export default function Page({ params }: Props) {
  const t = useTranslations('InterviewsPage')
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    async function getData() {
<<<<<<< HEAD
      const response = await fetch(`${CANDIDATE_HOST}/interviews`, {
=======
      const response = await fetch(`${CANDIDATE_HOST}/candidate/interviews`, {
>>>>>>> ABC-55
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()

<<<<<<< HEAD
      if (!data.results) setInterviews([])
      else setInterviews(data.results)
=======
      if (!data.interviews) setInterviews([])
      else setInterviews(data.interviews)
>>>>>>> ABC-55
    }
    void getData()
  }, [])

<<<<<<< HEAD
  if (fakeData.length === 0)
=======
  if (interviews.length === 0)
>>>>>>> ABC-55
    return (
      <div className='mx-auto max-w-7xl p-7 space-y-3'>
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
<<<<<<< HEAD
          {fakeData.map((interview: Interview) => {
=======
          {interviews.map((interview: Interview) => {
>>>>>>> ABC-55
            return (
              <article
                key={v4()}
                className={classNames({
                  'grid grid-cols-2 rounded-md border-2 border-gray-50 p-5 capitalize': true,
                })}
              >
                <div className='space-y-2'>
<<<<<<< HEAD
                  <h3 className='font-bold'>{interview.company}</h3>
                  {interview.isFinished && (
                    <p className='text-sm'>{t('isFinished')}</p>
                  )}
                  {interview.isFinished && (
=======
                  <h3 className='font-bold'>{interview.company_name}</h3>
                  {interview.result && (
                    <p className='text-sm'>{t('isFinished')}</p>
                  )}
                  {interview.result && (
>>>>>>> ABC-55
                    <Link
                      href={`/${params.lang}/interviews/results/${interview.id}`}
                      className={classNames({
                        'flex items-center text-sm text-gray-500 transition-all hover:text-gray-900': true,
                      })}
                    >
                      <ChartBarSquareIcon className='mr-2 h-6' />
                      {t('seeResults')}
                    </Link>
                  )}
                </div>
                <div
                  className={classNames({
<<<<<<< HEAD
                    'text-gray-200 line-through': interview.isFinished,
=======
                    'text-gray-200 line-through': interview.result,
>>>>>>> ABC-55
                    'space-y-0.5 justify-self-end text-right': true,
                  })}
                >
                  <p className='font-medium'>{interview.interviewType}</p>
                  <p className='text-sm text-gray-400'>
<<<<<<< HEAD
                    {interview.date.split('T')[0]}
                  </p>
                  <p>{interview.date.split('T')[1]}</p>
=======
                    {interview.schedule.split('T')[0]}
                  </p>
                  <p>{interview.schedule.split('T')[1].split('.')[0]}</p>
>>>>>>> ABC-55
                </div>
              </article>
            )
          })}
        </section>
      </form>
    </div>
  )
}
