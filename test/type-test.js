require('mocha');
var assert = require('chai').assert;
var type = require('../lib/types.js');

describe("testing types", function () {

    it("get all types", function () {
        var types = type.getAll();
        assert.typeOf(types, 'object');
        assert.property(types, 'md');
        assert.typeOf(types.md, 'array');
        assert.lengthOf(types.md, 2);
    });

    it("get type by name", function () {
        var ruby = type.get('ruby');
        assert.typeOf(ruby, 'array');
        assert.lengthOf(ruby, 7);
        assert.typeOf(ruby[0], 'string');
    });
});