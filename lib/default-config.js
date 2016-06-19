var util = require('./util');
var path = require('path');

var defaultConfig = (function () {
    var ignoreList =
        ["\.bzr", "\.cdv", "\.dep", "\.dot", "\.nib", "\.plst", "\.git", "\.hg", "\.pc", ".svn",
            "_MTN", "CSV", "RCS", "SCCS", "_darcs", "_sgbak", "utom4te.cache", "blib", "_build", "cover_db",
            "node_modules", "CMakeFiles", "\.metadata", "\.cabal-sandbox", "\.idea"];

    var ignoreNameList = [".min"];
    var ignoreExtList = [];

    /**
     * verify if path contains some invalid(ignored) directory
     * @param {string} input - path or file name
     * @returns {Boolean}
     */
    function ignore(input) {
        var inputInfo = path.parse(input);
        var isInvalidPath =  util.contains(inputInfo.base, ignoreList);
        var isInvalidExt = util.contains(inputInfo.ext, ignoreExtList);
        var isInvalidName = util.containsIn(inputInfo.name, ignoreNameList);
        return isInvalidPath || isInvalidExt || isInvalidName;
    }

    /**
     * configure default config behavior
     * @param param
     */
    function setIgnoreList(list) {
        util.atomicPush(ignoreList, list);
    }

    return {
        setIgnoreList: setIgnoreList,
        ignore: ignore
    };

}());

module.exports = defaultConfig;
