import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deepCompare } from './../../../Common/CompareUtils';
import Button from './../../../Common/Components/Input/Button';
import TextBox from './../../../Common/Components/Input/TextBox';
import ModalDialog from './../../../Common/Components/Modal/ModalDialog';
import ModalDialogComponents from './../../../Common/Components/Modal/ModalDialogComponents';
import { validateModel } from './../../../Common/ValidationUtils';
import SkillModel from './../Models/SkillModel'
import { saveSkill, saveSkillCancel } from './../Actions/Skills';

class EditSkillDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
            })
        }
    }
    onSave() {
        var modelState = validateModel(this.state.selectedSkill, SkillModel.fields);
        console.log(modelState);
        if (modelState.isValid) {
            this.props.dispatch(saveSkill(Object.assign({}, this.state.selectedSkill)));
        }
    }
    onCancel() {
        this.props.dispatch(saveSkillCancel());
    }

    handleInputChange(name, value) {
        let selectedSkill = Object.assign({}, this.state.selectedSkill);
        selectedSkill[name] = value;

        this.setState({
            selectedSkill: selectedSkill
        });
    }

    render() {
        if (!this.state || !this.state.selectedSkill) {
            return null;
        }
        return (
            <ModalDialog>
                <ModalDialogComponents.Header>
                    Edit Skill
                </ModalDialogComponents.Header>
                <ModalDialogComponents.Body>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col'>
                                <TextBox
                                    label='Name'
                                    name='name'
                                    value={this.state.selectedSkill.name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <TextBox
                                    label='Short Name'
                                    name='shortName'
                                    value={this.state.selectedSkill.shortName}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </ModalDialogComponents.Body>
                <ModalDialogComponents.Footer>
                    <Button
                        className="btn btn-primary"
                        onClick={this.onSave}>
                        Save
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
        selectedSkill: state.skills.selectedSkill
    };
}
//EditSkillDialog.propTypes = {
//    selectedSkill: PropTypes.instanceOf(SkillModel)
//}

export default connect(mapStateToProps)(EditSkillDialog)