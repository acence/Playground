import _ from 'underscore';
import { fieldTypes } from './../Constants';

class BaseModel {
    constructor(item, fields) {
        var self = this;
        if (!item) {
            _.mapObject(fields, function (val, key) {
                self[key] = self.getBaseValue(val);
            });
        } else {
            _.mapObject(fields, function (val, key) {
                self[key] = item[key];
            });
        }
    }

    getBaseValue(fieldDescription) {
        if (!_.isUndefined(fieldDescription.defaultValue)) {
            return fieldDescription.defaultValue;
        }
        switch (fieldDescription.type) {
            case fieldTypes.int:
            case fieldTypes.double:
            case fieldTypes.time:
                return 0;
            case fieldTypes.string:
                return '';
            case fieldTypes.bool:
                return false;
            case fieldTypes.date:
                return new Date();
            case fieldTypes.color:
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

    static get Identifier() {
        return 'id';
    }

}

export default BaseModel;