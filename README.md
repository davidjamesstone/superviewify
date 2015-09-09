# superviewify
Browserify transform turning [superviews.js](https://github.com/davidjamesstone/superviews.js) template language to Googles' [incremental-dom](https://github.com/google/incremental-dom)


```html
<!--
`script` tags without a `src` attribute are treated as literal javascript
and will be simply inlined into the incremental-dom output. Here's an example
using browserify to require some other compiled template that we can use later
to render sub components. We also write a few functions to be used as event handlers.
-->
<script>
var linesSummary = require('./lines-summary')
var totalSummary = require('./total-summary')

var items = []
function add (item) {
  items.push(item)
}

function remove () {
  items.pop()
}
</script>

<!-- Attributes can be set using javascript between curly braces {} -->
<div title="{data.title}">

<!-- If an Attribute value is known not
to change include an equals sign '='.
This assigns a staticPropertyValue
and is set-once evaluation. Do this to save
time during diff patch updates. -->
<div class="{=data.cssClass}"></div>

<!-- Text Interpolation is done using {} -->
My name is {data.name} my age is {data.age}
I live at {data.address}

<!-- Any javascript can be used -->
<span title="{JSON.stringify(data)}">Hi</span>

<!-- `on` events can be bound to model handlers. These follow the
same rules as any other attributes but add a fat arrow shortcut to
define a staticPropertyValue function-->
<input type="text" value="{data.val}" onchange="{=data.onChange}">
<input type="text" value="{data.val}" onchange="{= function(e) { data.val = this.value }}">
<!-- The following is equivalent to the line above -->
<input type="text" value="{data.val}" onchange="{=> data.val = this.value }">
<!-- This adds an event handler to the function 'remove' defined locally above -->
<button onclick="{=remove}"></button>

<!-- Use an `if` attribute for conditional rendering -->
<p if="data.showMe">
  <span class="{data.bar + ' other-css'}">description</span>
  <input type="text" disabled="{data.isDisabled}">
</p>

<!-- An `if` tag can also be used for conditional rendering
by adding a condition attribute. The 'if' tag itself is not rendered
to the output, only the contents if the condition is truthy. -->
<if condition="data.showMe">
  I'm in an `if` attribute {basket.totalCost}
</if>

<!-- The `style` attribute is special and can be set with an object.
If the data is known not to change, again, use the equals sign.-->
<span style="{ color: data.foo, backgroundColor: data.bar }">My style changes</span>
<span style="{= color: data.foo, backgroundColor: data.bar }">My style doesn't change</span>

<!-- The `each` attribute declares a forEach
block and can be used to repeat over items in
an Array or keys on an Object. The $index can be
used to reference the current index in the loop. -->
<ul>
  <li each="item in data.items">
    <span class="{ $index % 2 ? 'odd' : 'even' }">{$index}</span>
    <span>{item.foo}</span>
    <input value="{item.name}">
  </li>
</ul>

<!-- Looping over arrays -->
<ul>
  <li each="item in data.arr">
    <span>{item}</span>
    <span>{$index}</span>
    <span>{data.arr[item]}</span>
  </li>
</ul>

<!-- Looping over object keys -->
<ul>
  <li each="key in data.obj">
    <span>{key}</span>
    <span>{$index}</span>
    <!-- `this` can also be used in `each` blocks -->
    <span>{this[key]}</span>
  </li>
</ul>

<!-- The `each` attribute also supports defining a `key` to use.
This should be set to identify each item in the list. This allow
the diff patch in to keep track of each item in the list.
See http://google.github.io/incremental-dom/#conditional-rendering/array-of-items
 -->
<ul>
  <li each="product, product.id in data.products">
  </li>
</ul>

</div>
```

Running

`browserify template.html -t [superviewify --argstr x,y,z] -o bundle.js`

yields

```js
module.exports = function (x,y,z) {
  var linesSummary = require('./lines-summary')
  var totalSummary = require('./total-summary')

  var items = []
  function add (item) {
    items.push(item)
  }

  function remove () {
    items.pop()
  }

  elementOpen("div", null, null, "title", data.title)
    elementOpen("div", null, ["class", data.cssClass])
    elementClose("div")
    text(" \
    My name is " + data.name + " my age is " + data.age + " \
    I live at " + data.address + " \
     \
    ")
    elementOpen("span", null, null, "title", JSON.stringify(data))
      text("Hi")
    elementClose("span")
    elementOpen("input", null, ["type", "text", "onchange", data.onChange], "value", data.val)
    elementClose("input")
    elementOpen("input", null, ["type", "text", "onchange",  function(e) { this.val = val }], "value", data.val)
    elementClose("input")
    elementOpen("input", null, ["type", "text", "onchange", function (e) { this.val = val }], "value", data.val)
    elementClose("input")
    elementOpen("button", null, ["onclick", remove])
    elementClose("button")
    if (data.showMe) {
      elementOpen("p")
        elementOpen("span", null, null, "class", data.bar + ' other-css')
          text("description")
        elementClose("span")
        elementOpen("input", null, ["type", "text"], "disabled", data.isDisabled)
        elementClose("input")
      elementClose("p")
    }
    if (data.showMe) {
      text(" \
        I'm in an `if` attribute " + basket.totalCost + " \
      ")
    }
    elementOpen("span", null, null, "style", { color: data.foo, backgroundColor: data.bar })
      text("My style changes")
    elementClose("span")
    elementOpen("span", null, ["style", { color: data.foo, backgroundColor: data.bar }])
      text("My style doesn't change")
    elementClose("span")
    elementOpen("ul")
      ;(Array.isArray(data.items) ? data.items : Object.keys(data.items)).forEach(function(item, $index) {
        elementOpen("li", $index)
          elementOpen("span", null, null, "class",  $index % 2 ? 'odd' : 'even' )
            text("" + $index + "")
          elementClose("span")
          elementOpen("span")
            text("" + item.foo + "")
          elementClose("span")
          elementOpen("input", null, null, "value", item.name)
          elementClose("input")
        elementClose("li")
      }, data.items)
    elementClose("ul")
    elementOpen("ul")
      ;(Array.isArray(data.arr) ? data.arr : Object.keys(data.arr)).forEach(function(item, $index) {
        elementOpen("li", $index)
          elementOpen("span")
            text("" + item + "")
          elementClose("span")
          elementOpen("span")
            text("" + $index + "")
          elementClose("span")
          elementOpen("span")
            text("" + data.arr[item] + "")
          elementClose("span")
        elementClose("li")
      }, data.arr)
    elementClose("ul")
    elementOpen("ul")
      ;(Array.isArray(data.obj) ? data.obj : Object.keys(data.obj)).forEach(function(key, $index) {
        elementOpen("li", $index)
          elementOpen("span")
            text("" + key + "")
          elementClose("span")
          elementOpen("span")
            text("" + $index + "")
          elementClose("span")
          elementOpen("span")
            text("" + this[key] + "")
          elementClose("span")
        elementClose("li")
      }, data.obj)
    elementClose("ul")
    elementOpen("ul")
      ;(Array.isArray(data.products) ? data.products : Object.keys(data.products)).forEach(function(product, $index) {
        elementOpen("li", product.id)
        elementClose("li")
      }, data.products)
    elementClose("ul")
  elementClose("div")
}
```
