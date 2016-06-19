var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('chai').assert;
var defaultConfig = require('../lib/default-config');

describe('testing default-config', function () {
    it('ignore', function () {
        var path = '.git';
        var output = defaultConfig.ignore(path);
        assert.isTrue(output);

        path = '.git-another';
        output = defaultConfig.ignore(path);
        assert.isNotTrue(output);
    });

    it('custom ignore path', function () {
        var path = 'src';
        var output = defaultConfig.ignore(path);
        assert.isNotTrue(output);

        defaultConfig.setIgnoreList(['src']);
        output = defaultConfig.ignore(path);
        assert.isTrue(output);
    });
    
    it('ignore min files', function(){
        var path = 'test.min.js';
        var output = defaultConfig.ignore(path);
        assert.isTrue(output);
    });
});
