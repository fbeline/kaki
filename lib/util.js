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
 * get exact lines that contains expression
 * @param {string} text - target text
 * @param {string} expression - regex expression
 */
util.getMatchedLines = function (text, expression, options) {
    var result = [];
    var totalMatches = 0;
    var regExpModifiers = 'gm' + (options.ignoreCase ? 'i' : '');
    var matches = util.successiveMatches(expression, regExpModifiers, text);
    var matchesInfo = handleMatches(text, matches);

    Object.keys(matchesInfo).forEach(function(l) {
        var lineInfo = matchesInfo[l];
        var indexes = getIndexes(lineInfo);
        var highLightedLine = highLightMatch(lineInfo.value, indexes);
        result.push(chalk.magenta(' ' + l +  ': ') + highLightedLine);
        totalMatches += lineInfo.matches.length;
    });

    return [result, totalMatches];

    /**
     * get line numnber and related matches
     * @param {string} text
     * @param match - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Description
     * @returns
     */
    function handleMatches(text, matches) {
        // {10: {value: "....", matches: [.., ..], 20: ..., 23: ... }}
        var result = Object.create(null);
        matches.forEach(function(match) {
            var lines = text.substr(0, match.index).match(/[\n]/g);
            var lineNo = lines ? lines.length + 1 : 1; //get the line number
            var lineContent = text.split('\n')[lineNo - 1];

            if (!lineContent) return;

            result[lineNo] = result[lineNo] ||  {};
            result[lineNo].matches = result[lineNo].matches || [];

            result[lineNo].value = lineContent.trim();
            result[lineNo].matches.push(match[0]);
        });
        return result;
    }

    /**
     * get first and last index of each match by line
     * @param {Object} lineInfo - line infomation {10: {line: "...", macthes: ["ban", "banana"]}}
     * @returns {Array} - [ [0, 10], [25, 30] ]
     */
    function getIndexes(lineInfo) {
        var indexes = [];
        var uniqMatches = util.uniq(lineInfo.matches);
        uniqMatches.forEach(function(match) {
            var regex = new RegExp(match, 'g');
            while ((reg = regex.exec(lineInfo.value)) !== null) {
                indexes.push([reg.index, reg.index + reg[0].length]);
            }
        });
        return indexes;
    }

    /**
     * return line with matches highlighted
     * @param {string} text
     * @param {Array} indexesInfo
     * @returns {string}
     */
    function highLightMatch(text, indexesInfo) {
        indexesInfo.forEach(function(indexInfo, pos){
            var index = indexInfo[0] + (pos*10);
            var lastIndex = indexInfo[1] + (pos*10);

            text =
                text.substring(0, index) +
                chalk.bgRed(text.substring(index, lastIndex)) +
                text.substring(lastIndex, text.length);
        });
        return text;
    }
};

/**
 * check if expression is a regex or literal
 * @param {string} expression
 * @returns {boolean}
 */
util.isRegex = function (expression) {
    return (expression[0] === '/' && expression[expression.length - 1] === '/');
};

util.successiveMatches = function(expression, modifiers, text)  {
    var matches = [];
    var regex = new RegExp(util.getRegex(expression), modifiers);
    while ((reg = regex.exec(text)) !== null) {
        matches.push(reg);
    }
    return matches;
};

/**
 * remove bars  / ... / from statement
 * @param {string} input - regex statement
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
