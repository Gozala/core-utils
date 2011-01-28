// vim:ts=2:sts=2:sw=2:

var isArray = Array.isArray.bind(Array);
exports.isArray = isArray;

function isAtom(thing) {
  return !isFunction(thing) && !isObject(thing)
}
exports.isAtom = isAtom;

function isFunction(thing) {
    return 'function' === typeof thing
}
exports.isFunction = isFunction;

function isObject(thing) {
    return 'object' === typeof thing && null !== thing
}
exports.isObject = isObject;

function isPlainObject(thing) {
    return isObject(thing) &&
           null === Object.getPrototypeOf(Object.getPrototypeOf(thing));
}
exports.isPlainObject = isPlainObject;

function isJSON(value, visited) {
    // Adding value to array of visited values.
    (visited || (visited = [])).push(value);
            // If `value` is an atom return `true` cause it's valid JSON.
    return  isAtom(value) ||
            // If `value` is an array of JSON values that has not been visited
            // yet.
            (isArray(value) &&  value.every(function(element) {
                                  return isJSON(element, visited);
                                })) ||
            // If `value` is a plain object containing properties with a JSON
            // values it's a valid JSON.
            (isPlainObject(value) && Object.keys(value).every(function(key) {
                var $ = Object.getOwnPropertyDescriptor(value, key);
                // Check every proprety of a plain object to verify that
                // it's neither getter nor setter, but a JSON value, that
                // has not been visited yet.
                return  ((!isObject($.value) || !~visited.indexOf($.value)) &&
                        !('get' in $) && !('set' in $) &&
                        isJSON($.value, visited));
            }));
}
exports.isJSON = isJSON
