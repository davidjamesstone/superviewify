var through = require('through2')
var superviews = require('superviews.js')

module.exports = function (file, options) {
  if (!/\.html$/i.test(file)) {
    return through()
  }

  return through(function (buf, enc, next) {
    var name = options && options.name ? options.name : 'description'
    var args = options && options.args ? options.args : 'data'

    this.push(superviews(buf, name, args, 'cjs'))

    next()
  })
}
