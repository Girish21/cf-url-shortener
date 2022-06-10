import { Form as RemixForm } from '@remix-run/react'
import * as React from 'react'

function Form() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className='pt-[10vh]'>
      <RemixForm method='post'>
        <fieldset className='flex flex-col sm:flex-row gap-4 mx-auto'>
          <label htmlFor='url' className='sr-only'>
            URL
          </label>
          <input
            ref={inputRef}
            id='url'
            name='url'
            required
            placeholder='URL...'
            className='rounded-md px-2 py-3 sm:px-3 sm:py-4 flex-1 shadow-[4px_4px] border-2 border-gray-900 dark:border-none shadow-gray-900 dark:shadow-none focus:outline-none dark:focus-visible:ring-2 dark:ring-blue-500 dark:ring-offset-2 dark:ring-offset-transparent text-lg sm:text-xl transition-shadow duration-150 ease-out'
          />
          <button className='bg-violet-600 text-white font-bold rounded-md px-2 py-3 sm:px-3 sm:py-4 focus:outline-none dark:focus-visible:ring-2 dark:ring-offset-2 dark:ring-offset-transparent dark:ring-blue-500 text-lg sm:text-xl shadow-[5px_5px] focus-visible:shadow-[7px_7px] transition-shadow duration-150 ease-out shadow-gray-900 focus-visible:shadow-gray-900 border-2 border-gray-900 dark:border-none'>
            Get URL
          </button>
        </fieldset>
      </RemixForm>
    </div>
  )
}

export default Form
