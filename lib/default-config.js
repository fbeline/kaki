var defaultConfig = (function () {
    var ignoreList =
        "(\\.bzr|\\.cdv|\\.dep|\\.dot|\\.nib|\\.plst|\\.git|\\.hg|\\.pc|.svn|_MTN|CSV|RCS|SCCS|_darcs|" +
        "_sgbak|utom4te.cache|blib|_build|cover_db|node_modules|CMakeFiles|\\.metadata|\\.cabal-sandbox|\\.idea)";


    /**
     * verify if path contains some invalid(ignored) directory
     * @param {string} path
     * @returns {Boolean}
     */
    function ignore(path) {
        return new RegExp(ignoreList).test(path);
    }

    return {
        ignore: ignore
    };

}());

module.exports = defaultConfig;