import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(e);
        }
    }
    render() {
        return (
            <button className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </button>);
    }
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Button;