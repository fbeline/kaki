var expect = require('chai').expect;
var filters = require('../lib/filters');

var files = ["index.js", "index2.js", "module42.js", "package.json", "jshint.json", "SCRIPT.sh"];

describe("testing filters", function () {

    describe("literal match", function () {
        it("sanity", function () {
            filters.configure(false, false);
            var literal = "inde";
            var response = filters.fileNameMatch(files, literal);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(2);
        });

        it("invert match", function () {
            filters.configure(false, true);
            var literal = "inde";
            var response = filters.fileNameMatch(files, literal);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(4);
        });

        it("ignore case", function () {
            filters.configure(true, false);
            var literal = "script";
            var response = filters.fileNameMatch(files, literal);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(1);
            expect(response).to.include("SCRIPT.sh");
        });
    });


    describe("regex match", function () {

        it("regex", function () {
            filters.configure(false, false);
            var regex = "/[0-9]+.*/";
            var response = filters.fileNameMatch(files, regex);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(2);
            expect(response).to.include("index2.js");
            expect(response).to.include("module42.js");
        });

        it("invert match", function () {
            filters.configure(false, true);
            var word = "/index/";
            var response = filters.fileNameMatch(files, word);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(4);
            expect(response).to.include("module42.js");
            expect(response).to.include("package.json");
            expect(response).to.include("jshint.json");
            expect(response).to.include("SCRIPT.sh");
        });

        it("ignore case", function () {
            filters.configure(true, false);
            var word = "/scri/";
            var response = filters.fileNameMatch(files, word);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(1);
            expect(response).to.include("SCRIPT.sh");
        });
    });

    describe("validExtensions", function () {
        it("sanity", function () {
            filters.configure(false, false);
            var extensions = [".js", ".sh"];
            var response = filters.validExtensions(files, extensions);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(4);
        });

        it("invert match", function () {
            filters.configure(false, true);
            var extensions = [".js", ".sh"];
            var response = filters.validExtensions(files, extensions);
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(2);
        });

    });

    describe("filecontentMatch", function() {
        it("sanity", function(done) {
            filters.configure(false, false);
            filters.fileContentMatch(["./test/filters-test.js"], "ignore", response);

            function response(err, resp) {
                if (err) done(err);
                expect(resp).to.be.instanceof(Array);
                expect(resp).to.have.lengthOf(1);
                expect(resp[0].matches).to.equal(3);
                done();
            }
        });
    });
});
