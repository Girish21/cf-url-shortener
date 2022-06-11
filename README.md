# Short URL Generator

[![🧪 CI](https://github.com/Girish21/cf-url-shortener/actions/workflows/ci.yml/badge.svg)](https://github.com/Girish21/cf-url-shortener/actions/workflows/ci.yml) [![🕊 Deploy](https://github.com/Girish21/cf-url-shortener/actions/workflows/deploy.yml/badge.svg)](https://github.com/Girish21/cf-url-shortener/actions/workflows/deploy.yml)

A simple Short URL generator using Cloudflare Workers + KV + Remix.

Checkout the deployed version here [url.vgirish.net](https://url.vgirish.net/).

## Tech Stack

- Remix
- Cloudflare Workers
- Cloudflare KV
- Tailwind CSS
- Turbo Repo
- ESLint
- Prettier

## API

You can also use the API to generate a short URL by making a POST request

<table>
  <thead>
    <tr><th>Client</th><th>Sample Code</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>curl</td>
      <td>
        <pre>
curl -XPOST <https://url.vgirish.net/generate> -H "Content-Type: application/json" -d '{"url": "https://www.google.com/"}'
        </pre>
      </td>
    </tr>
    <tr>
      <td>fetch</td>
      <td>
        <pre>
fetch('https://url.vgirish.net/generate', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({url: "https://www.google.com/"})})
        </pre>
      </td>
    </tr>
  </tbody>
</table>
