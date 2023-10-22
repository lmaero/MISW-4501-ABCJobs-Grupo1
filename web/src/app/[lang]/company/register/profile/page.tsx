'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FieldDescription } from '@/components/FieldDescription'
import { COMPANY_HOST } from '@/lib/api'
import { companySize } from '@/lib/companySize'
import { languages } from '@/lib/languages'
import { CompanyProfile, CompanyProfileSch } from '@/schemas/CompanyProfile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  params: { lang: string }
}

export default function CompanyCompleteProfilePage({ params }: Props) {
  const t = useTranslations('CompanyProfilePage')
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<CompanyProfile>({
    mode: 'onChange',
    resolver: zodResolver(CompanyProfileSch),
  })

  async function onSubmit(data: CompanyProfile) {
    try {
      const response = await fetch(`${COMPANY_HOST}/company/register/profile`, {
        body: JSON.stringify({ email, ...data }),
        headers: {
          'Content-Type': 'application/json',
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
          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.sizeTitle')}
              description={t('formLabels.sizeSubtitle')}
            />
            <div className='space-y-3'>
              {companySize.map((size) => (
                <div key={size.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={size.id}
                    type='radio'
                    value={size.value}
                    {...register('size')}
                  />
                  <label
                    htmlFor={size.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {size.label}
                  </label>
                </div>
              ))}

              {errors.size && <ErrorMessage message={errors.size.message} />}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription title={t('formLabels.mainAddTitle')} />
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='mainAddress'
                autoComplete='mainAddress'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('formLabels.mainAddPlaceholder')}
                {...register('mainAddress')}
              />
            </div>

            {errors.mainAddress && (
              <ErrorMessage message={errors.mainAddress.message} />
            )}
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.segmentsTitle')}
              description={t('formLabels.segmentsSubtitle')}
            />
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                data-testid='company-profile-segments'
                type='text'
                id='segments'
                autoComplete='segments'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('formLabels.segmentsPlaceholder')}
                {...register('segments')}
              />
            </div>

            {errors.segments && (
              <ErrorMessage message={errors.segments.message} />
            )}
          </article>

          <div className='mb-3 flex gap-3'>
            <div className='h-12 w-1/2'>
              <FieldDescription title={t('formLabels.preferredLangTitle')} />
              <select
                id='preferredLanguage'
                defaultValue='English'
                autoComplete='preferredLanguage'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                {...register('preferredLanguage')}
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              {errors.preferredLanguage && (
                <ErrorMessage message={errors.preferredLanguage.message} />
              )}
            </div>
            <div className='h-12 w-1/2'>
              <FieldDescription title={t('formLabels.mainContactTitle')} />
              <select
                id='mainContact'
                defaultValue='Diego Eslava'
                autoComplete='mainContact'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                {...register('mainContact')}
              >
                {['Diego Eslava', 'Alonso Cantu'].map((contact) => (
                  <option key={contact} value={contact}>
                    {contact}
                  </option>
                ))}
              </select>

              {errors.mainContact && (
                <ErrorMessage message={errors.mainContact.message} />
              )}
            </div>
          </div>
        </section>
        <div className='pt-5'>
          <div className='flex space-x-2'>
            <button
              type='reset'
              className='flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
            >
              {t('cancelButton')}
            </button>

            <button
              data-testid='company-profile-submit-button'
              disabled={!isValid || isSubmitSuccessful}
              type='submit'
              className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
            >
              {t('sendButton')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
