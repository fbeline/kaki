var util = require('util');
var chalk = require('chalk');

util.toLower = function (value) {
    if (util.isArray(value)) {
        return value.map(function (el) {
            return el.toLowerCase();
        });
    }
    return value.toLowerCase();
};

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
 * @returns {*[boolean, string]}
 */
util.isRegex = function(expression) {
    function getRegex(input) {
        return input.substring(1, input.length - 1);
    }

    if (expression[0] === '/' && expression[expression.length-1] === '/')
        return [true, getRegex(expression)];
    return [false, expression];
};


module.exports = util;
