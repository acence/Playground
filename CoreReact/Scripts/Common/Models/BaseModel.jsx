import _ from 'underscore'

class BaseModel {
    constructor(item, fields) {
        var self = this;
        if (!item) {
            _.mapObject(fields, function (val, key) {
                self[key] = self.getBaseValue(val);
            })
        } else {
            _.mapObject(fields, function (val, key) {
                self[key] = item[key];
            })
        }
    }

    getBaseValue(fieldDescription) {
        if (!_.isUndefined(fieldDescription.defaultValue)) {
            return fieldDescription.defaultValue;
        }
        switch (fieldDescription.type) {
            case 'int':
            case 'double':
            case 'time':
                return 0;
            case 'string':
                return '';
            case 'bool':
                return false;
            case 'date':
                return new Date();
            case 'color':
                return '#000000';
        }
        return undefined;
    }

    static transformList(items, model) {
        let transformed = [];
        for (var item of items) {
            transformed.push(new model(item));
        }
        return transformed;
    }
}

export default BaseModel;