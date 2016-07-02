var util = require('util');
var path = require('path');
var chalk = require('chalk');

/**
 * transform a string or each element of an array of strings to lowercase
 * @param {Array<string> | string} value
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
 * @param {Array<string>} arr
 * @returns {boolean}
 */
util.contains = function (target, arr) {
    return !arr.every(function(el) {
        return target !== el;
    });
};

util.containsIn = function (target, arr) {
    return !arr.every(function(el) {
        return !~target.indexOf(el);
    });
};

/**
 * push each element of an array to another
 * @param {Array} target
 * @param {Array} arr
 */
util.atomicPush = function (target, arr) {
    if(!arr) return;
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
        if (color) return console.log(chalk[color](text));
        return console.log(text);
    };
};





/**
 * return uniq values of an array
 * **it will not work to array of objects**
 * @param arr
 */
util.uniq = function (arr) {
    return (function uniqr(value, arr, result) {
        if (!arr.length) {
            if (value) {
                result.push(value);
            }
            return result;
        }

        if (!util.contains(value, arr)) {
            result.push(value);
        }

        return uniqr(arr[0], arr.slice(1), result);
    }(arr[0], arr.slice(1), []));
};

/**
 * sort the array of files by the first letter
 * of the base name
 * Note as the array is passed as reference there is no need to return the result
 * @param {Array<string>}files
 */
util.sortByFirstLetter = function (files) {
    files.sort(function (a, b) {
        var firstA = path.basename(a)[0].toLowerCase();
        var firstB = path.basename(b)[0].toLowerCase();
        return firstA > firstB ? 1 : (firstA === firstB ? 0 : -1);
    });
};

module.exports = util;
