const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node10.4',
  outfile: 'build/index.js',
  plugins: [nodeExternalsPlugin()],
});
