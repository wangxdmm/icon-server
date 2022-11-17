const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { esbuildDecorators } = require('esbuild-plugin-ts-decorators')

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
    external: ['cors', 'kcors'],
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
