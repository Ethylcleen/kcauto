const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, 'src');
const modulesPath = path.join(__dirname, '..', 'node_modules');
const outputPath = path.join(__dirname, '..', 'docs');

module.exports = (env, argv) => {
  const pluginsArray = [new webpack.DefinePlugin({
    'process.version': JSON.stringify(process.env.npm_package_version),
  })];
  if (argv.mode === 'production') {
    pluginsArray.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }))
    pluginsArray.push(new webpack.optimize.UglifyJsPlugin());
}

  return {
    entry: srcPath + '/index.jsx',
    output: {
      path: outputPath,
      filename: 'bundle.js',
      sourceMapFilename: '[file].map?[contenthash]'
    },
    plugins: pluginsArray,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [srcPath],
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          include: [modulesPath],
          use: [
            'style-loader',
            'css-loader'
          ]
        },
      ]
    },
    resolve: {
      modules: [srcPath, modulesPath],
      extensions: ['.js', '.jsx', '.css']
    },
    devtool: 'source-map'
  }
};
