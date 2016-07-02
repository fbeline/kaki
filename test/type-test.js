var expect = require('chai').expect;
var type = require('../lib/types.js');

describe("types", function () {

    it("get all types", function () {
        var types = type.getAll();
        expect(types).to.be.instanceof(Object);
        expect(types.md).to.be.instanceof(Array);
        expect(types.md).to.have.lengthOf(2);
    });

    it("get type by name", function () {
        var ruby = type.get('ruby');
        expect(ruby).to.be.instanceof(Array);
        expect(ruby).to.have.lengthOf(7);
    });
});
