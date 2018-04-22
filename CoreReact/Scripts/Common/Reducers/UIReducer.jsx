import { actionTypes } from '../Constants';

const initialState = {
    showLoading: false
};


function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_LOADING:
            return Object.assign({}, state, { showLoading: true });
        case actionTypes.HIDE_LOADING:
            return Object.assign({}, state, { showLoading: false });
        default:
            return state;

    }
}


export default uiReducer;