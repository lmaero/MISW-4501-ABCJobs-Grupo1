'use client'

import { ErrorMessage } from '@/app/[lang]/components/ErrorMessage'
import { FieldDescription } from '@/app/[lang]/components/FieldDescription'
import { CANDIDATE_HOST, COMPANY_HOST } from '@/lib/api'
import { PerformTest, performTestSch } from '@/schemas/PerformTest'
import { Question } from '@/schemas/Test'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  params: {
    lang: string
  }
}

export default function Page({ params }: Props) {
  const t = useTranslations('CandidatePerformTest')
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[] | []>([])
  const [testId, setTestId] = useState<number | null>(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${COMPANY_HOST}/company/tests`)
      if (!response.ok) {
        setQuestions([])
        return null
      } else {
        const data = await response.json()
        setQuestions(data.tests[0].questions)
        setTestId(data.tests[0].test_id)
      }
    }

    void getData()
  }, [])

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<PerformTest>({
    values: [],
    mode: 'onChange',
    resolver: zodResolver(performTestSch),
  })

  async function onSubmit(data: PerformTest) {
    await axios
      .post(
        `${CANDIDATE_HOST}/candidate/test`,
        JSON.stringify({ test_id: testId, answers: data }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
          },
          withCredentials: false,
        },
      )
      .then((data) => {
        if (data.status === 200) {
          setTimeout(() => {
            router.push(`/${params.lang}/dashboard`)
          }, 3000)
          return
        }

        if (data.status === 400) {
          toast(data.data.message, { type: 'warning', autoClose: 5000 })
        } else {
          toast(data.data.message, { type: 'error', autoClose: false })
        }
      })
      .catch((e: unknown) => {
        if (e instanceof Error) {
          toast(e.message, { type: 'error', autoClose: false })
          throw e
        }
      })
  }

  if (questions.length === 0)
    return (
      <p className='font-semibold mx-auto max-w-7xl p-7'>{t('notCreated')}</p>
    )

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            {t('title')}
          </h2>
          <p className='text-sm text-gray-600'>{t('subtitle')}</p>
        </header>

        <hr className='border-b-1' />

        <section>
          {questions.map((question, outerIndex) => {
            const { wrongOptions, rightAnswer } = question
            const options = wrongOptions.concat(rightAnswer)

            return (
              <article
                key={question.question + outerIndex}
                className='mb-6 capitalize'
              >
                <FieldDescription title={question.question} />

                <input
                  value={question.question}
                  type='hidden'
                  {...register(`${outerIndex}.0`)}
                />

                <div className='space-y-3'>
                  {options.map((option, innerIndex) => (
                    <div
                      key={option + innerIndex}
                      className='flex items-center gap-x-3'
                    >
                      <input
                        className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                        id={`${outerIndex}${innerIndex}.1`}
                        type='radio'
                        value={option}
                        {...register(`${outerIndex}.1`)}
                      />

                      <label
                        htmlFor={`${outerIndex}${innerIndex}.1`}
                        className='block text-sm font-light leading-6 text-gray-900'
                      >
                        {option}
                      </label>
                      {errors?.[outerIndex] && (
                        <ErrorMessage message={errors?.[outerIndex]?.message} />
                      )}
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </section>

        <hr className='border-b-1' />

        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => router.push('/dashboard')}
            type='reset'
            className='flex w-fit justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('cancelButton')}
          </button>

          <button
            data-cy='scp-submit-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-fit justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('sendButton')}
          </button>
        </div>
      </form>
    </div>
  )
}
