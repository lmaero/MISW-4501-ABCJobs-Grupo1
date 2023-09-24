import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className='mx-auto max-w-2xl py-10'>
      <h2 className='font-bold mb-8 text-2xl'>
        Results for: Johnson & Johnson
      </h2>
      <div className='gap-8 sm:grid sm:grid-cols-2'>
        <div>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              React
            </dt>
            <dd className='flex items-center mb-3'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[88%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.8
              </span>
            </dd>
          </dl>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              TypeScript
            </dt>
            <dd className='flex items-center mb-3'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[89%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.9
              </span>
            </dd>
          </dl>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Soft-skills
            </dt>
            <dd className='flex items-center mb-3'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[88%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.8
              </span>
            </dd>
          </dl>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Spanish
            </dt>
            <dd className='flex items-center'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[54%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                5.4
              </span>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              English
            </dt>
            <dd className='flex items-center mb-3'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[89%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.9
              </span>
            </dd>
          </dl>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              JavaScript
            </dt>
            <dd className='flex items-center mb-3'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[70%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                7.0
              </span>
            </dd>
          </dl>
          <dl>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Humanity
            </dt>
            <dd className='flex items-center'>
              <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
                <div className='w-[89%] bg-blue-600 h-2.5 rounded dark:bg-blue-500' />
              </div>
              <span className='border-2 px-4 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.9
              </span>
            </dd>
          </dl>
        </div>
      </div>

      <fieldset className='mt-10'>
        <legend className='text-sm font-semibold leading-6 text-gray-900'>
          Select for project?
        </legend>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          This will reserve this candidate
        </p>
        <div className='mt-6 space-y-6'>
          <div className='flex items-center gap-x-3'>
            <input
              name='jsx'
              type='radio'
              className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
            />
            <label
              htmlFor='fullstack-developer'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Yes
            </label>
          </div>
          <div className='flex items-center gap-x-3'>
            <input
              name='jsx'
              type='radio'
              className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
            />
            <label
              htmlFor='backend-developer'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              No
            </label>
          </div>
        </div>
      </fieldset>

      <div className='mt-8 flex justify-end'>
        <Link
          href='/dashboard/interviews/results'
          type='button'
          className='text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Publish Result
        </Link>
      </div>
    </div>
  )
}

export default Page
