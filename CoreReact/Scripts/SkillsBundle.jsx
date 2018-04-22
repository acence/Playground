import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Pages/Skills/store';
import PageLayout from './Common/Components/Layout/Pagelayout'
import LoadingBar from './Common/Components/Loading/LoadingBar';
import SkillsGrid from './Pages/Skills/Components/SkillsGrid';
import EditSkillDialog from './Pages/Skills/Components/EditSkillDialog';
import DeleteSkillDialog from './Pages/Skills/Components/DeleteSkillDialog';

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <LoadingBar />
            <PageLayout>
                <SkillsGrid />
            </PageLayout>
            <EditSkillDialog />
            <DeleteSkillDialog />
        </React.Fragment>
    </Provider>,
    document.getElementById('skillsRootElement')
);
