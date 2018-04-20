import { actionTypes } from '../Constants';

const initialState = {
    skillsList: [],
    selectedSkill: null,
    showLoading: false,
};

function skillsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SKILLS: 
            return Object.assign({}, state, { showLoading: true });
        case actionTypes.GET_SKILLS_SUCCESS:
            return Object.assign({}, state, { skillsList: action.skillsList, showLoading: false });
        case actionTypes.CREATE_NEW_SKILL:
            return Object.assign({}, state, { selectedSkill: {} });
        case actionTypes.EDIT_SKILL:
            return Object.assign({}, state, { selectedSkill: action.selectedSkill });
        case actionTypes.SAVE_SKILL_SUCCESS:
            return Object.assign({}, state, { selectedSkill: null });
        default:
            return state;
    }
}

export default skillsReducer;