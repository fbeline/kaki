var util = require('./util');
function error() {
    function shallStop(msg) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        util.print(msg)('red');
        process.exit();
    }

    return {
        shallStop: shallStop
    };
}

module.exports = error();
