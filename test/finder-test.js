var expect = require('chai').expect;
var finder = require('../lib/finder');


describe("testing finder", function () {

    describe("literal match", function () {
        it("sanity", function () {
            var text = "lorem ipsum, testing finder";
            var expression = "finder";

            [response, totalMatch] = finder(text, expression, {});
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.lengthOf(1);
            expect(response[0]).to.equal('\u001b[35m 1: \u001b[39mlorem ipsum, testing \u001b[41mfinder\u001b[49m');

            expect(totalMatch).to.equal(1);
        });
    });

});
