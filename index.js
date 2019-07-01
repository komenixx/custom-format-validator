"use strict";
exports.__esModule = true;
function validateCustomFormat(value, formats, useACharAsUniversalLetter) {
    if (useACharAsUniversalLetter === void 0) { useACharAsUniversalLetter = false; }
    if (!value || !formats) {
        return true;
    }
    if (!value.length || !formats.length) {
        return true;
    }
    for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
        var i = formats_1[_i];
        var valid = validateByFormat(i, value, useACharAsUniversalLetter);
        if (valid) {
            return true;
        }
    }
    return false;
}
exports.validateCustomFormat = validateCustomFormat;
function validateByFormat(format, value, useACharAsUniversalLetter) {
    var chars = format.toUpperCase().split('');
    var regex = [];
    for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
        var c = chars_1[_i];
        if (isLetter(c)) {
            if (useACharAsUniversalLetter) {
                if (c === 'A') {
                    regex.push('([a-zA-Z])');
                }
            }
            else {
                regex.push('([' + c + '])');
            }
        }
        else if (c === '*') {
            regex.push('(.)');
        }
        else if (c === ' ') {
            regex.push('(\\s)');
        }
        else if (c === '!') {
            regex.push('([a-zA-Z0-9])');
        }
        else {
            if (c === '0') {
                regex.push('([0-9])');
            }
            if (c === '1') {
                regex.push('([1-9])');
            }
        }
    }
    var regExp = new RegExp('^' + regex.join('') + '$');
    return regExp.test(value);
}
function isLetter(str) {
    return str.length === 1 && str.match(/[A-Z]/i);
}
