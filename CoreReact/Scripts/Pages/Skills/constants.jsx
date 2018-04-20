const actionTypes = {
    GET_SKILLS: 'GET_SKILLS',
    GET_SKILLS_SUCCESS: 'GET_SKILLS_SUCCESS',
    CREATE_NEW_SKILL: 'CREATE_NEW_SKILL',
    EDIT_SKILL:'EDIT_SKILL',
    SAVE_SKILL: 'SAVE_SKILL',
    SAVE_SKILL_SUCCESS: 'SAVE_SKILL_SUCCESS',
    DELETE_SKILL: 'DELETE_SKILL',
    DELETE_SKILL_SUCCESS: 'DELETE_SKILL_SUCCESS'
};

const gridColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Short name', field: 'shortName' },
    { title: 'Category', field: 'category' }
];

export {
    actionTypes,
    gridColumns
}