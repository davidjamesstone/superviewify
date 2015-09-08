# superviewify
Browserify transform turning [superviews.js](https://github.com/davidjamesstone/superviews.js) template language to Googles' [incremental-dom](https://github.com/google/incremental-dom)


```html
<div title="{data.cls}">
  My name is {data.cls} my age is {data.age}
  I live at {data.address}
  <span title="{=JSON.stringify(data)}">Hi</span>
  <input type="text" value="{data.val}" onchange="{=data.onChange}" style="{ color: data.foo, backgroundColor: data.bar }">
  <p if="data.showName">
    <span style="{= color: data.foo, backgroundColor: data.bar }">{data.name}</span>
    <span class="{data.bar + ' other-css'}">description</span>
    <span>description1</span>
    <input type="text" disabled="{data.isDisabled}" onchange="{function() {}}">
  </p>
  <ul>
    <li each="item in data.items">
      <span>{index}</span>
      <span>{item.name}</span>
      <input value="{item.name}">
    </li>
  </ul>
  <ul>
    <li each="key in data.obj">
      <span>{key}</span>
      <span>{index}</span>
      <span>{data.obj[key]}</span>
    </li>
  </ul>
  <ul>
    <li each="key in data.obj">
      <span>{key}</span>
      <span>{index}</span>
      <span>{this[key]}</span>
    </li>
  </ul>
</div>
```

Running

`browserify template.html -t [superviewify --argstr x,y,z] -o bundle.js`

yields

```js
module.exports = function (x,y,z) {
elementOpen("div", null, null, "title", data.cls)
  text(" \
    My name is " + data.cls + " my age is " + data.age + " \
    I live at " + data.address + " \
    ")
  elementOpen("span", null, ["title", JSON.stringify(data)])
    text("Hi")
  elementClose("span")
  elementOpen("input", null, ["type", "text", "onchange", data.onChange], "value", data.val, "style", { color: data.foo, backgroundColor: data.bar })
  elementClose("input")
  if (data.showName) {
    elementOpen("p")
      elementOpen("span", null, ["style", { color: data.foo, backgroundColor: data.bar }])
        text("" + data.name + "")
      elementClose("span")
      elementOpen("span", null, null, "class", data.bar + ' other-css')
        text("description")
      elementClose("span")
      elementOpen("span")
        text("description1")
      elementClose("span")
      elementOpen("input", null, ["type", "text"], "disabled", data.isDisabled, "onchange", function() {})
      elementClose("input")
    elementClose("p")
  }
  elementOpen("ul")
    ;(Array.isArray(data.items) ? data.items : Object.keys(data.items)).forEach(function(item, index) {
      elementOpen("li", "item in data.items" + index)
        elementOpen("span")
          text("" + index + "")
        elementClose("span")
        elementOpen("span")
          text("" + item.name + "")
        elementClose("span")
        elementOpen("input", null, null, "value", item.name)
        elementClose("input")
      elementClose("li")
    }, data.items)
  elementClose("ul")
  elementOpen("ul")
    ;(Array.isArray(data.obj) ? data.obj : Object.keys(data.obj)).forEach(function(key, index) {
      elementOpen("li", "key in data.obj" + index)
        elementOpen("span")
          text("" + key + "")
        elementClose("span")
        elementOpen("span")
          text("" + index + "")
        elementClose("span")
        elementOpen("span")
          text("" + data.obj[key] + "")
        elementClose("span")
      elementClose("li")
    }, data.obj)
  elementClose("ul")
  elementOpen("ul")
    ;(Array.isArray(data.obj) ? data.obj : Object.keys(data.obj)).forEach(function(key, index) {
      elementOpen("li", "key in data.obj" + index)
        elementOpen("span")
          text("" + key + "")
        elementClose("span")
        elementOpen("span")
          text("" + index + "")
        elementClose("span")
        elementOpen("span")
          text("" + this[key] + "")
        elementClose("span")
      elementClose("li")
    }, data.obj)
  elementClose("ul")
elementClose("div")
};
```
