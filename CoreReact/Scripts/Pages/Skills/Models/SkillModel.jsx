import _ from 'underscore';
import BaseModel from './../../../Common/Models/BaseModel';

class SkillModel extends BaseModel {
    constructor(skill) {
        super(skill, SkillModel.fields);
    }

    static get fields() {
        return {
            id: {
                type: 'int'
            },
            name: {
                type: 'string',
                validators: {
                    required: true
                }
            },            
            shortName: {
                type: 'string',
                validators: {
                    required: true
                }
            },
            foreColor: {
                type: 'color'
            },
            category: {
                type: 'string'
            },
            active: {
                type: 'bool'
            },
            email: {
                type: 'string',
                validators: {
                    email:true
                }
            },
            startDate: {
                type: 'date'
            },
            startTime: {
                type: 'time'
            },
            length: {
                type: 'int'
            },
            percentage: {
                type: 'double'
            },
            calculationType: {
                type: 'int'
            }
        }
    }

    static get Identifier() {
        return 'id';
    }


    static transformList(skills) {
        return super.transformList(skills, SkillModel);
    }
}

export default SkillModel;