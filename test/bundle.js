(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var template = require('./template.html')

},{"./template.html":2}],2:[function(require,module,exports){
module.exports = function (data) {
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

},{}]},{},[1]);
