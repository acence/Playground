import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { deepCompare } from './../../CompareUtils';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.addButtonClicked = this.addButtonClicked.bind(this);
        this.editButtonClicked = this.editButtonClicked.bind(this);
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
        this.state ={
            options: Object.assign({}, this.defaultOptions, this.props.options)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!deepCompare(nextProps.data, this.props.data)) {
            this.kendoControl.dataSource.data(nextProps.data);
        }
    }
    componentDidMount() {
        this.kendoControl = $(this.containerElement).kendoGrid({
            datasource: {
                data: this.props.data
            },
            columns: this.helpers.prepareColumns(this.props.columns.slice(), this.state.options),
            toolbar: this.helpers.prepareHeader(this.state.options)
        }).data('kendoGrid');
        this.kendoControl.wrapper.addClass('no-scrollbar');
        this.kendoControl.wrapper.find('.k-grid-add').off('click').on('click', this.addButtonClicked);
    }
    componentWillUnmount() {
        if (this.kendoControl) {
            this.kendoControl.destroy();
        }
    }

    getDataItemFromKendoGrid(e) {
        return this.kendoControl.dataItem($(e.target).closest('tr'));
    }

    addButtonClicked(e) {
        e.preventDefault();
        if (_.isFunction(this.state.options.onAddButtonClick)) {
            this.state.options.onAddButtonClick(e);
        }
    }
    editButtonClicked(e) {
        e.preventDefault();
        if (_.isFunction(this.state.options.onEditButtonClick)) {
            this.state.options.onEditButtonClick(this.getDataItemFromKendoGrid(e), e);
        }
    }
    deleteButtonClicked(e) {
        e.preventDefault();
        if (_.isFunction(this.state.options.onDeleteButtonClick)) {
            this.state.options.onDeleteButtonClick(this.getDataItemFromKendoGrid(e), e);
        }
    }

    get defaultOptions() {
        return {
            showAddButton: true,
            showEditButton: true,
            showDeleteButton: true
        };
    }

    get helpers() {
        var self = this;
        return {
            prepareColumns(columns, options) {
                let icnOnly = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span>#= text #</a>");
                //let icnOnly = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span></a>");
                if (options.showEditButton || options.showDeleteButton) {
                    var commands = [];
                    if (options.showEditButton) {
                        commands.push({ name: "edit", text: "Edit", click: self.editButtonClicked, iconName: "edit", template: icnOnly });
                    }
                    if (options.showDeleteButton) {
                        commands.push({ name: "delete", text: 'Delete', click: self.deleteButtonClicked, iconName: "delete", template: icnOnly });
                    }
                    columns[columns.length] = {
                        command: commands,
                        title: ""
                    };
                }
                return columns;
            },
            prepareHeader(options) {
                let icnAndLabel = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span>#= iconText #</a>");
                if (options.showAddButton) {
                    return [{ name: 'add', text: 'Add', iconName: 'add', template: icnAndLabel, iconText: "Add" }];
                }
                return null;
            }
        };
    }

    render() {
        return <div ref={(node) => { this.containerElement = node; }} ></div>;
    }
}
Grid.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
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
};

export default Grid;