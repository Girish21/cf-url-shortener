import githubSvg from 'internal-assets/github.svg'
import * as React from 'react'
import { clsx } from '~/utils'

function ExternalLink({
  children,
  href,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={href}
      className={clsx(
        'flex items-center gap-3 rounded border-2 border-gray-900 bg-red-600 px-2 py-2 text-white shadow-[4px_4px] shadow-gray-900 transition duration-150 ease-out focus:outline-none focus-visible:shadow-[6px_6px] focus-visible:shadow-gray-900 dark:border-none dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:bg-opacity-20 dark:hover:backdrop-blur-md dark:focus-visible:bg-white dark:focus-visible:bg-opacity-20 dark:focus-visible:ring-2 dark:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-transparent dark:focus-visible:backdrop-blur-md',
        className,
      )}
    >
      {children}
    </a>
  )
}

function Footer() {
  return (
    <footer className='app-width fixed bottom-0 left-0 right-0 mx-auto'>
      <div className='flex flex-col-reverse items-center justify-evenly gap-4 py-4 sm:flex-row sm:gap-0 md:justify-start'>
        <ExternalLink
          className='hidden md:flex'
          href='https://chrome.google.com/webstore/detail/tiny-url-generator/bgcjbhljdllbeeodcoefbcmbgghmpkdl'
        >
          <span>Browser Extension</span>
        </ExternalLink>
        <span className='md:mx-auto'>
          Made with ❤️ by{' '}
          <a
            rel='noreferrer'
            target='_blank'
            href='https://twitter.com/girishk21'
            className='underline underline-offset-2 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-blue-500'
          >
            Girish
          </a>
        </span>
        <ExternalLink
          className='md:ml-auto'
          href='https://github.com/Girish21/cf-url-shortener'
        >
          <span>GitHub</span>
          <svg className='h-6 w-6 fill-current'>
            <use href={`${githubSvg}#github-icon`} />
          </svg>
        </ExternalLink>
      </div>
    </footer>
  )
}

export default Footer
