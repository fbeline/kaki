var path = require("path");
var fs = require('fs');
var msync = require('microasync');
var types = require('./types').getAsArray();
var util = require("./util");

var filters = (function () {
    var ignoreCase = false;
    var invert = false;

    function _regexFilter(file, expression) {
        expression = util.getRegex(expression);
        return new RegExp(expression).test(file);
    }

    function _literalFilter(file, literal) {
        return ~file.indexOf(literal);
    }

    /**
     * filter file name based on user params
     * @param {Array.<string>} files
     * @param {string} expression
     * @returns {Array.<string>}
     */
    function fileNameMatch(files, expression) {
        var fn = util.isRegex(expression) ? _regexFilter : _literalFilter;
        return files.filter(function (file) {
            try {
                file = path.basename(file);
                return _applyParamsOptions(file, expression, fn)();
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
                return _applyParamsOptions(file, extensions, util.contains)();
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
        var matches = [];
        var fn = util.isRegex(expression) ? _regexFilter : _literalFilter;

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
                        if (isValid) {
                            var lines = util.getMatchedLines(text, expression);
                            var resp = {
                                file: file,
                                lines: lines
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
        if (ignoreCase) {
            file = util.toLower(file);
            expression = util.toLower(expression);
        }

        res = invert ?
            !fn(file, expression) :
            fn(file, expression);

        // run a function after applyParams execute
        // this function will recieve as params the results of applyParamsOptions execution
        return function (fn) {
            if (typeof fn === 'function')
                return fn(res, file, expression);
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
