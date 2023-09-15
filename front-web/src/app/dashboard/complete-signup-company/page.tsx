import Link from 'next/link'

export default function CompleteSignUpPage() {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete your information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              To publish your available projects
            </p>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Size
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the size of your company
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='fullstack-developer'
                    name='role'
                    type='radio'
                    value='Fullstack Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='fullstack-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Startup
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='backend-developer'
                    name='role'
                    type='radio'
                    value='Backend Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='backend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Small Business
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='frontend-developer'
                    name='role'
                    type='radio'
                    value='Frontend Developer'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='frontend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Enterprise
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
                  Main Address
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='
                    6621 Main Street, Miami Lakes, FL 33014. USA
                  '
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='languages'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Which segments your company belongs to?
                </label>
                <div className='mt-2'>
                  <p className='text-xs text-gray-400'>
                    Use comma-separated values to list them
                  </p>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='Aviation, Manufacturing, Industrial'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Preferred Language
                </label>
                <div className='mt-2'>
                  <select
                    id='location'
                    name='location'
                    autoComplete='location'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option value='United States'>Spanish</option>
                    <option value='Canada'>English</option>
                    <option value='Mexico'>Russian</option>
                  </select>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Main Contact
                </label>
                <div className='mt-2'>
                  <select
                    id='location'
                    name='location'
                    autoComplete='location'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option value='United States'>Diego Eslava</option>
                    <option value='Canada'>Camilo Gálvez</option>
                    <option value='Mexico'>Alonso Cantu</option>
                    <option value='Mexico'>Luis Miguel Guzman</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Additional sections for academic data, technical data, and work experience can be added here */}
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link
            href='/register'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </Link>
          <Link
            href='/dashboard/company'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </Link>
        </div>
      </form>
    </div>
  )
}
