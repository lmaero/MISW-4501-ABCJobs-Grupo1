import Link from 'next/link'

export default function CompleteSignUpPage() {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              React Test
            </h2>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                What is JSX?
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the most appropriate definition
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
                    An extension of JavaScript
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
                    Fancy HTML
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='frontend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Another library of the JS ecosystem
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='frontend-developer'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JavaScript XML
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                What is the purpose of JSX in React applications?
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the most appropriate definition
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-purpose'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-purpose-extension'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    An extension of JavaScript
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-purpose'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-purpose-html'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Fancy HTML
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-purpose'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-purpose-library'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Another library of the JS ecosystem
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-purpose'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-purpose-xml'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JavaScript XML
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                How does JSX differ from regular HTML?
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the most appropriate difference
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-difference'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-difference-syntax'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Syntax and usage of curly braces {'{}'}
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-difference'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-difference-tags'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JSX uses component-based tags
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-difference'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-difference-rendering'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JSX is rendered in the browser
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-difference'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-difference-css'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    JSX includes CSS styles
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                What role does the "className" attribute play in JSX elements?
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the most appropriate explanation
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-classname'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-classname-styles'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Defines inline styles for JSX elements
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-classname'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-classname-identifiers'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Specifies CSS class names for styling JSX elements
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-classname'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-classname-behavior'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Determines the behavior of JSX elements
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className='mt-10'>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                In the given code, what is the significance of using radio input
                elements with the same "name" attribute within the JSX fieldset?
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Select the most appropriate explanation
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-significance'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-significance-validation'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    It's used for form validation
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-significance'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-significance-styling'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    It groups radio options together for selection
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    name='jsx-significance'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                  />
                  <label
                    htmlFor='jsx-significance-event'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    It triggers a JavaScript event on selection
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link
            href='/dashboard/tests/sending'
            className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            Send
          </Link>
        </div>
      </form>
    </div>
  )
}
