import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deepCompare } from './../../../Common/CompareUtils';
import Button from './../../../Common/Components/Input/Button';
import ModalDialog from './../../../Common/Components/Modal/ModalDialog';
import ModalDialogComponents from './../../../Common/Components/Modal/ModalDialogComponents';
import SkillModel from './../Models/SkillModel';
import { deleteSkill, deleteSkillCancel } from './../Actions/Skills';

class DeleteSkillDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSkill === null) {
            this.setState({
                selectedSkill: null
            });
            return;
        }
        if (!deepCompare(nextProps.selectedSkill, this.props.selectedSkill)) {
            this.setState({
                selectedSkill: Object.assign({}, nextProps.selectedSkill)
            });
        }
    }
    onDelete() {
        this.props.dispatch(deleteSkill(Object.assign({}, this.state.selectedSkill)));
    }
    onCancel() {
        this.props.dispatch(deleteSkillCancel());
    }

    render() {
        if (!this.state || !this.state.selectedSkill) {
            return null;
        }
        return (
            <ModalDialog>
                <ModalDialogComponents.Header>
                    Delete Skill
                </ModalDialogComponents.Header>
                <ModalDialogComponents.Body>
                    Are you sure you wish to delete this skill?
                </ModalDialogComponents.Body>
                <ModalDialogComponents.Footer>
                    <Button
                        className="btn btn-primary"
                        onClick={this.onDelete}>
                        Delete
                    </Button>
                    <Button
                        className="btn"
                        onClick={this.onCancel}>
                        Close
                    </Button>
                </ModalDialogComponents.Footer>
            </ModalDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedSkill: state.skills.selectedDeleteSkill
    };
}
DeleteSkillDialog.propTypes = {
    selectedSkill: PropTypes.instanceOf(SkillModel),
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(DeleteSkillDialog);