(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var template = require('./template.html')

},{"./template.html":2}],2:[function(require,module,exports){
module.exports = function (model) {
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
  elementOpen("input", null, ["type", "text", "onchange",  function(e) { data.val = this.value }], "value", data.val)
  elementClose("input")
  elementOpen("input", null, ["type", "text", "onchange", function (e) { data.val = this.value }], "value", data.val)
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
};

},{}]},{},[1]);
