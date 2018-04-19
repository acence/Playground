import React from 'react';
import PropTypes from 'prop-types';

class Grid extends React.Component {
    render() {
        return (
            <table className="customGrid">
                <thead>
                    <tr>
                        {this.props.columns.map((item) => {
                            return (
                                <td key={item.header}>
                                    {item.header}
                                </td>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((valueItem) => {
                        return (
                            <tr key={valueItem.id}>
                                {this.props.columns.map((item) => {
                                    return (
                                        <td key={valueItem.id + '' + item.header}>
                                            {valueItem[item.field]}
                                        </td>)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>)
    }
}
Grid.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    options: PropTypes.shape({
        showAddButton: PropTypes.bool,
        showEditButton: PropTypes.bool,
        showDeleteButton: PropTypes.bool,
        addButtonAction: PropTypes.func,
        editButtonAction: PropTypes.func,
        deleteButtonAction: PropTypes.func
    })
}

export default Grid;