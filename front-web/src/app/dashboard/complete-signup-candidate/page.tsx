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
              To apply for some projects, please make sure that your information
              is complete
            </p>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Your best role
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the position you're comfortable with
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
                    Fullstack Developer
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
                    Backend Developer
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
                  What languages do you speak?
                </label>
                <div className='mt-2'>
                  <p className='text-xs text-gray-400'>
                    Use comma-separated values to list your languages
                  </p>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='English, Spanish, Russian'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='languages'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  What are your main soft-skills?
                </label>
                <div className='mt-2'>
                  <p className='text-xs text-gray-400'>
                    Use comma-separated values to list your soft-skills
                  </p>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='languages'
                      id='languages'
                      autoComplete='languages'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='Patience, Team collaboration'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Location
                </label>
                <div className='mt-2'>
                  <select
                    id='location'
                    name='location'
                    autoComplete='location'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option value='United States'>United States</option>
                    <option value='Canada'>Canada</option>
                    <option value='Mexico'>Mexico</option>
                  </select>
                </div>
              </div>
            </div>

            <h2 className='text-xl mt-10'>Academical Data</h2>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Your certifications
              </label>
              <div className='mt-2'>
                <p className='text-xs text-gray-400'>
                  Use comma-separated values to list your tech certifications
                </p>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='AWS, GCP, Azure'
                  />
                </div>
              </div>
            </div>

            <h3 className='text-md mt-6'>Add Study</h3>
            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                School name
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Universidad de Los Andes'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Obtained degree
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='MSc. Software Engineer'
                  />
                </div>
              </div>
            </div>

            <div className='flex gap-3 mt-4'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='certifications'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Start date
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='date'
                      name='certifications'
                      id='certifications'
                      autoComplete='certifications'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='certifications'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  End date
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='date'
                      name='certifications'
                      id='certifications'
                      autoComplete='certifications'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Grade
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    min={0}
                    max={5}
                    type='number'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            <button
              type='button'
              className='text-sm font-semibold leading-6 bg-gray-100 px-4 py-2 mt-6 rounded-lg'
            >
              Add more education
            </button>

            <h2 className='text-xl mt-10'>Technical Data</h2>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Your tech-skills
              </label>
              <div className='mt-2'>
                <p className='text-xs text-gray-400'>
                  Use comma-separated values to list your tech-skills
                </p>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Git, TailwindCSS'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Programming Languages
              </label>
              <div className='mt-2'>
                <p className='text-xs text-gray-400'>
                  Use comma-separated values to list the programming languages
                  you know
                </p>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='JavaScript, Python, CSS, HTML, Java, Go'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Roles
              </label>
              <div className='mt-2'>
                <p className='text-xs text-gray-400'>
                  Use comma-separated values to list the roles you're used to
                  work
                </p>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='DevOps Engineer, Architect, Fullstack Developer'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Years of experience
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    min={1}
                    max={40}
                    type='number'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            <h2 className='text-xl mt-10'>Experience</h2>

            <div className='sm:col-span-4'>
              <label
                htmlFor='certifications'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Title
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='certifications'
                    id='certifications'
                    autoComplete='certifications'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='CEO'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Employment Type
              </label>
              <div className='mt-2'>
                <select
                  id='location'
                  name='location'
                  autoComplete='location'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value='United States'>Self-employed</option>
                  <option value='Canada'>Full-time</option>
                  <option value='Mexico'>Remote</option>
                  <option value='Mexico'>Hybrid</option>
                </select>
              </div>
            </div>

            <div className='flex gap-3 mt-4'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='certifications'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Start date
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='date'
                      name='certifications'
                      id='certifications'
                      autoComplete='certifications'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='certifications'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  End date
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='date'
                      name='certifications'
                      id='certifications'
                      autoComplete='certifications'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Role
              </label>
              <div className='mt-2'>
                <select
                  id='location'
                  name='location'
                  autoComplete='location'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value='United States'>Backend</option>
                  <option value='Canada'>Frontend</option>
                  <option value='Mexico'>Fullstack</option>
                  <option value='Mexico'>DevOps</option>
                  <option value='Mexico'>Tester</option>
                </select>
              </div>

              <button
                type='button'
                className='text-sm font-semibold leading-6 bg-gray-100 px-4 py-2 mt-6 rounded-lg'
              >
                Add more experience
              </button>
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
            href='/dashboard/profile'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </Link>
        </div>
      </form>
    </div>
  )
}
