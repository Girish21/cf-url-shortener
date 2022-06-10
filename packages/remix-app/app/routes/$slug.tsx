import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'

export let loader: LoaderFunction = async ({ context, params }) => {
  let slug = params['slug']

  if (!slug) {
    return json({ error: 'Invalid URL' }, { status: 404 })
  }

  let url = await context.env.URL_MAPPING.get(slug)

  if (!url) {
    return json({ error: 'Invalid URL' }, { status: 404 })
  }

  return redirect(url)
}
