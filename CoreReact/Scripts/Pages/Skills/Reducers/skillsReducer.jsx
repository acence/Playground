import { actionTypes } from '../constants';

const initialState = {
    skillsList: [],
    showLoading: false,
};

function skillsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SKILLS: 
            return object.assign({}, state, { showLoading: true });
        case actionTypes.GET_SKILLS_SUCCESS:
            return Object.assign({}, state, { skillsList: action.skillsList,  showLoading: false });
        default:
            return state;
    }
}

export default skillsReducer;