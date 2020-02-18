const path = require('path');
const webpack = require('webpack');
// https://juejin.im/post/5cdfb48fe51d4510ac6721b7
module.exports = {
  entry: {
    main: './src/index.js',
    'module1~main': './src/module-1/index.js',
    'module2~main': './src/module-2/index.js',
  },
  mode: 'production',
  output: {
    filename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        common: {
          test: /\.js$/,
          name: 'common~main',
          chunks: 'initial',
          minChunks: 1,
          minSize: 0
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors~main',
          chunks: 'all',
          minChunks: 1,
          minSize: 0,
          priority: 1
        }
      }
    },
  },
  plugins: [
    // new webpack.HashedModuleIdsPlugin({
    //   hashDigest: 'hex'
    // }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
    }),
  ]

}