import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal-header'>
            {this.props.children}
        </div>);
    }
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
};


export default { Header, Body, Footer };