import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal-header'>
            {this.props.children}
        </div>);
    }
}

Header.propTypes = {
    children: PropTypes.node
};

class Body extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal-body'>
            {this.props.children}
        </div>);
    }
}

Body.propTypes = {
    children: PropTypes.node
};


class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal-footer'>
            {this.props.children}
        </div>);
    }
}

Footer.propTypes = {
    children: PropTypes.node
};


export default { Header, Body, Footer };