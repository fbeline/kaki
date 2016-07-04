var regex = require('./regex');
var util = require('./util');
var chalk = require('chalk');

var finder = (function () {

    /**
     * get exact lines that contains expression
     * @param {string} text - target text
     * @param {string} expression - regex expression
     */
    function execute (text, expression, options) {
        var result = [];
        var totalMatches = 0;
        var regExpModifiers = 'gm' + (options.ignoreCase ? 'i' : '');
        var matches = regex.successiveMatches(expression, regExpModifiers, text);
        var matchesInfo = _handleMatches(text, matches);

        Object.keys(matchesInfo).forEach(function(l) {
            var lineInfo = matchesInfo[l];
            var indexes = _getIndexes(lineInfo);
            var highLightedLine = _highLightMatch(lineInfo.value, indexes);
            result.push(chalk.magenta(' ' + l +  ': ') + highLightedLine);
            totalMatches += lineInfo.matches.length;
        });

        return [result, totalMatches];
    }

    /**
     * get line numnber and related matches
     * @param {string} text
     * @param match - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Description
     * @returns
     */
    function _handleMatches(text, matches) {
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
    function _getIndexes(lineInfo) {
        var indexes = [];
        var uniqMatches = util.uniq(lineInfo.matches);
        uniqMatches.forEach(function(match) {
            match = regex.toString(match);
            var res = new RegExp(match, 'gm');
            while ((reg = res.exec(lineInfo.value)) !== null) {
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
    function _highLightMatch(text, indexesInfo) {
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

    return execute;
}());

module.exports = finder;
