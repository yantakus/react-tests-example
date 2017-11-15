var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3'
]

module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: COMPATIBILITY })
  ]
}
