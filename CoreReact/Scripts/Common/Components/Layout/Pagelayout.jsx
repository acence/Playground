﻿import React from 'react';

class PageLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='pageLayout'>
            {this.props.children}
        </div>);
    }
};

export default PageLayout;