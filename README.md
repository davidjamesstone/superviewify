# superviewify
Browserify transform turning [superviews.js](https://github.com/davidjamesstone/superviews.js) template language to Google's [incremental-dom](https://github.com/google/incremental-dom)

## Transform options
- `name` `String`
  - default: 'description'
- `args` `String`
  - default: 'data'
- `insertidom` `Boolean`
  - Include incremental-dom imports e.g. `var idom = require('incremental-dom')` in the output
  - default: true

## Example
`browserify template.html -t [superviewify --args x,y,z] -o bundle.js`
