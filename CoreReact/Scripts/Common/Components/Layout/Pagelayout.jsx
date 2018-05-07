import React from 'react';
import PropTypes from 'prop-types';

class PageLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='page-layout'>
            {this.props.children}
        </div>);
    }
}

PageLayout.propTypes = {
    children: PropTypes.node
};

export default PageLayout;