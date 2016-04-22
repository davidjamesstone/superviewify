var through = require('through2')
var superviews = require('superviews.js')

var header = 'var IncrementalDOM = require(\'incremental-dom\')\n' +
'var patch = IncrementalDOM.patch\n' +
'var elementOpen = IncrementalDOM.elementOpen\n' +
'var elementVoid = IncrementalDOM.elementVoid\n' +
'var elementClose = IncrementalDOM.elementClose\n' +
'var skip = IncrementalDOM.skip\n' +
'var currentElement = IncrementalDOM.currentElement\n' +
'var text = IncrementalDOM.text\n\n'

module.exports = function (file, options) {
  if (!/\.html$/i.test(file)) {
    return through()
  }

  return through(function (buf, enc, next) {
    var name = options && options.name ? options.name : 'description'
    var args = options && options.args ? options.args : 'data'
    var idom = options && options.insertidom ? options.insertidom : true
    var output = 'module.exports = ' + superviews(buf, name, args).slice(1) + ';\n'

    if (idom) {
      output = header + output
    }

    this.push(output)

    next()
  })
}
