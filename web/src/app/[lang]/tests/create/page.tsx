'use client'

import { ErrorMessage } from '@/app/[lang]/components/ErrorMessage'
import { FieldDescription } from '@/app/[lang]/components/FieldDescription'
import { COMPANY_HOST } from '@/lib/api'
import { roles } from '@/lib/roles'
import { Question, Test, testSch } from '@/schemas/Test'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const generateKey = (pre: number) => {
  return `${pre}_${new Date().getTime()}`
}

export default function CreateTestPage() {
  const t = useTranslations('CreateTestPage')
  const router = useRouter()

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      rightAnswer: '',
      wrongOptions: ['', '', ''],
    },
  ])

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<Test>({
    mode: 'onChange',
    resolver: zodResolver(testSch),
  })

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        rightAnswer: '',
        wrongOptions: ['', '', ''],
      },
    ])
  }

  const removeQuestion = (index: number) => {
    if (index === 0) return null
    const updatedSections = [...questions]
    updatedSections.splice(index, 1)
    setQuestions(updatedSections)
  }

  async function onSubmit(data: Test) {
    try {
      const response = await fetch(`${COMPANY_HOST}/company/test`, {
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
        },
        method: 'POST',
        referrerPolicy: 'unsafe-url',
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
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('basic.title')}
          </h3>

          <article className='mb-6'>
            <FieldDescription title={t('basic.formLabels.nameTitle')} />
            <div className='space-y-3'>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                <input
                  type='text'
                  data-cy='name'
                  id='name'
                  className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  placeholder={t('basic.formLabels.namePlaceholder')}
                  {...register('name')}
                />
              </div>
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('basic.formLabels.rolesTitle')}
              description={t('basic.formLabels.rolesSubtitle')}
            />
            <div className='space-y-3'>
              {roles.map((role) => (
                <div key={role.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={role.id}
                    type='checkbox'
                    value={role.value}
                    {...register('applicableTo')}
                  />
                  <label
                    htmlFor={role.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {role.label}
                  </label>
                </div>
              ))}

              {errors.applicableTo && (
                <ErrorMessage message={errors.applicableTo.message} />
              )}
            </div>
          </article>
        </section>

        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('questionsData.title')}
          </h3>

          <article>
            {questions.map((question, index) => (
              <div key={generateKey(index)} className='mt-12 space-y-6'>
                <div className='mb-3'>
                  <FieldDescription
                    title={`${t('questionsData.formLabels.questionTitle')} ${
                      index + 1
                    }`}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      data-cy='question'
                      id={`question${index}`}
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t(
                        'questionsData.formLabels.questionPlaceholder',
                      )}
                      {...register(`questions.${index}.question`)}
                    />
                  </div>

                  {errors.questions?.[index]?.question && (
                    <ErrorMessage
                      message={errors.questions[index]?.question?.message}
                    />
                  )}
                </div>

                <div className='mb-3'>
                  <FieldDescription
                    title={t('questionsData.formLabels.rightAnswerTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      data-cy='rightAnswer'
                      id={`rightAnswer${index}`}
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t(
                        'questionsData.formLabels.rightAnswerPlaceholder',
                      )}
                      {...register(`questions.${index}.rightAnswer`)}
                    />
                  </div>

                  {errors.questions?.[index]?.rightAnswer && (
                    <ErrorMessage
                      message={errors.questions[index]?.rightAnswer?.message}
                    />
                  )}
                </div>

                <div className='sm:col-span-4'>
                  <FieldDescription
                    title={t('questionsData.formLabels.wrongOptionsTitle')}
                  />

                  {questions[index].wrongOptions.map((wrong, wrongIndex) => (
                    <div key={generateKey(wrongIndex)}>
                      <div className='mb-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                        <input
                          type='text'
                          data-cy={`wrongOptions${index}${wrongIndex}`}
                          id={`wrongOptions${index}${wrongIndex}`}
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          placeholder={t(
                            `questionsData.formLabels.wrongOptionsPlaceholder${wrongIndex}`,
                          )}
                          {...register(
                            `questions.${index}.wrongOptions.${wrongIndex}`,
                          )}
                        />
                      </div>

                      {errors.questions?.[index]?.wrongOptions?.[
                        wrongIndex
                      ] && (
                        <ErrorMessage
                          message={
                            errors.questions[index]?.wrongOptions?.[wrongIndex]
                              ?.message
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>

                {index !== 0 && (
                  <button
                    type='button'
                    className='mb-10 mr-3 mt-3 rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white'
                    onClick={() => removeQuestion(index)}
                  >
                    {t('questionsData.removeButton')}
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              className='mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
              onClick={addQuestion}
            >
              {t('questionsData.addMoreQuestions')}
            </button>
          </article>
        </section>

        <div className='flex space-x-2'>
          <button
            onClick={() => router.push('/dashboard')}
            type='reset'
            className='flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('cancelButton')}
          </button>

          <button
            data-cy='ccpp-submit-button'
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
