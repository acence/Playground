import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import skills from './Reducers/SkillsReducer'
import ui from './../../Common/Reducers/UIReducer';

const appReducer = combineReducers({
    skills,
    ui
});
const rootReducer = (state, action) => {
    return appReducer(state, action);
};

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;