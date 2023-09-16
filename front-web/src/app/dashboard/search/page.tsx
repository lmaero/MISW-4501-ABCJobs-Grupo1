import Link from 'next/link'
import React from 'react'

function SearchPage() {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              What profile you are looking for?
            </h2>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Applicable roles
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Make sure to select compatible roles
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='fullstack-developer'
                    name='role'
                    type='checkbox'
                    value='Fullstack Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='fullstack-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Fullstack Developer
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='backend-developer'
                    name='role'
                    type='checkbox'
                    value='Backend Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='backend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Backend Developer
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='frontend-developer'
                    name='role'
                    type='checkbox'
                    value='Frontend Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='frontend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Frontend Developer
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Needed languages
              </legend>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='JavaScript'
                    name='planguages'
                    type='checkbox'
                    value='JavaScript'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='JavaScript'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JavaScript
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='TypeScript'
                    name='planguages'
                    type='checkbox'
                    value='TypeScript'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='TypeScript'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    TypeScript
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='Python'
                    name='planguages'
                    type='checkbox'
                    value='Frontend Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='Python'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Python
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Needed soft-skills
              </legend>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='Leadership'
                    name='soft'
                    type='checkbox'
                    value='Leadership'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='Leadership'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Leadership
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='Responsibility'
                    name='soft'
                    type='checkbox'
                    value='Responsibility'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='Responsibility'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Responsibility
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='communication'
                    name='soft'
                    type='checkbox'
                    value='communication'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='communication'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Good communication skills
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Spoken languages
              </legend>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='English'
                    name='slanguages'
                    type='checkbox'
                    value='English'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='English'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    English
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='Spanish'
                    name='slanguages'
                    type='checkbox'
                    value='Spanish'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='Spanish'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Spanish
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='Russian'
                    name='slanguages'
                    type='checkbox'
                    value='Russian'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='Russian'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Russian
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Additional sections for academic data, technical data, and work experience can be added here */}
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link
            href='/dashboard/projects'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </Link>
          <Link
            href='/dashboard/search/results'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Search
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SearchPage
