import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import generateUrl from '~/generateUrl'

export let action: ActionFunction = ({ context, request }) => {
  return generateUrl({
    context,
    getUrl: async request => {
      let json = await request.json<{ url: string }>()
      if (json !== null && typeof json === 'object' && 'url' in json) {
        let url = json['url']

        return url
      }
      return null
    },
    request,
  })
}

export let loader: LoaderFunction = ({ request }) => {
  if (request.method === 'OPTIONS') {
    return json(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
  return null
}
