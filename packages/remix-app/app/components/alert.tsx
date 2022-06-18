import { useActionData } from '@remix-run/react'
import { useMachine } from '@xstate/react'
import svg from 'internal-assets/copy.svg'
import { copyMachine } from 'machines'
import * as React from 'react'
import type { ActionData } from '~/generateUrl'
import { clsx } from '~/utils'

function ClipboardButton({ url }: { url: string }) {
  let machine = React.useMemo(() => copyMachine.withContext({ url }), [url])
  let [state, send] = useMachine(machine)
  let buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return (
    <button
      ref={buttonRef}
      className='ease-outfocus:outline-none relative isolate z-10 flex-shrink-0 overflow-hidden rounded p-2 transition duration-150 hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-md focus:outline-none focus-visible:bg-white focus-visible:bg-opacity-30 focus-visible:backdrop-blur-md'
      title='Copy to Clipboard'
      onClick={() => {
        send('CLICK')
      }}
    >
      <span className='sr-only'>Copy to Clipboard</span>
      <svg className='h-6 w-6'>
        {state.matches('idle') ? (
          <use href={`${svg}#clipboardIcon`} />
        ) : (
          <use href={`${svg}#clipboardSelectedIcon`} />
        )}
      </svg>
    </button>
  )
}

function Error() {
  return (
    <p className='font-bold dark:font-normal'>
      Could not generate a short URL :(
    </p>
  )
}

function ShortUrl({ url }: { url: string }) {
  return (
    <div className='flex items-center justify-between gap-3 sm:gap-6'>
      <p className='flex-1 break-all font-bold dark:font-normal'>
        URL:{' '}
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
          className='font-bold text-indigo-700 underline hover:no-underline focus:no-underline focus:outline-none'
        >
          {url}
        </a>
      </p>
      <ClipboardButton url={url} />
    </div>
  )
}

function Alert() {
  const actionData = useActionData<ActionData>()

  if (!actionData) {
    return null
  }

  return (
    <div
      className={clsx(
        'mx-auto rounded border-2 border-gray-900 p-6 text-lg shadow-[4px_4px] shadow-gray-900 dark:border-none dark:ring-2 dark:ring-offset-2 dark:ring-offset-transparent sm:text-xl',
        'error' in actionData &&
          'bg-pink-600 dark:bg-red-400 dark:ring-red-700',
        'shortUrl' in actionData &&
          'bg-green-400 dark:bg-emerald-500 dark:ring-green-700',
      )}
    >
      {'error' in actionData && <Error />}
      {'shortUrl' in actionData && <ShortUrl url={actionData.shortUrl} />}
    </div>
  )
}

export default Alert
