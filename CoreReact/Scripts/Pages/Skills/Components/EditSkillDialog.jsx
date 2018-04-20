import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalDialog from './../../../Common/Components/Modal/ModalDialog';
import ModalDialogHeader from './../../../Common/Components/Modal/ModalDialogHeader';

class EditSkillDialog extends React.Component {
    render() {
        if (!this.props.selectedSkill) {
            return null;
        }
        return (
            <ModalDialog>
                <ModalDialogHeader>title</ModalDialogHeader>
                <div>
                    edit
                </div>
            </ModalDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedSkill: state.skills.selectedSkill
    };
}

export default connect(mapStateToProps)(EditSkillDialog)