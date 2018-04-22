import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSkills, openSkillDetailsPopup, openSkillDeletePopup } from './../Actions/Skills';
import { gridColumns } from './../Constants';
import Grid from './../../../Common/Components/Grid/Grid'
import SkillModel from './../Models/SkillModel';

class SkillsGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getSkills());
    }

    get gridOptions() {
        var component = this;
        return {
            onEditButtonClick(item, event) {
                component.props.dispatch(openSkillDetailsPopup(item))
            },
            onAddButtonClick(event) {
                component.props.dispatch(openSkillDetailsPopup(new SkillModel()))
            },
            onDeleteButtonClick(item, event) {
                component.props.dispatch(openSkillDeletePopup(item));
            }
        }
    }

    render() {
        return (
            <Grid
                columns={gridColumns}
                data={this.props.skills}
                options={this.gridOptions}
            />
        );
    }
}

SkillsGrid.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.instanceOf(SkillModel)
    ),
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        skills: state.skills.skillsList
    };
}

export default connect(mapStateToProps)(SkillsGrid);