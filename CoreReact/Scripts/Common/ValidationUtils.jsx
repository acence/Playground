import _ from 'underscore';
import { validatorTypes } from './Constants';

function validateModel(model, fieldDefinitions) {
    let validationErrors = [];
    let isValid = true;

    _.each(fieldDefinitions, function (field, key) {
        if (!!field.validators) {
            var value = model[key];
            _.each(field.validators, function (validator) {
                switch (validator.type) {
                    case validatorTypes.required:
                        //this format should be used if we need it to break on first validate
                        //isValid = isValid && validate(value, validateRequired, validationErrors, validator.message);

                        //this format should be used if we need to validate all fields
                        isValid = validate(value, validateRequired, validationErrors, validator.message) && isValid;
                        break;
                    case validatorTypes.email:
                        isValid = validate(value, validateEmail, validationErrors, validator.message) && isValid;
                        break;
                    case validatorTypes.custom:
                        isValid = validate(value, validator.validateFunction, validationErrors, validator.message) && isValid;
                        break;
                }
            });
        }
    });
    return { isValid, validationErrors };
}

function validate(value, validateFunction, validationErrors, message) {
    var valid = validateFunction(value);
    if (!valid) {
        validationErrors.push(message);
    }
    return valid;
}

function validateRequired(value) {
    if (value === null || value === undefined) {
        return false;
    }
    if (value.toString() === '') {
        return false;
    }
    return true;
}

function validateEmail(/*value*/) {
    //TODO
    return true;
}

export { validateModel };