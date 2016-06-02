# superviewify
Browserify transform turning [superviews.js](https://github.com/davidjamesstone/superviews.js) template language to Google's [incremental-dom](https://github.com/google/incremental-dom)

## Transform options
- `name` `String`
  - default: 'description'
- `args` `String`
  - default: 'data'

## Example
`browserify template.html -t [superviewify] -o bundle.js`
