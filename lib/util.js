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
        if(color) return console.log(chalk[color](text));
        return console.log(text);
    };
};

/**
 * check if expression is a regex or literal
 * @param {string} expression
 * @returns {boolean}
 */
util.isRegex = function (expression) {
    return (expression[0] === '/' && expression[expression.length - 1] === '/');
};

/**
 * get exact lines that contains expression
 * @param text - target text
 * @param expression - regex expression
 */
util.getMatchedLines = function (text, expression) {
    var result = [];
    var regex = new RegExp(util.getRegex(expression), "gm");
    var reg, line, lineContent, lines;
    while (reg = regex.exec(text)) {
        lines = text.substr(0, reg.index).match(/[\n]/g);
        line = lines ? lines.length + 1 : 1;
        lineContent = text.split('\n')[line - 1];
        if (lineContent) {
            lineContent = lineContent.trim().substr(0, 200);
            result.push(chalk.magenta('  ' + line + ': ') + lineContent);
        }
    }

    return util.uniq(result);
};

/**
 * remove bars  / ... / from statement
 * @param input - regex statement
 * @returns {string}
 */
util.getRegex = function (input) {
    if (input.length > 1 && input[0] === '/' && input[input.length - 1] === '/')
        return input.substring(1, input.length - 1);
    return input;
};

/**
 * return uniq values of an array
 * **it will not work to array of objects**
 * @param arr
 */
util.uniq = function (arr) {
    return (function uniqr(value, arr, result) {
        if (!arr.length) {
            result.push(value);
            return result;
        }

        if (!util.contains(value, arr)) {
            result.push(value);
        }

        return uniqr(arr[0], arr.slice(1), result);
    }(arr[0], arr.slice(1), []));
};

module.exports = util;
