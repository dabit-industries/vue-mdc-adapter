/**
* @module vue-mdc-adaptercard 0.11.2
* @exports VueMDCCard
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCCard = factory());
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

var CustomLink = {
  name: 'custom-link',
  functional: true,
  props: {
    tag: { type: String, default: 'a' },
    link: Object
  },
  render: function render(h, context) {
    var element = void 0;
    var data = _extends({}, context.data);

    if (context.props.link && context.parent.$router) {
      // router-link case
      element = context.parent.$root.$options.components['router-link'];
      data.props = _extends({ tag: context.props.tag }, context.props.link);
      if (data.on.click) {
        data.nativeOn = { click: data.on.click };
      }
    } else {
      // element fallback
      element = context.props.tag;
    }

    return h(element, data, context.children);
  }
};

var CustomLinkMixin = {
  props: {
    to: [String, Object],
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String
  },
  computed: {
    link: function link() {
      return this.to && {
        to: this.to,
        exact: this.exact,
        append: this.append,
        replace: this.replace,
        activeClass: this.activeClass,
        exactActiveClass: this.exactActiveClass
      };
    }
  },
  components: {
    CustomLink: CustomLink
  }
};

/* global CustomEvent */

var CustomButton = {
  name: 'custom-button',
  functional: true,
  props: {
    link: Object
  },
  render: function render(h, context) {
    var element = void 0;
    var data = _extends({}, context.data);

    if (context.props.link && context.parent.$router) {
      // router-link case
      element = context.parent.$root.$options.components['router-link'];
      data.props = _extends({ tag: context.props.tag }, context.props.link);
      data.attrs.role = 'button';
      if (data.on.click) {
        data.nativeOn = { click: data.on.click };
      }
    } else if (data.attrs && data.attrs.href) {
      // href case
      element = 'a';
      data.attrs.role = 'button';
    } else {
      // button fallback
      element = 'button';
    }

    return h(element, data, context.children);
  }
};

var CustomButtonMixin = {
  props: {
    href: String,
    disabled: Boolean,
    to: [String, Object],
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String
  },
  computed: {
    link: function link() {
      return this.to && {
        to: this.to,
        exact: this.exact,
        append: this.append,
        replace: this.replace,
        activeClass: this.activeClass,
        exactActiveClass: this.exactActiveClass
      };
    }
  },
  components: {
    CustomButton: CustomButton
  }
};

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

var mdcCard = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card", class: { 'mdc-card--stroked': _vm.stroked } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: "mdc-card",
  props: {
    stroked: Boolean
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
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
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
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    classCallCheck(this, MDCRippleAdapter);
  }

  createClass(MDCRippleAdapter, [{
    key: "browserSupportsCssVars",

    /** @return {boolean} */
    value: function browserSupportsCssVars() {}

    /** @return {boolean} */

  }, {
    key: "isUnbounded",
    value: function isUnbounded() {}

    /** @return {boolean} */

  }, {
    key: "isSurfaceActive",
    value: function isSurfaceActive() {}

    /** @return {boolean} */

  }, {
    key: "isSurfaceDisabled",
    value: function isSurfaceDisabled() {}

    /** @param {string} className */

  }, {
    key: "addClass",
    value: function addClass(className) {}

    /** @param {string} className */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /** @param {!EventTarget} target */

  }, {
    key: "containsEventTarget",
    value: function containsEventTarget(target) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "registerDocumentInteractionHandler",
    value: function registerDocumentInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "deregisterDocumentInteractionHandler",
    value: function deregisterDocumentInteractionHandler(evtType, handler) {}

    /**
     * @param {!Function} handler
     */

  }, {
    key: "registerResizeHandler",
    value: function registerResizeHandler(handler) {}

    /**
     * @param {!Function} handler
     */

  }, {
    key: "deregisterResizeHandler",
    value: function deregisterResizeHandler(handler) {}

    /**
     * @param {string} varName
     * @param {?number|string} value
     */

  }, {
    key: "updateCssVariable",
    value: function updateCssVariable(varName, value) {}

    /** @return {!ClientRect} */

  }, {
    key: "computeBoundingRect",
    value: function computeBoundingRect() {}

    /** @return {{x: number, y: number}} */

  }, {
    key: "getWindowPageOffset",
    value: function getWindowPageOffset() {}
  }]);
  return MDCRippleAdapter;
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

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
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
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
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

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}

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

// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
var activatedTargets = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var MDCRippleFoundation = function (_MDCFoundation) {
  inherits(MDCRippleFoundation, _MDCFoundation);
  createClass(MDCRippleFoundation, null, [{
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
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    /** @private {function(!Event)} */
    _this.deactivateHandler_ = function (e) {
      return _this.deactivate_(e);
    };

    /** @private {function(?Event=)} */
    _this.focusHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {function(?Event=)} */
    _this.blurHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {!{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    _this.previousActivationEvent_ = null;
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  createClass(MDCRippleFoundation, [{
    key: 'isSupported_',
    value: function isSupported_() {
      return this.adapter_.browserSupportsCssVars();
    }

    /**
     * @return {!ActivationStateType}
     */

  }, {
    key: 'defaultActivationState_',
    value: function defaultActivationState_() {
      return {
        isActivated: false,
        hasDeactivationUXRun: false,
        wasActivatedByPointer: false,
        wasElementMadeActive: false,
        activationEvent: null,
        isProgrammatic: false
      };
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (!this.isSupported_()) {
        return;
      }
      this.registerRootHandlers_();

      var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$.ROOT,
          UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

      requestAnimationFrame(function () {
        _this2.adapter_.addClass(ROOT);
        if (_this2.adapter_.isUnbounded()) {
          _this2.adapter_.addClass(UNBOUNDED);
        }
        _this2.layoutInternal_();
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      if (!this.isSupported_()) {
        return;
      }
      this.deregisterRootHandlers_();
      this.deregisterDeactivationHandlers_();

      var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$2.ROOT,
          UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

      requestAnimationFrame(function () {
        _this3.adapter_.removeClass(ROOT);
        _this3.adapter_.removeClass(UNBOUNDED);
        _this3.removeCssVars_();
      });
    }

    /** @private */

  }, {
    key: 'registerRootHandlers_',
    value: function registerRootHandlers_() {
      var _this4 = this;

      ACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
      });
      this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
      this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }

    /**
     * @param {!Event} e
     * @private
     */

  }, {
    key: 'registerDeactivationHandlers_',
    value: function registerDeactivationHandlers_(e) {
      var _this5 = this;

      if (e.type === 'keydown') {
        this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
      } else {
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
        });
      }
    }

    /** @private */

  }, {
    key: 'deregisterRootHandlers_',
    value: function deregisterRootHandlers_() {
      var _this6 = this;

      ACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
      });
      this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
      this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }

    /** @private */

  }, {
    key: 'deregisterDeactivationHandlers_',
    value: function deregisterDeactivationHandlers_() {
      var _this7 = this;

      this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
      });
    }

    /** @private */

  }, {
    key: 'removeCssVars_',
    value: function removeCssVars_() {
      var _this8 = this;

      var strings$$1 = MDCRippleFoundation.strings;

      Object.keys(strings$$1).forEach(function (k) {
        if (k.indexOf('VAR_') === 0) {
          _this8.adapter_.updateCssVariable(strings$$1[k], null);
        }
      });
    }

    /**
     * @param {?Event} e
     * @private
     */

  }, {
    key: 'activate_',
    value: function activate_(e) {
      var _this9 = this;

      if (this.adapter_.isSurfaceDisabled()) {
        return;
      }

      var activationState = this.activationState_;
      if (activationState.isActivated) {
        return;
      }

      // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
      var previousActivationEvent = this.previousActivationEvent_;
      var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
      if (isSameInteraction) {
        return;
      }

      activationState.isActivated = true;
      activationState.isProgrammatic = e === null;
      activationState.activationEvent = e;
      activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

      var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
        return _this9.adapter_.containsEventTarget(target);
      });
      if (hasActivatedChild) {
        // Immediately reset activation state, while preserving logic that prevents touch follow-on events
        this.resetActivationState_();
        return;
      }

      if (e) {
        activatedTargets.push( /** @type {!EventTarget} */e.target);
        this.registerDeactivationHandlers_(e);
      }

      requestAnimationFrame(function () {
        // This needs to be wrapped in an rAF call b/c web browsers
        // report active states inconsistently when they're called within
        // event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this9.adapter_.isSurfaceActive() : true;
        if (activationState.wasElementMadeActive) {
          _this9.animateActivation_();
        } else {
          // Reset activation state immediately if element was not made active.
          _this9.activationState_ = _this9.defaultActivationState_();
        }

        // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
        activatedTargets = [];
      });
    }

    /**
     * @param {?Event=} event Optional event containing position information.
     */

  }, {
    key: 'activate',
    value: function activate() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.activate_(event);
    }

    /** @private */

  }, {
    key: 'animateActivation_',
    value: function animateActivation_() {
      var _this10 = this;

      var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
          VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
          VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
      var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
          FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
          FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
      var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


      var translateStart = '';
      var translateEnd = '';

      if (!this.adapter_.isUnbounded()) {
        var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
            startPoint = _getFgTranslationCoor.startPoint,
            endPoint = _getFgTranslationCoor.endPoint;

        translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
        translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
      }

      this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
      this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
      // Cancel any ongoing activation/deactivation animations
      clearTimeout(this.activationTimer_);
      clearTimeout(this.fgDeactivationRemovalTimer_);
      this.rmBoundedActivationClasses_();
      this.adapter_.removeClass(FG_DEACTIVATION);

      // Force layout in order to re-trigger the animation.
      this.adapter_.computeBoundingRect();
      this.adapter_.addClass(FG_ACTIVATION);
      this.activationTimer_ = setTimeout(function () {
        return _this10.activationTimerCallback_();
      }, DEACTIVATION_TIMEOUT_MS);
    }

    /**
     * @private
     * @return {{startPoint: PointType, endPoint: PointType}}
     */

  }, {
    key: 'getFgTranslationCoordinates_',
    value: function getFgTranslationCoordinates_() {
      var _activationState_ = this.activationState_,
          activationEvent = _activationState_.activationEvent,
          wasActivatedByPointer = _activationState_.wasActivatedByPointer;


      var startPoint = void 0;
      if (wasActivatedByPointer) {
        startPoint = getNormalizedEventCoords(
        /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
      } else {
        startPoint = {
          x: this.frame_.width / 2,
          y: this.frame_.height / 2
        };
      }
      // Center the element around the start point.
      startPoint = {
        x: startPoint.x - this.initialSize_ / 2,
        y: startPoint.y - this.initialSize_ / 2
      };

      var endPoint = {
        x: this.frame_.width / 2 - this.initialSize_ / 2,
        y: this.frame_.height / 2 - this.initialSize_ / 2
      };

      return { startPoint: startPoint, endPoint: endPoint };
    }

    /** @private */

  }, {
    key: 'runDeactivationUXLogicIfReady_',
    value: function runDeactivationUXLogicIfReady_() {
      var _this11 = this;

      // This method is called both when a pointing device is released, and when the activation animation ends.
      // The deactivation animation should only run after both of those occur.
      var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
      var _activationState_2 = this.activationState_,
          hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
          isActivated = _activationState_2.isActivated;

      var activationHasEnded = hasDeactivationUXRun || !isActivated;

      if (activationHasEnded && this.activationAnimationHasEnded_) {
        this.rmBoundedActivationClasses_();
        this.adapter_.addClass(FG_DEACTIVATION);
        this.fgDeactivationRemovalTimer_ = setTimeout(function () {
          _this11.adapter_.removeClass(FG_DEACTIVATION);
        }, numbers.FG_DEACTIVATION_MS);
      }
    }

    /** @private */

  }, {
    key: 'rmBoundedActivationClasses_',
    value: function rmBoundedActivationClasses_() {
      var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

      this.adapter_.removeClass(FG_ACTIVATION);
      this.activationAnimationHasEnded_ = false;
      this.adapter_.computeBoundingRect();
    }
  }, {
    key: 'resetActivationState_',
    value: function resetActivationState_() {
      var _this12 = this;

      this.previousActivationEvent_ = this.activationState_.activationEvent;
      this.activationState_ = this.defaultActivationState_();
      // Touch devices may fire additional events for the same interaction within a short time.
      // Store the previous event until it's safe to assume that subsequent events are for new interactions.
      setTimeout(function () {
        return _this12.previousActivationEvent_ = null;
      }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    }

    /**
     * @param {?Event} e
     * @private
     */

  }, {
    key: 'deactivate_',
    value: function deactivate_(e) {
      var _this13 = this;

      var activationState = this.activationState_;
      // This can happen in scenarios such as when you have a keyup event that blurs the element.
      if (!activationState.isActivated) {
        return;
      }

      var state = /** @type {!ActivationStateType} */_extends({}, activationState);

      if (activationState.isProgrammatic) {
        var evtObject = null;
        requestAnimationFrame(function () {
          return _this13.animateDeactivation_(evtObject, state);
        });
        this.resetActivationState_();
      } else {
        this.deregisterDeactivationHandlers_();
        requestAnimationFrame(function () {
          _this13.activationState_.hasDeactivationUXRun = true;
          _this13.animateDeactivation_(e, state);
          _this13.resetActivationState_();
        });
      }
    }

    /**
     * @param {?Event=} event Optional event containing position information.
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.deactivate_(event);
    }

    /**
     * @param {Event} e
     * @param {!ActivationStateType} options
     * @private
     */

  }, {
    key: 'animateDeactivation_',
    value: function animateDeactivation_(e, _ref) {
      var wasActivatedByPointer = _ref.wasActivatedByPointer,
          wasElementMadeActive = _ref.wasElementMadeActive;

      if (wasActivatedByPointer || wasElementMadeActive) {
        this.runDeactivationUXLogicIfReady_();
      }
    }
  }, {
    key: 'layout',
    value: function layout() {
      var _this14 = this;

      if (this.layoutFrame_) {
        cancelAnimationFrame(this.layoutFrame_);
      }
      this.layoutFrame_ = requestAnimationFrame(function () {
        _this14.layoutInternal_();
        _this14.layoutFrame_ = 0;
      });
    }

    /** @private */

  }, {
    key: 'layoutInternal_',
    value: function layoutInternal_() {
      var _this15 = this;

      this.frame_ = this.adapter_.computeBoundingRect();
      var maxDim = Math.max(this.frame_.height, this.frame_.width);

      // Surface diameter is treated differently for unbounded vs. bounded ripples.
      // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
      // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
      // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
      // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
      // `overflow: hidden`.
      var getBoundedRadius = function getBoundedRadius() {
        var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
        return hypotenuse + MDCRippleFoundation.numbers.PADDING;
      };

      this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

      // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
      this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
      this.fgScale_ = this.maxRadius_ / this.initialSize_;

      this.updateLayoutCssVars_();
    }

    /** @private */

  }, {
    key: 'updateLayoutCssVars_',
    value: function updateLayoutCssVars_() {
      var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
          VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
          VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
          VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
          VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


      this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
      this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

      if (this.adapter_.isUnbounded()) {
        this.unboundedCoords_ = {
          left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
          top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
        };

        this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
        this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
      }
    }

    /** @param {boolean} unbounded */

  }, {
    key: 'setUnbounded',
    value: function setUnbounded(unbounded) {
      var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

      if (unbounded) {
        this.adapter_.addClass(UNBOUNDED);
      } else {
        this.adapter_.removeClass(UNBOUNDED);
      }
    }
  }]);
  return MDCRippleFoundation;
}(MDCFoundation);

var RippleBase = function (_MDCRippleFoundation) {
  inherits(RippleBase, _MDCRippleFoundation);
  createClass(RippleBase, null, [{
    key: 'isSurfaceActive',
    value: function isSurfaceActive(ref) {
      return ref[RippleBase.MATCHES](':active');
    }
  }, {
    key: 'MATCHES',
    get: function get$$1() {
      /* global HTMLElement */
      return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
    }
  }]);

  function RippleBase(vm, options) {
    classCallCheck(this, RippleBase);
    return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      isUnbounded: function isUnbounded() {
        return false;
      },
      isSurfaceActive: function isSurfaceActive() {
        return vm.$el[RippleBase.MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return vm.disabled;
      },
      addClass: function addClass(className) {
        vm.$set(vm.classes, className, true);
      },
      removeClass: function removeClass(className) {
        vm.$delete(vm.classes, className);
      },

      containsEventTarget: function containsEventTarget(target) {
        return vm.$el.contains(target);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        vm.$el.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        vm.$el.removeEventListener(evt, handler);
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        vm.$set(vm.styles, varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return vm.$el.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    }, options)));
  }

  return RippleBase;
}(MDCRippleFoundation);

var RippleMixin = {
  data: function data() {
    return {
      classes: {},
      styles: {}
    };
  },
  mounted: function mounted() {
    this.ripple = new RippleBase(this);
    this.ripple.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.ripple.destroy();
  }
};

var mdcCardPrimaryAction = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', { staticClass: "mdc-card-primary-action mdc-card__primary-action", class: _vm.classes, style: _vm.styles, attrs: { "link": _vm.link }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-primary-action',
  mixins: [DispatchEventMixin, CustomLinkMixin, RippleMixin],
  data: function data() {
    return {
      classes: {},
      styles: {}
    };
  }
};

var mdcCardMedia = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-media mdc-card__media", class: _vm.classes, style: _vm.styles }, [_vm.$slots.default ? _c('div', { staticClass: "mdc-card__media-content" }, [_vm._t("default")], 2) : _vm._e()]);
  }, staticRenderFns: [],
  name: "mdc-card-media",
  props: {
    src: String,
    'square': Boolean
  },
  computed: {
    styles: function styles() {
      var styles = {
        backgroundImage: 'url(' + this.src + ')'
      };

      return styles;
    },
    classes: function classes() {
      return this.square ? 'mdc-card__media--square' : 'mdc-card__media--16-9';
    }
  }
};

var mdcCardHeader = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-header mdc-card__primary" }, [_vm._t("default", [_vm.title ? _c('h1', { staticClass: "mdc-card__title", class: { 'mdc-card__title--large': _vm.largeTitle } }, [_vm._v(" " + _vm._s(_vm.title) + " ")]) : _vm._e(), _vm._v(" "), _vm.subtitle ? _c('h2', { staticClass: "mdc-card__subtitle" }, [_vm._v(" " + _vm._s(_vm.subtitle) + " ")]) : _vm._e()])], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-header',
  props: {
    'title': String,
    'subtitle': String,
    'large-title': { type: Boolean, default: true }
  }
};

var mdcCardTitle = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('h1', { staticClass: "mdc-card-title mdc-card__title", class: { 'mdc-card__title--large': _vm.large } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-title',
  props: {
    'large': Boolean
  }
};

var mdcCardSubtitle = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('h2', { staticClass: "mdc-card-subtitle mdc-card__subtitle" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-subtitle'
};

var mdcCardText = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-text mdc-card__supporting-text" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-text'
};

var mdcCardActions = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-card-actions mdc-card__actions", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-actions',
  props: {
    fullBleed: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'mdc-card__actions--full-bleed': this.fullBleed
      };
    }
  }
};

var mdcCardActionButtons = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card-action-buttons mdc-card__action-buttons" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: "mdc-card-action-buttons"
};

var mdcButtonBase = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-button', { ref: "root", class: _vm.classes, style: _vm.styles, attrs: { "href": _vm.href, "link": _vm.link, "disabled": _vm.disabled }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-button-base',
  mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
  data: function data() {
    return {
      classes: {},
      styles: {}
    };
  }
};

var mdcCardActionButton = {
  name: 'mdc-card-action-button',
  extends: mdcButtonBase,
  props: {
    compact: Boolean,
    accent: Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-button': true,
        'mdc-card__action': true,
        'mdc-card-action-button': true,
        'mdc-button--compact': this.compact,
        'mdc-button--accent': this.accent
      }
    };
  },

  watch: {
    compact: function compact() {
      this.$set(this.classes, 'mdc-button--compact', this.compact);
    },
    accent: function accent() {
      this.$set(this.classes, 'mdc-button--accent', this.accent);
    }
  }
};

var mdcCardActionIcons = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-card-action-icons mdc-card__action-icons" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: "mdc-card-action-icons"
};

var mdcCardActionIcon = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.classes, style: _vm.styles, on: { "click": _vm.dispatchEvent } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
  }, staticRenderFns: [],
  name: 'mdc-card-action-icon',
  mixins: [DispatchEventMixin],
  props: {
    icon: String
  },
  data: function data() {
    return {
      classes: {
        'mdc-card-action-icon': true,
        'material-icons': !!this.icon,
        'mdc-card__action': true,
        'mdc-card__action--icon': true,
        'mdc-icon-toggle': true
      },
      styles: {}
    };
  },

  watch: {
    icon: function icon() {
      this.$set(this.classes, 'material-icons', !!this.icon);
    }
  },
  mounted: function mounted() {
    this.ripple = new RippleBase(this, {
      isUnbounded: function isUnbounded() {
        return true;
      }
    });
    this.ripple.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.ripple.destroy();
  }
};

var plugin = BasePlugin({
  mdcCard: mdcCard,
  mdcCardPrimaryAction: mdcCardPrimaryAction,
  mdcCardMedia: mdcCardMedia,
  mdcCardHeader: mdcCardHeader,
  mdcCardTitle: mdcCardTitle,
  mdcCardSubtitle: mdcCardSubtitle,
  mdcCardText: mdcCardText,
  mdcCardActions: mdcCardActions,
  mdcCardActionButtons: mdcCardActionButtons,
  mdcCardActionButton: mdcCardActionButton,
  mdcCardActionIcons: mdcCardActionIcons,
  mdcCardActionIcon: mdcCardActionIcon
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWJ1dHRvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1ldmVudC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1wcmltYXJ5LWFjdGlvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NhcmQvbWRjLWNhcmQtbWVkaWEudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWhlYWRlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NhcmQvbWRjLWNhcmQtdGl0bGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLXN1YnRpdGxlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC10ZXh0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1hY3Rpb25zLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvY2FyZC9tZGMtY2FyZC1hY3Rpb24tYnV0dG9ucy52dWUiLCIuLi8uLi9jb21wb25lbnRzL2J1dHRvbi9tZGMtYnV0dG9uLWJhc2UudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWFjdGlvbi1idXR0b24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL21kYy1jYXJkLWFjdGlvbi1pY29ucy52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NhcmQvbWRjLWNhcmQtYWN0aW9uLWljb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9jYXJkL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsImV4cG9ydCBjb25zdCBDdXN0b21MaW5rID0ge1xuICBuYW1lOiAnY3VzdG9tLWxpbmsnLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIHRhZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdhJyB9LFxuICAgIGxpbmsgOiBPYmplY3QsXG4gIH0sXG4gIHJlbmRlciAoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50IFxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxuXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXSBcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHt0YWc6IGNvbnRleHQucHJvcHMudGFnfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgaWYgKGRhdGEub24uY2xpY2spIHtcbiAgICAgICAgZGF0YS5uYXRpdmVPbiA9IHtjbGljazogZGF0YS5vbi5jbGljayB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVsZW1lbnQgZmFsbGJhY2tcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnByb3BzLnRhZyBcbiAgICB9IFxuXG4gICAgcmV0dXJuIGgoZWxlbWVudCwgZGF0YSwgY29udGV4dC5jaGlsZHJlbilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tTGlua01peGluID0ge1xuICBwcm9wczoge1xuICAgIHRvOiBbU3RyaW5nLCBPYmplY3RdLFxuICAgIGV4YWN0OiBCb29sZWFuLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICByZXBsYWNlOiBCb29sZWFuLFxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgZXhhY3RBY3RpdmVDbGFzczogU3RyaW5nLFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGxpbmsgKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG8gJiYge1xuICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgZXhhY3Q6IHRoaXMuZXhhY3QsXG4gICAgICAgIGFwcGVuZDogdGhpcy5hcHBlbmQsXG4gICAgICAgIHJlcGxhY2U6IHRoaXMucmVwbGFjZSxcbiAgICAgICAgYWN0aXZlQ2xhc3M6IHRoaXMuYWN0aXZlQ2xhc3MsXG4gICAgICAgIGV4YWN0QWN0aXZlQ2xhc3M6IHRoaXMuZXhhY3RBY3RpdmVDbGFzcyxcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHMgOiB7IFxuICAgIEN1c3RvbUxpbmsgXG4gIH1cbn0iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbiA9IHtcbiAgbmFtZTogJ2N1c3RvbS1idXR0b24nLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIGxpbmsgOiBPYmplY3QsXG4gIH0sXG4gIHJlbmRlciAoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50IFxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxuXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXSBcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHt0YWc6IGNvbnRleHQucHJvcHMudGFnfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7Y2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmhyZWYpIHtcbiAgICAgIC8vIGhyZWYgY2FzZVxuICAgICAgZWxlbWVudCA9ICdhJyBcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXG4gICAgfSAgZWxzZSB7XG4gICAgICAvLyBidXR0b24gZmFsbGJhY2tcbiAgICAgIGVsZW1lbnQgPSAnYnV0dG9uJ1xuICAgIH0gXG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21CdXR0b25NaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICBocmVmOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGluayAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50byAmJiB7XG4gICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcbiAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxuICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzLFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50cyA6IHsgXG4gICAgQ3VzdG9tQnV0dG9uIFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1kYy1jYXJkXCIgOmNsYXNzPVwieydtZGMtY2FyZC0tc3Ryb2tlZCc6IHN0cm9rZWR9XCI+XHJcbiAgICA8c2xvdD5cclxuICAgIDwvc2xvdD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIm1kYy1jYXJkXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIHN0cm9rZWQ6IEJvb2xlYW5cclxuICB9XHJcbn07XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshe2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgd3JhcHBlZCBpbiBhbiByQUYgY2FsbCBiL2Mgd2ViIGJyb3dzZXJzXG4gICAgICAvLyByZXBvcnQgYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpblxuICAgICAgLy8gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGdldE1hdGNoZXNQcm9wZXJ0eSwgYXBwbHlQYXNzaXZlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG5cbiAgc3RhdGljIGdldCBNQVRDSEVTICgpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKCBSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlIChyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbih7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICB9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgfSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KVxuICAgICAgfSxcbiAgICB9LCBvcHRpb25zKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn0gICIsIjx0ZW1wbGF0ZT5cclxuICA8Y3VzdG9tLWxpbmsgXHJcbiAgICBjbGFzcz1cIm1kYy1jYXJkLXByaW1hcnktYWN0aW9uIG1kYy1jYXJkX19wcmltYXJ5LWFjdGlvblwiXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgOnN0eWxlPVwic3R5bGVzXCIgXHJcbiAgICA6bGluaz1cImxpbmtcIiBcclxuICAgIEBjbGljaz1cImRpc3BhdGNoRXZlbnRcIj5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jdXN0b20tbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21MaW5rTWl4aW59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7IFJpcHBsZU1peGluIH0gZnJvbSAnLi4vcmlwcGxlL2luZGV4JztcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtY2FyZC1wcmltYXJ5LWFjdGlvbicsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21MaW5rTWl4aW4sIFJpcHBsZU1peGluXSxcclxuICBkYXRhICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHt9LFxyXG4gICAgICBzdHlsZXM6IHt9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHNlY3Rpb24gY2xhc3M9XCJtZGMtY2FyZC1tZWRpYSBtZGMtY2FyZF9fbWVkaWFcIiBcclxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtZGMtY2FyZF9fbWVkaWEtY29udGVudFwiIHYtaWY9XCIkc2xvdHMuZGVmYXVsdFwiPlxyXG4gICAgICA8c2xvdD5cclxuICAgICAgPC9zbG90PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwibWRjLWNhcmQtbWVkaWFcIixcclxuICBwcm9wczoge1xyXG4gICAgc3JjOiBTdHJpbmcsXHJcbiAgICAnc3F1YXJlJzogQm9vbGVhblxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHN0eWxlcygpIHtcclxuICAgICAgdmFyIHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnNyY30pYFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgIH0sIFxyXG4gICAgY2xhc3NlcygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlID8gJ21kYy1jYXJkX19tZWRpYS0tc3F1YXJlJzogJ21kYy1jYXJkX19tZWRpYS0tMTYtOSdcclxuICAgIH1cclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtZGMtY2FyZC1oZWFkZXIgbWRjLWNhcmRfX3ByaW1hcnlcIj5cbiAgICA8c2xvdD5cbiAgICAgIDxoMSBjbGFzcz1cIm1kYy1jYXJkX190aXRsZVwiXG4gICAgICAgIDpjbGFzcz1cInsnbWRjLWNhcmRfX3RpdGxlLS1sYXJnZSc6IGxhcmdlVGl0bGV9XCJcbiAgICAgICAgdi1pZj1cInRpdGxlXCJcbiAgICAgICAgPlxuICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgPC9oMT5cbiAgICAgIDxoMiBjbGFzcz1cIm1kYy1jYXJkX19zdWJ0aXRsZVwiXG4gICAgICAgIHYtaWY9XCJzdWJ0aXRsZVwiXG4gICAgICA+XG4gICAgICAge3sgc3VidGl0bGUgfX0gXG4gICAgICA8L2gyPlxuICAgIDwvc2xvdD5cbiAgPC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jYXJkLWhlYWRlcicsXG4gIHByb3BzOiB7XG4gICAgJ3RpdGxlJzogU3RyaW5nLFxuICAgICdzdWJ0aXRsZSc6IFN0cmluZyxcbiAgICAnbGFyZ2UtdGl0bGUnOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIGNsYXNzPVwibWRjLWNhcmQtdGl0bGUgbWRjLWNhcmRfX3RpdGxlXCJcbiAgICAgIDpjbGFzcz1cInsnbWRjLWNhcmRfX3RpdGxlLS1sYXJnZSc6IGxhcmdlfVwiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9oMT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtY2FyZC10aXRsZScsXG4gIHByb3BzOiB7XG4gICAgJ2xhcmdlJzogQm9vbGVhblxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGgyIGNsYXNzPVwibWRjLWNhcmQtc3VidGl0bGUgbWRjLWNhcmRfX3N1YnRpdGxlXCI+XG4gICAgPHNsb3Q+XG4gICAgPC9zbG90PlxuICA8L2gyPlxuPC90ZW1wbGF0ZT5cblxuXG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtY2FyZC1zdWJ0aXRsZSdcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1kYy1jYXJkLXRleHQgbWRjLWNhcmRfX3N1cHBvcnRpbmctdGV4dFwiPlxuICAgIDxzbG90PlxuICAgIDwvc2xvdD5cbiAgPC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jYXJkLXRleHQnXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cclxuICA8c2VjdGlvbiBjbGFzcz1cIm1kYy1jYXJkLWFjdGlvbnMgbWRjLWNhcmRfX2FjdGlvbnNcIiBcclxuICAgICAgICAgIDpjbGFzcz1cImNsYXNzZXNcIj5cclxuICAgIDxzbG90PlxyXG4gICAgPC9zbG90PlxyXG4gIDwvc2VjdGlvbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1jYXJkLWFjdGlvbnMnLFxyXG4gIHByb3BzOiB7XHJcbiAgICBmdWxsQmxlZWQ6IEJvb2xlYW5cclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBjbGFzc2VzICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICdtZGMtY2FyZF9fYWN0aW9ucy0tZnVsbC1ibGVlZCc6IHRoaXMuZnVsbEJsZWVkLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtZGMtY2FyZC1hY3Rpb24tYnV0dG9ucyBtZGMtY2FyZF9fYWN0aW9uLWJ1dHRvbnNcIj5cclxuICAgIDxzbG90PlxyXG4gICAgPC9zbG90PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwibWRjLWNhcmQtYWN0aW9uLWJ1dHRvbnNcIlxyXG59O1xyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxuICA8Y3VzdG9tLWJ1dHRvbiByZWY9XCJyb290XCJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCIgOnN0eWxlPVwic3R5bGVzXCIgXG4gICAgOmhyZWY9XCJocmVmXCIgOmxpbms9XCJsaW5rXCIgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiBcbiAgICBAY2xpY2s9XCJkaXNwYXRjaEV2ZW50XCI+XG4gICAgPHNsb3QgLz5cbiAgPC9jdXN0b20tYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCB7UmlwcGxlTWl4aW59IGZyb20gJy4uL3JpcHBsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWJ1dHRvbi1iYXNlJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21CdXR0b25NaXhpbiwgUmlwcGxlTWl4aW5dLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjxzY3JpcHQ+XHJcbmltcG9ydCB7bWRjQnV0dG9uQmFzZX0gZnJvbSAnLi4vYnV0dG9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtY2FyZC1hY3Rpb24tYnV0dG9uJyxcclxuICBleHRlbmRzOiBtZGNCdXR0b25CYXNlLFxyXG4gIHByb3BzOiB7XHJcbiAgICBjb21wYWN0OiBCb29sZWFuLFxyXG4gICAgYWNjZW50OiBCb29sZWFuXHJcbiAgfSxcclxuICBkYXRhICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLWJ1dHRvbic6IHRydWUsXHJcbiAgICAgICAgJ21kYy1jYXJkX19hY3Rpb24nOiB0cnVlLFxyXG4gICAgICAgICdtZGMtY2FyZC1hY3Rpb24tYnV0dG9uJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLWJ1dHRvbi0tY29tcGFjdCc6IHRoaXMuY29tcGFjdCxcclxuICAgICAgICAnbWRjLWJ1dHRvbi0tYWNjZW50JzogdGhpcy5hY2NlbnQsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBjb21wYWN0ICgpIHtcclxuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLWNvbXBhY3QnLCB0aGlzLmNvbXBhY3QgKVxyXG4gICAgfSxcclxuICAgIGFjY2VudCAoKSB7XHJcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS1hY2NlbnQnLCB0aGlzLmFjY2VudCApXHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtZGMtY2FyZC1hY3Rpb24taWNvbnMgbWRjLWNhcmRfX2FjdGlvbi1pY29uc1wiPlxyXG4gICAgPHNsb3Q+XHJcbiAgICA8L3Nsb3Q+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJtZGMtY2FyZC1hY3Rpb24taWNvbnNcIlxyXG59O1xyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxzcGFuIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIiBcclxuICAgIEBjbGljaz1cImRpc3BhdGNoRXZlbnRcIj5cclxuICAgIDxzbG90Pnt7IGljb24gfX08L3Nsb3Q+XHJcbiAgPC9zcGFuPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHtEaXNwYXRjaEV2ZW50TWl4aW59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7UmlwcGxlQmFzZX0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtY2FyZC1hY3Rpb24taWNvbicsXHJcbiAgbWl4aW5zOiBbRGlzcGF0Y2hFdmVudE1peGluXSxcclxuICBwcm9wczoge1xyXG4gICAgaWNvbjogU3RyaW5nXHJcbiAgfSxcclxuICBkYXRhICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLWNhcmQtYWN0aW9uLWljb24nOiB0cnVlLCBcclxuICAgICAgICAnbWF0ZXJpYWwtaWNvbnMnOiEhdGhpcy5pY29uLFxyXG4gICAgICAgICdtZGMtY2FyZF9fYWN0aW9uJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLWNhcmRfX2FjdGlvbi0taWNvbic6IHRydWUsXHJcbiAgICAgICAgJ21kYy1pY29uLXRvZ2dsZSc6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2F0Y2g6IHtcclxuICAgIGljb24gKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWF0ZXJpYWwtaWNvbnMnLCAhIXRoaXMuaWNvbilcclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQgKCkge1xyXG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzLHtcclxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXHJcbiAgICB9KVxyXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95ICgpIHtcclxuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xyXG5pbXBvcnQgbWRjQ2FyZCBmcm9tICcuL21kYy1jYXJkLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRQcmltYXJ5QWN0aW9uIGZyb20gJy4vbWRjLWNhcmQtcHJpbWFyeS1hY3Rpb24udnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZE1lZGlhIGZyb20gJy4vbWRjLWNhcmQtbWVkaWEudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZEhlYWRlciBmcm9tICcuL21kYy1jYXJkLWhlYWRlci52dWUnXHJcbmltcG9ydCBtZGNDYXJkVGl0bGUgZnJvbSAnLi9tZGMtY2FyZC10aXRsZS52dWUnXHJcbmltcG9ydCBtZGNDYXJkU3VidGl0bGUgZnJvbSAnLi9tZGMtY2FyZC1zdWJ0aXRsZS52dWUnXHJcbmltcG9ydCBtZGNDYXJkVGV4dCBmcm9tICcuL21kYy1jYXJkLXRleHQudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZEFjdGlvbnMgZnJvbSAnLi9tZGMtY2FyZC1hY3Rpb25zLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRBY3Rpb25CdXR0b25zIGZyb20gJy4vbWRjLWNhcmQtYWN0aW9uLWJ1dHRvbnMudnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZEFjdGlvbkJ1dHRvbiBmcm9tICcuL21kYy1jYXJkLWFjdGlvbi1idXR0b24udnVlJ1xyXG5pbXBvcnQgbWRjQ2FyZEFjdGlvbkljb25zIGZyb20gJy4vbWRjLWNhcmQtYWN0aW9uLWljb25zLnZ1ZSdcclxuaW1wb3J0IG1kY0NhcmRBY3Rpb25JY29uIGZyb20gJy4vbWRjLWNhcmQtYWN0aW9uLWljb24udnVlJ1xyXG5cclxuZXhwb3J0IHtcclxuICBtZGNDYXJkLFxyXG4gIG1kY0NhcmRQcmltYXJ5QWN0aW9uLCBcclxuICBtZGNDYXJkTWVkaWEsXHJcbiAgbWRjQ2FyZEhlYWRlcixcclxuICBtZGNDYXJkVGl0bGUsXHJcbiAgbWRjQ2FyZFN1YnRpdGxlLFxyXG4gIG1kY0NhcmRUZXh0LFxyXG4gIG1kY0NhcmRBY3Rpb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b24sXHJcbiAgbWRjQ2FyZEFjdGlvbkljb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25JY29uIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcclxuICBtZGNDYXJkLCBcclxuICBtZGNDYXJkUHJpbWFyeUFjdGlvbixcclxuICBtZGNDYXJkTWVkaWEsXHJcbiAgbWRjQ2FyZEhlYWRlcixcclxuICBtZGNDYXJkVGl0bGUsXHJcbiAgbWRjQ2FyZFN1YnRpdGxlLFxyXG4gIG1kY0NhcmRUZXh0LFxyXG4gIG1kY0NhcmRBY3Rpb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b25zLFxyXG4gIG1kY0NhcmRBY3Rpb25CdXR0b24sXHJcbiAgbWRjQ2FyZEFjdGlvbkljb25zLFxyXG4gIG1kY0NhcmRBY3Rpb25JY29uXHJcbn0pXHJcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiQ3VzdG9tTGluayIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiT2JqZWN0IiwiaCIsImNvbnRleHQiLCJlbGVtZW50IiwiZGF0YSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicHJvcHMiLCJsaW5rIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJ0YWciLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJjaGlsZHJlbiIsIkN1c3RvbUxpbmtNaXhpbiIsIkJvb2xlYW4iLCJ0byIsImV4YWN0IiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsIkN1c3RvbUJ1dHRvbiIsImF0dHJzIiwicm9sZSIsImhyZWYiLCJDdXN0b21CdXR0b25NaXhpbiIsIkRpc3BhdGNoRXZlbnRNaXhpbiIsIkFycmF5IiwiZXZ0IiwiJGVtaXQiLCJldmVudCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsInJlbmRlciIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJ2YXJOYW1lIiwidmFsdWUiLCJjc3NDbGFzc2VzIiwic3RyaW5ncyIsIm51bWJlcnMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsImRvY3VtZW50Iiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImRlZmF1bHRBZGFwdGVyIiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFkZENsYXNzIiwiQkdfRk9DVVNFRCIsImJsdXJIYW5kbGVyXyIsInJlbW92ZUNsYXNzIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJST09UIiwiVU5CT1VOREVEIiwiaXNVbmJvdW5kZWQiLCJsYXlvdXRJbnRlcm5hbF8iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJrZXlzIiwiayIsImluZGV4T2YiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImlzU3VyZmFjZURpc2FibGVkIiwiYWN0aXZhdGlvblN0YXRlIiwiaXNBY3RpdmF0ZWQiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaXNQcm9ncmFtbWF0aWMiLCJhY3RpdmF0aW9uRXZlbnQiLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImxlbmd0aCIsInNvbWUiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJpc1N1cmZhY2VBY3RpdmUiLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJGR19ERUFDVElWQVRJT04iLCJGR19BQ1RJVkFUSU9OIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJjb21wdXRlQm91bmRpbmdSZWN0Iiwic2V0VGltZW91dCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsImFjdGl2YXRpb25IYXNFbmRlZCIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJtYXhEaW0iLCJNYXRoIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJWQVJfRkdfU0laRSIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TQ0FMRSIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwicHJvdG90eXBlIiwib3B0aW9ucyIsIiRlbCIsImRpc2FibGVkIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwiY29udGFpbnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIlJpcHBsZU1peGluIiwicmlwcGxlIiwiaW5pdCIsImRlc3Ryb3kiLCJzcmMiLCJzcXVhcmUiLCJmdWxsQmxlZWQiLCJtZGNCdXR0b25CYXNlIiwiY29tcGFjdCIsImFjY2VudCIsImljb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjs7TUFFNUJDLE9BQU8sSUFBWDtNQUNJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIs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
