var through = require('through2')
var superviews = require('superviews.js')

module.exports = function (file, options) {
  if (!/\.html$/i.test(file)) {
    return through()
  }

  return through(function (buf, enc, next) {
    var name = options && options.argstr ? options.argstr : 'data'
    this.push('module.exports = function (' + name + ') {\n' + superviews(buf) + '\n};\n')
    next()
  })
}
