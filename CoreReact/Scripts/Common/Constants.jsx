const actionTypes = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING'
};

const fieldTypes = {
    int: 'int',
    double: 'double',
    time: 'time',
    string: 'string',
    bool: 'bool',
    date: 'date',
    color: 'color'
};

const validatorTypes = {
    required: 'required',
    email: 'email',
    custom: 'custom' //custom validation needs to provide validation function
};

export { actionTypes, fieldTypes, validatorTypes };