'use strict'

if (!("bind" in Function.prototype))
  Function.prototype.bind = function bind() {
    var bound = this
    var boundArgs = Array.prototype.slice.call(arguments)
    return function anonymous() {
      var self, args
      args = boundArgs.concat(Array.prototype.slice.call(arguments))
      if (this instanceof anonymous) {
        self = Object.create(bound.prototype)
        return bound.apply(self, args) || self
      } else {
        return bound.call.apply(bound, args)
      }
    }
  }

var _call = Function.prototype.call
var _apply = Function.prototype.apply

/**
 * Calls given `callee` with a given `scope` as `this` pseudo-variable
 * and `args` as an arguments.
 * @param {Function} callee
 *    Function to call
 * @param {Object} scope
 *    `this` pseudo-variable in the callee's lexical scope.
 * @param {[]} args
 *    arguments passed to the callee
 */
var apply = _call.bind(_apply)
exports.apply = apply

/**
 * Calls given `callee` and passes given `scope` argument as `this`
 * pseudo-variable and all the rest arguments are passed as an
 * arguments.
 * @param {Function} callee
 *    Function to call
 * @param {Object} scope
 *    `this` pseudo-variable in the callee's lexical scope.
 * @params
 *    All the rest arguments are passed to the callee.
 */
var call = _call.bind(_call)
exports.call = call

// Binds `callee` to the given `scope` as `this` pseudo-variable
// and rest arguments.
var bind = _call.bind(Function.prototype.bind)
exports.bind = bind

var owns = _call.bind(Object.prototype.hasOwnProperty)
exports.owns = owns

function has(object, name) {
  return name in object
}
exports.has = has


