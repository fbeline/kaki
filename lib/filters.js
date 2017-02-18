var path = require("path");
var fs = require('fs');
var msync = require('microasync');
var types = require('./types').getAsArray();
var finder = require('./finder');
var regex = require('./regex');
var util = require("./util");
var err = require("./error");

var filters = (function () {
    var ignoreCase = false;
    var invert = false;

    function _regexFilter(file, expression) {
        expression = regex.getRegex(expression);
        return new RegExp(expression).test(file);
    }

    function _literalFilter(file, literal) {
        return file.indexOf(literal) >= 0;
    }

    /**
     * filter file name based on user params
     * @param {Array.<string>} files
     * @param {string} expression
     * @returns {Array.<string>}
     */
    function fileNameMatch(files, expression) {
        return files.filter(function (file) {
            var fn = regex.isRegex(expression) ? _regexFilter : _literalFilter;
            file = path.basename(file);
            return _applyParamsOptions(file, expression, fn)();
        });
    }

    /**
     * return files that has a selected extension
     * @param {Array.<string>} files
     * @param {Array.<string>} extensions
     * @returns {Array.<string>}
     */
    function validExtensions(files, extensions) {
        if (!extensions.length) {
            return files;
        }

        return files.filter(function (file) {
            file = path.extname(file);
            return _applyParamsOptions(file, extensions, util.contains)();
        });
    }

    /**
     * search Async inside files for pattern matching
     * @param {Array.<string>} files
     * @param {string} expression
     * @param {function} callback
     */
    function fileContentMatch(files, expression, callback) {
        var matches = [];
        var fn = regex.isRegex(expression) ? _regexFilter : _literalFilter;

        function readFile(file, callback) {
            if (typeof file !== 'string' || !util.contains(path.extname(file), types)) {
                return callback();
            }

            fs.stat(file, function (err, stat) {
                if (err || !stat.isFile())
                    return callback();

                fs.readFile(file, 'utf8', function (err, text) {
                    if (err)
                        return callback(err);
                    _applyParamsOptions(text, expression, fn)(function (isValid, text, expression) {
                        var options = {ignoreCase: ignoreCase};
                        if (isValid) {
                            // warning: use destructuring binding in the future
                            var matchedLines = finder(text, expression, options);
                            var resp = {
                                file: file,
                                lines: matchedLines[0],
                                matches: matchedLines[1]
                            };
                            callback(null, resp);
                        } else {
                            callback();
                        }
                    });
                });
            });
        }

        (function chunks(files) {
            if (!files.length)
                return callback(null, matches);

            msync.map(files.slice(0, 50), readFile, function (err, result) {
                result = result.filter(function (file) {
                    return file;
                });
                util.atomicPush(matches, result);
                chunks(files.slice(50));
            });
        }(files));
    }



    /**
     * apply params options to filters
     * @param {string} file
     * @param {string | Array} expression
     * @param {function} fn - function that contains the rules to apply the filter
     * @returns {function}
     */
    function _applyParamsOptions(file, expression, fn) {
        var res;
        var originalText = file;
        if (ignoreCase) {
            file = util.toLower(file);
            expression = util.toLower(expression);
        }

        res = invert ?
            !fn(file, expression) :
            fn(file, expression);
        // run a function after applyParams execute
        // this function will recieve as params the results of applyParamsOptions execution
        // care with shadowing**
        return function (fn) {
            if (typeof fn === 'function')
                return fn(res, originalText, expression);
            return res;
        };
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

    return {
        configure: configure,
        fileNameMatch: fileNameMatch,
        validExtensions: validExtensions,
        fileContentMatch: fileContentMatch
    };

}());


module.exports = filters;
