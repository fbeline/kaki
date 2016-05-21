#!/usr/bin/env node

var program = require('commander');
var ora = require('ora');
var fs = require('./../lib/fs-improved');
var types = require('./../lib/types');
var filters = require('./../lib/filters');
var defaultConfig = require('./../lib/default-config');
var util = require('./../lib/util');

var timeStart = 0;
var typeList = types.getAll();
var selectedTypes = [];
var spinner = ora('searching files');

/**
 * configure input options
 */
function initialize() {

    program
        .version('1.5.2')
        .option('-i, --ignorecase', 'Ignore case distinctions')
        .option('-t, --extension <items>', 'Filter by custom types ex: ".app,.jar,.exe"')
        .option('-R, --rec', 'recurse into subdirectories')
        .option('-x, --text [text]', 'find text or /regex/ in files')
        .option('-w, --word [word]', 'force PATTERN to match only whole words or /regex/ (file name)')
        .option('-v, --invert', 'Invert match: select non-matching lines')
        .option('--ignore <items>', 'ignore directories');


    //dynamic generate options
    for (var type in typeList) {
        program.option('--' + type, 'filter ' + type + ' files');
    }

    program.parse(process.argv);
    checkParams();
}

/**
 * check passed params and populate selectedType
 */
function checkParams() {

    timeStart = Date.now();
    spinner.start();
    filters.configure(program.ignorecase, program.invert);

    //verify if path exists
    if (program.args[0]) {
        fs.access(program.args[0], function (err) {
            if (err) {
                spinner.stop();
                util.print('\nERROR: path not found.\n')('red');
                process.exit();
            }
        });
    }

    //ignore directories
    if (program.ignore) {
        defaultConfig.setIgnoreList(program.ignore.split(','));
    }

    //if extension param exists
    if (program.extension) {
        program.extension.split(",").forEach(function (el) {
            selectedTypes.push(el);
        });
    }

    //verify dynamic type params
    for (var type in typeList) {
        if (program[type]) {
            types.get(type).forEach(function (el) {
                selectedTypes.push(el);
            });
        }
    }

    var path = program.args[0] || process.cwd();
    // go recursively or not
    if (program.rec) {
        fs.readdirRec(path, applyFilters);
    } else {
        fs.readdir(path, applyFilters);
    }
}

/**
 * filter files based on input params
 * @param err
 * @param {Array <string>} files
 */
function applyFilters(err, files) {
    //var searchedFiles = files.length;

    try {
        if (err) throw err;
        runFilters(files);
    } catch (ex) {
        spinner.stop();
        util.print('\nERROR: oopps something is wrong..\n')('red');
    }

    function runFilters(files) {
        files = filters.validExtensions(files, selectedTypes);

        if (program.word) {
            files = filters.fileNameMatch(files, program.word);
        }

        if (program.text) {
            filters.fileContentMatch(files, program.text, function (err, result) {
                if (err) throw err;
                processResult(result);
            });
        } else {
            processResult(files);
        }
    }

    /**
     * print result after all filters
     * @param response
     */
    function processResult(response) {
        spinner.stop();

        if (!response.length)
            return util.print('-- srry, no files were found --\n')('yellow');

        if (response && typeof response[0] === 'object') {
            printForTextSearch(response);
        } else {
            util.print(response.join('\n'))();
        }
        util.print('\n%s matched file(s) in %s ms\n',
            response.length,
            //searchedFiles,
            Date.now() - timeStart)
        ('yellow');


        //print matched files and related lines that contains the searched expression
        function printForTextSearch(input) {
            input.forEach(function (item) {
                util.print(item.file)('green');
                if (item.lines.length) {
                    util.print(item.lines.join('\n'))();
                }
            });
        }
    }
}

initialize();
