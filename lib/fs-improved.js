var fs = require("fs-extra");
var path = require("path");

/**
 * read files inside directories recursively
 * @param path
 * @param callback
 */
fs.readdirRec = function (path, callback) {
    var items = [];
    fs.walk(path)
        .on('data', function (item) {
            items.push(item.path);
        })
        .on('end', function () {
            callback(null, items);
        });
};


module.exports = fs;
