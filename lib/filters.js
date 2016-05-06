var path = require("path");
var fs = require('fs');
var async = require('async');
var types = require('./types').getAsArray();
var util = require("./util");

var filters = (function () {
    var ignoreCase = false;
    var invert = false;

    function regexFilter() {
        return new RegExp(arguments[1]).test(arguments[0]);
    }

    function literalFilter() {
        return ~arguments[0].indexOf(arguments[1]);
    }

    /**
     * filter file name based on user params
     * @param {Array.<string>} files
     * @param {string} expression
     * @returns {Array.<string>}
     */
    function fileNameFilter(files, expression) {
        //TODO - need to be refactored
        var isRegexArr, fn;
        // [0] = isRegex?, [1] = expression
        isRegexArr = util.isRegex(expression);
        expression = isRegexArr[1];
        fn = isRegexArr[0] ? regexFilter : literalFilter;

        return files.filter(function (file) {
            try {
                file = path.basename(file);
                return applyParamsOptions(file, expression, fn);
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
     * search Async inside files for pattern matching
     * @param {Array.<string>} files
     * @param {string} expression
     * @param {function} callback
     */
    function fileContentMatch(files, expression, callback) {
        //TODO - need to be refactored
        var isRegexArr, fn, matches = [];
        // [0] = isRegex?, [1] = expression
        isRegexArr = util.isRegex(expression);
        expression = isRegexArr[1];
        fn = isRegexArr[0] ? regexFilter : literalFilter;

        function readFile(file, callback) {
            if (typeof file !== 'string' || !fs.lstatSync(file).isFile() || !util.contains(path.extname(file), types)) {
                callback();
                return;
            }

            fs.readFile(file, 'utf8', function (err, text) {
                var resp =
                    applyParamsOptions(text, expression, fn);

                if (resp) callback(null, file);
                else callback();
            });
        }

        (function chunks(files) {
            if (!files.length)
                return callback(null, matches);

            async.map(files.slice(0, 50), readFile, function (err, result) {
                result = result.filter(function (file) {
                    return file;
                });
                util.atomicPush(matches, result);
                chunks(files.slice(50));
            });
        }(files));
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
        fileNameFilter: fileNameFilter,
        validExtensions: validExtensions,
        fileContentMatch: fileContentMatch
    };

}());


module.exports = filters;
