'use client'

import { Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'
import z from 'zod'

interface Props {
  params: { id: string }
}

const InterviewResultSch = z.object({
  interviewId: z.coerce.number(),
  score: z.number(),
})

type InterviewResult = z.infer<typeof InterviewResultSch>

export default function Page({ params }: Props) {
  const t = useTranslations('SchedulerPage')

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <Progress value={50} size='xl' className='w-full' />
    </div>
  )
}
