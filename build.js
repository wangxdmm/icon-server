const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { esbuildDecorators } = require('esbuild-plugin-ts-decorators')
const fs = require('fs')
const path = require('path')

function resolve(file) {
  return path.resolve(__dirname, file)
}

const distDir = resolve('./dist')
const hasDistDir = fs.existsSync(distDir)
if (hasDistDir) {
  fs.rmSync(distDir, { force: true, recursive: true })
}
fs.mkdirSync(distDir)
fs.mkdirSync(`${distDir}/templates`)

// ttf2woff2 need this file to require, but esbuild can not cp this
fs.copyFileSync(
  resolve('./node_modules/ttf2woff2/jssrc/ttf2woff2.wasm'),
  resolve('./dist/ttf2woff2.wasm'),
)

fs.cpSync(resolve('./app/templates'), resolve('./dist/templates'), { recursive: true })

require('esbuild')
  .build({
    entryPoints: ['app.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    plugins: [
      nodeExternalsPlugin({
        dependencies: false,
      }),
      esbuildDecorators(),
    ],
    minify: true,
    sourcemap: false,
    external: ['cors', 'kcors'],
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
