var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('chai').assert;
var defaultConfig = require('../lib/default-config');

describe('testing default-config', function () {

    it('ignore csv folder by default', function () {
        var path = '.git';
        var output = defaultConfig.ignore(path);
        assert.isTrue(output);

        path = '.git-another';
        output = defaultConfig.ignore(path);
        assert.isNotTrue(output);
    });

    it('ignore min files by default', function(){
        var path = 'test.min.js';
        var output = defaultConfig.ignore(path);
        assert.isTrue(output);
    });

    it('custom ignore path', function () {
        var path = 'src';
        var output = defaultConfig.ignore(path);
        assert.isNotTrue(output);

        defaultConfig.setIgnoreList(['src']);
        output = defaultConfig.ignore(path);
        assert.isTrue(output);
    });

    it('custom ignore file name', function() {
        var file = './kaki.js';
        var output = defaultConfig.ignore(file);
        assert.isNotTrue(output);

        defaultConfig.setIgnoreList(null, ['kaki']);
        output = defaultConfig.ignore(file);
        assert.isTrue(output);
    });

    it('custom ignore extension', function() {
        var ext = './README.md';
        var output = defaultConfig.ignore(ext);
        assert.isNotTrue(output);

        defaultConfig.setIgnoreList(null, null, ['.md']);
        output = defaultConfig.ignore(ext);
        assert.isTrue(output);
    });


});
