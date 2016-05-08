var path = require("path");
var fs = require('fs');
var async = require('async');
var types = require('./types').getAsArray();
var util = require("./util");

var filters = (function () {
    var ignoreCase = false;
    var invert = false;

    function _regexFilter(file, expression) {
        function getRegex(input) {
            return input.substring(1, input.length - 1);
        }

        return new RegExp(getRegex(expression)).test(file);
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
                return _applyParamsOptions(file, expression, fn);
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
                return _applyParamsOptions(file, extensions, util.contains);
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
                        return callback();

                    var resp =
                        _applyParamsOptions(text, expression, fn);

                    if (resp) callback(null, file);
                    else callback();
                });
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
    function _applyParamsOptions(file, expression, fn) {

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
        fileNameMatch: fileNameMatch,
        validExtensions: validExtensions,
        fileContentMatch: fileContentMatch
    };

}());


module.exports = filters;
