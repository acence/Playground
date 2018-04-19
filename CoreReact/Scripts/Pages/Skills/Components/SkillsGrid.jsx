import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSkills } from './../Actions/skills';
import { gridColumns } from './../constants';
import Grid from './../../../Common/Components/Grid/Grid'

class SkillsGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getSkills());
    }

    render() {
        return (
            <Grid columns={gridColumns} data={this.props.skills} />
        );
    }
}

SkillsGrid.propTypes = {
    skills: PropTypes.array,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        skills: state.skills.skillsList
    };
}

export default connect(mapStateToProps)(SkillsGrid);