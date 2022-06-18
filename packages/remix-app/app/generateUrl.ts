import { json } from '@remix-run/cloudflare'

async function generateUrl({
  context,
  request,
  getUrl,
}: {
  context: LoadContext
  request: Request
  getUrl: (request: Request) => Promise<FormDataEntryValue | string | null>
}) {
  let url = await getUrl(request)
  let { origin } = new URL(request.url)

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

  let nanoidUrl = new URL('https://uuid.rocks/nanoid')
  nanoidUrl.searchParams.set('len', '10')

  let nanoidRequest = new Request(nanoidUrl)
  let slug = await (await fetch(nanoidRequest)).text()

  if (!slug) {
    return json<ActionData>(
      {
        error: `You're rate limited. Try again in a few minutes.`,
        status: 429,
      },
      { status: 429 },
    )
  }

  await context.env.URL_MAPPING.put(slug, url)

  return json<ActionData>({ shortUrl: `${origin}/${slug}` })
}

export default generateUrl

export type ActionData =
  | { error: string | null; status: number }
  | { shortUrl: string }
