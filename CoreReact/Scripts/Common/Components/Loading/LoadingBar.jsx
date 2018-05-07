import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoadingBar extends React.Component {
    render() {
        if (!this.props.showLoading) {
            return null;
        }
        return (<div className='loading-bar' />);
    }
}

LoadingBar.propTypes = {
    showLoading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        showLoading: state.ui.showLoading
    };
}

export default connect(mapStateToProps)(LoadingBar);