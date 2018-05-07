import { fieldTypes, validatorTypes } from './../../../Common/Constants';
import BaseModel from './../../../Common/Models/BaseModel';

class SkillModel extends BaseModel {
    constructor(skill) {
        super(skill, SkillModel.fields);
    }

    static get fields() {
        return {
            id: {
                type: fieldTypes.int
            },
            name: {
                type: fieldTypes.string,
                validators: [
                    {
                        type: validatorTypes.required,
                        message: 'Name is required'
                    }
                ]
            },
            shortName: {
                type: fieldTypes.string,
                validators: [
                    {
                        type: validatorTypes.required,
                        message: 'Short name is required'
                    }
                ]
            },
            foreColor: {
                type: fieldTypes.color
            },
            category: {
                type: fieldTypes.string
            },
            active: {
                type: fieldTypes.bool
            },
            email: {
                type: fieldTypes.string,
                validators: [
                    {
                        type: validatorTypes.required,
                        message: 'Email is required'
                    },
                    {
                        type: validatorTypes.email,
                        message: 'Email is in incorrect format'
                    }
                ]
            },
            startDate: {
                type: fieldTypes.date
            },
            startTime: {
                type: fieldTypes.time
            },
            length: {
                type: fieldTypes.int
            },
            percentage: {
                type: fieldTypes.double
            },
            calculationType: {
                type: fieldTypes.int
            }
        };
    }

    static get Identifier() {
        return 'id';
    }


    static transformList(skills) {
        return super.transformList(skills, SkillModel);
    }
}

export default SkillModel;