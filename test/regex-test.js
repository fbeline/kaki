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

    it('successive matches', function () {
        var input = 'batman nan nan nan';
        var output = regex.successiveMatches('nan', 'g', input);
        expect(output).to.be.instanceof(Array);
        expect(output).to.have.lengthOf(3);
    });

    it('get regex', function () {
        var input = '/test[^\s]+/';
        var output = regex.getRegex(input);
        expect(output).to.be.equals('test[^\s]+');
    });

    it('to string', function () {
        var input = 'lorem} ipsum() $';
        var output = regex.toString(input);
        expect(output).to.be.equals('lorem\\} ipsum\\(\\) \\$');
    });

});


