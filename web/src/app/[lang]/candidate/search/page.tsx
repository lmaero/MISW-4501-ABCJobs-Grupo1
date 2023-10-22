'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FieldDescription } from '@/components/FieldDescription'
import { CANDIDATE_HOST } from '@/lib/api'
import { roles } from '@/lib/roles'
import { SearchCandidate, SearchCandidateSch } from '@/schemas/SearchCandidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const programmingLanguages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
]

const softSkills = [
  { value: 'leadership', label: 'Leadership' },
  { value: 'responsibility', label: 'Responsibility' },
  { value: 'communication', label: 'Good Communication Skills' },
]

const spokenLanguages = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'russian', label: 'Russian' },
]

interface Props {
  params: { lang: string }
}

export default function SearchCandidatePage({ params }: Props) {
  const t = useTranslations('SearchCandidatePage')
  const router = useRouter()

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<SearchCandidate>({
    mode: 'onChange',
    resolver: zodResolver(SearchCandidateSch),
  })

  async function onSubmit(data: SearchCandidate) {
    try {
      const response = await fetch(`${CANDIDATE_HOST}/candidate/search`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        referrerPolicy: 'no-referrer',
      })

      const payload = await response.json()

      if (response.status === 200) {
        setTimeout(() => {
          router.push(`/${params.lang}/candidate/search/results`)
        }, 3000)
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
          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.rolesTitle')}
              description={t('formLabels.rolesSubtitle')}
            />
            <div className='space-y-3'>
              {roles.map((role) => (
                <div key={role.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={role.id}
                    type='checkbox'
                    value={role.value}
                    {...register('roles')}
                  />
                  <label
                    htmlFor={role.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {role.label}
                  </label>
                </div>
              ))}

              {errors.roles && <ErrorMessage message={errors.roles.message} />}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.programmingTitle')}
              description={t('formLabels.programmingSubtitle')}
            />
            <div className='space-y-3'>
              {programmingLanguages.map((language) => (
                <div key={language.value} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={language.value}
                    type='checkbox'
                    value={language.value}
                    {...register('programmingLanguages')}
                  />
                  <label
                    htmlFor={language.value}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {language.label}
                  </label>
                </div>
              ))}

              {errors.programmingLanguages && (
                <ErrorMessage message={errors.programmingLanguages.message} />
              )}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.softTitle')}
              description={t('formLabels.softSubtitle')}
            />
            <div className='space-y-3'>
              {softSkills.map((skill) => (
                <div key={skill.value} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={skill.value}
                    type='checkbox'
                    value={skill.value}
                    {...register('softSkills')}
                  />
                  <label
                    htmlFor={skill.value}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {skill.label}
                  </label>
                </div>
              ))}

              {errors.softSkills && (
                <ErrorMessage message={errors.softSkills.message} />
              )}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('formLabels.spokenTitle')}
              description={t('formLabels.spokenSubtitle')}
            />
            <div className='space-y-3'>
              {spokenLanguages.map((language) => (
                <div key={language.value} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={language.value}
                    type='checkbox'
                    value={language.value}
                    {...register('spokenLanguages')}
                  />
                  <label
                    htmlFor={language.value}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {language.label}
                  </label>
                </div>
              ))}

              {errors.spokenLanguages && (
                <ErrorMessage message={errors.spokenLanguages.message} />
              )}
            </div>
          </article>
        </section>

        <hr className='border-b-1' />

        <div className='flex justify-end space-x-2'>
          <button
            type='reset'
            className='flex w-fit justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            {t('cancelButton')}
          </button>

          <button
            data-testid='scp-submit-button'
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
