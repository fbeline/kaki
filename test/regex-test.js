var regex = require('../lib/regex');
var expect = require('chai').expect;

describe('Regex helper test', function () {
    it('isRegex', function () {
        var expression = '/its n/ot a regex';
        var output = regex.isRegex(expression);
        expect(output).to.be.false;

        expression = '/\d+.*/';
        output = regex.isRegex(expression);
        expect(output).to.be.true;
    });
});


