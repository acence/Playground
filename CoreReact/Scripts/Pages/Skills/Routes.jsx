import SkillModel from './Models/SkillModel';
const skillRoutes = {
    getAllUrl() {
        return '/api/' + 'skills';
    },
    getSingleUrl(skill) {
        return '/api/' + 'skills/' + skill[SkillModel.Identifier];
    },
    createUrl() {
        return '/api/' + 'skills';
    },
    updateUrl(skill) {
        return '/api/' + 'skills/' + skill[SkillModel.Identifier];
    },
    deleteUrl(skill) {
        return '/api/' + 'skills/' + skill[SkillModel.Identifier];
    }
}

export { skillRoutes };