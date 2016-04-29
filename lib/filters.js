var path = require("path");
var util = require("./util");

String.prototype.contains = function (arr) {
};

var filters = (function () {
    var ignoreCase = false;
    var invert = false;

    /**
     * return literal matches
     * @param {Array.<string>} files
     * @param {String} literal
     * @returns {Array.<string>}
     */
    function literalMatch(files, literal) {
        try {
            return files.filter(function (file) {
                file = path.basename(file);
                return applyParamsOptions(file, literal, function () {
                    return arguments[0] === arguments[1];
                });
            });
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * return whole word or regex match
     * @param {Array.<string>} files
     * @param {string} regex
     * @returns {Array.<string>}
     */
    function wordRegexMatch(files, regex) {
        return files.filter(function (file) {
            try {
                file = path.basename(file);
                return applyParamsOptions(file, regex, function () {
                    return new RegExp(arguments[1]).test(arguments[0]);
                });
            } catch (ex) {
                throw ex;
            }
        });
    }

    /**
     * return files that has a selected extension
     * @param {Array.<string>} files
     * @param {Array.<string>} extensions
     * @returns {Array.<string>}
     */
    function validExtensions(files, extensions) {
        try {
            if (!extensions.length) {
                return files;
            }

            return files.filter(function (file) {
                file = path.extname(file);
                return applyParamsOptions(file, extensions, util.contains);
            });
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * configure filters options
     * @param {boolean} ignorecase
     * @param {boolean} invertMatch
     */
    function configure(ignorecase, invertMatch) {
        ignoreCase = ignorecase;
        invert = invertMatch;
    }

    /**
     * apply params options to filters
     * @param {string} file
     * @param {string | Array} expression
     * @param {function} fn - function that contains the rules to apply the filter
     * @returns {boolean}
     */
    function applyParamsOptions(file, expression, fn) {
        if (ignoreCase) {
            file = util.toLower(file);
            expression = util.toLower(expression);
        }

        return invert ?
            !fn(file, expression) :
            fn(file, expression);
    }

    return {
        configure: configure,
        wordRegexMatch: wordRegexMatch,
        literalMatch: literalMatch,
        validExtensions: validExtensions
    };

}());


module.exports = filters;