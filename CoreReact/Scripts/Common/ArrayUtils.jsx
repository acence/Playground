function addReplaceItem(list, item, identifier) {
    if (!item) {
        return list;
    }
    let existingIndex = _.findIndex(list, function (current) {
        return current[identifier] === current[identifier];
    });
    if (existingIndex >= 0) {
        list = list.slice();
        list[existingIndex] = item;
    } else {
        list = [...list, item];
    }
    return list;
}
function removeItem(list, skill, identifier) {
    if (!item) {
        return list;
    }
    let existingIndex = _.findIndex(list, function (current) {
        return current[identifier] === current[identifier];
    });
    if (existingIndex >= 0) {
        var tempList = list.slice();
        tempList.splice(existingIndex, 1);
        return tempList;
    }
    return list;
}

export { addReplaceItem, removeItem };