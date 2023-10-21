'use client'

import Logo from '@/components/Logo'
import { CANDIDATE_HOST } from '@/lib/api'
import { CandidatePre, CandidatePreSch } from '@/schemas/Candidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function CandidateRegisterPage() {
  const router = useRouter()
  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<CandidatePre>({
    mode: 'onChange',
    resolver: zodResolver(CandidatePreSch),
  })

  async function onSubmit(data: CandidatePre) {
    try {
      const response = await fetch(`${CANDIDATE_HOST}/candidate/register`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const payload = await response.json()

      if (response.status === 201) {
        toast('Successfully validated', { type: 'success', autoClose: 3000 })
        setTimeout(() => {
          router.push(`/candidate/register/profile?email=${payload.email}`)
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
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo className='mx-auto h-10 w-auto' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Be hired by the most amazing companies. Register today!
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                data-testid='crp-email'
                disabled={isSubmitSuccessful}
                id='email'
                placeholder='youremail@yourdomain.com'
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
              Password
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

          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Full Name
            </label>
            <div className='mt-2'>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                data-testid='crp-full-name'
                disabled={isSubmitSuccessful}
                id='fullName'
                placeholder='John Smith'
                required
                type='text'
                {...register('fullName')}
              />
            </div>
            <p className='text-sm text-red-700'>{errors.fullName?.message}</p>
          </div>

          <button
            data-testid='crp-register-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
