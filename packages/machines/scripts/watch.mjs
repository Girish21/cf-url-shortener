import * as chokiadr from 'chokidar'
import { buildCJS, buildESM } from './build-config.mjs'

async function watch() {
  chokiadr.watch('./machines').on('all', async () => {
    console.error('🔔 rebuild')

    let start = Date.now()

    await Promise.all([buildCJS(), buildESM()])

    console.error(`✅ rebuild complete in ${Date.now() - start} ms`)
  })
}

watch().catch(console.error)
