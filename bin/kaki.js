#!/usr/bin/env node

var program = require('commander');
var ora = require('ora');
var fs = require('./../lib/fs-improved');
var types = require('./../lib/types');
var filters = require('./../lib/filters');
var defaultConfig = require('./../lib/default-config');
var util = require('./../lib/util');
var err = require('./../lib/error');
var spinner = ora('searching files');

var timeStart = 0;
var typeList = types.getAll();
var selectedTypes = [];

/**
 * configure input options
 */
function initialize() {

    program
        .version('1.5.8')
        .option('-i, --ignorecase', 'Ignore case distinctions')
        .option('-t, --extension <items>', 'Filter by custom types ex: ".app,.jar,.exe"')
        .option('-R, --rec', 'Recurse into subdirectories')
        .option('-x, --text [text]', 'Find text or /regex/ in files')
        .option('-w, --word [word]', 'Force PATTERN to match only whole words or /regex/ (file name)')
        .option('-v, --invert', 'Invert match: select non-matching lines')
        .option('--ignore-dir <items>', 'Ignore directories')
        .option('--ignore-file <items>', 'Ignore files')
        .option('--ignore-ext <items>', 'Ignore extensions')
        .option('--sort', 'Sort the found files');


    //dynamic generate options
    Object.keys(typeList).forEach(function(type) {
        program.option('--' + type, 'filter ' + type + ' files');
    });

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
        fs.access(program.args[0], function (error) {
            if (error) {
                err.shallStop('ERROR: path not found.');
            }
        });
    }

    shouldIgnore();

    //if extension param exists
    if (program.extension) {
        program.extension.split(",").forEach(function (el) {
            selectedTypes.push(el);
        });
    }

    //verify dynamic type params
    Object.keys(typeList).forEach(function(type) {
        if (program[type]) {
            types.get(type).forEach(function (el) {
                selectedTypes.push(el);
            });
        }
    });

    var path = program.args[0] || process.cwd();
    // go recursively or not
    if (program.rec) {
        fs.readdirRec(path, applyFilters);
    } else {
        fs.readdir(path, applyFilters);
    }

    function shouldIgnore() {
        var ignoreDirList, ignoreFileList, ignoreExtList;

        //ignore directories
        if (program.ignoreDir) {
            ignoreDirList = program.ignoreDir.split(',');
        }

        if (program.ignoreFile) {
            ignoreFileList = program.ignoreFile.split(',');
        }

        if (program.ignoreExt) {
            ignoreExtList = program.ignoreExt.split(',');
        }
        defaultConfig.setIgnoreList(ignoreDirList, ignoreFileList, ignoreExtList);
    }
}

/**
 * filter files based on input params
 * @param err
 * @param {Array <string>} files
 */
function applyFilters(error, files) {

    if (error)
        err.shallStop(error);

    runFilters(files);

    function runFilters(files) {
        files = filters.validExtensions(files, selectedTypes);

        //sort files by base name
        if (program.sort) {
            util.sortByFirstLetter(files);
        }

        //search by file name
        if (program.word) {
            files = filters.fileNameMatch(files, program.word);
        }

        //search by file content
        if (program.text) {
            filters.fileContentMatch(files, program.text, function (error, result) {
                if (error)
                    err.shallStop(error);
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
            err.shallStop('-- sorry, no files were found --');

        if (response && typeof response[0] === 'object') {
            printForTextSearch(response);
        } else {
            util.print(response.join('\n'))();
            util.print('\n%s matched file(s) in %s ms\n',
                    response.length, Date.now() - timeStart)('yellow');
        }


        //print matched files and related lines that contains the searched expression
        function printForTextSearch(input) {
            var totalMatches = 0;
            var totalLines = 0;
            input.forEach(function (item) {
                totalMatches += item.matches;
                totalLines += item.lines.length;
                util.print(item.file)('green');
                if (item.lines.length) {
                    util.print(item.lines.join('\n'))();
                }
            });
            util.print("\nTotal of: %s file(s), %s line(s), %s matche(s) in %sms ",
                    input.length, totalLines, totalMatches, Date.now() - timeStart)('yellow');
        }
    }
}

initialize();
