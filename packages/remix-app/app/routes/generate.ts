import type { ActionFunction } from '@remix-run/cloudflare'
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

export let loader = () => {
  return null
}
