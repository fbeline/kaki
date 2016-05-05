var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('chai').assert;
var filters = require('../lib/filters');

var files = ["index.js", "index2.js", "module42.js", "package.json", "jshint.json", "SCRIPT.sh"];

describe("testing filters", function () {

    describe("literal match", function () {
        it("sanity", function () {
            filters.configure(false, false);
            var literal = "inde";
            var response = filters.fileNameFilter(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 2);
        });

        it("invert match", function () {
            filters.configure(false, true);
            var literal = "inde";
            var response = filters.fileNameFilter(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 4);
        });

        it("ignore case", function () {
            filters.configure(true, false);
            var literal = "script";
            var response = filters.fileNameFilter(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 1);
            assert.equal(response, "SCRIPT.sh");
        });
    });


    describe("regex match", function () {

        it("regex", function () {
            filters.configure(false, false);
            var regex = "/[0-9]+.*/";
            var response = filters.fileNameFilter(files, regex);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 2);
            assert.equal(String(response), "index2.js,module42.js");
        });

        it("invert match", function () {
            filters.configure(false, true);
            var word = "/index/";
            var response = filters.fileNameFilter(files, word);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 4);
            assert.equal(String(response), "module42.js,package.json,jshint.json,SCRIPT.sh");
        });

        it("ignore case", function () {
            filters.configure(true, false);
            var word = "/scri/";
            var response = filters.fileNameFilter(files, word);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 1);
            assert.equal(response, "SCRIPT.sh");
        });
    });

    describe("validExtensions", function () {
        it("sanity", function () {
            filters.configure(false, false);
            var extensions = [".js", ".sh"];
            var response = filters.validExtensions(files, extensions);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 4);
        });

        it("invert match", function () {
            filters.configure(false, true);
            var extensions = [".js", ".sh"];
            var response = filters.validExtensions(files, extensions);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 2);
        });

    });
});