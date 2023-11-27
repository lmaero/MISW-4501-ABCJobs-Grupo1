'use client'

import { useJWT } from '@/hooks/useToken'
import { CANDIDATE_HOST } from '@/lib/api'
import { ZStringSch } from '@/schemas/ZString'
import { Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import z from 'zod'

interface Props {
  params: { id: string }
}

const InterviewResultSch = z.object({
  interviewId: z.coerce.number(),
  test: ZStringSch,
  score: z.number(),
})

type InterviewResult = z.infer<typeof InterviewResultSch>

export default function Page({ params }: Props) {
  const t = useTranslations('InterviewResultsPage')
  const [results, setResults] = useState<InterviewResult[] | []>([])
  const payload = useJWT()

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${CANDIDATE_HOST}/candidate/interviews/results/${params.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      const data = await response.json()

      if (!data.results) setResults([])
      else setResults(data.results)
    }

    void getData()
  }, [params.id])

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <h1 className='mb-6 text-xl'>
        <span className='font-semibold'>
          {t('resultsFor')} {payload?.email as string}
        </span>
      </h1>

      <div className='grid grid-cols-2 gap-x-20 gap-y-4'>
        {results.map((result) => (
          <div key={v4()}>
            <p className='font-semibold text-lg capitalize'>{result.test}</p>
            <div className='flex items-center space-x-2'>
              <Progress value={result.score} size='xl' className='w-full' />
              <span>{result.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
