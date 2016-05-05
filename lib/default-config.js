var util = require('./util');
var path = require('path')

var defaultConfig = (function () {
    var ignoreList =
        ["\.bzr", "\.cdv", "\.dep", "\.dot", "\.nib", "\.plst", "\.git", "\.hg", "\.pc", ".svn",
            "_MTN", "CSV", "RCS", "SCCS", "_darcs", "_sgbak", "utom4te.cache", "blib", "_build", "cover_db",
            "node_modules", "CMakeFiles", "\.metadata", "\.cabal-sandbox", "\.idea"];


    /**
     * verify if path contains some invalid(ignored) directory
     * @param {string} dirPath
     * @returns {Boolean}
     */
    function ignore(dirPath) {
        return util.contains(path.basename(dirPath), ignoreList);
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