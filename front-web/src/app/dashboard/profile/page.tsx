export default function ProfilePage() {
  return (
    <div className='p-8 mx-auto max-w-2xl'>
      <div className='px-4 sm:px-0'>
        <h3 className='text-base font-semibold leading-7 text-gray-900'>
          Candidate Information
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          Personal details and application.
        </p>
      </div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Full name
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              Margot Foster
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Best role
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              Backend Developer
            </dd>
          </div>

          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Languages
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              Spanish, English, Russian
            </dd>
          </div>

          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Email address
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              margotfoster@example.com
            </dd>
          </div>

          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Location
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              Digital Nomad
            </dd>
          </div>

          <fieldset className='border-2 border-gray-500 p-3 rounded-2xl mb-5'>
            <h3>Academical Data</h3>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Last obtained degree
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                MSc. Software Engineer
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Certifications
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                AWS Solutions Architect Professional, DevOps Engineer
                Professional
              </dd>
            </div>
          </fieldset>

          <fieldset className='border-2 border-gray-500 p-3 rounded-2xl mb-5'>
            <h3>Technical Data</h3>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Known technologies
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Git, VSCode, TailwindCSS, AWS, GCP
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Programming Languages
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                JavaScript, TypeScript, Python, Java, Go
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Best roles
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Fullstack Developer, DevOps Engineer
              </dd>
            </div>
          </fieldset>

          <fieldset className='border-2 border-gray-500 p-3 rounded-2xl mb-5'>
            <h3>Last Experience</h3>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Company
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Microsoft
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Developed activities
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Architecto culpa cum modi pariatur porro quam ullam? Culpa nemo
                sapiente temporibus.
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Role
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Fullstack Developer
              </dd>
            </div>
          </fieldset>

          <fieldset className='border-2 border-gray-500 p-3 rounded-2xl mb-5'>
            <h3>Previous Experience</h3>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Company
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Google
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Developed activities
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Architecto culpa cum modi pariatur porro quam ullam? Culpa nemo
                sapiente temporibus.
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Role
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Dev Ops Engineer
              </dd>
            </div>
          </fieldset>
        </dl>
      </div>
    </div>
  )
}
