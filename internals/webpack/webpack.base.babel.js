/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: options.babelQuery
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap&importLoaders=1',
        'postcss-loader',
        'sass-loader?sourceMap'
      ]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      exclude: /images/,
      loader: 'file-loader'
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.svg/,
      include: /images/,
      loader: 'svg-url-loader'
    }]
  },
  plugins: options.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          data: '@import "app/styles/settings/_settings.scss";',
          includePaths: 'app/styles'
        },
        context: path.resolve(__dirname, '../../') // must evaluate to root of project
      }
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js'
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ]
  },
  devtool: options.devtool,
  target: 'web' // Make web variables accessible to webpack, e.g. window
})
