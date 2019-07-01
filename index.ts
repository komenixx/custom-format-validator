
export function validateCustomFormat(value: string, formats: string[], useACharAsUniversalLetter: boolean = false) {
    if (!value || !formats) {
        return true;
    }

    if (!value.length || !formats.length) {
        return true;
    }

    for (const i of formats) {
        const valid: boolean = validateByFormat(i, value, useACharAsUniversalLetter);
        if (valid) {
            return true;
        }
    }

    return false;
}

function validateByFormat(format: string, value: string, useACharAsUniversalLetter: boolean): boolean {
    const chars: string[] = format.toUpperCase().split('');

    const regex = [];

    for (const c of chars) {
        if (isLetter(c)) {
            if (useACharAsUniversalLetter) {
                if (c === 'A') { regex.push('([a-zA-Z])'); }
            } else {
                regex.push('([' + c + '])');
            }
        } else if (c === '*') {
            regex.push('(.)');
        } else if (c === ' ') {
            regex.push('(\\s)');
        } else if (c === '!') {
            regex.push('([a-zA-Z0-9])');
        } else {
            if (c === '0') { regex.push('([0-9])'); }
            if (c === '1') { regex.push('([1-9])'); }
        }
    }

    const regExp = new RegExp('^' + regex.join('') + '$');
    return regExp.test(value);
}

function isLetter(str: string) {
    return str.length === 1 && str.match(/[A-Z]/i);
}
