'use client'

import { ErrorMessage } from '@/app/[lang]/components/ErrorMessage'
import { FieldDescription } from '@/app/[lang]/components/FieldDescription'
import Logo from '@/app/[lang]/components/Logo'
import { AUTH_HOST } from '@/lib/api'
import { loginType } from '@/lib/loginType'
import { Login, LoginSch } from '@/schemas/Login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  params: { lang: string }
}

export default function LoginPage({ params }: Props) {
  const router = useRouter()
  const t = useTranslations('LoginPage')
  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<Login>({
    mode: 'onChange',
    resolver: zodResolver(LoginSch),
  })

  async function onSubmit(data: Login) {
    const response = await fetch(`${AUTH_HOST}/auth`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.status === 200) {
      localStorage.setItem('token', json.token)
      toast(t('notifications.success'), {
        type: 'success',
        autoClose: 3000,
      })
      window.location.href = `/${params.lang}/dashboard`
    } else if (!response.ok) {
      localStorage.removeItem('token')
      toast(t('notifications.error'), { type: 'error', autoClose: 3000 })
      router.push(`/${params.lang}`)
    } else if (!json.email) {
      localStorage.removeItem('token')
      toast(t('notifications.error'), { type: 'error', autoClose: 3000 })
      router.push(`/${params.lang}`)
    } else {
      localStorage.removeItem('token')
      toast(t('notifications.warning'), {
        type: 'warning',
        autoClose: 3000,
      })
      setTimeout(() => {
        router.push(`/${params.lang}/register`)
      }, 3000)
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo className='mx-auto h-10 w-auto' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {t('title')}
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              {t('formLabels.email')}
            </label>
            <div className='mt-2'>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                data-testid='crp-email'
                disabled={isSubmitSuccessful}
                id='email'
                placeholder={t('formLabels.emailPlaceholder')}
                required
                type='email'
                {...register('email')}
              />
            </div>
            <p className='text-sm text-red-700'>{errors.email?.message}</p>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              {t('formLabels.password')}
            </label>
            <div className='mt-2'>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                data-testid='crp-password'
                disabled={isSubmitSuccessful}
                id='password'
                required
                type='password'
                {...register('password')}
              />
            </div>
            <p className='text-sm text-red-700'>{errors.password?.message}</p>
          </div>

          <article className='mb-6 space-y-3'>
            <FieldDescription title={t('formLabels.typeTitle')} />
            <div className='space-y-3'>
              {loginType.map((type) => (
                <div key={type.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={type.id}
                    type='radio'
                    value={type.value}
                    {...register('type')}
                  />
                  <label
                    htmlFor={type.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {type.label}
                  </label>
                </div>
              ))}

              {errors.type && <ErrorMessage message={errors.type.message} />}
            </div>
          </article>

          <div>
            <button
              data-testid='crp-login-button'
              disabled={!isValid}
              type='submit'
              className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
            >
              {t('sendButton')}
            </button>
            <Link
              data-cy='cr-signup'
              className='mt-5 block text-right text-sm text-blue-600'
              href='/register'
            >
              {t('loginHere')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
