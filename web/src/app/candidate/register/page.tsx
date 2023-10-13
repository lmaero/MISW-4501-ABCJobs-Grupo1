'use client'

import Logo from '@/components/Logo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CandidatePre, CandidatePreSch } from '@/schemas/Candidate'

export default function CandidateRegisterPage() {
  const {
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<CandidatePre>({
    mode: 'onChange',
    resolver: zodResolver(CandidatePreSch),
  })

  async function onSubmit(data: CandidatePre) {
    try {
      console.dir(data)
      reset()
    } catch (e: unknown) {
      throw e
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
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                autoFocus
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
            <p className='text-sm text-red-700'>
              {errors.email && errors.email.message}
            </p>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'>
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
            <p className='text-sm text-red-700'>
              {errors.password && errors.password.message}
            </p>
          </div>

          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium leading-6 text-gray-900'>
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
            <p className='text-sm text-red-700'>
              {errors.fullName && errors.fullName.message}
            </p>
          </div>

          <button
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
