'use client'

import { FieldDescription } from '@/app/[lang]/components/FieldDescription'
import { COMPANY_HOST } from '@/lib/api'
import { ZStringSch } from '@/schemas/ZString'
import { zodResolver } from '@hookform/resolvers/zod'
import { Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

interface Props {
  params: {
    lang: string
    url: string[]
  }
}

const InterviewResultSch = z.object({
  companyId: z.number(),
  candidateId: z.number(),
  testId: z.number(),
  results: z.array(
    z.tuple([ZStringSch.min(2).max(100), z.coerce.number().min(0).max(100)]),
  ),
})

type InterviewResult = z.infer<typeof InterviewResultSch>

export default function Page({ params }: Props) {
  const t = useTranslations('PublishResultsPage')
  const [results, setResults] = useState<InterviewResult>({
    companyId: -1,
    candidateId: -1,
    testId: -1,
    results: [['', -1]],
  })

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
    watch,
  } = useForm<InterviewResult>({
    mode: 'onSubmit',
    shouldUnregister: true,
    resolver: zodResolver(InterviewResultSch),
  })

  function addResult() {
    setResults({ ...results, results: [...results.results, ['', 0]] })
  }

  function removeResult(index: number) {
    const updated = { ...results }
    updated.results.splice(index, 1)
    setResults(updated)
  }

  async function onSubmit(data: InterviewResult) {
    try {
      const response = await fetch(
        `${COMPANY_HOST}/company/interviews/result`,
        {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
          },
          method: 'POST',
        },
      )

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
    <div className='mx-auto max-w-3xl p-12'>
      <h1 className='mb-6 text-xl'>
        <span className='font-semibold'>
          {t('resultsFor')}
          <span className='font-light capitalize'>{params.url[1]}</span>
        </span>
      </h1>

      <div className='flex flex-col'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            value={params.url[3]}
            type='hidden'
            {...register('companyId', { valueAsNumber: true })}
          />

          <input
            value={params.url[0]}
            type='hidden'
            {...register('candidateId', { valueAsNumber: true })}
          />

          <input
            value={params.url[2]}
            type='hidden'
            {...register('testId', { valueAsNumber: true })}
          />

          {results.results.map((result, index) => {
            const barValue = watch(`results.${index}.1`)

            return (
              <div key={results.candidateId + index}>
                <div className='mb-3'>
                  <FieldDescription title={t('skill')} />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t('skillPlaceholder')}
                      {...register(`results.${index}.0`)}
                    />
                  </div>
                </div>

                <div className='mb-3'>
                  <FieldDescription title={t('score')} />

                  <div className='flex max-w-md items-center space-x-5'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600'>
                      <input
                        type='number'
                        min={0}
                        max={100}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder={t('scorePlaceholder')}
                        {...register(`results.${index}.1`)}
                      />
                    </div>

                    <Progress value={barValue} size='xl' className='w-full' />
                  </div>
                </div>
                <button
                  type='button'
                  className='mb-5 rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white'
                  onClick={() => removeResult(index)}
                >
                  {t('removeButton')}
                </button>
              </div>
            )
          })}
          <button
            type='button'
            className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
            onClick={addResult}
          >
            {t('addButton')}
          </button>

          <div className='mt-10 flex space-x-2'>
            <button
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
    </div>
  )
}
