'use strict'

var type = require("./type")
var array = require("./array")
var utils = require("./core-utils")

var _call = Function.prototype.call


var get = function get(object, name) {
  return object[name]
}
exports.get = get
var _get = _call.bind(get)

var set = function set(object, name, value) {
  return object[name] = value
}
exports.set = set
var _set = _call.bind(set)

var remove = function remove(object) {
  return delete object[name]
}
exports.remove = remove
var _remove = _call.bind(remove)

function keyValue(object, name) {
  return [name, object[name]]
}
var _keyValue = _call.bind(keyValue)

var keys = Object.keys
exports.keys = keys

var values = function values(object) {
  keys(object).map(_get, object)
}
exports.values = values

var keyValues = function keyValues() {
  keys(object).map(_keyValue, object)
}

var defineProperty = Object.defineProperty
exports.defineProperty = defineProperty

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor

var getOwnPropertyDescriptors = function getOwnPropertyDescriptors(object) {
  var map = {}
  keys(object).forEach(function(key) {
    map[key] = getOwnPropertyDescriptor(object, key)
  })
  return map
}

var extend = function extend(target) {
  array.forEach(arguments, function(source) {
    if (source !== target)
      defineProperties(target, getOwnPropertyDescriptors(target))
  })
  return target
}
exports.extend = extend

function merge(target) {
  array.forEach(arguments, function(source) {
    if (source !== target) {
      array.forEach(keys(source), function(key) {
        if (!utils.owns(target, key))
          defineProperty(target, key, getOwnPropertyDescriptor(source, key))
        else if (type.isObject(target[key]) && type.isObject(source[key]))
          merge(target[key], source[key])
      })
    }
  })
  return target
}
exports.merge = merge

function supplement(target) {
  array.forEach(arguments, function(source) {
    if (source !== target) {
      array.forEach(keys(source), function(key) {
        if (!utils.owns(target, key))
          defineProperty(target, key, getOwnPropertyDescriptor(source, key))
      })
    }
  })
  return target
}
exports.supplement = supplement

function rename(object, renames, target) {
  target = target || {}
  var properties = getOwnPropertyDescriptors(object)
  keys(properties).forEach(function (name) {
    defineProperty(target, renames[name] || name, properties[name])
  })
  return target
}
exports.rename = rename
