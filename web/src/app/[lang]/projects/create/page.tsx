'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FieldDescription } from '@/components/FieldDescription'
import { PROJECT_HOST } from '@/lib/api'
import { roles } from '@/lib/roles'
import { Project, ProjectSch } from '@/schemas/Project'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  params: { lang: string }
}

export default function CreateProjectPage({ params }: Props) {
  const t = useTranslations('CreateProjectPage')
  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<Project>({
    mode: 'onChange',
    resolver: zodResolver(ProjectSch),
  })

  async function onSubmit(data: Project) {
    try {
      const response = await fetch(`${PROJECT_HOST}/project/register`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
        method: 'POST',
        referrerPolicy: 'unsafe-url',
      })

      const payload = await response.json()

      if (response.status === 201) {
        toast(payload.message, { type: 'success', autoClose: 5000 })
        return
      }

      if (response.status === 400) {
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
            {t('formLabels.teamTitle')}
          </h3>
          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.reqTeamTitle')}
              description={t('formLabels.reqTeamSubtitle')}
            />
            <div className='space-y-3'>
              {roles.map((role) => (
                <div key={role.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={role.id}
                    type='checkbox'
                    value={role.value}
                    {...register('team')}
                  />
                  <label
                    htmlFor={role.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {role.label}
                  </label>
                </div>
              ))}

              {errors.team && <ErrorMessage message={errors.team.message} />}
            </div>
          </article>
        </section>

        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('formLabels.financeTitle')}
          </h3>

          <article className='mb-3'>
            <FieldDescription title={t('formLabels.priceTitle')} />

            <div className='relative mt-2 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                min={0}
                max={100_000_000_000}
                type='number'
                id='price'
                className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                placeholder='0.00'
                aria-describedby='price-currency'
                {...register('price', {
                  valueAsNumber: true,
                })}
              />
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <span className='text-gray-500 sm:text-sm' id='price-currency'>
                  USD
                </span>
              </div>
            </div>

            {errors.price && <ErrorMessage message={errors.price.message} />}
          </article>

          <article className='mb-3'>
            <FieldDescription title={t('formLabels.budgetTitle')} />

            <div className='relative mt-2 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                min={0}
                max={100_000_000_000}
                type='number'
                id='budget'
                className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                placeholder='0.00'
                aria-describedby='budget-currency'
                {...register('budget', {
                  valueAsNumber: true,
                })}
              />
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <span className='text-gray-500 sm:text-sm' id='budget-currency'>
                  USD
                </span>
              </div>
            </div>
            {errors.budget && <ErrorMessage message={errors.budget.message} />}
          </article>
        </section>

        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('formLabels.addInfoTitle')}
          </h3>

          <article className='mb-3'>
            <FieldDescription title={t('formLabels.deadline')} />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='date'
                id='deadline'
                min={new Date().toDateString()}
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                {...register('deadline')}
              />
            </div>

            {errors.deadline && (
              <ErrorMessage message={errors.deadline.message} />
            )}
          </article>

          <article className='col-span-full'>
            <FieldDescription title={t('formLabels.description')} />
            <textarea
              id='description'
              rows={5}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              defaultValue=''
              {...register('description')}
            />

            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}

            <p className='mt-3 text-sm leading-6 text-gray-600'>
              {t('formLabels.descriptionSub')}
            </p>
          </article>

          <article className='mb-3'>
            <FieldDescription title={t('formLabels.stakeholders')} />

            <select
              id='stakeholders'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
              {...register('stakeholders')}
            >
              <option value='Uniandes'>{t('formLabels.university')}</option>
              <option value='MinEducacion'>{t('formLabels.ministry')}</option>
              <option value='ABC Jobs'>{t('formLabels.company')}</option>
            </select>

            {errors.stakeholders && (
              <ErrorMessage message={errors.stakeholders.message} />
            )}
          </article>
        </section>

        <div className='flex space-x-2'>
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
  )
}
