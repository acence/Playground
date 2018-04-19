import { actionTypes } from './../constants'
import Ajax from './../../../Infrastructure/Ajax'

function getSkills() {
    return dispatch => {
        return Ajax.get('/api/skills')
            .then(function (response) {
                dispatch(getSkillsSuccess(response.data));
            });
    };
}
function getSkillsSuccess(data) {
    return {
        type: actionTypes.GET_SKILLS_SUCCESS,
        skillsList: data
    };
}

export { getSkills }