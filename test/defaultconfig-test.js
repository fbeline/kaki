var expect = require('chai').expect;
var defaultConfig = require('../lib/default-config');

describe('default-config', function () {

    it('ignore csv folder by default', function () {
        var path = '.git';
        var output = defaultConfig.ignore(path);
        expect(output).to.be.true;

        path = '.git-another';
        output = defaultConfig.ignore(path);
        expect(output).to.be.false;
    });

    it('ignore min files by default', function(){
        var path = 'test.min.js';
        var output = defaultConfig.ignore(path);
        expect(output).to.be.true;
    });

    it('custom ignore path', function () {
        var path = 'src';
        var output = defaultConfig.ignore(path);
        expect(output).to.be.false;

        defaultConfig.setIgnoreList(['src']);
        output = defaultConfig.ignore(path);
        expect(output).to.be.true;
    });

    it('custom ignore file name', function() {
        var file = './kaki.js';
        var output = defaultConfig.ignore(file);
        expect(output).to.be.false;

        defaultConfig.setIgnoreList(null, ['kaki']);
        output = defaultConfig.ignore(file);
        expect(output).to.be.true;
    });

    it('custom ignore extension', function() {
        var ext = './README.md';
        var output = defaultConfig.ignore(ext);
        expect(output).to.be.false;

        defaultConfig.setIgnoreList(null, null, ['.md']);
        output = defaultConfig.ignore(ext);
        expect(output).to.be.true;
    });

});
