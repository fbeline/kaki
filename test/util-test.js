var describe = require('mocha').describe;
var util = require('../lib/util');
var assert = require('chai').assert;


describe('testing util', function () {
    describe('toLower', function () {
        it('string', function () {
            var input = 'HELLO WORLD';
            var output = util.toLower(input);
            assert.equal(output, 'hello world');
        });

        it('array of strings', function () {
            var input = ['HELLO WORLD', 'FOO'];
            var output = util.toLower(input);
            assert.equal(String(output), 'hello world,foo');
        });

    });


    describe('containsIn', function () {
        it('sanity', function () {
            var arr = ['.js', '.json', '.xml'];
            var path = "/usr/foo/documents/foo.js";
            var output = util.containsIn(path, arr);
            assert.equal(output, true);
        });
    });

    describe('contains', function () {
        it('sanity', function () {
            var arr = ['.js', '.json', '.xml'];
            var path = "/usr/foo/documents/foo.js";
            var output = util.contains(path, arr);
            assert.equal(output, false);

            path = ".js";
            output = util.contains(path, arr);
            assert.equal(output, true);
        });
    });

    describe('atomicPush', function () {
        it('sanity', function () {
            var target = ['foo'];
            var arr = ['bar', 'baz'];
            util.atomicPush(target, arr);
            assert.typeOf(target, 'Array');
            assert.lengthOf(target, 3);
        });
    });

    describe('uniq', function () {
        it('sanity', function () {
            var arr = [1, 2, 3, 4, 5];
            var output = util.uniq(arr);
            assert.equal(output.toString(), arr.toString());
            arr = [1 , 2, 1, 3, 2];
            output = util.uniq(arr);
            assert.equal(output.toString(), [1,3,2].toString());
        });
    });

    describe('sortByFirstLetter', function(){
       it('sanity', function() {
           var arr = ['banana', 'apple', 'grape'];
           util.sortByFirstLetter(arr);
           assert.equal(arr.toString(), ['apple', 'banana', 'grape'].toString());
       });
    });
});
