!function(n){var i={};function s(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=n,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s="./src/main.ts")}({"./src/dropdown.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dropdown\", function() { return Dropdown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DropdownV4\", function() { return DropdownV4; });\n/*\n *\tDropdown class. Manages the dropdown drawing\n */\nvar Dropdown = /** @class */ (function () {\n    function Dropdown(e, formatItemCbk, autoSelect, noResultsText) {\n        this.initialized = false;\n        this.shown = false;\n        this.items = [];\n        this.ddMouseover = false;\n        this._$el = e;\n        this.formatItem = formatItemCbk;\n        this.autoSelect = autoSelect;\n        this.noResultsText = noResultsText;\n        // initialize it in lazy mode to deal with glitches like modals\n        // this.init();\n    }\n    Dropdown.prototype.init = function () {\n        var _this = this;\n        // Initialize dropdown\n        var pos = $.extend({}, this._$el.position(), {\n            height: this._$el[0].offsetHeight\n        });\n        // create element\n        this._dd = $('<ul />');\n        // add our class and basic dropdown-menu class\n        this._dd.addClass('bootstrap-autocomplete dropdown-menu');\n        this._dd.insertAfter(this._$el);\n        this._dd.css({ top: pos.top + this._$el.outerHeight(), left: pos.left, width: this._$el.outerWidth() });\n        // click event on items\n        this._dd.on('click', 'li', function (evt) {\n            // console.log('clicked', evt.currentTarget);\n            //console.log($(evt.currentTarget));\n            var item = $(evt.currentTarget).data('item');\n            _this.itemSelectedLaunchEvent(item);\n        });\n        this._dd.on('keyup', function (evt) {\n            if (_this.shown) {\n                switch (evt.which) {\n                    case 27:\n                        // ESC\n                        _this.hide();\n                        _this._$el.focus();\n                        break;\n                }\n                return false;\n            }\n        });\n        this._dd.on('mouseenter', function (evt) {\n            _this.ddMouseover = true;\n        });\n        this._dd.on('mouseleave', function (evt) {\n            _this.ddMouseover = false;\n        });\n        this._dd.on('mouseenter', 'li', function (evt) {\n            if (_this.haveResults) {\n                $(evt.currentTarget).closest('ul').find('li.active').removeClass('active');\n                $(evt.currentTarget).addClass('active');\n                _this.mouseover = true;\n            }\n        });\n        this._dd.on('mouseleave', 'li', function (evt) {\n            _this.mouseover = false;\n        });\n        this.initialized = true;\n    };\n    Dropdown.prototype.checkInitialized = function () {\n        // Lazy init\n        if (!this.initialized) {\n            // if not already initialized\n            this.init();\n        }\n    };\n    Object.defineProperty(Dropdown.prototype, \"isMouseOver\", {\n        get: function () {\n            return this.mouseover;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Dropdown.prototype, \"isDdMouseOver\", {\n        get: function () {\n            return this.ddMouseover;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Dropdown.prototype, \"haveResults\", {\n        get: function () {\n            return (this.items.length > 0);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Dropdown.prototype.focusNextItem = function (reversed) {\n        if (this.haveResults) {\n            // get selected\n            var currElem = this._dd.find('li.active');\n            var nextElem = reversed ? currElem.prev() : currElem.next();\n            if (nextElem.length == 0) {\n                // first \n                nextElem = reversed ? this._dd.find('li').last() : this._dd.find('li').first();\n            }\n            currElem.removeClass('active');\n            nextElem.addClass('active');\n        }\n    };\n    Dropdown.prototype.focusPreviousItem = function () {\n        this.focusNextItem(true);\n    };\n    Dropdown.prototype.selectFocusItem = function () {\n        this._dd.find('li.active').trigger('click');\n    };\n    Object.defineProperty(Dropdown.prototype, \"isItemFocused\", {\n        get: function () {\n            if (this._dd.find('li.active').length > 0) {\n                return true;\n            }\n            return false;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Dropdown.prototype.show = function () {\n        if (!this.shown) {\n            this._dd.dropdown().show();\n            this.shown = true;\n        }\n    };\n    Dropdown.prototype.isShown = function () {\n        return this.shown;\n    };\n    Dropdown.prototype.hide = function () {\n        if (this.shown) {\n            this._dd.dropdown().hide();\n            this.shown = false;\n        }\n    };\n    Dropdown.prototype.updateItems = function (items, searchText) {\n        // console.log('updateItems', items);\n        this.items = items;\n        this.searchText = searchText;\n        this.refreshItemList();\n    };\n    Dropdown.prototype.showMatchedText = function (text, qry) {\n        var startIndex = text.toLowerCase().indexOf(qry.toLowerCase());\n        if (startIndex > -1) {\n            var endIndex = startIndex + qry.length;\n            return text.slice(0, startIndex) + '<b>'\n                + text.slice(startIndex, endIndex) + '</b>'\n                + text.slice(endIndex);\n        }\n        return text;\n    };\n    Dropdown.prototype.refreshItemList = function () {\n        var _this = this;\n        this.checkInitialized();\n        this._dd.empty();\n        var liList = [];\n        if (this.items.length > 0) {\n            this.items.forEach(function (item) {\n                var itemFormatted = _this.formatItem(item);\n                if (typeof itemFormatted === 'string') {\n                    itemFormatted = { text: itemFormatted };\n                }\n                var itemText;\n                var itemHtml;\n                itemText = _this.showMatchedText(itemFormatted.text, _this.searchText);\n                if (itemFormatted.html !== undefined) {\n                    itemHtml = itemFormatted.html;\n                }\n                else {\n                    itemHtml = itemText;\n                }\n                var disabledItem = itemFormatted.disabled;\n                var li = $('<li >');\n                li.append($('<a>').attr('href', '#!').html(itemHtml))\n                    .data('item', item);\n                if (disabledItem) {\n                    li.addClass('disabled');\n                }\n                liList.push(li);\n            });\n        }\n        else {\n            // No results\n            var li = $('<li >');\n            li.append($('<a>').attr('href', '#!').html(this.noResultsText))\n                .addClass('disabled');\n            liList.push(li);\n        }\n        this._dd.append(liList);\n    };\n    Dropdown.prototype.itemSelectedLaunchEvent = function (item) {\n        // launch selected event\n        // console.log('itemSelectedLaunchEvent', item);\n        this._$el.trigger('autocomplete.select', item);\n    };\n    return Dropdown;\n}());\n\nvar DropdownV4 = /** @class */ (function () {\n    function DropdownV4(e, formatItemCbk, autoSelect, noResultsText) {\n        this.initialized = false;\n        this.shown = false;\n        this.items = [];\n        this.ddMouseover = false;\n        this._$el = e;\n        this.formatItem = formatItemCbk;\n        this.autoSelect = autoSelect;\n        this.noResultsText = noResultsText;\n        // initialize it in lazy mode to deal with glitches like modals\n        // this.init();\n    }\n    DropdownV4.prototype.getElPos = function () {\n        var pos = $.extend({}, this._$el.position(), {\n            height: this._$el[0].offsetHeight\n        });\n        return pos;\n    };\n    DropdownV4.prototype.init = function () {\n        var _this = this;\n        // console.log('UIUIUIUIUIUIUII');\n        // Initialize dropdown\n        var pos = this.getElPos();\n        // create element\n        this._dd = $('<div />');\n        // add our class and basic dropdown-menu class\n        this._dd.addClass('bootstrap-autocomplete dropdown-menu');\n        this._dd.insertAfter(this._$el);\n        this._dd.css({ top: pos.top + this._$el.outerHeight(), left: pos.left, width: this._$el.outerWidth() });\n        // click event on items\n        this._dd.on('click', '.dropdown-item', function (evt) {\n            // console.log('clicked', evt.currentTarget);\n            // console.log($(evt.currentTarget));\n            var item = $(evt.currentTarget).data('item');\n            _this.itemSelectedLaunchEvent(item);\n        });\n        this._dd.on('keyup', function (evt) {\n            if (_this.shown) {\n                switch (evt.which) {\n                    case 27:\n                        // ESC\n                        _this.hide();\n                        _this._$el.focus();\n                        break;\n                }\n                return false;\n            }\n        });\n        this._dd.on('mouseenter', function (evt) {\n            _this.ddMouseover = true;\n        });\n        this._dd.on('mouseleave', function (evt) {\n            _this.ddMouseover = false;\n        });\n        this._dd.on('mouseenter', '.dropdown-item', function (evt) {\n            if (_this.haveResults) {\n                $(evt.currentTarget).closest('div').find('.dropdown-item.active').removeClass('active');\n                $(evt.currentTarget).addClass('active');\n                _this.mouseover = true;\n            }\n        });\n        this._dd.on('mouseleave', '.dropdown-item', function (evt) {\n            _this.mouseover = false;\n        });\n        this.initialized = true;\n    };\n    DropdownV4.prototype.checkInitialized = function () {\n        // Lazy init\n        if (!this.initialized) {\n            // if not already initialized\n            this.init();\n        }\n    };\n    Object.defineProperty(DropdownV4.prototype, \"isMouseOver\", {\n        get: function () {\n            return this.mouseover;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(DropdownV4.prototype, \"isDdMouseOver\", {\n        get: function () {\n            return this.ddMouseover;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(DropdownV4.prototype, \"haveResults\", {\n        get: function () {\n            return (this.items.length > 0);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    DropdownV4.prototype.focusNextItem = function (reversed) {\n        if (this.haveResults) {\n            // get selected\n            var currElem = this._dd.find('.dropdown-item.active');\n            var nextElem = reversed ? currElem.prev() : currElem.next();\n            if (nextElem.length == 0) {\n                // first \n                nextElem = reversed ? this._dd.find('.dropdown-item').last() : this._dd.find('.dropdown-item').first();\n            }\n            currElem.removeClass('active');\n            nextElem.addClass('active');\n        }\n    };\n    DropdownV4.prototype.focusPreviousItem = function () {\n        this.focusNextItem(true);\n    };\n    DropdownV4.prototype.selectFocusItem = function () {\n        this._dd.find('.dropdown-item.active').trigger('click');\n    };\n    Object.defineProperty(DropdownV4.prototype, \"isItemFocused\", {\n        get: function () {\n            if (this._dd && (this._dd.find('.dropdown-item.active').length > 0)) {\n                return true;\n            }\n            return false;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    DropdownV4.prototype.show = function () {\n        if (!this.shown) {\n            var pos = this.getElPos();\n            // this._dd.css({ top: pos.top + this._$el.outerHeight(), left: pos.left, width: this._$el.outerWidth() });\n            this._dd.addClass('show');\n            this.shown = true;\n        }\n    };\n    DropdownV4.prototype.isShown = function () {\n        return this.shown;\n    };\n    DropdownV4.prototype.hide = function () {\n        if (this.shown) {\n            this._dd.removeClass('show');\n            this.shown = false;\n        }\n    };\n    DropdownV4.prototype.updateItems = function (items, searchText) {\n        // console.log('updateItems', items);\n        this.items = items;\n        this.searchText = searchText;\n        this.refreshItemList();\n    };\n    DropdownV4.prototype.showMatchedText = function (text, qry) {\n        var startIndex = text.toLowerCase().indexOf(qry.toLowerCase());\n        if (startIndex > -1) {\n            var endIndex = startIndex + qry.length;\n            return text.slice(0, startIndex) + '<b>'\n                + text.slice(startIndex, endIndex) + '</b>'\n                + text.slice(endIndex);\n        }\n        return text;\n    };\n    DropdownV4.prototype.refreshItemList = function () {\n        var _this = this;\n        this.checkInitialized();\n        this._dd.empty();\n        var liList = [];\n        if (this.items.length > 0) {\n            this.items.forEach(function (item) {\n                var itemFormatted = _this.formatItem(item);\n                if (typeof itemFormatted === 'string') {\n                    itemFormatted = { text: itemFormatted };\n                }\n                var itemText;\n                var itemHtml;\n                itemText = _this.showMatchedText(itemFormatted.text, _this.searchText);\n                if (itemFormatted.html !== undefined) {\n                    itemHtml = itemFormatted.html;\n                }\n                else {\n                    itemHtml = itemText;\n                }\n                var disabledItem = itemFormatted.disabled;\n                var li = $('<a >');\n                li.attr('href', '#!')\n                    .addClass('dropdown-item')\n                    .html(itemHtml)\n                    .data('item', item);\n                if (disabledItem) {\n                    li.addClass('disabled');\n                }\n                liList.push(li);\n            });\n        }\n        else {\n            // No results\n            var li = $('<a >');\n            li.attr('href', '#!')\n                .addClass('dropdown-item disabled')\n                .html(this.noResultsText);\n            liList.push(li);\n        }\n        this._dd.append(liList);\n    };\n    DropdownV4.prototype.itemSelectedLaunchEvent = function (item) {\n        // launch selected event\n        // console.log('itemSelectedLaunchEvent', item);\n        this._$el.trigger('autocomplete.select', item);\n    };\n    return DropdownV4;\n}());\n\n\n\n//# sourceURL=webpack:///./src/dropdown.ts?")},"./src/main.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolvers */ \"./src/resolvers.ts\");\n/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown */ \"./src/dropdown.ts\");\n/* =============================================================\n * bootstrap-autocomplete.js v2.0.0\n * https://github.com/xcash/bootstrap-autocomplete\n * =============================================================\n * Forked from bootstrap3-typeahead.js v3.1.0\n * https://github.com/bassjobsen/Bootstrap-3-Typeahead\n * =============================================================\n * Original written by @mdo and @fat\n * =============================================================\n * Copyright 2018 Paolo Casciello @xcash666 and contributors\n *\n * Licensed under the MIT License (the 'License');\n * you may not use this file except in compliance with the License.\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an 'AS IS' BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n * ============================================================ */\n\n\nvar AutoCompleteNS;\n(function (AutoCompleteNS) {\n    var AutoComplete = /** @class */ (function () {\n        function AutoComplete(element, options) {\n            this._selectedItem = null;\n            this._defaultValue = null;\n            this._defaultText = null;\n            this._isSelectElement = false;\n            this._settings = {\n                resolver: 'ajax',\n                resolverSettings: {},\n                minLength: 3,\n                valueKey: 'value',\n                formatResult: this.defaultFormatResult,\n                autoSelect: true,\n                noResultsText: 'No results',\n                events: {\n                    typed: null,\n                    searchPre: null,\n                    search: null,\n                    searchPost: null,\n                    select: null,\n                    focus: null,\n                }\n            };\n            this._el = element;\n            this._$el = $(this._el);\n            // element type\n            if (this._$el.is('select')) {\n                this._isSelectElement = true;\n            }\n            // inline data attributes\n            this.manageInlineDataAttributes();\n            // constructor options\n            if (typeof options === 'object') {\n                this._settings = $.extend(true, {}, this.getSettings(), options);\n            }\n            if (this._isSelectElement) {\n                this.convertSelectToText();\n            }\n            // console.log('initializing', this._settings);\n            this.init();\n        }\n        AutoComplete.prototype.manageInlineDataAttributes = function () {\n            // updates settings with data-* attributes\n            var s = this.getSettings();\n            if (this._$el.data('url')) {\n                s['resolverSettings'].url = this._$el.data('url');\n            }\n            if (this._$el.data('default-value')) {\n                this._defaultValue = this._$el.data('default-value');\n            }\n            if (this._$el.data('default-text')) {\n                this._defaultText = this._$el.data('default-text');\n            }\n            if (this._$el.data('noresults-text')) {\n                s['noResultsText'] = this._$el.data('noresults-text');\n            }\n        };\n        AutoComplete.prototype.getSettings = function () {\n            return this._settings;\n        };\n        AutoComplete.prototype.getBootstrapVersion = function () {\n            // @ts-ignore\n            var version_string = $.fn.button.Constructor.VERSION;\n            var version_array = version_string.split('.');\n            return version_array;\n        };\n        AutoComplete.prototype.convertSelectToText = function () {\n            // create hidden field\n            var hidField = $('<input>');\n            hidField.attr('type', 'hidden');\n            hidField.attr('name', this._$el.attr('name'));\n            if (this._defaultValue) {\n                hidField.val(this._defaultValue);\n            }\n            this._selectHiddenField = hidField;\n            hidField.insertAfter(this._$el);\n            // create search input element\n            var searchField = $('<input>');\n            // copy all attributes\n            searchField.attr('type', 'text');\n            searchField.attr('name', this._$el.attr('name') + '_text');\n            searchField.attr('id', this._$el.attr('id'));\n            searchField.attr('disabled', this._$el.attr('disabled'));\n            searchField.attr('placeholder', this._$el.attr('placeholder'));\n            searchField.attr('autocomplete', 'off');\n            searchField.addClass(this._$el.attr('class'));\n            if (this._defaultText) {\n                searchField.val(this._defaultText);\n            }\n            // attach class\n            searchField.data(AutoCompleteNS.AutoComplete.NAME, this);\n            // replace original with searchField\n            this._$el.replaceWith(searchField);\n            this._$el = searchField;\n            this._el = searchField.get(0);\n        };\n        AutoComplete.prototype.init = function () {\n            // bind default events\n            this.bindDefaultEventListeners();\n            // RESOLVER\n            if (this._settings.resolver === 'ajax') {\n                // configure default resolver\n                this.resolver = new _resolvers__WEBPACK_IMPORTED_MODULE_0__[\"AjaxResolver\"](this._settings.resolverSettings);\n            }\n            // Dropdown\n            if (this.getBootstrapVersion()[0] == 4) {\n                // v4\n                this._dd = new _dropdown__WEBPACK_IMPORTED_MODULE_1__[\"DropdownV4\"](this._$el, this._settings.formatResult, this._settings.autoSelect, this._settings.noResultsText);\n            }\n            else {\n                this._dd = new _dropdown__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"](this._$el, this._settings.formatResult, this._settings.autoSelect, this._settings.noResultsText);\n            }\n        };\n        AutoComplete.prototype.bindDefaultEventListeners = function () {\n            var _this = this;\n            this._$el.on('keydown', function (evt) {\n                // console.log('keydown', evt.which, evt);\n                switch (evt.which) {\n                    case 9: // TAB\n                        if (_this._settings.autoSelect) {\n                            // if autoSelect enabled selects on blur the currently selected item\n                            _this._dd.selectFocusItem();\n                        }\n                        break;\n                    case 13: // ENTER\n                        if (_this._dd.isItemFocused) {\n                            _this._dd.selectFocusItem();\n                        }\n                        else {\n                            if (_this._$el.val() !== '') {\n                                _this._$el.trigger('autocomplete.freevalue', _this._$el.val());\n                            }\n                        }\n                        _this._dd.hide();\n                        break;\n                }\n            });\n            this._$el.on('keyup', function (evt) {\n                // console.log('keyup', evt.which, evt);\n                // check key\n                switch (evt.which) {\n                    case 16: // shift\n                    case 17: // ctrl\n                    case 18: // alt\n                    case 39: // right\n                    case 37: // left \n                        break;\n                    case 40:\n                        // arrow DOWN\n                        _this._dd.focusNextItem();\n                        break;\n                    case 38: // up arrow\n                        _this._dd.focusPreviousItem();\n                        break;\n                    case 13:\n                        // ENTER\n                        _this._dd.hide();\n                        break;\n                    case 27:\n                        // ESC\n                        _this._dd.hide();\n                        break;\n                    default:\n                        var newValue = _this._$el.val();\n                        _this.handlerTyped(newValue);\n                }\n            });\n            this._$el.on('blur', function (evt) {\n                // console.log(evt);\n                if (!_this._dd.isMouseOver && _this._dd.isDdMouseOver && _this._dd.isShown()) {\n                    // Firefox Workaround\n                    setTimeout(function () { _this._$el.focus(); });\n                    // Other browsers\n                    _this._$el.focus();\n                }\n                else if (!_this._dd.isMouseOver) {\n                    if (_this._isSelectElement) {\n                        // if it's a select element you must\n                        if (_this._dd.isItemFocused) {\n                            _this._dd.selectFocusItem();\n                        }\n                        else if ((_this._selectedItem !== null) && (_this._$el.val() !== '')) {\n                            // reselect it\n                            _this._$el.trigger('autocomplete.select', _this._selectedItem);\n                        }\n                        else if ((_this._$el.val() !== '') && (_this._defaultValue !== null)) {\n                            // select Default\n                            _this._$el.val(_this._defaultText);\n                            _this._selectHiddenField.val(_this._defaultValue);\n                            _this._selectedItem = null;\n                        }\n                        else {\n                            // empty the values\n                            _this._$el.val('');\n                            _this._selectHiddenField.val('');\n                            _this._selectedItem = null;\n                        }\n                    }\n                    else {\n                        // It's a text element, we accept custom value.\n                        // Developers may subscribe to `autocomplete.freevalue` to get notified of this\n                        if ((_this._selectedItem === null) && (_this._$el.val() !== '')) {\n                            _this._$el.trigger('autocomplete.freevalue', _this._$el.val());\n                        }\n                    }\n                    _this._dd.hide();\n                }\n            });\n            // selected event\n            // @ts-ignore - Ignoring TS type checking\n            this._$el.on('autocomplete.select', function (evt, item) {\n                _this._selectedItem = item;\n                _this.itemSelectedDefaultHandler(item);\n            });\n        };\n        AutoComplete.prototype.handlerTyped = function (newValue) {\n            // field value changed\n            // custom handler may change newValue\n            if (this._settings.events.typed !== null) {\n                newValue = this._settings.events.typed(newValue);\n                if (!newValue)\n                    return;\n            }\n            // if value >= minLength, start autocomplete\n            if (newValue.length >= this._settings.minLength) {\n                this._searchText = newValue;\n                this.handlerPreSearch();\n            }\n            else {\n                this._dd.hide();\n            }\n        };\n        AutoComplete.prototype.handlerPreSearch = function () {\n            // do nothing, start search\n            // custom handler may change newValue\n            if (this._settings.events.searchPre !== null) {\n                var newValue = this._settings.events.searchPre(this._searchText);\n                if (!newValue)\n                    return;\n                this._searchText = newValue;\n            }\n            this.handlerDoSearch();\n        };\n        AutoComplete.prototype.handlerDoSearch = function () {\n            var _this = this;\n            // custom handler may change newValue\n            if (this._settings.events.search !== null) {\n                this._settings.events.search(this._searchText, function (results) {\n                    _this.postSearchCallback(results);\n                });\n            }\n            else {\n                // Default behaviour\n                // search using current resolver\n                if (this.resolver) {\n                    this.resolver.search(this._searchText, function (results) {\n                        _this.postSearchCallback(results);\n                    });\n                }\n            }\n        };\n        AutoComplete.prototype.postSearchCallback = function (results) {\n            // console.log('callback called', results);\n            // custom handler may change newValue\n            if (this._settings.events.searchPost) {\n                results = this._settings.events.searchPost(results);\n                if ((typeof results === 'boolean') && !results)\n                    return;\n            }\n            this.handlerStartShow(results);\n        };\n        AutoComplete.prototype.handlerStartShow = function (results) {\n            // console.log(\"defaultEventStartShow\", results);\n            // for every result, draw it\n            this._dd.updateItems(results, this._searchText);\n            this._dd.show();\n        };\n        AutoComplete.prototype.itemSelectedDefaultHandler = function (item) {\n            // console.log('itemSelectedDefaultHandler', item);\n            // default behaviour is set elment's .val()\n            var itemFormatted = this._settings.formatResult(item);\n            if (typeof itemFormatted === 'string') {\n                itemFormatted = { text: itemFormatted };\n            }\n            this._$el.val(itemFormatted.text);\n            // if the element is a select\n            if (this._isSelectElement) {\n                this._selectHiddenField.val(itemFormatted.value);\n            }\n            // save selected item\n            this._selectedItem = item;\n            // and hide\n            this._dd.hide();\n        };\n        AutoComplete.prototype.defaultFormatResult = function (item) {\n            if (typeof item === 'string') {\n                return { text: item };\n            }\n            else if (item.text) {\n                return item;\n            }\n            else {\n                // return a toString of the item as last resort\n                // console.error('No default formatter for item', item);\n                return { text: item.toString() };\n            }\n        };\n        AutoComplete.prototype.manageAPI = function (APICmd, params) {\n            // manages public API\n            if (APICmd === 'set') {\n                this.itemSelectedDefaultHandler(params);\n            }\n        };\n        AutoComplete.NAME = 'autoComplete';\n        return AutoComplete;\n    }());\n    AutoCompleteNS.AutoComplete = AutoComplete;\n})(AutoCompleteNS || (AutoCompleteNS = {}));\n(function ($, window, document) {\n    // @ts-ignore\n    $.fn[AutoCompleteNS.AutoComplete.NAME] = function (optionsOrAPI, optionalParams) {\n        return this.each(function () {\n            var pluginClass;\n            pluginClass = $(this).data(AutoCompleteNS.AutoComplete.NAME);\n            if (!pluginClass) {\n                pluginClass = new AutoCompleteNS.AutoComplete(this, optionsOrAPI);\n                $(this).data(AutoCompleteNS.AutoComplete.NAME, pluginClass);\n            }\n            pluginClass.manageAPI(optionsOrAPI, optionalParams);\n        });\n    };\n})(jQuery, window, document);\n\n\n//# sourceURL=webpack:///./src/main.ts?")},"./src/resolvers.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseResolver\", function() { return BaseResolver; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AjaxResolver\", function() { return AjaxResolver; });\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar BaseResolver = /** @class */ (function () {\n    function BaseResolver(options) {\n        this._settings = $.extend(true, {}, this.getDefaults(), options);\n    }\n    BaseResolver.prototype.getDefaults = function () {\n        return {};\n    };\n    BaseResolver.prototype.getResults = function (limit, start, end) {\n        return this.results;\n    };\n    BaseResolver.prototype.search = function (q, cbk) {\n        cbk(this.getResults());\n    };\n    return BaseResolver;\n}());\n\nvar AjaxResolver = /** @class */ (function (_super) {\n    __extends(AjaxResolver, _super);\n    function AjaxResolver(options) {\n        return _super.call(this, options) || this;\n        // console.log('resolver settings', this._settings);\n    }\n    AjaxResolver.prototype.getDefaults = function () {\n        return {\n            url: '',\n            method: 'get',\n            queryKey: 'q',\n            extraData: {},\n            timeout: undefined,\n        };\n    };\n    AjaxResolver.prototype.search = function (q, cbk) {\n        var _this = this;\n        if (this.jqXHR != null) {\n            this.jqXHR.abort();\n        }\n        var data = {};\n        data[this._settings.queryKey] = q;\n        $.extend(data, this._settings.extraData);\n        this.jqXHR = $.ajax(this._settings.url, {\n            method: this._settings.method,\n            data: data,\n            timeout: this._settings.timeout\n        });\n        this.jqXHR.done(function (result) {\n            cbk(result);\n        });\n        this.jqXHR.fail(function (err) {\n            // console.log(err);\n        });\n        this.jqXHR.always(function () {\n            _this.jqXHR = null;\n        });\n    };\n    return AjaxResolver;\n}(BaseResolver));\n\n\n\n//# sourceURL=webpack:///./src/resolvers.ts?")}});