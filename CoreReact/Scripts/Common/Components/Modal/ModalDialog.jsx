import React from 'react';

class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal'>
            {this.props.children}
        </div>);
    }
}

export default ModalDialog;