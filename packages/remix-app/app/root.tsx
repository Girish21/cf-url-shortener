import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
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

export let meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
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
  let formData = await request.formData()
  let url = formData.get('url')
  let origin = new URL(request.url).origin

  if (!url || typeof url !== 'string') {
    return json<ActionData>(
      { error: 'Invalid URL', status: 400 },
      { status: 400 },
    )
  }

  try {
    new URL(url)
  } catch {
    return json<ActionData>(
      { error: 'Invalid URL', status: 400 },
      { status: 400 },
    )
  }

  let slug = await (await fetch('https://uuid.rocks/nanoid')).text()

  await context.env.URL_MAPPING.put(slug, url)

  return json<ActionData>({ shortUrl: `${origin}/${slug}` })
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

export type ActionData =
  | { error: string | null; status: number }
  | { shortUrl: string }
