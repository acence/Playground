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

var _Constants = require('./Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateModel(model, fieldDefinitions) {
    var validationErrors = [];
    var isValid = true;

    _underscore2.default.each(fieldDefinitions, function (field, key) {
        if (!!field.validators) {
            var value = model[key];
            _underscore2.default.each(field.validators, function (validator) {
                switch (validator.type) {
                    case _Constants.validatorTypes.required:
                        //this format should be used if we need it to break on first validate
                        //isValid = isValid && validate(value, validateRequired, validationErrors, validator.message);

                        //this format should be used if we need to validate all fields
                        isValid = validate(value, validateRequired, validationErrors, validator.message) && isValid;
                        break;
                    case _Constants.validatorTypes.email:
                        isValid = validate(value, validateEmail, validationErrors, validator.message) && isValid;
                        break;
                    case _Constants.validatorTypes.custom:
                        isValid = validate(value, validator.validateFunction, validationErrors, validator.message) && isValid;
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

},{"./Constants":11,"underscore":"underscore"}],16:[function(require,module,exports){
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
                        type: _Constants.validatorTypes.required,
                        message: 'Email is required'
                    }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL0NvbW1vbi9BY3Rpb25zL1VJLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0FycmF5VXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcGFyZVV0aWxzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvR3JpZC9HcmlkLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveC5qc3giLCJTY3JpcHRzL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0LmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTG9hZGluZy9Mb2FkaW5nQmFyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cuanN4IiwiU2NyaXB0cy9Db21tb24vQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuanN4IiwiU2NyaXB0cy9Db21tb24vQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvQ29tbW9uL01vZGVscy9CYXNlTW9kZWwuanN4IiwiU2NyaXB0cy9Db21tb24vTm90aWZpY2F0aW9uVXRpbHMuanN4IiwiU2NyaXB0cy9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyLmpzeCIsIlNjcmlwdHMvQ29tbW9uL1ZhbGlkYXRpb25VdGlscy5qc3giLCJTY3JpcHRzL0luZnJhc3RydWN0dXJlL0FqYXguanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQWN0aW9ucy9Ta2lsbHMuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9EZWxldGVTa2lsbERpYWxvZy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL0VkaXRTa2lsbERpYWxvZy5qc3giLCJTY3JpcHRzL1BhZ2VzL1NraWxscy9Db21wb25lbnRzL1NraWxsc0dyaWQuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvQ29uc3RhbnRzLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL01vZGVscy9Ta2lsbE1vZGVsLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL1JlZHVjZXJzL1NraWxsc1JlZHVjZXIuanN4IiwiU2NyaXB0cy9QYWdlcy9Ta2lsbHMvUm91dGVzLmpzeCIsIlNjcmlwdHMvUGFnZXMvU2tpbGxzL3N0b3JlLmpzeCIsIlNjcmlwdHMvU2tpbGxzQnVuZGxlLmpzeCIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FDOztBQUVELFNBQVMsV0FBVCxHQUF1QjtBQUNuQixXQUFPO0FBQ0gsY0FBTSx1QkFBWTtBQURmLEtBQVA7QUFHSDs7QUFFRCxTQUFTLFdBQVQsR0FBdUI7QUFDbkIsV0FBTztBQUNILGNBQU0sdUJBQVk7QUFEZixL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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzloQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7v2ltcG9ydCB7IGFjdGlvblR5cGVzIH0gZnJvbSAnLi8uLi9Db25zdGFudHMnO1xyXG5cclxuZnVuY3Rpb24gc2hvd0xvYWRpbmcoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLlNIT1dfTE9BRElOR1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gaGlkZUxvYWRpbmcoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLkhJREVfTE9BRElOR1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzaG93TG9hZGluZywgaGlkZUxvYWRpbmcgfTsiLCLvu79pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuXHJcbmZ1bmN0aW9uIGFkZFJlcGxhY2VJdGVtKGxpc3QsIGl0ZW0sIGlkZW50aWZpZXIpIHtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgbGV0IGV4aXN0aW5nSW5kZXggPSBfLmZpbmRJbmRleChsaXN0LCBmdW5jdGlvbiAoY3VycmVudCkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50W2lkZW50aWZpZXJdID09PSBpdGVtW2lkZW50aWZpZXJdO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgbGlzdCA9IGxpc3Quc2xpY2UoKTtcclxuICAgICAgICBsaXN0W2V4aXN0aW5nSW5kZXhdID0gaXRlbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGlzdCA9IFsuLi5saXN0LCBpdGVtXTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW0obGlzdCwgaXRlbSwgaWRlbnRpZmllcikge1xyXG4gICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBsZXQgZXhpc3RpbmdJbmRleCA9IF8uZmluZEluZGV4KGxpc3QsIGZ1bmN0aW9uIChjdXJyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRbaWRlbnRpZmllcl0gPT09IGl0ZW1baWRlbnRpZmllcl07XHJcbiAgICB9KTtcclxuICAgIGlmIChleGlzdGluZ0luZGV4ID49IDApIHtcclxuICAgICAgICB2YXIgdGVtcExpc3QgPSBsaXN0LnNsaWNlKCk7XHJcbiAgICAgICAgdGVtcExpc3Quc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpO1xyXG4gICAgICAgIHJldHVybiB0ZW1wTGlzdDtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRSZXBsYWNlSXRlbSwgcmVtb3ZlSXRlbSB9OyIsIu+7v2Z1bmN0aW9uIGRlZXBDb21wYXJlKG9iajEsIG9iajIpIHtcclxuICAgIGlmICghb2JqMSB8fCAhb2JqMikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIHAgaW4gb2JqMSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKG9iajFbcF0pID09ICdmdW5jdGlvbicpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgICAgaWYgKG9iajEuaGFzT3duUHJvcGVydHkocCkgIT09IG9iajIuaGFzT3duUHJvcGVydHkocCkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIChvYmoxW3BdKSkge1xyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFkZWVwQ29tcGFyZShvYmoxW3BdLCBvYmoyW3BdKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKG9iajFbcF0gIT09IG9iajJbcF0pIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgcSBpbiBvYmoyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAob2JqMVtxXSkgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgeyBkZWVwQ29tcGFyZSB9Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcbmltcG9ydCB7IGRlZXBDb21wYXJlIH0gZnJvbSAnLi8uLi8uLi9Db21wYXJlVXRpbHMnXHJcblxyXG5jbGFzcyBHcmlkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuYWRkQnV0dG9uQ2xpY2tlZCA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbkNsaWNrZWQgPSB0aGlzLmVkaXRCdXR0b25DbGlja2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kZWxldGVCdXR0b25DbGlja2VkID0gdGhpcy5kZWxldGVCdXR0b25DbGlja2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9e1xyXG4gICAgICAgICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCB0aGlzLnByb3BzLm9wdGlvbnMpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKCFkZWVwQ29tcGFyZShuZXh0UHJvcHMuZGF0YSwgdGhpcy5wcm9wcy5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmtlbmRvQ29udHJvbC5kYXRhU291cmNlLmRhdGEobmV4dFByb3BzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMua2VuZG9Db250cm9sID0gJCh0aGlzLmNvbnRhaW5lckVsZW1lbnQpLmtlbmRvR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFzb3VyY2U6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmhlbHBlcnMucHJlcGFyZUNvbHVtbnModGhpcy5wcm9wcy5jb2x1bW5zLnNsaWNlKCksIHRoaXMuc3RhdGUub3B0aW9ucyksXHJcbiAgICAgICAgICAgIHRvb2xiYXI6IHRoaXMuaGVscGVycy5wcmVwYXJlSGVhZGVyKHRoaXMuc3RhdGUub3B0aW9ucylcclxuICAgICAgICB9KS5kYXRhKCdrZW5kb0dyaWQnKTtcclxuICAgICAgICB0aGlzLmtlbmRvQ29udHJvbC53cmFwcGVyLmFkZENsYXNzKCduby1zY3JvbGxiYXInKTtcclxuICAgICAgICB0aGlzLmtlbmRvQ29udHJvbC53cmFwcGVyLmZpbmQoJy5rLWdyaWQtYWRkJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHRoaXMuYWRkQnV0dG9uQ2xpY2tlZCk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5rZW5kb0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5rZW5kb0NvbnRyb2wuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhSXRlbUZyb21LZW5kb0dyaWQoZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtlbmRvQ29udHJvbC5kYXRhSXRlbSgkKGUudGFyZ2V0KS5jbG9zZXN0KCd0cicpKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRCdXR0b25DbGlja2VkKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnN0YXRlLm9wdGlvbnMub25BZGRCdXR0b25DbGljaykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLm9uQWRkQnV0dG9uQ2xpY2soZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWRpdEJ1dHRvbkNsaWNrZWQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuc3RhdGUub3B0aW9ucy5vbkVkaXRCdXR0b25DbGljaykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLm9uRWRpdEJ1dHRvbkNsaWNrKHRoaXMuZ2V0RGF0YUl0ZW1Gcm9tS2VuZG9HcmlkKGUpLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZWxldGVCdXR0b25DbGlja2VkKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnN0YXRlLm9wdGlvbnMub25EZWxldGVCdXR0b25DbGljaykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLm9uRGVsZXRlQnV0dG9uQ2xpY2sodGhpcy5nZXREYXRhSXRlbUZyb21LZW5kb0dyaWQoZSksIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2hvd0FkZEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd0VkaXRCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dEZWxldGVCdXR0b246IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlbHBlcnMoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByZXBhcmVDb2x1bW5zKGNvbHVtbnMsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY25Pbmx5ID0ga2VuZG8udGVtcGxhdGUoXCI8YSBjbGFzcz0nY3VzdC1pY29uLTE2IGstZ3JpZC0jPSBuYW1lICMnIGhyZWY9J1xcXFwjJyB0aXRsZT0nIz0gdGV4dCAjJz48c3BhbiBjbGFzcz0naWNuLSM9IGljb25OYW1lICMtMTYnPjwvc3Bhbj4jPSB0ZXh0ICM8L2E+XCIpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgaWNuT25seSA9IGtlbmRvLnRlbXBsYXRlKFwiPGEgY2xhc3M9J2N1c3QtaWNvbi0xNiBrLWdyaWQtIz0gbmFtZSAjJyBocmVmPSdcXFxcIycgdGl0bGU9JyM9IHRleHQgIyc+PHNwYW4gY2xhc3M9J2ljbi0jPSBpY29uTmFtZSAjLTE2Jz48L3NwYW4+PC9hPlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dFZGl0QnV0dG9uIHx8IG9wdGlvbnMuc2hvd0RlbGV0ZUJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tYW5kcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dFZGl0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goeyBuYW1lOiBcImVkaXRcIiwgdGV4dDogXCJFZGl0XCIsIGNsaWNrOiBzZWxmLmVkaXRCdXR0b25DbGlja2VkLCBpY29uTmFtZTogXCJlZGl0XCIsIHRlbXBsYXRlOiBpY25Pbmx5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93RGVsZXRlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goeyBuYW1lOiBcImRlbGV0ZVwiLCB0ZXh0OiAnRGVsZXRlJywgY2xpY2s6IHNlbGYuZGVsZXRlQnV0dG9uQ2xpY2tlZCwgaWNvbk5hbWU6IFwiZGVsZXRlXCIsIHRlbXBsYXRlOiBpY25Pbmx5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2NvbHVtbnMubGVuZ3RoXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogY29tbWFuZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmVwYXJlSGVhZGVyKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY25BbmRMYWJlbCA9IGtlbmRvLnRlbXBsYXRlKFwiPGEgY2xhc3M9J2N1c3QtaWNvbi0xNiBrLWdyaWQtIz0gbmFtZSAjJyBocmVmPSdcXFxcIycgdGl0bGU9JyM9IHRleHQgIyc+PHNwYW4gY2xhc3M9J2ljbi0jPSBpY29uTmFtZSAjLTE2Jz48L3NwYW4+Iz0gaWNvblRleHQgIzwvYT5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93QWRkQnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt7IG5hbWU6ICdhZGQnLCB0ZXh0OiAnQWRkJywgaWNvbk5hbWU6ICdhZGQnLCB0ZW1wbGF0ZTogaWNuQW5kTGFiZWwsIGljb25UZXh0OiBcIkFkZFwiIH1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj17KG5vZGUpID0+IHsgdGhpcy5jb250YWluZXJFbGVtZW50ID0gbm9kZTsgfX0gPjwvZGl2PjtcclxuICAgIH1cclxufVxyXG5HcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGZpZWxkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgICAgICB9KVxyXG4gICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgZGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIHNob3dBZGRCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIHNob3dFZGl0QnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBzaG93RGVsZXRlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBhZGRCdXR0b25BY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGVkaXRCdXR0b25BY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbkFjdGlvbjogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQ2xpY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja30+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9idXR0b24+KTtcclxuICAgIH1cclxufTtcclxuXHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuXHJcbmNsYXNzIFRleHRCb3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uQ2hhbmdlKGUpIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DaGFuZ2UpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRhcmdldC5uYW1lLCB0YXJnZXQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5sYWJlbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0J1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cclxuICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+KTtcclxuICAgIH1cclxufTtcclxuVGV4dEJveC5wcm9wVHlwZXMgPSB7XHJcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ub2RlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0Qm94OyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBQYWdlTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J3BhZ2UtbGF5b3V0Jz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VMYXlvdXQ7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmNsYXNzIExvYWRpbmdCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zaG93TG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nbG9hZGluZy1iYXInIC8+KTtcclxuICAgIH1cclxufVxyXG5cclxuTG9hZGluZ0Jhci5wcm9wVHlwZXMgPSB7XHJcbiAgICBzaG93TG9hZGluZzogUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNob3dMb2FkaW5nOiBzdGF0ZS51aS5zaG93TG9hZGluZ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKExvYWRpbmdCYXIpOyIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBNb2RhbERpYWxvZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW9kYWwnIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21vZGFsLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbERpYWxvZzsiLCLvu79pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J21vZGFsLWhlYWRlcic+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jbGFzcyBCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J21vZGFsLWJvZHknPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmNsYXNzIEZvb3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1mb290ZXInPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgSGVhZGVyLCBCb2R5LCBGb290ZXIgfTsiLCLvu79jb25zdCBhY3Rpb25UeXBlcyA9IHtcclxuICAgIFNIT1dfTE9BRElORzogJ1NIT1dfTE9BRElORycsXHJcbiAgICBISURFX0xPQURJTkc6ICdISURFX0xPQURJTkcnXHJcbn1cclxuXHJcbmNvbnN0IGZpZWxkVHlwZXMgPSB7XHJcbiAgICBpbnQ6ICdpbnQnLFxyXG4gICAgZG91YmxlOiAnZG91YmxlJyxcclxuICAgIHRpbWU6ICd0aW1lJyxcclxuICAgIHN0cmluZzogJ3N0cmluZycsXHJcbiAgICBib29sOiAnYm9vbCcsXHJcbiAgICBkYXRlOiAnZGF0ZScsXHJcbiAgICBjb2xvcjogJ2NvbG9yJ1xyXG59XHJcblxyXG5jb25zdCB2YWxpZGF0b3JUeXBlcyA9IHtcclxuICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgZW1haWw6ICdlbWFpbCcsXHJcbiAgICBjdXN0b206ICdjdXN0b20nIC8vY3VzdG9tIHZhbGlkYXRpb24gbmVlZHMgdG8gcHJvdmlkZSB2YWxpZGF0aW9uIGZ1bmN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCB7IGFjdGlvblR5cGVzLCBmaWVsZFR5cGVzLCB2YWxpZGF0b3JUeXBlcyB9OyIsIu+7v2ltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXHJcbmltcG9ydCB7IGZpZWxkVHlwZXMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcblxyXG5jbGFzcyBCYXNlTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IoaXRlbSwgZmllbGRzKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICBfLm1hcE9iamVjdChmaWVsZHMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZltrZXldID0gc2VsZi5nZXRCYXNlVmFsdWUodmFsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfLm1hcE9iamVjdChmaWVsZHMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZltrZXldID0gaXRlbVtrZXldO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRCYXNlVmFsdWUoZmllbGREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChmaWVsZERlc2NyaXB0aW9uLmRlZmF1bHRWYWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkRGVzY3JpcHRpb24uZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGZpZWxkRGVzY3JpcHRpb24udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuaW50OlxyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuZG91YmxlOlxyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMudGltZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuc3RyaW5nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICBjYXNlIGZpZWxkVHlwZXMuYm9vbDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgY2FzZSBmaWVsZFR5cGVzLmRhdGU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgY2FzZSBmaWVsZFR5cGVzLmNvbG9yOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcjMDAwMDAwJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTGlzdChpdGVtcywgbW9kZWwpIHtcclxuICAgICAgICBsZXQgdHJhbnNmb3JtZWQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkLnB1c2gobmV3IG1vZGVsKGl0ZW0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgSWRlbnRpZmllcigpIHtcclxuICAgICAgICByZXR1cm4gJ2lkJztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VNb2RlbDsiLCLvu79mdW5jdGlvbiBzaG93RXJyb3IodGl0bGUsIG1lc3NhZ2UpIHtcclxuICAgIHNob3dNZXNzYWdlKHRpdGxlLCBtZXNzYWdlLCAnZXJyb3InKTtcclxufVxyXG5mdW5jdGlvbiBzaG93TWVzc2FnZSh0aXRsZSwgbWVzc2FnZSwgdHlwZSkge1xyXG4gICAgJC50b2FzdCh7XHJcbiAgICAgICAgdGV4dDogbWVzc2FnZSxcclxuICAgICAgICBoZWFkaW5nOiB0aXRsZSwgXHJcbiAgICAgICAgY2xhc3M6IHR5cGUsXHJcbiAgICAgICAgc2hvd0hpZGVUcmFuc2l0aW9uOiAnZmFkZScsXHJcbiAgICAgICAgYWxsb3dUb2FzdENsb3NlOiB0cnVlLFxyXG4gICAgICAgIGhpZGVBZnRlcjogNTAwMCxcclxuICAgICAgICBzdGFjazogMjAsXHJcbiAgICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxyXG4gICAgICAgIGxvYWRlcjogZmFsc2VcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHNob3dFcnJvciB9OyIsIu+7v2ltcG9ydCB7IGFjdGlvblR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIHNob3dMb2FkaW5nOiBmYWxzZVxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVpUmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5TSE9XX0xPQURJTkc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzaG93TG9hZGluZzogdHJ1ZSB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkhJREVfTE9BRElORzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNob3dMb2FkaW5nOiBmYWxzZSB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdWlSZWR1Y2VyOyIsIu+7v2ltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgeyB2YWxpZGF0b3JUeXBlcyB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwobW9kZWwsIGZpZWxkRGVmaW5pdGlvbnMpIHtcclxuICAgIGxldCB2YWxpZGF0aW9uRXJyb3JzID0gW107XHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgXy5lYWNoKGZpZWxkRGVmaW5pdGlvbnMsIGZ1bmN0aW9uIChmaWVsZCwga2V5KSB7XHJcbiAgICAgICAgaWYgKCEhZmllbGQudmFsaWRhdG9ycykge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBtb2RlbFtrZXldO1xyXG4gICAgICAgICAgICBfLmVhY2goZmllbGQudmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdmFsaWRhdG9yVHlwZXMucmVxdWlyZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBmb3JtYXQgc2hvdWxkIGJlIHVzZWQgaWYgd2UgbmVlZCBpdCB0byBicmVhayBvbiBmaXJzdCB2YWxpZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0ZVJlcXVpcmVkLCB2YWxpZGF0aW9uRXJyb3JzLCB2YWxpZGF0b3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgZm9ybWF0IHNob3VsZCBiZSB1c2VkIGlmIHdlIG5lZWQgdG8gdmFsaWRhdGUgYWxsIGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRlUmVxdWlyZWQsIHZhbGlkYXRpb25FcnJvcnMsIHZhbGlkYXRvci5tZXNzYWdlKSAmJiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHZhbGlkYXRvclR5cGVzLmVtYWlsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRlRW1haWwsIHZhbGlkYXRpb25FcnJvcnMsIHZhbGlkYXRvci5tZXNzYWdlKSAmJiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHZhbGlkYXRvclR5cGVzLmN1c3RvbTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0b3IudmFsaWRhdGVGdW5jdGlvbiwgdmFsaWRhdGlvbkVycm9ycywgdmFsaWRhdG9yLm1lc3NhZ2UpICYmIGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHsgaXNWYWxpZCwgdmFsaWRhdGlvbkVycm9ycyB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGVGdW5jdGlvbiwgdmFsaWRhdGlvbkVycm9ycywgbWVzc2FnZSkge1xyXG4gICAgdmFyIHZhbGlkID0gdmFsaWRhdGVGdW5jdGlvbih2YWx1ZSk7XHJcbiAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKG1lc3NhZ2UpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlUmVxdWlyZWQodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZS50b1N0cmluZygpID09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW1haWwodmFsdWUpIHtcclxuICAgIC8vVE9ET1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHZhbGlkYXRlTW9kZWwgfTsiLCLvu79pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuY2xhc3MgQWpheCB7XHJcbiAgICBzdGF0aWMgZXhlY3V0ZVJlcXVlc3QobWV0aG9kLCB1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3NbbWV0aG9kXSh1cmwsIGRhdGEpXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBBamF4LmV4ZWN1dGVSZXF1ZXN0KCdnZXQnLCB1cmwpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ3Bvc3QnLCB1cmwsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHB1dCh1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gQWpheC5leGVjdXRlUmVxdWVzdCgncHV0JywgdXJsLCBkYXRhKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGUodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIEFqYXguZXhlY3V0ZVJlcXVlc3QoJ2RlbGV0ZScsIHVybCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFqYXg7Iiwi77u/aW1wb3J0IHVpQWN0aW9ucyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9BY3Rpb25zL1VJJztcclxuaW1wb3J0IHsgYWN0aW9uVHlwZXMgfSBmcm9tICcuLy4uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBBamF4IGZyb20gJy4vLi4vLi4vLi4vSW5mcmFzdHJ1Y3R1cmUvQWpheCc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5pbXBvcnQgeyBza2lsbFJvdXRlcyB9IGZyb20gJy4vLi4vUm91dGVzJztcclxuXHJcbmZ1bmN0aW9uIGdldFNraWxscygpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmdldChza2lsbFJvdXRlcy5nZXRBbGxVcmwoKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRTa2lsbHNTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldFNraWxsc1N1Y2Nlc3MoZGF0YSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5HRVRfU0tJTExTX1NVQ0NFU1MsXHJcbiAgICAgICAgc2tpbGxzTGlzdDogU2tpbGxNb2RlbC50cmFuc2Zvcm1MaXN0KGRhdGEpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIG9wZW5Ta2lsbERldGFpbHNQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5FRElUX1NLSUxMLFxyXG4gICAgICAgIHNlbGVjdGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVTa2lsbChza2lsbCkge1xyXG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuc2hvd0xvYWRpbmcoKSk7XHJcbiAgICAgICAgbGV0IGhhc0lkID0gc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXSA+IDA7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IGhhc0lkID8gJ3B1dCcgOiAncG9zdCc7XHJcbiAgICAgICAgbGV0IHVybCA9IGhhc0lkID8gc2tpbGxSb3V0ZXMudXBkYXRlVXJsKHNraWxsKSA6IHNraWxsUm91dGVzLmNyZWF0ZVVybCgpO1xyXG4gICAgICAgIHJldHVybiBBamF4W21ldGhvZF0odXJsLCBza2lsbClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh1aUFjdGlvbnMuaGlkZUxvYWRpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChzYXZlU2tpbGxTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlU2tpbGxTdWNjZXNzKHNraWxsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLlNBVkVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBzYXZlZFNraWxsOiBuZXcgU2tpbGxNb2RlbChza2lsbClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX0NBTkNFTFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2tpbGxEZWxldGVQb3B1cChza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTEwsXHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2tpbGxcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlU2tpbGwoc2tpbGwpIHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2godWlBY3Rpb25zLnNob3dMb2FkaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBBamF4LmRlbGV0ZShza2lsbFJvdXRlcy5kZWxldGVVcmwoc2tpbGwpKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHVpQWN0aW9ucy5oaWRlTG9hZGluZygpKTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsU3VjY2Vzcyhza2lsbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfU1VDQ0VTUyxcclxuICAgICAgICBkZWxldGVkU2tpbGw6IHNraWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNraWxsQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5ERUxFVEVfU0tJTExfQ0FOQ0VMXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGdldFNraWxscywgb3BlblNraWxsRGV0YWlsc1BvcHVwLCBzYXZlU2tpbGwsIHNhdmVTa2lsbENhbmNlbCwgb3BlblNraWxsRGVsZXRlUG9wdXAsIGRlbGV0ZVNraWxsLCBkZWxldGVTa2lsbENhbmNlbCB9Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgZGVlcENvbXBhcmUgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wYXJlVXRpbHMnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvQnV0dG9uJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2cnO1xyXG5pbXBvcnQgTW9kYWxEaWFsb2dDb21wb25lbnRzIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxEaWFsb2dDb21wb25lbnRzJztcclxuaW1wb3J0IHsgZGVsZXRlU2tpbGwsIGRlbGV0ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBEZWxldGVTa2lsbERpYWxvZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uRGVsZXRlID0gdGhpcy5vbkRlbGV0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVlcENvbXBhcmUobmV4dFByb3BzLnNlbGVjdGVkU2tpbGwsIHRoaXMucHJvcHMuc2VsZWN0ZWRTa2lsbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNraWxsOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRlbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZVNraWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkpKTtcclxuICAgIH1cclxuICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZGVsZXRlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxEaWFsb2c+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICBEZWxldGUgU2tpbGxcclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdpc2ggdG8gZGVsZXRlIHRoaXMgc2tpbGw/XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkRGVsZXRlU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9EZWxldGVTa2lsbERpYWxvZy5wcm9wVHlwZXMgPSB7XHJcbi8vICAgIHNlbGVjdGVkU2tpbGw6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNraWxsTW9kZWwpXHJcbi8vfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKERlbGV0ZVNraWxsRGlhbG9nKSIsIu+7v2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IGRlZXBDb21wYXJlIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcGFyZVV0aWxzJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL0lucHV0L0J1dHRvbic7XHJcbmltcG9ydCBUZXh0Qm94IGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL0NvbXBvbmVudHMvSW5wdXQvVGV4dEJveCc7XHJcbmltcG9ydCBNb2RhbERpYWxvZyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nJztcclxuaW1wb3J0IE1vZGFsRGlhbG9nQ29tcG9uZW50cyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nQ29tcG9uZW50cyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlTW9kZWwgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9WYWxpZGF0aW9uVXRpbHMnO1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Ob3RpZmljYXRpb25VdGlscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnXHJcbmltcG9ydCB7IHNhdmVTa2lsbCwgc2F2ZVNraWxsQ2FuY2VsIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcblxyXG5jbGFzcyBFZGl0U2tpbGxEaWFsb2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vblNhdmUgPSB0aGlzLm9uU2F2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZWVwQ29tcGFyZShuZXh0UHJvcHMuc2VsZWN0ZWRTa2lsbCwgdGhpcy5wcm9wcy5zZWxlY3RlZFNraWxsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2tpbGw6IE9iamVjdC5hc3NpZ24oe30sIG5leHRQcm9wcy5zZWxlY3RlZFNraWxsKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2F2ZSgpIHtcclxuICAgICAgICB2YXIgbW9kZWxTdGF0ZSA9IHZhbGlkYXRlTW9kZWwodGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsLCBTa2lsbE1vZGVsLmZpZWxkcyk7XHJcbiAgICAgICAgaWYgKG1vZGVsU3RhdGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHNhdmVTa2lsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9mb3IgKHZhciBtZXNzYWdlIG9mIG1vZGVsU3RhdGUudmFsaWRhdGlvbkVycm9ycykge1xyXG4gICAgICAgICAgICAvLyAgICBOb3RpZmljYXRpb25zLnNob3dFcnJvcignRXJyb3InLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuc2hvd0Vycm9yKCdFcnJvcicsIG1vZGVsU3RhdGUudmFsaWRhdGlvbkVycm9ycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25DYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChzYXZlU2tpbGxDYW5jZWwoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRTa2lsbCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCk7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbFtuYW1lXSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTa2lsbDogc2VsZWN0ZWRTa2lsbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRTa2lsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsRGlhbG9nPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdCBTa2lsbFxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuSGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPE1vZGFsRGlhbG9nQ29tcG9uZW50cy5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSduYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFNraWxsLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSdTaG9ydCBOYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdzaG9ydE5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkU2tpbGwuc2hvcnROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbERpYWxvZ0NvbXBvbmVudHMuQm9keT5cclxuICAgICAgICAgICAgICAgIDxNb2RhbERpYWxvZ0NvbXBvbmVudHMuRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblNhdmV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTYXZlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvTW9kYWxEaWFsb2dDb21wb25lbnRzLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbERpYWxvZz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTa2lsbDogc3RhdGUuc2tpbGxzLnNlbGVjdGVkU2tpbGxcclxuICAgIH07XHJcbn1cclxuLy9FZGl0U2tpbGxEaWFsb2cucHJvcFR5cGVzID0ge1xyXG4vLyAgICBzZWxlY3RlZFNraWxsOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTa2lsbE1vZGVsKVxyXG4vL31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShFZGl0U2tpbGxEaWFsb2cpIiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IEdyaWQgZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQ29tcG9uZW50cy9HcmlkL0dyaWQnO1xyXG5pbXBvcnQgeyBncmlkQ29sdW1ucyB9IGZyb20gJy4vLi4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ2V0U2tpbGxzLCBvcGVuU2tpbGxEZXRhaWxzUG9wdXAsIG9wZW5Ta2lsbERlbGV0ZVBvcHVwIH0gZnJvbSAnLi8uLi9BY3Rpb25zL1NraWxscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5cclxuY2xhc3MgU2tpbGxzR3JpZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGdldFNraWxscygpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JpZE9wdGlvbnMoKSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb25FZGl0QnV0dG9uQ2xpY2soaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZXRhaWxzUG9wdXAoaXRlbSkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQWRkQnV0dG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZXRhaWxzUG9wdXAobmV3IFNraWxsTW9kZWwoKSkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2soaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcy5kaXNwYXRjaChvcGVuU2tpbGxEZWxldGVQb3B1cChpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHcmlkXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cclxuICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuc2tpbGxzfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5ncmlkT3B0aW9uc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5Ta2lsbHNHcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIHNraWxsczogUHJvcFR5cGVzLmFycmF5T2YoXHJcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoU2tpbGxNb2RlbClcclxuICAgICksXHJcbiAgICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2tpbGxzOiBzdGF0ZS5za2lsbHMuc2tpbGxzTGlzdFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFNraWxsc0dyaWQpOyIsIu+7v2NvbnN0IGFjdGlvblR5cGVzID0ge1xyXG4gICAgR0VUX1NLSUxMUzogJ0dFVF9TS0lMTFMnLFxyXG4gICAgR0VUX1NLSUxMU19TVUNDRVNTOiAnR0VUX1NLSUxMU19TVUNDRVNTJyxcclxuICAgIENSRUFURV9ORVdfU0tJTEw6ICdDUkVBVEVfTkVXX1NLSUxMJyxcclxuICAgIEVESVRfU0tJTEw6J0VESVRfU0tJTEwnLFxyXG4gICAgU0FWRV9TS0lMTDogJ1NBVkVfU0tJTEwnLFxyXG4gICAgU0FWRV9TS0lMTF9DQU5DRUw6ICdTQVZFX1NLSUxMX0NBTkNFTCcsXHJcbiAgICBTQVZFX1NLSUxMX1NVQ0NFU1M6ICdTQVZFX1NLSUxMX1NVQ0NFU1MnLFxyXG4gICAgREVMRVRFX1NLSUxMOiAnREVMRVRFX1NLSUxMJyxcclxuICAgIERFTEVURV9TS0lMTF9DQU5DRUw6ICdERUxFVEVfU0tJTExfQ0FOQ0VMJyxcclxuICAgIERFTEVURV9TS0lMTF9TVUNDRVNTOiAnREVMRVRFX1NLSUxMX1NVQ0NFU1MnXHJcbn07XHJcblxyXG5jb25zdCBncmlkQ29sdW1ucyA9IFtcclxuICAgIHsgdGl0bGU6ICdOYW1lJywgZmllbGQ6ICduYW1lJyB9LFxyXG4gICAgeyB0aXRsZTogJ1Nob3J0IG5hbWUnLCBmaWVsZDogJ3Nob3J0TmFtZScgfSxcclxuICAgIHsgdGl0bGU6ICdDYXRlZ29yeScsIGZpZWxkOiAnY2F0ZWdvcnknIH1cclxuXTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBhY3Rpb25UeXBlcyxcclxuICAgIGdyaWRDb2x1bW5zXHJcbn0iLCLvu79pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcclxuaW1wb3J0IHsgZmllbGRUeXBlcywgdmFsaWRhdG9yVHlwZXMgfSBmcm9tICcuLy4uLy4uLy4uL0NvbW1vbi9Db25zdGFudHMnO1xyXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vLi4vLi4vLi4vQ29tbW9uL01vZGVscy9CYXNlTW9kZWwnO1xyXG5cclxuY2xhc3MgU2tpbGxNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihza2lsbCkge1xyXG4gICAgICAgIHN1cGVyKHNraWxsLCBTa2lsbE1vZGVsLmZpZWxkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBmaWVsZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuaW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFsaWRhdG9yVHlwZXMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdOYW1lIGlzIHJlcXVpcmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2hvcnROYW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHZhbGlkYXRvclR5cGVzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU2hvcnQgbmFtZSBpcyByZXF1aXJlZCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvcmVDb2xvcjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmllbGRUeXBlcy5jb2xvclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmllbGRUeXBlcy5zdHJpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmJvb2xcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFsaWRhdG9yVHlwZXMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbWFpbCBpcyByZXF1aXJlZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFsaWRhdG9yVHlwZXMuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbWFpbCBpcyBpbiBpbmNvcnJlY3QgZm9ybWF0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmRhdGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLnRpbWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVuZ3RoOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmludFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwZXJjZW50YWdlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWVsZFR5cGVzLmRvdWJsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvblR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpZWxkVHlwZXMuaW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBJZGVudGlmaWVyKCkge1xyXG4gICAgICAgIHJldHVybiAnaWQnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTGlzdChza2lsbHMpIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtTGlzdChza2lsbHMsIFNraWxsTW9kZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTa2lsbE1vZGVsOyIsIu+7v2ltcG9ydCB7IGFjdGlvblR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcclxuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XHJcbmltcG9ydCB7IGFkZFJlcGxhY2VJdGVtLCByZW1vdmVJdGVtIH0gZnJvbSAnLi8uLi8uLi8uLi9Db21tb24vQXJyYXlVdGlscyc7XHJcbmltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vLi4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgc2tpbGxzTGlzdDogW10sXHJcbiAgICBzZWxlY3RlZFNraWxsOiBudWxsLFxyXG4gICAgc2VsZWN0ZWREZWxldGVTa2lsbDogbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBza2lsbHNSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkdFVF9TS0lMTFNfU1VDQ0VTUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNraWxsc0xpc3Q6IGFjdGlvbi5za2lsbHNMaXN0IH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuQ1JFQVRFX05FV19TS0lMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkU2tpbGw6IHt9IH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuRURJVF9TS0lMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkU2tpbGw6IGFjdGlvbi5zZWxlY3RlZFNraWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWREZWxldGVTa2lsbDogYWN0aW9uLnNlbGVjdGVkU2tpbGwgfSk7XHJcbiAgICAgICAgY2FzZSBhY3Rpb25UeXBlcy5TQVZFX1NLSUxMX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBza2lsbHNMaXN0OiBhZGRSZXBsYWNlSXRlbShzdGF0ZS5za2lsbHNMaXN0LCBhY3Rpb24uc2F2ZWRTa2lsbCwgU2tpbGxNb2RlbC5JZGVudGlmaWVyKSwgc2VsZWN0ZWRTa2lsbDogbnVsbCB9KTtcclxuICAgICAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9TS0lMTF9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2tpbGxzTGlzdDogcmVtb3ZlSXRlbShzdGF0ZS5za2lsbHNMaXN0LCBhY3Rpb24uZGVsZXRlZFNraWxsLCBTa2lsbE1vZGVsLklkZW50aWZpZXIpLCBzZWxlY3RlZERlbGV0ZVNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuU0FWRV9TS0lMTF9DQU5DRUw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWxlY3RlZFNraWxsOiBudWxsIH0pO1xyXG4gICAgICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NLSUxMX0NBTkNFTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkRGVsZXRlU2tpbGw6IG51bGwgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBza2lsbHNSZWR1Y2VyOyIsIu+7v2ltcG9ydCBTa2lsbE1vZGVsIGZyb20gJy4vTW9kZWxzL1NraWxsTW9kZWwnO1xyXG5jb25zdCBza2lsbFJvdXRlcyA9IHtcclxuICAgIGdldEFsbFVybCgpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMnO1xyXG4gICAgfSxcclxuICAgIGdldFNpbmdsZVVybChza2lsbCkge1xyXG4gICAgICAgIHJldHVybiAnL2FwaS8nICsgJ3NraWxscy8nICsgc2tpbGxbU2tpbGxNb2RlbC5JZGVudGlmaWVyXTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzJztcclxuICAgIH0sXHJcbiAgICB1cGRhdGVVcmwoc2tpbGwpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvJyArICdza2lsbHMvJyArIHNraWxsW1NraWxsTW9kZWwuSWRlbnRpZmllcl07XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVXJsKHNraWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpLycgKyAnc2tpbGxzLycgKyBza2lsbFtTa2lsbE1vZGVsLklkZW50aWZpZXJdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBza2lsbFJvdXRlcyB9OyIsIu+7v2ltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCBza2lsbHMgZnJvbSAnLi9SZWR1Y2Vycy9Ta2lsbHNSZWR1Y2VyJ1xyXG5pbXBvcnQgdWkgZnJvbSAnLi8uLi8uLi9Db21tb24vUmVkdWNlcnMvVUlSZWR1Y2VyJztcclxuXHJcbmNvbnN0IGFwcFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgc2tpbGxzLFxyXG4gICAgdWlcclxufSk7XHJcbmNvbnN0IHJvb3RSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgIHJldHVybiBhcHBSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG59O1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcclxuICAgIHJvb3RSZWR1Y2VyLFxyXG4gICAgY29tcG9zZShcclxuICAgICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmtNaWRkbGV3YXJlKVxyXG4gICAgKVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7Iiwi77u/aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvc3RvcmUnO1xyXG5pbXBvcnQgUGFnZUxheW91dCBmcm9tICcuL0NvbW1vbi9Db21wb25lbnRzL0xheW91dC9QYWdlbGF5b3V0J1xyXG5pbXBvcnQgTG9hZGluZ0JhciBmcm9tICcuL0NvbW1vbi9Db21wb25lbnRzL0xvYWRpbmcvTG9hZGluZ0Jhcic7XHJcbmltcG9ydCBTa2lsbHNHcmlkIGZyb20gJy4vUGFnZXMvU2tpbGxzL0NvbXBvbmVudHMvU2tpbGxzR3JpZCc7XHJcbmltcG9ydCBFZGl0U2tpbGxEaWFsb2cgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9FZGl0U2tpbGxEaWFsb2cnO1xyXG5pbXBvcnQgRGVsZXRlU2tpbGxEaWFsb2cgZnJvbSAnLi9QYWdlcy9Ta2lsbHMvQ29tcG9uZW50cy9EZWxldGVTa2lsbERpYWxvZyc7XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIDxMb2FkaW5nQmFyIC8+XHJcbiAgICAgICAgICAgIDxQYWdlTGF5b3V0PlxyXG4gICAgICAgICAgICAgICAgPFNraWxsc0dyaWQgLz5cclxuICAgICAgICAgICAgPC9QYWdlTGF5b3V0PlxyXG4gICAgICAgICAgICA8RWRpdFNraWxsRGlhbG9nIC8+XHJcbiAgICAgICAgICAgIDxEZWxldGVTa2lsbERpYWxvZyAvPlxyXG4gICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2lsbHNSb290RWxlbWVudCcpXHJcbik7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBjcmVhdGVUaHVua01pZGRsZXdhcmUoZXh0cmFBcmd1bWVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlLCBleHRyYUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciB0aHVuayA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZSgpO1xudGh1bmsud2l0aEV4dHJhQXJndW1lbnQgPSBjcmVhdGVUaHVua01pZGRsZXdhcmU7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRodW5rOyJdfQ==
