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

},{"./../../CompareUtils":3,"prop-types":34,"react":"react","underscore":"underscore"}],5:[function(require,module,exports){
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

},{"prop-types":34,"react":"react","underscore":"underscore"}],6:[function(require,module,exports){
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

},{"prop-types":34,"react":"react","underscore":"underscore"}],7:[function(require,module,exports){
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

},{"prop-types":34,"react":"react","react-redux":"react-redux"}],9:[function(require,module,exports){
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

var fieldTypes = {
    int: 'int',
    double: 'double',
    time: 'time',
    string: 'string',
    bool: 'bool',
    date: 'date',
    color: 'color'
};

var validatorTypes = {
    required: 'required',
    email: 'email',
    custom: 'custom' //custom validation needs to provide validation function
};

exports.actionTypes = actionTypes;
exports.fieldTypes = fieldTypes;
exports.validatorTypes = validatorTypes;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _Constants = require('./../Constants');

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
                case _Constants.fieldTypes.int:
                case _Constants.fieldTypes.double:
                case _Constants.fieldTypes.time:
                    return 0;
                case _Constants.fieldTypes.string:
                    return '';
                case _Constants.fieldTypes.bool:
                    return false;
                case _Constants.fieldTypes.date:
                    return new Date();
                case _Constants.fieldTypes.color:
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
    }, {
        key: 'Identifier',
        get: function get() {
            return 'id';
        }
    }]);

    return BaseModel;
}();

exports.default = BaseModel;

},{"./../Constants":11,"underscore":"underscore"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function showError(title, message) {
    showMessage(title, message, 'error');
}
function showMessage(title, message, type) {
    $.toast({
        text: message,
        heading: title,
        class: type,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: 5000,
        stack: 20,
        position: 'top-right',
        loader: false
    });
}

exports.default = { showError: showError };

},{}],14:[function(require,module,exports){
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

},{"../Constants":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateModel = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateModel(model, fieldDefinitions) {
    var validationErrors = [];
    var isValid = true;

    _underscore2.default.each(fieldDefinitions, function (field, key) {
        if (!!field.validators) {
            var value = model[key];
            _underscore2.default.each(field.validators, function (validator) {
                switch (validator.type) {
                    case 'required':
                        //this format should be used if we need it to break on first validate
                        //isValid = isValid && validate(value, validateRequired, validationErrors, validator.message);

                        //this format should be used if we need to validate all fields
                        isValid = validate(value, validateRequired, validationErrors, validator.message) && isValid;
                        break;
                    case 'email':
                        isValid = validate(value, validateEmail, validationErrors, validator.message) && isValid;
                        break;
                }
            });
        }
    });
    return { isValid: isValid, validationErrors: validationErrors };
}

function validate(value, validateFunction, validationErrors, message) {
    var valid = validateFunction(value);
    if (!valid) {
        validationErrors.push(message);
    }
    return valid;
}

function validateRequired(value) {
    if (value == null || value == undefined) {
        return false;
    }
    if (value.toString() == '') {
        return false;
    }
    return true;
}

function validateEmail(value) {
    //TODO
    return true;
}

exports.validateModel = validateModel;

},{"underscore":"underscore"}],16:[function(require,module,exports){
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

},{"axios":"axios"}],17:[function(require,module,exports){
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

},{"./../../../Common/Actions/UI":1,"./../../../Infrastructure/Ajax":16,"./../Constants":21,"./../Models/SkillModel":22,"./../Routes":24}],18:[function(require,module,exports){
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

},{"./../../../Common/CompareUtils":3,"./../../../Common/Components/Input/Button":5,"./../../../Common/Components/Modal/ModalDialog":9,"./../../../Common/Components/Modal/ModalDialogComponents":10,"./../Actions/Skills":17,"prop-types":34,"react":"react","react-redux":"react-redux"}],19:[function(require,module,exports){
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

var _ValidationUtils = require('./../../../Common/ValidationUtils');

var _NotificationUtils = require('./../../../Common/NotificationUtils');

var _NotificationUtils2 = _interopRequireDefault(_NotificationUtils);

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
            var modelState = (0, _ValidationUtils.validateModel)(this.state.selectedSkill, _SkillModel2.default.fields);
            if (modelState.isValid) {
                this.props.dispatch((0, _Skills.saveSkill)(Object.assign({}, this.state.selectedSkill)));
            } else {
                //for (var message of modelState.validationErrors) {
                //    Notifications.showError('Error', message);
                //}
                _NotificationUtils2.default.showError('Error', modelState.validationErrors);
            }
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

},{"./../../../Common/CompareUtils":3,"./../../../Common/Components/Input/Button":5,"./../../../Common/Components/Input/TextBox":6,"./../../../Common/Components/Modal/ModalDialog":9,"./../../../Common/Components/Modal/ModalDialogComponents":10,"./../../../Common/NotificationUtils":13,"./../../../Common/ValidationUtils":15,"./../Actions/Skills":17,"./../Models/SkillModel":22,"prop-types":34,"react":"react","react-redux":"react-redux"}],20:[function(require,module,exports){
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

var _Grid = require('./../../../Common/Components/Grid/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Constants = require('./../Constants');

var _Skills = require('./../Actions/Skills');

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

},{"./../../../Common/Components/Grid/Grid":4,"./../Actions/Skills":17,"./../Constants":21,"./../Models/SkillModel":22,"prop-types":34,"react":"react","react-redux":"react-redux"}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _Constants = require('./../../../Common/Constants');

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
                    type: _Constants.fieldTypes.int
                },
                name: {
                    type: _Constants.fieldTypes.string,
                    validators: [{
                        type: _Constants.validatorTypes.required,
                        message: 'Name is required'
                    }]
                },
                shortName: {
                    type: _Constants.fieldTypes.string,
                    validators: [{
                        type: _Constants.validatorTypes.required,
                        message: 'Short name is required'
                    }]
                },
                foreColor: {
                    type: _Constants.fieldTypes.color
                },
                category: {
                    type: _Constants.fieldTypes.string
                },
                active: {
                    type: _Constants.fieldTypes.bool
                },
                email: {
                    type: _Constants.fieldTypes.string,
                    validators: [{
                        type: _Constants.validatorTypes.email,
                        message: 'Email is in incorrect format'
                    }]
                },
                startDate: {
                    type: _Constants.fieldTypes.date
                },
                startTime: {
                    type: _Constants.fieldTypes.time
                },
                length: {
                    type: _Constants.fieldTypes.int
                },
                percentage: {
                    type: _Constants.fieldTypes.double
                },
                calculationType: {
                    type: _Constants.fieldTypes.int
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

},{"./../../../Common/Constants":11,"./../../../Common/Models/BaseModel":12,"underscore":"underscore"}],23:[function(require,module,exports){
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

},{"../Constants":21,"./../../../Common/ArrayUtils":2,"./../Models/SkillModel":22,"underscore":"underscore"}],24:[function(require,module,exports){
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

},{"./Models/SkillModel":22}],25:[function(require,module,exports){
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

},{"./../../Common/Reducers/UIReducer":14,"./Reducers/SkillsReducer":23,"redux":"redux","redux-thunk":37}],26:[function(require,module,exports){
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

},{"./Common/Components/Layout/Pagelayout":7,"./Common/Components/Loading/LoadingBar":8,"./Pages/Skills/Components/DeleteSkillDialog":18,"./Pages/Skills/Components/EditSkillDialog":19,"./Pages/Skills/Components/SkillsGrid":20,"./Pages/Skills/store":25,"react":"react","react-dom":"react-dom","react-redux":"react-redux"}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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

},{"_process":30}],29:[function(require,module,exports){
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

},{"./emptyFunction":27,"_process":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./lib/ReactPropTypesSecret":35,"_process":30,"fbjs/lib/invariant":28,"fbjs/lib/warning":29}],32:[function(require,module,exports){
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

},{"./lib/ReactPropTypesSecret":35,"fbjs/lib/emptyFunction":27,"fbjs/lib/invariant":28}],33:[function(require,module,exports){
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

},{"./checkPropTypes":31,"./lib/ReactPropTypesSecret":35,"_process":30,"fbjs/lib/emptyFunction":27,"fbjs/lib/invariant":28,"fbjs/lib/warning":29,"object-assign":36}],34:[function(require,module,exports){
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

},{"./factoryWithThrowingShims":32,"./factoryWithTypeCheckers":33,"_process":30}],35:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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
},{}]},{},[26])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL0NvbW1vbi9BY3Rpb25zL1VJLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0FycmF5VXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcGFyZVV0aWxzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvR3JpZC9HcmlkLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveC5qc3giLCJTY3JpcHRzL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0LmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTG9hZGluZy9Mb2FkaW5nQmFyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL01vZGVscy9CYXNlTW9kZWwuanN4IiwiU2NyaXB0cy9Db21tb24vTm90aWZpY2F0aW9uVXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL1ZhbGlkYXRpb25VdGlscy5qc3giLCJTY3JpcHRzL0luZnJhc3RydWN0dXJlL0FqYXguanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQWN0aW9ucy9Ta2lsbHMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9EZWxldGVTa2lsbERpYWxvZy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0VkaXRTa2lsbERpYWxvZy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL1NraWxsc0dyaWQuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL01vZGVscy9Ta2lsbE1vZGVsLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL1JlZHVjZXJzL1NraWxsc1JlZHVjZXIuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvUm91dGVzLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL3N0b3JlLmpzeCIsIlNjcmlwdHMvU2tpbGxzQnVuZGxlLmpzeCIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FDOztBQUVELFNBQVMsV0FBVCxHQUF1QjtBQUNuQixXQUFPO0FBQ0gsY0FBTSx1QkFBWTtBQURmLEtBQVA7QUFHSDs7QUFFRCxTQUFTLFdBQVQsR0FBdUI7QUFDbkIsV0FBTztBQUNILGNBQU0sdUJBQVk7QUFEZixL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/aW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcblxyXG5mdW5jdGlvbiBzaG93TG9hZGluZygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuU0hPV19MT0FESU5HXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBoaWRlTG9hZGluZygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuSElERV9MT0FESU5HXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHNob3dMb2FkaW5nLCBoaWRlTG9hZGluZyB9OyIsIu+7v2ltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5cclxuZnVuY3Rpb24gYWRkUmVwbGFjZUl0ZW0obGlzdCwgaXRlbSwgaWRlbnRpZmllcikge1xyXG4gICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBsZXQgZXhpc3RpbmdJbmRleCA9IF8uZmluZEluZGV4KGxpc3QsIGZ1bmN0aW9uIChjdXJyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRbaWRlbnRpZmllcl0gPT09IGl0ZW1baWRlbnRpZmllcl07XHJcbiAgICB9KTtcclxuICAgIGlmIChleGlzdGluZ0luZGV4ID49IDApIHtcclxuICAgICAgICBsaXN0ID0gbGlzdC5zbGljZSgpO1xyXG4gICAgICAgIGxpc3RbZXhpc3RpbmdJbmRleF0gPSBpdGVtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIGl0ZW1dO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlSXRlbShsaXN0LCBpdGVtLCBpZGVudGlmaWVyKSB7XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGxldCBleGlzdGluZ0luZGV4ID0gXy5maW5kSW5kZXgobGlzdCwgZnVuY3Rpb24gKGN1cnJlbnQpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFtpZGVudGlmaWVyXSA9PT0gaXRlbVtpZGVudGlmaWVyXTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCkge1xyXG4gICAgICAgIHZhciB0ZW1wTGlzdCA9IGxpc3Quc2xpY2UoKTtcclxuICAgICAgICB0ZW1wTGlzdC5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBMaXN0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkZFJlcGxhY2VJdGVtLCByZW1vdmVJdGVtIH07Iiwi77u/ZnVuY3Rpb24gZGVlcENvbXBhcmUob2JqMSwgb2JqMikge1xyXG4gICAgaWYgKCFvYmoxIHx8ICFvYmoyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgcCBpbiBvYmoxKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAob2JqMVtwXSkgPT0gJ2Z1bmN0aW9uJykgeyBicmVhazsgfVxyXG5cclxuICAgICAgICBpZiAob2JqMS5oYXNPd25Qcm9wZXJ0eShwKSAhPT0gb2JqMi5oYXNPd25Qcm9wZXJ0eShwKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgKG9iajFbcF0pKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlZXBDb21wYXJlKG9iajFbcF0sIG9iajJbcF0pKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqMVtwXSAhPT0gb2JqMltwXSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBxIGluIG9iajIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIChvYmoxW3FdKSA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGRlZXBDb21wYXJlIH0iLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuaW1wb3J0IHsgZGVlcENvbXBhcmUgfSBmcm9tICcuLy4uLy4uL0NvbXBhcmVVdGlscydcclxuXHJcbmNsYXNzIEdyaWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25DbGlja2VkID0gdGhpcy5hZGRCdXR0b25DbGlja2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uQ2xpY2tlZCA9IHRoaXMuZWRpdEJ1dHRvbkNsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZUJ1dHRvbkNsaWNrZWQgPSB0aGlzLmRlbGV0ZUJ1dHRvbkNsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID17XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIHRoaXMucHJvcHMub3B0aW9ucylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAoIWRlZXBDb21wYXJlKG5leHRQcm9wcy5kYXRhLCB0aGlzLnByb3BzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2VuZG9Db250cm9sLmRhdGFTb3VyY2UuZGF0YShuZXh0UHJvcHMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wgPSAkKHRoaXMuY29udGFpbmVyRWxlbWVudCkua2VuZG9HcmlkKHtcclxuICAgICAgICAgICAgZGF0YXNvdXJjZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuaGVscGVycy5wcmVwYXJlQ29sdW1ucyh0aGlzLnByb3BzLmNvbHVtbnMuc2xpY2UoKSwgdGhpcy5zdGF0ZS5vcHRpb25zKSxcclxuICAgICAgICAgICAgdG9vbGJhcjogdGhpcy5oZWxwZXJzLnByZXBhcmVIZWFkZXIodGhpcy5zdGF0ZS5vcHRpb25zKVxyXG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvR3JpZCcpO1xyXG4gICAgICAgIHRoaXMua2VuZG9Db250cm9sLndyYXBwZXIuYWRkQ2xhc3MoJ25vLXNjcm9sbGJhcicpO1xyXG4gICAgICAgIHRoaXMua2VuZG9Db250cm9sLndyYXBwZXIuZmluZCgnLmstZ3JpZC1hZGQnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgdGhpcy5hZGRCdXR0b25DbGlja2VkKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmtlbmRvQ29udHJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLmtlbmRvQ29udHJvbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFJdGVtRnJvbUtlbmRvR3JpZChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2VuZG9Db250cm9sLmRhdGFJdGVtKCQoZS50YXJnZXQpLmNsb3Nlc3QoJ3RyJykpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZEJ1dHRvbkNsaWNrZWQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuc3RhdGUub3B0aW9ucy5vbkFkZEJ1dHRvbkNsaWNrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMub25BZGRCdXR0b25DbGljayhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlZGl0QnV0dG9uQ2xpY2tlZChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zdGF0ZS5vcHRpb25zLm9uRWRpdEJ1dHRvbkNsaWNrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMub25FZGl0QnV0dG9uQ2xpY2sodGhpcy5nZXREYXRhSXRlbUZyb21LZW5kb0dyaWQoZSksIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRlbGV0ZUJ1dHRvbkNsaWNrZWQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuc3RhdGUub3B0aW9ucy5vbkRlbGV0ZUJ1dHRvbkNsaWNrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMub25EZWxldGVCdXR0b25DbGljayh0aGlzLmdldERhdGFJdGVtRnJvbUtlbmRvR3JpZChlKSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzaG93QWRkQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBzaG93RWRpdEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd0RlbGV0ZUJ1dHRvbjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVscGVycygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJlcGFyZUNvbHVtbnMoY29sdW1ucywgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljbk9ubHkgPSBrZW5kby50ZW1wbGF0ZShcIjxhIGNsYXNzPSdjdXN0LWljb24tMTYgay1ncmlkLSM9IG5hbWUgIycgaHJlZj0nXFxcXCMnIHRpdGxlPScjPSB0ZXh0ICMnPjxzcGFuIGNsYXNzPSdpY24tIz0gaWNvbk5hbWUgIy0xNic+PC9zcGFuPiM9IHRleHQgIzwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBpY25Pbmx5ID0ga2VuZG8udGVtcGxhdGUoXCI8YSBjbGFzcz0nY3VzdC1pY29uLTE2IGstZ3JpZC0jPSBuYW1lICMnIGhyZWY9J1xcXFwjJyB0aXRsZT0nIz0gdGV4dCAjJz48c3BhbiBjbGFzcz0naWNuLSM9IGljb25OYW1lICMtMTYnPjwvc3Bhbj48L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0VkaXRCdXR0b24gfHwgb3B0aW9ucy5zaG93RGVsZXRlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1hbmRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0VkaXRCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7IG5hbWU6IFwiZWRpdFwiLCB0ZXh0OiBcIkVkaXRcIiwgY2xpY2s6IHNlbGYuZWRpdEJ1dHRvbkNsaWNrZWQsIGljb25OYW1lOiBcImVkaXRcIiwgdGVtcGxhdGU6IGljbk9ubHkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dEZWxldGVCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7IG5hbWU6IFwiZGVsZXRlXCIsIHRleHQ6ICdEZWxldGUnLCBjbGljazogc2VsZi5kZWxldGVCdXR0b25DbGlja2VkLCBpY29uTmFtZTogXCJkZWxldGVcIiwgdGVtcGxhdGU6IGljbk9ubHkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnNbY29sdW1ucy5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBjb21tYW5kcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXBhcmVIZWFkZXIob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljbkFuZExhYmVsID0ga2VuZG8udGVtcGxhdGUoXCI8YSBjbGFzcz0nY3VzdC1pY29uLTE2IGstZ3JpZC0jPSBuYW1lICMnIGhyZWY9J1xcXFwjJyB0aXRsZT0nIz0gdGV4dCAjJz48c3BhbiBjbGFzcz0naWNuLSM9IGljb25OYW1lICMtMTYnPjwvc3Bhbj4jPSBpY29uVGV4dCAjPC9hPlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dBZGRCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3sgbmFtZTogJ2FkZCcsIHRleHQ6ICdBZGQnLCBpY29uTmFtZTogJ2FkZCcsIHRlbXBsYXRlOiBpY25BbmRMYWJlbCwgaWNvblRleHQ6IFwiQWRkXCIgfV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgcmVmPXsobm9kZSkgPT4geyB0aGlzLmNvbnRhaW5lckVsZW1lbnQgPSBub2RlOyB9fSA+PC9kaXY+O1xyXG4gICAgfVxyXG59XHJcbkdyaWQucHJvcFR5cGVzID0ge1xyXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoXHJcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgZmllbGQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgICAgIH0pXHJcbiAgICApLmlzUmVxdWlyZWQsXHJcbiAgICBkYXRhOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgICAgc2hvd0FkZEJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgc2hvd0VkaXRCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIHNob3dEZWxldGVCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIGFkZEJ1dHRvbkFjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgZWRpdEJ1dHRvbkFjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgZGVsZXRlQnV0dG9uQWN0aW9uOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZDsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DbGljaykpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2J1dHRvbj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5cclxuY2xhc3MgVGV4dEJveCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25DaGFuZ2UoZSkge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNoYW5nZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGFyZ2V0Lm5hbWUsIHRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxhYmVsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD4pO1xyXG4gICAgfVxyXG59O1xyXG5UZXh0Qm94LnByb3BUeXBlcyA9IHtcclxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm5vZGVcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRCb3g7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIFBhZ2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0ncGFnZS1sYXlvdXQnPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZUxheW91dDsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuY2xhc3MgTG9hZGluZ0JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNob3dMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdsb2FkaW5nLWJhcicgLz4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5Mb2FkaW5nQmFyLnByb3BUeXBlcyA9IHtcclxuICAgIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2hvd0xvYWRpbmc6IHN0YXRlLnVpLnNob3dMb2FkaW5nXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTG9hZGluZ0Jhcik7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbCcgc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsRGlhbG9nOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtaGVhZGVyJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtYm9keSc+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY2xhc3MgRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J21vZGFsLWZvb3Rlcic+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBIZWFkZXIsIEJvZHksIEZvb3RlciB9OyIsIu+7v2NvbnN0IGFjdGlvblR5cGVzID0ge1xyXG4gICAgU0hPV19MT0FESU5HOiAnU0hPV19MT0FESU5HJyxcclxuICAgIEhJREVfTE9BRElORzogJ0hJREVfTE9BRElORydcclxufVxyXG5cclxuY29uc3QgZmllbGRUeXBlcyA9IHtcclxuICAgIGludDogJ2ludCcsXHJcbiAgICBkb3VibGU6ICdkb3VibGUnLFxyXG4gICAgdGltZTogJ3RpbWUnLFxyXG4gICAgc3RyaW5nOiAnc3RyaW5nJyxcclxuICAgIGJvb2w6ICdib29sJyxcclxuICAgIGRhdGU6ICdkYXRlJyxcclxuICAgIGNvbG9yOiAnY29sb3InXHJcbn1cclxuXHJcbmNvbnN0IHZhbGlkYXRvclR5cGVzID0ge1xyXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICBlbWFpbDogJ2VtYWlsJyxcclxuICAgIGN1c3RvbTogJ2N1c3RvbScgLy9jdXN0b20gdmFsaWRhdGlvbiBuZWVkcyB0byBwcm92aWRlIHZhbGlkYXRpb24gZnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IHsgYWN0aW9uVHlwZXMsIGZpZWxkVHlwZXMsIHZhbGlkYXRvclR5cGVzIH07Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcclxuaW1wb3J0IHsgZmllbGRUeXBlcyB9IGZyb20gJy4vLi4vQ29uc3RhbnRzJztcclxuXHJcbmNsYXNzIEJhc2VNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtLCBmaWVsZHMpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIF8ubWFwT2JqZWN0KGZpZWxkcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW2tleV0gPSBzZWxmLmdldEJhc2VWYWx1ZSh2YWwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF8ubWFwT2JqZWN0KGZpZWxkcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW2tleV0gPSBpdGVtW2tleV07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJhc2VWYWx1ZShmaWVsZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGZpZWxkRGVzY3JpcHRpb24uZGVmYXVsdFZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmllbGREZXNjcmlwdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZmllbGREZXNjcmlwdGlvbi50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgZmllbGRUeXBlcy5pbnQ6XHJcbiAgICAgICAgICAgIGNhc2UgZmllbGRUeXBlcy5kb3VibGU6XHJcbiAgICAgICAgICAgIGNhc2UgZmllbGRUeXBlcy50aW1lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgZmllbGRUeXBlcy5zdHJpbmc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIGNhc2UgZmllbGRUeXBlcy5ib29sOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuZGF0ZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuY29sb3I6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyMwMDAwMDAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1MaXN0KGl0ZW1zLCBtb2RlbCkge1xyXG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZWQucHVzaChuZXcgbW9kZWwoaXRlbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBJZGVudGlmaWVyKCkge1xyXG4gICAgICAgIHJldHVybiAnaWQnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZU1vZGVsOyIsIu+7v2Z1bmN0aW9uIHNob3dFcnJvcih0aXRsZSwgbWVzc2FnZSkge1xyXG4gICAgc2hvd01lc3NhZ2UodGl0bGUsIG1lc3NhZ2UsICdlcnJvcicpO1xyXG59XHJcbmZ1bmN0aW9uIHNob3dNZXNzYWdlKHRpdGxlLCBtZXNzYWdlLCB0eXBlKSB7XHJcbiAgICAkLnRvYXN0KHtcclxuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxyXG4gICAgICAgIGhlYWRpbmc6IHRpdGxlLCBcclxuICAgICAgICBjbGFzczogdHlwZSxcclxuICAgICAgICBzaG93SGlkZVRyYW5zaXRpb246ICdmYWRlJyxcclxuICAgICAgICBhbGxvd1RvYXN0Q2xvc2U6IHRydWUsXHJcbiAgICAgICAgaGlkZUFmdGVyOiA1MDAwLFxyXG4gICAgICAgIHN0YWNrOiAyMCxcclxuICAgICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXHJcbiAgICAgICAgbG9hZGVyOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc2hvd0Vycm9yIH07Iiwi77u/aW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgc2hvd0xvYWRpbmc6IGZhbHNlXHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdWlSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLlNIT1dfTE9BRElORzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNob3dMb2FkaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuSElERV9MT0FESU5HOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2hvd0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB1aVJlZHVjZXI7Iiwi77u/aW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKG1vZGVsLCBmaWVsZERlZmluaXRpb25zKSB7XHJcbiAgICBsZXQgdmFsaWRhdGlvbkVycm9ycyA9IFtdO1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIF8uZWFjaChmaWVsZERlZmluaXRpb25zLCBmdW5jdGlvbiAoZmllbGQsIGtleSkge1xyXG4gICAgICAgIGlmICghIWZpZWxkLnZhbGlkYXRvcnMpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbW9kZWxba2V5XTtcclxuICAgICAgICAgICAgXy5lYWNoKGZpZWxkLnZhbGlkYXRvcnMsIGZ1bmN0aW9uICh2YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBmb3JtYXQgc2hvdWxkIGJlIHVzZWQgaWYgd2UgbmVlZCBpdCB0byBicmVhayBvbiBmaXJzdCB2YWxpZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0ZVJlcXVpcmVkLCB2YWxpZGF0aW9uRXJyb3JzLCB2YWxpZGF0b3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgZm9ybWF0IHNob3VsZCBiZSB1c2VkIGlmIHdlIG5lZWQgdG8gdmFsaWRhdGUgYWxsIGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRlUmVxdWlyZWQsIHZhbGlkYXRpb25FcnJvcnMsIHZhbGlkYXRvci5tZXNzYWdlKSAmJiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGVFbWFpbCwgdmFsaWRhdGlvbkVycm9ycywgdmFsaWRhdG9yLm1lc3NhZ2UpICYmIGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHsgaXNWYWxpZCwgdmFsaWRhdGlvbkVycm9ycyB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGVGdW5jdGlvbiwgdmFsaWRhdGlvbkVycm9ycywgbWVzc2FnZSkge1xyXG4gICAgdmFyIHZhbGlkID0gdmFsaWRhdGVGdW5jdGlvbih2YWx1ZSk7XHJcbiAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKG1lc3NhZ2UpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlUmVxdWlyZWQodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZS50b1N0cmluZygpID09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW1haWwodmFsdWUpIHtcclxuICAgIC8vVE9ET1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHZhbGlkYXRlTW9kZWwgfTsiLCLvu79pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuY2xhc3MgQWpheCB7XHJcbiAgICBzdGF0aWMgZXhlY3V0ZVJlcXVlc3QobWV0aG9kLCB1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3NbbWV0aG9kXSh1cmwsIGRhdGEpXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBBamF4LmV4ZWN1dGVSZXF1ZXN0KCdnZXQnLCB1cmwpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ3Bvc3QnLCB1cmwsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHB1dCh1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gQWpheC5leGVjdXRlUmVxdWVzdCgncHV0JywgdXJsLCBkYXRhKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGUodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ2RlbGV0ZScsIHVybCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFqYXg7Iiwi77u/aW1wb3J0IHVpQWN0aW9ucyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9BY3Rpb25zL1VJJztcclxuaW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBBamF4IGZyb20gJy4vLi4vLi4vLi4vSW5mcmFzdHJ1Y3R1cmUvQWpheCc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5pbXBvcnQgeyBza2lsbFJvdXRlcyB9IGZyb20gJy4vLi4vUm91dGVzJztcclxuXHJcbmZ1bmN0aW9uIGdldFNraWxscygpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmdldChza2lsbFJvdXRlcy5nZXRBbGxVcmwoKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRTa2lsbHNTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldFNraWxsc1N1Y2Nlc3MoZGF0YSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5HRVRfU0tJTExTX1NVQ0NFU1MsXHJcbiAgICAgICAgc2tpbGxzTGlzdDogU2tpbGxNb2RlbC50cmFuc2Zvcm1MaXN0KGRhdGEpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIG9wZW5Ta2lsbERldGFpbHNQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5FRElUX1NLSUxMLFxyXG4gICAgICAgIHNlbGVjdGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVTa2lsbChza2lsbCkge1xyXG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuc2hvd0xvYWRpbmcoKSk7XHJcbiAgICAgICAgbGV0IGhhc0lkID0gc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXSA+IDA7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IGhhc0lkID8gJ3B1dCcgOiAncG9zdCc7XHJcbiAgICAgICAgbGV0IHVybCA9IGhhc0lkID8gc2tpbGxSb3V0ZXMudXBkYXRlVXJsKHNraWxsKSA6IHNraWxsUm91dGVzLmNyZWF0ZVVybCgpO1xyXG4gICAgICAgIHJldHVybiBBamF4W21ldGhvZF0odXJsLCBza2lsbClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChzYXZlU2tpbGxTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlU2tpbGxTdWNjZXNzKHNraWxsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLlNBVkVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBzYXZlZFNraWxsOiBuZXcgU2tpbGxNb2RlbChza2lsbClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX0NBTkNFTFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2tpbGxEZWxldGVQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTEwsXHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2tpbGxcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlU2tpbGwoc2tpbGwpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmRlbGV0ZShza2lsbFJvdXRlcy5kZWxldGVVcmwoc2tpbGwpKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHVpQWN0aW9ucy5oaWRlTG9hZGluZygpKTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBkZWxldGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfQ0FOQ0VMXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdldFNraWxscywgb3BlblNraWxsRGV0YWlsc1BvcHVwLCBzYXZlU2tpbGwsIHNhdmVTa2lsbENhbmNlbCwgb3BlblNraWxsRGVsZXRlUG9wdXAsIGRlbGV0ZVNraWxsLCBkZWxldGVTa2lsbENhbmNlbCB9Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgZGVlcENvbXBhcmUgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wYXJlVXRpbHMnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cnO1xyXG5pbXBvcnQgTW9kYWxEaWFsb2dDb21wb25lbnRzIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2dDb21wb25lbnRzJztcclxuaW1wb3J0IHsgZGVsZXRlU2tpbGwsIGRlbGV0ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBEZWxldGVTa2lsbERpYWxvZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uRGVsZXRlID0gdGhpcy5vbkRlbGV0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwsIHRoaXMucHJvcHMuc2VsZWN0ZWRTa2lsbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRlbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZVNraWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkpKTtcclxuICAgIH1cclxuICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZGVsZXRlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxEaWFsb2c+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICBEZWxldGUgU2tpbGxcclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdpc2ggdG8gZGVsZXRlIHRoaXMgc2tpbGw/XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkRGVsZXRlU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9EZWxldGVTa2lsbERpYWxvZy5wcm9wVHlwZXMgPSB7XHJcbi8vICAgIHNlbGVjdGVkU2tpbGw6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNraWxsTW9kZWwpXHJcbi8vfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKERlbGV0ZVNraWxsRGlhbG9nKSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IGRlZXBDb21wYXJlIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcGFyZVV0aWxzJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0lucHV0L0J1dHRvbic7XHJcbmltcG9ydCBUZXh0Qm94IGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveCc7XHJcbmltcG9ydCBNb2RhbERpYWxvZyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nQ29tcG9uZW50cyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nQ29tcG9uZW50cyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlTW9kZWwgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9WYWxpZGF0aW9uVXRpbHMnO1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Ob3RpZmljYXRpb25VdGlscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnXHJcbmltcG9ydCB7IHNhdmVTa2lsbCwgc2F2ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBFZGl0U2tpbGxEaWFsb2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vblNhdmUgPSB0aGlzLm9uU2F2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZWVwQ29tcGFyZShuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCwgdGhpcy5wcm9wcy5zZWxlY3RlZFNraWxsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IE9iamVjdC5hc3NpZ24oe30sIG5leHRQcm9wcy5zZWxlY3RlZFNraWxsKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2F2ZSgpIHtcclxuICAgICAgICB2YXIgbW9kZWxTdGF0ZSA9IHZhbGlkYXRlTW9kZWwodGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsLCBTa2lsbE1vZGVsLmZpZWxkcyk7XHJcbiAgICAgICAgaWYgKG1vZGVsU3RhdGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHNhdmVTa2lsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9mb3IgKHZhciBtZXNzYWdlIG9mIG1vZGVsU3RhdGUudmFsaWRhdGlvbkVycm9ycykge1xyXG4gICAgICAgICAgICAvLyAgICBOb3RpZmljYXRpb25zLnNob3dFcnJvcignRXJyb3InLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuc2hvd0Vycm9yKCdFcnJvcicsIG1vZGVsU3RhdGUudmFsaWRhdGlvbkVycm9ycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25DYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChzYXZlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRTa2lsbCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCk7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbFtuYW1lXSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2VsZWN0ZWRTa2lsbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsRGlhbG9nPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdCBTa2lsbFxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuSGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSduYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdTaG9ydCBOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdzaG9ydE5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwuc2hvcnROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblNhdmV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTYXZlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9FZGl0U2tpbGxEaWFsb2cucHJvcFR5cGVzID0ge1xyXG4vLyAgICBzZWxlY3RlZFNraWxsOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTa2lsbE1vZGVsKVxyXG4vL31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShFZGl0U2tpbGxEaWFsb2cpIiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IEdyaWQgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcG9uZW50cy9HcmlkL0dyaWQnO1xyXG5pbXBvcnQgeyBncmlkQ29sdW1ucyB9IGZyb20gJy4vLi4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ2V0U2tpbGxzLCBvcGVuU2tpbGxEZXRhaWxzUG9wdXAsIG9wZW5Ta2lsbERlbGV0ZVBvcHVwIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5cclxuY2xhc3MgU2tpbGxzR3JpZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGdldFNraWxscygpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JpZE9wdGlvbnMoKSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb25FZGl0QnV0dG9uQ2xpY2soaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZXRhaWxzUG9wdXAoaXRlbSkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQWRkQnV0dG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZXRhaWxzUG9wdXAobmV3IFNraWxsTW9kZWwoKSkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2soaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZWxldGVQb3B1cChpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHcmlkXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cclxuICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2tpbGxzfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5ncmlkT3B0aW9uc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Ta2lsbHNHcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIHNraWxsczogUHJvcFR5cGVzLmFycmF5T2YoXHJcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoU2tpbGxNb2RlbClcclxuICAgICksXHJcbiAgICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2tpbGxzOiBzdGF0ZS5za2lsbHMuc2tpbGxzTGlzdFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFNraWxsc0dyaWQpOyIsIu+7v2NvbnN0IGFjdGlvblR5cGVzID0ge1xyXG4gICAgR0VUX1NLSUxMUzogJ0dFVF9TS0lMTFMnLFxyXG4gICAgR0VUX1NLSUxMU19TVUNDRVNTOiAnR0VUX1NLSUxMU19TVUNDRVNTJyxcclxuICAgIENSRUFURV9ORVdfU0tJTEw6ICdDUkVBVEVfTkVXX1NLSUxMJyxcclxuICAgIEVESVRfU0tJTEw6J0VESVRfU0tJTEwnLFxyXG4gICAgU0FWRV9TS0lMTDogJ1NBVkVfU0tJTEwnLFxyXG4gICAgU0FWRV9TS0lMTF9DQU5DRUw6ICdTQVZFX1NLSUxMX0NBTkNFTCcsXHJcbiAgICBTQVZFX1NLSUxMX1NVQ0NFU1M6ICdTQVZFX1NLSUxMX1NVQ0NFU1MnLFxyXG4gICAgREVMRVRFX1NLSUxMOiAnREVMRVRFX1NLSUxMJyxcclxuICAgIERFTEVURV9TS0lMTF9DQU5DRUw6ICdERUxFVEVfU0tJTExfQ0FOQ0VMJyxcclxuICAgIERFTEVURV9TS0lMTF9TVUNDRVNTOiAnREVMRVRFX1NLSUxMX1NVQ0NFU1MnXHJcbn07XHJcblxyXG5jb25zdCBncmlkQ29sdW1ucyA9IFtcclxuICAgIHsgdGl0bGU6ICdOYW1lJywgZmllbGQ6ICduYW1lJyB9LFxyXG4gICAgeyB0aXRsZTogJ1Nob3J0IG5hbWUnLCBmaWVsZDogJ3Nob3J0TmFtZScgfSxcclxuICAgIHsgdGl0bGU6ICdDYXRlZ29yeScsIGZpZWxkOiAnY2F0ZWdvcnknIH1cclxuXTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBhY3Rpb25UeXBlcyxcclxuICAgIGdyaWRDb2x1bW5zXHJcbn0iLCLvu79pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuaW1wb3J0IHsgZmllbGRUeXBlcywgdmFsaWRhdG9yVHlwZXMgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db25zdGFudHMnO1xyXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL01vZGVscy9CYXNlTW9kZWwnO1xyXG5cclxuY2xhc3MgU2tpbGxNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihza2lsbCkge1xyXG4gICAgICAgIHN1cGVyKHNraWxsLCBTa2lsbE1vZGVsLmZpZWxkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBmaWVsZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuaW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFsaWRhdG9yVHlwZXMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdOYW1lIGlzIHJlcXVpcmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2hvcnROYW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHZhbGlkYXRvclR5cGVzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU2hvcnQgbmFtZSBpcyByZXF1aXJlZCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvcmVDb2xvcjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmllbGRUeXBlcy5jb2xvclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmllbGRUeXBlcy5zdHJpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmJvb2xcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFsaWRhdG9yVHlwZXMuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbWFpbCBpcyBpbiBpbmNvcnJlY3QgZm9ybWF0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmRhdGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLnRpbWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVuZ3RoOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmludFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwZXJjZW50YWdlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmRvdWJsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvblR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuaW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBJZGVudGlmaWVyKCkge1xyXG4gICAgICAgIHJldHVybiAnaWQnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTGlzdChza2lsbHMpIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtTGlzdChza2lsbHMsIFNraWxsTW9kZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTa2lsbE1vZGVsOyIsIu+7v2ltcG9ydCB7IGFjdGlvblR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcbmltcG9ydCB7IGFkZFJlcGxhY2VJdGVtLCByZW1vdmVJdGVtIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQXJyYXlVdGlscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgc2tpbGxzTGlzdDogW10sXHJcbiAgICBzZWxlY3RlZFNraWxsOiBudWxsLFxyXG4gICAgc2VsZWN0ZWREZWxldGVTa2lsbDogbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBza2lsbHNSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkdFVF9TS0lMTFNfU1VDQ0VTUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNraWxsc0xpc3Q6IGFjdGlvbi5za2lsbHNMaXN0IH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuQ1JFQVRFX05FV19TS0lMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkU2tpbGw6IHt9IH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuRURJVF9TS0lMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkU2tpbGw6IGFjdGlvbi5zZWxlY3RlZFNraWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWREZWxldGVTa2lsbDogYWN0aW9uLnNlbGVjdGVkU2tpbGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBza2lsbHNMaXN0OiBhZGRSZXBsYWNlSXRlbShzdGF0ZS5za2lsbHNMaXN0LCBhY3Rpb24uc2F2ZWRTa2lsbCwgU2tpbGxNb2RlbC5JZGVudGlmaWVyKSwgc2VsZWN0ZWRTa2lsbDogbnVsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9TS0lMTF9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2tpbGxzTGlzdDogcmVtb3ZlSXRlbShzdGF0ZS5za2lsbHNMaXN0LCBhY3Rpb24uZGVsZXRlZFNraWxsLCBTa2lsbE1vZGVsLklkZW50aWZpZXIpLCBzZWxlY3RlZERlbGV0ZVNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuU0FWRV9TS0lMTF9DQU5DRUw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZFNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMX0NBTkNFTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkRGVsZXRlU2tpbGw6IG51bGwgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBza2lsbHNSZWR1Y2VyOyIsIu+7v2ltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5jb25zdCBza2lsbFJvdXRlcyA9IHtcclxuICAgIGdldEFsbFVybCgpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMnO1xyXG4gICAgfSxcclxuICAgIGdldFNpbmdsZVVybChza2lsbCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscy8nICsgc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzJztcclxuICAgIH0sXHJcbiAgICB1cGRhdGVVcmwoc2tpbGwpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMvJyArIHNraWxsW1NraWxsTW9kZWwuSWRlbnRpZmllcl07XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVXJsKHNraWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzLycgKyBza2lsbFtTa2lsbE1vZGVsLklkZW50aWZpZXJdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBza2lsbFJvdXRlcyB9OyIsIu+7v2ltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCBza2lsbHMgZnJvbSAnLi9SZWR1Y2Vycy9Ta2lsbHNSZWR1Y2VyJ1xyXG5pbXBvcnQgdWkgZnJvbSAnLi8uLi8uLi9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyJztcclxuXHJcbmNvbnN0IGFwcFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgc2tpbGxzLFxyXG4gICAgdWlcclxufSk7XHJcbmNvbnN0IHJvb3RSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgIHJldHVybiBhcHBSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG59O1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcclxuICAgIHJvb3RSZWR1Y2VyLFxyXG4gICAgY29tcG9zZShcclxuICAgICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmtNaWRkbGV3YXJlKVxyXG4gICAgKVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvc3RvcmUnO1xyXG5pbXBvcnQgUGFnZUxheW91dCBmcm9tICcuL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0J1xyXG5pbXBvcnQgTG9hZGluZ0JhciBmcm9tICcuL0NvbW1vbi9Db21wb25lbnRzL0xvYWRpbmcvTG9hZGluZ0Jhcic7XHJcbmltcG9ydCBTa2lsbHNHcmlkIGZyb20gJy4vUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvU2tpbGxzR3JpZCc7XHJcbmltcG9ydCBFZGl0U2tpbGxEaWFsb2cgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9FZGl0U2tpbGxEaWFsb2cnO1xyXG5pbXBvcnQgRGVsZXRlU2tpbGxEaWFsb2cgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9EZWxldGVTa2lsbERpYWxvZyc7XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIDxMb2FkaW5nQmFyIC8+XHJcbiAgICAgICAgICAgIDxQYWdlTGF5b3V0PlxyXG4gICAgICAgICAgICAgICAgPFNraWxsc0dyaWQgLz5cclxuICAgICAgICAgICAgPC9QYWdlTGF5b3V0PlxyXG4gICAgICAgICAgICA8RWRpdFNraWxsRGlhbG9nIC8+XHJcbiAgICAgICAgICAgIDxEZWxldGVTa2lsbERpYWxvZyAvPlxyXG4gICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2lsbHNSb290RWxlbWVudCcpXHJcbik7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBjcmVhdGVUaHVua01pZGRsZXdhcmUoZXh0cmFBcmd1bWVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlLCBleHRyYUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciB0aHVuayA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZSgpO1xudGh1bmsud2l0aEV4dHJhQXJndW1lbnQgPSBjcmVhdGVUaHVua01pZGRsZXdhcmU7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRodW5rOyJdfQ==
