import React from 'react'

function Page() {
  return (
    <div className='mx-auto max-w-2xl py-10'>
      <h2 className='font-bold mb-8 text-2xl'>
        Results for: Johnson & Johnson
      </h2>
      <div className='flex items-center mb-5'>
        <p className='bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800'>
          8.7
        </p>
        <p className='ml-2 font-medium text-gray-500'>
          Finished Process - Not selected
        </p>
      </div>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
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
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                8.9
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Page
