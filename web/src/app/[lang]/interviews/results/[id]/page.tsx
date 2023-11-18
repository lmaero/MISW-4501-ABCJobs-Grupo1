'use client'

import { useJWT } from '@/hooks/useToken'
import { Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { v4 } from 'uuid'
import z from 'zod'

interface Props {
  params: { id: string }
}

const InterviewResultSch = z.object({
  interviewId: z.coerce.number(),
  score: z.number(),
})

type InterviewResult = z.infer<typeof InterviewResultSch>

const fakeData = [
  { id: 1, score: 60, testName: 'React' },
  { id: 2, score: 75, testName: 'JavaScript' },
  { id: 3, score: 80, testName: 'Vue' },
  { id: 4, score: 85, testName: 'Angular' },
  { id: 5, score: 90, testName: 'Svelte' },
  { id: 6, score: 95, testName: 'Empathy' },
  { id: 7, score: 100, testName: 'Time management' },
  { id: 8, score: 90, testName: 'Critical thinking' },
  { id: 9, score: 85, testName: 'Organization' },
  { id: 10, score: 80, testName: 'Creativity' },
]

export default function Page({ params }: Props) {
  const t = useTranslations('InterviewResultsPage')
  const payload = useJWT()

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <h1 className='text-xl mb-6'>
        <span className='font-semibold'>
          {t('resultsFor')} {payload?.email as string}
        </span>
      </h1>

      <div className='grid grid-cols-2 gap-y-4 gap-x-20'>
        {fakeData.map((result) => (
          <div key={v4()}>
            <p>{result.testName}</p>
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
