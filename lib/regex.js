var regex = {

    toString: function (match) {
        var reg = /(\)|\\|\/|\.|\(|\{|\}|\[|\]|\$|\^|\&\?|\:|\*|\+|\-|\&)/g;
        var out = match.replace(reg, '\\$1');
        return out;
    },

    /**
     * check if expression is a regex or literal
     * @param {string} expression
     * @returns {boolean}
     */
    isRegex: function (expression) {
        return (expression[0] === '/' && expression[expression.length - 1] === '/');
    },

    successiveMatches: function (expression, modifiers, text)  {
        var matches = [];
        var regex = new RegExp(this.getRegex(expression), modifiers);
        while ((reg = regex.exec(text)) !== null) {
            matches.push(reg);
        }
        return matches;
    },

    /**
     * remove bars  / ... / from statement
     * @param {string} input - regex statement
     * @returns {string}
     */
    getRegex: function (input) {
        if (input.length > 1 && input[0] === '/' && input[input.length - 1] === '/') {
            input = input.substring(1, input.length - 1);
        }
        return input;
    }
};

module.exports = regex;
