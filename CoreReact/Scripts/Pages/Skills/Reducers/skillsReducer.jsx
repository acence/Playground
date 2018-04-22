import { actionTypes } from '../Constants';
import _ from 'underscore';
import { addReplaceItem, removeItem } from './../../../Common/ArrayUtils';
import SkillModel from './../Models/SkillModel';

const initialState = {
    skillsList: [],
    selectedSkill: null,
    selectedDeleteSkill: null
}

function skillsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SKILLS_SUCCESS:
            return Object.assign({}, state, { skillsList: action.skillsList });
        case actionTypes.CREATE_NEW_SKILL:
            return Object.assign({}, state, { selectedSkill: {} });
        case actionTypes.EDIT_SKILL:
            return Object.assign({}, state, { selectedSkill: action.selectedSkill });
        case actionTypes.DELETE_SKILL:
            return Object.assign({}, state, { selectedDeleteSkill: action.selectedSkill });
        case actionTypes.SAVE_SKILL_SUCCESS:
            return Object.assign({}, state, { skillsList: addReplaceItem(state.skillsList, action.savedSkill, SkillModel.Identifier), selectedSkill: null });
        case actionTypes.DELETE_SKILL_SUCCESS:
            return Object.assign({}, state, { skillsList: removeItem(state.skillsList, action.deletedSkill, SkillModel.Identifier), selectedDeleteSkill: null });
        case actionTypes.SAVE_SKILL_CANCEL:
            return Object.assign({}, state, { selectedSkill: null });
        case actionTypes.DELETE_SKILL_CANCEL:
            return Object.assign({}, state, { selectedDeleteSkill: null });
        default:
            return state;
    }
}

export default skillsReducer;