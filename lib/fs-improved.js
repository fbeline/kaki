var fs = require("fs");
var path = require("path");
var defaultConfig = require("./defaultConfig");

/**
 * read files inside directories recursively
 * @param {string} dir
 * @param {function}callback
 */
fs.readdirRec = function (dir, callback) {

    var walk = function (dir, done) {
        var results = [];
        fs.readdir(dir, function (err, list) {
            if (err) {
                return done(err);
            }

            var i = 0;
            (function next() {
                var file = list[i++];

                if (!file) {
                    return done(null, results);
                }

                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        if (defaultConfig.ignore(file)) {
                            next();
                            return;
                        }
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
    };

    walk(dir, function (err, response) {
        callback(err, response);
    });
};


module.exports = fs;
