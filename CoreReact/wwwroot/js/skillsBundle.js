(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Constants = require('./../Constants');

function showLoading() {
    return {
        type: _Constants.actionTypes.SHOW_LOADING
    };
};

function hideLoading() {
    return {
        type: _Constants.actionTypes.HIDE_LOADING
    };
};

exports.default = { showLoading: showLoading, hideLoading: hideLoading };

},{"./../Constants":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeItem = exports.addReplaceItem = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function addReplaceItem(list, item, identifier) {
    if (!item) {
        return list;
    }
    var existingIndex = _underscore2.default.findIndex(list, function (current) {
        return current[identifier] === item[identifier];
    });
    if (existingIndex >= 0) {
        list = list.slice();
        list[existingIndex] = item;
    } else {
        list = [].concat(_toConsumableArray(list), [item]);
    }
    return list;
}
function removeItem(list, item, identifier) {
    if (!item) {
        return list;
    }
    var existingIndex = _underscore2.default.findIndex(list, function (current) {
        return current[identifier] === item[identifier];
    });
    if (existingIndex >= 0) {
        var tempList = list.slice();
        tempList.splice(existingIndex, 1);
        return tempList;
    }
    return list;
}

exports.addReplaceItem = addReplaceItem;
exports.removeItem = removeItem;

},{"underscore":"underscore"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function deepCompare(obj1, obj2) {
    if (!obj1 || !obj2) {
        return false;
    }
    for (var p in obj1) {
        if (typeof obj1[p] == 'function') {
            break;
        }

        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
            return false;
        }

        switch (_typeof(obj1[p])) {
            case 'object':
                if (!deepCompare(obj1[p], obj2[p])) {
                    return false;
                }
                break;
            default:
                if (obj1[p] !== obj2[p]) {
                    return false;
                }
        }
    }
    for (var q in obj2) {
        if (typeof obj1[q] === 'undefined') {
            return false;
        }
    }
    return true;
};

exports.deepCompare = deepCompare;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _CompareUtils = require('./../../CompareUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_React$Component) {
    _inherits(Grid, _React$Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this.addButtonClicked = _this.addButtonClicked.bind(_this);
        _this.editButtonClicked = _this.editButtonClicked.bind(_this);
        _this.deleteButtonClicked = _this.deleteButtonClicked.bind(_this);
        _this.state = {
            options: Object.assign({}, _this.defaultOptions, _this.props.options)
        };
        return _this;
    }

    _createClass(Grid, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!(0, _CompareUtils.deepCompare)(nextProps.data, this.props.data)) {
                this.kendoControl.dataSource.data(nextProps.data);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
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
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.kendoControl) {
                this.kendoControl.destroy();
            }
        }
    }, {
        key: 'getDataItemFromKendoGrid',
        value: function getDataItemFromKendoGrid(e) {
            return this.kendoControl.dataItem($(e.target).closest('tr'));
        }
    }, {
        key: 'addButtonClicked',
        value: function addButtonClicked(e) {
            e.preventDefault();
            if (_underscore2.default.isFunction(this.state.options.onAddButtonClick)) {
                this.state.options.onAddButtonClick(e);
            }
        }
    }, {
        key: 'editButtonClicked',
        value: function editButtonClicked(e) {
            e.preventDefault();
            if (_underscore2.default.isFunction(this.state.options.onEditButtonClick)) {
                this.state.options.onEditButtonClick(this.getDataItemFromKendoGrid(e), e);
            }
        }
    }, {
        key: 'deleteButtonClicked',
        value: function deleteButtonClicked(e) {
            e.preventDefault();
            if (_underscore2.default.isFunction(this.state.options.onDeleteButtonClick)) {
                this.state.options.onDeleteButtonClick(this.getDataItemFromKendoGrid(e), e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('div', { ref: function ref(node) {
                    _this2.containerElement = node;
                } });
        }
    }, {
        key: 'defaultOptions',
        get: function get() {
            return {
                showAddButton: true,
                showEditButton: true,
                showDeleteButton: true
            };
        }
    }, {
        key: 'helpers',
        get: function get() {
            var self = this;
            return {
                prepareColumns: function prepareColumns(columns, options) {
                    var icnOnly = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span>#= text #</a>");
                    //let icnOnly = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span></a>");
                    if (options.showEditButton || options.showDeleteButton) {
                        var commands = [];
                        if (options.showEditButton) {
                            commands.push({ name: "Edit", text: "Edit", click: self.editButtonClicked, iconName: "edit", template: icnOnly });
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
                prepareHeader: function prepareHeader(options) {
                    var icnAndLabel = kendo.template("<a class='cust-icon-16 k-grid-#= name #' href='\\#' title='#= text #'><span class='icn-#= iconName #-16'></span>#= iconText #</a>");
                    if (options.showAddButton) {
                        return [{ name: 'add', text: 'Add', iconName: 'add', template: icnAndLabel, iconText: "Add" }];
                    }
                    return null;
                }
            };
        }
    }]);

    return Grid;
}(_react2.default.Component);

Grid.propTypes = {
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        title: _propTypes2.default.string.isRequired,
        field: _propTypes2.default.string.isRequired
    })).isRequired,
    data: _propTypes2.default.array.isRequired,
    options: _propTypes2.default.shape({
        showAddButton: _propTypes2.default.bool,
        showEditButton: _propTypes2.default.bool,
        showDeleteButton: _propTypes2.default.bool,
        addButtonAction: _propTypes2.default.func,
        editButtonAction: _propTypes2.default.func,
        deleteButtonAction: _propTypes2.default.func
    })
};

exports.default = Grid;

},{"./../../CompareUtils":3,"prop-types":32,"react":"react","underscore":"underscore"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(Button, [{
        key: 'onClick',
        value: function onClick(e) {
            if (_underscore2.default.isFunction(this.props.onClick)) {
                this.props.onClick(e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                { className: this.props.className, onClick: this.props.onClick },
                this.props.children
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

;

Button.propTypes = {
    children: _propTypes2.default.node
};

exports.default = Button;

},{"prop-types":32,"react":"react","underscore":"underscore"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextBox = function (_React$Component) {
    _inherits(TextBox, _React$Component);

    function TextBox(props) {
        _classCallCheck(this, TextBox);

        var _this = _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(TextBox, [{
        key: 'onChange',
        value: function onChange(e) {
            if (_underscore2.default.isFunction(this.props.onChange)) {
                var target = e.target;
                this.props.onChange(target.name, target.value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.label && _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ),
                _react2.default.createElement('input', { type: 'text',
                    className: this.props.className,
                    name: this.props.name,
                    value: this.props.value,
                    onChange: this.onChange
                })
            );
        }
    }]);

    return TextBox;
}(_react2.default.Component);

;
TextBox.propTypes = {
    className: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.node
};

exports.default = TextBox;

},{"prop-types":32,"react":"react","underscore":"underscore"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageLayout = function (_React$Component) {
    _inherits(PageLayout, _React$Component);

    function PageLayout(props) {
        _classCallCheck(this, PageLayout);

        return _possibleConstructorReturn(this, (PageLayout.__proto__ || Object.getPrototypeOf(PageLayout)).call(this, props));
    }

    _createClass(PageLayout, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'page-layout' },
                this.props.children
            );
        }
    }]);

    return PageLayout;
}(_react2.default.Component);

;

exports.default = PageLayout;

},{"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingBar = function (_React$Component) {
    _inherits(LoadingBar, _React$Component);

    function LoadingBar() {
        _classCallCheck(this, LoadingBar);

        return _possibleConstructorReturn(this, (LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).apply(this, arguments));
    }

    _createClass(LoadingBar, [{
        key: 'render',
        value: function render() {
            if (!this.props.showLoading) {
                return null;
            }
            return _react2.default.createElement('div', { className: 'loading-bar' });
        }
    }]);

    return LoadingBar;
}(_react2.default.Component);

LoadingBar.propTypes = {
    showLoading: _propTypes2.default.bool
};

function mapStateToProps(state) {
    return {
        showLoading: state.ui.showLoading
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);

},{"prop-types":32,"react":"react","react-redux":"react-redux"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalDialog = function (_React$Component) {
    _inherits(ModalDialog, _React$Component);

    function ModalDialog(props) {
        _classCallCheck(this, ModalDialog);

        return _possibleConstructorReturn(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this, props));
    }

    _createClass(ModalDialog, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'modal', style: { display: 'block' } },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog modal-dialog-centered' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return ModalDialog;
}(_react2.default.Component);

exports.default = ModalDialog;

},{"react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'modal-header' },
                this.props.children
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

;

var Body = function (_React$Component2) {
    _inherits(Body, _React$Component2);

    function Body(props) {
        _classCallCheck(this, Body);

        return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));
    }

    _createClass(Body, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'modal-body' },
                this.props.children
            );
        }
    }]);

    return Body;
}(_react2.default.Component);

;

var Footer = function (_React$Component3) {
    _inherits(Footer, _React$Component3);

    function Footer(props) {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'modal-footer' },
                this.props.children
            );
        }
    }]);

    return Footer;
}(_react2.default.Component);

;

exports.default = { Header: Header, Body: Body, Footer: Footer };

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var actionTypes = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING'
};
exports.actionTypes = actionTypes;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseModel = function () {
    function BaseModel(item, fields) {
        _classCallCheck(this, BaseModel);

        var self = this;
        if (!item) {
            _underscore2.default.mapObject(fields, function (val, key) {
                self[key] = self.getBaseValue(val);
            });
        } else {
            _underscore2.default.mapObject(fields, function (val, key) {
                self[key] = item[key];
            });
        }
    }

    _createClass(BaseModel, [{
        key: 'getBaseValue',
        value: function getBaseValue(fieldDescription) {
            if (!_underscore2.default.isUndefined(fieldDescription.defaultValue)) {
                return fieldDescription.defaultValue;
            }
            switch (fieldDescription.type) {
                case 'int':
                case 'double':
                case 'time':
                    return 0;
                case 'string':
                    return '';
                case 'bool':
                    return false;
                case 'date':
                    return new Date();
                case 'color':
                    return '#000000';
            }
            return undefined;
        }
    }], [{
        key: 'transformList',
        value: function transformList(items, model) {
            var transformed = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    transformed.push(new model(item));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return transformed;
        }
    }]);

    return BaseModel;
}();

exports.default = BaseModel;

},{"underscore":"underscore"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Constants = require('../Constants');

var initialState = {
    showLoading: false
};

function uiReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _Constants.actionTypes.SHOW_LOADING:
            return Object.assign({}, state, { showLoading: true });
        case _Constants.actionTypes.HIDE_LOADING:
            return Object.assign({}, state, { showLoading: false });
        default:
            return state;

    }
}

exports.default = uiReducer;

},{"../Constants":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
    function Ajax() {
        _classCallCheck(this, Ajax);
    }

    _createClass(Ajax, null, [{
        key: 'executeRequest',
        value: function executeRequest(method, url, data) {
            return _axios2.default[method](url, data).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'get',
        value: function get(url) {
            return Ajax.executeRequest('get', url);
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            return Ajax.executeRequest('post', url, data);
        }
    }, {
        key: 'put',
        value: function put(url, data) {
            return Ajax.executeRequest('put', url, data);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            return Ajax.executeRequest('delete', url);
        }
    }]);

    return Ajax;
}();

exports.default = Ajax;

},{"axios":"axios"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteSkillCancel = exports.deleteSkill = exports.openSkillDeletePopup = exports.saveSkillCancel = exports.saveSkill = exports.openSkillDetailsPopup = exports.getSkills = undefined;

var _UI = require('./../../../Common/Actions/UI');

var _UI2 = _interopRequireDefault(_UI);

var _Constants = require('./../Constants');

var _Ajax = require('./../../../Infrastructure/Ajax');

var _Ajax2 = _interopRequireDefault(_Ajax);

var _SkillModel = require('./../Models/SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

var _Routes = require('./../Routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSkills() {
    return function (dispatch) {
        dispatch(_UI2.default.showLoading());
        return _Ajax2.default.get(_Routes.skillRoutes.getAllUrl()).then(function (response) {
            dispatch(_UI2.default.hideLoading());
            dispatch(getSkillsSuccess(response.data));
        });
    };
}
function getSkillsSuccess(data) {
    return {
        type: _Constants.actionTypes.GET_SKILLS_SUCCESS,
        skillsList: _SkillModel2.default.transformList(data)
    };
}
function openSkillDetailsPopup(skill) {
    return {
        type: _Constants.actionTypes.EDIT_SKILL,
        selectedSkill: skill
    };
}

function saveSkill(skill) {
    return function (dispatch) {
        dispatch(_UI2.default.showLoading());
        var hasId = skill[_SkillModel2.default.Identifier] > 0;
        var method = hasId ? 'put' : 'post';
        var url = hasId ? _Routes.skillRoutes.updateUrl(skill) : _Routes.skillRoutes.createUrl();
        return _Ajax2.default[method](url, skill).then(function (response) {
            dispatch(_UI2.default.hideLoading());
            dispatch(saveSkillSuccess(response.data));
        });
    };
}

function saveSkillSuccess(skill) {
    return {
        type: _Constants.actionTypes.SAVE_SKILL_SUCCESS,
        savedSkill: new _SkillModel2.default(skill)
    };
}

function saveSkillCancel() {
    return {
        type: _Constants.actionTypes.SAVE_SKILL_CANCEL
    };
}

function openSkillDeletePopup(skill) {
    return {
        type: _Constants.actionTypes.DELETE_SKILL,
        selectedSkill: skill
    };
}

function deleteSkill(skill) {
    return function (dispatch) {
        dispatch(_UI2.default.showLoading());
        return _Ajax2.default.delete(_Routes.skillRoutes.deleteUrl(skill)).then(function (response) {
            dispatch(_UI2.default.hideLoading());
            dispatch(deleteSkillSuccess(skill));
        });
    };
}

function deleteSkillSuccess(skill) {
    return {
        type: _Constants.actionTypes.DELETE_SKILL_SUCCESS,
        deletedSkill: skill
    };
}

function deleteSkillCancel() {
    return {
        type: _Constants.actionTypes.DELETE_SKILL_CANCEL
    };
}

exports.getSkills = getSkills;
exports.openSkillDetailsPopup = openSkillDetailsPopup;
exports.saveSkill = saveSkill;
exports.saveSkillCancel = saveSkillCancel;
exports.openSkillDeletePopup = openSkillDeletePopup;
exports.deleteSkill = deleteSkill;
exports.deleteSkillCancel = deleteSkillCancel;

},{"./../../../Common/Actions/UI":1,"./../../../Infrastructure/Ajax":14,"./../Constants":19,"./../Models/SkillModel":20,"./../Routes":22}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _CompareUtils = require('./../../../Common/CompareUtils');

var _Button = require('./../../../Common/Components/Input/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ModalDialog = require('./../../../Common/Components/Modal/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalDialogComponents = require('./../../../Common/Components/Modal/ModalDialogComponents');

var _ModalDialogComponents2 = _interopRequireDefault(_ModalDialogComponents);

var _Skills = require('./../Actions/Skills');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteSkillDialog = function (_React$Component) {
    _inherits(DeleteSkillDialog, _React$Component);

    function DeleteSkillDialog(props) {
        _classCallCheck(this, DeleteSkillDialog);

        var _this = _possibleConstructorReturn(this, (DeleteSkillDialog.__proto__ || Object.getPrototypeOf(DeleteSkillDialog)).call(this, props));

        _this.onDelete = _this.onDelete.bind(_this);
        _this.onCancel = _this.onCancel.bind(_this);
        return _this;
    }

    _createClass(DeleteSkillDialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedSkill === null) {
                this.setState({
                    selectedSkill: null
                });
                return;
            }
            if (!(0, _CompareUtils.deepCompare)(nextProps.selectedSkill, this.props.selectedSkill)) {
                this.setState({
                    selectedSkill: Object.assign({}, nextProps.selectedSkill)
                });
            }
        }
    }, {
        key: 'onDelete',
        value: function onDelete() {
            this.props.dispatch((0, _Skills.deleteSkill)(Object.assign({}, this.state.selectedSkill)));
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            this.props.dispatch((0, _Skills.deleteSkillCancel)());
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state || !this.state.selectedSkill) {
                return null;
            }
            return _react2.default.createElement(
                _ModalDialog2.default,
                null,
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Header,
                    null,
                    'Delete Skill'
                ),
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Body,
                    null,
                    'Are you sure you wish to delete this skill?'
                ),
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Footer,
                    null,
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: 'btn btn-primary',
                            onClick: this.onDelete },
                        'Delete'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: 'btn',
                            onClick: this.onCancel },
                        'Close'
                    )
                )
            );
        }
    }]);

    return DeleteSkillDialog;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        selectedSkill: state.skills.selectedDeleteSkill
    };
}
//DeleteSkillDialog.propTypes = {
//    selectedSkill: PropTypes.instanceOf(SkillModel)
//}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DeleteSkillDialog);

},{"./../../../Common/CompareUtils":3,"./../../../Common/Components/Input/Button":5,"./../../../Common/Components/Modal/ModalDialog":9,"./../../../Common/Components/Modal/ModalDialogComponents":10,"./../Actions/Skills":15,"prop-types":32,"react":"react","react-redux":"react-redux"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _CompareUtils = require('./../../../Common/CompareUtils');

var _Button = require('./../../../Common/Components/Input/Button');

var _Button2 = _interopRequireDefault(_Button);

var _TextBox = require('./../../../Common/Components/Input/TextBox');

var _TextBox2 = _interopRequireDefault(_TextBox);

var _ModalDialog = require('./../../../Common/Components/Modal/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalDialogComponents = require('./../../../Common/Components/Modal/ModalDialogComponents');

var _ModalDialogComponents2 = _interopRequireDefault(_ModalDialogComponents);

var _SkillModel = require('./../Models/SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

var _Skills = require('./../Actions/Skills');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditSkillDialog = function (_React$Component) {
    _inherits(EditSkillDialog, _React$Component);

    function EditSkillDialog(props) {
        _classCallCheck(this, EditSkillDialog);

        var _this = _possibleConstructorReturn(this, (EditSkillDialog.__proto__ || Object.getPrototypeOf(EditSkillDialog)).call(this, props));

        _this.onSave = _this.onSave.bind(_this);
        _this.onCancel = _this.onCancel.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        return _this;
    }

    _createClass(EditSkillDialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedSkill === null) {
                this.setState({
                    selectedSkill: null
                });
                return;
            }
            if (!(0, _CompareUtils.deepCompare)(nextProps.selectedSkill, this.props.selectedSkill)) {
                this.setState({
                    selectedSkill: Object.assign({}, nextProps.selectedSkill)
                });
            }
        }
    }, {
        key: 'onSave',
        value: function onSave() {
            this.props.dispatch((0, _Skills.saveSkill)(Object.assign({}, this.state.selectedSkill)));
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            this.props.dispatch((0, _Skills.saveSkillCancel)());
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(name, value) {
            var selectedSkill = Object.assign({}, this.state.selectedSkill);
            selectedSkill[name] = value;

            this.setState({
                selectedSkill: selectedSkill
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state || !this.state.selectedSkill) {
                return null;
            }
            return _react2.default.createElement(
                _ModalDialog2.default,
                null,
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Header,
                    null,
                    'Edit Skill'
                ),
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Body,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'container-fluid' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col' },
                                _react2.default.createElement(_TextBox2.default, {
                                    label: 'Name',
                                    name: 'name',
                                    value: this.state.selectedSkill.name,
                                    onChange: this.handleInputChange
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col' },
                                _react2.default.createElement(_TextBox2.default, {
                                    label: 'Short Name',
                                    name: 'shortName',
                                    value: this.state.selectedSkill.shortName,
                                    onChange: this.handleInputChange
                                })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _ModalDialogComponents2.default.Footer,
                    null,
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: 'btn btn-primary',
                            onClick: this.onSave },
                        'Save'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        {
                            className: 'btn',
                            onClick: this.onCancel },
                        'Close'
                    )
                )
            );
        }
    }]);

    return EditSkillDialog;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        selectedSkill: state.skills.selectedSkill
    };
}
//EditSkillDialog.propTypes = {
//    selectedSkill: PropTypes.instanceOf(SkillModel)
//}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(EditSkillDialog);

},{"./../../../Common/CompareUtils":3,"./../../../Common/Components/Input/Button":5,"./../../../Common/Components/Input/TextBox":6,"./../../../Common/Components/Modal/ModalDialog":9,"./../../../Common/Components/Modal/ModalDialogComponents":10,"./../Actions/Skills":15,"./../Models/SkillModel":20,"prop-types":32,"react":"react","react-redux":"react-redux"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Skills = require('./../Actions/Skills');

var _Constants = require('./../Constants');

var _Grid = require('./../../../Common/Components/Grid/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SkillModel = require('./../Models/SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkillsGrid = function (_React$Component) {
    _inherits(SkillsGrid, _React$Component);

    function SkillsGrid(props) {
        _classCallCheck(this, SkillsGrid);

        return _possibleConstructorReturn(this, (SkillsGrid.__proto__ || Object.getPrototypeOf(SkillsGrid)).call(this, props));
    }

    _createClass(SkillsGrid, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.dispatch((0, _Skills.getSkills)());
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Grid2.default, {
                columns: _Constants.gridColumns,
                data: this.props.skills,
                options: this.gridOptions
            });
        }
    }, {
        key: 'gridOptions',
        get: function get() {
            var component = this;
            return {
                onEditButtonClick: function onEditButtonClick(item, event) {
                    component.props.dispatch((0, _Skills.openSkillDetailsPopup)(item));
                },
                onAddButtonClick: function onAddButtonClick(event) {
                    component.props.dispatch((0, _Skills.openSkillDetailsPopup)(new _SkillModel2.default()));
                },
                onDeleteButtonClick: function onDeleteButtonClick(item, event) {
                    component.props.dispatch((0, _Skills.openSkillDeletePopup)(item));
                }
            };
        }
    }]);

    return SkillsGrid;
}(_react2.default.Component);

SkillsGrid.propTypes = {
    skills: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_SkillModel2.default)),
    dispatch: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
    return {
        skills: state.skills.skillsList
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SkillsGrid);

},{"./../../../Common/Components/Grid/Grid":4,"./../Actions/Skills":15,"./../Constants":19,"./../Models/SkillModel":20,"prop-types":32,"react":"react","react-redux":"react-redux"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var actionTypes = {
    GET_SKILLS: 'GET_SKILLS',
    GET_SKILLS_SUCCESS: 'GET_SKILLS_SUCCESS',
    CREATE_NEW_SKILL: 'CREATE_NEW_SKILL',
    EDIT_SKILL: 'EDIT_SKILL',
    SAVE_SKILL: 'SAVE_SKILL',
    SAVE_SKILL_CANCEL: 'SAVE_SKILL_CANCEL',
    SAVE_SKILL_SUCCESS: 'SAVE_SKILL_SUCCESS',
    DELETE_SKILL: 'DELETE_SKILL',
    DELETE_SKILL_CANCEL: 'DELETE_SKILL_CANCEL',
    DELETE_SKILL_SUCCESS: 'DELETE_SKILL_SUCCESS'
};

var gridColumns = [{ title: 'Name', field: 'name' }, { title: 'Short name', field: 'shortName' }, { title: 'Category', field: 'category' }];

exports.actionTypes = actionTypes;
exports.gridColumns = gridColumns;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _BaseModel2 = require('./../../../Common/Models/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkillModel = function (_BaseModel) {
    _inherits(SkillModel, _BaseModel);

    function SkillModel(skill) {
        _classCallCheck(this, SkillModel);

        return _possibleConstructorReturn(this, (SkillModel.__proto__ || Object.getPrototypeOf(SkillModel)).call(this, skill, SkillModel.fields));
    }

    _createClass(SkillModel, null, [{
        key: 'transformList',
        value: function transformList(skills) {
            return _get(SkillModel.__proto__ || Object.getPrototypeOf(SkillModel), 'transformList', this).call(this, skills, SkillModel);
        }
    }, {
        key: 'fields',
        get: function get() {
            return {
                id: {
                    type: 'int'
                },
                name: {
                    type: 'string',
                    validators: {
                        required: true
                    }
                },
                shortName: {
                    type: 'string',
                    validators: {
                        required: true
                    }
                },
                foreColor: {
                    type: 'color'
                },
                category: {
                    type: 'string'
                },
                active: {
                    type: 'bool'
                },
                email: {
                    type: 'string',
                    validators: {
                        email: true
                    }
                },
                startDate: {
                    type: 'date'
                },
                startTime: {
                    type: 'time'
                },
                length: {
                    type: 'int'
                },
                percentage: {
                    type: 'double'
                },
                calculationType: {
                    type: 'int'
                }
            };
        }
    }, {
        key: 'Identifier',
        get: function get() {
            return 'id';
        }
    }]);

    return SkillModel;
}(_BaseModel3.default);

exports.default = SkillModel;

},{"./../../../Common/Models/BaseModel":12,"underscore":"underscore"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Constants = require('../Constants');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ArrayUtils = require('./../../../Common/ArrayUtils');

var _SkillModel = require('./../Models/SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    skillsList: [],
    selectedSkill: null,
    selectedDeleteSkill: null
};

function skillsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _Constants.actionTypes.GET_SKILLS_SUCCESS:
            return Object.assign({}, state, { skillsList: action.skillsList });
        case _Constants.actionTypes.CREATE_NEW_SKILL:
            return Object.assign({}, state, { selectedSkill: {} });
        case _Constants.actionTypes.EDIT_SKILL:
            return Object.assign({}, state, { selectedSkill: action.selectedSkill });
        case _Constants.actionTypes.DELETE_SKILL:
            return Object.assign({}, state, { selectedDeleteSkill: action.selectedSkill });
        case _Constants.actionTypes.SAVE_SKILL_SUCCESS:
            return Object.assign({}, state, { skillsList: (0, _ArrayUtils.addReplaceItem)(state.skillsList, action.savedSkill, _SkillModel2.default.Identifier), selectedSkill: null });
        case _Constants.actionTypes.DELETE_SKILL_SUCCESS:
            return Object.assign({}, state, { skillsList: (0, _ArrayUtils.removeItem)(state.skillsList, action.deletedSkill, _SkillModel2.default.Identifier), selectedDeleteSkill: null });
        case _Constants.actionTypes.SAVE_SKILL_CANCEL:
            return Object.assign({}, state, { selectedSkill: null });
        case _Constants.actionTypes.DELETE_SKILL_CANCEL:
            return Object.assign({}, state, { selectedDeleteSkill: null });
        default:
            return state;
    }
}

exports.default = skillsReducer;

},{"../Constants":19,"./../../../Common/ArrayUtils":2,"./../Models/SkillModel":20,"underscore":"underscore"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.skillRoutes = undefined;

var _SkillModel = require('./Models/SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var skillRoutes = {
    getAllUrl: function getAllUrl() {
        return '/api/' + 'skills';
    },
    getSingleUrl: function getSingleUrl(skill) {
        return '/api/' + 'skills/' + skill[_SkillModel2.default.Identifier];
    },
    createUrl: function createUrl() {
        return '/api/' + 'skills';
    },
    updateUrl: function updateUrl(skill) {
        return '/api/' + 'skills/' + skill[_SkillModel2.default.Identifier];
    },
    deleteUrl: function deleteUrl(skill) {
        return '/api/' + 'skills/' + skill[_SkillModel2.default.Identifier];
    }
};

exports.skillRoutes = skillRoutes;

},{"./Models/SkillModel":20}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _SkillsReducer = require('./Reducers/SkillsReducer');

var _SkillsReducer2 = _interopRequireDefault(_SkillsReducer);

var _UIReducer = require('./../../Common/Reducers/UIReducer');

var _UIReducer2 = _interopRequireDefault(_UIReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appReducer = (0, _redux.combineReducers)({
    skills: _SkillsReducer2.default,
    ui: _UIReducer2.default
});
var rootReducer = function rootReducer(state, action) {
    return appReducer(state, action);
};

var store = (0, _redux.createStore)(rootReducer, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default)));

exports.default = store;

},{"./../../Common/Reducers/UIReducer":13,"./Reducers/SkillsReducer":21,"redux":"redux","redux-thunk":35}],24:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _store = require('./Pages/Skills/store');

var _store2 = _interopRequireDefault(_store);

var _Pagelayout = require('./Common/Components/Layout/Pagelayout');

var _Pagelayout2 = _interopRequireDefault(_Pagelayout);

var _LoadingBar = require('./Common/Components/Loading/LoadingBar');

var _LoadingBar2 = _interopRequireDefault(_LoadingBar);

var _SkillsGrid = require('./Pages/Skills/Components/SkillsGrid');

var _SkillsGrid2 = _interopRequireDefault(_SkillsGrid);

var _EditSkillDialog = require('./Pages/Skills/Components/EditSkillDialog');

var _EditSkillDialog2 = _interopRequireDefault(_EditSkillDialog);

var _DeleteSkillDialog = require('./Pages/Skills/Components/DeleteSkillDialog');

var _DeleteSkillDialog2 = _interopRequireDefault(_DeleteSkillDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_LoadingBar2.default, null),
        _react2.default.createElement(
            _Pagelayout2.default,
            null,
            _react2.default.createElement(_SkillsGrid2.default, null)
        ),
        _react2.default.createElement(_EditSkillDialog2.default, null),
        _react2.default.createElement(_DeleteSkillDialog2.default, null)
    )
), document.getElementById('skillsRootElement'));

},{"./Common/Components/Layout/Pagelayout":7,"./Common/Components/Loading/LoadingBar":8,"./Pages/Skills/Components/DeleteSkillDialog":16,"./Pages/Skills/Components/EditSkillDialog":17,"./Pages/Skills/Components/SkillsGrid":18,"./Pages/Skills/store":23,"react":"react","react-dom":"react-dom","react-redux":"react-redux"}],25:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],26:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":28}],27:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":25,"_process":28}],28:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],29:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))

},{"./lib/ReactPropTypesSecret":33,"_process":28,"fbjs/lib/invariant":26,"fbjs/lib/warning":27}],30:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":33,"fbjs/lib/emptyFunction":25,"fbjs/lib/invariant":26}],31:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');
var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))

},{"./checkPropTypes":29,"./lib/ReactPropTypesSecret":33,"_process":28,"fbjs/lib/emptyFunction":25,"fbjs/lib/invariant":26,"fbjs/lib/warning":27,"object-assign":34}],32:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))

},{"./factoryWithThrowingShims":30,"./factoryWithTypeCheckers":31,"_process":28}],33:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],34:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}]},{},[24])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL0NvbW1vbi9BY3Rpb25zL1VJLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0FycmF5VXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcGFyZVV0aWxzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvR3JpZC9HcmlkLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveC5qc3giLCJTY3JpcHRzL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0LmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTG9hZGluZy9Mb2FkaW5nQmFyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL01vZGVscy9CYXNlTW9kZWwuanN4IiwiU2NyaXB0cy9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyLmpzeCIsIlNjcmlwdHMvSW5mcmFzdHJ1Y3R1cmUvQWpheC5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9BY3Rpb25zL1NraWxscy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0RlbGV0ZVNraWxsRGlhbG9nLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvRWRpdFNraWxsRGlhbG9nLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvU2tpbGxzR3JpZC5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db25zdGFudHMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvTW9kZWxzL1NraWxsTW9kZWwuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvUmVkdWNlcnMvU2tpbGxzUmVkdWNlci5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Sb3V0ZXMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvc3RvcmUuanN4IiwiU2NyaXB0cy9Ta2lsbHNCdW5kbGUuanN4Iiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUM7O0FBRUQsU0FBUyxXQUFULEdBQXVCO0FBQ25CLFdBQU87QUFDSCxjQUFNLHVCQUFZO0FBRGYsS0FBUDtBQUdIOztBQUVELFNBQVMsV0FBVCxHQUF1QjtBQUNuQixXQUFPO0FBQ0gsY0FBTSx1QkFBWTtBQURmLEtBQVA7QUFHSDs7a0JBRWMsRUFBRSx3QkFBRixFQUFlLHdCQUFmLEU7Ozs7Ozs7Ozs7QUNkZDs7Ozs7Ozs7QUFFRCxTQUFTLGNBQVQs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SjtBQU1JO0FBTko7QUFESixDQURKLEVBV0ksU0FBUyxjQUFULENBQXdCLG1CQUF4QixDQVhKOzs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM5aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCLvu79pbXBvcnQgeyBhY3Rpb25UeXBlcyB9IGZyb20gJy4vLi4vQ29uc3RhbnRzJztcclxuXHJcbmZ1bmN0aW9uIHNob3dMb2FkaW5nKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TSE9XX0xPQURJTkdcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2FkaW5nKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ISURFX0xPQURJTkdcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc2hvd0xvYWRpbmcsIGhpZGVMb2FkaW5nIH07Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5mdW5jdGlvbiBhZGRSZXBsYWNlSXRlbShsaXN0LCBpdGVtLCBpZGVudGlmaWVyKSB7XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGxldCBleGlzdGluZ0luZGV4ID0gXy5maW5kSW5kZXgobGlzdCwgZnVuY3Rpb24gKGN1cnJlbnQpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFtpZGVudGlmaWVyXSA9PT0gaXRlbVtpZGVudGlmaWVyXTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxpc3QgPSBsaXN0LnNsaWNlKCk7XHJcbiAgICAgICAgbGlzdFtleGlzdGluZ0luZGV4XSA9IGl0ZW07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgaXRlbV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVJdGVtKGxpc3QsIGl0ZW0sIGlkZW50aWZpZXIpIHtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgbGV0IGV4aXN0aW5nSW5kZXggPSBfLmZpbmRJbmRleChsaXN0LCBmdW5jdGlvbiAoY3VycmVudCkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50W2lkZW50aWZpZXJdID09PSBpdGVtW2lkZW50aWZpZXJdO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgdmFyIHRlbXBMaXN0ID0gbGlzdC5zbGljZSgpO1xyXG4gICAgICAgIHRlbXBMaXN0LnNwbGljZShleGlzdGluZ0luZGV4LCAxKTtcclxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5cclxuZXhwb3J0IHsgYWRkUmVwbGFjZUl0ZW0sIHJlbW92ZUl0ZW0gfTsiLCLvu79mdW5jdGlvbiBkZWVwQ29tcGFyZShvYmoxLCBvYmoyKSB7XHJcbiAgICBpZiAoIW9iajEgfHwgIW9iajIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBwIGluIG9iajEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIChvYmoxW3BdKSA9PSAnZnVuY3Rpb24nKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgIGlmIChvYmoxLmhhc093blByb3BlcnR5KHApICE9PSBvYmoyLmhhc093blByb3BlcnR5KHApKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiAob2JqMVtwXSkpIHtcclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIGlmICghZGVlcENvbXBhcmUob2JqMVtwXSwgb2JqMltwXSkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChvYmoxW3BdICE9PSBvYmoyW3BdKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIHEgaW4gb2JqMikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKG9iajFbcV0pID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZGVlcENvbXBhcmUgfSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgeyBkZWVwQ29tcGFyZSB9IGZyb20gJy4vLi4vLi4vQ29tcGFyZVV0aWxzJ1xyXG5cclxuY2xhc3MgR3JpZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQgPSB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGlja2VkID0gdGhpcy5lZGl0QnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQnV0dG9uQ2xpY2tlZCA9IHRoaXMuZGVsZXRlQnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPXtcclxuICAgICAgICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5wcm9wcy5vcHRpb25zKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLmRhdGEsIHRoaXMucHJvcHMuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wuZGF0YVNvdXJjZS5kYXRhKG5leHRQcm9wcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmtlbmRvQ29udHJvbCA9ICQodGhpcy5jb250YWluZXJFbGVtZW50KS5rZW5kb0dyaWQoe1xyXG4gICAgICAgICAgICBkYXRhc291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5oZWxwZXJzLnByZXBhcmVDb2x1bW5zKHRoaXMucHJvcHMuY29sdW1ucy5zbGljZSgpLCB0aGlzLnN0YXRlLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICB0b29sYmFyOiB0aGlzLmhlbHBlcnMucHJlcGFyZUhlYWRlcih0aGlzLnN0YXRlLm9wdGlvbnMpXHJcbiAgICAgICAgfSkuZGF0YSgna2VuZG9HcmlkJyk7XHJcbiAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wud3JhcHBlci5hZGRDbGFzcygnbm8tc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wud3JhcHBlci5maW5kKCcuay1ncmlkLWFkZCcpLm9mZignY2xpY2snKS5vbignY2xpY2snLCB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua2VuZG9Db250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2VuZG9Db250cm9sLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YUl0ZW1Gcm9tS2VuZG9HcmlkKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZW5kb0NvbnRyb2wuZGF0YUl0ZW0oJChlLnRhcmdldCkuY2xvc2VzdCgndHInKSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkQnV0dG9uQ2xpY2tlZChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zdGF0ZS5vcHRpb25zLm9uQWRkQnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkFkZEJ1dHRvbkNsaWNrKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVkaXRCdXR0b25DbGlja2VkKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnN0YXRlLm9wdGlvbnMub25FZGl0QnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkVkaXRCdXR0b25DbGljayh0aGlzLmdldERhdGFJdGVtRnJvbUtlbmRvR3JpZChlKSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlQnV0dG9uQ2xpY2tlZChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zdGF0ZS5vcHRpb25zLm9uRGVsZXRlQnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkRlbGV0ZUJ1dHRvbkNsaWNrKHRoaXMuZ2V0RGF0YUl0ZW1Gcm9tS2VuZG9HcmlkKGUpLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNob3dBZGRCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dFZGl0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBzaG93RGVsZXRlQnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWxwZXJzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwcmVwYXJlQ29sdW1ucyhjb2x1bW5zLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNuT25seSA9IGtlbmRvLnRlbXBsYXRlKFwiPGEgY2xhc3M9J2N1c3QtaWNvbi0xNiBrLWdyaWQtIz0gbmFtZSAjJyBocmVmPSdcXFxcIycgdGl0bGU9JyM9IHRleHQgIyc+PHNwYW4gY2xhc3M9J2ljbi0jPSBpY29uTmFtZSAjLTE2Jz48L3NwYW4+Iz0gdGV4dCAjPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGljbk9ubHkgPSBrZW5kby50ZW1wbGF0ZShcIjxhIGNsYXNzPSdjdXN0LWljb24tMTYgay1ncmlkLSM9IG5hbWUgIycgaHJlZj0nXFxcXCMnIHRpdGxlPScjPSB0ZXh0ICMnPjxzcGFuIGNsYXNzPSdpY24tIz0gaWNvbk5hbWUgIy0xNic+PC9zcGFuPjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93RWRpdEJ1dHRvbiB8fCBvcHRpb25zLnNob3dEZWxldGVCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93RWRpdEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHsgbmFtZTogXCJFZGl0XCIsIHRleHQ6IFwiRWRpdFwiLCBjbGljazogc2VsZi5lZGl0QnV0dG9uQ2xpY2tlZCwgaWNvbk5hbWU6IFwiZWRpdFwiLCB0ZW1wbGF0ZTogaWNuT25seSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0RlbGV0ZUJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHsgbmFtZTogXCJkZWxldGVcIiwgdGV4dDogJ0RlbGV0ZScsIGNsaWNrOiBzZWxmLmRlbGV0ZUJ1dHRvbkNsaWNrZWQsIGljb25OYW1lOiBcImRlbGV0ZVwiLCB0ZW1wbGF0ZTogaWNuT25seSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uc1tjb2x1bW5zLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlcGFyZUhlYWRlcihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNuQW5kTGFiZWwgPSBrZW5kby50ZW1wbGF0ZShcIjxhIGNsYXNzPSdjdXN0LWljb24tMTYgay1ncmlkLSM9IG5hbWUgIycgaHJlZj0nXFxcXCMnIHRpdGxlPScjPSB0ZXh0ICMnPjxzcGFuIGNsYXNzPSdpY24tIz0gaWNvbk5hbWUgIy0xNic+PC9zcGFuPiM9IGljb25UZXh0ICM8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0FkZEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBuYW1lOiAnYWRkJywgdGV4dDogJ0FkZCcsIGljb25OYW1lOiAnYWRkJywgdGVtcGxhdGU6IGljbkFuZExhYmVsLCBpY29uVGV4dDogXCJBZGRcIiB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiByZWY9eyhub2RlKSA9PiB7IHRoaXMuY29udGFpbmVyRWxlbWVudCA9IG5vZGU7IH19ID48L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuR3JpZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBmaWVsZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICAgICAgfSlcclxuICAgICkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICBzaG93QWRkQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBzaG93RWRpdEJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgc2hvd0RlbGV0ZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgYWRkQnV0dG9uQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBlZGl0QnV0dG9uQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBkZWxldGVCdXR0b25BY3Rpb246IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5jbGFzcyBUZXh0Qm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZShlKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQ2hhbmdlKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0YXJnZXQubmFtZSwgdGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGFiZWwgJiZcclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9sYWJlbD5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCdcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50Pik7XHJcbiAgICB9XHJcbn07XHJcblRleHRCb3gucHJvcFR5cGVzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMubm9kZVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dEJveDsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgUGFnZUxheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdwYWdlLWxheW91dCc+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlTGF5b3V0OyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcblxyXG5jbGFzcyBMb2FkaW5nQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hvd0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J2xvYWRpbmctYmFyJyAvPik7XHJcbiAgICB9XHJcbn1cclxuXHJcbkxvYWRpbmdCYXIucHJvcFR5cGVzID0ge1xyXG4gICAgc2hvd0xvYWRpbmc6IFByb3BUeXBlcy5ib29sXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzaG93TG9hZGluZzogc3RhdGUudWkuc2hvd0xvYWRpbmdcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShMb2FkaW5nQmFyKTsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgTW9kYWxEaWFsb2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21vZGFsJyBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWxEaWFsb2c7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1oZWFkZXInPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY2xhc3MgQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1ib2R5Jz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5jbGFzcyBGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtZm9vdGVyJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IEhlYWRlciwgQm9keSwgRm9vdGVyIH07Iiwi77u/Y29uc3QgYWN0aW9uVHlwZXMgPSB7XHJcbiAgICBTSE9XX0xPQURJTkc6ICdTSE9XX0xPQURJTkcnLFxyXG4gICAgSElERV9MT0FESU5HOiAnSElERV9MT0FESU5HJ1xyXG59XHJcbmV4cG9ydCB7IGFjdGlvblR5cGVzIH07Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcclxuXHJcbmNsYXNzIEJhc2VNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtLCBmaWVsZHMpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIF8ubWFwT2JqZWN0KGZpZWxkcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW2tleV0gPSBzZWxmLmdldEJhc2VWYWx1ZSh2YWwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF8ubWFwT2JqZWN0KGZpZWxkcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW2tleV0gPSBpdGVtW2tleV07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJhc2VWYWx1ZShmaWVsZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGZpZWxkRGVzY3JpcHRpb24uZGVmYXVsdFZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmllbGREZXNjcmlwdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZmllbGREZXNjcmlwdGlvbi50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvdWJsZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBjYXNlICdjb2xvcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyMwMDAwMDAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1MaXN0KGl0ZW1zLCBtb2RlbCkge1xyXG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZWQucHVzaChuZXcgbW9kZWwoaXRlbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VNb2RlbDsiLCLvu79pbXBvcnQgeyBhY3Rpb25UeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBzaG93TG9hZGluZzogZmFsc2VcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiB1aVJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuU0hPV19MT0FESU5HOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2hvd0xvYWRpbmc6IHRydWUgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5ISURFX0xPQURJTkc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzaG93TG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVpUmVkdWNlcjsiLCLvu79pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuY2xhc3MgQWpheCB7XHJcbiAgICBzdGF0aWMgZXhlY3V0ZVJlcXVlc3QobWV0aG9kLCB1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3NbbWV0aG9kXSh1cmwsIGRhdGEpXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBBamF4LmV4ZWN1dGVSZXF1ZXN0KCdnZXQnLCB1cmwpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ3Bvc3QnLCB1cmwsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHB1dCh1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gQWpheC5leGVjdXRlUmVxdWVzdCgncHV0JywgdXJsLCBkYXRhKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGUodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ2RlbGV0ZScsIHVybCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFqYXg7Iiwi77u/aW1wb3J0IHVpQWN0aW9ucyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9BY3Rpb25zL1VJJztcclxuaW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBBamF4IGZyb20gJy4vLi4vLi4vLi4vSW5mcmFzdHJ1Y3R1cmUvQWpheCc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5pbXBvcnQgeyBza2lsbFJvdXRlcyB9IGZyb20gJy4vLi4vUm91dGVzJztcclxuXHJcbmZ1bmN0aW9uIGdldFNraWxscygpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmdldChza2lsbFJvdXRlcy5nZXRBbGxVcmwoKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRTa2lsbHNTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldFNraWxsc1N1Y2Nlc3MoZGF0YSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5HRVRfU0tJTExTX1NVQ0NFU1MsXHJcbiAgICAgICAgc2tpbGxzTGlzdDogU2tpbGxNb2RlbC50cmFuc2Zvcm1MaXN0KGRhdGEpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIG9wZW5Ta2lsbERldGFpbHNQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5FRElUX1NLSUxMLFxyXG4gICAgICAgIHNlbGVjdGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVTa2lsbChza2lsbCkge1xyXG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuc2hvd0xvYWRpbmcoKSk7XHJcbiAgICAgICAgbGV0IGhhc0lkID0gc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXSA+IDA7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IGhhc0lkID8gJ3B1dCcgOiAncG9zdCc7XHJcbiAgICAgICAgbGV0IHVybCA9IGhhc0lkID8gc2tpbGxSb3V0ZXMudXBkYXRlVXJsKHNraWxsKSA6IHNraWxsUm91dGVzLmNyZWF0ZVVybCgpO1xyXG4gICAgICAgIHJldHVybiBBamF4W21ldGhvZF0odXJsLCBza2lsbClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChzYXZlU2tpbGxTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlU2tpbGxTdWNjZXNzKHNraWxsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLlNBVkVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBzYXZlZFNraWxsOiBuZXcgU2tpbGxNb2RlbChza2lsbClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX0NBTkNFTFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2tpbGxEZWxldGVQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTEwsXHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2tpbGxcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlU2tpbGwoc2tpbGwpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmRlbGV0ZShza2lsbFJvdXRlcy5kZWxldGVVcmwoc2tpbGwpKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHVpQWN0aW9ucy5oaWRlTG9hZGluZygpKTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBkZWxldGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfQ0FOQ0VMXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdldFNraWxscywgb3BlblNraWxsRGV0YWlsc1BvcHVwLCBzYXZlU2tpbGwsIHNhdmVTa2lsbENhbmNlbCwgb3BlblNraWxsRGVsZXRlUG9wdXAsIGRlbGV0ZVNraWxsLCBkZWxldGVTa2lsbENhbmNlbCB9Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgZGVlcENvbXBhcmUgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wYXJlVXRpbHMnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cnO1xyXG5pbXBvcnQgTW9kYWxEaWFsb2dDb21wb25lbnRzIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2dDb21wb25lbnRzJztcclxuaW1wb3J0IHsgZGVsZXRlU2tpbGwsIGRlbGV0ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBEZWxldGVTa2lsbERpYWxvZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uRGVsZXRlID0gdGhpcy5vbkRlbGV0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwsIHRoaXMucHJvcHMuc2VsZWN0ZWRTa2lsbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRlbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZVNraWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkpKTtcclxuICAgIH1cclxuICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZGVsZXRlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxEaWFsb2c+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICBEZWxldGUgU2tpbGxcclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdpc2ggdG8gZGVsZXRlIHRoaXMgc2tpbGw/XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkRGVsZXRlU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9EZWxldGVTa2lsbERpYWxvZy5wcm9wVHlwZXMgPSB7XHJcbi8vICAgIHNlbGVjdGVkU2tpbGw6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNraWxsTW9kZWwpXHJcbi8vfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKERlbGV0ZVNraWxsRGlhbG9nKSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IGRlZXBDb21wYXJlIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcGFyZVV0aWxzJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0lucHV0L0J1dHRvbic7XHJcbmltcG9ydCBUZXh0Qm94IGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveCc7XHJcbmltcG9ydCBNb2RhbERpYWxvZyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nQ29tcG9uZW50cyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nQ29tcG9uZW50cyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnXHJcbmltcG9ydCB7IHNhdmVTa2lsbCwgc2F2ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBFZGl0U2tpbGxEaWFsb2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vblNhdmUgPSB0aGlzLm9uU2F2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZWVwQ29tcGFyZShuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCwgdGhpcy5wcm9wcy5zZWxlY3RlZFNraWxsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IE9iamVjdC5hc3NpZ24oe30sIG5leHRQcm9wcy5zZWxlY3RlZFNraWxsKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2F2ZSgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHNhdmVTa2lsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwpKSk7XHJcbiAgICB9XHJcbiAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHNhdmVTa2lsbENhbmNlbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVJbnB1dENoYW5nZShuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFNraWxsID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKTtcclxuICAgICAgICBzZWxlY3RlZFNraWxsW25hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBzZWxlY3RlZFNraWxsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxEaWFsb2c+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICBFZGl0IFNraWxsXHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lci1mbHVpZCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9J05hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J25hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9J1Nob3J0IE5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J3Nob3J0TmFtZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbC5zaG9ydE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uU2F2ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNhdmVcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DYW5jZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuRm9vdGVyPlxyXG4gICAgICAgICAgICA8L01vZGFsRGlhbG9nPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZWxlY3RlZFNraWxsOiBzdGF0ZS5za2lsbHMuc2VsZWN0ZWRTa2lsbFxyXG4gICAgfTtcclxufVxyXG4vL0VkaXRTa2lsbERpYWxvZy5wcm9wVHlwZXMgPSB7XHJcbi8vICAgIHNlbGVjdGVkU2tpbGw6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNraWxsTW9kZWwpXHJcbi8vfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEVkaXRTa2lsbERpYWxvZykiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBnZXRTa2lsbHMsIG9wZW5Ta2lsbERldGFpbHNQb3B1cCwgb3BlblNraWxsRGVsZXRlUG9wdXAgfSBmcm9tICcuLy4uL0FjdGlvbnMvU2tpbGxzJztcclxuaW1wb3J0IHsgZ3JpZENvbHVtbnMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBHcmlkIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvR3JpZC9HcmlkJ1xyXG5pbXBvcnQgU2tpbGxNb2RlbCBmcm9tICcuLy4uL01vZGVscy9Ta2lsbE1vZGVsJztcclxuXHJcbmNsYXNzIFNraWxsc0dyaWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChnZXRTa2lsbHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdyaWRPcHRpb25zKCkge1xyXG4gICAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9uRWRpdEJ1dHRvbkNsaWNrKGl0ZW0sIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMuZGlzcGF0Y2gob3BlblNraWxsRGV0YWlsc1BvcHVwKGl0ZW0pKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkFkZEJ1dHRvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMuZGlzcGF0Y2gob3BlblNraWxsRGV0YWlsc1BvcHVwKG5ldyBTa2lsbE1vZGVsKCkpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrKGl0ZW0sIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMuZGlzcGF0Y2gob3BlblNraWxsRGVsZXRlUG9wdXAoaXRlbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JpZFxyXG4gICAgICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XHJcbiAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLnNraWxsc31cclxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ3JpZE9wdGlvbnN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuU2tpbGxzR3JpZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBza2lsbHM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKFNraWxsTW9kZWwpXHJcbiAgICApLFxyXG4gICAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNraWxsczogc3RhdGUuc2tpbGxzLnNraWxsc0xpc3RcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShTa2lsbHNHcmlkKTsiLCLvu79jb25zdCBhY3Rpb25UeXBlcyA9IHtcclxuICAgIEdFVF9TS0lMTFM6ICdHRVRfU0tJTExTJyxcclxuICAgIEdFVF9TS0lMTFNfU1VDQ0VTUzogJ0dFVF9TS0lMTFNfU1VDQ0VTUycsXHJcbiAgICBDUkVBVEVfTkVXX1NLSUxMOiAnQ1JFQVRFX05FV19TS0lMTCcsXHJcbiAgICBFRElUX1NLSUxMOidFRElUX1NLSUxMJyxcclxuICAgIFNBVkVfU0tJTEw6ICdTQVZFX1NLSUxMJyxcclxuICAgIFNBVkVfU0tJTExfQ0FOQ0VMOiAnU0FWRV9TS0lMTF9DQU5DRUwnLFxyXG4gICAgU0FWRV9TS0lMTF9TVUNDRVNTOiAnU0FWRV9TS0lMTF9TVUNDRVNTJyxcclxuICAgIERFTEVURV9TS0lMTDogJ0RFTEVURV9TS0lMTCcsXHJcbiAgICBERUxFVEVfU0tJTExfQ0FOQ0VMOiAnREVMRVRFX1NLSUxMX0NBTkNFTCcsXHJcbiAgICBERUxFVEVfU0tJTExfU1VDQ0VTUzogJ0RFTEVURV9TS0lMTF9TVUNDRVNTJ1xyXG59O1xyXG5cclxuY29uc3QgZ3JpZENvbHVtbnMgPSBbXHJcbiAgICB7IHRpdGxlOiAnTmFtZScsIGZpZWxkOiAnbmFtZScgfSxcclxuICAgIHsgdGl0bGU6ICdTaG9ydCBuYW1lJywgZmllbGQ6ICdzaG9ydE5hbWUnIH0sXHJcbiAgICB7IHRpdGxlOiAnQ2F0ZWdvcnknLCBmaWVsZDogJ2NhdGVnb3J5JyB9XHJcbl07XHJcblxyXG5leHBvcnQge1xyXG4gICAgYWN0aW9uVHlwZXMsXHJcbiAgICBncmlkQ29sdW1uc1xyXG59Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vTW9kZWxzL0Jhc2VNb2RlbCc7XHJcblxyXG5jbGFzcyBTa2lsbE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHNraWxsKSB7XHJcbiAgICAgICAgc3VwZXIoc2tpbGwsIFNraWxsTW9kZWwuZmllbGRzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGZpZWxkcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2hvcnROYW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb3JlQ29sb3I6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjdGl2ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2wnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3RpbWUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlbmd0aDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGVyY2VudGFnZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RvdWJsZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25UeXBlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgSWRlbnRpZmllcigpIHtcclxuICAgICAgICByZXR1cm4gJ2lkJztcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybUxpc3Qoc2tpbGxzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybUxpc3Qoc2tpbGxzLCBTa2lsbE1vZGVsKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2tpbGxNb2RlbDsiLCLvu79pbXBvcnQgeyBhY3Rpb25UeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgeyBhZGRSZXBsYWNlSXRlbSwgcmVtb3ZlSXRlbSB9IGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0FycmF5VXRpbHMnO1xyXG5pbXBvcnQgU2tpbGxNb2RlbCBmcm9tICcuLy4uL01vZGVscy9Ta2lsbE1vZGVsJztcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIHNraWxsc0xpc3Q6IFtdLFxyXG4gICAgc2VsZWN0ZWRTa2lsbDogbnVsbCxcclxuICAgIHNlbGVjdGVkRGVsZXRlU2tpbGw6IG51bGxcclxufVxyXG5cclxuZnVuY3Rpb24gc2tpbGxzUmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5HRVRfU0tJTExTX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBza2lsbHNMaXN0OiBhY3Rpb24uc2tpbGxzTGlzdCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkNSRUFURV9ORVdfU0tJTEw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZFNraWxsOiB7fSB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkVESVRfU0tJTEw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZFNraWxsOiBhY3Rpb24uc2VsZWN0ZWRTa2lsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9TS0lMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkRGVsZXRlU2tpbGw6IGFjdGlvbi5zZWxlY3RlZFNraWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuU0FWRV9TS0lMTF9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2tpbGxzTGlzdDogYWRkUmVwbGFjZUl0ZW0oc3RhdGUuc2tpbGxzTGlzdCwgYWN0aW9uLnNhdmVkU2tpbGwsIFNraWxsTW9kZWwuSWRlbnRpZmllciksIHNlbGVjdGVkU2tpbGw6IG51bGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfU1VDQ0VTUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNraWxsc0xpc3Q6IHJlbW92ZUl0ZW0oc3RhdGUuc2tpbGxzTGlzdCwgYWN0aW9uLmRlbGV0ZWRTa2lsbCwgU2tpbGxNb2RlbC5JZGVudGlmaWVyKSwgc2VsZWN0ZWREZWxldGVTa2lsbDogbnVsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLlNBVkVfU0tJTExfQ0FOQ0VMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWRTa2lsbDogbnVsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9TS0lMTF9DQU5DRUw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZERlbGV0ZVNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2tpbGxzUmVkdWNlcjsiLCLvu79pbXBvcnQgU2tpbGxNb2RlbCBmcm9tICcuL01vZGVscy9Ta2lsbE1vZGVsJztcclxuY29uc3Qgc2tpbGxSb3V0ZXMgPSB7XHJcbiAgICBnZXRBbGxVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzJztcclxuICAgIH0sXHJcbiAgICBnZXRTaW5nbGVVcmwoc2tpbGwpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMvJyArIHNraWxsW1NraWxsTW9kZWwuSWRlbnRpZmllcl07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlVXJsKCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscyc7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVXJsKHNraWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzLycgKyBza2lsbFtTa2lsbE1vZGVsLklkZW50aWZpZXJdO1xyXG4gICAgfSxcclxuICAgIGRlbGV0ZVVybChza2lsbCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscy8nICsgc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgc2tpbGxSb3V0ZXMgfTsiLCLvu79pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5pbXBvcnQgc2tpbGxzIGZyb20gJy4vUmVkdWNlcnMvU2tpbGxzUmVkdWNlcidcclxuaW1wb3J0IHVpIGZyb20gJy4vLi4vLi4vQ29tbW9uL1JlZHVjZXJzL1VJUmVkdWNlcic7XHJcblxyXG5jb25zdCBhcHBSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcclxuICAgIHNraWxscyxcclxuICAgIHVpXHJcbn0pO1xyXG5jb25zdCByb290UmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICByZXR1cm4gYXBwUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcclxufTtcclxuXHJcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXHJcbiAgICByb290UmVkdWNlcixcclxuICAgIGNvbXBvc2UoXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rTWlkZGxld2FyZSlcclxuICAgIClcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JlOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vUGFnZXMvU2tpbGxzL3N0b3JlJztcclxuaW1wb3J0IFBhZ2VMYXlvdXQgZnJvbSAnLi9Db21tb24vQ29tcG9uZW50cy9MYXlvdXQvUGFnZWxheW91dCdcclxuaW1wb3J0IExvYWRpbmdCYXIgZnJvbSAnLi9Db21tb24vQ29tcG9uZW50cy9Mb2FkaW5nL0xvYWRpbmdCYXInO1xyXG5pbXBvcnQgU2tpbGxzR3JpZCBmcm9tICcuL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL1NraWxsc0dyaWQnO1xyXG5pbXBvcnQgRWRpdFNraWxsRGlhbG9nIGZyb20gJy4vUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvRWRpdFNraWxsRGlhbG9nJztcclxuaW1wb3J0IERlbGV0ZVNraWxsRGlhbG9nIGZyb20gJy4vUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvRGVsZXRlU2tpbGxEaWFsb2cnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgICA8TG9hZGluZ0JhciAvPlxyXG4gICAgICAgICAgICA8UGFnZUxheW91dD5cclxuICAgICAgICAgICAgICAgIDxTa2lsbHNHcmlkIC8+XHJcbiAgICAgICAgICAgIDwvUGFnZUxheW91dD5cclxuICAgICAgICAgICAgPEVkaXRTa2lsbERpYWxvZyAvPlxyXG4gICAgICAgICAgICA8RGVsZXRlU2tpbGxEaWFsb2cgLz5cclxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgPC9Qcm92aWRlcj4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tpbGxzUm9vdEVsZW1lbnQnKVxyXG4pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHNoaW0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBpZiAoc2VjcmV0ID09PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgLy8gSXQgaXMgc3RpbGwgc2FmZSB3aGVuIGNhbGxlZCBmcm9tIFJlYWN0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnZhcmlhbnQoXG4gICAgICBmYWxzZSxcbiAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICdVc2UgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKCkgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICk7XG4gIH07XG4gIHNoaW0uaXNSZXF1aXJlZCA9IHNoaW07XG4gIGZ1bmN0aW9uIGdldFNoaW0oKSB7XG4gICAgcmV0dXJuIHNoaW07XG4gIH07XG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogc2hpbSxcbiAgICBib29sOiBzaGltLFxuICAgIGZ1bmM6IHNoaW0sXG4gICAgbnVtYmVyOiBzaGltLFxuICAgIG9iamVjdDogc2hpbSxcbiAgICBzdHJpbmc6IHNoaW0sXG4gICAgc3ltYm9sOiBzaGltLFxuXG4gICAgYW55OiBzaGltLFxuICAgIGFycmF5T2Y6IGdldFNoaW0sXG4gICAgZWxlbWVudDogc2hpbSxcbiAgICBpbnN0YW5jZU9mOiBnZXRTaGltLFxuICAgIG5vZGU6IHNoaW0sXG4gICAgb2JqZWN0T2Y6IGdldFNoaW0sXG4gICAgb25lT2Y6IGdldFNoaW0sXG4gICAgb25lT2ZUeXBlOiBnZXRTaGltLFxuICAgIHNoYXBlOiBnZXRTaGltLFxuICAgIGV4YWN0OiBnZXRTaGltXG4gIH07XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBlbXB0eUZ1bmN0aW9uO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsXG4gICAgICAgICAgICAgIHByb3BGdWxsTmFtZSxcbiAgICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsXG4gICAgICAgICAgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpLFxuICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKGV4dHJhQXJndW1lbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGRpc3BhdGNoID0gX3JlZi5kaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlO1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSwgZXh0cmFBcmd1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG52YXIgdGh1bmsgPSBjcmVhdGVUaHVua01pZGRsZXdhcmUoKTtcbnRodW5rLndpdGhFeHRyYUFyZ3VtZW50ID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB0aHVuazsiXX0=
