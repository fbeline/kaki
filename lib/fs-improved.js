var fs = require("fs");
var util = require("./util");
var path = require("path");


var ignoreList = ["node_modules", ".idea", ".git", ""];
/**
 * read files inside directories recursively
 * @param path
 * @param callback
 */
fs.readdirRec = function (path, callback) {
    var results = [];
    fs.readdir(path, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
    callback(results);
};


module.exports = fs;
