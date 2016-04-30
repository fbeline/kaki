var util = require('./util');

var defaultConfig = (function () {
    var staticIgnoreList =
        /(\.bzr|\.cdv|\.dep|\.dot|\.nib|\.plst|\.git|\.hg|\.pc|.svn|_MTN|CSV|RCS|SCCS|_darcs|_sgbak|utom4te.cache|blib|_build|cover_db|node_modules|CMakeFiles|\.metadata|\.cabal-sandbox|\.idea)/;

    var dynamicIgnoreList =
        ["\\.bzr", "\\.cdv", "\\.dep", "\\.dot", "\\.nib", "\\.plst", "\\.git", "\\.hg", "\\.pc", ".svn",
            "_MTN", "CSV", "RCS", "SCCS", "_darcs", "_sgbak", "utom4te.cache", "blib", "_build", "cover_db",
            "node_modules", "CMakeFiles", "\\.metadata", "\\.cabal-sandbox", "\\.idea"];

    var isCustomIgnore = false;

    /**
     * verify if path contains some invalid(ignored) directory
     * @param {string} path
     * @returns {Boolean}
     */
    function ignore(path) {
        if (isCustomIgnore) {
            var regex = "(" + dynamicIgnoreList.join("|") + ")";
            return new RegExp(regex).test(path);
        }
        return staticIgnoreList.test(path);
    }

    /**
     * configure default config behavior
     * @param param
     */
    function setIgnoreList(list) {
        util.atomicPush(dynamicIgnoreList, list);
        isCustomIgnore = true;
    }

    return {
        setIgnoreList: setIgnoreList,
        ignore: ignore
    };

}());

module.exports = defaultConfig;