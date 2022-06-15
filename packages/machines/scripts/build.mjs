import { buildCJS, buildESM } from './build-config.mjs'

async function build() {
  let start = Date.now()

  await Promise.all([
    buildESM({ env: 'production' }),
    buildCJS({ env: 'production' }),
  ])

  console.error(`✅ build complete in ${Date.now() - start}ms`)
}

build().catch(console.error)
