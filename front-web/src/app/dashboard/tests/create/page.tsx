import Link from 'next/link'

export default function CompleteSignUpPage() {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create Test
            </h2>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Applicable to
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the role(s) this test is applicable for
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='fullstack-developer'
                    name='role'
                    type='checkbox'
                    value='Fullstack Developer'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
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
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
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
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
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

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='languages'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Question
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='number'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='Select the best definition for JSX'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='languages'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Right answer
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='number'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='JavaScript XML'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='languages'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Wrong options
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='number'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='A new language'
                    />
                  </div>
                </div>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='number'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='A plugin por JavaScript'
                    />
                  </div>
                </div>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='number'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='An awesome library'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type='button'
            className='text-sm font-semibold leading-6 bg-gray-100 px-4 py-2 rounded-lg'
          >
            Add more questions
          </button>
          {/* Additional sections for academic data, technical data, and work experience can be added here */}
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link
            href='/dashboard/tests'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </Link>
          <Link
            href='/dashboard/tests'
            className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Create
          </Link>
        </div>
      </form>
    </div>
  )
}
