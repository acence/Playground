//
function deepCompare(obj1, obj2) {
    for (var p in obj1) {
        if (typeof (obj1[p]) == 'function') { break; }

        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) { return false; }

        switch (typeof (obj1[p])) {
            case 'object':
                if (!this.compare(obj1[p], obj2[p])) { return false; }
                break;
            default:
                if (obj1[p] !== obj2[p]) { return false; }
        }
    }
    for (var q in obj2) {
        if (typeof (obj1[q]) === 'undefined') { return false; }
    }
    return true;
};

export { deepCompare }