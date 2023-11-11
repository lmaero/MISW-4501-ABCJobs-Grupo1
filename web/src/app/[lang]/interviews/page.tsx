'use client'

import { CANDIDATE_HOST } from '@/lib/api'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

const fakeData = [
  {
    id: 1,
    company: 'Google',
    interviewType: 'Virtual',
    date: '2023-11-11T10:00:00',
  },
  {
    id: 2,
    company: 'Microsoft',
    interviewType: 'Onsite',
    date: '2023-11-14T13:00:00',
  },
  {
    id: 3,
    company: 'Amazon',
    interviewType: 'Virtual',
    date: '2023-11-16T11:00:00',
  },
  {
    id: 4,
    company: 'Facebook',
    interviewType: 'Virtual',
    date: '2023-11-18T14:00:00',
  },
  {
    id: 5,
    company: 'Apple',
    interviewType: 'Onsite',
    date: '2023-11-21T09:00:00',
  },
]

interface Props {
  params: {
    lang: string
  }
}

interface Interview {
  id: number
  company: string
  interviewType: string
  date: string
}

export default function Page({ params }: Props) {
  const t = useTranslations('InterviewsPage')
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${CANDIDATE_HOST}/interviews`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()

      if (!data.results) setInterviews([])
      else setInterviews(data.results)
    }
    void getData()
  }, [])

  if (fakeData.length === 0)
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
          {fakeData.map((interview: Interview) => {
            return (
              <article
                key={v4()}
                className='grid capitalize grid-cols-2 rounded-md border-2 border-gray-50 p-5'
              >
                <div className='space-y-2'>
                  <h3 className='font-bold'>{interview.company}</h3>
                </div>
                <div className='space-y-0.5 justify-self-end text-right'>
                  <p className='font-medium'>{interview.interviewType}</p>
                  <p className='text-sm text-gray-400'>
                    {interview.date.split('T')[0]}
                  </p>
                  <p>{interview.date.split('T')[1]}</p>
                </div>
              </article>
            )
          })}
        </section>
      </form>
    </div>
  )
}
