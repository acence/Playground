import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        if (_.isFunction(this.props.onChange)) {
            const target = e.target;
            this.props.onChange(target.name, target.value);
        }
    }
    render() {
        return (
        <React.Fragment>
            {
                this.props.label &&
                    <label>{this.props.label}</label>
            }
            <input type='text'
                className={this.props.className}
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
                />
        </React.Fragment>);
    }
}

TextBox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.node,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default TextBox;