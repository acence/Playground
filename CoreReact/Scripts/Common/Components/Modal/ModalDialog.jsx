import React from 'react';
import PropTypes from 'prop-types';

class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='modal' style={{ display: 'block' }}>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        {this.props.children}
                    </div>
                </div>
            </div>);
    }
}

ModalDialog.propTypes = {
    children: PropTypes.node
};

export default ModalDialog;