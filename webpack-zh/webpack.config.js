const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  mode: 'production',

  output: {
    filename: '[id].[chunkhash:8].js'
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        common: {
          automaticNamePrefix: 'common',
          priority: 1,
          chunks: "initial"
        },
        'module-1': {
          automaticNamePrefix: 'module1',
          priority: 2,
          chunks: "initial"
        },
        'module-2': {
          automaticNamePrefix: 'module2',
          priority: 3,
          chunks: "initial"
        },
        vendor: {
          automaticNamePrefix: 'vendors',
          priority: 10,
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    },
  },
  plugins: [ 
    new webpack.NamedChunksPlugin((chunk) => { 
      if (chunk.name) { 
        return chunk.name; 
      } 
      return chunk.modules.map(m => path.relative(m.context, m.request)).join("_"); 
    }), 
  ]
  
}
