import * as esbuild from 'esbuild'

export async function buildESM({ env } = {}) {
  await esbuild.build({
    entryPoints: ['./index.ts'],
    bundle: true,
    minify: env === 'production',
    format: 'esm',
    outfile: './dist/index.esm.js',
    treeShaking: true,
  })
}

export async function buildCJS({ env } = {}) {
  await esbuild.build({
    entryPoints: ['./index.ts'],
    bundle: true,
    minify: env === 'production',
    format: 'cjs',
    outfile: './dist/index.cjs.js',
    treeShaking: true,
  })
}
