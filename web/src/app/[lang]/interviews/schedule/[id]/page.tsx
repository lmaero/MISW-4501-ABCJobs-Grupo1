'use client'

import { ErrorMessage } from '@/app/[lang]/components/ErrorMessage'
import { COMPANY_HOST } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

interface Props {
  params: { id: string }
}

const ScheduleSchema = z.object({
  candidateId: z.coerce.number(),
  date: z.coerce.date(),
})

type Schedule = z.infer<typeof ScheduleSchema>

export default function Page({ params }: Props) {
  const t = useTranslations('SchedulerPage')
  const router = useRouter()
  const [date, setDate] = useState(new Date(Date.now()))

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
    control,
    setValue,
  } = useForm<Schedule>({
    mode: 'onChange',
    resolver: zodResolver(ScheduleSchema),
  })

  function handleChange(dateChange: Date) {
    setValue('date', dateChange, {
      shouldDirty: true,
    })
    setDate(dateChange)
  }

  async function onSubmit(data: Schedule) {
    try {
      const response = await fetch(`${COMPANY_HOST}/interviews`, {
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
        },
        method: 'POST',
      })

      const payload = await response.json()
      if (response.status === 201) {
        return toast(t('notifications.success'), {
          type: 'success',
          autoClose: 3000,
        })
      }

      if (response.status === 404 || response.status === 400) {
        toast(payload.message, { type: 'warning', autoClose: 5000 })
      } else {
        toast(payload.message, { type: 'error', autoClose: false })
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast(e.message, { type: 'error', autoClose: false })
        throw e
      }
    }
  }

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <form
        className='flex flex-col items-center space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='hidden'
          value={Number(params.id)}
          {...register('candidateId')}
        />
        {errors.candidateId && (
          <ErrorMessage message={errors.candidateId.message} />
        )}

        <label htmlFor='calendar'>{t('calendarLabel')}</label>

        <Controller
          name='date'
          control={control}
          defaultValue={date}
          render={() => (
            <DatePicker
              className='rounded-lg px-8'
              id='calendar'
              selected={date}
              onChange={handleChange}
              showTimeSelect
              timeFormat='HH:mm'
              startOpen
              minTime={new Date('2023-11-11T08:00:00')}
              maxTime={new Date('2023-11-11T18:00:00')}
              timeIntervals={60}
              timeCaption={t('timeCaption')}
              dateFormat='MMMM d, yyyy h:mm aa'
            />
          )}
        />

        {errors.date && <ErrorMessage message={errors.date.message} />}

        <div className='flex space-x-2'>
          <button
            onClick={() => router.push('/dashboard')}
            type='reset'
            className='flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('cancelButton')}
          </button>

          <button
            data-testid='ccpp-submit-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('sendButton')}
          </button>
        </div>
      </form>
    </div>
  )
}
