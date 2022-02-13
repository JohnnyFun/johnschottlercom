/**
 * format function comes from http://stackoverflow.com/a/18405800
 */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

/**
 * Determines if the given object is of type string
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

function isObject(obj) {
    // http://jsperf.com/isobject4
    return obj !== null && typeof obj === 'object';
}

function isFunc(obj) {
    return typeof obj === 'function';
}

/**
 * Get a random number between min/max
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * http://www.paulirish.com/2009/random-hex-color-code-snippets/
 * @returns {string} a random hex color 
 */
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Round a floating point number to the given decimal places
 * @param {decimal} num 
 * @param {int} dec number of decimal places to round to
 * @returns {decimal} 
 */
function roundNumber(num, dec) {
    if (num == null) {
        return null;
    }
    var parts = /([\d\.\-]+)e?/.exec(num.toString()); //extract the number prior to any e- stuff--that's precise enough for me
    if (parts == null || parts.length < 2) {
        return null;
    }
    num = Number(parts[1]);
    if (!isNaN(num)) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    }
    return null;
}

/**
 * Sum the values of the given column. If column is not passed, it sums the items.
 * @param {Array} array 
 * @param {String} column (optional)
 * @returns {decimal} 
 */
function sum(array, column) {
    var sum = 0;
    array.forEach(function(item) {
        sum += column == null ? item : item[column];
    });
    return sum;
}

/**
 * Sort the values in the given array using the given column
 * @param {Array} array 
 * @param {string} column 
 * @param {bool} desc 
 * @returns {array} 
 */
function sort(array, column, desc) {
    array.sort(function (aItem, bItem) {
        var a = aItem[column];
        var b = bItem[column];
        if (isString(a)) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        return a === b ? 0 : ((a < b && !desc) || (a > b && desc)) ? -1 : 1;
    });
    return array;
}