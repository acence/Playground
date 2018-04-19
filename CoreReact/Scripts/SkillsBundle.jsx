import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Pages/Skills/store';
import SkillsGrid from './Pages/Skills/Components/SkillsGrid';
import EditSkillDialog from './Pages/Skills/Components/EditSkillDialog';
import DeleteSkillDialog from './Pages/Skills/Components/DeleteSkillDialog';

ReactDOM.render(
    <Provider store={store}>
        <div>
            <SkillsGrid />
            <EditSkillDialog />
            <DeleteSkillDialog />
        </div>
    </Provider>,
    document.getElementById('skillsRootElement')
);
