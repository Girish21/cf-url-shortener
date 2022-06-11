import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import svg from '~/assets/svgs.svg'
import styles from '~/styles/app.css'
import Alert from './components/alert'
import Container from './components/container'
import Form from './components/form'
import Text from './components/text'
import generateUrl from './generateUrl'

export let meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Tiny URL Generator',
  description: 'Generate a tiny URL. Buit with Remix and Cloudflare Workers.',
  keywords:
    'url shortner, url generator, remix, remix run, remix_run, cloudflare, cloudflare workers, kv, edge, tiny url, tiny url generator',
  viewport: 'width=device-width,initial-scale=1',
  'color-scheme': 'dark light',
})

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preload',
    href: '/fonts/Raleway-Regular.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Raleway-Bold.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: svg,
    as: 'image',
    type: 'image/svg+xml',
  },
]

export let action: ActionFunction = async ({ context, request }) => {
  return generateUrl({
    context,
    getUrl: async request => {
      let formData = await request.formData()
      let url = formData.get('url')

      return url
    },
    request,
  })
}

export default function App() {
  return (
    <html lang='en' className='bg-yellow-100 dark:bg-slate-900'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Container>
          <Text />
          <Form />
          <Alert />
        </Container>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
