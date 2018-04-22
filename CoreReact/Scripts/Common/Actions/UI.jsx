import { actionTypes } from './../Constants';

function showLoading() {
    return {
        type: actionTypes.SHOW_LOADING
    }
};

function hideLoading() {
    return {
        type: actionTypes.HIDE_LOADING
    }
};

export default { showLoading, hideLoading };