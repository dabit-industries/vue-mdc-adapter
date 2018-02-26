/**
* @module vue-mdc-adapterselect 0.11.2
* @exports VueMDCSelect
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCSelect = factory());
}(this, (function () { 'use strict';

function autoInit(plugin) {
  // Auto-install
  var _Vue = null;
  if (typeof window !== 'undefined') {
    _Vue = window.Vue;
  } else if (typeof global !== 'undefined') {
    /*global global*/
    _Vue = global.Vue;
  }
  if (_Vue) {
    _Vue.use(plugin);
  }
}

function BasePlugin(components) {
  return {
    version: '0.11.2',
    install: function install(vm) {
      for (var key in components) {
        var component = components[key];
        vm.component(component.name, component);
      }
    },
    components: components
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* global CustomEvent */

function emitCustomEvent(el, evtType, evtData) {
  var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var evt = void 0;
  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, shouldBubble, false, evtData);
  }
  el.dispatchEvent(evt);
}

var DispatchFocusMixin = {
  data: function data() {
    return { hasFocus: false };
  },

  methods: {
    onMouseDown: function onMouseDown() {
      this._active = true;
    },
    onMouseUp: function onMouseUp() {
      this._active = false;
    },
    onFocusEvent: function onFocusEvent() {
      var _this = this;

      // dispatch async to let time to other focus event to propagate
      setTimeout(function () {
        return _this.dispatchFocusEvent();
      }, 0);
    },
    onBlurEvent: function onBlurEvent() {
      var _this2 = this;

      // dispatch async to let time to other focus event to propagate
      // also filtur blur if mousedown
      this._active || setTimeout(function () {
        return _this2.dispatchFocusEvent();
      }, 0);
    },
    dispatchFocusEvent: function dispatchFocusEvent() {
      var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
      if (hasFocus != this.hasFocus) {
        this.$emit(hasFocus ? 'focus' : 'blur');
        this.hasFocus = hasFocus;
      }
    }
  },
  mounted: function mounted() {
    this.$el.addEventListener('focusin', this.onFocusEvent);
    this.$el.addEventListener('focusout', this.onBlurEvent);
    this.$el.addEventListener('mousedown', this.onMouseDown);
    this.$el.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener('focusin', this.onFocusEvent);
    this.$el.removeEventListener('focusout', this.onBlurEvent);
    this.$el.removeEventListener('mousedown', this.onMouseDown);
    this.$el.removeEventListener('mouseup', this.onMouseUp);
  }
};

var MDCNativeSelect = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('select', { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], ref: "root", staticClass: "mdc-select mdc-native-select", attrs: { "disabled": _vm.disabled }, on: { "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;return val;
          });_vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }, _vm.onChange] } }, [_vm.label ? _c('option', { attrs: { "disabled": "disabled", "value": "" } }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-native-select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Array],
    disabled: Boolean,
    label: String
  },
  data: function data() {
    return {
      selected: this.value
    };
  },

  methods: {
    onChange: function onChange() {
      this.$emit('change', this.selected);
    }
  }
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get$$1() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get$$1() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get$$1() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get$$1() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  createClass(MDCFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);
  return MDCFoundation;
}();

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Menu. Provides an interface for managing
 * - classes
 * - dom
 * - focus
 * - position
 * - dimensions
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCMenuAdapter = function () {
  function MDCMenuAdapter() {
    classCallCheck(this, MDCMenuAdapter);
  }

  createClass(MDCMenuAdapter, [{
    key: "addClass",

    /** @param {string} className */
    value: function addClass(className) {}

    /** @param {string} className */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /**
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: "hasClass",
    value: function hasClass(className) {}

    /** @return {boolean} */

  }, {
    key: "hasNecessaryDom",
    value: function hasNecessaryDom() {}

    /**
     * @param {EventTarget} target
     * @param {string} attributeName
     * @return {string}
     */

  }, {
    key: "getAttributeForEventTarget",
    value: function getAttributeForEventTarget(target, attributeName) {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getInnerDimensions",
    value: function getInnerDimensions() {}

    /** @return {boolean} */

  }, {
    key: "hasAnchor",
    value: function hasAnchor() {}

    /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

  }, {
    key: "getAnchorDimensions",
    value: function getAnchorDimensions() {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getWindowDimensions",
    value: function getWindowDimensions() {}

    /** @return {number} */

  }, {
    key: "getNumberOfItems",
    value: function getNumberOfItems() {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(type, handler) {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(type, handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "registerBodyClickHandler",
    value: function registerBodyClickHandler(handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "deregisterBodyClickHandler",
    value: function deregisterBodyClickHandler(handler) {}

    /**
     * @param {EventTarget} target
     * @return {number}
     */

  }, {
    key: "getIndexForEventTarget",
    value: function getIndexForEventTarget(target) {}

    /** @param {{index: number}} evtData */

  }, {
    key: "notifySelected",
    value: function notifySelected(evtData) {}
  }, {
    key: "notifyCancel",
    value: function notifyCancel() {}
  }, {
    key: "saveFocus",
    value: function saveFocus() {}
  }, {
    key: "restoreFocus",
    value: function restoreFocus() {}

    /** @return {boolean} */

  }, {
    key: "isFocused",
    value: function isFocused() {}
  }, {
    key: "focus",
    value: function focus() {}

    /** @return {number} */

  }, {
    key: "getFocusedItemIndex",
    value: function getFocusedItemIndex() /* number */{}

    /** @param {number} index */

  }, {
    key: "focusItemAtIndex",
    value: function focusItemAtIndex(index) {}

    /** @return {boolean} */

  }, {
    key: "isRtl",
    value: function isRtl() {}

    /** @param {string} origin */

  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(origin) {}

    /** @param {{
    *   top: (string|undefined),
    *   right: (string|undefined),
    *   bottom: (string|undefined),
    *   left: (string|undefined)
    * }} position */

  }, {
    key: "setPosition",
    value: function setPosition(position) {}

    /** @param {string} height */

  }, {
    key: "setMaxHeight",
    value: function setMaxHeight(height) {}

    /**
     * @param {number} index
     * @param {string} attr
     * @param {string} value
     */

  }, {
    key: "setAttrForOptionAtIndex",
    value: function setAttrForOptionAtIndex(index, attr, value) {}

    /**
     * @param {number} index
     * @param {string} attr
     */

  }, {
    key: "rmAttrForOptionAtIndex",
    value: function rmAttrForOptionAtIndex(index, attr) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "addClassForOptionAtIndex",
    value: function addClassForOptionAtIndex(index, className) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "rmClassForOptionAtIndex",
    value: function rmClassForOptionAtIndex(index, className) {}
  }]);
  return MDCMenuAdapter;
}();

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-menu',
  OPEN: 'mdc-menu--open',
  ANIMATING_OPEN: 'mdc-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-menu--animating-closed',
  SELECTED_LIST_ITEM: 'mdc-list-item--selected'
};

/** @enum {string} */
var strings = {
  ITEMS_SELECTOR: '.mdc-menu__items',
  SELECTED_EVENT: 'MDCMenu:selected',
  CANCEL_EVENT: 'MDCMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled'
};

/** @enum {number} */
var numbers = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of menu open animation.
  TRANSITION_OPEN_DURATION: 120,
  // Total duration of menu close animation.
  TRANSITION_CLOSE_DURATION: 75,
  // Margin left to the edge of the viewport when menu is at maximum possible height.
  MARGIN_TO_EDGE: 32,
  // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
  ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
  // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
  OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
};

/**
 * Enum for bits in the {@see Corner) bitmap.
 * @enum {number}
 */
var CornerBit = {
  BOTTOM: 1,
  CENTER: 2,
  RIGHT: 4,
  FLIP_RTL: 8
};

/**
 * Enum for representing an element corner for positioning the menu.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 *
 * @enum {number}
 */
var Corner = {
  TOP_LEFT: 0,
  TOP_RIGHT: CornerBit.RIGHT,
  BOTTOM_LEFT: CornerBit.BOTTOM,
  BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
  TOP_START: CornerBit.FLIP_RTL,
  TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
  BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
  BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   top: number,
 *   right: number,
 *   bottom: number,
 *   left: number
 * }}
 */
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCFoundation<!MDCMenuAdapter>}
 */

var MDCMenuFoundation = function (_MDCFoundation) {
  inherits(MDCMenuFoundation, _MDCFoundation);
  createClass(MDCMenuFoundation, null, [{
    key: 'cssClasses',

    /** @return enum{cssClasses} */
    get: function get$$1() {
      return cssClasses;
    }

    /** @return enum{strings} */

  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
    }

    /** @return enum{numbers} */

  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }

    /** @return enum{number} */

  }, {
    key: 'Corner',
    get: function get$$1() {
      return Corner;
    }

    /**
     * {@see MDCMenuAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCMenuAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCMenuAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {
            return false;
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return false;
          },
          getAttributeForEventTarget: function getAttributeForEventTarget() {},
          getInnerDimensions: function getInnerDimensions() {
            return {};
          },
          hasAnchor: function hasAnchor() {
            return false;
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return {};
          },
          getWindowDimensions: function getWindowDimensions() {
            return {};
          },
          getNumberOfItems: function getNumberOfItems() {
            return 0;
          },
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          registerBodyClickHandler: function registerBodyClickHandler() {},
          deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
          getIndexForEventTarget: function getIndexForEventTarget() {
            return 0;
          },
          notifySelected: function notifySelected() {},
          notifyCancel: function notifyCancel() {},
          saveFocus: function saveFocus() {},
          restoreFocus: function restoreFocus() {},
          isFocused: function isFocused() {
            return false;
          },
          focus: function focus() {},
          getFocusedItemIndex: function getFocusedItemIndex() {
            return -1;
          },
          focusItemAtIndex: function focusItemAtIndex() {},
          isRtl: function isRtl() {
            return false;
          },
          setTransformOrigin: function setTransformOrigin() {},
          setPosition: function setPosition() {},
          setMaxHeight: function setMaxHeight() {},
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
          addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
        }
      );
    }

    /** @param {!MDCMenuAdapter} adapter */

  }]);

  function MDCMenuFoundation(adapter) {
    classCallCheck(this, MDCMenuFoundation);

    /** @private {function(!Event)} */
    var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

    _this.clickHandler_ = function (evt) {
      return _this.handlePossibleSelected_(evt);
    };
    /** @private {function(!Event)} */
    _this.keydownHandler_ = function (evt) {
      return _this.handleKeyboardDown_(evt);
    };
    /** @private {function(!Event)} */
    _this.keyupHandler_ = function (evt) {
      return _this.handleKeyboardUp_(evt);
    };
    /** @private {function(!Event)} */
    _this.documentClickHandler_ = function (evt) {
      return _this.handleDocumentClick_(evt);
    };
    /** @private {boolean} */
    _this.isOpen_ = false;
    /** @private {number} */
    _this.openAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.closeAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.selectedTriggerTimerId_ = 0;
    /** @private {number} */
    _this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */
    _this.dimensions_;
    /** @private {number} */
    _this.itemHeight_;
    /** @private {Corner} */
    _this.anchorCorner_ = Corner.TOP_START;
    /** @private {AnchorMargin} */
    _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
    /** @private {?AutoLayoutMeasurements} */
    _this.measures_ = null;
    /** @private {number} */
    _this.selectedIndex_ = -1;
    /** @private {boolean} */
    _this.rememberSelection_ = false;
    /** @private {boolean} */
    _this.quickOpen_ = false;

    // A keyup event on the menu needs to have a corresponding keydown
    // event on the menu. If the user opens the menu with a keydown event on a
    // button, the menu will only get the key up event causing buggy behavior with selected elements.
    /** @private {boolean} */
    _this.keyDownWithinMenu_ = false;
    return _this;
  }

  createClass(MDCMenuFoundation, [{
    key: 'init',
    value: function init() {
      var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
          ROOT = _MDCMenuFoundation$cs.ROOT,
          OPEN = _MDCMenuFoundation$cs.OPEN;


      if (!this.adapter_.hasClass(ROOT)) {
        throw new Error(ROOT + ' class required in root element.');
      }

      if (!this.adapter_.hasNecessaryDom()) {
        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
      }

      if (this.adapter_.hasClass(OPEN)) {
        this.isOpen_ = true;
      }

      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearTimeout(this.selectedTriggerTimerId_);
      clearTimeout(this.openAnimationEndTimerId_);
      clearTimeout(this.closeAnimationEndTimerId_);
      // Cancel any currently running animations.
      cancelAnimationFrame(this.animationRequestId_);
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
    }

    /**
     * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
     */

  }, {
    key: 'setAnchorCorner',
    value: function setAnchorCorner(corner) {
      this.anchorCorner_ = corner;
    }

    /**
     * @param {!AnchorMargin} margin 4-plet of margins from anchor.
     */

  }, {
    key: 'setAnchorMargin',
    value: function setAnchorMargin(margin) {
      this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
      this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
      this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
      this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
    }

    /** @param {boolean} rememberSelection */

  }, {
    key: 'setRememberSelection',
    value: function setRememberSelection(rememberSelection) {
      this.rememberSelection_ = rememberSelection;
      this.setSelectedIndex(-1);
    }

    /** @param {boolean} quickOpen */

  }, {
    key: 'setQuickOpen',
    value: function setQuickOpen(quickOpen) {
      this.quickOpen_ = quickOpen;
    }

    /**
     * @param {?number} focusIndex
     * @private
     */

  }, {
    key: 'focusOnOpen_',
    value: function focusOnOpen_(focusIndex) {
      if (focusIndex === null) {
        // If this instance of MDCMenu remembers selections, and the user has
        // made a selection, then focus the last selected item
        if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
          this.adapter_.focusItemAtIndex(this.selectedIndex_);
          return;
        }

        this.adapter_.focus();
        // If that doesn't work, focus first item instead.
        if (!this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        }
      } else {
        this.adapter_.focusItemAtIndex(focusIndex);
      }
    }

    /**
     * Handle clicks and cancel the menu if not a child list-item
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handleDocumentClick_',
    value: function handleDocumentClick_(evt) {
      var el = evt.target;

      while (el && el !== document.documentElement) {
        if (this.adapter_.getIndexForEventTarget(el) !== -1) {
          return;
        }
        el = el.parentNode;
      }

      this.adapter_.notifyCancel();
      this.close(evt);
    }
  }, {
    key: 'handleKeyboardDown_',


    /**
     * Handle keys that we want to repeat on hold (tab and arrows).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */
    value: function handleKeyboardDown_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key,
          shiftKey = evt.shiftKey;

      var isTab = key === 'Tab' || keyCode === 9;
      var isArrowUp = key === 'ArrowUp' || keyCode === 38;
      var isArrowDown = key === 'ArrowDown' || keyCode === 40;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEnter = key === 'Enter' || keyCode === 13;
      // The menu needs to know if the keydown event was triggered on the menu
      this.keyDownWithinMenu_ = isEnter || isSpace;

      var focusedItemIndex = this.adapter_.getFocusedItemIndex();
      var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

      if (shiftKey && isTab && focusedItemIndex === 0) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
        evt.preventDefault();
        return false;
      }

      if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
        this.adapter_.focusItemAtIndex(0);
        evt.preventDefault();
        return false;
      }

      // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
      if (isArrowUp || isArrowDown || isSpace) {
        evt.preventDefault();
      }

      if (isArrowUp) {
        if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(lastItemIndex);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
        }
      } else if (isArrowDown) {
        if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
        }
      }

      return true;
    }

    /**
     * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */

  }, {
    key: 'handleKeyboardUp_',
    value: function handleKeyboardUp_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key;

      var isEnter = key === 'Enter' || keyCode === 13;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEscape = key === 'Escape' || keyCode === 27;

      if (isEnter || isSpace) {
        // If the keydown event didn't occur on the menu, then it should
        // disregard the possible selected event.
        if (this.keyDownWithinMenu_) {
          this.handlePossibleSelected_(evt);
        }
        this.keyDownWithinMenu_ = false;
      }

      if (isEscape) {
        this.adapter_.notifyCancel();
        this.close();
      }

      return true;
    }

    /**
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handlePossibleSelected_',
    value: function handlePossibleSelected_(evt) {
      var _this2 = this;

      if (this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true') {
        return;
      }
      var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
      if (targetIndex < 0) {
        return;
      }
      // Debounce multiple selections
      if (this.selectedTriggerTimerId_) {
        return;
      }
      this.selectedTriggerTimerId_ = setTimeout(function () {
        _this2.selectedTriggerTimerId_ = 0;
        _this2.close();
        if (_this2.rememberSelection_) {
          _this2.setSelectedIndex(targetIndex);
        }
        _this2.adapter_.notifySelected({ index: targetIndex });
      }, numbers.SELECTED_TRIGGER_DELAY);
    }

    /**
     * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
     */

  }, {
    key: 'getAutoLayoutMeasurements_',
    value: function getAutoLayoutMeasurements_() {
      var anchorRect = this.adapter_.getAnchorDimensions();
      var viewport = this.adapter_.getWindowDimensions();

      return {
        viewport: viewport,
        viewportDistance: {
          top: anchorRect.top,
          right: viewport.width - anchorRect.right,
          left: anchorRect.left,
          bottom: viewport.height - anchorRect.bottom
        },
        anchorHeight: anchorRect.height,
        anchorWidth: anchorRect.width,
        menuHeight: this.dimensions_.height,
        menuWidth: this.dimensions_.width
      };
    }

    /**
     * Computes the corner of the anchor from which to animate and position the menu.
     * @return {Corner}
     * @private
     */

  }, {
    key: 'getOriginCorner_',
    value: function getOriginCorner_() {
      // Defaults: open from the top left.
      var corner = Corner.TOP_LEFT;

      var _measures_ = this.measures_,
          viewportDistance = _measures_.viewportDistance,
          anchorHeight = _measures_.anchorHeight,
          anchorWidth = _measures_.anchorWidth,
          menuHeight = _measures_.menuHeight,
          menuWidth = _measures_.menuWidth;

      var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
      var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
      var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

      var topOverflow = menuHeight - availableTop;
      var bottomOverflow = menuHeight - availableBottom;
      if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
        corner |= CornerBit.BOTTOM;
      }

      var isRtl = this.adapter_.isRtl();
      var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
      var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
      var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
      var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

      var leftOverflow = menuWidth - availableLeft;
      var rightOverflow = menuWidth - availableRight;

      if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
        corner |= CornerBit.RIGHT;
      }

      return corner;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getHorizontalOriginOffset_',
    value: function getHorizontalOriginOffset_(corner) {
      var anchorWidth = this.measures_.anchorWidth;

      var isRightAligned = Boolean(corner & CornerBit.RIGHT);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
      var x = 0;
      if (isRightAligned) {
        var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
        x = rightOffset;
      } else {
        var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
        x = leftOffset;
      }
      return x;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getVerticalOriginOffset_',
    value: function getVerticalOriginOffset_(corner) {
      var _measures_2 = this.measures_,
          viewport = _measures_2.viewport,
          viewportDistance = _measures_2.viewportDistance,
          anchorHeight = _measures_2.anchorHeight,
          menuHeight = _measures_2.menuHeight;

      var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
      var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

      var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
      var canOverlapVertically = !avoidVerticalOverlap;
      var y = 0;

      if (isBottomAligned) {
        y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
        // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
        // anchor corner. Bottom margin is ignored in such cases.
        if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
        }
      } else {
        y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
        // adjust for when menu can overlap anchor, but too tall to be aligned to top
        // anchor corners. Top margin is ignored in that case.
        if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
        }
      }
      return y;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
     * @private
     */

  }, {
    key: 'getMenuMaxHeight_',
    value: function getMenuMaxHeight_(corner) {
      var maxHeight = 0;
      var viewportDistance = this.measures_.viewportDistance;

      var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

      // When maximum height is not specified, it is handled from css.
      if (this.anchorCorner_ & CornerBit.BOTTOM) {
        if (isBottomAligned) {
          maxHeight = viewportDistance.top + this.anchorMargin_.top;
        } else {
          maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
        }
      }

      return maxHeight;
    }

    /** @private */

  }, {
    key: 'autoPosition_',
    value: function autoPosition_() {
      var _position;

      if (!this.adapter_.hasAnchor()) {
        return;
      }

      // Compute measurements for autoposition methods reuse.
      this.measures_ = this.getAutoLayoutMeasurements_();

      var corner = this.getOriginCorner_();
      var maxMenuHeight = this.getMenuMaxHeight_(corner);
      var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
      var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
      var horizontalOffset = this.getHorizontalOriginOffset_(corner);
      var verticalOffset = this.getVerticalOriginOffset_(corner);
      var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
      var _measures_3 = this.measures_,
          anchorWidth = _measures_3.anchorWidth,
          menuHeight = _measures_3.menuHeight,
          menuWidth = _measures_3.menuWidth;
      // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

      if (anchorWidth / menuWidth > numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
        horizontalAlignment = 'center';
      }

      // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
      // scale animation is "anchored" on the anchor.
      if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
        var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
        var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
        verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
      }

      this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
      this.adapter_.setPosition(position);
      this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

      // Clear measures after positioning is complete.
      this.measures_ = null;
    }

    /**
     * Open the menu.
     * @param {{focusIndex: ?number}=} options
     */

  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$focusIndex = _ref.focusIndex,
          focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

      this.adapter_.saveFocus();

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
      }

      this.animationRequestId_ = requestAnimationFrame(function () {
        _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
        _this3.autoPosition_();
        _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
        _this3.focusOnOpen_(focusIndex);
        _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
        if (!_this3.quickOpen_) {
          _this3.openAnimationEndTimerId_ = setTimeout(function () {
            _this3.openAnimationEndTimerId_ = 0;
            _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
          }, numbers.TRANSITION_OPEN_DURATION);
        }
      });
      this.isOpen_ = true;
    }

    /**
     * Closes the menu.
     * @param {Event=} evt
     */

  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true' : false;

      if (targetIsDisabled) {
        return;
      }

      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
      }

      requestAnimationFrame(function () {
        _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
        if (!_this4.quickOpen_) {
          _this4.closeAnimationEndTimerId_ = setTimeout(function () {
            _this4.closeAnimationEndTimerId_ = 0;
            _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
          }, numbers.TRANSITION_CLOSE_DURATION);
        }
      });
      this.isOpen_ = false;
      this.adapter_.restoreFocus();
    }

    /** @return {boolean} */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }

    /** @return {number} */

  }, {
    key: 'getSelectedIndex',
    value: function getSelectedIndex() {
      return this.selectedIndex_;
    }

    /**
     * @param {number} index Index of the item to set as selected.
     */

  }, {
    key: 'setSelectedIndex',
    value: function setSelectedIndex(index) {
      if (index === this.selectedIndex_) {
        return;
      }

      var prevSelectedIndex = this.selectedIndex_;
      if (prevSelectedIndex >= 0) {
        this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
        this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses.SELECTED_LIST_ITEM);
      }

      this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
      if (this.selectedIndex_ >= 0) {
        this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
        this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses.SELECTED_LIST_ITEM);
      }
    }
  }]);
  return MDCMenuFoundation;
}(MDCFoundation);

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {string|undefined} */
var storedTransformPropertyName_ = void 0;

/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName(globalObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

var mdcMenu = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-menu mdc-simple-menu", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "-1" } }, [_c('ul', { ref: "items", staticClass: "mdc-simple-menu__items mdc-list", attrs: { "role": "menu", "aria-hidden": "true" } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'mdc-menu',
  props: {
    'open-from-top-left': Boolean,
    'open-from-top-right': Boolean,
    'open-from-bottom-left': Boolean,
    'open-from-bottom-right': Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-simple-menu--open-from-top-left': this.openFromTopLeft,
        'mdc-simple-menu--open-from-top-right': this.openFromTopRight,
        'mdc-simple-menu--open-from-bottom-left': this.openFromBottomLeft,
        'mdc-simple-menu--open-from-bottom-right': this.openFromBottomRight
      },
      styles: {},
      items: []
    };
  },

  methods: {
    show: function show(options) {
      this.foundation.open(options);
    },
    hide: function hide() {
      this.foundation.close();
    },
    isOpen: function isOpen() {
      return this.foundation ? this.foundation.isOpen() : false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var refreshItems = function refreshItems() {
      _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
      _this.$emit('update');
    };
    this.slotObserver = new MutationObserver(function () {
      return refreshItems();
    });
    this.slotObserver.observe(this.$el, { childList: true, subtree: true });

    this._previousFocus = undefined;

    this.foundation = new MDCMenuFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.classes, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.classes, className);
      },
      hasClass: function hasClass(className) {
        return _this.$refs.root.classList.contains(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this.$refs.items);
      },
      getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
        return target.getAttribute(attributeName);
      },
      getInnerDimensions: function getInnerDimensions() {
        return {
          width: _this.$refs.items.offsetWidth,
          height: _this.$refs.items.offsetHeight
        };
      },
      hasAnchor: function hasAnchor() {
        return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
      },
      getAnchorDimensions: function getAnchorDimensions() {
        return _this.$refs.root.parentElement.getBoundingClientRect();
      },
      getWindowDimensions: function getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getNumberOfItems: function getNumberOfItems() {
        return _this.items.length;
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        return _this.$refs.root.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        return _this.$refs.root.removeEventListener(type, handler);
      },
      registerBodyClickHandler: function registerBodyClickHandler(handler) {
        return document.body.addEventListener('click', handler);
      },
      deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
        return document.body.removeEventListener('click', handler);
      },
      getIndexForEventTarget: function getIndexForEventTarget(target) {
        return _this.items.indexOf(target);
      },
      notifySelected: function notifySelected(evtData) {
        var evt = {
          index: evtData.index,
          item: _this.items[evtData.index]
        };
        _this.$emit('select', evt);
        emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
      },
      notifyCancel: function notifyCancel() {
        _this.$emit('cancel');
        emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
      },
      saveFocus: function saveFocus() {
        _this._previousFocus = document.activeElement;
      },
      restoreFocus: function restoreFocus() {
        if (_this._previousFocus) {
          _this._previousFocus.focus();
        }
      },
      isFocused: function isFocused() {
        return document.activeElement === _this.$refs.root;
      },
      focus: function focus() {
        return _this.$refs.root.focus();
      },
      getFocusedItemIndex: function getFocusedItemIndex() {
        return _this.items.indexOf(document.activeElement);
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        return _this.items[index].focus();
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function setTransformOrigin(origin) {
        _this.$set(_this.styles, getTransformPropertyName(window) + '-origin', origin);
      },
      setPosition: function setPosition(position) {
        _this.$set(_this.styles, 'left', position.left);
        _this.$set(_this.styles, 'right', position.right);
        _this.$set(_this.styles, 'top', position.top);
        _this.$set(_this.styles, 'bottom', position.bottom);
      },
      setMaxHeight: function setMaxHeight(height) {
        _this.$set(_this.styles, 'max-height', height);
      },
      setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
        _this.items[index].setAttribute(attr, value);
      },
      rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
        _this.items[index].removeAttribute(attr);
      },
      addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
        _this.items[index].classList.add(className);
      },
      rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
        _this.items[index].classList.remove(className);
      }
    });

    refreshItems();
    this.foundation.init();
  },
  beforeDestroy: function beforeDestroy() {
    this._previousFocus = null;
    this.slotObserver.disconnect();
    this.foundation.destroy();
  }
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template F
 */

var MDCComponent = function () {
  createClass(MDCComponent, null, [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!MDCComponent}
     */
    value: function attachTo(root) {
      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().
      return new MDCComponent(root, new MDCFoundation());
    }

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */

  }]);

  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  createClass(MDCComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{}
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);
  return MDCComponent;
}();

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var cssClasses$1 = {
  BOTTOM_LINE: 'mdc-select__bottom-line',
  BOTTOM_LINE_ACTIVE: 'mdc-select__bottom-line--active',
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  OPEN: 'mdc-select--open',
  ROOT: 'mdc-select',
  SCROLL_LOCK: 'mdc-select-scroll-lock'
};

var strings$1 = {
  CHANGE_EVENT: 'MDCSelect:change',
  BOTTOM_LINE_SELECTOR: '.mdc-select__bottom-line',
  LABEL_SELECTOR: '.mdc-select__label',
  MENU_SELECTOR: '.mdc-select__menu',
  SURFACE_SELECTOR: '.mdc-select__surface',
  SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text'
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends MDCComponent<!MDCMenuFoundation>
 */

var MDCMenu = function (_MDCComponent) {
  inherits(MDCMenu, _MDCComponent);

  /** @param {...?} args */
  function MDCMenu() {
    var _ref;

    classCallCheck(this, MDCMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {!Element} */
    var _this = possibleConstructorReturn(this, (_ref = MDCMenu.__proto__ || Object.getPrototypeOf(MDCMenu)).call.apply(_ref, [this].concat(args)));

    _this.previousFocus_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCMenu}
   */


  createClass(MDCMenu, [{
    key: 'show',


    /** @param {{focusIndex: ?number}=} options */
    value: function show() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$focusIndex = _ref2.focusIndex,
          focusIndex = _ref2$focusIndex === undefined ? null : _ref2$focusIndex;

      this.foundation_.open({ focusIndex: focusIndex });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.foundation_.close();
    }

    /**
     * @param {Corner} corner Default anchor corner alignment of top-left
     *     menu corner.
     */

  }, {
    key: 'setAnchorCorner',
    value: function setAnchorCorner(corner) {
      this.foundation_.setAnchorCorner(corner);
    }

    /**
     * @param {AnchorMargin} margin
     */

  }, {
    key: 'setAnchorMargin',
    value: function setAnchorMargin(margin) {
      this.foundation_.setAnchorMargin(margin);
    }

    /**
     * Return the item container element inside the component.
     * @return {?Element}
     */

  }, {
    key: 'getOptionByIndex',


    /**
     * Return the item within the menu that is selected.
     * @param {number} index
     * @return {?Element}
     */
    value: function getOptionByIndex(index) {
      var items = this.items;

      if (index < items.length) {
        return this.items[index];
      } else {
        return null;
      }
    }

    /** @param {number} index */

  }, {
    key: 'getDefaultFoundation',


    /** @return {!MDCMenuFoundation} */
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new MDCMenuFoundation({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this2.itemsContainer_);
        },
        getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
          return target.getAttribute(attributeName);
        },
        getInnerDimensions: function getInnerDimensions() {
          var itemsContainer = _this2.itemsContainer_;

          return { width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight };
        },
        hasAnchor: function hasAnchor() {
          return _this2.root_.parentElement && _this2.root_.parentElement.classList.contains('mdc-menu-anchor');
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return _this2.root_.parentElement.getBoundingClientRect();
        },
        getWindowDimensions: function getWindowDimensions() {
          return { width: window.innerWidth, height: window.innerHeight };
        },
        getNumberOfItems: function getNumberOfItems() {
          return _this2.items.length;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.root_.removeEventListener(type, handler);
        },
        registerBodyClickHandler: function registerBodyClickHandler(handler) {
          return document.body.addEventListener('click', handler);
        },
        deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
          return document.body.removeEventListener('click', handler);
        },
        getIndexForEventTarget: function getIndexForEventTarget(target) {
          return _this2.items.indexOf(target);
        },
        notifySelected: function notifySelected(evtData) {
          return _this2.emit(MDCMenuFoundation.strings.SELECTED_EVENT, {
            index: evtData.index,
            item: _this2.items[evtData.index]
          });
        },
        notifyCancel: function notifyCancel() {
          return _this2.emit(MDCMenuFoundation.strings.CANCEL_EVENT, {});
        },
        saveFocus: function saveFocus() {
          _this2.previousFocus_ = document.activeElement;
        },
        restoreFocus: function restoreFocus() {
          if (_this2.previousFocus_) {
            _this2.previousFocus_.focus();
          }
        },
        isFocused: function isFocused() {
          return document.activeElement === _this2.root_;
        },
        focus: function focus() {
          return _this2.root_.focus();
        },
        getFocusedItemIndex: function getFocusedItemIndex() {
          return _this2.items.indexOf(document.activeElement);
        },
        focusItemAtIndex: function focusItemAtIndex(index) {
          return _this2.items[index].focus();
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: function setTransformOrigin(origin) {
          _this2.root_.style[getTransformPropertyName(window) + '-origin'] = origin;
        },
        setPosition: function setPosition(position) {
          _this2.root_.style.left = 'left' in position ? position.left : null;
          _this2.root_.style.right = 'right' in position ? position.right : null;
          _this2.root_.style.top = 'top' in position ? position.top : null;
          _this2.root_.style.bottom = 'bottom' in position ? position.bottom : null;
        },
        setMaxHeight: function setMaxHeight(height) {
          _this2.root_.style.maxHeight = height;
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
          return _this2.items[index].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
          return _this2.items[index].removeAttribute(attr);
        },
        addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
          return _this2.items[index].classList.add(className);
        },
        rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
          return _this2.items[index].classList.remove(className);
        }
      });
    }
  }, {
    key: 'open',


    /** @return {boolean} */
    get: function get$$1() {
      return this.foundation_.isOpen();
    }

    /** @param {boolean} value */
    ,
    set: function set$$1(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }
  }, {
    key: 'itemsContainer_',
    get: function get$$1() {
      return this.root_.querySelector(MDCMenuFoundation.strings.ITEMS_SELECTOR);
    }

    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     * @return {!Array<!Element>}
     */

  }, {
    key: 'items',
    get: function get$$1() {
      var itemsContainer = this.itemsContainer_;

      return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
    }
  }, {
    key: 'selectedItemIndex',
    set: function set$$1(index) {
      this.foundation_.setSelectedIndex(index);
    }

    /** @return {number} */
    ,
    get: function get$$1() {
      return this.foundation_.getSelectedIndex();
    }

    /** @param {!boolean} rememberSelection */

  }, {
    key: 'rememberSelection',
    set: function set$$1(rememberSelection) {
      this.foundation_.setRememberSelection(rememberSelection);
    }

    /** @param {boolean} quickOpen */

  }, {
    key: 'quickOpen',
    set: function set$$1(quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCMenu(root);
    }
  }]);
  return MDCMenu;
}(MDCComponent);

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var OPENER_KEYS = [{ key: 'ArrowUp', keyCode: 38, forType: 'keydown' }, { key: 'ArrowDown', keyCode: 40, forType: 'keydown' }, { key: 'Space', keyCode: 32, forType: 'keyup' }];

var MDCSelectFoundation = function (_MDCFoundation) {
  inherits(MDCSelectFoundation, _MDCFoundation);
  createClass(MDCSelectFoundation, null, [{
    key: 'cssClasses',
    get: function get$$1() {
      return cssClasses$1;
    }
  }, {
    key: 'strings',
    get: function get$$1() {
      return strings$1;
    }
  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        floatLabel: function floatLabel() /* value: boolean */{},
        addClassToBottomLine: function addClassToBottomLine() /* className: string */{},
        removeClassFromBottomLine: function removeClassFromBottomLine() /* className: string */{},
        setBottomLineAttr: function setBottomLineAttr() /* attr: string, value: string */{},
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        setAttr: function setAttr() /* attr: string, value: string */{},
        rmAttr: function rmAttr() /* attr: string */{},
        computeBoundingRect: function computeBoundingRect() {
          return (/* {left: number, top: number} */{ left: 0, top: 0 }
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
        focus: function focus() {},
        makeTabbable: function makeTabbable() {},
        makeUntabbable: function makeUntabbable() {},
        getComputedStyleValue: function getComputedStyleValue() {
          return (/* propertyName: string */ /* string */''
          );
        },
        setStyle: function setStyle() /* propertyName: string, value: string */{},
        create2dRenderingContext: function create2dRenderingContext() {
          return (/* {font: string, measureText: (string) => {width: number}} */{
              font: '',
              measureText: function measureText() {
                return { width: 0 };
              }
            }
          );
        },
        setMenuElStyle: function setMenuElStyle() /* propertyName: string, value: string */{},
        setMenuElAttr: function setMenuElAttr() /* attr: string, value: string */{},
        rmMenuElAttr: function rmMenuElAttr() /* attr: string */{},
        getMenuElOffsetHeight: function getMenuElOffsetHeight() {
          return (/* number */0
          );
        },
        openMenu: function openMenu() /* focusIndex: number */{},
        isMenuOpen: function isMenuOpen() {
          return (/* boolean */false
          );
        },
        setSelectedTextContent: function setSelectedTextContent() /* textContent: string */{},
        getNumberOfOptions: function getNumberOfOptions() {
          return (/* number */0
          );
        },
        getTextForOptionAtIndex: function getTextForOptionAtIndex() {
          return (/* index: number */ /* string */''
          );
        },
        getValueForOptionAtIndex: function getValueForOptionAtIndex() {
          return (/* index: number */ /* string */''
          );
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex() /* index: number, attr: string, value: string */{},
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() /* index: number, attr: string */{},
        getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex() {
          return (/* index: number */ /* number */0
          );
        },
        registerMenuInteractionHandler: function registerMenuInteractionHandler() /* type: string, handler: EventListener */{},
        deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler() /* type: string, handler: EventListener */{},
        notifyChange: function notifyChange() {},
        getWindowInnerHeight: function getWindowInnerHeight() {
          return (/* number */0
          );
        }
      };
    }
  }]);

  function MDCSelectFoundation(adapter) {
    classCallCheck(this, MDCSelectFoundation);

    var _this = possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

    _this.ctx_ = null;
    _this.selectedIndex_ = -1;
    _this.disabled_ = false;
    _this.isFocused_ = false;

    /** @private {number} */
    _this.animationRequestId_ = 0;

    _this.displayHandler_ = function (evt) {
      evt.preventDefault();
      if (!_this.adapter_.isMenuOpen()) {
        _this.open_();
      }
    };
    _this.displayViaKeyboardHandler_ = function (evt) {
      return _this.handleDisplayViaKeyboard_(evt);
    };
    _this.selectionHandler_ = function (_ref) {
      var detail = _ref.detail;
      var index = detail.index;


      if (index !== _this.selectedIndex_) {
        _this.setSelectedIndex(index);
        _this.adapter_.notifyChange();
      }
      _this.close_();
    };
    _this.cancelHandler_ = function () {
      _this.close_();
      if (_this.selectedIndex_ === -1) {
        _this.adapter_.floatLabel(false);
      }
    };
    return _this;
  }

  createClass(MDCSelectFoundation, [{
    key: 'init',
    value: function init() {
      this.ctx_ = this.adapter_.create2dRenderingContext();
      this.adapter_.registerInteractionHandler('click', this.displayHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
      this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
      this.adapter_.registerMenuInteractionHandler(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
      this.adapter_.registerMenuInteractionHandler(MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
      this.resize();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Drop reference to context object to prevent potential leaks
      this.ctx_ = null;
      cancelAnimationFrame(this.animationRequestId_);
      this.adapter_.deregisterInteractionHandler('click', this.displayHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.displayViaKeyboardHandler_);
      this.adapter_.deregisterInteractionHandler('keyup', this.displayViaKeyboardHandler_);
      this.adapter_.deregisterMenuInteractionHandler(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
      this.adapter_.deregisterMenuInteractionHandler(MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.selectedIndex_ >= 0 ? this.adapter_.getValueForOptionAtIndex(this.selectedIndex_) : '';
    }
  }, {
    key: 'getSelectedIndex',
    value: function getSelectedIndex() {
      return this.selectedIndex_;
    }
  }, {
    key: 'setSelectedIndex',
    value: function setSelectedIndex(index) {
      var prevSelectedIndex = this.selectedIndex_;
      if (prevSelectedIndex >= 0) {
        this.adapter_.rmAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected');
      }

      this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfOptions() ? index : -1;
      var selectedTextContent = '';
      if (this.selectedIndex_ >= 0) {
        selectedTextContent = this.adapter_.getTextForOptionAtIndex(this.selectedIndex_).trim();
        this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
      }
      this.adapter_.setSelectedTextContent(selectedTextContent);
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.disabled_;
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

      this.disabled_ = disabled;
      if (this.disabled_) {
        this.adapter_.addClass(DISABLED);
        this.adapter_.setAttr('aria-disabled', 'true');
        this.adapter_.makeUntabbable();
      } else {
        this.adapter_.removeClass(DISABLED);
        this.adapter_.rmAttr('aria-disabled');
        this.adapter_.makeTabbable();
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      var font = this.adapter_.getComputedStyleValue('font');
      var letterSpacing = parseFloat(this.adapter_.getComputedStyleValue('letter-spacing'));

      if (font) {
        this.ctx_.font = font;
      } else {
        var primaryFontFamily = this.adapter_.getComputedStyleValue('font-family').split(',')[0];
        var fontSize = this.adapter_.getComputedStyleValue('font-size');
        this.ctx_.font = fontSize + ' ' + primaryFontFamily;
      }

      var maxTextLength = 0;

      for (var i = 0, l = this.adapter_.getNumberOfOptions(); i < l; i++) {
        var surfacePaddingRight = parseInt(this.adapter_.getComputedStyleValue('padding-right'), 10);
        var surfacePaddingLeft = parseInt(this.adapter_.getComputedStyleValue('padding-left'), 10);
        var selectBoxAddedPadding = surfacePaddingRight + surfacePaddingLeft;
        var txt = this.adapter_.getTextForOptionAtIndex(i).trim();

        var _ctx_$measureText = this.ctx_.measureText(txt),
            width = _ctx_$measureText.width;

        var addedSpace = letterSpacing * txt.length;

        maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace + selectBoxAddedPadding));
      }

      this.adapter_.setStyle('width', maxTextLength + 'px');
    }
  }, {
    key: 'open_',
    value: function open_() {
      var _this2 = this;

      this.disableScroll_();
      var OPEN = MDCSelectFoundation.cssClasses.OPEN;

      var focusIndex = this.selectedIndex_ < 0 ? 0 : this.selectedIndex_;

      this.setMenuStylesForOpenAtIndex_(focusIndex);
      this.adapter_.floatLabel(true);
      this.adapter_.addClassToBottomLine(cssClasses$1.BOTTOM_LINE_ACTIVE);
      this.adapter_.addClass(OPEN);
      this.animationRequestId_ = requestAnimationFrame(function () {
        _this2.adapter_.openMenu(focusIndex);
        _this2.isFocused_ = true;
      });
    }
  }, {
    key: 'setMenuStylesForOpenAtIndex_',
    value: function setMenuStylesForOpenAtIndex_(index) {
      var innerHeight = this.adapter_.getWindowInnerHeight();

      var _adapter_$computeBoun = this.adapter_.computeBoundingRect(),
          left = _adapter_$computeBoun.left,
          top = _adapter_$computeBoun.top;

      this.adapter_.setMenuElAttr('aria-hidden', 'true');
      this.adapter_.setMenuElStyle('display', 'block');
      var menuHeight = this.adapter_.getMenuElOffsetHeight();
      var itemOffsetTop = this.adapter_.getOffsetTopForOptionAtIndex(index);
      this.adapter_.setMenuElStyle('display', '');
      this.adapter_.rmMenuElAttr('aria-hidden');

      var adjustedTop = top - itemOffsetTop;
      var overflowsTop = adjustedTop < 0;
      var overflowsBottom = adjustedTop + menuHeight > innerHeight;
      if (overflowsTop) {
        adjustedTop = 0;
      } else if (overflowsBottom) {
        adjustedTop = Math.max(0, innerHeight - menuHeight);
      }

      this.adapter_.setMenuElStyle('left', left + 'px');
      this.adapter_.setMenuElStyle('top', adjustedTop + 'px');
      this.adapter_.setMenuElStyle('transform-origin', 'center ' + itemOffsetTop + 'px');
    }
  }, {
    key: 'close_',
    value: function close_() {
      var OPEN = MDCSelectFoundation.cssClasses.OPEN;

      this.adapter_.removeClass(OPEN);
      this.adapter_.removeClassFromBottomLine(cssClasses$1.BOTTOM_LINE_ACTIVE);
      this.adapter_.focus();
      this.enableScroll_();
    }
  }, {
    key: 'handleDisplayViaKeyboard_',
    value: function handleDisplayViaKeyboard_(evt) {
      // We use a hard-coded 2 instead of Event.AT_TARGET to avoid having to reference a browser
      // global.
      var EVENT_PHASE_AT_TARGET = 2;
      if (evt.eventPhase !== EVENT_PHASE_AT_TARGET) {
        return;
      }

      // Prevent pressing space down from scrolling the page
      var isSpaceDown = evt.type === 'keydown' && (evt.key === 'Space' || evt.keyCode === 32);
      if (isSpaceDown) {
        evt.preventDefault();
      }

      var isOpenerKey = OPENER_KEYS.some(function (_ref2) {
        var key = _ref2.key,
            keyCode = _ref2.keyCode,
            forType = _ref2.forType;

        return evt.type === forType && (evt.key === key || evt.keyCode === keyCode);
      });

      if (isOpenerKey) {
        this.displayHandler_(evt);
      }
    }
  }, {
    key: 'disableScroll_',
    value: function disableScroll_() {
      this.adapter_.addBodyClass(cssClasses$1.SCROLL_LOCK);
    }
  }, {
    key: 'enableScroll_',
    value: function enableScroll_() {
      this.adapter_.removeBodyClass(cssClasses$1.SCROLL_LOCK);
    }
  }]);
  return MDCSelectFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Select Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Select label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCSelectLabelAdapter = function () {
  function MDCSelectLabelAdapter() {
    classCallCheck(this, MDCSelectLabelAdapter);
  }

  createClass(MDCSelectLabelAdapter, [{
    key: "addClass",

    /**
     * Adds a class to the label element.
     * @param {string} className
     */
    value: function addClass(className) {}

    /**
     * Removes a class from the label element.
     * @param {string} className
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}
  }]);
  return MDCSelectLabelAdapter;
}();

var cssClasses$2 = {
  LABEL_FLOAT_ABOVE: 'mdc-select__label--float-above'
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCSelectLabelAdapter>}
 * @final
 */

var MDCSelectLabelFoundation = function (_MDCFoundation) {
  inherits(MDCSelectLabelFoundation, _MDCFoundation);
  createClass(MDCSelectLabelFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get$$1() {
      return cssClasses$2;
    }

    /**
     * {@see MDCSelectLabelAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCSelectLabelAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCSelectLabelAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          getWidth: function getWidth() {}
        }
      );
    }

    /**
     * @param {!MDCSelectLabelAdapter} adapter
     */

  }]);

  function MDCSelectLabelFoundation(adapter) {
    classCallCheck(this, MDCSelectLabelFoundation);
    return possibleConstructorReturn(this, (MDCSelectLabelFoundation.__proto__ || Object.getPrototypeOf(MDCSelectLabelFoundation)).call(this, _extends(MDCSelectLabelFoundation.defaultAdapter, adapter)));
  }

  /**
   * Styles the label to float or defloat as necessary.
   * @param {string} value The value of the input.
   * @param {boolean} isFocused Whether the input is focused.
   * @param {boolean} isBadInput The input's `validity.badInput` value.
   */


  createClass(MDCSelectLabelFoundation, [{
    key: 'styleFloat',
    value: function styleFloat(value) {
      var LABEL_FLOAT_ABOVE = MDCSelectLabelFoundation.cssClasses.LABEL_FLOAT_ABOVE;

      if (!!value) {
        this.adapter_.addClass(LABEL_FLOAT_ABOVE);
      } else {
        this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      }
    }
  }]);
  return MDCSelectLabelFoundation;
}(MDCFoundation);

var MDCMenuSelect = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-select mdc-menu-select", class: _vm.classes, attrs: { "role": "listbox" } }, [_c('div', { ref: "surface", staticClass: "mdc-select__surface", style: _vm.surfaceStyles, attrs: { "tabindex": _vm.tabIndex } }, [_c('div', { ref: "label", staticClass: "mdc-select__label", class: _vm.labelClasses }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', { ref: "selectedContent", staticClass: "mdc-select__selected-text" }, [_vm._v(_vm._s(_vm.selectedTextContent))]), _vm._v(" "), _c('div', { ref: "bottomLine", staticClass: "mdc-select__bottom-line", class: _vm.bottomLineClasses })]), _vm._v(" "), _c('mdc-menu', { ref: "menu", staticClass: "mdc-select__menu", on: { "update": _vm.refreshIndex } }, [_vm._t("default")], 2)], 1);
  }, staticRenderFns: [],
  name: 'mdc-menu-select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    multiple: Boolean,
    value: [String, Array],
    disabled: Boolean,
    label: String,
    box: Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-select--box': this.box
      },
      labelClasses: {},
      bottomLineClasses: {},
      surfaceStyles: {},
      tabIndex: 0,
      selectedTextContent: ''
    };
  },

  components: {
    'mdc-menu': mdcMenu
  },
  watch: {
    disabled: function disabled(value) {
      this.foundation && this.foundation.setDisabled(value);
    },
    value: function value() {
      this.refreshIndex();
    },
    box: function box() {
      this.$set(this.classes, 'mdc-select--box', this.box);
    }
  },
  methods: {
    refreshIndex: function refreshIndex() {
      if (this.foundation) {
        var options = this.$refs.menu.items;
        for (var i = 0; i < options.length; i++) {
          var optionValue = options[i].getAttribute('data-value') || options[i].textContent.trim();
          if (this.value == optionValue) {
            this.foundation.setSelectedIndex(i);
            //TODO: MDCFIX force float above if value is valid
            this.$set(this.labelClasses, 'mdc-select__label--float-above', true);
            return;
          }
        }
        //TODO: MDCFIX force float above if value is valid
        this.foundation.setSelectedIndex(-1);
        this.$set(this.labelClasses, 'mdc-select__label--float-above', false);
        this.$emit('change', this.foundation.getValue()); // TODO: MDCFIX
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.labelFoundation = new MDCSelectLabelFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.labelClasses, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.labelClasses, className);
      }
    });

    this.foundation = new MDCSelectFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.classes, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.classes, className);
      },
      floatLabel: function floatLabel(value) {
        _this.labelFoundation.styleFloat(value);
      },
      addClassToBottomLine: function addClassToBottomLine(className) {
        return _this.$set(_this.bottomLineClasses, className, true);
      },
      removeClassFromBottomLine: function removeClassFromBottomLine(className) {
        return _this.$delete(_this.bottomLineClasses, className);
      },
      setBottomLineAttr: function setBottomLineAttr(attr, value) {
        return _this.$refs.bottomLine.setAttribute(attr, value);
      },
      setAttr: function setAttr(attr, value) {
        return _this.$el.setAttribute(attr, value);
      },
      rmAttr: function rmAttr(attr, value) {
        return _this.$el.removeAttribute(attr, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return _this.$refs.surface.getBoundingClientRect();
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        return _this.$refs.surface.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        return _this.$refs.surface.removeEventListener(type, handler);
      },
      focus: function focus() {
        return _this.$refs.surface.focus();
      },
      makeTabbable: function makeTabbable() {
        _this.tabIndex = 0;
      },
      makeUntabbable: function makeUntabbable() {
        _this.tabIndex = -1;
      },
      getComputedStyleValue: function getComputedStyleValue(prop) {
        return window.getComputedStyle(_this.$refs.surface).getPropertyValue(prop);
      },
      setStyle: function setStyle(propertyName, value) {
        return _this.$set(_this.surfaceStyles, propertyName, value);
      },
      create2dRenderingContext: function create2dRenderingContext() {
        return document.createElement('canvas').getContext('2d');
      },
      setMenuElStyle: function setMenuElStyle(propertyName, value) {
        return _this.$refs.menu.$el.style[propertyName] = value;
      },
      setMenuElAttr: function setMenuElAttr(attr, value) {
        return _this.$refs.menu.$el.setAttribute(attr, value);
      },
      rmMenuElAttr: function rmMenuElAttr(attr) {
        return _this.$refs.menu.$el.removeAttribute(attr);
      },
      getMenuElOffsetHeight: function getMenuElOffsetHeight() {
        return _this.$refs.menu.$el.offsetHeight;
      },
      openMenu: function openMenu(focusIndex) {
        return _this.$refs.menu.show({ focusIndex: focusIndex });
      },
      isMenuOpen: function isMenuOpen() {
        return _this.$refs.menu.isOpen();
      },
      setSelectedTextContent: function setSelectedTextContent(selectedTextContent) {
        _this.selectedTextContent = selectedTextContent;
      },
      getNumberOfOptions: function getNumberOfOptions() {
        return _this.$refs.menu.items.length;
      },
      getTextForOptionAtIndex: function getTextForOptionAtIndex(index$$1) {
        return _this.$refs.menu.items[index$$1].textContent.trim();
      },
      getValueForOptionAtIndex: function getValueForOptionAtIndex(index$$1) {
        return _this.$refs.menu.items[index$$1].getAttribute('data-value') || _this.$refs.menu.items[index$$1].textContent.trim();
      },
      setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index$$1, attr, value) {
        return _this.$refs.menu.items[index$$1].setAttribute(attr, value);
      },
      rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index$$1, attr) {
        return _this.$refs.menu.items[index$$1].removeAttribute(attr);
      },
      getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex(index$$1) {
        return _this.$refs.menu.items[index$$1].offsetTop;
      },
      registerMenuInteractionHandler: function registerMenuInteractionHandler(type, handler) {
        return _this.$refs.menu.$el.addEventListener(type, handler);
      },
      deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler(type, handler) {
        return _this.$refs.menu.$el.removeEventListener(type, handler);
      },
      notifyChange: function notifyChange() {
        _this.$emit('change', _this.foundation.getValue());
      },
      getWindowInnerHeight: function getWindowInnerHeight() {
        return window.innerHeight;
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      }
    });

    //TODO: MDCFIX
    var foundation = this.foundation;
    foundation.resize = function () {

      var font = foundation.adapter_.getComputedStyleValue('font');
      var letterSpacing = parseFloat(foundation.adapter_.getComputedStyleValue('letter-spacing'));

      if (font) {
        foundation.ctx_.font = font;
      } else {
        var primaryFontFamily = foundation.adapter_.getComputedStyleValue('font-family').split(',')[0];
        var fontSize = foundation.adapter_.getComputedStyleValue('font-size');
        foundation.ctx_.font = fontSize + ' ' + primaryFontFamily;
      }

      var maxTextLength = 0;

      var surfacePaddingRight = parseInt(foundation.adapter_.getComputedStyleValue('padding-right'), 10);
      var surfacePaddingLeft = parseInt(foundation.adapter_.getComputedStyleValue('padding-left'), 10);
      var selectBoxAddedPadding = surfacePaddingRight + surfacePaddingLeft;

      for (var i = 0, l = foundation.adapter_.getNumberOfOptions(); i < l; i++) {
        var txt = foundation.adapter_.getTextForOptionAtIndex(i).trim();

        var _foundation$ctx_$meas = foundation.ctx_.measureText(txt),
            _width = _foundation$ctx_$meas.width;

        var _addedSpace = letterSpacing * txt.length;

        maxTextLength = Math.max(maxTextLength, Math.ceil(_width + _addedSpace + selectBoxAddedPadding));
      }

      var labelTxt = _this.label;

      var _foundation$ctx_$meas2 = foundation.ctx_.measureText(labelTxt),
          width = _foundation$ctx_$meas2.width;

      var addedSpace = letterSpacing * labelTxt.length;

      maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace + selectBoxAddedPadding));

      foundation.adapter_.setStyle('width', maxTextLength + 'px');
    };
    /// 
    this.labelFoundation.init();
    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.refreshIndex();
    if (this.value !== this.foundation.getValue()) {
      this.$emit('change', this.foundation.getValue());
    }
  },
  beforeDestroy: function beforeDestroy() {
    var foundation = this.foundation;
    this.foundation = null;
    foundation.destroy();

    var foundationLabel = this.foundationLabel;
    this.foundationLabel = null;
    foundationLabel.destroy();
  }
};

var MDCMultiSelect = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('select', { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], ref: "root", staticClass: "mdc-select mdc-multi-select mdc-list", style: _vm.styles, attrs: { "multiple": _vm.multiple, "disabled": _vm.disabled }, on: { "change": [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;return val;
          });_vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }, _vm.onChange] } }, [_vm.label ? _c('optgroup', { ref: "optgroup", staticClass: "mdc-list-group", attrs: { "label": _vm.label } }, [_vm._t("default")], 2) : _vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-multi-select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    multiple: Boolean,
    value: [String, Array],
    disabled: Boolean,
    label: String,
    maxSize: {
      type: [String, Number],
      default: 4
    }
  },
  data: function data() {
    return {
      selected: this.value,
      size: undefined,
      count: undefined
    };
  },

  computed: {
    styles: function styles() {
      var scroll = this.count > this.size;
      var size = 48 * this.size + (scroll ? 0 : 16);

      var styles = {
        'height': size + 'px',
        'overflow-y': scroll ? 'scroll' : 'hidden'
      };
      if (!scroll) {
        styles['background-image'] = 'unset';
      }
      return styles;
    }
  },
  methods: {
    onChange: function onChange() {
      this.$emit('change', this.selected);
    }
  },
  mounted: function mounted() {
    var _this = this;

    var refreshSize = function refreshSize() {
      var count = _this.$refs.root.querySelectorAll('option, optgroup').length;
      _this.count = count;
      var max = Number(_this.maxSize);
      if (_this.label) {
        max += 1;
      }
      _this.size = Math.min(count, max);
    };

    this.slotObserver = new MutationObserver(function () {
      return refreshSize();
    });
    this.slotObserver.observe(this.$el, { childList: true, subtree: true });

    refreshSize();
  },
  beforeDestroy: function beforeDestroy() {
    this.slotObserver.disconnect();
  }
};

var media = new (function () {
  function _class() {
    classCallCheck(this, _class);
  }

  createClass(_class, [{
    key: 'mobile',
    get: function get$$1() {
      return this._mobile || (this._mobile = window.matchMedia('(max-width: 600px) and (pointer: coarse)'));
    }
  }]);
  return _class;
}())();

var mdcSelect = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, _vm._b({ tag: "component", attrs: { "multiple": _vm.multiple, "label": _vm.label, "value": _vm.value }, on: { "change": _vm.onChange } }, 'component', _vm.$attrs, false), [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-select',
  mixins: [DispatchFocusMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    multiple: Boolean,
    value: [String, Array],
    label: String,
    native: Boolean
  },
  provide: function provide() {
    return { mdcSelect: this };
  },

  components: {
    'mdc-native-select': MDCNativeSelect,
    'mdc-menu-select': MDCMenuSelect,
    'mdc-multi-select': MDCMultiSelect
  },
  data: function data() {
    return {
      mobile: window ? media.mobile.matches : true
    };
  },

  computed: {
    type: function type() {
      return this.multiple ? 'mdc-multi-select' : this.menu ? 'mdc-menu-select' : this.isNative ? 'mdc-native-select' : 'mdc-menu-select';
    },
    isNative: function isNative() {
      return this.native || this.multiple || this.mobile;
    }
  },
  methods: {
    onChange: function onChange(value) {
      this.$emit('change', value);
    },
    refreshMedia: function refreshMedia() {
      this.mobile = media.mobile.matches;
    }
  },
  beforeMount: function beforeMount() {
    media.mobile.addListener(this.refreshMedia);
    this.refreshMedia();
  },
  beforeDestroy: function beforeDestroy() {
    media.mobile.removeListener(this.refreshMedia);
  }
};

var MDCNativeOption = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.hasValue ? _c('option', { staticClass: "mdc-option mdc-native-option", attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.value } }, [_vm._t("default")], 2) : _c('option', { staticClass: "mdc-option mdc-native-option", attrs: { "disabled": _vm.disabled } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-native-option',
  props: {
    value: String,
    disabled: Boolean
  },
  computed: {
    hasValue: function hasValue() {
      return !(typeof this.value === 'undefined');
    }
  }
};

var MDCMenuOption = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-option mdc-menu-option mdc-list-item", attrs: { "role": "option", "tabindex": _vm.disabled ? -1 : 0, "aria-disabled": _vm.disabled, "data-value": _vm.value } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-menu-option',
  props: {
    value: String,
    disabled: Boolean
  }
};

var MDCMultiOption = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.hasValue ? _c('option', { staticClass: "mdc-option mdc-multi-option mdc-list-item", attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.value } }, [_vm._t("default")], 2) : _c('option', { staticClass: "mdc-option mdc-multi-option mdc-list-item", attrs: { "disabled": _vm.disabled } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-multi-option',
  props: {
    value: String,
    disabled: Boolean
  },
  computed: {
    hasValue: function hasValue() {
      return !(typeof this.value === 'undefined');
    }
  }
};

var mdcOption = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, { tag: "component", attrs: { "disabled": _vm.disabled, "value": _vm.value } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-option',
  props: {
    value: String,
    disabled: Boolean
  },
  inject: ['mdcSelect'],
  components: {
    'mdc-native-option': MDCNativeOption,
    'mdc-multi-option': MDCMultiOption,
    'mdc-menu-option': MDCMenuOption
  },
  computed: {
    isNative: function isNative() {
      return this.mdcSelect.isNative;
    },
    multiple: function multiple() {
      return this.mdcSelect.multiple;
    },
    type: function type() {
      return this.multiple ? 'mdc-multi-option' : this.isNative ? 'mdc-native-option' : 'mdc-menu-option';
    }
  }
};

var plugin = BasePlugin({
  mdcSelect: mdcSelect,
  mdcOption: mdcOption
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1uYXRpdmUtc2VsZWN0LnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL21lbnUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL21lbnUvdXRpbC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbWVudS9tZGMtbWVudS52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zZWxlY3QvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zZWxlY3QvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2xhYmVsL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9sYWJlbC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLW1lbnUtc2VsZWN0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1tdWx0aS1zZWxlY3QudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLXNlbGVjdC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtbmF0aXZlLW9wdGlvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtbWVudS1vcHRpb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLW11bHRpLW9wdGlvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtb3B0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiAge2hhc0ZvY3VzOiBmYWxzZX1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgb25Nb3VzZVVwICgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50ICgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9IHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8c2VsZWN0IHJlZj1cInJvb3RcIiBjbGFzcz1cIm1kYy1zZWxlY3QgbWRjLW5hdGl2ZS1zZWxlY3RcIiBcbiAgICB2LW1vZGVsPVwic2VsZWN0ZWRcIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgQGNoYW5nZT1cIm9uQ2hhbmdlXCJcbiAgPlxuICAgIDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIiB2LWlmPVwibGFiZWxcIj57eyBsYWJlbCB9fTwvb3B0aW9uPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9zZWxlY3Q+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW5hdGl2ZS1zZWxlY3QnLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFtTdHJpbmcsIEFycmF5XSxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3RlZDogdGhpcy52YWx1ZVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uQ2hhbmdlICgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuc2VsZWN0ZWQpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIE1lbnUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gZm9jdXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBldmVudCBoYW5kbGVyc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTWVudUFkYXB0ZXIge1xuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGhhc05lY2Vzc2FyeURvbSgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlTmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldCh0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3sgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfX0gKi9cbiAgZ2V0SW5uZXJEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaGFzQW5jaG9yKCkge31cblxuICAvKiogQHJldHVybiB7e3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19ICovXG4gIGdldEFuY2hvckRpbWVuc2lvbnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH19ICovXG4gIGdldFdpbmRvd0RpbWVuc2lvbnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldE51bWJlck9mSXRlbXMoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICBkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SW5kZXhGb3JFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqIEBwYXJhbSB7e2luZGV4OiBudW1iZXJ9fSBldnREYXRhICovXG4gIG5vdGlmeVNlbGVjdGVkKGV2dERhdGEpIHt9XG5cbiAgbm90aWZ5Q2FuY2VsKCkge31cblxuICBzYXZlRm9jdXMoKSB7fVxuXG4gIHJlc3RvcmVGb2N1cygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRm9jdXNlZCgpIHt9XG5cbiAgZm9jdXMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldEZvY3VzZWRJdGVtSW5kZXgoKSAvKiBudW1iZXIgKi8ge31cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IGluZGV4ICovXG4gIGZvY3VzSXRlbUF0SW5kZXgoaW5kZXgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzUnRsKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbiAqL1xuICBzZXRUcmFuc2Zvcm1PcmlnaW4ob3JpZ2luKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3tcbiAgKiAgIHRvcDogKHN0cmluZ3x1bmRlZmluZWQpLFxuICAqICAgcmlnaHQ6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIGJvdHRvbTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICAqICAgbGVmdDogKHN0cmluZ3x1bmRlZmluZWQpXG4gICogfX0gcG9zaXRpb24gKi9cbiAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBoZWlnaHQgKi9cbiAgc2V0TWF4SGVpZ2h0KGhlaWdodCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICovXG4gIHJtQXR0ckZvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGF0dHIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJtQ2xhc3NGb3JPcHRpb25BdEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG59XG5cbmV4cG9ydCB7TURDTWVudUFkYXB0ZXJ9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1tZW51JyxcbiAgT1BFTjogJ21kYy1tZW51LS1vcGVuJyxcbiAgQU5JTUFUSU5HX09QRU46ICdtZGMtbWVudS0tYW5pbWF0aW5nLW9wZW4nLFxuICBBTklNQVRJTkdfQ0xPU0VEOiAnbWRjLW1lbnUtLWFuaW1hdGluZy1jbG9zZWQnLFxuICBTRUxFQ1RFRF9MSVNUX0lURU06ICdtZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIElURU1TX1NFTEVDVE9SOiAnLm1kYy1tZW51X19pdGVtcycsXG4gIFNFTEVDVEVEX0VWRU5UOiAnTURDTWVudTpzZWxlY3RlZCcsXG4gIENBTkNFTF9FVkVOVDogJ01EQ01lbnU6Y2FuY2VsJyxcbiAgQVJJQV9ESVNBQkxFRF9BVFRSOiAnYXJpYS1kaXNhYmxlZCcsXG59O1xuXG4vKiogQGVudW0ge251bWJlcn0gKi9cbmNvbnN0IG51bWJlcnMgPSB7XG4gIC8vIEFtb3VudCBvZiB0aW1lIHRvIHdhaXQgYmVmb3JlIHRyaWdnZXJpbmcgYSBzZWxlY3RlZCBldmVudCBvbiB0aGUgbWVudS4gTm90ZSB0aGF0IHRoaXMgdGltZVxuICAvLyB3aWxsIG1vc3QgbGlrZWx5IGJlIGJ1bXBlZCB1cCBvbmNlIGludGVyYWN0aXZlIGxpc3RzIGFyZSBzdXBwb3J0ZWQgdG8gYWxsb3cgZm9yIHRoZSByaXBwbGUgdG9cbiAgLy8gYW5pbWF0ZSBiZWZvcmUgY2xvc2luZyB0aGUgbWVudVxuICBTRUxFQ1RFRF9UUklHR0VSX0RFTEFZOiA1MCxcbiAgLy8gVG90YWwgZHVyYXRpb24gb2YgbWVudSBvcGVuIGFuaW1hdGlvbi5cbiAgVFJBTlNJVElPTl9PUEVOX0RVUkFUSU9OOiAxMjAsXG4gIC8vIFRvdGFsIGR1cmF0aW9uIG9mIG1lbnUgY2xvc2UgYW5pbWF0aW9uLlxuICBUUkFOU0lUSU9OX0NMT1NFX0RVUkFUSU9OOiA3NSxcbiAgLy8gTWFyZ2luIGxlZnQgdG8gdGhlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IHdoZW4gbWVudSBpcyBhdCBtYXhpbXVtIHBvc3NpYmxlIGhlaWdodC5cbiAgTUFSR0lOX1RPX0VER0U6IDMyLFxuICAvLyBSYXRpbyBvZiBhbmNob3Igd2lkdGggdG8gbWVudSB3aWR0aCBmb3Igc3dpdGNoaW5nIGZyb20gY29ybmVyIHBvc2l0aW9uaW5nIHRvIGNlbnRlciBwb3NpdGlvbmluZy5cbiAgQU5DSE9SX1RPX01FTlVfV0lEVEhfUkFUSU86IDAuNjcsXG4gIC8vIFJhdGlvIG9mIHZlcnRpY2FsIG9mZnNldCB0byBtZW51IGhlaWdodCBmb3Igc3dpdGNoaW5nIGZyb20gY29ybmVyIHRvIG1pZC13YXkgb3JpZ2luIHBvc2l0aW9uaW5nLlxuICBPRkZTRVRfVE9fTUVOVV9IRUlHSFRfUkFUSU86IDAuMSxcbn07XG5cbi8qKlxuICogRW51bSBmb3IgYml0cyBpbiB0aGUge0BzZWUgQ29ybmVyKSBiaXRtYXAuXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDb3JuZXJCaXQgPSB7XG4gIEJPVFRPTTogMSxcbiAgQ0VOVEVSOiAyLFxuICBSSUdIVDogNCxcbiAgRkxJUF9SVEw6IDgsXG59O1xuXG4vKipcbiAqIEVudW0gZm9yIHJlcHJlc2VudGluZyBhbiBlbGVtZW50IGNvcm5lciBmb3IgcG9zaXRpb25pbmcgdGhlIG1lbnUuXG4gKlxuICogVGhlIFNUQVJUIGNvbnN0YW50cyBtYXAgdG8gTEVGVCBpZiBlbGVtZW50IGRpcmVjdGlvbmFsaXR5IGlzIGxlZnRcbiAqIHRvIHJpZ2h0IGFuZCBSSUdIVCBpZiB0aGUgZGlyZWN0aW9uYWxpdHkgaXMgcmlnaHQgdG8gbGVmdC5cbiAqIExpa2V3aXNlIEVORCBtYXBzIHRvIFJJR0hUIG9yIExFRlQgZGVwZW5kaW5nIG9uIHRoZSBkaXJlY3Rpb25hbGl0eS5cbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDb3JuZXIgPSB7XG4gIFRPUF9MRUZUOiAwLFxuICBUT1BfUklHSFQ6IENvcm5lckJpdC5SSUdIVCxcbiAgQk9UVE9NX0xFRlQ6IENvcm5lckJpdC5CT1RUT00sXG4gIEJPVFRPTV9SSUdIVDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5SSUdIVCxcbiAgVE9QX1NUQVJUOiBDb3JuZXJCaXQuRkxJUF9SVEwsXG4gIFRPUF9FTkQ6IENvcm5lckJpdC5GTElQX1JUTCB8IENvcm5lckJpdC5SSUdIVCxcbiAgQk9UVE9NX1NUQVJUOiBDb3JuZXJCaXQuQk9UVE9NIHwgQ29ybmVyQml0LkZMSVBfUlRMLFxuICBCT1RUT01fRU5EOiBDb3JuZXJCaXQuQk9UVE9NIHwgQ29ybmVyQml0LlJJR0hUIHwgQ29ybmVyQml0LkZMSVBfUlRMLFxufTtcblxuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIENvcm5lckJpdCwgQ29ybmVyfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHRvcDogbnVtYmVyLFxuICogICByaWdodDogbnVtYmVyLFxuICogICBib3R0b206IG51bWJlcixcbiAqICAgbGVmdDogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgQW5jaG9yTWFyZ2luO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB2aWV3cG9ydDogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9LFxuICogICB2aWV3cG9ydERpc3RhbmNlOiB7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9LFxuICogICBhbmNob3JIZWlnaHQ6IG51bWJlcixcbiAqICAgYW5jaG9yV2lkdGg6IG51bWJlcixcbiAqICAgbWVudUhlaWdodDogbnVtYmVyLFxuICogICBtZW51V2lkdGg6IG51bWJlcixcbiAqIH19XG4gKi9cbmxldCBBdXRvTGF5b3V0TWVhc3VyZW1lbnRzO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7TURDTWVudUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIENvcm5lciwgQ29ybmVyQml0fSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ01lbnVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDTWVudUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJ9ICovXG4gIHN0YXRpYyBnZXQgQ29ybmVyKCkge1xuICAgIHJldHVybiBDb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTWVudUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTWVudUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENNZW51QWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiBmYWxzZSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gZmFsc2UsXG4gICAgICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldDogKCkgPT4ge30sXG4gICAgICBnZXRJbm5lckRpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBoYXNBbmNob3I6ICgpID0+IGZhbHNlLFxuICAgICAgZ2V0QW5jaG9yRGltZW5zaW9uczogKCkgPT4gKHt9KSxcbiAgICAgIGdldFdpbmRvd0RpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBnZXROdW1iZXJPZkl0ZW1zOiAoKSA9PiAwLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZ2V0SW5kZXhGb3JFdmVudFRhcmdldDogKCkgPT4gMCxcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge30sXG4gICAgICBzYXZlRm9jdXM6ICgpID0+IHt9LFxuICAgICAgcmVzdG9yZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZmFsc2UsXG4gICAgICBmb2N1czogKCkgPT4ge30sXG4gICAgICBnZXRGb2N1c2VkSXRlbUluZGV4OiAoKSA9PiAtMSxcbiAgICAgIGZvY3VzSXRlbUF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IGZhbHNlLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiAoKSA9PiB7fSxcbiAgICAgIHNldFBvc2l0aW9uOiAoKSA9PiB7fSxcbiAgICAgIHNldE1heEhlaWdodDogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBybUF0dHJGb3JPcHRpb25BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIGFkZENsYXNzRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHshTURDTWVudUFkYXB0ZXJ9IGFkYXB0ZXIgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTWVudUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmNsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMua2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVLZXlib2FyZERvd25fKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMua2V5dXBIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5Ym9hcmRVcF8oZXZ0KTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2tfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IDA7XG4gICAgLyoqIEBwcml2YXRlIHsheyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9fSAqL1xuICAgIHRoaXMuZGltZW5zaW9uc187XG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pdGVtSGVpZ2h0XztcbiAgICAvKiogQHByaXZhdGUge0Nvcm5lcn0gKi9cbiAgICB0aGlzLmFuY2hvckNvcm5lcl8gPSBDb3JuZXIuVE9QX1NUQVJUO1xuICAgIC8qKiBAcHJpdmF0ZSB7QW5jaG9yTWFyZ2lufSAqL1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXyA9IHt0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDB9O1xuICAgIC8qKiBAcHJpdmF0ZSB7P0F1dG9MYXlvdXRNZWFzdXJlbWVudHN9ICovXG4gICAgdGhpcy5tZWFzdXJlc18gPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSAtMTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5xdWlja09wZW5fID0gZmFsc2U7XG5cbiAgICAvLyBBIGtleXVwIGV2ZW50IG9uIHRoZSBtZW51IG5lZWRzIHRvIGhhdmUgYSBjb3JyZXNwb25kaW5nIGtleWRvd25cbiAgICAvLyBldmVudCBvbiB0aGUgbWVudS4gSWYgdGhlIHVzZXIgb3BlbnMgdGhlIG1lbnUgd2l0aCBhIGtleWRvd24gZXZlbnQgb24gYVxuICAgIC8vIGJ1dHRvbiwgdGhlIG1lbnUgd2lsbCBvbmx5IGdldCB0aGUga2V5IHVwIGV2ZW50IGNhdXNpbmcgYnVnZ3kgYmVoYXZpb3Igd2l0aCBzZWxlY3RlZCBlbGVtZW50cy5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3Qge1JPT1QsIE9QRU59ID0gTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhST09UKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1JPT1R9IGNsYXNzIHJlcXVpcmVkIGluIHJvb3QgZWxlbWVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzTmVjZXNzYXJ5RG9tKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgRE9NIG5vZGVzIG1pc3NpbmcgaW4gJHtST09UfSBjb21wb25lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoT1BFTikpIHtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfKTtcbiAgICAvLyBDYW5jZWwgYW55IGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvbnMuXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXF1ZXN0SWRfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshQ29ybmVyfSBjb3JuZXIgRGVmYXVsdCBhbmNob3IgY29ybmVyIGFsaWdubWVudCBvZiB0b3AtbGVmdCBtZW51IGNvcm5lci5cbiAgICovXG4gIHNldEFuY2hvckNvcm5lcihjb3JuZXIpIHtcbiAgICB0aGlzLmFuY2hvckNvcm5lcl8gPSBjb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshQW5jaG9yTWFyZ2lufSBtYXJnaW4gNC1wbGV0IG9mIG1hcmdpbnMgZnJvbSBhbmNob3IuXG4gICAqL1xuICBzZXRBbmNob3JNYXJnaW4obWFyZ2luKSB7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLnRvcCA9IHR5cGVvZiBtYXJnaW4udG9wID09PSAnbnVtYmVyJyA/IG1hcmdpbi50b3AgOiAwO1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA9IHR5cGVvZiBtYXJnaW4ucmlnaHQgPT09ICdudW1iZXInID8gbWFyZ2luLnJpZ2h0IDogMDtcbiAgICB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tID0gdHlwZW9mIG1hcmdpbi5ib3R0b20gPT09ICdudW1iZXInID8gbWFyZ2luLmJvdHRvbSA6IDA7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQgPSB0eXBlb2YgbWFyZ2luLmxlZnQgPT09ICdudW1iZXInID8gbWFyZ2luLmxlZnQgOiAwO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gcmVtZW1iZXJTZWxlY3Rpb24gKi9cbiAgc2V0UmVtZW1iZXJTZWxlY3Rpb24ocmVtZW1iZXJTZWxlY3Rpb24pIHtcbiAgICB0aGlzLnJlbWVtYmVyU2VsZWN0aW9uXyA9IHJlbWVtYmVyU2VsZWN0aW9uO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleCgtMSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBxdWlja09wZW4gKi9cbiAgc2V0UXVpY2tPcGVuKHF1aWNrT3Blbikge1xuICAgIHRoaXMucXVpY2tPcGVuXyA9IHF1aWNrT3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9udW1iZXJ9IGZvY3VzSW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZvY3VzT25PcGVuXyhmb2N1c0luZGV4KSB7XG4gICAgaWYgKGZvY3VzSW5kZXggPT09IG51bGwpIHtcbiAgICAgIC8vIElmIHRoaXMgaW5zdGFuY2Ugb2YgTURDTWVudSByZW1lbWJlcnMgc2VsZWN0aW9ucywgYW5kIHRoZSB1c2VyIGhhc1xuICAgICAgLy8gbWFkZSBhIHNlbGVjdGlvbiwgdGhlbiBmb2N1cyB0aGUgbGFzdCBzZWxlY3RlZCBpdGVtXG4gICAgICBpZiAodGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gJiYgdGhpcy5zZWxlY3RlZEluZGV4XyA+PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXhfKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzKCk7XG4gICAgICAvLyBJZiB0aGF0IGRvZXNuJ3Qgd29yaywgZm9jdXMgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgY2xpY2tzIGFuZCBjYW5jZWwgdGhlIG1lbnUgaWYgbm90IGEgY2hpbGQgbGlzdC1pdGVtXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZURvY3VtZW50Q2xpY2tfKGV2dCkge1xuICAgIGxldCBlbCA9IGV2dC50YXJnZXQ7XG5cbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0SW5kZXhGb3JFdmVudFRhcmdldChlbCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNhbmNlbCgpO1xuICAgIHRoaXMuY2xvc2UoZXZ0KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIGtleXMgdGhhdCB3ZSB3YW50IHRvIHJlcGVhdCBvbiBob2xkICh0YWIgYW5kIGFycm93cykuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWJvYXJkRG93bl8oZXZ0KSB7XG4gICAgLy8gRG8gbm90aGluZyBpZiBBbHQsIEN0cmwgb3IgTWV0YSBhcmUgcHJlc3NlZC5cbiAgICBpZiAoZXZ0LmFsdEtleSB8fCBldnQuY3RybEtleSB8fCBldnQubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qge2tleUNvZGUsIGtleSwgc2hpZnRLZXl9ID0gZXZ0O1xuICAgIGNvbnN0IGlzVGFiID0ga2V5ID09PSAnVGFiJyB8fCBrZXlDb2RlID09PSA5O1xuICAgIGNvbnN0IGlzQXJyb3dVcCA9IGtleSA9PT0gJ0Fycm93VXAnIHx8IGtleUNvZGUgPT09IDM4O1xuICAgIGNvbnN0IGlzQXJyb3dEb3duID0ga2V5ID09PSAnQXJyb3dEb3duJyB8fCBrZXlDb2RlID09PSA0MDtcbiAgICBjb25zdCBpc1NwYWNlID0ga2V5ID09PSAnU3BhY2UnIHx8IGtleUNvZGUgPT09IDMyO1xuICAgIGNvbnN0IGlzRW50ZXIgPSBrZXkgPT09ICdFbnRlcicgfHwga2V5Q29kZSA9PT0gMTM7XG4gICAgLy8gVGhlIG1lbnUgbmVlZHMgdG8ga25vdyBpZiB0aGUga2V5ZG93biBldmVudCB3YXMgdHJpZ2dlcmVkIG9uIHRoZSBtZW51XG4gICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBpc0VudGVyIHx8IGlzU3BhY2U7XG5cbiAgICBjb25zdCBmb2N1c2VkSXRlbUluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZJdGVtcygpIC0gMTtcblxuICAgIGlmIChzaGlmdEtleSAmJiBpc1RhYiAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgobGFzdEl0ZW1JbmRleCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXNoaWZ0S2V5ICYmIGlzVGFiICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IGxhc3RJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBBcnJvd3tVcCxEb3dufSBhbmQgc3BhY2UgZG8gbm90IGNhdXNlIGluYWR2ZXJ0ZW50IHNjcm9sbGluZ1xuICAgIGlmIChpc0Fycm93VXAgfHwgaXNBcnJvd0Rvd24gfHwgaXNTcGFjZSkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyb3dVcCkge1xuICAgICAgaWYgKGZvY3VzZWRJdGVtSW5kZXggPT09IDAgfHwgdGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgobGFzdEl0ZW1JbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoZm9jdXNlZEl0ZW1JbmRleCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNBcnJvd0Rvd24pIHtcbiAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4ID09PSBsYXN0SXRlbUluZGV4IHx8IHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzZWRJdGVtSW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUga2V5cyB0aGF0IHdlIGRvbid0IHdhbnQgdG8gcmVwZWF0IG9uIGhvbGQgKEVudGVyLCBTcGFjZSwgRXNjYXBlKS5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlS2V5Ym9hcmRVcF8oZXZ0KSB7XG4gICAgLy8gRG8gbm90aGluZyBpZiBBbHQsIEN0cmwgb3IgTWV0YSBhcmUgcHJlc3NlZC5cbiAgICBpZiAoZXZ0LmFsdEtleSB8fCBldnQuY3RybEtleSB8fCBldnQubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qge2tleUNvZGUsIGtleX0gPSBldnQ7XG4gICAgY29uc3QgaXNFbnRlciA9IGtleSA9PT0gJ0VudGVyJyB8fCBrZXlDb2RlID09PSAxMztcbiAgICBjb25zdCBpc1NwYWNlID0ga2V5ID09PSAnU3BhY2UnIHx8IGtleUNvZGUgPT09IDMyO1xuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcblxuICAgIGlmIChpc0VudGVyIHx8IGlzU3BhY2UpIHtcbiAgICAgIC8vIElmIHRoZSBrZXlkb3duIGV2ZW50IGRpZG4ndCBvY2N1ciBvbiB0aGUgbWVudSwgdGhlbiBpdCBzaG91bGRcbiAgICAgIC8vIGRpc3JlZ2FyZCB0aGUgcG9zc2libGUgc2VsZWN0ZWQgZXZlbnQuXG4gICAgICBpZiAodGhpcy5rZXlEb3duV2l0aGluTWVudV8pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyhldnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNFc2NhcGUpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2FuY2VsKCk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlUG9zc2libGVTZWxlY3RlZF8oZXZ0KSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCwgc3RyaW5ncy5BUklBX0RJU0FCTEVEX0FUVFIpID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldEluZGV4Rm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCk7XG4gICAgaWYgKHRhcmdldEluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBEZWJvdW5jZSBtdWx0aXBsZSBzZWxlY3Rpb25zXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyA9IDA7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICBpZiAodGhpcy5yZW1lbWJlclNlbGVjdGlvbl8pIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4KHRhcmdldEluZGV4KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoe2luZGV4OiB0YXJnZXRJbmRleH0pO1xuICAgIH0sIG51bWJlcnMuU0VMRUNURURfVFJJR0dFUl9ERUxBWSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7QXV0b0xheW91dE1lYXN1cmVtZW50c30gTWVhc3VyZW1lbnRzIHVzZWQgdG8gcG9zaXRpb24gbWVudSBwb3B1cC5cbiAgICovXG4gIGdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfKCkge1xuICAgIGNvbnN0IGFuY2hvclJlY3QgPSB0aGlzLmFkYXB0ZXJfLmdldEFuY2hvckRpbWVuc2lvbnMoKTtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93RGltZW5zaW9ucygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXdwb3J0OiB2aWV3cG9ydCxcbiAgICAgIHZpZXdwb3J0RGlzdGFuY2U6IHtcbiAgICAgICAgdG9wOiBhbmNob3JSZWN0LnRvcCxcbiAgICAgICAgcmlnaHQ6IHZpZXdwb3J0LndpZHRoIC0gYW5jaG9yUmVjdC5yaWdodCxcbiAgICAgICAgbGVmdDogYW5jaG9yUmVjdC5sZWZ0LFxuICAgICAgICBib3R0b206IHZpZXdwb3J0LmhlaWdodCAtIGFuY2hvclJlY3QuYm90dG9tLFxuICAgICAgfSxcbiAgICAgIGFuY2hvckhlaWdodDogYW5jaG9yUmVjdC5oZWlnaHQsXG4gICAgICBhbmNob3JXaWR0aDogYW5jaG9yUmVjdC53aWR0aCxcbiAgICAgIG1lbnVIZWlnaHQ6IHRoaXMuZGltZW5zaW9uc18uaGVpZ2h0LFxuICAgICAgbWVudVdpZHRoOiB0aGlzLmRpbWVuc2lvbnNfLndpZHRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGNvcm5lciBvZiB0aGUgYW5jaG9yIGZyb20gd2hpY2ggdG8gYW5pbWF0ZSBhbmQgcG9zaXRpb24gdGhlIG1lbnUuXG4gICAqIEByZXR1cm4ge0Nvcm5lcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE9yaWdpbkNvcm5lcl8oKSB7XG4gICAgLy8gRGVmYXVsdHM6IG9wZW4gZnJvbSB0aGUgdG9wIGxlZnQuXG4gICAgbGV0IGNvcm5lciA9IENvcm5lci5UT1BfTEVGVDtcblxuICAgIGNvbnN0IHt2aWV3cG9ydERpc3RhbmNlLCBhbmNob3JIZWlnaHQsIGFuY2hvcldpZHRoLCBtZW51SGVpZ2h0LCBtZW51V2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCBhdmFpbGFibGVUb3AgPSBpc0JvdHRvbUFsaWduZWQgPyB2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCArIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b21cbiAgICAgIDogdmlld3BvcnREaXN0YW5jZS50b3AgKyB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgIGNvbnN0IGF2YWlsYWJsZUJvdHRvbSA9IGlzQm90dG9tQWxpZ25lZCA/IHZpZXdwb3J0RGlzdGFuY2UuYm90dG9tIC0gdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbVxuICAgICAgOiB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSArIGFuY2hvckhlaWdodCAtIHRoaXMuYW5jaG9yTWFyZ2luXy50b3A7XG5cbiAgICBjb25zdCB0b3BPdmVyZmxvdyA9IG1lbnVIZWlnaHQgLSBhdmFpbGFibGVUb3A7XG4gICAgY29uc3QgYm90dG9tT3ZlcmZsb3cgPSBtZW51SGVpZ2h0IC0gYXZhaWxhYmxlQm90dG9tO1xuICAgIGlmIChib3R0b21PdmVyZmxvdyA+IDAgJiYgdG9wT3ZlcmZsb3cgPCBib3R0b21PdmVyZmxvdykge1xuICAgICAgY29ybmVyIHw9IENvcm5lckJpdC5CT1RUT007XG4gICAgfVxuXG4gICAgY29uc3QgaXNSdGwgPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCk7XG4gICAgY29uc3QgaXNGbGlwUnRsID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuRkxJUF9SVEwpO1xuICAgIGNvbnN0IGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgPSBCb29sZWFuKHRoaXMuYW5jaG9yQ29ybmVyXyAmIENvcm5lckJpdC5SSUdIVCk7XG4gICAgY29uc3QgaXNBbGlnbmVkUmlnaHQgPSAoYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCAmJiAhaXNSdGwpIHx8XG4gICAgICAoIWF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgaXNGbGlwUnRsICYmIGlzUnRsKTtcbiAgICBjb25zdCBhdmFpbGFibGVMZWZ0ID0gaXNBbGlnbmVkUmlnaHQgPyB2aWV3cG9ydERpc3RhbmNlLmxlZnQgKyBhbmNob3JXaWR0aCArIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA6XG4gICAgICB2aWV3cG9ydERpc3RhbmNlLmxlZnQgKyB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcbiAgICBjb25zdCBhdmFpbGFibGVSaWdodCA9IGlzQWxpZ25lZFJpZ2h0ID8gdmlld3BvcnREaXN0YW5jZS5yaWdodCAtIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA6XG4gICAgICB2aWV3cG9ydERpc3RhbmNlLnJpZ2h0ICsgYW5jaG9yV2lkdGggLSB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcblxuICAgIGNvbnN0IGxlZnRPdmVyZmxvdyA9IG1lbnVXaWR0aCAtIGF2YWlsYWJsZUxlZnQ7XG4gICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG1lbnVXaWR0aCAtIGF2YWlsYWJsZVJpZ2h0O1xuXG4gICAgaWYgKChsZWZ0T3ZlcmZsb3cgPCAwICYmIGlzQWxpZ25lZFJpZ2h0ICYmIGlzUnRsKSB8fFxuICAgICAgICAoYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCAmJiAhaXNBbGlnbmVkUmlnaHQgJiYgbGVmdE92ZXJmbG93IDwgMCkgfHxcbiAgICAgICAgKHJpZ2h0T3ZlcmZsb3cgPiAwICYmIGxlZnRPdmVyZmxvdyA8IHJpZ2h0T3ZlcmZsb3cpKSB7XG4gICAgICBjb3JuZXIgfD0gQ29ybmVyQml0LlJJR0hUO1xuICAgIH1cblxuICAgIHJldHVybiBjb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IEhvcml6b250YWwgb2Zmc2V0IG9mIG1lbnUgb3JpZ2luIGNvcm5lciBmcm9tIGNvcnJlc3BvbmRpbmcgYW5jaG9yIGNvcm5lci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldEhvcml6b250YWxPcmlnaW5PZmZzZXRfKGNvcm5lcikge1xuICAgIGNvbnN0IHthbmNob3JXaWR0aH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICBjb25zdCBpc1JpZ2h0QWxpZ25lZCA9IEJvb2xlYW4oY29ybmVyICYgQ29ybmVyQml0LlJJR0hUKTtcbiAgICBjb25zdCBhdm9pZEhvcml6b250YWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuUklHSFQpO1xuICAgIGxldCB4ID0gMDtcbiAgICBpZiAoaXNSaWdodEFsaWduZWQpIHtcbiAgICAgIGNvbnN0IHJpZ2h0T2Zmc2V0ID0gYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA/IGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQgOiB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQ7XG4gICAgICB4ID0gcmlnaHRPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlZnRPZmZzZXQgPSBhdm9pZEhvcml6b250YWxPdmVybGFwID8gYW5jaG9yV2lkdGggLSB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOiB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcbiAgICAgIHggPSBsZWZ0T2Zmc2V0O1xuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Nvcm5lcn0gY29ybmVyIE9yaWdpbiBjb3JuZXIgb2YgdGhlIG1lbnUuXG4gICAqIEByZXR1cm4ge251bWJlcn0gVmVydGljYWwgb2Zmc2V0IG9mIG1lbnUgb3JpZ2luIGNvcm5lciBmcm9tIGNvcnJlc3BvbmRpbmcgYW5jaG9yIGNvcm5lci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFZlcnRpY2FsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpIHtcbiAgICBjb25zdCB7dmlld3BvcnQsIHZpZXdwb3J0RGlzdGFuY2UsIGFuY2hvckhlaWdodCwgbWVudUhlaWdodH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICBjb25zdCBpc0JvdHRvbUFsaWduZWQgPSBCb29sZWFuKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pO1xuICAgIGNvbnN0IHtNQVJHSU5fVE9fRURHRX0gPSBNRENNZW51Rm91bmRhdGlvbi5udW1iZXJzO1xuICAgIGNvbnN0IGF2b2lkVmVydGljYWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCBjYW5PdmVybGFwVmVydGljYWxseSA9ICFhdm9pZFZlcnRpY2FsT3ZlcmxhcDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBpZiAoaXNCb3R0b21BbGlnbmVkKSB7XG4gICAgICB5ID0gYXZvaWRWZXJ0aWNhbE92ZXJsYXAgPyBhbmNob3JIZWlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8udG9wIDogLXRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b207XG4gICAgICAvLyBhZGp1c3QgZm9yIHdoZW4gbWVudSBjYW4gb3ZlcmxhcCBhbmNob3IsIGJ1dCB0b28gdGFsbCB0byBiZSBhbGlnbmVkIHRvIGJvdHRvbVxuICAgICAgLy8gYW5jaG9yIGNvcm5lci4gQm90dG9tIG1hcmdpbiBpcyBpZ25vcmVkIGluIHN1Y2ggY2FzZXMuXG4gICAgICBpZiAoY2FuT3ZlcmxhcFZlcnRpY2FsbHkgJiYgbWVudUhlaWdodCA+IHZpZXdwb3J0RGlzdGFuY2UudG9wICsgYW5jaG9ySGVpZ2h0KSB7XG4gICAgICAgIHkgPSAtKE1hdGgubWluKG1lbnVIZWlnaHQsIHZpZXdwb3J0LmhlaWdodCAtIE1BUkdJTl9UT19FREdFKSAtICh2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gYXZvaWRWZXJ0aWNhbE92ZXJsYXAgPyAoYW5jaG9ySGVpZ2h0ICsgdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbSkgOiB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgICAgLy8gYWRqdXN0IGZvciB3aGVuIG1lbnUgY2FuIG92ZXJsYXAgYW5jaG9yLCBidXQgdG9vIHRhbGwgdG8gYmUgYWxpZ25lZCB0byB0b3BcbiAgICAgIC8vIGFuY2hvciBjb3JuZXJzLiBUb3AgbWFyZ2luIGlzIGlnbm9yZWQgaW4gdGhhdCBjYXNlLlxuICAgICAgaWYgKGNhbk92ZXJsYXBWZXJ0aWNhbGx5ICYmIG1lbnVIZWlnaHQgPiB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSArIGFuY2hvckhlaWdodCkge1xuICAgICAgICB5ID0gLShNYXRoLm1pbihtZW51SGVpZ2h0LCB2aWV3cG9ydC5oZWlnaHQgLSBNQVJHSU5fVE9fRURHRSkgLSAodmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IE1heGltdW0gaGVpZ2h0IG9mIHRoZSBtZW51LCBiYXNlZCBvbiBhdmFpbGFibGUgc3BhY2UuIDAgaW5kaWNhdGVzIHNob3VsZCBub3QgYmUgc2V0LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWVudU1heEhlaWdodF8oY29ybmVyKSB7XG4gICAgbGV0IG1heEhlaWdodCA9IDA7XG4gICAgY29uc3Qge3ZpZXdwb3J0RGlzdGFuY2V9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbihjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKTtcblxuICAgIC8vIFdoZW4gbWF4aW11bSBoZWlnaHQgaXMgbm90IHNwZWNpZmllZCwgaXQgaXMgaGFuZGxlZCBmcm9tIGNzcy5cbiAgICBpZiAodGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSkge1xuICAgICAgaWYgKGlzQm90dG9tQWxpZ25lZCkge1xuICAgICAgICBtYXhIZWlnaHQgPSB2aWV3cG9ydERpc3RhbmNlLnRvcCArIHRoaXMuYW5jaG9yTWFyZ2luXy50b3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXhIZWlnaHQgPSB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSAtIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b207XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heEhlaWdodDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhdXRvUG9zaXRpb25fKCkge1xuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNBbmNob3IoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgbWVhc3VyZW1lbnRzIGZvciBhdXRvcG9zaXRpb24gbWV0aG9kcyByZXVzZS5cbiAgICB0aGlzLm1lYXN1cmVzXyA9IHRoaXMuZ2V0QXV0b0xheW91dE1lYXN1cmVtZW50c18oKTtcblxuICAgIGNvbnN0IGNvcm5lciA9IHRoaXMuZ2V0T3JpZ2luQ29ybmVyXygpO1xuICAgIGNvbnN0IG1heE1lbnVIZWlnaHQgPSB0aGlzLmdldE1lbnVNYXhIZWlnaHRfKGNvcm5lcik7XG4gICAgbGV0IHZlcnRpY2FsQWxpZ25tZW50ID0gKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICBsZXQgaG9yaXpvbnRhbEFsaWdubWVudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuUklHSFQpID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICBjb25zdCBob3Jpem9udGFsT2Zmc2V0ID0gdGhpcy5nZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpO1xuICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID0gdGhpcy5nZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8oY29ybmVyKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgICAgIFtob3Jpem9udGFsQWxpZ25tZW50XTogaG9yaXpvbnRhbE9mZnNldCA/IGhvcml6b250YWxPZmZzZXQgKyAncHgnIDogJzAnLFxuICAgICAgW3ZlcnRpY2FsQWxpZ25tZW50XTogdmVydGljYWxPZmZzZXQgPyB2ZXJ0aWNhbE9mZnNldCArICdweCcgOiAnMCcsXG4gICAgfTtcbiAgICBjb25zdCB7YW5jaG9yV2lkdGgsIG1lbnVIZWlnaHQsIG1lbnVXaWR0aH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICAvLyBDZW50ZXIgYWxpZ24gd2hlbiBhbmNob3Igd2lkdGggaXMgY29tcGFyYWJsZSBvciBncmVhdGVyIHRoYW4gbWVudSwgb3RoZXJ3aXNlIGtlZXAgY29ybmVyLlxuICAgIGlmIChhbmNob3JXaWR0aCAvIG1lbnVXaWR0aCA+IG51bWJlcnMuQU5DSE9SX1RPX01FTlVfV0lEVEhfUkFUSU8pIHtcbiAgICAgIGhvcml6b250YWxBbGlnbm1lbnQgPSAnY2VudGVyJztcbiAgICB9XG5cbiAgICAvLyBBZGp1c3QgdmVydGljYWwgb3JpZ2luIHdoZW4gbWVudSBpcyBwb3NpdGlvbmVkIHdpdGggc2lnbmlmaWNhbnQgb2Zmc2V0IGZyb20gYW5jaG9yLiBUaGlzIGlzIGRvbmUgc28gdGhhdFxuICAgIC8vIHNjYWxlIGFuaW1hdGlvbiBpcyBcImFuY2hvcmVkXCIgb24gdGhlIGFuY2hvci5cbiAgICBpZiAoISh0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKSAmJlxuICAgICAgICBNYXRoLmFicyh2ZXJ0aWNhbE9mZnNldCAvIG1lbnVIZWlnaHQpID4gbnVtYmVycy5PRkZTRVRfVE9fTUVOVV9IRUlHSFRfUkFUSU8pIHtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0UGVyY2VudCA9IE1hdGguYWJzKHZlcnRpY2FsT2Zmc2V0IC8gbWVudUhlaWdodCkgKiAxMDA7XG4gICAgICBjb25zdCBvcmlnaW5QZXJjZW50ID0gKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pID8gMTAwIC0gdmVydGljYWxPZmZzZXRQZXJjZW50IDogdmVydGljYWxPZmZzZXRQZXJjZW50O1xuICAgICAgdmVydGljYWxBbGlnbm1lbnQgPSBNYXRoLnJvdW5kKG9yaWdpblBlcmNlbnQgKiAxMDApIC8gMTAwICsgJyUnO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0VHJhbnNmb3JtT3JpZ2luKGAke2hvcml6b250YWxBbGlnbm1lbnR9ICR7dmVydGljYWxBbGlnbm1lbnR9YCk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNYXhIZWlnaHQobWF4TWVudUhlaWdodCA/IG1heE1lbnVIZWlnaHQgKyAncHgnIDogJycpO1xuXG4gICAgLy8gQ2xlYXIgbWVhc3VyZXMgYWZ0ZXIgcG9zaXRpb25pbmcgaXMgY29tcGxldGUuXG4gICAgdGhpcy5tZWFzdXJlc18gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIG1lbnUuXG4gICAqIEBwYXJhbSB7e2ZvY3VzSW5kZXg6ID9udW1iZXJ9PX0gb3B0aW9uc1xuICAgKi9cbiAgb3Blbih7Zm9jdXNJbmRleCA9IG51bGx9ID0ge30pIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNhdmVGb2N1cygpO1xuXG4gICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfT1BFTik7XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpb25SZXF1ZXN0SWRfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuZGltZW5zaW9uc18gPSB0aGlzLmFkYXB0ZXJfLmdldElubmVyRGltZW5zaW9ucygpO1xuICAgICAgdGhpcy5hdXRvUG9zaXRpb25fKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gICAgICB0aGlzLmZvY3VzT25PcGVuXyhmb2N1c0luZGV4KTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyKHRoaXMuZG9jdW1lbnRDbGlja0hhbmRsZXJfKTtcbiAgICAgIGlmICghdGhpcy5xdWlja09wZW5fKSB7XG4gICAgICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfT1BFTik7XG4gICAgICAgIH0sIG51bWJlcnMuVFJBTlNJVElPTl9PUEVOX0RVUkFUSU9OKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbWVudS5cbiAgICogQHBhcmFtIHtFdmVudD19IGV2dFxuICAgKi9cbiAgY2xvc2UoZXZ0ID0gbnVsbCkge1xuICAgIGNvbnN0IHRhcmdldElzRGlzYWJsZWQgPSBldnQgP1xuICAgICAgdGhpcy5hZGFwdGVyXy5nZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldChldnQudGFyZ2V0LCBzdHJpbmdzLkFSSUFfRElTQUJMRURfQVRUUikgPT09ICd0cnVlJyA6XG4gICAgICBmYWxzZTtcblxuICAgIGlmICh0YXJnZXRJc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG5cbiAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElOR19DTE9TRUQpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gICAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfQ0xPU0VEKTtcbiAgICAgICAgfSwgbnVtYmVycy5UUkFOU0lUSU9OX0NMT1NFX0RVUkFUSU9OKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlc3RvcmVGb2N1cygpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW5fO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0U2VsZWN0ZWRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggb2YgdGhlIGl0ZW0gdG8gc2V0IGFzIHNlbGVjdGVkLlxuICAgKi9cbiAgc2V0U2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4Xykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZTZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgICBpZiAocHJldlNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUF0dHJGb3JPcHRpb25BdEluZGV4KHByZXZTZWxlY3RlZEluZGV4LCAnYXJpYS1zZWxlY3RlZCcpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUNsYXNzRm9yT3B0aW9uQXRJbmRleChwcmV2U2VsZWN0ZWRJbmRleCwgY3NzQ2xhc3Nlcy5TRUxFQ1RFRF9MSVNUX0lURU0pO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZkl0ZW1zKCkgPyBpbmRleCA6IC0xO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgY3NzQ2xhc3Nlcy5TRUxFQ1RFRF9MSVNUX0lURU0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge01EQ01lbnVGb3VuZGF0aW9uLCBBbmNob3JNYXJnaW59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEB0eXBlIHtzdHJpbmd8dW5kZWZpbmVkfSAqL1xubGV0IHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY29ycmVjdCB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gdXNlIG9uIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiBAcGFyYW0geyFXaW5kb3d9IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldFRyYW5zZm9ybVByb3BlcnR5TmFtZShnbG9iYWxPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgY29uc3QgZWwgPSBnbG9iYWxPYmouZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdHJhbnNmb3JtUHJvcGVydHlOYW1lID0gKCd0cmFuc2Zvcm0nIGluIGVsLnN0eWxlID8gJ3RyYW5zZm9ybScgOiAnd2Via2l0VHJhbnNmb3JtJyk7XG4gICAgc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9IHRyYW5zZm9ybVByb3BlcnR5TmFtZTtcbiAgfVxuXG4gIHJldHVybiBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xufVxuXG4vKipcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gdGhlIG1pbmltdW0gYW5kIHRoZSBtYXhpbXVtLCByZXR1cm5pbmcgdGhlIGNsYW1wZWQgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiA9IDAsIG1heCA9IDEpIHtcbiAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2YWx1ZSkpO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZWFzaW5nIHZhbHVlIHRvIGFwcGx5IGF0IHRpbWUgdCwgZm9yIGEgZ2l2ZW4gY3ViaWMgYmV6aWVyIGN1cnZlLlxuICogQ29udHJvbCBwb2ludHMgUDAgYW5kIFAzIGFyZSBhc3N1bWVkIHRvIGJlICgwLDApIGFuZCAoMSwxKSwgcmVzcGVjdGl2ZWx5LlxuICogUGFyYW1ldGVycyBhcmUgYXMgZm9sbG93czpcbiAqIC0gdGltZTogVGhlIGN1cnJlbnQgdGltZSBpbiB0aGUgYW5pbWF0aW9uLCBzY2FsZWQgYmV0d2VlbiAwIGFuZCAxLlxuICogLSB4MTogVGhlIHggdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMS5cbiAqIC0geTE6IFRoZSB5IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDEuXG4gKiAtIHgyOiBUaGUgeCB2YWx1ZSBvZiBjb250cm9sIHBvaW50IFAyLlxuICogLSB5MjogVGhlIHkgdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMi5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gKiBAcGFyYW0ge251bWJlcn0geDFcbiAqIEBwYXJhbSB7bnVtYmVyfSB5MVxuICogQHBhcmFtIHtudW1iZXJ9IHgyXG4gKiBAcGFyYW0ge251bWJlcn0geTJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gYmV6aWVyUHJvZ3Jlc3ModGltZSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgcmV0dXJuIGdldEJlemllckNvb3JkaW5hdGVfKHNvbHZlUG9zaXRpb25Gcm9tWFZhbHVlXyh0aW1lLCB4MSwgeDIpLCB5MSwgeTIpO1xufVxuXG4vKipcbiAqIENvbXB1dGUgYSBzaW5nbGUgY29vcmRpbmF0ZSBhdCBhIHBvc2l0aW9uIHBvaW50IGJldHdlZW4gMCBhbmQgMS5cbiAqIGMxIGFuZCBjMiBhcmUgdGhlIG1hdGNoaW5nIGNvb3JkaW5hdGUgb24gY29udHJvbCBwb2ludHMgUDEgYW5kIFAyLCByZXNwZWN0aXZlbHkuXG4gKiBDb250cm9sIHBvaW50cyBQMCBhbmQgUDMgYXJlIGFzc3VtZWQgdG8gYmUgKDAsMCkgYW5kICgxLDEpLCByZXNwZWN0aXZlbHkuXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWxpYnJhcnkvYmxvYi9tYXN0ZXIvY2xvc3VyZS9nb29nL21hdGgvYmV6aWVyLmpzLlxuICogQHBhcmFtIHtudW1iZXJ9IHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMVxuICogQHBhcmFtIHtudW1iZXJ9IGMyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldEJlemllckNvb3JkaW5hdGVfKHQsIGMxLCBjMikge1xuICAvLyBTcGVjaWFsIGNhc2Ugc3RhcnQgYW5kIGVuZC5cbiAgaWYgKHQgPT09IDAgfHwgdCA9PT0gMSkge1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgLy8gU3RlcCBvbmUgLSBmcm9tIDQgcG9pbnRzIHRvIDNcbiAgbGV0IGljMCA9IHQgKiBjMTtcbiAgbGV0IGljMSA9IGMxICsgdCAqIChjMiAtIGMxKTtcbiAgY29uc3QgaWMyID0gYzIgKyB0ICogKDEgLSBjMik7XG5cbiAgLy8gU3RlcCB0d28gLSBmcm9tIDMgcG9pbnRzIHRvIDJcbiAgaWMwICs9IHQgKiAoaWMxIC0gaWMwKTtcbiAgaWMxICs9IHQgKiAoaWMyIC0gaWMxKTtcblxuICAvLyBGaW5hbCBzdGVwIC0gbGFzdCBwb2ludFxuICByZXR1cm4gaWMwICsgdCAqIChpYzEgLSBpYzApO1xufVxuXG4vKipcbiAqIFByb2plY3QgYSBwb2ludCBvbnRvIHRoZSBCZXppZXIgY3VydmUsIGZyb20gYSBnaXZlbiBYLiBDYWxjdWxhdGVzIHRoZSBwb3NpdGlvbiB0IGFsb25nIHRoZSBjdXJ2ZS5cbiAqIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtbGlicmFyeS9ibG9iL21hc3Rlci9jbG9zdXJlL2dvb2cvbWF0aC9iZXppZXIuanMuXG4gKiBAcGFyYW0ge251bWJlcn0geFZhbFxuICogQHBhcmFtIHtudW1iZXJ9IHgxXG4gKiBAcGFyYW0ge251bWJlcn0geDJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc29sdmVQb3NpdGlvbkZyb21YVmFsdWVfKHhWYWwsIHgxLCB4Mikge1xuICBjb25zdCBFUFNJTE9OID0gMWUtNjtcbiAgY29uc3QgTUFYX0lURVJBVElPTlMgPSA4O1xuXG4gIGlmICh4VmFsIDw9IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmICh4VmFsID49IDEpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIEluaXRpYWwgZXN0aW1hdGUgb2YgdCB1c2luZyBsaW5lYXIgaW50ZXJwb2xhdGlvbi5cbiAgbGV0IHQgPSB4VmFsO1xuXG4gIC8vIFRyeSBncmFkaWVudCBkZXNjZW50IHRvIHNvbHZlIGZvciB0LiBJZiBpdCB3b3JrcywgaXQgaXMgdmVyeSBmYXN0LlxuICBsZXQgdE1pbiA9IDA7XG4gIGxldCB0TWF4ID0gMTtcbiAgbGV0IHZhbHVlID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfSVRFUkFUSU9OUzsgaSsrKSB7XG4gICAgdmFsdWUgPSBnZXRCZXppZXJDb29yZGluYXRlXyh0LCB4MSwgeDIpO1xuICAgIGNvbnN0IGRlcml2YXRpdmUgPSAoZ2V0QmV6aWVyQ29vcmRpbmF0ZV8odCArIEVQU0lMT04sIHgxLCB4MikgLSB2YWx1ZSkgLyBFUFNJTE9OO1xuICAgIGlmIChNYXRoLmFicyh2YWx1ZSAtIHhWYWwpIDwgRVBTSUxPTikge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IEVQU0lMT04pIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPCB4VmFsKSB7XG4gICAgICAgIHRNaW4gPSB0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdE1heCA9IHQ7XG4gICAgICB9XG4gICAgICB0IC09ICh2YWx1ZSAtIHhWYWwpIC8gZGVyaXZhdGl2ZTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB0aGUgZ3JhZGllbnQgZGVzY2VudCBnb3Qgc3R1Y2sgaW4gYSBsb2NhbCBtaW5pbXVtLCBlLmcuIGJlY2F1c2VcbiAgLy8gdGhlIGRlcml2YXRpdmUgd2FzIGNsb3NlIHRvIDAsIHVzZSBhIERpY2hvdG9teSByZWZpbmVtZW50IGluc3RlYWQuXG4gIC8vIFdlIGxpbWl0IHRoZSBudW1iZXIgb2YgaW50ZXJhdGlvbnMgdG8gOC5cbiAgZm9yIChsZXQgaSA9IDA7IE1hdGguYWJzKHZhbHVlIC0geFZhbCkgPiBFUFNJTE9OICYmIGkgPCBNQVhfSVRFUkFUSU9OUzsgaSsrKSB7XG4gICAgaWYgKHZhbHVlIDwgeFZhbCkge1xuICAgICAgdE1pbiA9IHQ7XG4gICAgICB0ID0gKHQgKyB0TWF4KSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRNYXggPSB0O1xuICAgICAgdCA9ICh0ICsgdE1pbikgLyAyO1xuICAgIH1cbiAgICB2YWx1ZSA9IGdldEJlemllckNvb3JkaW5hdGVfKHQsIHgxLCB4Mik7XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCB7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lLCBjbGFtcCwgYmV6aWVyUHJvZ3Jlc3N9O1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHJlZj1cInJvb3RcIiBjbGFzcz1cIm1kYy1tZW51IG1kYy1zaW1wbGUtbWVudVwiXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIDpzdHlsZT1cInN0eWxlc1wiIFxuICAgIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8dWwgcmVmPVwiaXRlbXNcIiBjbGFzcz1cIm1kYy1zaW1wbGUtbWVudV9faXRlbXMgbWRjLWxpc3RcIiBcbiAgICAgIHJvbGU9XCJtZW51XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHtNRENNZW51Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL21lbnUvZm91bmRhdGlvbidcbmltcG9ydCB7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lfSBmcm9tICdAbWF0ZXJpYWwvbWVudS91dGlsJ1xuaW1wb3J0IHtlbWl0Q3VzdG9tRXZlbnR9IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tZW51JyxcbiAgcHJvcHM6IHtcbiAgICAnb3Blbi1mcm9tLXRvcC1sZWZ0JzogQm9vbGVhbixcbiAgICAnb3Blbi1mcm9tLXRvcC1yaWdodCc6IEJvb2xlYW4sXG4gICAgJ29wZW4tZnJvbS1ib3R0b20tbGVmdCc6IEJvb2xlYW4sXG4gICAgJ29wZW4tZnJvbS1ib3R0b20tcmlnaHQnOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtc2ltcGxlLW1lbnUtLW9wZW4tZnJvbS10b3AtbGVmdCc6IHRoaXMub3BlbkZyb21Ub3BMZWZ0LFxuICAgICAgICAnbWRjLXNpbXBsZS1tZW51LS1vcGVuLWZyb20tdG9wLXJpZ2h0JzogdGhpcy5vcGVuRnJvbVRvcFJpZ2h0LFxuICAgICAgICAnbWRjLXNpbXBsZS1tZW51LS1vcGVuLWZyb20tYm90dG9tLWxlZnQnOiB0aGlzLm9wZW5Gcm9tQm90dG9tTGVmdCxcbiAgICAgICAgJ21kYy1zaW1wbGUtbWVudS0tb3Blbi1mcm9tLWJvdHRvbS1yaWdodCc6IHRoaXMub3BlbkZyb21Cb3R0b21SaWdodFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge30sXG4gICAgICBpdGVtczogW11cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzaG93IChvcHRpb25zKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24ub3BlbihvcHRpb25zKVxuICAgIH0sXG4gICAgaGlkZSAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxuICAgIH0sXG4gICAgaXNPcGVuICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb24gPyB0aGlzLmZvdW5kYXRpb24uaXNPcGVuKCkgOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgY29uc3QgcmVmcmVzaEl0ZW1zID0gKCkgPT4ge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgICAgIHRoaXMuJHJlZnMuaXRlbXMucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1saXN0LWl0ZW1bcm9sZV0nKSlcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZScpXG4gICAgfVxuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gcmVmcmVzaEl0ZW1zKCkpXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcblxuICAgIHRoaXMuX3ByZXZpb3VzRm9jdXMgPSB1bmRlZmluZWRcblxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENNZW51Rm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuJHJlZnMucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gQm9vbGVhbih0aGlzLiRyZWZzLml0ZW1zKSxcbiAgICAgIGdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSA9PlxuICAgICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiAoe1xuICAgICAgICB3aWR0aDogdGhpcy4kcmVmcy5pdGVtcy5vZmZzZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLiRyZWZzLml0ZW1zLm9mZnNldEhlaWdodFxuICAgICAgfSksXG4gICAgICBoYXNBbmNob3I6ICgpID0+IHRoaXMuJHJlZnMucm9vdC5wYXJlbnRFbGVtZW50ICYmXG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWRjLW1lbnUtYW5jaG9yJyksXG4gICAgICBnZXRBbmNob3JEaW1lbnNpb25zOiAoKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd0RpbWVuc2lvbnM6ICgpID0+ICh7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIH0pLFxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gdGhpcy5pdGVtcy5sZW5ndGgsXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IChoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBnZXRJbmRleEZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiB0aGlzLml0ZW1zLmluZGV4T2YodGFyZ2V0KSxcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoZXZ0RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgICAgaW5kZXg6IGV2dERhdGEuaW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtc1tldnREYXRhLmluZGV4XVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIGV2dClcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsXG4gICAgICAgICAgZXZ0KVxuICAgICAgfSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQodGhpcy4kZWwsXG4gICAgICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsXG4gICAgICAgICAge30pXG4gICAgICB9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7IHRoaXMuX3ByZXZpb3VzRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzRm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5yb290LFxuICAgICAgZm9jdXM6ICgpID0+IHRoaXMuJHJlZnMucm9vdC5mb2N1cygpLFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gdGhpcy5pdGVtcy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgZm9jdXNJdGVtQXRJbmRleDogKGluZGV4KSA9PiB0aGlzLml0ZW1zW2luZGV4XS5mb2N1cygpLFxuICAgICAgaXNSdGw6ICgpID0+IGdldENvbXB1dGVkU3R5bGUodGhpcy4kcmVmcy5yb290KVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiAob3JpZ2luKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgYCR7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKHdpbmRvdyl9LW9yaWdpbmAsIG9yaWdpbilcbiAgICAgIH0sXG4gICAgICBzZXRQb3NpdGlvbjogKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywnbGVmdCcsIHBvc2l0aW9uLmxlZnQpXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywncmlnaHQnLCBwb3NpdGlvbi5yaWdodClcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCd0b3AnLCBwb3NpdGlvbi50b3ApXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywnYm90dG9tJywgcG9zaXRpb24uYm90dG9tKVxuICAgICAgfSxcbiAgICAgIHNldE1heEhlaWdodDogKGhlaWdodCkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsJ21heC1oZWlnaHQnLCBoZWlnaHQpXG4gICAgICB9LFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIHJtQXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0cikgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoYXR0cilcbiAgICAgIH0sXG4gICAgICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIHJtQ2xhc3NGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJlZnJlc2hJdGVtcygpXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gbnVsbFxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCB7TURDRm91bmRhdGlvbiwgTURDQ29tcG9uZW50fTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQk9UVE9NX0xJTkU6ICdtZGMtc2VsZWN0X19ib3R0b20tbGluZScsXG4gIEJPVFRPTV9MSU5FX0FDVElWRTogJ21kYy1zZWxlY3RfX2JvdHRvbS1saW5lLS1hY3RpdmUnLFxuICBCT1g6ICdtZGMtc2VsZWN0LS1ib3gnLFxuICBESVNBQkxFRDogJ21kYy1zZWxlY3QtLWRpc2FibGVkJyxcbiAgT1BFTjogJ21kYy1zZWxlY3QtLW9wZW4nLFxuICBST09UOiAnbWRjLXNlbGVjdCcsXG4gIFNDUk9MTF9MT0NLOiAnbWRjLXNlbGVjdC1zY3JvbGwtbG9jaycsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgQ0hBTkdFX0VWRU5UOiAnTURDU2VsZWN0OmNoYW5nZScsXG4gIEJPVFRPTV9MSU5FX1NFTEVDVE9SOiAnLm1kYy1zZWxlY3RfX2JvdHRvbS1saW5lJyxcbiAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fbGFiZWwnLFxuICBNRU5VX1NFTEVDVE9SOiAnLm1kYy1zZWxlY3RfX21lbnUnLFxuICBTVVJGQUNFX1NFTEVDVE9SOiAnLm1kYy1zZWxlY3RfX3N1cmZhY2UnLFxuICBTRUxFQ1RFRF9URVhUX1NFTEVDVE9SOiAnLm1kYy1zZWxlY3RfX3NlbGVjdGVkLXRleHQnLFxufTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQge2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZX0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7TURDTWVudUZvdW5kYXRpb24sIEFuY2hvck1hcmdpbn0gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCB7Q29ybmVyLCBDb3JuZXJCaXR9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ01lbnVGb3VuZGF0aW9uPlxuICovXG5jbGFzcyBNRENNZW51IGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgLyoqIEBwYXJhbSB7Li4uP30gYXJncyAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgLyoqIEBwcml2YXRlIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzRm9jdXNfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ01lbnV9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDTWVudShyb290KTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5pc09wZW4oKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlICovXG4gIHNldCBvcGVuKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb25fLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge3tmb2N1c0luZGV4OiA/bnVtYmVyfT19IG9wdGlvbnMgKi9cbiAgc2hvdyh7Zm9jdXNJbmRleCA9IG51bGx9ID0ge30pIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLm9wZW4oe2ZvY3VzSW5kZXg6IGZvY3VzSW5kZXh9KTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgRGVmYXVsdCBhbmNob3IgY29ybmVyIGFsaWdubWVudCBvZiB0b3AtbGVmdFxuICAgKiAgICAgbWVudSBjb3JuZXIuXG4gICAqL1xuICBzZXRBbmNob3JDb3JuZXIoY29ybmVyKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRBbmNob3JDb3JuZXIoY29ybmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FuY2hvck1hcmdpbn0gbWFyZ2luXG4gICAqL1xuICBzZXRBbmNob3JNYXJnaW4obWFyZ2luKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRBbmNob3JNYXJnaW4obWFyZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGl0ZW0gY29udGFpbmVyIGVsZW1lbnQgaW5zaWRlIHRoZSBjb21wb25lbnQuXG4gICAqIEByZXR1cm4gez9FbGVtZW50fVxuICAgKi9cbiAgZ2V0IGl0ZW1zQ29udGFpbmVyXygpIHtcbiAgICByZXR1cm4gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuSVRFTVNfU0VMRUNUT1IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgaXRlbXMgd2l0aGluIHRoZSBtZW51LiBOb3RlIHRoYXQgdGhpcyBvbmx5IGNvbnRhaW5zIHRoZSBzZXQgb2YgZWxlbWVudHMgd2l0aGluXG4gICAqIHRoZSBpdGVtcyBjb250YWluZXIgdGhhdCBhcmUgcHJvcGVyIGxpc3QgaXRlbXMsIGFuZCBub3Qgc3VwcGxlbWVudGFsIC8gcHJlc2VudGF0aW9uYWwgRE9NXG4gICAqIGVsZW1lbnRzLlxuICAgKiBAcmV0dXJuIHshQXJyYXk8IUVsZW1lbnQ+fVxuICAgKi9cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIGNvbnN0IHtpdGVtc0NvbnRhaW5lcl86IGl0ZW1zQ29udGFpbmVyfSA9IHRoaXM7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoaXRlbXNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1saXN0LWl0ZW1bcm9sZV0nKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBpdGVtIHdpdGhpbiB0aGUgbWVudSB0aGF0IGlzIHNlbGVjdGVkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHJldHVybiB7P0VsZW1lbnR9XG4gICAqL1xuICBnZXRPcHRpb25CeUluZGV4KGluZGV4KSB7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xuXG4gICAgaWYgKGluZGV4IDwgaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gaW5kZXggKi9cbiAgc2V0IHNlbGVjdGVkSXRlbUluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRTZWxlY3RlZEluZGV4KGluZGV4KTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldCBzZWxlY3RlZEl0ZW1JbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5nZXRTZWxlY3RlZEluZGV4KCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHshYm9vbGVhbn0gcmVtZW1iZXJTZWxlY3Rpb24gKi9cbiAgc2V0IHJlbWVtYmVyU2VsZWN0aW9uKHJlbWVtYmVyU2VsZWN0aW9uKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRSZW1lbWJlclNlbGVjdGlvbihyZW1lbWJlclNlbGVjdGlvbik7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBxdWlja09wZW4gKi9cbiAgc2V0IHF1aWNrT3BlbihxdWlja09wZW4pIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFF1aWNrT3BlbihxdWlja09wZW4pO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENNZW51Rm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENNZW51Rm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gQm9vbGVhbih0aGlzLml0ZW1zQ29udGFpbmVyXyksXG4gICAgICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldDogKHRhcmdldCwgYXR0cmlidXRlTmFtZSkgPT4gdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSxcbiAgICAgIGdldElubmVyRGltZW5zaW9uczogKCkgPT4ge1xuICAgICAgICBjb25zdCB7aXRlbXNDb250YWluZXJfOiBpdGVtc0NvbnRhaW5lcn0gPSB0aGlzO1xuICAgICAgICByZXR1cm4ge3dpZHRoOiBpdGVtc0NvbnRhaW5lci5vZmZzZXRXaWR0aCwgaGVpZ2h0OiBpdGVtc0NvbnRhaW5lci5vZmZzZXRIZWlnaHR9O1xuICAgICAgfSxcbiAgICAgIGhhc0FuY2hvcjogKCkgPT4gdGhpcy5yb290Xy5wYXJlbnRFbGVtZW50ICYmIHRoaXMucm9vdF8ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1tZW51LWFuY2hvcicpLFxuICAgICAgZ2V0QW5jaG9yRGltZW5zaW9uczogKCkgPT4gdGhpcy5yb290Xy5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgZ2V0V2luZG93RGltZW5zaW9uczogKCkgPT4ge1xuICAgICAgICByZXR1cm4ge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9O1xuICAgICAgfSxcbiAgICAgIGdldE51bWJlck9mSXRlbXM6ICgpID0+IHRoaXMuaXRlbXMubGVuZ3RoLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4gdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoaGFuZGxlcikgPT4gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IChoYW5kbGVyKSA9PiBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBnZXRJbmRleEZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiB0aGlzLml0ZW1zLmluZGV4T2YodGFyZ2V0KSxcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoZXZ0RGF0YSkgPT4gdGhpcy5lbWl0KE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsIHtcbiAgICAgICAgaW5kZXg6IGV2dERhdGEuaW5kZXgsXG4gICAgICAgIGl0ZW06IHRoaXMuaXRlbXNbZXZ0RGF0YS5pbmRleF0sXG4gICAgICB9KSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4gdGhpcy5lbWl0KE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuQ0FOQ0VMX0VWRU5ULCB7fSksXG4gICAgICBzYXZlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aW91c0ZvY3VzXyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgcmVzdG9yZUZvY3VzOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzRm9jdXNfKSB7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c0ZvY3VzXy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNGb2N1c2VkOiAoKSA9PiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnJvb3RfLFxuICAgICAgZm9jdXM6ICgpID0+IHRoaXMucm9vdF8uZm9jdXMoKSxcbiAgICAgIGdldEZvY3VzZWRJdGVtSW5kZXg6ICgpID0+IHRoaXMuaXRlbXMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcbiAgICAgIGZvY3VzSXRlbUF0SW5kZXg6IChpbmRleCkgPT4gdGhpcy5pdGVtc1tpbmRleF0uZm9jdXMoKSxcbiAgICAgIGlzUnRsOiAoKSA9PiBnZXRDb21wdXRlZFN0eWxlKHRoaXMucm9vdF8pLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PSAncnRsJyxcbiAgICAgIHNldFRyYW5zZm9ybU9yaWdpbjogKG9yaWdpbikgPT4ge1xuICAgICAgICB0aGlzLnJvb3RfLnN0eWxlW2Ake2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZSh3aW5kb3cpfS1vcmlnaW5gXSA9IG9yaWdpbjtcbiAgICAgIH0sXG4gICAgICBzZXRQb3NpdGlvbjogKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMucm9vdF8uc3R5bGUubGVmdCA9ICdsZWZ0JyBpbiBwb3NpdGlvbiA/IHBvc2l0aW9uLmxlZnQgOiBudWxsO1xuICAgICAgICB0aGlzLnJvb3RfLnN0eWxlLnJpZ2h0ID0gJ3JpZ2h0JyBpbiBwb3NpdGlvbiA/IHBvc2l0aW9uLnJpZ2h0IDogbnVsbDtcbiAgICAgICAgdGhpcy5yb290Xy5zdHlsZS50b3AgPSAndG9wJyBpbiBwb3NpdGlvbiA/IHBvc2l0aW9uLnRvcCA6IG51bGw7XG4gICAgICAgIHRoaXMucm9vdF8uc3R5bGUuYm90dG9tID0gJ2JvdHRvbScgaW4gcG9zaXRpb24gPyBwb3NpdGlvbi5ib3R0b20gOiBudWxsO1xuICAgICAgfSxcbiAgICAgIHNldE1heEhlaWdodDogKGhlaWdodCkgPT4ge1xuICAgICAgICB0aGlzLnJvb3RfLnN0eWxlLm1heEhlaWdodCA9IGhlaWdodDtcbiAgICAgIH0sXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyLCB2YWx1ZSkgPT4gdGhpcy5pdGVtc1tpbmRleF0uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKSxcbiAgICAgIHJtQXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0cikgPT4gdGhpcy5pdGVtc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpLFxuICAgICAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4gdGhpcy5pdGVtc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtNRENNZW51Rm91bmRhdGlvbiwgTURDTWVudSwgQW5jaG9yTWFyZ2luLCBDb3JuZXIsIENvcm5lckJpdH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtNRENNZW51Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL21lbnUvaW5kZXgnO1xuXG5jb25zdCBPUEVORVJfS0VZUyA9IFtcbiAge2tleTogJ0Fycm93VXAnLCBrZXlDb2RlOiAzOCwgZm9yVHlwZTogJ2tleWRvd24nfSxcbiAge2tleTogJ0Fycm93RG93bicsIGtleUNvZGU6IDQwLCBmb3JUeXBlOiAna2V5ZG93bid9LFxuICB7a2V5OiAnU3BhY2UnLCBrZXlDb2RlOiAzMiwgZm9yVHlwZTogJ2tleXVwJ30sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENTZWxlY3RGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBmbG9hdExhYmVsOiAoLyogdmFsdWU6IGJvb2xlYW4gKi8pID0+IHt9LFxuICAgICAgYWRkQ2xhc3NUb0JvdHRvbUxpbmU6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzc0Zyb21Cb3R0b21MaW5lOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0Qm90dG9tTGluZUF0dHI6ICgvKiBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgYWRkQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0QXR0cjogKC8qIGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBybUF0dHI6ICgvKiBhdHRyOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyoge2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9ICovICh7bGVmdDogMCwgdG9wOiAwfSksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIG1ha2VUYWJiYWJsZTogKCkgPT4ge30sXG4gICAgICBtYWtlVW50YWJiYWJsZTogKCkgPT4ge30sXG4gICAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6ICgvKiBwcm9wZXJ0eU5hbWU6IHN0cmluZyAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0U3R5bGU6ICgvKiBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjcmVhdGUyZFJlbmRlcmluZ0NvbnRleHQ6ICgpID0+IC8qIHtmb250OiBzdHJpbmcsIG1lYXN1cmVUZXh0OiAoc3RyaW5nKSA9PiB7d2lkdGg6IG51bWJlcn19ICovICh7XG4gICAgICAgIGZvbnQ6ICcnLFxuICAgICAgICBtZWFzdXJlVGV4dDogKCkgPT4gKHt3aWR0aDogMH0pLFxuICAgICAgfSksXG4gICAgICBzZXRNZW51RWxTdHlsZTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1lbnVFbEF0dHI6ICgvKiBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcm1NZW51RWxBdHRyOiAoLyogYXR0cjogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE1lbnVFbE9mZnNldEhlaWdodDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBvcGVuTWVudTogKC8qIGZvY3VzSW5kZXg6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBpc01lbnVPcGVuOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgc2V0U2VsZWN0ZWRUZXh0Q29udGVudDogKC8qIHRleHRDb250ZW50OiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0TnVtYmVyT2ZPcHRpb25zOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldFRleHRGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgZ2V0VmFsdWVGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6ICgvKiBpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIsIGF0dHI6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRUb3BGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICByZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIGdldFdpbmRvd0lubmVySGVpZ2h0OiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICAgIHRoaXMuY3R4XyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IC0xO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8gPSAwO1xuXG4gICAgdGhpcy5kaXNwbGF5SGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc01lbnVPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5vcGVuXygpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRGlzcGxheVZpYUtleWJvYXJkXyhldnQpO1xuICAgIHRoaXMuc2VsZWN0aW9uSGFuZGxlcl8gPSAoe2RldGFpbH0pID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleH0gPSBkZXRhaWw7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5zZWxlY3RlZEluZGV4Xykge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZV8oKTtcbiAgICB9O1xuICAgIHRoaXMuY2FuY2VsSGFuZGxlcl8gPSAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlXygpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleF8gPT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbChmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdHhfID0gdGhpcy5hZGFwdGVyXy5jcmVhdGUyZFJlbmRlcmluZ0NvbnRleHQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuZGlzcGxheUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRpc3BsYXlWaWFLZXlib2FyZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyTWVudUludGVyYWN0aW9uSGFuZGxlcihcbiAgICAgIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsIHRoaXMuc2VsZWN0aW9uSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsIHRoaXMuY2FuY2VsSGFuZGxlcl8pO1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIERyb3AgcmVmZXJlbmNlIHRvIGNvbnRleHQgb2JqZWN0IHRvIHByZXZlbnQgcG90ZW50aWFsIGxlYWtzXG4gICAgdGhpcy5jdHhfID0gbnVsbDtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpc3BsYXlIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGlzcGxheVZpYUtleWJvYXJkSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXIoXG4gICAgICBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULCB0aGlzLnNlbGVjdGlvbkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsIHRoaXMuY2FuY2VsSGFuZGxlcl8pO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF8gPj0gMCA/IHRoaXMuYWRhcHRlcl8uZ2V0VmFsdWVGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8pIDogJyc7XG4gIH1cblxuICBnZXRTZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXhfO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGNvbnN0IHByZXZTZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgICBpZiAocHJldlNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUF0dHJGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICdhcmlhLXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmFkYXB0ZXJfLmdldE51bWJlck9mT3B0aW9ucygpID8gaW5kZXggOiAtMTtcbiAgICBsZXQgc2VsZWN0ZWRUZXh0Q29udGVudCA9ICcnO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHNlbGVjdGVkVGV4dENvbnRlbnQgPSB0aGlzLmFkYXB0ZXJfLmdldFRleHRGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8pLnRyaW0oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFNlbGVjdGVkVGV4dENvbnRlbnQoc2VsZWN0ZWRUZXh0Q29udGVudCk7XG4gIH1cblxuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkXztcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgY29uc3Qge0RJU0FCTEVEfSA9IE1EQ1NlbGVjdEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmRpc2FibGVkXyA9IGRpc2FibGVkO1xuICAgIGlmICh0aGlzLmRpc2FibGVkXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhESVNBQkxFRCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5tYWtlVW50YWJiYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKERJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1BdHRyKCdhcmlhLWRpc2FibGVkJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm1ha2VUYWJiYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCBmb250ID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZFN0eWxlVmFsdWUoJ2ZvbnQnKTtcbiAgICBjb25zdCBsZXR0ZXJTcGFjaW5nID0gcGFyc2VGbG9hdCh0aGlzLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgnbGV0dGVyLXNwYWNpbmcnKSk7XG5cbiAgICBpZiAoZm9udCkge1xuICAgICAgdGhpcy5jdHhfLmZvbnQgPSBmb250O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmltYXJ5Rm9udEZhbWlseSA9IHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250LWZhbWlseScpLnNwbGl0KCcsJylbMF07XG4gICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgIHRoaXMuY3R4Xy5mb250ID0gYCR7Zm9udFNpemV9ICR7cHJpbWFyeUZvbnRGYW1pbHl9YDtcbiAgICB9XG5cbiAgICBsZXQgbWF4VGV4dExlbmd0aCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZPcHRpb25zKCk7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1cmZhY2VQYWRkaW5nUmlnaHQgPSBwYXJzZUludCh0aGlzLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgncGFkZGluZy1yaWdodCcpLCAxMCk7XG4gICAgICBjb25zdCBzdXJmYWNlUGFkZGluZ0xlZnQgPSBwYXJzZUludCh0aGlzLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgncGFkZGluZy1sZWZ0JyksIDEwKTtcbiAgICAgIGNvbnN0IHNlbGVjdEJveEFkZGVkUGFkZGluZyA9IHN1cmZhY2VQYWRkaW5nUmlnaHQgKyBzdXJmYWNlUGFkZGluZ0xlZnQ7XG4gICAgICBjb25zdCB0eHQgPSB0aGlzLmFkYXB0ZXJfLmdldFRleHRGb3JPcHRpb25BdEluZGV4KGkpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHt3aWR0aH0gPSB0aGlzLmN0eF8ubWVhc3VyZVRleHQodHh0KTtcbiAgICAgIGNvbnN0IGFkZGVkU3BhY2UgPSBsZXR0ZXJTcGFjaW5nICogdHh0Lmxlbmd0aDtcblxuICAgICAgbWF4VGV4dExlbmd0aCA9XG4gICAgICAgIE1hdGgubWF4KG1heFRleHRMZW5ndGgsIE1hdGguY2VpbCh3aWR0aCArIGFkZGVkU3BhY2UgKyBzZWxlY3RCb3hBZGRlZFBhZGRpbmcpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd3aWR0aCcsIGAke21heFRleHRMZW5ndGh9cHhgKTtcbiAgfVxuXG4gIG9wZW5fKCkge1xuICAgIHRoaXMuZGlzYWJsZVNjcm9sbF8oKTtcbiAgICBjb25zdCB7T1BFTn0gPSBNRENTZWxlY3RGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3QgZm9jdXNJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleF8gPCAwID8gMCA6IHRoaXMuc2VsZWN0ZWRJbmRleF87XG5cbiAgICB0aGlzLnNldE1lbnVTdHlsZXNGb3JPcGVuQXRJbmRleF8oZm9jdXNJbmRleCk7XG4gICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NUb0JvdHRvbUxpbmUoY3NzQ2xhc3Nlcy5CT1RUT01fTElORV9BQ1RJVkUpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoT1BFTik7XG4gICAgdGhpcy5hbmltYXRpb25SZXF1ZXN0SWRfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ub3Blbk1lbnUoZm9jdXNJbmRleCk7XG4gICAgICB0aGlzLmlzRm9jdXNlZF8gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TWVudVN0eWxlc0Zvck9wZW5BdEluZGV4XyhpbmRleCkge1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dJbm5lckhlaWdodCgpO1xuICAgIGNvbnN0IHtsZWZ0LCB0b3B9ID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lbnVFbEF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lbnVFbFN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgY29uc3QgbWVudUhlaWdodCA9IHRoaXMuYWRhcHRlcl8uZ2V0TWVudUVsT2Zmc2V0SGVpZ2h0KCk7XG4gICAgY29uc3QgaXRlbU9mZnNldFRvcCA9IHRoaXMuYWRhcHRlcl8uZ2V0T2Zmc2V0VG9wRm9yT3B0aW9uQXRJbmRleChpbmRleCk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNZW51RWxTdHlsZSgnZGlzcGxheScsICcnKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJtTWVudUVsQXR0cignYXJpYS1oaWRkZW4nKTtcblxuICAgIGxldCBhZGp1c3RlZFRvcCA9IHRvcCAtIGl0ZW1PZmZzZXRUb3A7XG4gICAgY29uc3Qgb3ZlcmZsb3dzVG9wID0gYWRqdXN0ZWRUb3AgPCAwO1xuICAgIGNvbnN0IG92ZXJmbG93c0JvdHRvbSA9IGFkanVzdGVkVG9wICsgbWVudUhlaWdodCA+IGlubmVySGVpZ2h0O1xuICAgIGlmIChvdmVyZmxvd3NUb3ApIHtcbiAgICAgIGFkanVzdGVkVG9wID0gMDtcbiAgICB9IGVsc2UgaWYgKG92ZXJmbG93c0JvdHRvbSkge1xuICAgICAgYWRqdXN0ZWRUb3AgPSBNYXRoLm1heCgwLCBpbm5lckhlaWdodCAtIG1lbnVIZWlnaHQpO1xuICAgIH07XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lbnVFbFN0eWxlKCdsZWZ0JywgYCR7bGVmdH1weGApO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWVudUVsU3R5bGUoJ3RvcCcsIGAke2FkanVzdGVkVG9wfXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNZW51RWxTdHlsZSgndHJhbnNmb3JtLW9yaWdpbicsIGBjZW50ZXIgJHtpdGVtT2Zmc2V0VG9wfXB4YCk7XG4gIH1cblxuICBjbG9zZV8oKSB7XG4gICAgY29uc3Qge09QRU59ID0gTURDU2VsZWN0Rm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoT1BFTik7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzc0Zyb21Cb3R0b21MaW5lKGNzc0NsYXNzZXMuQk9UVE9NX0xJTkVfQUNUSVZFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzKCk7XG4gICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gIH1cblxuICBoYW5kbGVEaXNwbGF5VmlhS2V5Ym9hcmRfKGV2dCkge1xuICAgIC8vIFdlIHVzZSBhIGhhcmQtY29kZWQgMiBpbnN0ZWFkIG9mIEV2ZW50LkFUX1RBUkdFVCB0byBhdm9pZCBoYXZpbmcgdG8gcmVmZXJlbmNlIGEgYnJvd3NlclxuICAgIC8vIGdsb2JhbC5cbiAgICBjb25zdCBFVkVOVF9QSEFTRV9BVF9UQVJHRVQgPSAyO1xuICAgIGlmIChldnQuZXZlbnRQaGFzZSAhPT0gRVZFTlRfUEhBU0VfQVRfVEFSR0VUKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBwcmVzc2luZyBzcGFjZSBkb3duIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlXG4gICAgY29uc3QgaXNTcGFjZURvd24gPSBldnQudHlwZSA9PT0gJ2tleWRvd24nICYmIChldnQua2V5ID09PSAnU3BhY2UnIHx8IGV2dC5rZXlDb2RlID09PSAzMik7XG4gICAgaWYgKGlzU3BhY2VEb3duKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc09wZW5lcktleSA9IE9QRU5FUl9LRVlTLnNvbWUoKHtrZXksIGtleUNvZGUsIGZvclR5cGV9KSA9PiB7XG4gICAgICByZXR1cm4gZXZ0LnR5cGUgPT09IGZvclR5cGUgJiYgKGV2dC5rZXkgPT09IGtleSB8fCBldnQua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNPcGVuZXJLZXkpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhhbmRsZXJfKGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVNjcm9sbF8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRCb2R5Q2xhc3MoY3NzQ2xhc3Nlcy5TQ1JPTExfTE9DSyk7XG4gIH1cblxuICBlbmFibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFNlbGVjdCBMYWJlbC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBTZWxlY3QgbGFiZWwgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdExhYmVsQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2VsZWN0TGFiZWxBZGFwdGVyO1xuIiwiZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLXNlbGVjdF9fbGFiZWwtLWZsb2F0LWFib3ZlJyxcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDU2VsZWN0TGFiZWxBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENTZWxlY3RMYWJlbEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENTZWxlY3RMYWJlbEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDU2VsZWN0TGFiZWxBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU2VsZWN0TGFiZWxBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1NlbGVjdExhYmVsQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0TGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBmbG9hdCBvciBkZWZsb2F0IGFzIG5lY2Vzc2FyeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNGb2N1c2VkIFdoZXRoZXIgdGhlIGlucHV0IGlzIGZvY3VzZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNCYWRJbnB1dCBUaGUgaW5wdXQncyBgdmFsaWRpdHkuYmFkSW5wdXRgIHZhbHVlLlxuICAgKi9cbiAgc3R5bGVGbG9hdCh2YWx1ZSkge1xuICAgIGNvbnN0IHtMQUJFTF9GTE9BVF9BQk9WRX0gPSBNRENTZWxlY3RMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTZWxlY3RMYWJlbEZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1kYy1zZWxlY3QgbWRjLW1lbnUtc2VsZWN0XCIgXHJcbiAgICByb2xlPVwibGlzdGJveFwiIFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiPlxyXG4gICAgPGRpdiByZWY9XCJzdXJmYWNlXCIgY2xhc3M9XCJtZGMtc2VsZWN0X19zdXJmYWNlXCJcclxuICAgICAgOnN0eWxlPVwic3VyZmFjZVN0eWxlc1wiIDp0YWJpbmRleD1cInRhYkluZGV4XCI+XHJcbiAgICAgICAgPGRpdiByZWY9XCJsYWJlbFwiIGNsYXNzPVwibWRjLXNlbGVjdF9fbGFiZWxcIlxyXG4gICAgICAgICAgOmNsYXNzPVwibGFiZWxDbGFzc2VzXCJcclxuICAgICAgICA+e3tsYWJlbH19PC9kaXY+XHJcbiAgICAgICAgPGRpdiByZWY9XCJzZWxlY3RlZENvbnRlbnRcIiBjbGFzcz1cIm1kYy1zZWxlY3RfX3NlbGVjdGVkLXRleHRcIiBcclxuICAgICAgICA+e3tzZWxlY3RlZFRleHRDb250ZW50fX08L2Rpdj5cclxuICAgICAgICA8ZGl2IHJlZj1cImJvdHRvbUxpbmVcIiBjbGFzcz1cIm1kYy1zZWxlY3RfX2JvdHRvbS1saW5lXCJcclxuICAgICAgICAgIDpjbGFzcz1cImJvdHRvbUxpbmVDbGFzc2VzXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxtZGMtbWVudSByZWY9XCJtZW51XCIgXHJcbiAgICAgIGNsYXNzPVwibWRjLXNlbGVjdF9fbWVudVwiXHJcbiAgICAgIEB1cGRhdGU9XCJyZWZyZXNoSW5kZXhcIj5cclxuICAgICAgPHNsb3Q+PC9zbG90PlxyXG4gICAgPC9tZGMtbWVudT5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IG1kY01lbnUgfSBmcm9tICcuLi9tZW51J1xyXG5pbXBvcnQgTURDU2VsZWN0Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0L2ZvdW5kYXRpb24nXHJcbmltcG9ydCBNRENTZWxlY3RMYWJlbEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdC9sYWJlbC9mb3VuZGF0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtbWVudS1zZWxlY3QnLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAndmFsdWUnLFxyXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXHJcbiAgICB2YWx1ZTogW1N0cmluZywgQXJyYXldLFxyXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICBsYWJlbDogU3RyaW5nLCBcclxuICAgIGJveDogQm9vbGVhblxyXG4gIH0sXHJcbiAgZGF0YSAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1zZWxlY3QtLWJveCc6IHRoaXMuYm94XHJcbiAgICAgIH0sXHJcbiAgICAgIGxhYmVsQ2xhc3Nlczoge30sXHJcbiAgICAgIGJvdHRvbUxpbmVDbGFzc2VzOiB7fSxcclxuICAgICAgc3VyZmFjZVN0eWxlczoge30sXHJcbiAgICAgIHRhYkluZGV4OiAwLFxyXG4gICAgICBzZWxlY3RlZFRleHRDb250ZW50OiAnJ1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21kYy1tZW51JzogbWRjTWVudSBcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBkaXNhYmxlZCAodmFsdWUpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh2YWx1ZSlcclxuICAgIH0sXHJcbiAgICB2YWx1ZSAoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEluZGV4KClcclxuICAgIH0sXHJcbiAgICBib3ggKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLXNlbGVjdC0tYm94JyAsIHRoaXMuYm94KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgcmVmcmVzaEluZGV4ICgpIHtcclxuICAgICAgaWYgKHRoaXMuZm91bmRhdGlvbikge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy4kcmVmcy5tZW51Lml0ZW1zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPSBvcHRpb25zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpIHx8IG9wdGlvbnNbaV0udGV4dENvbnRlbnQudHJpbSgpXHJcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSBvcHRpb25WYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2V0U2VsZWN0ZWRJbmRleChpKVxyXG4gICAgICAgICAgICAvL1RPRE86IE1EQ0ZJWCBmb3JjZSBmbG9hdCBhYm92ZSBpZiB2YWx1ZSBpcyB2YWxpZFxyXG4gICAgICAgICAgICB0aGlzLiRzZXQodGhpcy5sYWJlbENsYXNzZXMsICdtZGMtc2VsZWN0X19sYWJlbC0tZmxvYXQtYWJvdmUnLCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RPRE86IE1EQ0ZJWCBmb3JjZSBmbG9hdCBhYm92ZSBpZiB2YWx1ZSBpcyB2YWxpZFxyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRTZWxlY3RlZEluZGV4KC0xKVxyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmxhYmVsQ2xhc3NlcywgJ21kYy1zZWxlY3RfX2xhYmVsLS1mbG9hdC1hYm92ZScsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSkgLy8gVE9ETzogTURDRklYXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICBtb3VudGVkICgpIHtcclxuXHJcbiAgICB0aGlzLmxhYmVsRm91bmRhdGlvbiA9IG5ldyBNRENTZWxlY3RMYWJlbEZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT5cclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5sYWJlbENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXHJcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PlxyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5mb3VuZGF0aW9uICA9IG5ldyBNRENTZWxlY3RGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgICAgZmxvYXRMYWJlbDogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uc3R5bGVGbG9hdCh2YWx1ZSkgXHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZENsYXNzVG9Cb3R0b21MaW5lOiAoY2xhc3NOYW1lKSA9PiBcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5ib3R0b21MaW5lQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcclxuICAgICAgcmVtb3ZlQ2xhc3NGcm9tQm90dG9tTGluZTogKGNsYXNzTmFtZSkgPT5cclxuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5ib3R0b21MaW5lQ2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgICAgc2V0Qm90dG9tTGluZUF0dHI6IChhdHRyLCB2YWx1ZSkgPT4gXHJcbiAgICAgICAgdGhpcy4kcmVmcy5ib3R0b21MaW5lLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXHJcbiAgICAgIHNldEF0dHI6IChhdHRyLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICBybUF0dHI6IChhdHRyLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMuc3VyZmFjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMuc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxyXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLnN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcclxuICAgICAgZm9jdXM6ICgpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5zdXJmYWNlLmZvY3VzKCksXHJcbiAgICAgIG1ha2VUYWJiYWJsZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGFiSW5kZXggPSAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ha2VVbnRhYmJhYmxlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IC0xXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTogKHByb3ApID0+XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy4kcmVmcy5zdXJmYWNlKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApLFxyXG4gICAgICBzZXRTdHlsZTogKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3VyZmFjZVN0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSksXHJcbiAgICAgIGNyZWF0ZTJkUmVuZGVyaW5nQ29udGV4dDogKCkgPT5cclxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICBzZXRNZW51RWxTdHlsZTogKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5tZW51LiRlbC5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWUsXHJcbiAgICAgIHNldE1lbnVFbEF0dHI6IChhdHRyLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuJGVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXHJcbiAgICAgIHJtTWVudUVsQXR0cjogKGF0dHIpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5tZW51LiRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ciksXHJcbiAgICAgIGdldE1lbnVFbE9mZnNldEhlaWdodDogKCkgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuJGVsLm9mZnNldEhlaWdodCxcclxuICAgICAgb3Blbk1lbnU6IChmb2N1c0luZGV4KSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS5zaG93KHtmb2N1c0luZGV4fSksXHJcbiAgICAgIGlzTWVudU9wZW46ICgpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5tZW51LmlzT3BlbigpLFxyXG4gICAgICBzZXRTZWxlY3RlZFRleHRDb250ZW50OiAoc2VsZWN0ZWRUZXh0Q29udGVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0Q29udGVudCA9IHNlbGVjdGVkVGV4dENvbnRlbnRcclxuICAgICAgfSxcclxuICAgICAgZ2V0TnVtYmVyT2ZPcHRpb25zOiAoKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS5pdGVtcy5sZW5ndGgsXHJcbiAgICAgIGdldFRleHRGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5tZW51Lml0ZW1zW2luZGV4XS50ZXh0Q29udGVudC50cmltKCksXHJcbiAgICAgIGdldFZhbHVlRm9yT3B0aW9uQXRJbmRleDogKGluZGV4KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMubWVudS5pdGVtc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykgXHJcbiAgICAgICAgICB8fCB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXHJcbiAgICAgIHJtQXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0cikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSxcclxuICAgICAgZ2V0T2Zmc2V0VG9wRm9yT3B0aW9uQXRJbmRleDogKGluZGV4KSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS5pdGVtc1tpbmRleF0ub2Zmc2V0VG9wLFxyXG4gICAgICByZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS4kZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcclxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFdpbmRvd0lubmVySGVpZ2h0OiAoKSA9PiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgIGFkZEJvZHlDbGFzczogKGNsYXNzTmFtZSkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXHJcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogKGNsYXNzTmFtZSkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAvL1RPRE86IE1EQ0ZJWFxyXG4gICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25cclxuICAgIGZvdW5kYXRpb24ucmVzaXplID0gKCkgPT4ge1xyXG4gICAgICBcclxuICAgICAgY29uc3QgZm9udCA9IGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250Jyk7XHJcbiAgICAgIGNvbnN0IGxldHRlclNwYWNpbmcgPSBwYXJzZUZsb2F0KGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdsZXR0ZXItc3BhY2luZycpKTtcclxuXHJcbiAgICAgIGlmIChmb250KSB7XHJcbiAgICAgICAgZm91bmRhdGlvbi5jdHhfLmZvbnQgPSBmb250O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHByaW1hcnlGb250RmFtaWx5ID0gZm91bmRhdGlvbi5hZGFwdGVyXy5nZXRDb21wdXRlZFN0eWxlVmFsdWUoJ2ZvbnQtZmFtaWx5Jykuc3BsaXQoJywnKVswXTtcclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250LXNpemUnKTtcclxuICAgICAgICBmb3VuZGF0aW9uLmN0eF8uZm9udCA9IGAke2ZvbnRTaXplfSAke3ByaW1hcnlGb250RmFtaWx5fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBtYXhUZXh0TGVuZ3RoID0gMDtcclxuXHJcbiAgICAgIGNvbnN0IHN1cmZhY2VQYWRkaW5nUmlnaHQgPSBwYXJzZUludChmb3VuZGF0aW9uLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgncGFkZGluZy1yaWdodCcpLCAxMCk7XHJcbiAgICAgIGNvbnN0IHN1cmZhY2VQYWRkaW5nTGVmdCA9IHBhcnNlSW50KGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdwYWRkaW5nLWxlZnQnKSwgMTApO1xyXG4gICAgICBjb25zdCBzZWxlY3RCb3hBZGRlZFBhZGRpbmcgPSBzdXJmYWNlUGFkZGluZ1JpZ2h0ICsgc3VyZmFjZVBhZGRpbmdMZWZ0O1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmb3VuZGF0aW9uLmFkYXB0ZXJfLmdldE51bWJlck9mT3B0aW9ucygpOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdHh0ID0gZm91bmRhdGlvbi5hZGFwdGVyXy5nZXRUZXh0Rm9yT3B0aW9uQXRJbmRleChpKS50cmltKCk7XHJcbiAgICAgICAgY29uc3Qge3dpZHRofSA9IGZvdW5kYXRpb24uY3R4Xy5tZWFzdXJlVGV4dCh0eHQpO1xyXG4gICAgICAgIGNvbnN0IGFkZGVkU3BhY2UgPSBsZXR0ZXJTcGFjaW5nICogdHh0Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aCA9XHJcbiAgICAgICAgICBNYXRoLm1heChtYXhUZXh0TGVuZ3RoLCBNYXRoLmNlaWwod2lkdGggKyBhZGRlZFNwYWNlICsgc2VsZWN0Qm94QWRkZWRQYWRkaW5nKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxhYmVsVHh0ID0gdGhpcy5sYWJlbDtcclxuICAgICAgY29uc3Qge3dpZHRofSA9IGZvdW5kYXRpb24uY3R4Xy5tZWFzdXJlVGV4dChsYWJlbFR4dCk7XHJcbiAgICAgIGNvbnN0IGFkZGVkU3BhY2UgPSBsZXR0ZXJTcGFjaW5nICogbGFiZWxUeHQubGVuZ3RoO1xyXG5cclxuICAgICAgbWF4VGV4dExlbmd0aCA9XHJcbiAgICAgICAgTWF0aC5tYXgobWF4VGV4dExlbmd0aCwgTWF0aC5jZWlsKHdpZHRoICsgYWRkZWRTcGFjZSArIHNlbGVjdEJveEFkZGVkUGFkZGluZykpO1xyXG5cclxuXHJcbiAgICAgIGZvdW5kYXRpb24uYWRhcHRlcl8uc2V0U3R5bGUoJ3dpZHRoJywgYCR7bWF4VGV4dExlbmd0aH1weGApO1xyXG4gICAgfVxyXG4gICAgLy8vIFxyXG4gICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcclxuICAgIHRoaXMucmVmcmVzaEluZGV4ICgpXHJcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95ICgpIHtcclxuICAgIGxldCBmb3VuZGF0aW9uID0gdGhpcy5mb3VuZGF0aW9uXHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBudWxsXHJcbiAgICBmb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgXHJcbiAgICBsZXQgZm91bmRhdGlvbkxhYmVsID0gdGhpcy5mb3VuZGF0aW9uTGFiZWxcclxuICAgIHRoaXMuZm91bmRhdGlvbkxhYmVsID0gbnVsbFxyXG4gICAgZm91bmRhdGlvbkxhYmVsLmRlc3Ryb3koKVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxzZWxlY3QgOm11bHRpcGxlPVwibXVsdGlwbGVcIiAgcmVmPVwicm9vdFwiIHYtbW9kZWw9XCJzZWxlY3RlZFwiIFxyXG4gICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiAgOnN0eWxlPVwic3R5bGVzXCIgIFxyXG4gICAgY2xhc3M9XCJtZGMtc2VsZWN0IG1kYy1tdWx0aS1zZWxlY3QgbWRjLWxpc3RcIlxyXG4gICAgQGNoYW5nZT1cIm9uQ2hhbmdlXCJcclxuICA+XHJcbiAgICA8b3B0Z3JvdXAgcmVmPVwib3B0Z3JvdXBcIiBjbGFzcz1cIm1kYy1saXN0LWdyb3VwXCIgOmxhYmVsPVwibGFiZWxcIiB2LWlmPVwibGFiZWxcIj5cclxuICAgICAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgICA8L29wdGdyb3VwPlxyXG4gICAgPHNsb3Qgdi1lbHNlPjwvc2xvdD5cclxuICA8L3NlbGVjdD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLW11bHRpLXNlbGVjdCcsXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcclxuICAgIHZhbHVlOiBbU3RyaW5nLCBBcnJheV0sXHJcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgIGxhYmVsOiBTdHJpbmcsXHJcbiAgICBtYXhTaXplOiB7XHJcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXHJcbiAgICAgIGRlZmF1bHQ6IDRcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGEgKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2VsZWN0ZWQ6IHRoaXMudmFsdWUsXHJcbiAgICAgIHNpemU6IHVuZGVmaW5lZCxcclxuICAgICAgY291bnQ6IHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHN0eWxlcyAoKSB7XHJcbiAgICAgIGxldCBzY3JvbGwgPSAodGhpcy5jb3VudCA+IHRoaXMuc2l6ZSlcclxuICAgICAgbGV0IHNpemUgPSA0OCogdGhpcy5zaXplICsgKHNjcm9sbD8gMCA6IDE2KVxyXG5cclxuICAgICAgbGV0IHN0eWxlcyA9ICB7XHJcbiAgICAgICAgJ2hlaWdodCc6IHNpemUgKyAncHgnLFxyXG4gICAgICAgICdvdmVyZmxvdy15JzogIHNjcm9sbCA/ICdzY3JvbGwnIDogJ2hpZGRlbidcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXNjcm9sbCkge1xyXG4gICAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1pbWFnZSddID0gJ3Vuc2V0J1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXNcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uQ2hhbmdlICgpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5zZWxlY3RlZClcclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQgKCkge1xyXG4gICAgY29uc3QgcmVmcmVzaFNpemUgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBjb3VudCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24sIG9wdGdyb3VwJykubGVuZ3RoXHJcbiAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgICBsZXQgbWF4ID0gTnVtYmVyKHRoaXMubWF4U2l6ZSlcclxuICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICBtYXggKz0gMVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2l6ZSA9IE1hdGgubWluKGNvdW50LCBtYXgpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiByZWZyZXNoU2l6ZSgpKVxyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcclxuXHJcbiAgICByZWZyZXNoU2l6ZSgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95ICgpIHtcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjb21wb25lbnQgOmlzPVwidHlwZVwiIDptdWx0aXBsZT1cIm11bHRpcGxlXCJcclxuICAgIDpsYWJlbD1cImxhYmVsXCIgXHJcbiAgICA6dmFsdWU9XCJ2YWx1ZVwiIEBjaGFuZ2U9XCJvbkNoYW5nZVwiXHJcbiAgICB2LWJpbmQ9XCIkYXR0cnNcIlxyXG4gID5cclxuICAgIDxzbG90Pjwvc2xvdD5cclxuICA8L2NvbXBvbmVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENOYXRpdmVTZWxlY3QgZnJvbSAnLi9tZGMtbmF0aXZlLXNlbGVjdC52dWUnXHJcbmltcG9ydCBNRENNZW51U2VsZWN0IGZyb20gJy4vbWRjLW1lbnUtc2VsZWN0LnZ1ZSdcclxuaW1wb3J0IE1EQ011bHRpU2VsZWN0IGZyb20gJy4vbWRjLW11bHRpLXNlbGVjdC52dWUnXHJcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiB9IGZyb20gJy4uL2Jhc2UnXHJcbiBcclxuY29uc3QgbWVkaWEgPSBuZXcgY2xhc3Mge1xyXG4gIGdldCBtb2JpbGUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vYmlsZSB8fCAodGhpcy5fbW9iaWxlID1cclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KSBhbmQgKHBvaW50ZXI6IGNvYXJzZSknKSlcclxuICB9XHJcbn0oKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtc2VsZWN0JyxcclxuICBtaXhpbnM6IFtEaXNwYXRjaEZvY3VzTWl4aW5dLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAndmFsdWUnLFxyXG4gICAgZXZlbnQ6ICdjaGFuZ2UnXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXHJcbiAgICB2YWx1ZTogW1N0cmluZywgQXJyYXldLFxyXG4gICAgbGFiZWw6IFN0cmluZyxcclxuICAgIG5hdGl2ZTogQm9vbGVhblxyXG4gIH0sXHJcbiAgcHJvdmlkZSAoKSB7XHJcbiAgICByZXR1cm4ge21kY1NlbGVjdDogdGhpc31cclxuICB9LFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgICdtZGMtbmF0aXZlLXNlbGVjdCc6IE1EQ05hdGl2ZVNlbGVjdCxcclxuICAgICdtZGMtbWVudS1zZWxlY3QnOiBNRENNZW51U2VsZWN0LFxyXG4gICAgJ21kYy1tdWx0aS1zZWxlY3QnOiBNRENNdWx0aVNlbGVjdFxyXG4gIH0sXHJcbiAgZGF0YSAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtb2JpbGU6ICh3aW5kb3cpID8gbWVkaWEubW9iaWxlLm1hdGNoZXMgOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgdHlwZSAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gJ21kYy1tdWx0aS1zZWxlY3QnXHJcbiAgICAgICAgOiB0aGlzLm1lbnUgPyAnbWRjLW1lbnUtc2VsZWN0J1xyXG4gICAgICAgIDogdGhpcy5pc05hdGl2ZSA/ICdtZGMtbmF0aXZlLXNlbGVjdCdcclxuICAgICAgICAgIDogJ21kYy1tZW51LXNlbGVjdCdcclxuICAgIH0sXHJcbiAgICBpc05hdGl2ZSAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5hdGl2ZSB8fCB0aGlzLm11bHRpcGxlIHx8IHRoaXMubW9iaWxlXHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbkNoYW5nZSAodmFsdWUpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdmFsdWUpXHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaE1lZGlhICgpIHtcclxuICAgICAgdGhpcy5tb2JpbGUgPSBtZWRpYS5tb2JpbGUubWF0Y2hlc1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYmVmb3JlTW91bnQgKCkge1xyXG4gICAgbWVkaWEubW9iaWxlLmFkZExpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKVxyXG4gICAgdGhpcy5yZWZyZXNoTWVkaWEoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSAoKSB7XHJcbiAgICBtZWRpYS5tb2JpbGUucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XG4gICA8b3B0aW9uIDpkaXNhYmxlZD1cImRpc2FibGVkXCIgOnZhbHVlPVwidmFsdWVcIiB2LWlmPVwiaGFzVmFsdWVcIlxuICAgIGNsYXNzPVwibWRjLW9wdGlvbiBtZGMtbmF0aXZlLW9wdGlvblwiPlxuICAgICA8c2xvdD48L3Nsb3Q+XG4gICA8L29wdGlvbj5cbiAgIDxvcHRpb24gOmRpc2FibGVkPVwiZGlzYWJsZWRcIiB2LWVsc2VcbiAgICBjbGFzcz1cIm1kYy1vcHRpb24gbWRjLW5hdGl2ZS1vcHRpb25cIj5cbiAgICAgPHNsb3Q+PC9zbG90PlxuICAgPC9vcHRpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW5hdGl2ZS1vcHRpb24nLFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW5cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBoYXNWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gISh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgIDxsaSBjbGFzcz1cIm1kYy1vcHRpb24gbWRjLW1lbnUtb3B0aW9uIG1kYy1saXN0LWl0ZW1cIiBcbiAgICByb2xlPVwib3B0aW9uXCIgXG4gICAgOnRhYmluZGV4PVwiZGlzYWJsZWQ/LTE6MFwiXG4gICAgOmFyaWEtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgOmRhdGEtdmFsdWU9XCJ2YWx1ZVwiPlxuICAgICA8c2xvdD48L3Nsb3Q+XG4gICA8L2xpPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tZW51LW9wdGlvbicsXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhblxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgIDxvcHRpb24gY2xhc3M9XCJtZGMtb3B0aW9uIG1kYy1tdWx0aS1vcHRpb24gbWRjLWxpc3QtaXRlbVwiIFxuICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCIgOnZhbHVlPVwidmFsdWVcIiB2LWlmPVwiaGFzVmFsdWVcIj5cbiAgICAgPHNsb3Q+PC9zbG90PlxuICAgPC9vcHRpb24+XG4gICA8b3B0aW9uIGNsYXNzPVwibWRjLW9wdGlvbiBtZGMtbXVsdGktb3B0aW9uIG1kYy1saXN0LWl0ZW1cIiBcbiAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIHYtZWxzZT5cbiAgICAgPHNsb3Q+PC9zbG90PlxuICAgPC9vcHRpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW11bHRpLW9wdGlvbicsXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhblxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGhhc1ZhbHVlICgpIHtcbiAgICAgIHJldHVybiAhKHR5cGVvZiB0aGlzLnZhbHVlID09PSAndW5kZWZpbmVkJylcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8Y29tcG9uZW50IDppcz1cInR5cGVcIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDp2YWx1ZT12YWx1ZT5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvY29tcG9uZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENOYXRpdmVPcHRpb24gZnJvbSAnLi9tZGMtbmF0aXZlLW9wdGlvbi52dWUnXG5pbXBvcnQgTURDTWVudU9wdGlvbiBmcm9tICcuL21kYy1tZW51LW9wdGlvbi52dWUnXG5pbXBvcnQgTURDTXVsdGlPcHRpb24gZnJvbSAnLi9tZGMtbXVsdGktb3B0aW9uLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW9wdGlvbicsXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhblxuICB9LFxuICBpbmplY3Q6IFsnbWRjU2VsZWN0J10sXG4gIGNvbXBvbmVudHM6IHtcbiAgICAnbWRjLW5hdGl2ZS1vcHRpb24nOiBNRENOYXRpdmVPcHRpb24sXG4gICAgJ21kYy1tdWx0aS1vcHRpb24nOiBNRENNdWx0aU9wdGlvbixcbiAgICAnbWRjLW1lbnUtb3B0aW9uJzogTURDTWVudU9wdGlvblxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlzTmF0aXZlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1kY1NlbGVjdC5pc05hdGl2ZVxuICAgIH0sXG4gICAgbXVsdGlwbGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWRjU2VsZWN0Lm11bHRpcGxlXG4gICAgfSxcbiAgICB0eXBlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gJ21kYy1tdWx0aS1vcHRpb24nXG4gICAgICAgIDogdGhpcy5pc05hdGl2ZSA/ICdtZGMtbmF0aXZlLW9wdGlvbidcbiAgICAgICAgICA6ICdtZGMtbWVudS1vcHRpb24nXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNTZWxlY3QgZnJvbSAnLi9tZGMtc2VsZWN0LnZ1ZSdcbmltcG9ydCBtZGNPcHRpb24gZnJvbSAnLi9tZGMtb3B0aW9uLnZ1ZSdcblxuXG5leHBvcnQge1xuICBtZGNTZWxlY3QsXG4gIG1kY09wdGlvbixcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1NlbGVjdCxcbiAgbWRjT3B0aW9uLFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiZW1pdEN1c3RvbUV2ZW50IiwiZWwiLCJldnRUeXBlIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJEaXNwYXRjaEZvY3VzTWl4aW4iLCJoYXNGb2N1cyIsIl9hY3RpdmUiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJzZXRUaW1lb3V0IiwiJGVsIiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJhZGRFdmVudExpc3RlbmVyIiwib25Gb2N1c0V2ZW50Iiwib25CbHVyRXZlbnQiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJTdHJpbmciLCJBcnJheSIsIkJvb2xlYW4iLCJ2YWx1ZSIsInNlbGVjdGVkIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ01lbnVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwiYXR0cmlidXRlTmFtZSIsInR5cGUiLCJoYW5kbGVyIiwiaW5kZXgiLCJvcmlnaW4iLCJwb3NpdGlvbiIsImhlaWdodCIsImF0dHIiLCJjc3NDbGFzc2VzIiwic3RyaW5ncyIsIm51bWJlcnMiLCJDb3JuZXJCaXQiLCJDb3JuZXIiLCJSSUdIVCIsIkJPVFRPTSIsIkZMSVBfUlRMIiwiTURDTWVudUZvdW5kYXRpb24iLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5Ym9hcmREb3duXyIsImtleXVwSGFuZGxlcl8iLCJoYW5kbGVLZXlib2FyZFVwXyIsImRvY3VtZW50Q2xpY2tIYW5kbGVyXyIsImhhbmRsZURvY3VtZW50Q2xpY2tfIiwiaXNPcGVuXyIsIm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyIsImNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8iLCJzZWxlY3RlZFRyaWdnZXJUaW1lcklkXyIsImFuaW1hdGlvblJlcXVlc3RJZF8iLCJkaW1lbnNpb25zXyIsIml0ZW1IZWlnaHRfIiwiYW5jaG9yQ29ybmVyXyIsIlRPUF9TVEFSVCIsImFuY2hvck1hcmdpbl8iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJtZWFzdXJlc18iLCJzZWxlY3RlZEluZGV4XyIsInJlbWVtYmVyU2VsZWN0aW9uXyIsInF1aWNrT3Blbl8iLCJrZXlEb3duV2l0aGluTWVudV8iLCJST09UIiwiT1BFTiIsImhhc0NsYXNzIiwiRXJyb3IiLCJoYXNOZWNlc3NhcnlEb20iLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlciIsImNvcm5lciIsIm1hcmdpbiIsInJlbWVtYmVyU2VsZWN0aW9uIiwic2V0U2VsZWN0ZWRJbmRleCIsInF1aWNrT3BlbiIsImZvY3VzSW5kZXgiLCJmb2N1c0l0ZW1BdEluZGV4IiwiZm9jdXMiLCJpc0ZvY3VzZWQiLCJkb2N1bWVudEVsZW1lbnQiLCJnZXRJbmRleEZvckV2ZW50VGFyZ2V0IiwicGFyZW50Tm9kZSIsIm5vdGlmeUNhbmNlbCIsImNsb3NlIiwiYWx0S2V5IiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXlDb2RlIiwic2hpZnRLZXkiLCJpc1RhYiIsImlzQXJyb3dVcCIsImlzQXJyb3dEb3duIiwiaXNTcGFjZSIsImlzRW50ZXIiLCJmb2N1c2VkSXRlbUluZGV4IiwiZ2V0Rm9jdXNlZEl0ZW1JbmRleCIsImxhc3RJdGVtSW5kZXgiLCJnZXROdW1iZXJPZkl0ZW1zIiwicHJldmVudERlZmF1bHQiLCJpc0VzY2FwZSIsImdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0IiwiQVJJQV9ESVNBQkxFRF9BVFRSIiwidGFyZ2V0SW5kZXgiLCJub3RpZnlTZWxlY3RlZCIsIlNFTEVDVEVEX1RSSUdHRVJfREVMQVkiLCJhbmNob3JSZWN0IiwiZ2V0QW5jaG9yRGltZW5zaW9ucyIsInZpZXdwb3J0IiwiZ2V0V2luZG93RGltZW5zaW9ucyIsIndpZHRoIiwiVE9QX0xFRlQiLCJ2aWV3cG9ydERpc3RhbmNlIiwiYW5jaG9ySGVpZ2h0IiwiYW5jaG9yV2lkdGgiLCJtZW51SGVpZ2h0IiwibWVudVdpZHRoIiwiaXNCb3R0b21BbGlnbmVkIiwiYXZhaWxhYmxlVG9wIiwiYXZhaWxhYmxlQm90dG9tIiwidG9wT3ZlcmZsb3ciLCJib3R0b21PdmVyZmxvdyIsImlzUnRsIiwiaXNGbGlwUnRsIiwiYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCIsImlzQWxpZ25lZFJpZ2h0IiwiYXZhaWxhYmxlTGVmdCIsImF2YWlsYWJsZVJpZ2h0IiwibGVmdE92ZXJmbG93IiwicmlnaHRPdmVyZmxvdyIsImlzUmlnaHRBbGlnbmVkIiwieCIsInJpZ2h0T2Zmc2V0IiwibGVmdE9mZnNldCIsIk1BUkdJTl9UT19FREdFIiwiYXZvaWRWZXJ0aWNhbE92ZXJsYXAiLCJjYW5PdmVybGFwVmVydGljYWxseSIsInkiLCJNYXRoIiwibWluIiwibWF4SGVpZ2h0IiwiaGFzQW5jaG9yIiwiZ2V0QXV0b0xheW91dE1lYXN1cmVtZW50c18iLCJnZXRPcmlnaW5Db3JuZXJfIiwibWF4TWVudUhlaWdodCIsImdldE1lbnVNYXhIZWlnaHRfIiwidmVydGljYWxBbGlnbm1lbnQiLCJob3Jpem9udGFsQWxpZ25tZW50IiwiaG9yaXpvbnRhbE9mZnNldCIsImdldEhvcml6b250YWxPcmlnaW5PZmZzZXRfIiwidmVydGljYWxPZmZzZXQiLCJnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8iLCJBTkNIT1JfVE9fTUVOVV9XSURUSF9SQVRJTyIsImFicyIsIk9GRlNFVF9UT19NRU5VX0hFSUdIVF9SQVRJTyIsInZlcnRpY2FsT2Zmc2V0UGVyY2VudCIsIm9yaWdpblBlcmNlbnQiLCJyb3VuZCIsInNldFRyYW5zZm9ybU9yaWdpbiIsInNldFBvc2l0aW9uIiwic2V0TWF4SGVpZ2h0Iiwic2F2ZUZvY3VzIiwiYWRkQ2xhc3MiLCJBTklNQVRJTkdfT1BFTiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImdldElubmVyRGltZW5zaW9ucyIsImF1dG9Qb3NpdGlvbl8iLCJmb2N1c09uT3Blbl8iLCJyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIiLCJyZW1vdmVDbGFzcyIsIlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTiIsInRhcmdldElzRGlzYWJsZWQiLCJBTklNQVRJTkdfQ0xPU0VEIiwiVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTiIsInJlc3RvcmVGb2N1cyIsInByZXZTZWxlY3RlZEluZGV4Iiwicm1BdHRyRm9yT3B0aW9uQXRJbmRleCIsInJtQ2xhc3NGb3JPcHRpb25BdEluZGV4IiwiU0VMRUNURURfTElTVF9JVEVNIiwic2V0QXR0ckZvck9wdGlvbkF0SW5kZXgiLCJhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXgiLCJzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfIiwiZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lIiwiZ2xvYmFsT2JqIiwiZm9yY2VSZWZyZXNoIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsInRyYW5zZm9ybVByb3BlcnR5TmFtZSIsInN0eWxlIiwib3BlbkZyb21Ub3BMZWZ0Iiwib3BlbkZyb21Ub3BSaWdodCIsIm9wZW5Gcm9tQm90dG9tTGVmdCIsIm9wZW5Gcm9tQm90dG9tUmlnaHQiLCJvcHRpb25zIiwiZm91bmRhdGlvbiIsIm9wZW4iLCJpc09wZW4iLCJyZWZyZXNoSXRlbXMiLCJpdGVtcyIsInNsaWNlIiwiY2FsbCIsIiRyZWZzIiwicXVlcnlTZWxlY3RvckFsbCIsInNsb3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsIl9wcmV2aW91c0ZvY3VzIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwicm9vdCIsImNsYXNzTGlzdCIsImdldEF0dHJpYnV0ZSIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwicGFyZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImxlbmd0aCIsImJvZHkiLCJpbmRleE9mIiwiU0VMRUNURURfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInN0eWxlcyIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImFkZCIsInJlbW92ZSIsImluaXQiLCJkaXNjb25uZWN0IiwiZGVzdHJveSIsIk1EQ0NvbXBvbmVudCIsInJvb3RfIiwiYXJncyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiTURDTWVudSIsInByZXZpb3VzRm9jdXNfIiwic2V0QW5jaG9yQ29ybmVyIiwic2V0QW5jaG9yTWFyZ2luIiwiaXRlbXNDb250YWluZXJfIiwiaXRlbXNDb250YWluZXIiLCJlbWl0IiwicXVlcnlTZWxlY3RvciIsIklURU1TX1NFTEVDVE9SIiwiZ2V0U2VsZWN0ZWRJbmRleCIsInNldFJlbWVtYmVyU2VsZWN0aW9uIiwic2V0UXVpY2tPcGVuIiwiT1BFTkVSX0tFWVMiLCJmb3JUeXBlIiwiTURDU2VsZWN0Rm91bmRhdGlvbiIsImN0eF8iLCJkaXNhYmxlZF8iLCJpc0ZvY3VzZWRfIiwiZGlzcGxheUhhbmRsZXJfIiwiaXNNZW51T3BlbiIsIm9wZW5fIiwiZGlzcGxheVZpYUtleWJvYXJkSGFuZGxlcl8iLCJoYW5kbGVEaXNwbGF5VmlhS2V5Ym9hcmRfIiwic2VsZWN0aW9uSGFuZGxlcl8iLCJkZXRhaWwiLCJub3RpZnlDaGFuZ2UiLCJjbG9zZV8iLCJjYW5jZWxIYW5kbGVyXyIsImZsb2F0TGFiZWwiLCJjcmVhdGUyZFJlbmRlcmluZ0NvbnRleHQiLCJyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZXNpemUiLCJkZXJlZ2lzdGVyTWVudUludGVyYWN0aW9uSGFuZGxlciIsImdldFZhbHVlRm9yT3B0aW9uQXRJbmRleCIsImdldE51bWJlck9mT3B0aW9ucyIsInNlbGVjdGVkVGV4dENvbnRlbnQiLCJnZXRUZXh0Rm9yT3B0aW9uQXRJbmRleCIsInRyaW0iLCJzZXRTZWxlY3RlZFRleHRDb250ZW50IiwiZGlzYWJsZWQiLCJESVNBQkxFRCIsInNldEF0dHIiLCJtYWtlVW50YWJiYWJsZSIsInJtQXR0ciIsIm1ha2VUYWJiYWJsZSIsImZvbnQiLCJnZXRDb21wdXRlZFN0eWxlVmFsdWUiLCJsZXR0ZXJTcGFjaW5nIiwicGFyc2VGbG9hdCIsInByaW1hcnlGb250RmFtaWx5Iiwic3BsaXQiLCJmb250U2l6ZSIsIm1heFRleHRMZW5ndGgiLCJpIiwibCIsInN1cmZhY2VQYWRkaW5nUmlnaHQiLCJwYXJzZUludCIsInN1cmZhY2VQYWRkaW5nTGVmdCIsInNlbGVjdEJveEFkZGVkUGFkZGluZyIsInR4dCIsIm1lYXN1cmVUZXh0IiwiYWRkZWRTcGFjZSIsIm1heCIsImNlaWwiLCJzZXRTdHlsZSIsImRpc2FibGVTY3JvbGxfIiwic2V0TWVudVN0eWxlc0Zvck9wZW5BdEluZGV4XyIsImFkZENsYXNzVG9Cb3R0b21MaW5lIiwiQk9UVE9NX0xJTkVfQUNUSVZFIiwib3Blbk1lbnUiLCJnZXRXaW5kb3dJbm5lckhlaWdodCIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJzZXRNZW51RWxBdHRyIiwic2V0TWVudUVsU3R5bGUiLCJnZXRNZW51RWxPZmZzZXRIZWlnaHQiLCJpdGVtT2Zmc2V0VG9wIiwiZ2V0T2Zmc2V0VG9wRm9yT3B0aW9uQXRJbmRleCIsInJtTWVudUVsQXR0ciIsImFkanVzdGVkVG9wIiwib3ZlcmZsb3dzVG9wIiwib3ZlcmZsb3dzQm90dG9tIiwicmVtb3ZlQ2xhc3NGcm9tQm90dG9tTGluZSIsImVuYWJsZVNjcm9sbF8iLCJFVkVOVF9QSEFTRV9BVF9UQVJHRVQiLCJldmVudFBoYXNlIiwiaXNTcGFjZURvd24iLCJpc09wZW5lcktleSIsInNvbWUiLCJhZGRCb2R5Q2xhc3MiLCJTQ1JPTExfTE9DSyIsInJlbW92ZUJvZHlDbGFzcyIsIk1EQ1NlbGVjdExhYmVsQWRhcHRlciIsIk1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbiIsIkxBQkVMX0ZMT0FUX0FCT1ZFIiwiYm94IiwibWRjTWVudSIsInNldERpc2FibGVkIiwicmVmcmVzaEluZGV4IiwibWVudSIsIm9wdGlvblZhbHVlIiwidGV4dENvbnRlbnQiLCJsYWJlbENsYXNzZXMiLCJnZXRWYWx1ZSIsImxhYmVsRm91bmRhdGlvbiIsInN0eWxlRmxvYXQiLCJib3R0b21MaW5lQ2xhc3NlcyIsImJvdHRvbUxpbmUiLCJzdXJmYWNlIiwidGFiSW5kZXgiLCJwcm9wIiwicHJvcGVydHlOYW1lIiwic3VyZmFjZVN0eWxlcyIsImdldENvbnRleHQiLCJzaG93Iiwib2Zmc2V0VG9wIiwibGFiZWxUeHQiLCJsYWJlbCIsImZvdW5kYXRpb25MYWJlbCIsIk51bWJlciIsInNjcm9sbCIsImNvdW50Iiwic2l6ZSIsInJlZnJlc2hTaXplIiwibWF4U2l6ZSIsIm1lZGlhIiwiX21vYmlsZSIsIm1hdGNoTWVkaWEiLCJtZGNTZWxlY3QiLCJNRENOYXRpdmVTZWxlY3QiLCJNRENNZW51U2VsZWN0IiwiTURDTXVsdGlTZWxlY3QiLCJtb2JpbGUiLCJtYXRjaGVzIiwibXVsdGlwbGUiLCJpc05hdGl2ZSIsIm5hdGl2ZSIsImFkZExpc3RlbmVyIiwicmVmcmVzaE1lZGlhIiwicmVtb3ZlTGlzdGVuZXIiLCJNRENOYXRpdmVPcHRpb24iLCJNRENNdWx0aU9wdGlvbiIsIk1EQ01lbnVPcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjs7TUFFNUJDLE9BQU8sSUFBWDtNQUNJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7V0FDMUJBLE9BQU9DLEdBQWQ7R0FERixNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQzs7V0FFakNBLE9BQU9ELEdBQWQ7O01BRUVGLElBQUosRUFBVTtTQUNISSxHQUFMLENBQVNMLE1BQVQ7Ozs7QUNWRyxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztTQUMvQjthQUNJLFFBREo7YUFFSSxpQkFBQ0MsRUFBRCxFQUFRO1dBQ1YsSUFBSUMsR0FBVCxJQUFnQkYsVUFBaEIsRUFBNEI7WUFDdEJHLFlBQVlILFdBQVdFLEdBQVgsQ0FBaEI7V0FDS0MsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FB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
