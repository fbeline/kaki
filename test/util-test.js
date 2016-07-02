var util = require('../lib/util');
var expect = require('chai').expect;


describe('Util', function () {
    describe('toLower', function () {
        it('string', function () {
            var input = 'HELLO WORLD';
            var output = util.toLower(input);
            expect(output.toString()).to.be.equal('hello world');
        });

        it('array of strings', function () {
            var input = ['HELLO WORLD', 'FOO'];
            var output = util.toLower(input);
            expect(output.toString()).to.be.equal('hello world,foo');
        });

    });


    describe('containsIn', function () {
        it('sanity', function () {
            var arr = ['.js', '.json', '.xml'];
            var path = "/usr/foo/documents/foo.js";
            var output = util.containsIn(path, arr);
            expect(output).to.be.true;
        });
    });

    describe('contains', function () {
        it('sanity', function () {
            var arr = ['.js', '.json', '.xml'];
            var path = "/usr/foo/documents/foo.js";
            var output = util.contains(path, arr);
            expect(output).to.be.false;

            path = ".js";
            output = util.contains(path, arr);
            expect(output).to.be.true;
        });
    });

    describe('atomicPush', function () {
        it('sanity', function () {
            var target = ['foo'];
            var arr = ['bar', 'baz'];
            util.atomicPush(target, arr);
            expect(target).to.be.instanceof(Array);
            expect(target).to.have.lengthOf(3);
        });
    });

    describe('uniq', function () {
        it('sanity', function () {
            var arr = [1, 2, 3, 4, 5];
            var output = util.uniq(arr);
            expect(output.toString()).to.be.equal(arr.toString());
            arr = [1 , 2, 1, 3, 2];
            output = util.uniq(arr);
            expect(output.toString()).to.be.equal([1,3,2].toString());
        });
    });

    describe('sortByFirstLetter', function(){
       it('sanity', function() {
           var arr = ['banana', 'apple', 'grape'];
           util.sortByFirstLetter(arr);
           expect(arr.toString()).to.be.equal(['apple', 'banana', 'grape'].toString());
       });
    });
});
