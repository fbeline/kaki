var util = require('util');
var chalk = require('chalk');

/**
 * transform a string or each element of an array of strings to lowercase
 * @param {Array | string} value
 * @returns {*}
 */
util.toLower = function (value) {
    if (util.isArray(value)) {
        return value.map(function (el) {
            return el.toLowerCase();
        });
    }
    return value.toLowerCase();
};

/**
 * verify if exists a element in an array that is equal target
 * @param target
 * @param {Array} arr
 * @returns {boolean}
 */
util.contains = function (target, arr) {
    for (var i = 0, max = arr.length; i < max; i++) {
        if (target === arr[i]) {
            return true;
        }
    }
    return false;
};

util.containsIn = function (target, arr) {
    for (var i = 0, max = arr.length; i < max; i++) {
        if (~target.indexOf(arr[i])) {
            return true;
        }
    }
    return false;
};

/**
 * push each element of an array to another
 * @param {Array} target
 * @param {Array} arr
 */
util.atomicPush = function (target, arr) {
    arr.forEach(function (item) {
        target.push(item);
    });
};

/**
 * log screen collored formatted data
 * -- curry style --
 * @returns {Function} color to be
 */
util.print = function () {
    var text = util.format.apply(null, Array.prototype.slice.call(arguments, 0));
    return function (color) {
        console.log(chalk[color](text));
    };
};

/**
 * check if expression is a regex or literal
 * @param {string} expression
 * @returns {boolean}
 */
util.isRegex = function(expression) {
    return (expression[0] === '/' && expression[expression.length - 1] === '/');
};


module.exports = util;
