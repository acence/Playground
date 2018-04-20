import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import skills from './Reducers/SkillsReducer'

const appReducer = combineReducers({
    skills
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