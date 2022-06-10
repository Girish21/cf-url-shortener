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
        <fieldset className='mx-auto flex flex-col gap-4 sm:flex-row'>
          <label htmlFor='url' className='sr-only'>
            URL
          </label>
          <input
            ref={inputRef}
            id='url'
            name='url'
            required
            placeholder='URL...'
            className='flex-1 rounded-md border-2 border-gray-900 px-2 py-3 text-lg shadow-[4px_4px] shadow-gray-900 transition-shadow duration-150 ease-out focus:outline-none dark:border-none dark:shadow-none dark:ring-blue-500 dark:ring-offset-2 dark:ring-offset-transparent dark:focus-visible:ring-2 sm:px-3 sm:py-4 sm:text-xl'
          />
          <button className='rounded-md border-2 border-gray-900 bg-violet-600 px-2 py-3 text-lg font-bold text-white shadow-[5px_5px] shadow-gray-900 transition-shadow duration-150 ease-out focus:outline-none focus-visible:shadow-[7px_7px] focus-visible:shadow-gray-900 dark:border-none dark:ring-blue-500 dark:ring-offset-2 dark:ring-offset-transparent dark:focus-visible:ring-2 sm:px-3 sm:py-4 sm:text-xl'>
            Get URL
          </button>
        </fieldset>
      </RemixForm>
    </div>
  )
}

export default Form
