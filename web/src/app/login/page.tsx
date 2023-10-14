'use client'

import Logo from '@/components/Logo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {Login, LoginSch} from "@/schemas/Login";

export default function LoginPage() {
  const {
    formState: { errors, isValid, isSubmitSuccessful }, register, } = useForm<Login>({
    mode: 'onChange',
    resolver: zodResolver(LoginSch),
  })

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo className='mx-auto h-10 w-auto' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Login to ABC Jobs!
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          onSubmit={() => console.log('Submitted')}>
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

          <button
            data-testid='crp-login-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
