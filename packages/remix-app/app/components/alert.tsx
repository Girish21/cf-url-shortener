import { useActionData } from '@remix-run/react'
import { useMachine } from '@xstate/react'
import * as React from 'react'
import { createMachine } from 'xstate'
import svg from '~/assets/svgs.svg'
import type { ActionData } from '~/root'
import { clsx } from '~/utils'

let copyMachine = createMachine(
  {
    id: 'copy button',
    initial: 'idle',
    schema: { context: {} as TContext, events: {} as TEvents },
    states: {
      idle: {
        on: {
          CLICK: 'copying',
        },
      },
      copying: {
        entry: 'copy',
        after: {
          2000: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      copy: async ctx => {
        await window.navigator.clipboard.writeText(ctx.url)
      },
    },
  },
)

function ClipboardButton({ url }: { url: string }) {
  let machine = React.useMemo(() => copyMachine.withContext({ url }), [url])
  let [state, send] = useMachine(machine)

  return (
    <button
      className='flex-shrink-0 rounded p-2 overflow-hidden isolate z-10 relative after:transition after:duration-150 after:ease-out after:content-[""] after:inset-0 hover:after:bg-gray-100 hover:after:bg-opacity-50 after:blur-lg after:absolute after:saturate-150'
      title='Copy to Clipboard'
      onClick={() => {
        send('CLICK')
      }}
    >
      <svg className='w-6 h-6'>
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
  return <p>Could not generate a short URL :(</p>
}

function ShortUrl({ url }: { url: string }) {
  return (
    <div className='flex items-center justify-between gap-3 sm:gap-6'>
      <p className='flex-1 break-all font-bold dark:font-normal'>
        Shortened URL:{' '}
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
          className='font-bold underline hover:no-underline text-indigo-700'
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
        'mt-[10vh] mx-auto p-6 text-lg sm:text-xl shadow-[4px_4px] border-2 border-gray-900 dark:border-none shadow-gray-900 rounded dark:ring-2 dark:ring-offset-2 dark:ring-offset-transparent',
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

type TContext = {
  url: string
}

type TEvents = {
  type: 'CLICK'
}
