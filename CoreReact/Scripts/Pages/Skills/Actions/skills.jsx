import { actionTypes } from './../constants'
import Ajax from './../../../Infrastructure/Ajax'

let currentSkillsRequest;
function getSkills() {
    return dispatch => {
        if (currentSkillsRequest && currentSkillsRequest.abort) {
            currentSkillsRequest.abort();
        }
        currentSkillsRequest = Ajax.get('/api/skills');
        currentSkillsRequest.then(function (response) {
            dispatch(getSkillsSuccess(response.data));
        });
        return currentSkillsRequest;
    };
}
function getSkillsSuccess(data) {
    return {
        type: actionTypes.GET_SKILLS_SUCCESS,
        skillsList: data
    };
}

export { getSkills }