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
            return _react2.default.createElement('input', { type: 'text',
                className: this.props.className,
                name: this.props.name,
                value: this.props.value,
                onChange: this.onChange
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL0NvbW1vbi9BY3Rpb25zL1VJLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0FycmF5VXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcGFyZVV0aWxzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvR3JpZC9HcmlkLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveC5qc3giLCJTY3JpcHRzL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0LmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTG9hZGluZy9Mb2FkaW5nQmFyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL01vZGVscy9CYXNlTW9kZWwuanN4IiwiU2NyaXB0cy9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyLmpzeCIsIlNjcmlwdHMvSW5mcmFzdHJ1Y3R1cmUvQWpheC5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9BY3Rpb25zL1NraWxscy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0RlbGV0ZVNraWxsRGlhbG9nLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvRWRpdFNraWxsRGlhbG9nLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvU2tpbGxzR3JpZC5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db25zdGFudHMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvTW9kZWxzL1NraWxsTW9kZWwuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvUmVkdWNlcnMvU2tpbGxzUmVkdWNlci5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Sb3V0ZXMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvc3RvcmUuanN4IiwiU2NyaXB0cy9Ta2lsbHNCdW5kbGUuanN4Iiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUM7O0FBRUQsU0FBUyxXQUFULEdBQXVCO0FBQ25CLFdBQU87QUFDSCxjQUFNLHVCQUFZO0FBRGYsS0FBUDtBQUdIOztBQUVELFNBQVMsV0FBVCxHQUF1QjtBQUNuQixXQUFPO0FBQ0gsY0FBTSx1QkFBWTtBQURmLEtBQVA7QUFHSDs7a0JBRWMsRUFBRSx3QkFBRixFQUFlLHdCQUFmLEU7Ozs7Ozs7Ozs7QUNkZDs7Ozs7Ozs7QUFFRCxTQUFTLGNBQVQs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM5aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCLvu79pbXBvcnQgeyBhY3Rpb25UeXBlcyB9IGZyb20gJy4vLi4vQ29uc3RhbnRzJztcclxuXHJcbmZ1bmN0aW9uIHNob3dMb2FkaW5nKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TSE9XX0xPQURJTkdcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2FkaW5nKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ISURFX0xPQURJTkdcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc2hvd0xvYWRpbmcsIGhpZGVMb2FkaW5nIH07Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5mdW5jdGlvbiBhZGRSZXBsYWNlSXRlbShsaXN0LCBpdGVtLCBpZGVudGlmaWVyKSB7XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGxldCBleGlzdGluZ0luZGV4ID0gXy5maW5kSW5kZXgobGlzdCwgZnVuY3Rpb24gKGN1cnJlbnQpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFtpZGVudGlmaWVyXSA9PT0gaXRlbVtpZGVudGlmaWVyXTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCkge1xyXG4gICAgICAgIGxpc3QgPSBsaXN0LnNsaWNlKCk7XHJcbiAgICAgICAgbGlzdFtleGlzdGluZ0luZGV4XSA9IGl0ZW07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgaXRlbV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVJdGVtKGxpc3QsIGl0ZW0sIGlkZW50aWZpZXIpIHtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgbGV0IGV4aXN0aW5nSW5kZXggPSBfLmZpbmRJbmRleChsaXN0LCBmdW5jdGlvbiAoY3VycmVudCkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50W2lkZW50aWZpZXJdID09PSBpdGVtW2lkZW50aWZpZXJdO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgdmFyIHRlbXBMaXN0ID0gbGlzdC5zbGljZSgpO1xyXG4gICAgICAgIHRlbXBMaXN0LnNwbGljZShleGlzdGluZ0luZGV4LCAxKTtcclxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5cclxuZXhwb3J0IHsgYWRkUmVwbGFjZUl0ZW0sIHJlbW92ZUl0ZW0gfTsiLCLvu79mdW5jdGlvbiBkZWVwQ29tcGFyZShvYmoxLCBvYmoyKSB7XHJcbiAgICBpZiAoIW9iajEgfHwgIW9iajIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBwIGluIG9iajEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIChvYmoxW3BdKSA9PSAnZnVuY3Rpb24nKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgIGlmIChvYmoxLmhhc093blByb3BlcnR5KHApICE9PSBvYmoyLmhhc093blByb3BlcnR5KHApKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiAob2JqMVtwXSkpIHtcclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIGlmICghZGVlcENvbXBhcmUob2JqMVtwXSwgb2JqMltwXSkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChvYmoxW3BdICE9PSBvYmoyW3BdKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIHEgaW4gb2JqMikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKG9iajFbcV0pID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZGVlcENvbXBhcmUgfSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgeyBkZWVwQ29tcGFyZSB9IGZyb20gJy4vLi4vLi4vQ29tcGFyZVV0aWxzJ1xyXG5cclxuY2xhc3MgR3JpZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQgPSB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGlja2VkID0gdGhpcy5lZGl0QnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQnV0dG9uQ2xpY2tlZCA9IHRoaXMuZGVsZXRlQnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPXtcclxuICAgICAgICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5wcm9wcy5vcHRpb25zKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLmRhdGEsIHRoaXMucHJvcHMuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wuZGF0YVNvdXJjZS5kYXRhKG5leHRQcm9wcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmtlbmRvQ29udHJvbCA9ICQodGhpcy5jb250YWluZXJFbGVtZW50KS5rZW5kb0dyaWQoe1xyXG4gICAgICAgICAgICBkYXRhc291cmNlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5oZWxwZXJzLnByZXBhcmVDb2x1bW5zKHRoaXMucHJvcHMuY29sdW1ucy5zbGljZSgpLCB0aGlzLnN0YXRlLm9wdGlvbnMpLFxyXG4gICAgICAgICAgICB0b29sYmFyOiB0aGlzLmhlbHBlcnMucHJlcGFyZUhlYWRlcih0aGlzLnN0YXRlLm9wdGlvbnMpXHJcbiAgICAgICAgfSkuZGF0YSgna2VuZG9HcmlkJyk7XHJcbiAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wud3JhcHBlci5hZGRDbGFzcygnbm8tc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wud3JhcHBlci5maW5kKCcuay1ncmlkLWFkZCcpLm9mZignY2xpY2snKS5vbignY2xpY2snLCB0aGlzLmFkZEJ1dHRvbkNsaWNrZWQpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua2VuZG9Db250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2VuZG9Db250cm9sLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YUl0ZW1Gcm9tS2VuZG9HcmlkKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZW5kb0NvbnRyb2wuZGF0YUl0ZW0oJChlLnRhcmdldCkuY2xvc2VzdCgndHInKSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkQnV0dG9uQ2xpY2tlZChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zdGF0ZS5vcHRpb25zLm9uQWRkQnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkFkZEJ1dHRvbkNsaWNrKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVkaXRCdXR0b25DbGlja2VkKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnN0YXRlLm9wdGlvbnMub25FZGl0QnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkVkaXRCdXR0b25DbGljayh0aGlzLmdldERhdGFJdGVtRnJvbUtlbmRvR3JpZChlKSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlQnV0dG9uQ2xpY2tlZChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zdGF0ZS5vcHRpb25zLm9uRGVsZXRlQnV0dG9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5vbkRlbGV0ZUJ1dHRvbkNsaWNrKHRoaXMuZ2V0RGF0YUl0ZW1Gcm9tS2VuZG9HcmlkKGUpLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNob3dBZGRCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dFZGl0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBzaG93RGVsZXRlQnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWxwZXJzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwcmVwYXJlQ29sdW1ucyhjb2x1bW5zLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNuT25seSA9IGtlbmRvLnRlbXBsYXRlKFwiPGEgY2xhc3M9J2N1c3QtaWNvbi0xNiBrLWdyaWQtIz0gbmFtZSAjJyBocmVmPSdcXFxcIycgdGl0bGU9JyM9IHRleHQgIyc+PHNwYW4gY2xhc3M9J2ljbi0jPSBpY29uTmFtZSAjLTE2Jz48L3NwYW4+Iz0gdGV4dCAjPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGljbk9ubHkgPSBrZW5kby50ZW1wbGF0ZShcIjxhIGNsYXNzPSdjdXN0LWljb24tMTYgay1ncmlkLSM9IG5hbWUgIycgaHJlZj0nXFxcXCMnIHRpdGxlPScjPSB0ZXh0ICMnPjxzcGFuIGNsYXNzPSdpY24tIz0gaWNvbk5hbWUgIy0xNic+PC9zcGFuPjwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93RWRpdEJ1dHRvbiB8fCBvcHRpb25zLnNob3dEZWxldGVCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93RWRpdEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHsgbmFtZTogXCJFZGl0XCIsIHRleHQ6IFwiRWRpdFwiLCBjbGljazogc2VsZi5lZGl0QnV0dG9uQ2xpY2tlZCwgaWNvbk5hbWU6IFwiZWRpdFwiLCB0ZW1wbGF0ZTogaWNuT25seSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0RlbGV0ZUJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHsgbmFtZTogXCJkZWxldGVcIiwgdGV4dDogJ0RlbGV0ZScsIGNsaWNrOiBzZWxmLmRlbGV0ZUJ1dHRvbkNsaWNrZWQsIGljb25OYW1lOiBcImRlbGV0ZVwiLCB0ZW1wbGF0ZTogaWNuT25seSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uc1tjb2x1bW5zLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlcGFyZUhlYWRlcihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNuQW5kTGFiZWwgPSBrZW5kby50ZW1wbGF0ZShcIjxhIGNsYXNzPSdjdXN0LWljb24tMTYgay1ncmlkLSM9IG5hbWUgIycgaHJlZj0nXFxcXCMnIHRpdGxlPScjPSB0ZXh0ICMnPjxzcGFuIGNsYXNzPSdpY24tIz0gaWNvbk5hbWUgIy0xNic+PC9zcGFuPiM9IGljb25UZXh0ICM8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0FkZEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBuYW1lOiAnYWRkJywgdGV4dDogJ0FkZCcsIGljb25OYW1lOiAnYWRkJywgdGVtcGxhdGU6IGljbkFuZExhYmVsLCBpY29uVGV4dDogXCJBZGRcIiB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiByZWY9eyhub2RlKSA9PiB7IHRoaXMuY29udGFpbmVyRWxlbWVudCA9IG5vZGU7IH19ID48L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuR3JpZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBmaWVsZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICAgICAgfSlcclxuICAgICkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICBzaG93QWRkQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBzaG93RWRpdEJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgc2hvd0RlbGV0ZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgYWRkQnV0dG9uQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBlZGl0QnV0dG9uQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBkZWxldGVCdXR0b25BY3Rpb246IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmlkOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5jbGFzcyBUZXh0Qm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZShlKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQ2hhbmdlKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0YXJnZXQubmFtZSwgdGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgLz4pO1xyXG4gICAgfVxyXG59O1xyXG5UZXh0Qm94LnByb3BUeXBlcyA9IHtcclxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm5vZGVcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRCb3g7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIFBhZ2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0ncGFnZS1sYXlvdXQnPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZUxheW91dDsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuY2xhc3MgTG9hZGluZ0JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdsb2FkaW5nLWJhcicgLz4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5Mb2FkaW5nQmFyLnByb3BUeXBlcyA9IHtcclxuICAgIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2hvd0xvYWRpbmc6IHN0YXRlLnVpLnNob3dMb2FkaW5nXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTG9hZGluZ0Jhcik7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbCcgc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsRGlhbG9nOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtaGVhZGVyJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtYm9keSc+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY2xhc3MgRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J21vZGFsLWZvb3Rlcic+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBIZWFkZXIsIEJvZHksIEZvb3RlciB9OyIsIu+7v2NvbnN0IGFjdGlvblR5cGVzID0ge1xyXG4gICAgU0hPV19MT0FESU5HOiAnU0hPV19MT0FESU5HJyxcclxuICAgIEhJREVfTE9BRElORzogJ0hJREVfTE9BRElORydcclxufVxyXG5leHBvcnQgeyBhY3Rpb25UeXBlcyB9OyIsIu+7v2ltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXHJcblxyXG5jbGFzcyBCYXNlTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IoaXRlbSwgZmllbGRzKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICBfLm1hcE9iamVjdChmaWVsZHMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZltrZXldID0gc2VsZi5nZXRCYXNlVmFsdWUodmFsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfLm1hcE9iamVjdChmaWVsZHMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZltrZXldID0gaXRlbVtrZXldO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRCYXNlVmFsdWUoZmllbGREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChmaWVsZERlc2NyaXB0aW9uLmRlZmF1bHRWYWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkRGVzY3JpcHRpb24uZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGZpZWxkRGVzY3JpcHRpb24udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdpbnQnOlxyXG4gICAgICAgICAgICBjYXNlICdkb3VibGUnOlxyXG4gICAgICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICBjYXNlICdib29sJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcjMDAwMDAwJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTGlzdChpdGVtcywgbW9kZWwpIHtcclxuICAgICAgICBsZXQgdHJhbnNmb3JtZWQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkLnB1c2gobmV3IG1vZGVsKGl0ZW0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlTW9kZWw7Iiwi77u/aW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgc2hvd0xvYWRpbmc6IGZhbHNlXHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdWlSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLlNIT1dfTE9BRElORzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNob3dMb2FkaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuSElERV9MT0FESU5HOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2hvd0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB1aVJlZHVjZXI7Iiwi77u/aW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbmNsYXNzIEFqYXgge1xyXG4gICAgc3RhdGljIGV4ZWN1dGVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zW21ldGhvZF0odXJsLCBkYXRhKVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCh1cmwpIHtcclxuICAgICAgICByZXR1cm4gQWpheC5leGVjdXRlUmVxdWVzdCgnZ2V0JywgdXJsKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBwb3N0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBBamF4LmV4ZWN1dGVSZXF1ZXN0KCdwb3N0JywgdXJsLCBkYXRhKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBwdXQodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ3B1dCcsIHVybCwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVsZXRlKHVybCkge1xyXG4gICAgICAgIHJldHVybiBBamF4LmV4ZWN1dGVSZXF1ZXN0KCdkZWxldGUnLCB1cmwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBamF4OyIsIu+7v2ltcG9ydCB1aUFjdGlvbnMgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQWN0aW9ucy9VSSc7XHJcbmltcG9ydCB7IGFjdGlvblR5cGVzIH0gZnJvbSAnLi8uLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgQWpheCBmcm9tICcuLy4uLy4uLy4uL0luZnJhc3RydWN0dXJlL0FqYXgnO1xyXG5pbXBvcnQgU2tpbGxNb2RlbCBmcm9tICcuLy4uL01vZGVscy9Ta2lsbE1vZGVsJztcclxuaW1wb3J0IHsgc2tpbGxSb3V0ZXMgfSBmcm9tICcuLy4uL1JvdXRlcyc7XHJcblxyXG5mdW5jdGlvbiBnZXRTa2lsbHMoKSB7XHJcbiAgICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKHVpQWN0aW9ucy5zaG93TG9hZGluZygpKTtcclxuICAgICAgICByZXR1cm4gQWpheC5nZXQoc2tpbGxSb3V0ZXMuZ2V0QWxsVXJsKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLmhpZGVMb2FkaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0U2tpbGxzU3VjY2VzcyhyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRTa2lsbHNTdWNjZXNzKGRhdGEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuR0VUX1NLSUxMU19TVUNDRVNTLFxyXG4gICAgICAgIHNraWxsc0xpc3Q6IFNraWxsTW9kZWwudHJhbnNmb3JtTGlzdChkYXRhKVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBvcGVuU2tpbGxEZXRhaWxzUG9wdXAoc2tpbGwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuRURJVF9TS0lMTCxcclxuICAgICAgICBzZWxlY3RlZFNraWxsOiBza2lsbFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlU2tpbGwoc2tpbGwpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIGxldCBoYXNJZCA9IHNraWxsW1NraWxsTW9kZWwuSWRlbnRpZmllcl0gPiAwO1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBoYXNJZCA/ICdwdXQnIDogJ3Bvc3QnO1xyXG4gICAgICAgIGxldCB1cmwgPSBoYXNJZCA/IHNraWxsUm91dGVzLnVwZGF0ZVVybChza2lsbCkgOiBza2lsbFJvdXRlcy5jcmVhdGVVcmwoKTtcclxuICAgICAgICByZXR1cm4gQWpheFttZXRob2RdKHVybCwgc2tpbGwpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLmhpZGVMb2FkaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goc2F2ZVNraWxsU3VjY2VzcyhyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVNraWxsU3VjY2Vzcyhza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX1NVQ0NFU1MsXHJcbiAgICAgICAgc2F2ZWRTa2lsbDogbmV3IFNraWxsTW9kZWwoc2tpbGwpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVTa2lsbENhbmNlbCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuU0FWRV9TS0lMTF9DQU5DRUxcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblNraWxsRGVsZXRlUG9wdXAoc2tpbGwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMLFxyXG4gICAgICAgIHNlbGVjdGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsKHNraWxsKSB7XHJcbiAgICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKHVpQWN0aW9ucy5zaG93TG9hZGluZygpKTtcclxuICAgICAgICByZXR1cm4gQWpheC5kZWxldGUoc2tpbGxSb3V0ZXMuZGVsZXRlVXJsKHNraWxsKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChkZWxldGVTa2lsbFN1Y2Nlc3Moc2tpbGwpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVTa2lsbFN1Y2Nlc3Moc2tpbGwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMX1NVQ0NFU1MsXHJcbiAgICAgICAgZGVsZXRlZFNraWxsOiBza2lsbFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVTa2lsbENhbmNlbCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMX0NBTkNFTFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBnZXRTa2lsbHMsIG9wZW5Ta2lsbERldGFpbHNQb3B1cCwgc2F2ZVNraWxsLCBzYXZlU2tpbGxDYW5jZWwsIG9wZW5Ta2lsbERlbGV0ZVBvcHVwLCBkZWxldGVTa2lsbCwgZGVsZXRlU2tpbGxDYW5jZWwgfSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IGRlZXBDb21wYXJlIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcGFyZVV0aWxzJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0lucHV0L0J1dHRvbic7XHJcbmltcG9ydCBNb2RhbERpYWxvZyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nQ29tcG9uZW50cyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nQ29tcG9uZW50cyc7XHJcbmltcG9ydCB7IGRlbGV0ZVNraWxsLCBkZWxldGVTa2lsbENhbmNlbCB9IGZyb20gJy4vLi4vQWN0aW9ucy9Ta2lsbHMnO1xyXG5cclxuY2xhc3MgRGVsZXRlU2tpbGxEaWFsb2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vbkRlbGV0ZSA9IHRoaXMub25EZWxldGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uQ2FuY2VsID0gdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zZWxlY3RlZFNraWxsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbDogbnVsbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlZXBDb21wYXJlKG5leHRQcm9wcy5zZWxlY3RlZFNraWxsLCB0aGlzLnByb3BzLnNlbGVjdGVkU2tpbGwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbDogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFByb3BzLnNlbGVjdGVkU2tpbGwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25EZWxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChkZWxldGVTa2lsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwpKSk7XHJcbiAgICB9XHJcbiAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZVNraWxsQ2FuY2VsKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsRGlhbG9nPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgRGVsZXRlIFNraWxsXHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3aXNoIHRvIGRlbGV0ZSB0aGlzIHNraWxsP1xyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhbmNlbH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENsb3NlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5Gb290ZXI+XHJcbiAgICAgICAgICAgIDwvTW9kYWxEaWFsb2c+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkU2tpbGw6IHN0YXRlLnNraWxscy5zZWxlY3RlZERlbGV0ZVNraWxsXHJcbiAgICB9O1xyXG59XHJcbi8vRGVsZXRlU2tpbGxEaWFsb2cucHJvcFR5cGVzID0ge1xyXG4vLyAgICBzZWxlY3RlZFNraWxsOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTa2lsbE1vZGVsKVxyXG4vL31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShEZWxldGVTa2lsbERpYWxvZykiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBkZWVwQ29tcGFyZSB9IGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBhcmVVdGlscyc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcG9uZW50cy9JbnB1dC9CdXR0b24nO1xyXG5pbXBvcnQgVGV4dEJveCBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0lucHV0L1RleHRCb3gnO1xyXG5pbXBvcnQgTW9kYWxEaWFsb2cgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZyc7XHJcbmltcG9ydCBNb2RhbERpYWxvZ0NvbXBvbmVudHMgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMnO1xyXG5pbXBvcnQgU2tpbGxNb2RlbCBmcm9tICcuLy4uL01vZGVscy9Ta2lsbE1vZGVsJ1xyXG5pbXBvcnQgeyBzYXZlU2tpbGwsIHNhdmVTa2lsbENhbmNlbCB9IGZyb20gJy4vLi4vQWN0aW9ucy9Ta2lsbHMnO1xyXG5cclxuY2xhc3MgRWRpdFNraWxsRGlhbG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMub25TYXZlID0gdGhpcy5vblNhdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uQ2FuY2VsID0gdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwsIHRoaXMucHJvcHMuc2VsZWN0ZWRTa2lsbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChzYXZlU2tpbGwoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKSkpO1xyXG4gICAgfVxyXG4gICAgb25DYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChzYXZlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRTa2lsbCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCk7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbFtuYW1lXSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2VsZWN0ZWRTa2lsbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsRGlhbG9nPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdCBTa2lsbFxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuSGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSduYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdTaG9ydCBOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdzaG9ydE5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwuc2hvcnROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblNhdmV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTYXZlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9FZGl0U2tpbGxEaWFsb2cucHJvcFR5cGVzID0ge1xyXG4vLyAgICBzZWxlY3RlZFNraWxsOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTa2lsbE1vZGVsKVxyXG4vL31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShFZGl0U2tpbGxEaWFsb2cpIiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgZ2V0U2tpbGxzLCBvcGVuU2tpbGxEZXRhaWxzUG9wdXAsIG9wZW5Ta2lsbERlbGV0ZVBvcHVwIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcbmltcG9ydCB7IGdyaWRDb2x1bW5zIH0gZnJvbSAnLi8uLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgR3JpZCBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0dyaWQvR3JpZCdcclxuaW1wb3J0IFNraWxsTW9kZWwgZnJvbSAnLi8uLi9Nb2RlbHMvU2tpbGxNb2RlbCc7XHJcblxyXG5jbGFzcyBTa2lsbHNHcmlkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZ2V0U2tpbGxzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmlkT3B0aW9ucygpIHtcclxuICAgICAgICB2YXIgY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvbkVkaXRCdXR0b25DbGljayhpdGVtLCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnByb3BzLmRpc3BhdGNoKG9wZW5Ta2lsbERldGFpbHNQb3B1cChpdGVtKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25BZGRCdXR0b25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnByb3BzLmRpc3BhdGNoKG9wZW5Ta2lsbERldGFpbHNQb3B1cChuZXcgU2tpbGxNb2RlbCgpKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZWxldGVCdXR0b25DbGljayhpdGVtLCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnByb3BzLmRpc3BhdGNoKG9wZW5Ta2lsbERlbGV0ZVBvcHVwKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyaWRcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxyXG4gICAgICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5za2lsbHN9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmdyaWRPcHRpb25zfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblNraWxsc0dyaWQucHJvcFR5cGVzID0ge1xyXG4gICAgc2tpbGxzOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihTa2lsbE1vZGVsKVxyXG4gICAgKSxcclxuICAgIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBza2lsbHM6IHN0YXRlLnNraWxscy5za2lsbHNMaXN0XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoU2tpbGxzR3JpZCk7Iiwi77u/Y29uc3QgYWN0aW9uVHlwZXMgPSB7XHJcbiAgICBHRVRfU0tJTExTOiAnR0VUX1NLSUxMUycsXHJcbiAgICBHRVRfU0tJTExTX1NVQ0NFU1M6ICdHRVRfU0tJTExTX1NVQ0NFU1MnLFxyXG4gICAgQ1JFQVRFX05FV19TS0lMTDogJ0NSRUFURV9ORVdfU0tJTEwnLFxyXG4gICAgRURJVF9TS0lMTDonRURJVF9TS0lMTCcsXHJcbiAgICBTQVZFX1NLSUxMOiAnU0FWRV9TS0lMTCcsXHJcbiAgICBTQVZFX1NLSUxMX0NBTkNFTDogJ1NBVkVfU0tJTExfQ0FOQ0VMJyxcclxuICAgIFNBVkVfU0tJTExfU1VDQ0VTUzogJ1NBVkVfU0tJTExfU1VDQ0VTUycsXHJcbiAgICBERUxFVEVfU0tJTEw6ICdERUxFVEVfU0tJTEwnLFxyXG4gICAgREVMRVRFX1NLSUxMX0NBTkNFTDogJ0RFTEVURV9TS0lMTF9DQU5DRUwnLFxyXG4gICAgREVMRVRFX1NLSUxMX1NVQ0NFU1M6ICdERUxFVEVfU0tJTExfU1VDQ0VTUydcclxufTtcclxuXHJcbmNvbnN0IGdyaWRDb2x1bW5zID0gW1xyXG4gICAgeyB0aXRsZTogJ05hbWUnLCBmaWVsZDogJ25hbWUnIH0sXHJcbiAgICB7IHRpdGxlOiAnU2hvcnQgbmFtZScsIGZpZWxkOiAnc2hvcnROYW1lJyB9LFxyXG4gICAgeyB0aXRsZTogJ0NhdGVnb3J5JywgZmllbGQ6ICdjYXRlZ29yeScgfVxyXG5dO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGFjdGlvblR5cGVzLFxyXG4gICAgZ3JpZENvbHVtbnNcclxufSIsIu+7v2ltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL01vZGVscy9CYXNlTW9kZWwnO1xyXG5cclxuY2xhc3MgU2tpbGxNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihza2lsbCkge1xyXG4gICAgICAgIHN1cGVyKHNraWxsLCBTa2lsbE1vZGVsLmZpZWxkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBmaWVsZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNob3J0TmFtZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9yZUNvbG9yOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY3RpdmU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbWFpbDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGFydERhdGU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGFydFRpbWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZW5ndGg6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2U6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdkb3VibGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uVHlwZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IElkZW50aWZpZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1MaXN0KHNraWxscykge1xyXG4gICAgICAgIHJldHVybiBzdXBlci50cmFuc2Zvcm1MaXN0KHNraWxscywgU2tpbGxNb2RlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNraWxsTW9kZWw7Iiwi77u/aW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuaW1wb3J0IHsgYWRkUmVwbGFjZUl0ZW0sIHJlbW92ZUl0ZW0gfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9BcnJheVV0aWxzJztcclxuaW1wb3J0IFNraWxsTW9kZWwgZnJvbSAnLi8uLi9Nb2RlbHMvU2tpbGxNb2RlbCc7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBza2lsbHNMaXN0OiBbXSxcclxuICAgIHNlbGVjdGVkU2tpbGw6IG51bGwsXHJcbiAgICBzZWxlY3RlZERlbGV0ZVNraWxsOiBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNraWxsc1JlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuR0VUX1NLSUxMU19TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2tpbGxzTGlzdDogYWN0aW9uLnNraWxsc0xpc3QgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5DUkVBVEVfTkVXX1NLSUxMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWRTa2lsbDoge30gfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5FRElUX1NLSUxMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWRTa2lsbDogYWN0aW9uLnNlbGVjdGVkU2tpbGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTEw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZERlbGV0ZVNraWxsOiBhY3Rpb24uc2VsZWN0ZWRTa2lsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLlNBVkVfU0tJTExfU1VDQ0VTUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNraWxsc0xpc3Q6IGFkZFJlcGxhY2VJdGVtKHN0YXRlLnNraWxsc0xpc3QsIGFjdGlvbi5zYXZlZFNraWxsLCBTa2lsbE1vZGVsLklkZW50aWZpZXIpLCBzZWxlY3RlZFNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBza2lsbHNMaXN0OiByZW1vdmVJdGVtKHN0YXRlLnNraWxsc0xpc3QsIGFjdGlvbi5kZWxldGVkU2tpbGwsIFNraWxsTW9kZWwuSWRlbnRpZmllciksIHNlbGVjdGVkRGVsZXRlU2tpbGw6IG51bGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX0NBTkNFTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkU2tpbGw6IG51bGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfQ0FOQ0VMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWREZWxldGVTa2lsbDogbnVsbCB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNraWxsc1JlZHVjZXI7Iiwi77u/aW1wb3J0IFNraWxsTW9kZWwgZnJvbSAnLi9Nb2RlbHMvU2tpbGxNb2RlbCc7XHJcbmNvbnN0IHNraWxsUm91dGVzID0ge1xyXG4gICAgZ2V0QWxsVXJsKCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscyc7XHJcbiAgICB9LFxyXG4gICAgZ2V0U2luZ2xlVXJsKHNraWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzLycgKyBza2lsbFtTa2lsbE1vZGVsLklkZW50aWZpZXJdO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZVVybCgpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMnO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVVybChza2lsbCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscy8nICsgc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXTtcclxuICAgIH0sXHJcbiAgICBkZWxldGVVcmwoc2tpbGwpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMvJyArIHNraWxsW1NraWxsTW9kZWwuSWRlbnRpZmllcl07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHNraWxsUm91dGVzIH07Iiwi77u/aW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJztcclxuaW1wb3J0IHNraWxscyBmcm9tICcuL1JlZHVjZXJzL1NraWxsc1JlZHVjZXInXHJcbmltcG9ydCB1aSBmcm9tICcuLy4uLy4uL0NvbW1vbi9SZWR1Y2Vycy9VSVJlZHVjZXInO1xyXG5cclxuY29uc3QgYXBwUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBza2lsbHMsXHJcbiAgICB1aVxyXG59KTtcclxuY29uc3Qgcm9vdFJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgcmV0dXJuIGFwcFJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XHJcbn07XHJcblxyXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxyXG4gICAgcm9vdFJlZHVjZXIsXHJcbiAgICBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVua01pZGRsZXdhcmUpXHJcbiAgICApXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yZTsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL1BhZ2VzL1NraWxscy9zdG9yZSc7XHJcbmltcG9ydCBQYWdlTGF5b3V0IGZyb20gJy4vQ29tbW9uL0NvbXBvbmVudHMvTGF5b3V0L1BhZ2VsYXlvdXQnXHJcbmltcG9ydCBMb2FkaW5nQmFyIGZyb20gJy4vQ29tbW9uL0NvbXBvbmVudHMvTG9hZGluZy9Mb2FkaW5nQmFyJztcclxuaW1wb3J0IFNraWxsc0dyaWQgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9Ta2lsbHNHcmlkJztcclxuaW1wb3J0IEVkaXRTa2lsbERpYWxvZyBmcm9tICcuL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0VkaXRTa2lsbERpYWxvZyc7XHJcbmltcG9ydCBEZWxldGVTa2lsbERpYWxvZyBmcm9tICcuL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0RlbGV0ZVNraWxsRGlhbG9nJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAgPExvYWRpbmdCYXIgLz5cclxuICAgICAgICAgICAgPFBhZ2VMYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICA8U2tpbGxzR3JpZCAvPlxyXG4gICAgICAgICAgICA8L1BhZ2VMYXlvdXQ+XHJcbiAgICAgICAgICAgIDxFZGl0U2tpbGxEaWFsb2cgLz5cclxuICAgICAgICAgICAgPERlbGV0ZVNraWxsRGlhbG9nIC8+XHJcbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgIDwvUHJvdmlkZXI+LFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NraWxsc1Jvb3RFbGVtZW50JylcclxuKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAndGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCVzYC4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBzaGltKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgaWYgKHNlY3JldCA9PT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgIC8vIEl0IGlzIHN0aWxsIHNhZmUgd2hlbiBjYWxsZWQgZnJvbSBSZWFjdC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICB9O1xuICBzaGltLmlzUmVxdWlyZWQgPSBzaGltO1xuICBmdW5jdGlvbiBnZXRTaGltKCkge1xuICAgIHJldHVybiBzaGltO1xuICB9O1xuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IHNoaW0sXG4gICAgYm9vbDogc2hpbSxcbiAgICBmdW5jOiBzaGltLFxuICAgIG51bWJlcjogc2hpbSxcbiAgICBvYmplY3Q6IHNoaW0sXG4gICAgc3RyaW5nOiBzaGltLFxuICAgIHN5bWJvbDogc2hpbSxcblxuICAgIGFueTogc2hpbSxcbiAgICBhcnJheU9mOiBnZXRTaGltLFxuICAgIGVsZW1lbnQ6IHNoaW0sXG4gICAgaW5zdGFuY2VPZjogZ2V0U2hpbSxcbiAgICBub2RlOiBzaGltLFxuICAgIG9iamVjdE9mOiBnZXRTaGltLFxuICAgIG9uZU9mOiBnZXRTaGltLFxuICAgIG9uZU9mVHlwZTogZ2V0U2hpbSxcbiAgICBzaGFwZTogZ2V0U2hpbSxcbiAgICBleGFjdDogZ2V0U2hpbVxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gZW1wdHlGdW5jdGlvbjtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGNyZWF0ZVRodW5rTWlkZGxld2FyZShleHRyYUFyZ3VtZW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBkaXNwYXRjaCA9IF9yZWYuZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUsIGV4dHJhQXJndW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxudmFyIHRodW5rID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKCk7XG50aHVuay53aXRoRXh0cmFBcmd1bWVudCA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gdGh1bms7Il19
