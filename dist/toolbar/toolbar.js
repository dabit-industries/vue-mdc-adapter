/**
* @module vue-mdc-adaptertoolbar 0.11.2
* @exports VueMDCToolbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCToolbar = factory());
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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* global CustomEvent */

var DispatchEventMixin = {
  props: {
    'event': String,
    'event-target': Object,
    'event-args': Array
  },
  methods: {
    dispatchEvent: function dispatchEvent(evt) {
      this.$emit(evt.type);
      if (this.event) {
        var target = this.eventTarget || this.$root;
        var args = this.eventArgs || [];
        target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
      }
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

var cssClasses = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
};

var strings = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change'
};

var numbers = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600
};

/**
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
var MDCToolbarFoundation = function (_MDCFoundation) {
  inherits(MDCToolbarFoundation, _MDCFoundation);
  createClass(MDCToolbarFoundation, null, [{
    key: 'cssClasses',
    get: function get$$1() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return {
        hasClass: function hasClass() {
          return (/* className: string */ /* boolean */false
          );
        },
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
        deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        getViewportWidth: function getViewportWidth() {
          return (/* number */0
          );
        },
        getViewportScrollY: function getViewportScrollY() {
          return (/* number */0
          );
        },
        getOffsetHeight: function getOffsetHeight() {
          return (/* number */0
          );
        },
        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
          return (/* number */0
          );
        },
        notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
        setStyle: function setStyle() /* property: string, value: string */{},
        setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
      };
    }
  }]);

  function MDCToolbarFoundation(adapter) {
    classCallCheck(this, MDCToolbarFoundation);

    var _this = possibleConstructorReturn(this, (MDCToolbarFoundation.__proto__ || Object.getPrototypeOf(MDCToolbarFoundation)).call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

    _this.resizeHandler_ = function () {
      return _this.checkRowHeight_();
    };
    _this.scrollHandler_ = function () {
      return _this.updateToolbarStyles_();
    };
    _this.checkRowHeightFrame_ = 0;
    _this.scrollFrame_ = 0;
    _this.executedLastChange_ = false;

    _this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    _this.fixed_ = false;
    // If fixed is targeted only at the last row
    _this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    _this.hasFlexibleRow_ = false;
    // If use the default behavior
    _this.useFlexDefaultBehavior_ = false;
    return _this;
  }

  createClass(MDCToolbarFoundation, [{
    key: 'init',
    value: function init() {
      this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
      this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
      this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
      if (this.hasFlexibleRow_) {
        this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
      }
      this.initKeyRatio_();
      this.setKeyHeights_();
      this.adapter_.registerResizeHandler(this.resizeHandler_);
      this.adapter_.registerScrollHandler(this.scrollHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    }
  }, {
    key: 'updateAdjustElementStyles',
    value: function updateAdjustElementStyles() {
      if (this.fixed_) {
        this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
      }
    }
  }, {
    key: 'getFlexibleExpansionRatio_',
    value: function getFlexibleExpansionRatio_(scrollTop) {
      // To prevent division by zero when there is no flexibleExpansionHeight
      var delta = 0.0001;
      return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
    }
  }, {
    key: 'checkRowHeight_',
    value: function checkRowHeight_() {
      var _this2 = this;

      cancelAnimationFrame(this.checkRowHeightFrame_);
      this.checkRowHeightFrame_ = requestAnimationFrame(function () {
        return _this2.setKeyHeights_();
      });
    }
  }, {
    key: 'setKeyHeights_',
    value: function setKeyHeights_() {
      var newToolbarRowHeight = this.getRowHeight_();
      if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
        this.calculations_.toolbarRowHeight = newToolbarRowHeight;
        this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
        this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
        this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
        this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
        this.updateAdjustElementStyles();
        this.updateToolbarStyles_();
      }
    }
  }, {
    key: 'updateToolbarStyles_',
    value: function updateToolbarStyles_() {
      var _this3 = this;

      cancelAnimationFrame(this.scrollFrame_);
      this.scrollFrame_ = requestAnimationFrame(function () {
        var scrollTop = _this3.adapter_.getViewportScrollY();
        var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

        if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
          return;
        }

        var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

        _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
        if (_this3.fixedLastrow_) {
          _this3.updateToolbarFixedState_(scrollTop);
        }
        if (_this3.hasFlexibleRow_) {
          _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
        }
        _this3.executedLastChange_ = hasScrolledOutOfThreshold;
        _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
      });
    }
  }, {
    key: 'scrolledOutOfThreshold_',
    value: function scrolledOutOfThreshold_(scrollTop) {
      return scrollTop > this.calculations_.scrollThreshold;
    }
  }, {
    key: 'initKeyRatio_',
    value: function initKeyRatio_() {
      var toolbarRowHeight = this.getRowHeight_();
      var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
      this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
      this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
      this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
      this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
    }
  }, {
    key: 'getRowHeight_',
    value: function getRowHeight_() {
      var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
      return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
    }
  }, {
    key: 'updateToolbarFlexibleState_',
    value: function updateToolbarFlexibleState_(flexibleExpansionRatio) {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
      if (flexibleExpansionRatio === 1) {
        this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
      } else if (flexibleExpansionRatio === 0) {
        this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
      }
    }
  }, {
    key: 'updateToolbarFixedState_',
    value: function updateToolbarFixedState_(scrollTop) {
      var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
      this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

      if (translateDistance === this.calculations_.maxTranslateYDistance) {
        this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
      } else {
        this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
      }
    }
  }, {
    key: 'updateFlexibleRowElementStyles_',
    value: function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
      if (this.fixed_) {
        var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
        this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
      }
      if (this.useFlexDefaultBehavior_) {
        this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
      }
    }
  }, {
    key: 'updateElementStylesDefaultBehavior_',
    value: function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
      var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
      var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
      var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

      this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
    }
  }]);
  return MDCToolbarFoundation;
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

var supportsPassive_ = void 0;

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

var mdcToolbar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { staticClass: "mdc-toolbar-wrapper" }, [_c('div', { ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, [_vm._t("default")], 2), _vm._v(" "), _vm.fixed || _vm.waterfall || _vm.fixedLastrow ? _c('div', { ref: "fixed-adjust", staticClass: "mdc-toolbar-fixed-adjust", style: _vm.adjustStyles }) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'mdc-toolbar',
  props: {
    'fixed': Boolean,
    'waterfall': Boolean,
    'fixed-lastrow': Boolean,
    'flexible': Boolean,
    'flexible-default': { type: Boolean, default: true }
  },
  data: function data() {
    return {
      rootClasses: {
        'mdc-toolbar': true,
        'mdc-toolbar--fixed': this.fixed || this.waterfall || this.fixedLastrow,
        'mdc-toolbar--waterfall': this.waterfall,
        'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
        'mdc-toolbar--flexible': this.flexible,
        'mdc-toolbar--flexible-default-behavior': this.flexible && this.flexibleDefault
      },
      rootStyles: {},
      adjustStyles: {
        // to avoid top margin collapse with :after el
        // 0.1 px should be rounded to 0px
        // TODO: find a better trick
        // height: '0.1px'
      },
      foundation: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.foundation = new MDCToolbarFoundation({
      addClass: function addClass(className) {
        _this.$set(_this.rootClasses, className, true);
      },
      removeClass: function removeClass(className) {
        _this.$delete(_this.rootClasses, className);
      },
      hasClass: function hasClass(className) {
        return _this.$refs.root.classList.contains(className);
      },
      registerScrollHandler: function registerScrollHandler(handler) {
        window.addEventListener('scroll', handler, applyPassive());
      },
      deregisterScrollHandler: function deregisterScrollHandler(handler) {
        window.removeEventListener('scroll', handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        window.removeEventListener('resize', handler);
      },
      getViewportWidth: function getViewportWidth() {
        return window.innerWidth;
      },
      getViewportScrollY: function getViewportScrollY() {
        return window.pageYOffset;
      },
      getOffsetHeight: function getOffsetHeight() {
        return _this.$refs.root.offsetHeight;
      },
      getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
        var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
        return el ? el.offsetHeight : undefined;
      },
      notifyChange: function notifyChange(evtData) {
        _this.$emit('change', evtData);
      },
      setStyle: function setStyle(property, value) {
        _this.$set(_this.rootStyles, property, value);
      },
      setStyleForTitleElement: function setStyleForTitleElement(property, value) {
        var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
        if (el) el.style.setProperty(property, value);
      },
      setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
        var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
        if (el) el.style.setProperty(property, value);
      },
      setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
        _this.$set(_this.adjustStyles, property, value);
      }
    });
    this.foundation.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.foundation.destroy();
  }
};

var mdcToolbarRow = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-toolbar-row mdc-toolbar__row" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-toolbar-row'
};

var mdcToolbarSection = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-toolbar-section mdc-toolbar__section", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-toolbar-section',
  props: {
    'align-start': Boolean,
    'align-end': Boolean,
    'shrink-to-fit': Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-toolbar__section--align-start': this.alignStart,
        'mdc-toolbar__section--align-end': this.alignEnd,
        'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
      }
    };
  }
};

var mdcToolbarMenuIcon = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-menu-icon mdc-toolbar__menu-icon", class: { 'material-icons': !!_vm.icon }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
  }, staticRenderFns: [],
  name: 'mdc-toolbar-menu-icon',
  mixins: [DispatchEventMixin],
  props: {
    icon: { type: String, 'default': "menu" }
  }
};

var mdcToolbarTitle = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-title mdc-toolbar__title", on: { "click": _vm.dispatchEvent } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-toolbar-title',
  mixins: [DispatchEventMixin]
};

var mdcToolbarIcon = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-icon mdc-toolbar__icon", class: { 'material-icons': !!_vm.icon }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
  }, staticRenderFns: [],
  name: 'mdc-toolbar-icon',
  mixins: [DispatchEventMixin],
  props: {
    icon: String
  }
};

var plugin = BasePlugin({
  mdcToolbar: mdcToolbar,
  mdcToolbarRow: mdcToolbarRow,
  mdcToolbarSection: mdcToolbarSection,
  mdcToolbarMenuIcon: mdcToolbarMenuIcon,
  mdcToolbarTitle: mdcToolbarTitle,
  mdcToolbarIcon: mdcToolbarIcon
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci91dGlsLmpzIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1yb3cudnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLXNlY3Rpb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLW1lbnUtaWNvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL3Rvb2xiYXIvbWRjLXRvb2xiYXItdGl0bGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLWljb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEZJWEVEOiAnbWRjLXRvb2xiYXItLWZpeGVkJyxcbiAgRklYRURfTEFTVFJPVzogJ21kYy10b29sYmFyLS1maXhlZC1sYXN0cm93LW9ubHknLFxuICBGSVhFRF9BVF9MQVNUX1JPVzogJ21kYy10b29sYmFyLS1maXhlZC1hdC1sYXN0LXJvdycsXG4gIFRPT0xCQVJfUk9XX0ZMRVhJQkxFOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlJyxcbiAgRkxFWElCTEVfREVGQVVMVF9CRUhBVklPUjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1kZWZhdWx0LWJlaGF2aW9yJyxcbiAgRkxFWElCTEVfTUFYOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlLXNwYWNlLW1heGltaXplZCcsXG4gIEZMRVhJQkxFX01JTjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1zcGFjZS1taW5pbWl6ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRJVExFX1NFTEVDVE9SOiAnLm1kYy10b29sYmFyX190aXRsZScsXG4gIEZJUlNUX1JPV19TRUxFQ1RPUjogJy5tZGMtdG9vbGJhcl9fcm93OmZpcnN0LWNoaWxkJyxcbiAgQ0hBTkdFX0VWRU5UOiAnTURDVG9vbGJhcjpjaGFuZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IG51bWJlcnMgPSB7XG4gIE1BWF9USVRMRV9TSVpFOiAyLjEyNSxcbiAgTUlOX1RJVExFX1NJWkU6IDEuMjUsXG4gIFRPT0xCQVJfUk9XX0hFSUdIVDogNjQsXG4gIFRPT0xCQVJfUk9XX01PQklMRV9IRUlHSFQ6IDU2LFxuICBUT09MQkFSX01PQklMRV9CUkVBS1BPSU5UOiA2MDAsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1Rvb2xiYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0Vmlld3BvcnRXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBnZXRWaWV3cG9ydFNjcm9sbFk6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0T2Zmc2V0SGVpZ2h0OiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldEZpcnN0Um93RWxlbWVudE9mZnNldEhlaWdodDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBub3RpZnlDaGFuZ2U6ICgvKiBldnREYXRhOiB7ZmxleGlibGVFeHBhbnNpb25SYXRpbzogbnVtYmVyfSAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZTogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGVGb3JUaXRsZUVsZW1lbnQ6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlRm9yRmxleGlibGVSb3dFbGVtZW50OiAoLyogcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudDogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUb29sYmFyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmNoZWNrUm93SGVpZ2h0XygpO1xuICAgIHRoaXMuc2Nyb2xsSGFuZGxlcl8gPSAoKSA9PiB0aGlzLnVwZGF0ZVRvb2xiYXJTdHlsZXNfKCk7XG4gICAgdGhpcy5jaGVja1Jvd0hlaWdodEZyYW1lXyA9IDA7XG4gICAgdGhpcy5zY3JvbGxGcmFtZV8gPSAwO1xuICAgIHRoaXMuZXhlY3V0ZWRMYXN0Q2hhbmdlXyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfID0ge1xuICAgICAgdG9vbGJhclJvd0hlaWdodDogMCxcbiAgICAgIC8vIENhbGN1bGF0ZWQgSGVpZ2h0IHJhdGlvLiBXZSB1c2UgcmF0aW8gdG8gY2FsY3VsYXRlIGNvcnJlc3BvbmRpbmcgaGVpZ2h0cyBpbiByZXNpemUgZXZlbnQuXG4gICAgICB0b29sYmFyUmF0aW86IDAsIC8vIFRoZSByYXRpbyBvZiB0b29sYmFyIGhlaWdodCB0byByb3cgaGVpZ2h0XG4gICAgICBmbGV4aWJsZUV4cGFuc2lvblJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgZmxleGlibGUgc3BhY2UgaGVpZ2h0IHRvIHJvdyBoZWlnaHRcbiAgICAgIG1heFRyYW5zbGF0ZVlSYXRpbzogMCwgLy8gVGhlIHJhdGlvIG9mIG1heCB0b29sYmFyIG1vdmUgdXAgZGlzdGFuY2UgdG8gcm93IGhlaWdodFxuICAgICAgc2Nyb2xsVGhyZXNob2xkUmF0aW86IDAsIC8vIFRoZSByYXRpbyBvZiBtYXggc2Nyb2xsVG9wIHRoYXQgd2Ugc2hvdWxkIGxpc3RlbiB0byB0byByb3cgaGVpZ2h0XG4gICAgICAvLyBEZXJpdmVkIEhlaWdodHMgYmFzZWQgb24gdGhlIGFib3ZlIGtleSByYXRpb3MuXG4gICAgICB0b29sYmFySGVpZ2h0OiAwLFxuICAgICAgZmxleGlibGVFeHBhbnNpb25IZWlnaHQ6IDAsIC8vIEZsZXhpYmxlIHJvdyBtaW51cyB0b29sYmFyIGhlaWdodCAoZGVyaXZlZClcbiAgICAgIG1heFRyYW5zbGF0ZVlEaXN0YW5jZTogMCwgLy8gV2hlbiB0b29sYmFyIG9ubHkgZml4IGxhc3Qgcm93IChkZXJpdmVkKVxuICAgICAgc2Nyb2xsVGhyZXNob2xkOiAwLFxuICAgIH07XG4gICAgLy8gVG9vbGJhciBmaXhlZCBiZWhhdmlvclxuICAgIC8vIElmIHRvb2xiYXIgaXMgZml4ZWRcbiAgICB0aGlzLmZpeGVkXyA9IGZhbHNlO1xuICAgIC8vIElmIGZpeGVkIGlzIHRhcmdldGVkIG9ubHkgYXQgdGhlIGxhc3Qgcm93XG4gICAgdGhpcy5maXhlZExhc3Ryb3dfID0gZmFsc2U7XG4gICAgLy8gVG9vbGJhciBmbGV4aWJsZSBiZWhhdmlvclxuICAgIC8vIElmIHRoZSBmaXJzdCByb3cgaXMgZmxleGlibGVcbiAgICB0aGlzLmhhc0ZsZXhpYmxlUm93XyA9IGZhbHNlO1xuICAgIC8vIElmIHVzZSB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICAgIHRoaXMudXNlRmxleERlZmF1bHRCZWhhdmlvcl8gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5maXhlZF8gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRklYRUQpO1xuICAgIHRoaXMuZml4ZWRMYXN0cm93XyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRF9MQVNUUk9XKSAmIHRoaXMuZml4ZWRfO1xuICAgIHRoaXMuaGFzRmxleGlibGVSb3dfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLlRPT0xCQVJfUk9XX0ZMRVhJQkxFKTtcbiAgICBpZiAodGhpcy5oYXNGbGV4aWJsZVJvd18pIHtcbiAgICAgIHRoaXMudXNlRmxleERlZmF1bHRCZWhhdmlvcl8gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkxFWElCTEVfREVGQVVMVF9CRUhBVklPUik7XG4gICAgfVxuICAgIHRoaXMuaW5pdEtleVJhdGlvXygpO1xuICAgIHRoaXMuc2V0S2V5SGVpZ2h0c18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyKHRoaXMuc2Nyb2xsSGFuZGxlcl8pO1xuICB9XG5cbiAgdXBkYXRlQWRqdXN0RWxlbWVudFN0eWxlcygpIHtcbiAgICBpZiAodGhpcy5maXhlZF8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JGaXhlZEFkanVzdEVsZW1lbnQoJ21hcmdpbi10b3AnLCBgJHt0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhckhlaWdodH1weGApO1xuICAgIH1cbiAgfVxuXG4gIGdldEZsZXhpYmxlRXhwYW5zaW9uUmF0aW9fKHNjcm9sbFRvcCkge1xuICAgIC8vIFRvIHByZXZlbnQgZGl2aXNpb24gYnkgemVybyB3aGVuIHRoZXJlIGlzIG5vIGZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0XG4gICAgY29uc3QgZGVsdGEgPSAwLjAwMDE7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIDEgLSBzY3JvbGxUb3AgLyAodGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0ICsgZGVsdGEpKTtcbiAgfVxuXG4gIGNoZWNrUm93SGVpZ2h0XygpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrUm93SGVpZ2h0RnJhbWVfKTtcbiAgICB0aGlzLmNoZWNrUm93SGVpZ2h0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuc2V0S2V5SGVpZ2h0c18oKSk7XG4gIH1cblxuICBzZXRLZXlIZWlnaHRzXygpIHtcbiAgICBjb25zdCBuZXdUb29sYmFyUm93SGVpZ2h0ID0gdGhpcy5nZXRSb3dIZWlnaHRfKCk7XG4gICAgaWYgKG5ld1Rvb2xiYXJSb3dIZWlnaHQgIT09IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0KSB7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodCA9IG5ld1Rvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhckhlaWdodCA9IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvbkhlaWdodCA9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvblJhdGlvICogdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWURpc3RhbmNlID1cbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlSYXRpbyAqIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnNjcm9sbFRocmVzaG9sZCA9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5zY3JvbGxUaHJlc2hvbGRSYXRpbyAqIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy51cGRhdGVBZGp1c3RFbGVtZW50U3R5bGVzKCk7XG4gICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJTdHlsZXNfKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVG9vbGJhclN0eWxlc18oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY3JvbGxGcmFtZV8pO1xuICAgIHRoaXMuc2Nyb2xsRnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRTY3JvbGxZKCk7XG4gICAgICBjb25zdCBoYXNTY3JvbGxlZE91dE9mVGhyZXNob2xkID0gdGhpcy5zY3JvbGxlZE91dE9mVGhyZXNob2xkXyhzY3JvbGxUb3ApO1xuXG4gICAgICBpZiAoaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZCAmJiB0aGlzLmV4ZWN1dGVkTGFzdENoYW5nZV8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmbGV4aWJsZUV4cGFuc2lvblJhdGlvID0gdGhpcy5nZXRGbGV4aWJsZUV4cGFuc2lvblJhdGlvXyhzY3JvbGxUb3ApO1xuXG4gICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJGbGV4aWJsZVN0YXRlXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKTtcbiAgICAgIGlmICh0aGlzLmZpeGVkTGFzdHJvd18pIHtcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyRml4ZWRTdGF0ZV8oc2Nyb2xsVG9wKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmhhc0ZsZXhpYmxlUm93Xykge1xuICAgICAgICB0aGlzLnVwZGF0ZUZsZXhpYmxlUm93RWxlbWVudFN0eWxlc18oZmxleGlibGVFeHBhbnNpb25SYXRpbyk7XG4gICAgICB9XG4gICAgICB0aGlzLmV4ZWN1dGVkTGFzdENoYW5nZV8gPSBoYXNTY3JvbGxlZE91dE9mVGhyZXNob2xkO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDaGFuZ2Uoe2ZsZXhpYmxlRXhwYW5zaW9uUmF0aW86IGZsZXhpYmxlRXhwYW5zaW9uUmF0aW99KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNjcm9sbGVkT3V0T2ZUaHJlc2hvbGRfKHNjcm9sbFRvcCkge1xuICAgIHJldHVybiBzY3JvbGxUb3AgPiB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkO1xuICB9XG5cbiAgaW5pdEtleVJhdGlvXygpIHtcbiAgICBjb25zdCB0b29sYmFyUm93SGVpZ2h0ID0gdGhpcy5nZXRSb3dIZWlnaHRfKCk7XG4gICAgY29uc3QgZmlyc3RSb3dNYXhSYXRpbyA9IHRoaXMuYWRhcHRlcl8uZ2V0Rmlyc3RSb3dFbGVtZW50T2Zmc2V0SGVpZ2h0KCkgLyB0b29sYmFyUm93SGVpZ2h0O1xuICAgIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gPSB0aGlzLmFkYXB0ZXJfLmdldE9mZnNldEhlaWdodCgpIC8gdG9vbGJhclJvd0hlaWdodDtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25SYXRpbyA9IGZpcnN0Um93TWF4UmF0aW8gLSAxO1xuICAgIHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZUmF0aW8gPVxuICAgICAgdGhpcy5maXhlZExhc3Ryb3dfID8gdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSYXRpbyAtIGZpcnN0Um93TWF4UmF0aW8gOiAwO1xuICAgIHRoaXMuY2FsY3VsYXRpb25zXy5zY3JvbGxUaHJlc2hvbGRSYXRpbyA9XG4gICAgICAodGhpcy5maXhlZExhc3Ryb3dfID8gdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSYXRpbyA6IGZpcnN0Um93TWF4UmF0aW8pIC0gMTtcbiAgfVxuXG4gIGdldFJvd0hlaWdodF8oKSB7XG4gICAgY29uc3QgYnJlYWtwb2ludCA9IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuVE9PTEJBUl9NT0JJTEVfQlJFQUtQT0lOVDtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5nZXRWaWV3cG9ydFdpZHRoKCkgPCBicmVha3BvaW50ID9cbiAgICAgIE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuVE9PTEJBUl9ST1dfTU9CSUxFX0hFSUdIVCA6IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuVE9PTEJBUl9ST1dfSEVJR0hUO1xuICB9XG5cbiAgdXBkYXRlVG9vbGJhckZsZXhpYmxlU3RhdGVfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkxFWElCTEVfTUFYKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkxFWElCTEVfTUlOKTtcbiAgICBpZiAoZmxleGlibGVFeHBhbnNpb25SYXRpbyA9PT0gMSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01BWCk7XG4gICAgfSBlbHNlIGlmIChmbGV4aWJsZUV4cGFuc2lvblJhdGlvID09PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkxFWElCTEVfTUlOKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVUb29sYmFyRml4ZWRTdGF0ZV8oc2Nyb2xsVG9wKSB7XG4gICAgY29uc3QgdHJhbnNsYXRlRGlzdGFuY2UgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihcbiAgICAgIHNjcm9sbFRvcCAtIHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvbkhlaWdodCxcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZRGlzdGFuY2UpKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWSgkey10cmFuc2xhdGVEaXN0YW5jZX1weClgKTtcblxuICAgIGlmICh0cmFuc2xhdGVEaXN0YW5jZSA9PT0gdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlEaXN0YW5jZSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZJWEVEX0FUX0xBU1RfUk9XKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZJWEVEX0FUX0xBU1RfUk9XKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVGbGV4aWJsZVJvd0VsZW1lbnRTdHlsZXNfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pIHtcbiAgICBpZiAodGhpcy5maXhlZF8pIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvbkhlaWdodCAqIGZsZXhpYmxlRXhwYW5zaW9uUmF0aW87XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9yRmxleGlibGVSb3dFbGVtZW50KCdoZWlnaHQnLFxuICAgICAgICBgJHtoZWlnaHQgKyB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodH1weGApO1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VGbGV4RGVmYXVsdEJlaGF2aW9yXykge1xuICAgICAgdGhpcy51cGRhdGVFbGVtZW50U3R5bGVzRGVmYXVsdEJlaGF2aW9yXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVFbGVtZW50U3R5bGVzRGVmYXVsdEJlaGF2aW9yXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKSB7XG4gICAgY29uc3QgbWF4VGl0bGVTaXplID0gTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5NQVhfVElUTEVfU0laRTtcbiAgICBjb25zdCBtaW5UaXRsZVNpemUgPSBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLk1JTl9USVRMRV9TSVpFO1xuICAgIGNvbnN0IGN1cnJlbnRUaXRsZVNpemUgPSAobWF4VGl0bGVTaXplIC0gbWluVGl0bGVTaXplKSAqIGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gKyBtaW5UaXRsZVNpemU7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9yVGl0bGVFbGVtZW50KCdmb250LXNpemUnLCBgJHtjdXJyZW50VGl0bGVTaXplfXJlbWApO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGhlYWRlciBjbGFzcz1cIm1kYy10b29sYmFyLXdyYXBwZXJcIj5cbiAgICA8IS0tVG9vbGJhci0tPlxuICAgIDxkaXYgcmVmPVwicm9vdFwiIDpjbGFzcz1cInJvb3RDbGFzc2VzXCIgOnN0eWxlPVwicm9vdFN0eWxlc1wiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBGaXhlZCBBZGp1c3QgRWxlbWVudC0tPlxuICAgIDxkaXYgcmVmPVwiZml4ZWQtYWRqdXN0XCIgY2xhc3M9XCJtZGMtdG9vbGJhci1maXhlZC1hZGp1c3RcIiBcbiAgICAgIDpzdHlsZT1cImFkanVzdFN0eWxlc1wiXG4gICAgICB2LWlmPVwiZml4ZWQgfHwgd2F0ZXJmYWxsIHx8IGZpeGVkTGFzdHJvd1wiPjwvZGl2PlxuICA8L2hlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCBNRENUb29sYmFyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdG9vbGJhci9mb3VuZGF0aW9uJ1xuICBpbXBvcnQgKiBhcyB1dGlsIGZyb20gJ0BtYXRlcmlhbC90b29sYmFyL3V0aWwnXG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIG5hbWU6ICdtZGMtdG9vbGJhcicsXG4gICAgcHJvcHM6IHtcbiAgICAgICdmaXhlZCc6IEJvb2xlYW4sXG4gICAgICAnd2F0ZXJmYWxsJzogQm9vbGVhbixcbiAgICAgICdmaXhlZC1sYXN0cm93JzogQm9vbGVhbixcbiAgICAgICdmbGV4aWJsZSc6IEJvb2xlYW4sXG4gICAgICAnZmxleGlibGUtZGVmYXVsdCc6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZSB9XG4gICAgfSxcbiAgICBkYXRhICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvb3RDbGFzc2VzOiB7XG4gICAgICAgICAgJ21kYy10b29sYmFyJzogdHJ1ZSxcbiAgICAgICAgICAnbWRjLXRvb2xiYXItLWZpeGVkJzogdGhpcy5maXhlZCB8fCB0aGlzLndhdGVyZmFsbCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZml4ZWRMYXN0cm93LFxuICAgICAgICAgICdtZGMtdG9vbGJhci0td2F0ZXJmYWxsJzogdGhpcy53YXRlcmZhbGwsXG4gICAgICAgICAgJ21kYy10b29sYmFyLS1maXhlZC1sYXN0cm93LW9ubHknOiB0aGlzLmZpeGVkTGFzdHJvdyxcbiAgICAgICAgICAnbWRjLXRvb2xiYXItLWZsZXhpYmxlJzogdGhpcy5mbGV4aWJsZSxcbiAgICAgICAgICAnbWRjLXRvb2xiYXItLWZsZXhpYmxlLWRlZmF1bHQtYmVoYXZpb3InOiB0aGlzLmZsZXhpYmxlICYmXG4gICAgICAgICAgICB0aGlzLmZsZXhpYmxlRGVmYXVsdFxuICAgICAgICB9LFxuICAgICAgICByb290U3R5bGVzOiB7fSxcbiAgICAgICAgYWRqdXN0U3R5bGVzOiB7XG4gICAgICAgICAgLy8gdG8gYXZvaWQgdG9wIG1hcmdpbiBjb2xsYXBzZSB3aXRoIDphZnRlciBlbFxuICAgICAgICAgIC8vIDAuMSBweCBzaG91bGQgYmUgcm91bmRlZCB0byAwcHhcbiAgICAgICAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHRyaWNrXG4gICAgICAgICAgLy8gaGVpZ2h0OiAnMC4xcHgnXG4gICAgICAgIH0sXG4gICAgICAgIGZvdW5kYXRpb246IG51bGxcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uKHtcbiAgICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlclNjcm9sbEhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBnZXRWaWV3cG9ydFdpZHRoOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIH0sXG4gICAgICAgIGdldFZpZXdwb3J0U2Nyb2xsWTogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T2Zmc2V0SGVpZ2h0OiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMucm9vdC5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rmlyc3RSb3dFbGVtZW50T2Zmc2V0SGVpZ2h0OiAoKSA9PiB7XG4gICAgICAgICAgbGV0IGVsID0gdGhpcy4kcmVmcy5yb290LnF1ZXJ5U2VsZWN0b3IoTURDVG9vbGJhckZvdW5kYXRpb24uc3RyaW5ncy5GSVJTVF9ST1dfU0VMRUNUT1IpXG4gICAgICAgICAgcmV0dXJuIChlbCkgPyBlbC5vZmZzZXRIZWlnaHQgOiB1bmRlZmluZWRcbiAgICAgICAgfSxcbiAgICAgICAgbm90aWZ5Q2hhbmdlOiAoZXZ0RGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGV2dERhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdFN0eWxlcywgcHJvcGVydHksIHZhbHVlKVxuICAgICAgICB9LFxuICAgICAgICBzZXRTdHlsZUZvclRpdGxlRWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIGxldCBlbCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLnN0cmluZ3MuVElUTEVfU0VMRUNUT1IpXG4gICAgICAgICAgaWYgKGVsKSBlbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIHNldFN0eWxlRm9yRmxleGlibGVSb3dFbGVtZW50OiAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgbGV0IGVsID0gdGhpcy4kcmVmcy5yb290LnF1ZXJ5U2VsZWN0b3IoTURDVG9vbGJhckZvdW5kYXRpb24uc3RyaW5ncy5GSVJTVF9ST1dfU0VMRUNUT1IpXG4gICAgICAgICAgaWYgKGVsKSBlbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIHNldFN0eWxlRm9yRml4ZWRBZGp1c3RFbGVtZW50OiAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMuYWRqdXN0U3R5bGVzLCBwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG4gICAgfSxcbiAgICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLXRvb2xiYXItcm93IG1kYy10b29sYmFyX19yb3dcIj5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLXJvdydcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1kYy10b29sYmFyLXNlY3Rpb24gbWRjLXRvb2xiYXJfX3NlY3Rpb25cIiA6Y2xhc3M9XCJjbGFzc2VzXCI+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRvb2xiYXItc2VjdGlvbicsXG4gIHByb3BzOiB7XG4gICAgJ2FsaWduLXN0YXJ0JzogQm9vbGVhbixcbiAgICAnYWxpZ24tZW5kJzogQm9vbGVhbixcbiAgICAnc2hyaW5rLXRvLWZpdCc6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy10b29sYmFyX19zZWN0aW9uLS1hbGlnbi1zdGFydCc6IHRoaXMuYWxpZ25TdGFydCxcbiAgICAgICAgJ21kYy10b29sYmFyX19zZWN0aW9uLS1hbGlnbi1lbmQnOiB0aGlzLmFsaWduRW5kLFxuICAgICAgICAnbWRjLXRvb2xiYXJfX3NlY3Rpb24tLXNocmluay10by1maXQnOiB0aGlzLnNocmlua1RvRml0XG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGEgY2xhc3M9XCJtZGMtdG9vbGJhci1tZW51LWljb24gbWRjLXRvb2xiYXJfX21lbnUtaWNvblwiXG4gICAgOmNsYXNzPVwieydtYXRlcmlhbC1pY29ucyc6ISFpY29ufVwiXG4gICAgQGNsaWNrPVwiZGlzcGF0Y2hFdmVudFwiPlxuICAgIDxzbG90Pnt7aWNvbn19PC9zbG90PlxuICA8L2E+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHtEaXNwYXRjaEV2ZW50TWl4aW59IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLW1lbnUtaWNvbicsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgaWNvbjoge3R5cGU6IFN0cmluZywgJ2RlZmF1bHQnOiBcIm1lbnVcIn1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGEgY2xhc3M9XCJtZGMtdG9vbGJhci10aXRsZSBtZGMtdG9vbGJhcl9fdGl0bGVcIiBAY2xpY2s9XCJkaXNwYXRjaEV2ZW50XCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8L2E+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHtEaXNwYXRjaEV2ZW50TWl4aW59IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLXRpdGxlJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluXVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxhIGNsYXNzPVwibWRjLXRvb2xiYXItaWNvbiBtZGMtdG9vbGJhcl9faWNvblwiIFxuICAgIDpjbGFzcz1cInsnbWF0ZXJpYWwtaWNvbnMnOiEhaWNvbn1cIlxuICAgIEBjbGljaz1cImRpc3BhdGNoRXZlbnRcIj5cbiAgICA8c2xvdD57e2ljb259fTwvc2xvdD5cbiAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGlufSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdG9vbGJhci1pY29uJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluXSxcbiAgcHJvcHM6IHtcbiAgICBpY29uOiBTdHJpbmdcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjVG9vbGJhciBmcm9tICcuL21kYy10b29sYmFyLnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFyUm93IGZyb20gJy4vbWRjLXRvb2xiYXItcm93LnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFyU2VjdGlvbiBmcm9tICcuL21kYy10b29sYmFyLXNlY3Rpb24udnVlJ1xuaW1wb3J0IG1kY1Rvb2xiYXJNZW51SWNvbiBmcm9tICcuL21kYy10b29sYmFyLW1lbnUtaWNvbi52dWUnXG5pbXBvcnQgbWRjVG9vbGJhclRpdGxlIGZyb20gJy4vbWRjLXRvb2xiYXItdGl0bGUudnVlJ1xuaW1wb3J0IG1kY1Rvb2xiYXJJY29uIGZyb20gJy4vbWRjLXRvb2xiYXItaWNvbi52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY1Rvb2xiYXIsXG4gIG1kY1Rvb2xiYXJSb3csXG4gIG1kY1Rvb2xiYXJTZWN0aW9uLFxuICBtZGNUb29sYmFyTWVudUljb24sXG4gIG1kY1Rvb2xiYXJUaXRsZSxcbiAgbWRjVG9vbGJhckljb25cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1Rvb2xiYXIsXG4gIG1kY1Rvb2xiYXJSb3csXG4gIG1kY1Rvb2xiYXJTZWN0aW9uLFxuICBtZGNUb29sYmFyTWVudUljb24sXG4gIG1kY1Rvb2xiYXJUaXRsZSxcbiAgbWRjVG9vbGJhckljb25cbn0pXG5cbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiU3RyaW5nIiwiT2JqZWN0IiwiQXJyYXkiLCJldnQiLCIkZW1pdCIsInR5cGUiLCJldmVudCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiJHJvb3QiLCJhcmdzIiwiZXZlbnRBcmdzIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsImNzc0NsYXNzZXMiLCJzdHJpbmdzIiwibnVtYmVycyIsIk1EQ1Rvb2xiYXJGb3VuZGF0aW9uIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsInJlc2l6ZUhhbmRsZXJfIiwiY2hlY2tSb3dIZWlnaHRfIiwic2Nyb2xsSGFuZGxlcl8iLCJ1cGRhdGVUb29sYmFyU3R5bGVzXyIsImNoZWNrUm93SGVpZ2h0RnJhbWVfIiwic2Nyb2xsRnJhbWVfIiwiZXhlY3V0ZWRMYXN0Q2hhbmdlXyIsImNhbGN1bGF0aW9uc18iLCJmaXhlZF8iLCJmaXhlZExhc3Ryb3dfIiwiaGFzRmxleGlibGVSb3dfIiwidXNlRmxleERlZmF1bHRCZWhhdmlvcl8iLCJoYXNDbGFzcyIsIkZJWEVEIiwiRklYRURfTEFTVFJPVyIsIlRPT0xCQVJfUk9XX0ZMRVhJQkxFIiwiRkxFWElCTEVfREVGQVVMVF9CRUhBVklPUiIsImluaXRLZXlSYXRpb18iLCJzZXRLZXlIZWlnaHRzXyIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInJlZ2lzdGVyU2Nyb2xsSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIiLCJzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudCIsInRvb2xiYXJIZWlnaHQiLCJzY3JvbGxUb3AiLCJkZWx0YSIsIk1hdGgiLCJtYXgiLCJmbGV4aWJsZUV4cGFuc2lvbkhlaWdodCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5ld1Rvb2xiYXJSb3dIZWlnaHQiLCJnZXRSb3dIZWlnaHRfIiwidG9vbGJhclJvd0hlaWdodCIsInRvb2xiYXJSYXRpbyIsImZsZXhpYmxlRXhwYW5zaW9uUmF0aW8iLCJtYXhUcmFuc2xhdGVZRGlzdGFuY2UiLCJtYXhUcmFuc2xhdGVZUmF0aW8iLCJzY3JvbGxUaHJlc2hvbGQiLCJzY3JvbGxUaHJlc2hvbGRSYXRpbyIsInVwZGF0ZUFkanVzdEVsZW1lbnRTdHlsZXMiLCJnZXRWaWV3cG9ydFNjcm9sbFkiLCJoYXNTY3JvbGxlZE91dE9mVGhyZXNob2xkIiwic2Nyb2xsZWRPdXRPZlRocmVzaG9sZF8iLCJnZXRGbGV4aWJsZUV4cGFuc2lvblJhdGlvXyIsInVwZGF0ZVRvb2xiYXJGbGV4aWJsZVN0YXRlXyIsInVwZGF0ZVRvb2xiYXJGaXhlZFN0YXRlXyIsInVwZGF0ZUZsZXhpYmxlUm93RWxlbWVudFN0eWxlc18iLCJub3RpZnlDaGFuZ2UiLCJmaXJzdFJvd01heFJhdGlvIiwiZ2V0Rmlyc3RSb3dFbGVtZW50T2Zmc2V0SGVpZ2h0IiwiZ2V0T2Zmc2V0SGVpZ2h0IiwiYnJlYWtwb2ludCIsIlRPT0xCQVJfTU9CSUxFX0JSRUFLUE9JTlQiLCJnZXRWaWV3cG9ydFdpZHRoIiwiVE9PTEJBUl9ST1dfTU9CSUxFX0hFSUdIVCIsIlRPT0xCQVJfUk9XX0hFSUdIVCIsInJlbW92ZUNsYXNzIiwiRkxFWElCTEVfTUFYIiwiRkxFWElCTEVfTUlOIiwiYWRkQ2xhc3MiLCJ0cmFuc2xhdGVEaXN0YW5jZSIsIm1pbiIsInNldFN0eWxlIiwiRklYRURfQVRfTEFTVF9ST1ciLCJoZWlnaHQiLCJzZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudCIsInVwZGF0ZUVsZW1lbnRTdHlsZXNEZWZhdWx0QmVoYXZpb3JfIiwibWF4VGl0bGVTaXplIiwiTUFYX1RJVExFX1NJWkUiLCJtaW5UaXRsZVNpemUiLCJNSU5fVElUTEVfU0laRSIsImN1cnJlbnRUaXRsZVNpemUiLCJzZXRTdHlsZUZvclRpdGxlRWxlbWVudCIsInN1cHBvcnRzUGFzc2l2ZV8iLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJmb3JjZVJlZnJlc2giLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwicmVuZGVyIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJmaXhlZCIsIndhdGVyZmFsbCIsImZpeGVkTGFzdHJvdyIsImZsZXhpYmxlIiwiZmxleGlibGVEZWZhdWx0IiwiZm91bmRhdGlvbiIsImNsYXNzTmFtZSIsIiRzZXQiLCJyb290Q2xhc3NlcyIsIiRkZWxldGUiLCIkcmVmcyIsInJvb3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImhhbmRsZXIiLCJ1dGlsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVyV2lkdGgiLCJwYWdlWU9mZnNldCIsIm9mZnNldEhlaWdodCIsImVsIiwicXVlcnlTZWxlY3RvciIsIkZJUlNUX1JPV19TRUxFQ1RPUiIsImV2dERhdGEiLCJwcm9wZXJ0eSIsInZhbHVlIiwicm9vdFN0eWxlcyIsIlRJVExFX1NFTEVDVE9SIiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImFkanVzdFN0eWxlcyIsImluaXQiLCJkZXN0cm95IiwiYWxpZ25TdGFydCIsImFsaWduRW5kIiwic2hyaW5rVG9GaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjs7TUFFNUJDLE9BQU8sSUFBWDtNQUNJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7V0FDMUJBLE9BQU9DLEdBQWQ7R0FERixNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQzs7V0FFakNBLE9BQU9ELEdBQWQ7O01BRUVGLElBQUosRUFBVTtTQUNISSxHQUFMLENBQVNMLE1BQVQ7Ozs7QUNWRyxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztTQUMvQjthQUNJLFFBREo7YUFFSSxpQkFBQ0MsRUFBRCxFQUFRO1dBQ1YsSUFBSUMsR0FBVCxJQUFnQkYsVUFBaEIsRUFBNEI7WUFDdEJHLFlBQVlILFdBQVdFLEdBQVgsQ0FBaEI7V0FDS0MsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FBNUI7O0tBTEQ7O0dBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RGOztBQ0FPLElBQU1FLHFCQUFxQjtTQUN6QjthQUNJQyxNQURKO29CQUVXQyxNQUZYO2tCQUdTQztHQUpnQjtXQU12QjtpQkFBQSx5QkFDUUMsR0FEUixFQUNhO1dBQ2JDLEtBQUwsQ0FBV0QsSUFBSUUsSUFBZjtVQUNJ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
