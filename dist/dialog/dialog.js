/**
* @module vue-mdc-adapterdialog 0.11.2
* @exports VueMDCDialog
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCDialog = factory());
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

var cssClasses = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
};

var strings = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel'
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

var MDCDialogFoundation = function (_MDCFoundation) {
  inherits(MDCDialogFoundation, _MDCFoundation);
  createClass(MDCDialogFoundation, null, [{
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
    key: 'defaultAdapter',
    get: function get$$1() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        eventTargetHasClass: function eventTargetHasClass() {
          return (/* target: EventTarget, className: string */ /* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
        notifyAccept: function notifyAccept() {},
        notifyCancel: function notifyCancel() {},
        trapFocusOnSurface: function trapFocusOnSurface() {},
        untrapFocusOnSurface: function untrapFocusOnSurface() {},
        isDialog: function isDialog() {
          return (/* el: Element */ /* boolean */false
          );
        },
        layoutFooterRipples: function layoutFooterRipples() {}
      };
    }
  }]);

  function MDCDialogFoundation(adapter) {
    classCallCheck(this, MDCDialogFoundation);

    var _this = possibleConstructorReturn(this, (MDCDialogFoundation.__proto__ || Object.getPrototypeOf(MDCDialogFoundation)).call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

    _this.isOpen_ = false;
    _this.componentClickHandler_ = function (evt) {
      if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
        _this.cancel(true);
      }
    };
    _this.dialogClickHandler_ = function (evt) {
      return _this.handleDialogClick_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.cancel(true);
      }
    };
    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd_(evt);
    };
    return _this;
  }

  createClass(MDCDialogFoundation, [{
    key: 'destroy',
    value: function destroy() {
      // Ensure that dialog is cleaned up when destroyed
      if (this.isOpen_) {
        this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
        this.adapter_.untrapFocusOnSurface();
        this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
        this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
        this.enableScroll_();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.isOpen_ = true;
      this.disableScroll_();
      this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
      this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
      this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
    }
  }, {
    key: 'close',
    value: function close() {
      this.isOpen_ = false;
      this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.untrapFocusOnSurface();
      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }
  }, {
    key: 'accept',
    value: function accept(shouldNotify) {
      if (shouldNotify) {
        this.adapter_.notifyAccept();
      }

      this.close();
    }
  }, {
    key: 'cancel',
    value: function cancel(shouldNotify) {
      if (shouldNotify) {
        this.adapter_.notifyCancel();
      }

      this.close();
    }
  }, {
    key: 'handleDialogClick_',
    value: function handleDialogClick_(evt) {
      var target = evt.target;

      if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
        this.accept(true);
      } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
        this.cancel(true);
      }
    }
  }, {
    key: 'handleTransitionEnd_',
    value: function handleTransitionEnd_(evt) {
      if (this.adapter_.isDialog(evt.target)) {
        this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
        if (this.isOpen_) {
          this.adapter_.trapFocusOnSurface();
          this.adapter_.layoutFooterRipples();
        } else {
          this.enableScroll_();
        }
      }
    }
  }, {
    key: 'disableScroll_',
    value: function disableScroll_() {
      this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
    }
  }, {
    key: 'enableScroll_',
    value: function enableScroll_() {
      this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
    }
  }]);
  return MDCDialogFoundation;
}(MDCFoundation);

var tabbable = function (el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (candidateSelectors.some(function (candidateSelector) {
      return matches.call(el, candidateSelector);
    })) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(function (a, b) {
    return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
  }).map(function (a) {
    return a.node;
  });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
};

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  };
}

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = typeof element === 'string' ? document.querySelector(element) : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
  config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
      onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement) return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

var focusTrap_1 = focusTrap;

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

function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
  var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focusTrap_1;

  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true
  });
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

var cssClasses$1 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings$1 = {
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
      return cssClasses$1;
    }
  }, {
    key: 'strings',
    get: function get$$1() {
      return strings$1;
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

      var strings = MDCRippleFoundation.strings;

      Object.keys(strings).forEach(function (k) {
        if (k.indexOf('VAR_') === 0) {
          _this8.adapter_.updateCssVariable(strings[k], null);
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

var mdcButton = {
  name: 'mdc-button',
  extends: mdcButtonBase,
  props: {
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    compact: Boolean,
    accent: Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-button': true,
        'mdc-button--raised': this.raised,
        'mdc-button--unelevated': this.unelevated,
        'mdc-button--stroked': this.stroked,
        'mdc-button--dense': this.dense,
        'mdc-button--compact': this.compact,
        'mdc-button--accent': this.accent
      }
    };
  },

  watch: {
    raised: function raised() {
      this.$set(this.classes, 'mdc-button--raised', this.raised);
    },
    unelevated: function unelevated() {
      this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
    },
    stroked: function stroked() {
      this.$set(this.classes, 'mdc-button--stroked', this.stroked);
    },
    dense: function dense() {
      this.$set(this.classes, 'mdc-button--dense', this.dense);
    },
    compact: function compact() {
      this.$set(this.classes, 'mdc-button--compact', this.compact);
    },
    accent: function accent() {
      this.$set(this.classes, 'mdc-button--accent', this.accent);
    }
  }
};

var mdcDialog = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { ref: "root", staticClass: "mdc-dialog", class: _vm.classes, style: _vm.styles, attrs: { "role": "alertdialog", "aria-labelledby": 'label' + _vm._uid, "aria-describedby": 'desc' + _vm._uid } }, [_c('div', { ref: "surface", staticClass: "mdc-dialog__surface", class: _vm.surfaceClasses }, [_c('header', { staticClass: "mdc-dialog__header" }, [_c('h2', { staticClass: "mdc-dialog__header__title", attrs: { "id": 'label' + _vm._uid } }, [_vm._v(" " + _vm._s(_vm.title) + " ")])]), _vm._v(" "), _c('section', { staticClass: "mdc-dialog__body", class: _vm.bodyClasses, attrs: { "id": 'desc' + _vm._uid } }, [_vm._t("default")], 2), _vm._v(" "), _c('footer', { staticClass: "mdc-dialog__footer" }, [_vm.cancel ? _c('mdcButton', { ref: "cancel", staticClass: "mdc-dialog__footer__button", class: { 'mdc-dialog__action': _vm.accent }, on: { "click": _vm.onCancel } }, [_vm._v(_vm._s(_vm.cancel))]) : _vm._e(), _vm._v(" "), _c('mdcButton', { ref: "accept", staticClass: "mdc-dialog__footer__button", class: { 'mdc-dialog__action': _vm.accent }, attrs: { "disabled": _vm.acceptDisabled }, on: { "click": _vm.onAccept } }, [_vm._v(_vm._s(_vm.accept))])], 1)]), _vm._v(" "), _c('div', { staticClass: "mdc-dialog__backdrop" })]);
  }, staticRenderFns: [],
  name: 'mdc-dialog',
  props: {
    title: { type: String, required: true },
    accept: { type: String, default: 'Ok' },
    acceptDisabled: Boolean,
    cancel: { type: String, default: 'Cancel' },
    accent: Boolean,
    scrollable: Boolean
  },
  components: {
    mdcButton: mdcButton
  },
  data: function data() {
    return {
      classes: {
        'mdc-theme--dark': this.dark
      },
      styles: {},
      surfaceClasses: {},
      bodyClasses: {
        'mdc-dialog__body--scrollable': this.scrollable
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.focusTrap = createFocusTrapInstance(this.$refs.surface, this.$refs.accept);

    this.foundation = new MDCDialogFoundation({
      addClass: function addClass(className) {
        return _this.$set(_this.classes, className, true);
      },
      removeClass: function removeClass(className) {
        return _this.$delete(_this.classes, className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      eventTargetHasClass: function eventTargetHasClass(target, className) {
        return target.classList.contains(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this.$refs.root.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this.$refs.root.removeEventListener(evt, handler);
      },
      registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /*evt, handler*/{
        // VMA_HACK: handle button clicks ourselves
        // this.$refs.surface.addEventListener(evt, handler)
      },
      deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /*evt, handler*/{
        // VMA_HACK: handle button clicks ourselves
        // this.$refs.surface.removeEventListener(evt, handler)
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this.$refs.surface.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        return _this.$refs.surface.removeEventListener('transitionend', handler);
      },
      notifyAccept: function notifyAccept() {
        return _this.$emit('accept');
      },
      notifyCancel: function notifyCancel() {
        return _this.$emit('cancel');
      },
      trapFocusOnSurface: function trapFocusOnSurface() {
        return _this.focusTrap.activate();
      },
      untrapFocusOnSurface: function untrapFocusOnSurface() {
        return _this.focusTrap.deactivate();
      },
      isDialog: function isDialog(el) {
        return _this.$refs.surface === el;
      },
      layoutFooterRipples: function layoutFooterRipples() {
        _this.$refs.accept.ripple.layout();
        _this.cancel && _this.$refs.cancel.ripple.layout();
      }
    });

    this.foundation.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    onCancel: function onCancel() {
      this.foundation.cancel(true);
    },
    onAccept: function onAccept() {
      var _this2 = this;

      if (this.$listeners['validate']) {
        this.$emit('validate', {
          accept: function accept() {
            var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            return _this2.foundation.accept(notify);
          }
        });
      } else {
        this.foundation.accept(true);
      }
    },
    show: function show() {
      this.foundation.open();
    },
    close: function close() {
      this.foundation.close();
    }
  }
};

var plugin = BasePlugin({
  mdcDialog: mdcDialog
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tYnV0dG9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90YWJiYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9mb2N1cy10cmFwL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kaWFsb2cvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL21kYy1idXR0b24tYmFzZS52dWUiLCIuLi8uLi9jb21wb25lbnRzL2J1dHRvbi9tZGMtYnV0dG9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL21kYy1kaWFsb2cudnVlIiwiLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2RpYWxvZy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUJ1dHRvbiA9IHtcbiAgbmFtZTogJ2N1c3RvbS1idXR0b24nLFxuICBmdW5jdGlvbmFsOiB0cnVlLFxuICBwcm9wczoge1xuICAgIGxpbmsgOiBPYmplY3QsXG4gIH0sXG4gIHJlbmRlciAoaCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtZW50IFxuICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5kYXRhKVxuXG4gICAgaWYgKGNvbnRleHQucHJvcHMubGluayAmJiBjb250ZXh0LnBhcmVudC4kcm91dGVyKSB7XG4gICAgICAvLyByb3V0ZXItbGluayBjYXNlXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wYXJlbnQuJHJvb3QuJG9wdGlvbnMuY29tcG9uZW50c1sncm91dGVyLWxpbmsnXSBcbiAgICAgIGRhdGEucHJvcHMgPSBPYmplY3QuYXNzaWduKHt0YWc6IGNvbnRleHQucHJvcHMudGFnfSwgY29udGV4dC5wcm9wcy5saW5rKVxuICAgICAgZGF0YS5hdHRycy5yb2xlID0gJ2J1dHRvbidcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7Y2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmhyZWYpIHtcbiAgICAgIC8vIGhyZWYgY2FzZVxuICAgICAgZWxlbWVudCA9ICdhJyBcbiAgICAgIGRhdGEuYXR0cnMucm9sZSA9ICdidXR0b24nXG4gICAgfSAgZWxzZSB7XG4gICAgICAvLyBidXR0b24gZmFsbGJhY2tcbiAgICAgIGVsZW1lbnQgPSAnYnV0dG9uJ1xuICAgIH0gXG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21CdXR0b25NaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICBocmVmOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGluayAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50byAmJiB7XG4gICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcbiAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxuICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzLFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50cyA6IHsgXG4gICAgQ3VzdG9tQnV0dG9uIFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQge01EQ0ZvdW5kYXRpb24sIE1EQ0NvbXBvbmVudH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1kaWFsb2cnLFxuICBPUEVOOiAnbWRjLWRpYWxvZy0tb3BlbicsXG4gIEFOSU1BVElORzogJ21kYy1kaWFsb2ctLWFuaW1hdGluZycsXG4gIEJBQ0tEUk9QOiAnbWRjLWRpYWxvZ19fYmFja2Ryb3AnLFxuICBTQ1JPTExfTE9DSzogJ21kYy1kaWFsb2ctc2Nyb2xsLWxvY2snLFxuICBBQ0NFUFRfQlROOiAnbWRjLWRpYWxvZ19fZm9vdGVyX19idXR0b24tLWFjY2VwdCcsXG4gIENBTkNFTF9CVE46ICdtZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tY2FuY2VsJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBPUEVOX0RJQUxPR19TRUxFQ1RPUjogJy5tZGMtZGlhbG9nLS1vcGVuJyxcbiAgRElBTE9HX1NVUkZBQ0VfU0VMRUNUT1I6ICcubWRjLWRpYWxvZ19fc3VyZmFjZScsXG4gIEFDQ0VQVF9TRUxFQ1RPUjogJy5tZGMtZGlhbG9nX19mb290ZXJfX2J1dHRvbi0tYWNjZXB0JyxcbiAgQUNDRVBUX0VWRU5UOiAnTURDRGlhbG9nOmFjY2VwdCcsXG4gIENBTkNFTF9FVkVOVDogJ01EQ0RpYWxvZzpjYW5jZWwnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ0RpYWxvZ0ZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGFkZEJvZHlDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICgvKiB0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBub3RpZnlBY2NlcHQ6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB7fSxcbiAgICAgIHRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4ge30sXG4gICAgICB1bnRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4ge30sXG4gICAgICBpc0RpYWxvZzogKC8qIGVsOiBFbGVtZW50ICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgbGF5b3V0Rm9vdGVyUmlwcGxlczogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBvbmVudENsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5ldmVudFRhcmdldEhhc0NsYXNzKGV2dC50YXJnZXQsIGNzc0NsYXNzZXMuQkFDS0RST1ApKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEaWFsb2dDbGlja18oZXZ0KTtcbiAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXkgJiYgZXZ0LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZ0LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG4gIH07XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBFbnN1cmUgdGhhdCBkaWFsb2cgaXMgY2xlYW5lZCB1cCB3aGVuIGRlc3Ryb3llZFxuICAgIGlmICh0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udW50cmFwRm9jdXNPblN1cmZhY2UoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgICAgIHRoaXMuZW5hYmxlU2Nyb2xsXygpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgICB0aGlzLmRpc2FibGVTY3JvbGxfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kaWFsb2dDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDRGlhbG9nRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpYWxvZ0NsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIodGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy51bnRyYXBGb2N1c09uU3VyZmFjZSgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENEaWFsb2dGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW5fO1xuICB9XG5cbiAgYWNjZXB0KHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5QWNjZXB0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgY2FuY2VsKHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2FuY2VsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFuZGxlRGlhbG9nQ2xpY2tfKGV2dCkge1xuICAgIGNvbnN0IHt0YXJnZXR9ID0gZXZ0O1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmV2ZW50VGFyZ2V0SGFzQ2xhc3ModGFyZ2V0LCBjc3NDbGFzc2VzLkFDQ0VQVF9CVE4pKSB7XG4gICAgICB0aGlzLmFjY2VwdCh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcyh0YXJnZXQsIGNzc0NsYXNzZXMuQ0FOQ0VMX0JUTikpIHtcbiAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzRGlhbG9nKGV2dC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ0RpYWxvZ0ZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgICAgaWYgKHRoaXMuaXNPcGVuXykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnRyYXBGb2N1c09uU3VyZmFjZSgpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmxheW91dEZvb3RlclJpcHBsZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5hYmxlU2Nyb2xsXygpO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIGRpc2FibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG5cbiAgZW5hYmxlU2Nyb2xsXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUJvZHlDbGFzcyhjc3NDbGFzc2VzLlNDUk9MTF9MT0NLKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgZWxlbWVudERvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudCB8fCBlbDtcbiAgdmFyIGJhc2ljVGFiYmFibGVzID0gW107XG4gIHZhciBvcmRlcmVkVGFiYmFibGVzID0gW107XG5cbiAgLy8gQSBub2RlIGlzIFwiYXZhaWxhYmxlXCIgaWZcbiAgLy8gLSBpdCdzIGNvbXB1dGVkIHN0eWxlXG4gIHZhciBpc1VuYXZhaWxhYmxlID0gY3JlYXRlSXNVbmF2YWlsYWJsZShlbGVtZW50RG9jdW1lbnQpO1xuXG4gIHZhciBjYW5kaWRhdGVTZWxlY3RvcnMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAnYVtocmVmXScsXG4gICAgJ3RleHRhcmVhJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnW3RhYmluZGV4XScsXG4gIF07XG5cbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJykpO1xuXG4gIGlmIChvcHRpb25zLmluY2x1ZGVDb250YWluZXIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXG4gICAgaWYgKFxuICAgICAgY2FuZGlkYXRlU2VsZWN0b3JzLnNvbWUoZnVuY3Rpb24oY2FuZGlkYXRlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpO1xuICAgICAgfSlcbiAgICApIHtcbiAgICAgIGNhbmRpZGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoY2FuZGlkYXRlcyk7XG4gICAgICBjYW5kaWRhdGVzLnVuc2hpZnQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUsIGNhbmRpZGF0ZUluZGV4O1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGNhbmRpZGF0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcbiAgICBjYW5kaWRhdGVJbmRleCA9IHBhcnNlSW50KGNhbmRpZGF0ZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKSB8fCBjYW5kaWRhdGUudGFiSW5kZXg7XG5cbiAgICBpZiAoXG4gICAgICBjYW5kaWRhdGVJbmRleCA8IDBcbiAgICAgIHx8IChjYW5kaWRhdGUudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBjYW5kaWRhdGUudHlwZSA9PT0gJ2hpZGRlbicpXG4gICAgICB8fCBjYW5kaWRhdGUuZGlzYWJsZWRcbiAgICAgIHx8IGlzVW5hdmFpbGFibGUoY2FuZGlkYXRlLCBlbGVtZW50RG9jdW1lbnQpXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2FuZGlkYXRlSW5kZXggPT09IDApIHtcbiAgICAgIGJhc2ljVGFiYmFibGVzLnB1c2goY2FuZGlkYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3JkZXJlZFRhYmJhYmxlcy5wdXNoKHtcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIHRhYkluZGV4OiBjYW5kaWRhdGVJbmRleCxcbiAgICAgICAgbm9kZTogY2FuZGlkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHRhYmJhYmxlTm9kZXMgPSBvcmRlcmVkVGFiYmFibGVzXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEudGFiSW5kZXggPT09IGIudGFiSW5kZXggPyBhLmluZGV4IC0gYi5pbmRleCA6IGEudGFiSW5kZXggLSBiLnRhYkluZGV4O1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbihhKSB7XG4gICAgICByZXR1cm4gYS5ub2RlXG4gICAgfSk7XG5cbiAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGFiYmFibGVOb2RlcywgYmFzaWNUYWJiYWJsZXMpO1xuXG4gIHJldHVybiB0YWJiYWJsZU5vZGVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJc1VuYXZhaWxhYmxlKGVsZW1lbnREb2N1bWVudCkge1xuICAvLyBOb2RlIGNhY2hlIG11c3QgYmUgcmVmcmVzaGVkIG9uIGV2ZXJ5IGNoZWNrLCBpbiBjYXNlXG4gIC8vIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gIHZhciBpc09mZkNhY2hlID0gW107XG5cbiAgLy8gXCJvZmZcIiBtZWFucyBgZGlzcGxheTogbm9uZTtgLCBhcyBvcHBvc2VkIHRvIFwiaGlkZGVuXCIsXG4gIC8vIHdoaWNoIG1lYW5zIGB2aXNpYmlsaXR5OiBoaWRkZW47YC4gZ2V0Q29tcHV0ZWRTdHlsZVxuICAvLyBhY2N1cmF0ZWx5IHJlZmxlY3RzIHZpc2libGl0eSBpbiBjb250ZXh0IGJ1dCBub3RcbiAgLy8gXCJvZmZcIiBzdGF0ZSwgc28gd2UgbmVlZCB0byByZWN1cnNpdmVseSBjaGVjayBwYXJlbnRzLlxuXG4gIGZ1bmN0aW9uIGlzT2ZmKG5vZGUsIG5vZGVDb21wdXRlZFN0eWxlKSB7XG4gICAgaWYgKG5vZGUgPT09IGVsZW1lbnREb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIEZpbmQgdGhlIGNhY2hlZCBub2RlIChBcnJheS5wcm90b3R5cGUuZmluZCBub3QgYXZhaWxhYmxlIGluIElFOSlcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaXNPZmZDYWNoZS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzT2ZmQ2FjaGVbaV1bMF0gPT09IG5vZGUpIHJldHVybiBpc09mZkNhY2hlW2ldWzFdO1xuICAgIH1cblxuICAgIG5vZGVDb21wdXRlZFN0eWxlID0gbm9kZUNvbXB1dGVkU3R5bGUgfHwgZWxlbWVudERvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICBpZiAobm9kZUNvbXB1dGVkU3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICByZXN1bHQgPSBpc09mZihub2RlLnBhcmVudE5vZGUpO1xuICAgIH1cblxuICAgIGlzT2ZmQ2FjaGUucHVzaChbbm9kZSwgcmVzdWx0XSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVW5hdmFpbGFibGUobm9kZSkge1xuICAgIGlmIChub2RlID09PSBlbGVtZW50RG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IGVsZW1lbnREb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXG4gICAgaWYgKGlzT2ZmKG5vZGUsIGNvbXB1dGVkU3R5bGUpKSByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nO1xuICB9XG59XG4iLCJ2YXIgdGFiYmFibGUgPSByZXF1aXJlKCd0YWJiYWJsZScpO1xuXG52YXIgbGlzdGVuaW5nRm9jdXNUcmFwID0gbnVsbDtcblxuZnVuY3Rpb24gZm9jdXNUcmFwKGVsZW1lbnQsIHVzZXJPcHRpb25zKSB7XG4gIHZhciB0YWJiYWJsZU5vZGVzID0gW107XG4gIHZhciBmaXJzdFRhYmJhYmxlTm9kZSA9IG51bGw7XG4gIHZhciBsYXN0VGFiYmFibGVOb2RlID0gbnVsbDtcbiAgdmFyIG5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbiA9IG51bGw7XG4gIHZhciBhY3RpdmUgPSBmYWxzZTtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuICB2YXIgdGFiRXZlbnQgPSBudWxsO1xuXG4gIHZhciBjb250YWluZXIgPSAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKVxuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KVxuICAgIDogZWxlbWVudDtcblxuICB2YXIgY29uZmlnID0gdXNlck9wdGlvbnMgfHwge307XG4gIGNvbmZpZy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSA9ICh1c2VyT3B0aW9ucyAmJiB1c2VyT3B0aW9ucy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSAhPT0gdW5kZWZpbmVkKVxuICAgID8gdXNlck9wdGlvbnMucmV0dXJuRm9jdXNPbkRlYWN0aXZhdGVcbiAgICA6IHRydWU7XG4gIGNvbmZpZy5lc2NhcGVEZWFjdGl2YXRlcyA9ICh1c2VyT3B0aW9ucyAmJiB1c2VyT3B0aW9ucy5lc2NhcGVEZWFjdGl2YXRlcyAhPT0gdW5kZWZpbmVkKVxuICAgID8gdXNlck9wdGlvbnMuZXNjYXBlRGVhY3RpdmF0ZXNcbiAgICA6IHRydWU7XG5cbiAgdmFyIHRyYXAgPSB7XG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlLFxuICAgIGRlYWN0aXZhdGU6IGRlYWN0aXZhdGUsXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIHVucGF1c2U6IHVucGF1c2UsXG4gIH07XG5cbiAgcmV0dXJuIHRyYXA7XG5cbiAgZnVuY3Rpb24gYWN0aXZhdGUoYWN0aXZhdGVPcHRpb25zKSB7XG4gICAgaWYgKGFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRlZmF1bHRlZEFjdGl2YXRlT3B0aW9ucyA9IHtcbiAgICAgIG9uQWN0aXZhdGU6IChhY3RpdmF0ZU9wdGlvbnMgJiYgYWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkFjdGl2YXRlLFxuICAgIH07XG5cbiAgICBhY3RpdmUgPSB0cnVlO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIG5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbiA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoZGVmYXVsdGVkQWN0aXZhdGVPcHRpb25zLm9uQWN0aXZhdGUpIHtcbiAgICAgIGRlZmF1bHRlZEFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBkZWFjdGl2YXRlKGRlYWN0aXZhdGVPcHRpb25zKSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIHZhciBkZWZhdWx0ZWREZWFjdGl2YXRlT3B0aW9ucyA9IHtcbiAgICAgIHJldHVybkZvY3VzOiAoZGVhY3RpdmF0ZU9wdGlvbnMgJiYgZGVhY3RpdmF0ZU9wdGlvbnMucmV0dXJuRm9jdXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1c1xuICAgICAgICA6IGNvbmZpZy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSxcbiAgICAgIG9uRGVhY3RpdmF0ZTogKGRlYWN0aXZhdGVPcHRpb25zICYmIGRlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IGRlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZVxuICAgICAgICA6IGNvbmZpZy5vbkRlYWN0aXZhdGUsXG4gICAgfTtcblxuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuXG4gICAgaWYgKGRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zLm9uRGVhY3RpdmF0ZSkge1xuICAgICAgZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKGRlZmF1bHRlZERlYWN0aXZhdGVPcHRpb25zLnJldHVybkZvY3VzKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5Rm9jdXMobm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgaWYgKHBhdXNlZCB8fCAhYWN0aXZlKSByZXR1cm47XG4gICAgcGF1c2VkID0gdHJ1ZTtcbiAgICByZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVucGF1c2UoKSB7XG4gICAgaWYgKCFwYXVzZWQgfHwgIWFjdGl2ZSkgcmV0dXJuO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIGFkZExpc3RlbmVycygpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICAvLyBUaGVyZSBjYW4gYmUgb25seSBvbmUgbGlzdGVuaW5nIGZvY3VzIHRyYXAgYXQgYSB0aW1lXG4gICAgaWYgKGxpc3RlbmluZ0ZvY3VzVHJhcCkge1xuICAgICAgbGlzdGVuaW5nRm9jdXNUcmFwLnBhdXNlKCk7XG4gICAgfVxuICAgIGxpc3RlbmluZ0ZvY3VzVHJhcCA9IHRyYXA7XG5cbiAgICB1cGRhdGVUYWJiYWJsZU5vZGVzKCk7XG4gICAgdHJ5Rm9jdXMoZmlyc3RGb2N1c05vZGUoKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjaGVja0ZvY3VzLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2ssIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2hlY2tLZXksIHRydWUpO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFhY3RpdmUgfHwgbGlzdGVuaW5nRm9jdXNUcmFwICE9PSB0cmFwKSByZXR1cm47XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGNoZWNrRm9jdXMsIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG5cbiAgICBsaXN0ZW5pbmdGb2N1c1RyYXAgPSBudWxsO1xuXG4gICAgcmV0dXJuIHRyYXA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROb2RlRm9yT3B0aW9uKG9wdGlvbk5hbWUpIHtcbiAgICB2YXIgb3B0aW9uVmFsdWUgPSBjb25maWdbb3B0aW9uTmFtZV07XG4gICAgdmFyIG5vZGUgPSBvcHRpb25WYWx1ZTtcbiAgICBpZiAoIW9wdGlvblZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvblZhbHVlKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2AnICsgb3B0aW9uTmFtZSArICdgIHJlZmVycyB0byBubyBrbm93biBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUgPSBvcHRpb25WYWx1ZSgpO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgZGlkIG5vdCByZXR1cm4gYSBub2RlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyc3RGb2N1c05vZGUoKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgaWYgKGdldE5vZGVGb3JPcHRpb24oJ2luaXRpYWxGb2N1cycpICE9PSBudWxsKSB7XG4gICAgICBub2RlID0gZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJyk7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdGFiYmFibGVOb2Rlc1swXSB8fCBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFub2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5cXCd0IGhhdmUgYSBmb2N1cy10cmFwIHdpdGhvdXQgYXQgbGVhc3Qgb25lIGZvY3VzYWJsZSBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgb24gbW91c2Vkb3duIGFuZCB0b3VjaHN0YXJ0IGluc3RlYWQgb2YgY2xpY2tcbiAgLy8gc28gdGhhdCBpdCBwcmVjZWRlcyB0aGUgZm9jdXMgZXZlbnRcbiAgZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgaWYgKGNvbmZpZy5jbGlja091dHNpZGVEZWFjdGl2YXRlcyAmJiAhY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgZGVhY3RpdmF0ZSh7IHJldHVybkZvY3VzOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRm9jdXMoZSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgLy8gQ2hlY2tpbmcgZm9yIGEgYmx1ciBtZXRob2QgaGVyZSByZXNvbHZlcyBhIEZpcmVmb3ggaXNzdWUgKCMxNSlcbiAgICBpZiAodHlwZW9mIGUudGFyZ2V0LmJsdXIgPT09ICdmdW5jdGlvbicpIGUudGFyZ2V0LmJsdXIoKTtcblxuICAgIGlmICh0YWJFdmVudCkge1xuICAgICAgcmVhZGp1c3RGb2N1cyh0YWJFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ1RhYicgfHwgZS5rZXlDb2RlID09PSA5KSB7XG4gICAgICBoYW5kbGVUYWIoZSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5lc2NhcGVEZWFjdGl2YXRlcyAhPT0gZmFsc2UgJiYgaXNFc2NhcGVFdmVudChlKSkge1xuICAgICAgZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYihlKSB7XG4gICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSAmJiBOdW1iZXIoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSA8IDApIHtcbiAgICAgIHJldHVybiB0YWJFdmVudCA9IGU7XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50Rm9jdXNJbmRleCA9IHRhYmJhYmxlTm9kZXMuaW5kZXhPZihlLnRhcmdldCk7XG5cbiAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBmaXJzdFRhYmJhYmxlTm9kZSB8fCB0YWJiYWJsZU5vZGVzLmluZGV4T2YoZS50YXJnZXQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ5Rm9jdXModGFiYmFibGVOb2Rlc1tjdXJyZW50Rm9jdXNJbmRleCAtIDFdKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQgPT09IGxhc3RUYWJiYWJsZU5vZGUpIHJldHVybiB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyh0YWJiYWJsZU5vZGVzW2N1cnJlbnRGb2N1c0luZGV4ICsgMV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVGFiYmFibGVOb2RlcygpIHtcbiAgICB0YWJiYWJsZU5vZGVzID0gdGFiYmFibGUoY29udGFpbmVyKTtcbiAgICBmaXJzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbMF07XG4gICAgbGFzdFRhYmJhYmxlTm9kZSA9IHRhYmJhYmxlTm9kZXNbdGFiYmFibGVOb2Rlcy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRqdXN0Rm9jdXMoZSkge1xuICAgIGlmIChlLnNoaWZ0S2V5KSByZXR1cm4gdHJ5Rm9jdXMobGFzdFRhYmJhYmxlTm9kZSk7XG5cbiAgICB0cnlGb2N1cyhmaXJzdFRhYmJhYmxlTm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFc2NhcGVFdmVudChlKSB7XG4gIHJldHVybiBlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXkgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjc7XG59XG5cbmZ1bmN0aW9uIHRyeUZvY3VzKG5vZGUpIHtcbiAgaWYgKCFub2RlIHx8ICFub2RlLmZvY3VzKSByZXR1cm47XG4gIGlmIChub2RlID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAgcmV0dXJuO1xuXG4gIG5vZGUuZm9jdXMoKTtcbiAgaWYgKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgbm9kZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvY3VzVHJhcDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBjcmVhdGVGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb2N1c1RyYXBJbnN0YW5jZShzdXJmYWNlRWwsIGFjY2VwdEJ1dHRvbkVsLCBmb2N1c1RyYXBGYWN0b3J5ID0gY3JlYXRlRm9jdXNUcmFwKSB7XG4gIHJldHVybiBmb2N1c1RyYXBGYWN0b3J5KHN1cmZhY2VFbCwge1xuICAgIGluaXRpYWxGb2N1czogYWNjZXB0QnV0dG9uRWwsXG4gICAgY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXM6IHRydWUsXG4gIH0pO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshe2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgd3JhcHBlZCBpbiBhbiByQUYgY2FsbCBiL2Mgd2ViIGJyb3dzZXJzXG4gICAgICAvLyByZXBvcnQgYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpblxuICAgICAgLy8gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGdldE1hdGNoZXNQcm9wZXJ0eSwgYXBwbHlQYXNzaXZlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG5cbiAgc3RhdGljIGdldCBNQVRDSEVTICgpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKCBSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlIChyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbih7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICB9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgfSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KVxuICAgICAgfSxcbiAgICB9LCBvcHRpb25zKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn0gICIsIjx0ZW1wbGF0ZT5cbiAgPGN1c3RvbS1idXR0b24gcmVmPVwicm9vdFwiXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIDpzdHlsZT1cInN0eWxlc1wiIFxuICAgIDpocmVmPVwiaHJlZlwiIDpsaW5rPVwibGlua1wiIDpkaXNhYmxlZD1cImRpc2FibGVkXCIgXG4gICAgQGNsaWNrPVwiZGlzcGF0Y2hFdmVudFwiPlxuICAgIDxzbG90IC8+XG4gIDwvY3VzdG9tLWJ1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQge0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQge1JpcHBsZU1peGlufSBmcm9tICcuLi9yaXBwbGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1idXR0b24tYmFzZScsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbiwgQ3VzdG9tQnV0dG9uTWl4aW4sIFJpcHBsZU1peGluXSxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8c2NyaXB0PlxuaW1wb3J0IG1kY0J1dHRvbkJhc2UgZnJvbSAnLi9tZGMtYnV0dG9uLWJhc2UudnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtYnV0dG9uJyxcbiAgZXh0ZW5kczogbWRjQnV0dG9uQmFzZSxcbiAgcHJvcHM6IHtcbiAgICByYWlzZWQ6IEJvb2xlYW4sXG4gICAgdW5lbGV2YXRlZDogQm9vbGVhbixcbiAgICBzdHJva2VkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGNvbXBhY3Q6IEJvb2xlYW4sIFxuICAgIGFjY2VudDogQm9vbGVhblxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICdtZGMtYnV0dG9uLS1yYWlzZWQnOiB0aGlzLnJhaXNlZCxcbiAgICAgICAgJ21kYy1idXR0b24tLXVuZWxldmF0ZWQnOiB0aGlzLnVuZWxldmF0ZWQsXG4gICAgICAgICdtZGMtYnV0dG9uLS1zdHJva2VkJzogdGhpcy5zdHJva2VkLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tZGVuc2UnOiB0aGlzLmRlbnNlLFxuICAgICAgICAnbWRjLWJ1dHRvbi0tY29tcGFjdCc6IHRoaXMuY29tcGFjdCxcbiAgICAgICAgJ21kYy1idXR0b24tLWFjY2VudCc6IHRoaXMuYWNjZW50XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHJhaXNlZCAoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tcmFpc2VkJywgdGhpcy5yYWlzZWQgKVxuICAgIH0sXG4gICAgdW5lbGV2YXRlZCAoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tdW5lbGV2YXRlZCcsIHRoaXMudW5lbGV2YXRlZCApXG4gICAgfSxcbiAgICBzdHJva2VkICgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS1zdHJva2VkJywgdGhpcy5zdHJva2VkIClcbiAgICB9LFxuICAgIGRlbnNlICgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtYnV0dG9uLS1kZW5zZScsIHRoaXMuZGVuc2UgKVxuICAgIH0sXG4gICAgY29tcGFjdCAoKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWJ1dHRvbi0tY29tcGFjdCcsIHRoaXMuY29tcGFjdCApXG4gICAgfSxcbiAgICBhY2NlbnQgKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy1idXR0b24tLWFjY2VudCcsIHRoaXMuYWNjZW50IClcbiAgICB9LFxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGFzaWRlIGNsYXNzPVwibWRjLWRpYWxvZ1wiIHJlZj1cInJvb3RcIiA6Y2xhc3M9XCJjbGFzc2VzXCIgOnN0eWxlPVwic3R5bGVzXCJcbiAgICByb2xlPVwiYWxlcnRkaWFsb2dcIlxuICAgIDphcmlhLWxhYmVsbGVkYnk9XCInbGFiZWwnICsgX3VpZFwiXG4gICAgOmFyaWEtZGVzY3JpYmVkYnk9XCInZGVzYycgKyBfdWlkXCJcbiAgPlxuICAgIDxkaXYgIHJlZj1cInN1cmZhY2VcIiBjbGFzcz1cIm1kYy1kaWFsb2dfX3N1cmZhY2VcIiA6Y2xhc3M9XCJzdXJmYWNlQ2xhc3Nlc1wiPlxuICAgICAgPGhlYWRlciBjbGFzcz1cIm1kYy1kaWFsb2dfX2hlYWRlclwiPlxuICAgICAgICA8aDIgOmlkPVwiJ2xhYmVsJyArIF91aWRcIiBjbGFzcz1cIm1kYy1kaWFsb2dfX2hlYWRlcl9fdGl0bGVcIj5cbiAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICA8L2gyPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8c2VjdGlvbiA6aWQ9XCInZGVzYycgKyBfdWlkXCJcbiAgICAgICAgY2xhc3M9XCJtZGMtZGlhbG9nX19ib2R5XCIgOmNsYXNzPVwiYm9keUNsYXNzZXNcIj5cbiAgICAgICAgPHNsb3QgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxmb290ZXIgY2xhc3M9XCJtZGMtZGlhbG9nX19mb290ZXJcIj5cbiAgICAgICAgPG1kY0J1dHRvbiByZWY9XCJjYW5jZWxcIiB2LWlmPVwiY2FuY2VsXCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uXCJcbiAgICAgICAgICA6Y2xhc3M9XCJ7J21kYy1kaWFsb2dfX2FjdGlvbic6YWNjZW50fVwiXG4gICAgICAgICAgQGNsaWNrPVwib25DYW5jZWxcIlxuICAgICAgICAgID57eyBjYW5jZWwgfX08L21kY0J1dHRvbj5cbiAgICAgICAgPG1kY0J1dHRvbiAgcmVmPVwiYWNjZXB0XCJcbiAgICAgICAgICBjbGFzcz1cIm1kYy1kaWFsb2dfX2Zvb3Rlcl9fYnV0dG9uXCJcbiAgICAgICAgICA6Y2xhc3M9XCJ7J21kYy1kaWFsb2dfX2FjdGlvbic6YWNjZW50fVwiXG4gICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0RGlzYWJsZWRcIlxuICAgICAgICAgIEBjbGljaz1cIm9uQWNjZXB0XCJcbiAgICAgICAgPnt7IGFjY2VwdCB9fTwvbWRjQnV0dG9uPlxuICAgICAgPC9mb290ZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1kaWFsb2dfX2JhY2tkcm9wXCI+PC9kaXY+XG4gIDwvYXNpZGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ0RpYWxvZ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZy9mb3VuZGF0aW9uJ1xuaW1wb3J0IHsgY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UgfSBmcm9tICdAbWF0ZXJpYWwvZGlhbG9nL3V0aWwnXG5pbXBvcnQge21kY0J1dHRvbn0gZnJvbSAnLi4vYnV0dG9uJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtZGlhbG9nJyxcbiAgcHJvcHM6IHtcbiAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgYWNjZXB0OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ09rJyB9LFxuICAgIGFjY2VwdERpc2FibGVkOiBCb29sZWFuLFxuICAgIGNhbmNlbDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdDYW5jZWwnIH0sXG4gICAgYWNjZW50OiBCb29sZWFuLFxuICAgIHNjcm9sbGFibGU6IEJvb2xlYW5cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIG1kY0J1dHRvbiA6IG1kY0J1dHRvblxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLXRoZW1lLS1kYXJrJzogdGhpcy5kYXJrXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIHN1cmZhY2VDbGFzc2VzOiB7fSxcbiAgICAgIGJvZHlDbGFzc2VzOiB7XG4gICAgICAgICdtZGMtZGlhbG9nX19ib2R5LS1zY3JvbGxhYmxlJzogdGhpcy5zY3JvbGxhYmxlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmZvY3VzVHJhcCA9IGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKFxuICAgICAgdGhpcy4kcmVmcy5zdXJmYWNlLCB0aGlzLiRyZWZzLmFjY2VwdClcblxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENEaWFsb2dGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBhZGRCb2R5Q2xhc3M6IChjbGFzc05hbWUpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICh0YXJnZXQsIGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyOiAoLypldnQsIGhhbmRsZXIqLykgPT4ge1xuICAgICAgICAvLyBWTUFfSEFDSzogaGFuZGxlIGJ1dHRvbiBjbGlja3Mgb3Vyc2VsdmVzXG4gICAgICAgIC8vIHRoaXMuJHJlZnMuc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyU3VyZmFjZUludGVyYWN0aW9uSGFuZGxlcjogKC8qZXZ0LCBoYW5kbGVyKi8pID0+IHtcbiAgICAgICAgLy8gVk1BX0hBQ0s6IGhhbmRsZSBidXR0b24gY2xpY2tzIG91cnNlbHZlc1xuICAgICAgICAvLyB0aGlzLiRyZWZzLnN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IChoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlciksXG4gICAgICByZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5zdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJHJlZnMuc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlciksXG4gICAgICBub3RpZnlBY2NlcHQ6ICgpID0+IHRoaXMuJGVtaXQoJ2FjY2VwdCcpLFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB0aGlzLiRlbWl0KCdjYW5jZWwnKSxcbiAgICAgIHRyYXBGb2N1c09uU3VyZmFjZTogKCkgPT4gdGhpcy5mb2N1c1RyYXAuYWN0aXZhdGUoKSxcbiAgICAgIHVudHJhcEZvY3VzT25TdXJmYWNlOiAoKSA9PiB0aGlzLmZvY3VzVHJhcC5kZWFjdGl2YXRlKCksXG4gICAgICBpc0RpYWxvZzogKGVsKSA9PiAodGhpcy4kcmVmcy5zdXJmYWNlID09PSBlbCksXG4gICAgICBsYXlvdXRGb290ZXJSaXBwbGVzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuYWNjZXB0LnJpcHBsZS5sYXlvdXQoKVxuICAgICAgICB0aGlzLmNhbmNlbCAmJiB0aGlzLiRyZWZzLmNhbmNlbC5yaXBwbGUubGF5b3V0KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5jYW5jZWwodHJ1ZSk7XG4gICAgfSxcbiAgICBvbkFjY2VwdCgpIHtcbiAgICAgIGlmICh0aGlzLiRsaXN0ZW5lcnNbJ3ZhbGlkYXRlJ10pIHtcbiAgICAgICAgdGhpcy4kZW1pdCgndmFsaWRhdGUnLCB7XG4gICAgICAgICAgYWNjZXB0OiAobm90aWZ5ID0gdHJ1ZSkgPT4gdGhpcy5mb3VuZGF0aW9uLmFjY2VwdChub3RpZnkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLmFjY2VwdCh0cnVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2hvdyAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24ub3BlbigpXG4gICAgfSxcbiAgICBjbG9zZSAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjRGlhbG9nIGZyb20gJy4vbWRjLWRpYWxvZy52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY0RpYWxvZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjRGlhbG9nXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJDdXN0b21CdXR0b24iLCJPYmplY3QiLCJoIiwiY29udGV4dCIsImVsZW1lbnQiLCJkYXRhIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJwcm9wcyIsImxpbmsiLCJwYXJlbnQiLCIkcm91dGVyIiwiJHJvb3QiLCIkb3B0aW9ucyIsInRhZyIsImF0dHJzIiwicm9sZSIsIm9uIiwiY2xpY2siLCJuYXRpdmVPbiIsImhyZWYiLCJjaGlsZHJlbiIsIkN1c3RvbUJ1dHRvbk1peGluIiwiU3RyaW5nIiwiQm9vbGVhbiIsInRvIiwiZXhhY3QiLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiRGlzcGF0Y2hFdmVudE1peGluIiwiQXJyYXkiLCJldnQiLCIkZW1pdCIsInR5cGUiLCJldmVudCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJDdXN0b21FdmVudCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiY3NzQ2xhc3NlcyIsInN0cmluZ3MiLCJNRENEaWFsb2dGb3VuZGF0aW9uIiwiZGVmYXVsdEFkYXB0ZXIiLCJpc09wZW5fIiwiY29tcG9uZW50Q2xpY2tIYW5kbGVyXyIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJCQUNLRFJPUCIsImNhbmNlbCIsImRpYWxvZ0NsaWNrSGFuZGxlcl8iLCJoYW5kbGVEaWFsb2dDbGlja18iLCJkb2N1bWVudEtleWRvd25IYW5kbGVyXyIsImtleUNvZGUiLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kXyIsImRlcmVnaXN0ZXJTdXJmYWNlSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwidW50cmFwRm9jdXNPblN1cmZhY2UiLCJkZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIiLCJyZW1vdmVDbGFzcyIsIkFOSU1BVElORyIsIk9QRU4iLCJlbmFibGVTY3JvbGxfIiwiZGlzYWJsZVNjcm9sbF8iLCJyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIiLCJyZWdpc3RlclN1cmZhY2VJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIiLCJhZGRDbGFzcyIsInNob3VsZE5vdGlmeSIsIm5vdGlmeUFjY2VwdCIsImNsb3NlIiwibm90aWZ5Q2FuY2VsIiwiQUNDRVBUX0JUTiIsImFjY2VwdCIsIkNBTkNFTF9CVE4iLCJpc0RpYWxvZyIsInRyYXBGb2N1c09uU3VyZmFjZSIsImxheW91dEZvb3RlclJpcHBsZXMiLCJhZGRCb2R5Q2xhc3MiLCJTQ1JPTExfTE9DSyIsInJlbW92ZUJvZHlDbGFzcyIsIm1vZHVsZSIsImVsIiwib3B0aW9ucyIsImVsZW1lbnREb2N1bWVudCIsIm93bmVyRG9jdW1lbnQiLCJiYXNpY1RhYmJhYmxlcyIsIm9yZGVyZWRUYWJiYWJsZXMiLCJpc1VuYXZhaWxhYmxlIiwiY3JlYXRlSXNVbmF2YWlsYWJsZSIsImNhbmRpZGF0ZVNlbGVjdG9ycyIsImNhbmRpZGF0ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiam9pbiIsImluY2x1ZGVDb250YWluZXIiLCJtYXRjaGVzIiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwic29tZSIsImNhbmRpZGF0ZVNlbGVjdG9yIiwiY2FsbCIsInNsaWNlIiwiYXBwbHkiLCJ1bnNoaWZ0IiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlSW5kZXgiLCJpIiwibCIsImxlbmd0aCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwidGFiSW5kZXgiLCJ0YWdOYW1lIiwiZGlzYWJsZWQiLCJwdXNoIiwidGFiYmFibGVOb2RlcyIsInNvcnQiLCJhIiwiYiIsImluZGV4IiwibWFwIiwibm9kZSIsImlzT2ZmQ2FjaGUiLCJpc09mZiIsIm5vZGVDb21wdXRlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwicmVzdWx0IiwiZGlzcGxheSIsInBhcmVudE5vZGUiLCJjb21wdXRlZFN0eWxlIiwidmlzaWJpbGl0eSIsImxpc3RlbmluZ0ZvY3VzVHJhcCIsImZvY3VzVHJhcCIsInVzZXJPcHRpb25zIiwiZmlyc3RUYWJiYWJsZU5vZGUiLCJsYXN0VGFiYmFibGVOb2RlIiwibm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uIiwiYWN0aXZlIiwicGF1c2VkIiwidGFiRXZlbnQiLCJjb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY29uZmlnIiwicmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUiLCJlc2NhcGVEZWFjdGl2YXRlcyIsInRyYXAiLCJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJwYXVzZSIsInVucGF1c2UiLCJhY3RpdmF0ZU9wdGlvbnMiLCJkZWZhdWx0ZWRBY3RpdmF0ZU9wdGlvbnMiLCJvbkFjdGl2YXRlIiwiYWN0aXZlRWxlbWVudCIsImRlYWN0aXZhdGVPcHRpb25zIiwiZGVmYXVsdGVkRGVhY3RpdmF0ZU9wdGlvbnMiLCJyZXR1cm5Gb2N1cyIsIm9uRGVhY3RpdmF0ZSIsImFkZExpc3RlbmVycyIsImZpcnN0Rm9jdXNOb2RlIiwiY2hlY2tGb2N1cyIsImNoZWNrQ2xpY2siLCJjaGVja1BvaW50ZXJEb3duIiwiY2hlY2tLZXkiLCJyZW1vdmVMaXN0ZW5lcnMiLCJnZXROb2RlRm9yT3B0aW9uIiwib3B0aW9uTmFtZSIsIm9wdGlvblZhbHVlIiwiY29udGFpbnMiLCJlIiwiY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImJsdXIiLCJpc0VzY2FwZUV2ZW50IiwiaGFuZGxlVGFiIiwiaGFzQXR0cmlidXRlIiwiTnVtYmVyIiwiY3VycmVudEZvY3VzSW5kZXgiLCJpbmRleE9mIiwic2hpZnRLZXkiLCJ0cnlGb2N1cyIsInVwZGF0ZVRhYmJhYmxlTm9kZXMiLCJ0YWJiYWJsZSIsInJlYWRqdXN0Rm9jdXMiLCJmb2N1cyIsInRvTG93ZXJDYXNlIiwic2VsZWN0IiwiY3JlYXRlRm9jdXNUcmFwSW5zdGFuY2UiLCJzdXJmYWNlRWwiLCJhY2NlcHRCdXR0b25FbCIsImZvY3VzVHJhcEZhY3RvcnkiLCJjcmVhdGVGb2N1c1RyYXAiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFyTmFtZSIsInZhbHVlIiwibnVtYmVycyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiQkdfRk9DVVNFRCIsImJsdXJIYW5kbGVyXyIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiUk9PVCIsIlVOQk9VTkRFRCIsImlzVW5ib3VuZGVkIiwibGF5b3V0SW50ZXJuYWxfIiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwia2V5cyIsImsiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImlzU3VyZmFjZURpc2FibGVkIiwiYWN0aXZhdGlvblN0YXRlIiwiaXNBY3RpdmF0ZWQiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaXNQcm9ncmFtbWF0aWMiLCJhY3RpdmF0aW9uRXZlbnQiLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiaXNTdXJmYWNlQWN0aXZlIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwiRkdfREVBQ1RJVkFUSU9OIiwiRkdfQUNUSVZBVElPTiIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsInNldFRpbWVvdXQiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwibWF4RGltIiwiTWF0aCIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsIlBBRERJTkciLCJJTklUSUFMX09SSUdJTl9TQ0FMRSIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwiVkFSX0ZHX1NJWkUiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0NBTEUiLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsIiRlbCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJSaXBwbGVNaXhpbiIsInJpcHBsZSIsInJlbmRlciIsIm1kY0J1dHRvbkJhc2UiLCJyYWlzZWQiLCJ1bmVsZXZhdGVkIiwic3Ryb2tlZCIsImRlbnNlIiwiY29tcGFjdCIsImFjY2VudCIsInJlcXVpcmVkIiwiZGVmYXVsdCIsIm1kY0J1dHRvbiIsImRhcmsiLCJzY3JvbGxhYmxlIiwiJHJlZnMiLCJzdXJmYWNlIiwiY2xhc3NMaXN0IiwiYWRkIiwiJGxpc3RlbmVycyIsIm5vdGlmeSIsIm9wZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjs7TUFFNUJDLE9BQU8sSUFBWDtNQUNJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7V0FDMUJBLE9BQU9DLEdBQWQ7R0FERixNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQzs7V0FFakNBLE9BQU9ELEdBQWQ7O01BRUVGLElBQUosRUFBVTtTQUNISSxHQUFMLENBQVNMLE1BQVQ7Ozs7QUNWRyxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztTQUMvQjthQUNJLFFBREo7YUFFSSxpQkFBQ0MsRUFBRCxFQUFRO1dBQ1YsSUFBSUMsR0FBVCxJQUFnQkYsVUFBaEIsRUFBNEI7WUFDdEJHLFlBQVlILFdBQVdFLEdBQVgsQ0FBaEI7V0FDS0MsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FBNUI7O0tBTEQ7O0dBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RGOztBQ0FPLElBQU1FLGVBQWU7UUFDcEIsZUFEb0I7Y0FFZCxJQUZjO1NBR25CO1VBQ0VDO0dBSmlCO1FBQUEsa0JBTWxCQyxDQU5rQixFQU1mQyxPQU5lLEVBTU47UUFDZEMsZ0JBQUo7UUFDSUMsT0FBT0MsU0FBYyxFQUFkLEVBQWtCSCxRQUFRRSxJQUExQixDQUFYOztRQUVJRixR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
