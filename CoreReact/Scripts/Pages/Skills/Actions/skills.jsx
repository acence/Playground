import uiActions from './../../../Common/Actions/UI';
import { actionTypes } from './../Constants';
import Ajax from './../../../Infrastructure/Ajax';
import SkillModel from './../Models/SkillModel';
import { skillRoutes } from './../Routes';

function getSkills() {
    return dispatch => {
        dispatch(uiActions.showLoading());
        return Ajax.get(skillRoutes.getAllUrl())
            .then(function (response) {
                dispatch(uiActions.hideLoading());
                dispatch(getSkillsSuccess(response.data));
            });
    };
}
function getSkillsSuccess(data) {
    return {
        type: actionTypes.GET_SKILLS_SUCCESS,
        skillsList: SkillModel.transformList(data)
    };
}
function openSkillDetailsPopup(skill) {
    return {
        type: actionTypes.EDIT_SKILL,
        selectedSkill: skill
    }
}

function saveSkill(skill) {
    return dispatch => {
        dispatch(uiActions.showLoading());
        let hasId = skill[SkillModel.Identifier] > 0;
        let method = hasId ? 'put' : 'post';
        let url = hasId ? skillRoutes.updateUrl(skill) : skillRoutes.createUrl();
        return Ajax[method](url, skill)
            .then(function (response) {
                dispatch(uiActions.hideLoading());
                dispatch(saveSkillSuccess(response.data));
            });
    };
}

function saveSkillSuccess(skill) {
    return {
        type: actionTypes.SAVE_SKILL_SUCCESS,
        savedSkill: new SkillModel(skill)
    }
}

function saveSkillCancel() {
    return {
        type: actionTypes.SAVE_SKILL_CANCEL
    }
}

function openSkillDeletePopup(skill) {
    return {
        type: actionTypes.DELETE_SKILL,
        selectedSkill: skill
    }
}

function deleteSkill(skill) {
    return dispatch => {
        dispatch(uiActions.showLoading());
        return Ajax.delete(skillRoutes.deleteUrl(skill))
            .then(function (response) {
                dispatch(uiActions.hideLoading());
                dispatch(deleteSkillSuccess(skill));
            });
    };
}

function deleteSkillSuccess(skill) {
    return {
        type: actionTypes.DELETE_SKILL_SUCCESS,
        deletedSkill: skill
    }
}

function deleteSkillCancel() {
    return {
        type: actionTypes.DELETE_SKILL_CANCEL
    }
}

export { getSkills, openSkillDetailsPopup, saveSkill, saveSkillCancel, openSkillDeletePopup, deleteSkill, deleteSkillCancel }