require('mocha');
var assert = require('chai').assert;
var filters = require('../src/filters');

var files = ["index.js", "index2.js", "module42.js", "package.json", "jshint.json", "SCRIPT.sh"];

describe("testing filters", function () {

    describe("literalMatch", function () {
        it("sanity", function () {
            filters.configure(false, false);
            var literal = "package.json";
            var response = filters.literalMatch(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 1);
            assert.typeOf(response[0], 'string');

            literal = "package";
            response = filters.literalMatch(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 0);
        });

        it("invert match", function(){
            filters.configure(false, true);
            var literal = "package";
            var response = filters.literalMatch(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 6);
        });

        it("ignore case", function(){
            filters.configure(true, false);
            var literal = "script.sh";
            var response = filters.literalMatch(files, literal);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 1);
            assert.equal(response, "SCRIPT.sh");
        });
    });


    describe("wordRegexMatch", function () {
        it("whole word", function () {
            filters.configure(false, false);
            var word = "index";
            var response = filters.wordRegexMatch(files, word);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 2);
            assert.equal(String(response), "index.js,index2.js");
        });

        it("regex", function () {
            filters.configure(false, false);
            var regex = "[0-9]+.*";
            var response = filters.wordRegexMatch(files, regex);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 2);
            assert.equal(String(response), "index2.js,module42.js");
        });

        it("invert match", function () {
            filters.configure(false, true);
            var word = "index";
            var response = filters.wordRegexMatch(files, word);
            assert.typeOf(response, 'array');
            assert.lengthOf(response, 4);
            assert.equal(String(response), "module42.js,package.json,jshint.json,SCRIPT.sh");
        });

        it("ignore case", function () {
            filters.configure(true, false);
            var word = "scri";
            var response = filters.wordRegexMatch(files, word);
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