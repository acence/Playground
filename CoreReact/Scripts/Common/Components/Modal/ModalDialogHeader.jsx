import React from 'react';

class ModalDialogHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='modal-header'>
            {this.props.children}
        </div>);
    }
};

export default ModalDialogHeader;