/**
* @module vue-mdc-adapterslider 0.11.2
* @exports VueMDCSlider
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCSlider = factory());
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

/* global CustomEvent */

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

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var cssClasses = {
  ACTIVE: 'mdc-slider--active',
  DISABLED: 'mdc-slider--disabled',
  DISCRETE: 'mdc-slider--discrete',
  FOCUS: 'mdc-slider--focus',
  IN_TRANSIT: 'mdc-slider--in-transit',
  IS_DISCRETE: 'mdc-slider--discrete',
  HAS_TRACK_MARKER: 'mdc-slider--display-markers'
};

/** @enum {string} */
var strings = {
  TRACK_SELECTOR: '.mdc-slider__track',
  TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
  LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
  THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
  PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUENOW: 'aria-valuenow',
  ARIA_DISABLED: 'aria-disabled',
  STEP_DATA_ATTR: 'data-step',
  CHANGE_EVENT: 'MDCSlider:change',
  INPUT_EVENT: 'MDCSlider:input'
};

/** @enum {number} */
var numbers = {
  PAGE_FACTOR: 4
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */

/**
 * Adapter for MDC Slider.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Slider into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCSliderAdapter = function () {
  function MDCSliderAdapter() {
    classCallCheck(this, MDCSliderAdapter);
  }

  createClass(MDCSliderAdapter, [{
    key: "hasClass",

    /**
     * Returns true if className exists for the slider Element
     * @param {string} className
     * @return {boolean}
     */
    value: function hasClass(className) {}

    /**
     * Adds a class to the slider Element
     * @param {string} className
     */

  }, {
    key: "addClass",
    value: function addClass(className) {}

    /**
     * Removes a class from the slider Element
     * @param {string} className
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /**
     * Returns a string if attribute name exists on the slider Element,
     * otherwise returns null
     * @param {string} name
     * @return {?string}
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(name) {}

    /**
     * Sets attribute name on slider Element to value
     * @param {string} name
     * @param {string} value
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {}

    /**
     * Removes attribute name from slider Element
     * @param {string} name
     */

  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {}

    /**
     * Returns the bounding client rect for the slider Element
     * @return {?ClientRect}
     */

  }, {
    key: "computeBoundingRect",
    value: function computeBoundingRect() {}

    /**
     * Returns the tab index of the slider Element
     * @return {number}
     */

  }, {
    key: "getTabIndex",
    value: function getTabIndex() {}

    /**
     * Registers an event handler on the root element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(type, handler) {}

    /**
     * Deregisters an event handler on the root element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(type, handler) {}

    /**
     * Registers an event handler on the thumb container element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerThumbContainerInteractionHandler",
    value: function registerThumbContainerInteractionHandler(type, handler) {}

    /**
     * Deregisters an event handler on the thumb container element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterThumbContainerInteractionHandler",
    value: function deregisterThumbContainerInteractionHandler(type, handler) {}

    /**
     * Registers an event handler on the body for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerBodyInteractionHandler",
    value: function registerBodyInteractionHandler(type, handler) {}

    /**
     * Deregisters an event handler on the body for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterBodyInteractionHandler",
    value: function deregisterBodyInteractionHandler(type, handler) {}

    /**
     * Registers an event handler for the window resize event
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerResizeHandler",
    value: function registerResizeHandler(handler) {}

    /**
     * Deregisters an event handler for the window resize event
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterResizeHandler",
    value: function deregisterResizeHandler(handler) {}

    /**
     * Emits a custom event MDCSlider:input from the root
     */

  }, {
    key: "notifyInput",
    value: function notifyInput() {}

    /**
     * Emits a custom event MDCSlider:change from the root
     */

  }, {
    key: "notifyChange",
    value: function notifyChange() {}

    /**
     * Sets a style property of the thumb container element to the passed value
     * @param {string} propertyName
     * @param {string} value
     */

  }, {
    key: "setThumbContainerStyleProperty",
    value: function setThumbContainerStyleProperty(propertyName, value) {}

    /**
     * Sets a style property of the track element to the passed value
     * @param {string} propertyName
     * @param {string} value
     */

  }, {
    key: "setTrackStyleProperty",
    value: function setTrackStyleProperty(propertyName, value) {}

    /**
     * Sets the inner text of the pin marker to the passed value
     * @param {number} value
     */

  }, {
    key: "setMarkerValue",
    value: function setMarkerValue(value) {}

    /**
     * Appends the passed number of track markers to the track mark container element
     * @param {number} numMarkers
     */

  }, {
    key: "appendTrackMarkers",
    value: function appendTrackMarkers(numMarkers) {}

    /**
     * Removes all track markers fromt he track mark container element
     */

  }, {
    key: "removeTrackMarkers",
    value: function removeTrackMarkers() {}

    /**
     * Sets a style property of the last track marker to the passed value
     * @param {string} propertyName
     * @param {string} value
     */

  }, {
    key: "setLastTrackMarkersStyleProperty",
    value: function setLastTrackMarkersStyleProperty(propertyName, value) {}

    /**
     * Returns true if the root element is RTL, otherwise false
     * @return {boolean}
     */

  }, {
    key: "isRTL",
    value: function isRTL() {}
  }]);
  return MDCSliderAdapter;
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

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
/** @const {Object<string, !VendorPropertyMapType>} */
var eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation'
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation'
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation'
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition'
  }
};

/** @const {Object<string, !VendorPropertyMapType>} */
var cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj['document']['createElement']('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

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
 *you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var KEY_IDS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
};

/** @enum {string} */
var MOVE_EVENT_MAP = {
  'mousedown': 'mousemove',
  'touchstart': 'touchmove',
  'pointerdown': 'pointermove'
};

var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

/**
 * @extends {MDCFoundation<!MDCSliderAdapter>}
 */

var MDCSliderFoundation = function (_MDCFoundation) {
  inherits(MDCSliderFoundation, _MDCFoundation);
  createClass(MDCSliderFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {cssClasses} */
    get: function get$$1() {
      return cssClasses;
    }

    /** @return enum {strings} */

  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
    }

    /** @return enum {numbers} */

  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }

    /** @return {!MDCSliderAdapter} */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCSliderAdapter} */{
          hasClass: function hasClass() {
            return (/* className: string */ /* boolean */false
            );
          },
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          getAttribute: function getAttribute() {
            return (/* name: string */ /* string|null */null
            );
          },
          setAttribute: function setAttribute() /* name: string, value: string */{},
          removeAttribute: function removeAttribute() /* name: string */{},
          computeBoundingRect: function computeBoundingRect() {
            return (/* ClientRect */{
                top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
              }
            );
          },
          getTabIndex: function getTabIndex() {
            return (/* number */0
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
          registerBodyInteractionHandler: function registerBodyInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() /* type: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          notifyInput: function notifyInput() {},
          notifyChange: function notifyChange() {},
          setThumbContainerStyleProperty: function setThumbContainerStyleProperty() /* propertyName: string, value: string */{},
          setTrackStyleProperty: function setTrackStyleProperty() /* propertyName: string, value: string */{},
          setMarkerValue: function setMarkerValue() /* value: number */{},
          appendTrackMarkers: function appendTrackMarkers() /* numMarkers: number */{},
          removeTrackMarkers: function removeTrackMarkers() {},
          setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() /* propertyName: string, value: string */{},
          isRTL: function isRTL() {
            return (/* boolean */false
            );
          }
        }
      );
    }

    /**
     * Creates a new instance of MDCSliderFoundation
     * @param {?MDCSliderAdapter} adapter
     */

  }]);

  function MDCSliderFoundation(adapter) {
    classCallCheck(this, MDCSliderFoundation);

    /** @private {?ClientRect} */
    var _this = possibleConstructorReturn(this, (MDCSliderFoundation.__proto__ || Object.getPrototypeOf(MDCSliderFoundation)).call(this, _extends(MDCSliderFoundation.defaultAdapter, adapter)));

    _this.rect_ = null;
    // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
    // because those could be valid tabindices set by the client code.
    _this.savedTabIndex_ = NaN;
    _this.active_ = false;
    _this.inTransit_ = false;
    _this.isDiscrete_ = false;
    _this.hasTrackMarker_ = false;
    _this.handlingThumbTargetEvt_ = false;
    _this.min_ = 0;
    _this.max_ = 100;
    _this.step_ = 0;
    _this.value_ = 0;
    _this.disabled_ = false;
    _this.preventFocusState_ = false;
    _this.updateUIFrame_ = 0;
    _this.thumbContainerPointerHandler_ = function () {
      _this.handlingThumbTargetEvt_ = true;
    };
    _this.interactionStartHandler_ = function (evt) {
      return _this.handleDown_(evt);
    };
    _this.keydownHandler_ = function (evt) {
      return _this.handleKeydown_(evt);
    };
    _this.focusHandler_ = function () {
      return _this.handleFocus_();
    };
    _this.blurHandler_ = function () {
      return _this.handleBlur_();
    };
    _this.resizeHandler_ = function () {
      return _this.layout();
    };
    return _this;
  }

  createClass(MDCSliderFoundation, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.isDiscrete_ = this.adapter_.hasClass(cssClasses.IS_DISCRETE);
      this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses.HAS_TRACK_MARKER);
      DOWN_EVENTS.forEach(function (evtName) {
        return _this2.adapter_.registerInteractionHandler(evtName, _this2.interactionStartHandler_);
      });
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
      this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      DOWN_EVENTS.forEach(function (evtName) {
        _this2.adapter_.registerThumbContainerInteractionHandler(evtName, _this2.thumbContainerPointerHandler_);
      });
      this.adapter_.registerResizeHandler(this.resizeHandler_);
      this.layout();
      // At last step, provide a reasonable default value to discrete slider
      if (this.isDiscrete_ && this.getStep() == 0) {
        this.step_ = 1;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      DOWN_EVENTS.forEach(function (evtName) {
        _this3.adapter_.deregisterInteractionHandler(evtName, _this3.interactionStartHandler_);
      });
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
      this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
      DOWN_EVENTS.forEach(function (evtName) {
        _this3.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this3.thumbContainerPointerHandler_);
      });
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }, {
    key: 'setupTrackMarker',
    value: function setupTrackMarker() {
      if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() != 0) {
        var min = this.getMin();
        var max = this.getMax();
        var step = this.getStep();
        var numMarkers = (max - min) / step;

        // In case distance between max & min is indivisible to step,
        // we place the secondary to last marker proportionally at where thumb
        // could reach and place the last marker at max value
        var indivisible = Math.ceil(numMarkers) !== numMarkers;
        if (indivisible) {
          numMarkers = Math.ceil(numMarkers);
        }

        this.adapter_.removeTrackMarkers();
        this.adapter_.appendTrackMarkers(numMarkers);

        if (indivisible) {
          var lastStepRatio = (max - numMarkers * step) / step + 1;
          var flex = getCorrectPropertyName(window, 'flex');
          this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
        }
      }
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.rect_ = this.adapter_.computeBoundingRect();
      this.updateUIForCurrentValue_();
    }

    /** @return {number} */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value_;
    }

    /** @param {number} value */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.setValue_(value, false);
    }

    /** @return {number} */

  }, {
    key: 'getMax',
    value: function getMax() {
      return this.max_;
    }

    /** @param {number} max */

  }, {
    key: 'setMax',
    value: function setMax(max) {
      if (max < this.min_) {
        throw new Error('Cannot set max to be less than the slider\'s minimum value');
      }
      this.max_ = max;
      this.setValue_(this.value_, false, true);
      this.adapter_.setAttribute(strings.ARIA_VALUEMAX, String(this.max_));
      this.setupTrackMarker();
    }

    /** @return {number} */

  }, {
    key: 'getMin',
    value: function getMin() {
      return this.min_;
    }

    /** @param {number} min */

  }, {
    key: 'setMin',
    value: function setMin(min) {
      if (min > this.max_) {
        throw new Error('Cannot set min to be greater than the slider\'s maximum value');
      }
      this.min_ = min;
      this.setValue_(this.value_, false, true);
      this.adapter_.setAttribute(strings.ARIA_VALUEMIN, String(this.min_));
      this.setupTrackMarker();
    }

    /** @return {number} */

  }, {
    key: 'getStep',
    value: function getStep() {
      return this.step_;
    }

    /** @param {number} step */

  }, {
    key: 'setStep',
    value: function setStep(step) {
      if (step < 0) {
        throw new Error('Step cannot be set to a negative number');
      }
      if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
        step = 1;
      }
      this.step_ = step;
      this.setValue_(this.value_, false, true);
      this.setupTrackMarker();
    }

    /** @return {boolean} */

  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.disabled_;
    }

    /** @param {boolean} disabled */

  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      this.disabled_ = disabled;
      this.toggleClass_(cssClasses.DISABLED, this.disabled_);
      if (this.disabled_) {
        this.savedTabIndex_ = this.adapter_.getTabIndex();
        this.adapter_.setAttribute(strings.ARIA_DISABLED, 'true');
        this.adapter_.removeAttribute('tabindex');
      } else {
        this.adapter_.removeAttribute(strings.ARIA_DISABLED);
        if (!isNaN(this.savedTabIndex_)) {
          this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
        }
      }
    }

    /**
     * Called when the user starts interacting with the slider
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handleDown_',
    value: function handleDown_(evt) {
      var _this4 = this;

      if (this.disabled_) {
        return;
      }

      this.preventFocusState_ = true;
      this.setInTransit_(!this.handlingThumbTargetEvt_);
      this.handlingThumbTargetEvt_ = false;
      this.setActive_(true);

      var moveHandler = function moveHandler(evt) {
        _this4.handleMove_(evt);
      };

      // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
      // do not always fire these consistently in pairs.
      // (See https://github.com/material-components/material-components-web/issues/1192)
      var upHandler = function upHandler() {
        _this4.handleUp_();
        _this4.adapter_.deregisterBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
        UP_EVENTS.forEach(function (evtName) {
          return _this4.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
        });
      };

      this.adapter_.registerBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
      UP_EVENTS.forEach(function (evtName) {
        return _this4.adapter_.registerBodyInteractionHandler(evtName, upHandler);
      });
      this.setValueFromEvt_(evt);
    }

    /**
     * Called when the user moves the slider
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handleMove_',
    value: function handleMove_(evt) {
      evt.preventDefault();
      this.setValueFromEvt_(evt);
    }

    /**
     * Called when the user's interaction with the slider ends
     * @private
     */

  }, {
    key: 'handleUp_',
    value: function handleUp_() {
      this.setActive_(false);
      this.adapter_.notifyChange();
    }

    /**
     * Returns the pageX of the event
     * @param {!Event} evt
     * @return {number}
     * @private
     */

  }, {
    key: 'getPageX_',
    value: function getPageX_(evt) {
      if (evt.targetTouches && evt.targetTouches.length > 0) {
        return evt.targetTouches[0].pageX;
      }
      return evt.pageX;
    }

    /**
     * Sets the slider value from an event
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'setValueFromEvt_',
    value: function setValueFromEvt_(evt) {
      var pageX = this.getPageX_(evt);
      var value = this.computeValueFromPageX_(pageX);
      this.setValue_(value, true);
    }

    /**
     * Computes the new value from the pageX position
     * @param {number} pageX
     * @return {number}
     */

  }, {
    key: 'computeValueFromPageX_',
    value: function computeValueFromPageX_(pageX) {
      var max = this.max_,
          min = this.min_;

      var xPos = pageX - this.rect_.left;
      var pctComplete = xPos / this.rect_.width;
      if (this.adapter_.isRTL()) {
        pctComplete = 1 - pctComplete;
      }
      // Fit the percentage complete between the range [min,max]
      // by remapping from [0, 1] to [min, min+(max-min)].
      return min + pctComplete * (max - min);
    }

    /**
     * Handles keydown events
     * @param {!Event} evt
     */

  }, {
    key: 'handleKeydown_',
    value: function handleKeydown_(evt) {
      var keyId = this.getKeyId_(evt);
      var value = this.getValueForKeyId_(keyId);
      if (isNaN(value)) {
        return;
      }

      // Prevent page from scrolling due to key presses that would normally scroll the page
      evt.preventDefault();
      this.adapter_.addClass(cssClasses.FOCUS);
      this.setValue_(value, true);
      this.adapter_.notifyChange();
    }

    /**
     * Returns the computed name of the event
     * @param {!Event} kbdEvt
     * @return {string}
     */

  }, {
    key: 'getKeyId_',
    value: function getKeyId_(kbdEvt) {
      if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
        return KEY_IDS.ARROW_LEFT;
      }
      if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
        return KEY_IDS.ARROW_RIGHT;
      }
      if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
        return KEY_IDS.ARROW_UP;
      }
      if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
        return KEY_IDS.ARROW_DOWN;
      }
      if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
        return KEY_IDS.HOME;
      }
      if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
        return KEY_IDS.END;
      }
      if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
        return KEY_IDS.PAGE_UP;
      }
      if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
        return KEY_IDS.PAGE_DOWN;
      }

      return '';
    }

    /**
     * Computes the value given a keyboard key ID
     * @param {string} keyId
     * @return {number}
     */

  }, {
    key: 'getValueForKeyId_',
    value: function getValueForKeyId_(keyId) {
      var max = this.max_,
          min = this.min_,
          step = this.step_;

      var delta = step || (max - min) / 100;
      var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
      if (valueNeedsToBeFlipped) {
        delta = -delta;
      }

      switch (keyId) {
        case KEY_IDS.ARROW_LEFT:
        case KEY_IDS.ARROW_DOWN:
          return this.value_ - delta;
        case KEY_IDS.ARROW_RIGHT:
        case KEY_IDS.ARROW_UP:
          return this.value_ + delta;
        case KEY_IDS.HOME:
          return this.min_;
        case KEY_IDS.END:
          return this.max_;
        case KEY_IDS.PAGE_UP:
          return this.value_ + delta * numbers.PAGE_FACTOR;
        case KEY_IDS.PAGE_DOWN:
          return this.value_ - delta * numbers.PAGE_FACTOR;
        default:
          return NaN;
      }
    }
  }, {
    key: 'handleFocus_',
    value: function handleFocus_() {
      if (this.preventFocusState_) {
        return;
      }
      this.adapter_.addClass(cssClasses.FOCUS);
    }
  }, {
    key: 'handleBlur_',
    value: function handleBlur_() {
      this.preventFocusState_ = false;
      this.adapter_.removeClass(cssClasses.FOCUS);
    }

    /**
     * Sets the value of the slider
     * @param {number} value
     * @param {boolean} shouldFireInput
     * @param {boolean=} force
     */

  }, {
    key: 'setValue_',
    value: function setValue_(value, shouldFireInput) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (value === this.value_ && !force) {
        return;
      }

      var min = this.min_,
          max = this.max_;

      var valueSetToBoundary = value === min || value === max;
      if (this.step_ && !valueSetToBoundary) {
        value = this.quantize_(value);
      }
      if (value < min) {
        value = min;
      } else if (value > max) {
        value = max;
      }
      this.value_ = value;
      this.adapter_.setAttribute(strings.ARIA_VALUENOW, String(this.value_));
      this.updateUIForCurrentValue_();

      if (shouldFireInput) {
        this.adapter_.notifyInput();
        if (this.isDiscrete_) {
          this.adapter_.setMarkerValue(value);
        }
      }
    }

    /**
     * Calculates the quantized value
     * @param {number} value
     * @return {number}
     */

  }, {
    key: 'quantize_',
    value: function quantize_(value) {
      var numSteps = Math.round(value / this.step_);
      var quantizedVal = numSteps * this.step_;
      return quantizedVal;
    }
  }, {
    key: 'updateUIForCurrentValue_',
    value: function updateUIForCurrentValue_() {
      var _this5 = this;

      var max = this.max_,
          min = this.min_,
          value = this.value_;

      var pctComplete = (value - min) / (max - min);
      var translatePx = pctComplete * this.rect_.width;
      if (this.adapter_.isRTL()) {
        translatePx = this.rect_.width - translatePx;
      }

      var transformProp = getCorrectPropertyName(window, 'transform');
      var transitionendEvtName = getCorrectEventName(window, 'transitionend');

      if (this.inTransit_) {
        var onTransitionEnd = function onTransitionEnd() {
          _this5.setInTransit_(false);
          _this5.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
        };
        this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
      }

      this.updateUIFrame_ = requestAnimationFrame(function () {
        // NOTE(traviskaufman): It would be nice to use calc() here,
        // but IE cannot handle calcs in transforms correctly.
        // See: https://goo.gl/NC2itk
        // Also note that the -50% offset is used to center the slider thumb.
        _this5.adapter_.setThumbContainerStyleProperty(transformProp, 'translateX(' + translatePx + 'px) translateX(-50%)');
        _this5.adapter_.setTrackStyleProperty(transformProp, 'scaleX(' + pctComplete + ')');
      });
    }

    /**
     * Toggles the active state of the slider
     * @param {boolean} active
     */

  }, {
    key: 'setActive_',
    value: function setActive_(active) {
      this.active_ = active;
      this.toggleClass_(cssClasses.ACTIVE, this.active_);
    }

    /**
     * Toggles the inTransit state of the slider
     * @param {boolean} inTransit
     */

  }, {
    key: 'setInTransit_',
    value: function setInTransit_(inTransit) {
      this.inTransit_ = inTransit;
      this.toggleClass_(cssClasses.IN_TRANSIT, this.inTransit_);
    }

    /**
     * Conditionally adds or removes a class based on shouldBePresent
     * @param {string} className
     * @param {boolean} shouldBePresent
     */

  }, {
    key: 'toggleClass_',
    value: function toggleClass_(className, shouldBePresent) {
      if (shouldBePresent) {
        this.adapter_.addClass(className);
      } else {
        this.adapter_.removeClass(className);
      }
    }
  }]);
  return MDCSliderFoundation;
}(MDCFoundation);

var mdcSlider = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-slider", class: _vm.classes, attrs: { "tabindex": "0", "role": "slider" } }, [_c('div', { staticClass: "mdc-slider__track-container" }, [_c('div', { staticClass: "mdc-slider__track", style: _vm.trackStyles }), _vm._v(" "), _vm.hasMarkers ? _c('div', { staticClass: "mdc-slider__track-marker-container" }, _vm._l(_vm.numMarkers, function (markerNum) {
      return _c('div', { key: markerNum, staticClass: "mdc-slider__track-marker", style: markerNum == _vm.numMarkers ? _vm.lastTrackMarkersStyles : {} });
    })) : _vm._e()]), _vm._v(" "), _c('div', { ref: "thumbContainer", staticClass: "mdc-slider__thumb-container", style: _vm.thumbStyles }, [_vm.isDiscrete ? _c('div', { staticClass: "mdc-slider__pin" }, [_c('span', { staticClass: "mdc-slider__pin-value-marker" }, [_vm._v(_vm._s(_vm.markerValue))])]) : _vm._e(), _vm._v(" "), _c('svg', { staticClass: "mdc-slider__thumb", attrs: { "width": "21", "height": "21" } }, [_c('circle', { attrs: { "cx": "10.5", "cy": "10.5", "r": "7.875" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-slider__focus-ring" })])]);
  }, staticRenderFns: [],
  name: 'mdc-slider',
  mixins: [DispatchFocusMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Number, String],
    min: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 100 },
    step: { type: [Number, String], default: 0 },
    displayMarkers: Boolean,
    disabled: Boolean,
    layoutOn: String,
    layoutOnSource: { type: Object, required: false }
  },
  data: function data() {
    return {
      classes: {
        'mdc-slider--discrete': !!this.step,
        'mdc-slider--display-markers': this.displayMarkers
      },
      trackStyles: {},
      lastTrackMarkersStyles: {},
      thumbStyles: {},
      markerValue: '',
      numMarkers: 0
    };
  },

  computed: {
    isDiscrete: function isDiscrete() {
      return !!this.step;
    },
    hasMarkers: function hasMarkers() {
      return !!this.step && this.displayMarkers && this.numMarkers;
    }
  },
  watch: {
    value: function value() {
      if (this.foundation.getValue() !== Number(this.value)) {
        this.foundation.setValue(this.value);
      }
    },
    min: function min() {
      this.foundation.setMin(Number(this.min));
    },
    max: function max() {
      this.foundation.setMax(Number(this.max));
    },
    step: function step() {
      this.foundation.setStep(Number(this.step));
    },
    disabled: function disabled() {
      this.foundation.setDisabled(this.disabled);
    }
  },
  methods: {
    layout: function layout() {
      var _this = this;

      this.$nextTick(function () {
        _this.foundation && _this.foundation.layout();
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.foundation = new MDCSliderFoundation({
      hasClass: function hasClass(className) {
        return _this2.$el.classList.contains(className);
      },
      addClass: function addClass(className) {
        _this2.$set(_this2.classes, className, true);
      },
      removeClass: function removeClass(className) {
        _this2.$delete(_this2.classes, className, true);
      },
      getAttribute: function getAttribute(name) {
        return _this2.$el.getAttribute(name);
      },
      setAttribute: function setAttribute(name, value) {
        return _this2.$el.setAttribute(name, value);
      },
      removeAttribute: function removeAttribute(name) {
        return _this2.$el.removeAttribute(name);
      },
      computeBoundingRect: function computeBoundingRect() {
        return _this2.$el.getBoundingClientRect();
      },
      getTabIndex: function getTabIndex() {
        return _this2.$el.tabIndex;
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        _this2.$el.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        _this2.$el.removeEventListener(type, handler);
      },
      registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(type, handler) {
        _this2.$refs.thumbContainer.addEventListener(type, handler);
      },
      deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(type, handler) {
        _this2.$refs.thumbContainer.removeEventListener(type, handler);
      },
      registerBodyInteractionHandler: function registerBodyInteractionHandler(type, handler) {
        document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(type, handler) {
        document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        window.removeEventListener('resize', handler);
      },
      notifyInput: function notifyInput() {
        _this2.$emit('input', _this2.foundation.getValue());
      },
      notifyChange: function notifyChange() {
        _this2.$emit('change', _this2.foundation.getValue());
      },
      setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
        _this2.$set(_this2.thumbStyles, propertyName, value);
      },
      setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
        _this2.$set(_this2.trackStyles, propertyName, value);
      },
      setMarkerValue: function setMarkerValue(value) {
        _this2.markerValue = value;
      },
      appendTrackMarkers: function appendTrackMarkers(numMarkers) {
        _this2.numMarkers = numMarkers;
      },
      removeTrackMarkers: function removeTrackMarkers() {
        _this2.numMarkers = 0;
      },
      setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
        _this2.$set(_this2.lastTrackMarkersStyles, propertyName, value);
      },
      isRTL: function isRTL() {
        return false;
      }
    });

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setMin(Number(this.min));
    this.foundation.setMax(Number(this.max));
    this.foundation.setStep(Number(this.step));
    this.foundation.setValue(Number(this.value));
    if (this.hasMarkers) {
      this.foundation.setupTrackMarker();
    }

    this.$root.$on('mdc:layout', this.layout);

    if (this.layoutOn) {
      var source = this.layoutOnSource || this.$root;
      source.$on(this.layoutOn, this.layout);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.foundation.destroy();
  }
};

var plugin = BasePlugin({
  mdcSlider: mdcSlider
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2xpZGVyL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2xpZGVyL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL21kYy1zbGlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NsaWRlci9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuICB7aGFzRm9jdXM6IGZhbHNlfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uRm9jdXNFdmVudCAoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgb25CbHVyRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xuICAgICAgbGV0IGhhc0ZvY3VzID0gdGhpcy4kZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBBQ1RJVkU6ICdtZGMtc2xpZGVyLS1hY3RpdmUnLFxuICBESVNBQkxFRDogJ21kYy1zbGlkZXItLWRpc2FibGVkJyxcbiAgRElTQ1JFVEU6ICdtZGMtc2xpZGVyLS1kaXNjcmV0ZScsXG4gIEZPQ1VTOiAnbWRjLXNsaWRlci0tZm9jdXMnLFxuICBJTl9UUkFOU0lUOiAnbWRjLXNsaWRlci0taW4tdHJhbnNpdCcsXG4gIElTX0RJU0NSRVRFOiAnbWRjLXNsaWRlci0tZGlzY3JldGUnLFxuICBIQVNfVFJBQ0tfTUFSS0VSOiAnbWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVFJBQ0tfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fdHJhY2snLFxuICBUUkFDS19NQVJLRVJfQ09OVEFJTkVSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RyYWNrLW1hcmtlci1jb250YWluZXInLFxuICBMQVNUX1RSQUNLX01BUktFUl9TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX190cmFjay1tYXJrZXI6bGFzdC1jaGlsZCcsXG4gIFRIVU1CX0NPTlRBSU5FUl9TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX190aHVtYi1jb250YWluZXInLFxuICBQSU5fVkFMVUVfTUFSS0VSX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3Bpbi12YWx1ZS1tYXJrZXInLFxuICBBUklBX1ZBTFVFTUlOOiAnYXJpYS12YWx1ZW1pbicsXG4gIEFSSUFfVkFMVUVNQVg6ICdhcmlhLXZhbHVlbWF4JyxcbiAgQVJJQV9WQUxVRU5PVzogJ2FyaWEtdmFsdWVub3cnLFxuICBBUklBX0RJU0FCTEVEOiAnYXJpYS1kaXNhYmxlZCcsXG4gIFNURVBfREFUQV9BVFRSOiAnZGF0YS1zdGVwJyxcbiAgQ0hBTkdFX0VWRU5UOiAnTURDU2xpZGVyOmNoYW5nZScsXG4gIElOUFVUX0VWRU5UOiAnTURDU2xpZGVyOmlucHV0Jyxcbn07XG5cbi8qKiBAZW51bSB7bnVtYmVyfSAqL1xuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFHRV9GQUNUT1I6IDQsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBTbGlkZXIuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgU2xpZGVyIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENTbGlkZXJBZGFwdGVyIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBjbGFzc05hbWUgZXhpc3RzIGZvciB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyBpZiBhdHRyaWJ1dGUgbmFtZSBleGlzdHMgb24gdGhlIHNsaWRlciBFbGVtZW50LFxuICAgKiBvdGhlcndpc2UgcmV0dXJucyBudWxsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4gez9zdHJpbmd9XG4gICAqL1xuICBnZXRBdHRyaWJ1dGUobmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyBhdHRyaWJ1dGUgbmFtZSBvbiBzbGlkZXIgRWxlbWVudCB0byB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhdHRyaWJ1dGUgbmFtZSBmcm9tIHNsaWRlciBFbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm91bmRpbmcgY2xpZW50IHJlY3QgZm9yIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcmV0dXJuIHs/Q2xpZW50UmVjdH1cbiAgICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0YWIgaW5kZXggb2YgdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFRhYkluZGV4KCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIHRodW1iIGNvbnRhaW5lciBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSB0aHVtYiBjb250YWluZXIgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgYm9keSBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBib2R5IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIGV2ZW50IE1EQ1NsaWRlcjppbnB1dCBmcm9tIHRoZSByb290XG4gICAqL1xuICBub3RpZnlJbnB1dCgpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIGV2ZW50IE1EQ1NsaWRlcjpjaGFuZ2UgZnJvbSB0aGUgcm9vdFxuICAgKi9cbiAgbm90aWZ5Q2hhbmdlKCkge31cblxuICAvKipcbiAgICogU2V0cyBhIHN0eWxlIHByb3BlcnR5IG9mIHRoZSB0aHVtYiBjb250YWluZXIgZWxlbWVudCB0byB0aGUgcGFzc2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogU2V0cyBhIHN0eWxlIHByb3BlcnR5IG9mIHRoZSB0cmFjayBlbGVtZW50IHRvIHRoZSBwYXNzZWQgdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldFRyYWNrU3R5bGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbm5lciB0ZXh0IG9mIHRoZSBwaW4gbWFya2VyIHRvIHRoZSBwYXNzZWQgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICBzZXRNYXJrZXJWYWx1ZSh2YWx1ZSkge31cblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgcGFzc2VkIG51bWJlciBvZiB0cmFjayBtYXJrZXJzIHRvIHRoZSB0cmFjayBtYXJrIGNvbnRhaW5lciBlbGVtZW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW1NYXJrZXJzXG4gICAqL1xuICBhcHBlbmRUcmFja01hcmtlcnMobnVtTWFya2Vycykge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdHJhY2sgbWFya2VycyBmcm9tdCBoZSB0cmFjayBtYXJrIGNvbnRhaW5lciBlbGVtZW50XG4gICAqL1xuICByZW1vdmVUcmFja01hcmtlcnMoKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3R5bGUgcHJvcGVydHkgb2YgdGhlIGxhc3QgdHJhY2sgbWFya2VyIHRvIHRoZSBwYXNzZWQgdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcm9vdCBlbGVtZW50IGlzIFJUTCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc1JUTCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1NsaWRlckFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICp5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IE1EQ1NsaWRlckFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuaW1wb3J0IHtnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4JztcbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IEtFWV9JRFMgPSB7XG4gIEFSUk9XX0xFRlQ6ICdBcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVDogJ0Fycm93UmlnaHQnLFxuICBBUlJPV19VUDogJ0Fycm93VXAnLFxuICBBUlJPV19ET1dOOiAnQXJyb3dEb3duJyxcbiAgSE9NRTogJ0hvbWUnLFxuICBFTkQ6ICdFbmQnLFxuICBQQUdFX1VQOiAnUGFnZVVwJyxcbiAgUEFHRV9ET1dOOiAnUGFnZURvd24nLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBNT1ZFX0VWRU5UX01BUCA9IHtcbiAgJ21vdXNlZG93bic6ICdtb3VzZW1vdmUnLFxuICAndG91Y2hzdGFydCc6ICd0b3VjaG1vdmUnLFxuICAncG9pbnRlcmRvd24nOiAncG9pbnRlcm1vdmUnLFxufTtcblxuY29uc3QgRE9XTl9FVkVOVFMgPSBbJ21vdXNlZG93bicsICdwb2ludGVyZG93bicsICd0b3VjaHN0YXJ0J107XG5jb25zdCBVUF9FVkVOVFMgPSBbJ21vdXNldXAnLCAncG9pbnRlcnVwJywgJ3RvdWNoZW5kJ107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1NsaWRlckFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENTbGlkZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDU2xpZGVyQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU2xpZGVyQWRhcHRlcn0gKi8gKHtcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nICovKSA9PiAvKiBzdHJpbmd8bnVsbCAqLyBudWxsLFxuICAgICAgc2V0QXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZTogKC8qIG5hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovICh7XG4gICAgICAgIHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCxcbiAgICAgIH0pLFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFRyYWNrU3R5bGVQcm9wZXJ0eTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1hcmtlclZhbHVlOiAoLyogdmFsdWU6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBhcHBlbmRUcmFja01hcmtlcnM6ICgvKiBudW1NYXJrZXJzOiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlVHJhY2tNYXJrZXJzOiAoKSA9PiB7fSxcbiAgICAgIHNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5OiAoLyogcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaXNSVEw6ICgpID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBNRENTbGlkZXJGb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7P01EQ1NsaWRlckFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1NsaWRlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICAvKiogQHByaXZhdGUgez9DbGllbnRSZWN0fSAqL1xuICAgIHRoaXMucmVjdF8gPSBudWxsO1xuICAgIC8vIFdlIHNldCB0aGlzIHRvIE5hTiBzaW5jZSB3ZSB3YW50IGl0IHRvIGJlIGEgbnVtYmVyLCBidXQgd2UgY2FuJ3QgdXNlICcwJyBvciAnLTEnXG4gICAgLy8gYmVjYXVzZSB0aG9zZSBjb3VsZCBiZSB2YWxpZCB0YWJpbmRpY2VzIHNldCBieSB0aGUgY2xpZW50IGNvZGUuXG4gICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IE5hTjtcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmluVHJhbnNpdF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gZmFsc2U7XG4gICAgdGhpcy5oYXNUcmFja01hcmtlcl8gPSBmYWxzZTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5taW5fID0gMDtcbiAgICB0aGlzLm1heF8gPSAxMDA7XG4gICAgdGhpcy5zdGVwXyA9IDA7XG4gICAgdGhpcy52YWx1ZV8gPSAwO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZVVJRnJhbWVfID0gMDtcbiAgICB0aGlzLnRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfID0gKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGluZ1RodW1iVGFyZ2V0RXZ0XyA9IHRydWU7XG4gICAgfTtcbiAgICB0aGlzLmludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRG93bl8oZXZ0KTtcbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5ZG93bl8oZXZ0KTtcbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzXygpO1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyXygpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmlzRGlzY3JldGVfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLklTX0RJU0NSRVRFKTtcbiAgICB0aGlzLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IQVNfVFJBQ0tfTUFSS0VSKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dE5hbWUsIHRoaXMuaW50ZXJhY3Rpb25TdGFydEhhbmRsZXJfKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgICAvLyBBdCBsYXN0IHN0ZXAsIHByb3ZpZGUgYSByZWFzb25hYmxlIGRlZmF1bHQgdmFsdWUgdG8gZGlzY3JldGUgc2xpZGVyXG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5nZXRTdGVwKCkgPT0gMCkge1xuICAgICAgdGhpcy5zdGVwXyA9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy5pbnRlcmFjdGlvblN0YXJ0SGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgRE9XTl9FVkVOVFMuZm9yRWFjaCgoZXZ0TmFtZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy50aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIHNldHVwVHJhY2tNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8gJiYgdGhpcy5oYXNUcmFja01hcmtlcl8mJiB0aGlzLmdldFN0ZXAoKSAhPSAwKSB7XG4gICAgICBjb25zdCBtaW4gPSB0aGlzLmdldE1pbigpO1xuICAgICAgY29uc3QgbWF4ID0gdGhpcy5nZXRNYXgoKTtcbiAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldFN0ZXAoKTtcbiAgICAgIGxldCBudW1NYXJrZXJzID0gKG1heCAtIG1pbikgLyBzdGVwO1xuXG4gICAgICAvLyBJbiBjYXNlIGRpc3RhbmNlIGJldHdlZW4gbWF4ICYgbWluIGlzIGluZGl2aXNpYmxlIHRvIHN0ZXAsXG4gICAgICAvLyB3ZSBwbGFjZSB0aGUgc2Vjb25kYXJ5IHRvIGxhc3QgbWFya2VyIHByb3BvcnRpb25hbGx5IGF0IHdoZXJlIHRodW1iXG4gICAgICAvLyBjb3VsZCByZWFjaCBhbmQgcGxhY2UgdGhlIGxhc3QgbWFya2VyIGF0IG1heCB2YWx1ZVxuICAgICAgY29uc3QgaW5kaXZpc2libGUgPSBNYXRoLmNlaWwobnVtTWFya2VycykgIT09IG51bU1hcmtlcnM7XG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgbnVtTWFya2VycyA9IE1hdGguY2VpbChudW1NYXJrZXJzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVUcmFja01hcmtlcnMoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYXBwZW5kVHJhY2tNYXJrZXJzKG51bU1hcmtlcnMpO1xuXG4gICAgICBpZiAoaW5kaXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgbGFzdFN0ZXBSYXRpbyA9IChtYXggLSBudW1NYXJrZXJzICogc3RlcCkgLyBzdGVwICsgMTtcbiAgICAgICAgY29uc3QgZmxleCA9IGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAnZmxleCcpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldExhc3RUcmFja01hcmtlcnNTdHlsZVByb3BlcnR5KGZsZXgsIFN0cmluZyhsYXN0U3RlcFJhdGlvKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMucmVjdF8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLnVwZGF0ZVVJRm9yQ3VycmVudFZhbHVlXygpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRNYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4XztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gbWF4ICovXG4gIHNldE1heChtYXgpIHtcbiAgICBpZiAobWF4IDwgdGhpcy5taW5fKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgbWF4IHRvIGJlIGxlc3MgdGhhbiB0aGUgc2xpZGVyXFwncyBtaW5pbXVtIHZhbHVlJyk7XG4gICAgfVxuICAgIHRoaXMubWF4XyA9IG1heDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU1BWCwgU3RyaW5nKHRoaXMubWF4XykpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0TWluKCkge1xuICAgIHJldHVybiB0aGlzLm1pbl87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IG1pbiAqL1xuICBzZXRNaW4obWluKSB7XG4gICAgaWYgKG1pbiA+IHRoaXMubWF4Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IG1pbiB0byBiZSBncmVhdGVyIHRoYW4gdGhlIHNsaWRlclxcJ3MgbWF4aW11bSB2YWx1ZScpO1xuICAgIH1cbiAgICB0aGlzLm1pbl8gPSBtaW47XG4gICAgdGhpcy5zZXRWYWx1ZV8odGhpcy52YWx1ZV8sIGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfVkFMVUVNSU4sIFN0cmluZyh0aGlzLm1pbl8pKTtcbiAgICB0aGlzLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFN0ZXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgKi9cbiAgc2V0U3RlcChzdGVwKSB7XG4gICAgaWYgKHN0ZXAgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgY2Fubm90IGJlIHNldCB0byBhIG5lZ2F0aXZlIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0Rpc2NyZXRlXyAmJiAodHlwZW9mKHN0ZXApICE9PSAnbnVtYmVyJyB8fCBzdGVwIDwgMSkpIHtcbiAgICAgIHN0ZXAgPSAxO1xuICAgIH1cbiAgICB0aGlzLnN0ZXBfID0gc3RlcDtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmRpc2FibGVkXyA9IGRpc2FibGVkO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuRElTQUJMRUQsIHRoaXMuZGlzYWJsZWRfKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfRElTQUJMRUQsICd0cnVlJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX0RJU0FCTEVEKTtcbiAgICAgIGlmICghaXNOYU4odGhpcy5zYXZlZFRhYkluZGV4XykpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgU3RyaW5nKHRoaXMuc2F2ZWRUYWJJbmRleF8pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGludGVyYWN0aW5nIHdpdGggdGhlIHNsaWRlclxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb3duXyhldnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZlbnRGb2N1c1N0YXRlXyA9IHRydWU7XG4gICAgdGhpcy5zZXRJblRyYW5zaXRfKCF0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfKTtcbiAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gZmFsc2U7XG4gICAgdGhpcy5zZXRBY3RpdmVfKHRydWUpO1xuXG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZU1vdmVfKGV2dCk7XG4gICAgfTtcblxuICAgIC8vIE5vdGU6IHVwSGFuZGxlciBpcyBbZGVdcmVnaXN0ZXJlZCBvbiBBTEwgcG90ZW50aWFsIHBvaW50ZXItcmVsYXRlZCByZWxlYXNlIGV2ZW50IHR5cGVzLCBzaW5jZSBzb21lIGJyb3dzZXJzXG4gICAgLy8gZG8gbm90IGFsd2F5cyBmaXJlIHRoZXNlIGNvbnNpc3RlbnRseSBpbiBwYWlycy5cbiAgICAvLyAoU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy8xMTkyKVxuICAgIGNvbnN0IHVwSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlVXBfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgICAgVVBfRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdXBIYW5kbGVyKSk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKE1PVkVfRVZFTlRfTUFQW2V2dC50eXBlXSwgbW92ZUhhbmRsZXIpO1xuICAgIFVQX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB1cEhhbmRsZXIpKTtcbiAgICB0aGlzLnNldFZhbHVlRnJvbUV2dF8oZXZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBtb3ZlcyB0aGUgc2xpZGVyXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZU1vdmVfKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0VmFsdWVGcm9tRXZ0XyhldnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyJ3MgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGVyIGVuZHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVVwXygpIHtcbiAgICB0aGlzLnNldEFjdGl2ZV8oZmFsc2UpO1xuICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFnZVggb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGFnZVhfKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcyAmJiBldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfVxuICAgIHJldHVybiBldnQucGFnZVg7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2xpZGVyIHZhbHVlIGZyb20gYW4gZXZlbnRcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0VmFsdWVGcm9tRXZ0XyhldnQpIHtcbiAgICBjb25zdCBwYWdlWCA9IHRoaXMuZ2V0UGFnZVhfKGV2dCk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZUZyb21QYWdlWF8ocGFnZVgpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIHBhZ2VYIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlWFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb21wdXRlVmFsdWVGcm9tUGFnZVhfKHBhZ2VYKSB7XG4gICAgY29uc3Qge21heF86IG1heCwgbWluXzogbWlufSA9IHRoaXM7XG4gICAgY29uc3QgeFBvcyA9IHBhZ2VYIC0gdGhpcy5yZWN0Xy5sZWZ0O1xuICAgIGxldCBwY3RDb21wbGV0ZSA9IHhQb3MgLyB0aGlzLnJlY3RfLndpZHRoO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzUlRMKCkpIHtcbiAgICAgIHBjdENvbXBsZXRlID0gMSAtIHBjdENvbXBsZXRlO1xuICAgIH1cbiAgICAvLyBGaXQgdGhlIHBlcmNlbnRhZ2UgY29tcGxldGUgYmV0d2VlbiB0aGUgcmFuZ2UgW21pbixtYXhdXG4gICAgLy8gYnkgcmVtYXBwaW5nIGZyb20gWzAsIDFdIHRvIFttaW4sIG1pbisobWF4LW1pbildLlxuICAgIHJldHVybiBtaW4gKyBwY3RDb21wbGV0ZSAqIChtYXggLSBtaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5ZG93biBldmVudHNcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bl8oZXZ0KSB7XG4gICAgY29uc3Qga2V5SWQgPSB0aGlzLmdldEtleUlkXyhldnQpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZvcktleUlkXyhrZXlJZCk7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgcGFnZSBmcm9tIHNjcm9sbGluZyBkdWUgdG8ga2V5IHByZXNzZXMgdGhhdCB3b3VsZCBub3JtYWxseSBzY3JvbGwgdGhlIHBhZ2VcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICAgIHRoaXMuc2V0VmFsdWVfKHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXB1dGVkIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBrYmRFdnRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0S2V5SWRfKGtiZEV2dCkge1xuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX0xFRlQgfHwga2JkRXZ0LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICByZXR1cm4gS0VZX0lEUy5BUlJPV19MRUZUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19SSUdIVCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1JJR0hUO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX1VQO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5BUlJPV19ET1dOIHx8IGtiZEV2dC5rZXlDb2RlID09PSA0MCkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuQVJST1dfRE9XTjtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuSE9NRSB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzYpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkhPTUU7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkVORCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzUpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkVORDtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuUEFHRV9VUCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzMpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfVVA7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLlBBR0VfRE9XTiB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzQpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLlBBR0VfRE9XTjtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHZhbHVlIGdpdmVuIGEga2V5Ym9hcmQga2V5IElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlJZFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRWYWx1ZUZvcktleUlkXyhrZXlJZCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgc3RlcF86IHN0ZXB9ID0gdGhpcztcbiAgICBsZXQgZGVsdGEgPSBzdGVwIHx8IChtYXggLSBtaW4pIC8gMTAwO1xuICAgIGNvbnN0IHZhbHVlTmVlZHNUb0JlRmxpcHBlZCA9IHRoaXMuYWRhcHRlcl8uaXNSVEwoKSAmJiAoXG4gICAgICBrZXlJZCA9PT0gS0VZX0lEUy5BUlJPV19MRUZUIHx8IGtleUlkID09PSBLRVlfSURTLkFSUk9XX1JJR0hUXG4gICAgKTtcbiAgICBpZiAodmFsdWVOZWVkc1RvQmVGbGlwcGVkKSB7XG4gICAgICBkZWx0YSA9IC1kZWx0YTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleUlkKSB7XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0xFRlQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YTtcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfUklHSFQ6XG4gICAgY2FzZSBLRVlfSURTLkFSUk9XX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGE7XG4gICAgY2FzZSBLRVlfSURTLkhPTUU6XG4gICAgICByZXR1cm4gdGhpcy5taW5fO1xuICAgIGNhc2UgS0VZX0lEUy5FTkQ6XG4gICAgICByZXR1cm4gdGhpcy5tYXhfO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX1VQOlxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfICsgZGVsdGEgKiBudW1iZXJzLlBBR0VfRkFDVE9SO1xuICAgIGNhc2UgS0VZX0lEUy5QQUdFX0RPV046XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gLSBkZWx0YSAqIG51bWJlcnMuUEFHRV9GQUNUT1I7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNfKCkge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1N0YXRlXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgaGFuZGxlQmx1cl8oKSB7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNTdGF0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRk9DVVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmlyZUlucHV0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlXG4gICAqL1xuICBzZXRWYWx1ZV8odmFsdWUsIHNob3VsZEZpcmVJbnB1dCwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy52YWx1ZV8gJiYgIWZvcmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge21pbl86IG1pbiwgbWF4XzogbWF4fSA9IHRoaXM7XG4gICAgY29uc3QgdmFsdWVTZXRUb0JvdW5kYXJ5ID0gdmFsdWUgPT09IG1pbiB8fCB2YWx1ZSA9PT0gbWF4O1xuICAgIGlmICh0aGlzLnN0ZXBfICYmICF2YWx1ZVNldFRvQm91bmRhcnkpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5xdWFudGl6ZV8odmFsdWUpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgIHZhbHVlID0gbWluO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIHZhbHVlID0gbWF4O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU5PVywgU3RyaW5nKHRoaXMudmFsdWVfKSk7XG4gICAgdGhpcy51cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8oKTtcblxuICAgIGlmIChzaG91bGRGaXJlSW5wdXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SW5wdXQoKTtcbiAgICAgIGlmICh0aGlzLmlzRGlzY3JldGVfKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0TWFya2VyVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBxdWFudGl6ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHF1YW50aXplXyh2YWx1ZSkge1xuICAgIGNvbnN0IG51bVN0ZXBzID0gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuc3RlcF8pO1xuICAgIGNvbnN0IHF1YW50aXplZFZhbCA9IG51bVN0ZXBzICogdGhpcy5zdGVwXztcbiAgICByZXR1cm4gcXVhbnRpemVkVmFsO1xuICB9XG5cbiAgdXBkYXRlVUlGb3JDdXJyZW50VmFsdWVfKCkge1xuICAgIGNvbnN0IHttYXhfOiBtYXgsIG1pbl86IG1pbiwgdmFsdWVfOiB2YWx1ZX0gPSB0aGlzO1xuICAgIGNvbnN0IHBjdENvbXBsZXRlID0gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICAgIGxldCB0cmFuc2xhdGVQeCA9IHBjdENvbXBsZXRlICogdGhpcy5yZWN0Xy53aWR0aDtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1JUTCgpKSB7XG4gICAgICB0cmFuc2xhdGVQeCA9IHRoaXMucmVjdF8ud2lkdGggLSB0cmFuc2xhdGVQeDtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9wID0gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3csICd0cmFuc2Zvcm0nKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uZW5kRXZ0TmFtZSA9IGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpO1xuXG4gICAgaWYgKHRoaXMuaW5UcmFuc2l0Xykge1xuICAgICAgY29uc3Qgb25UcmFuc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEluVHJhbnNpdF8oZmFsc2UpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0cmFuc2l0aW9uZW5kRXZ0TmFtZSwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIodHJhbnNpdGlvbmVuZEV2dE5hbWUsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSUZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBJdCB3b3VsZCBiZSBuaWNlIHRvIHVzZSBjYWxjKCkgaGVyZSxcbiAgICAgIC8vIGJ1dCBJRSBjYW5ub3QgaGFuZGxlIGNhbGNzIGluIHRyYW5zZm9ybXMgY29ycmVjdGx5LlxuICAgICAgLy8gU2VlOiBodHRwczovL2dvby5nbC9OQzJpdGtcbiAgICAgIC8vIEFsc28gbm90ZSB0aGF0IHRoZSAtNTAlIG9mZnNldCBpcyB1c2VkIHRvIGNlbnRlciB0aGUgc2xpZGVyIHRodW1iLlxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVQeH1weCkgdHJhbnNsYXRlWCgtNTAlKWApO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFja1N0eWxlUHJvcGVydHkodHJhbnNmb3JtUHJvcCwgYHNjYWxlWCgke3BjdENvbXBsZXRlfSlgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIHNsaWRlclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxuICAgKi9cbiAgc2V0QWN0aXZlXyhhY3RpdmUpIHtcbiAgICB0aGlzLmFjdGl2ZV8gPSBhY3RpdmU7XG4gICAgdGhpcy50b2dnbGVDbGFzc18oY3NzQ2xhc3Nlcy5BQ1RJVkUsIHRoaXMuYWN0aXZlXyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgaW5UcmFuc2l0IHN0YXRlIG9mIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpblRyYW5zaXRcbiAgICovXG4gIHNldEluVHJhbnNpdF8oaW5UcmFuc2l0KSB7XG4gICAgdGhpcy5pblRyYW5zaXRfID0gaW5UcmFuc2l0O1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NfKGNzc0NsYXNzZXMuSU5fVFJBTlNJVCwgdGhpcy5pblRyYW5zaXRfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIGJhc2VkIG9uIHNob3VsZEJlUHJlc2VudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkQmVQcmVzZW50XG4gICAqL1xuICB0b2dnbGVDbGFzc18oY2xhc3NOYW1lLCBzaG91bGRCZVByZXNlbnQpIHtcbiAgICBpZiAoc2hvdWxkQmVQcmVzZW50KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU2xpZGVyRm91bmRhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJcIiA6Y2xhc3M9XCJjbGFzc2VzXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cInNsaWRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFja1wiIDpzdHlsZT1cInRyYWNrU3R5bGVzXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2stbWFya2VyLWNvbnRhaW5lclwiIHYtaWY9XCJoYXNNYXJrZXJzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1tYXJrZXJcIiBcbiAgICAgICAgICB2LWZvcj1cIm1hcmtlck51bSBpbiBudW1NYXJrZXJzXCJcbiAgICAgICAgICA6a2V5PVwibWFya2VyTnVtXCJcbiAgICAgICAgICA6c3R5bGU9XCIobWFya2VyTnVtID09IG51bU1hcmtlcnMpID8gbGFzdFRyYWNrTWFya2Vyc1N0eWxlcyA6IHt9XCJcbiAgICAgICAgICA+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHJlZj1cInRodW1iQ29udGFpbmVyXCIgOnN0eWxlPVwidGh1bWJTdHlsZXNcIiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RodW1iLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3BpblwiIHYtaWY9XCJpc0Rpc2NyZXRlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWRjLXNsaWRlcl9fcGluLXZhbHVlLW1hcmtlclwiPnt7bWFya2VyVmFsdWV9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHN2ZyBjbGFzcz1cIm1kYy1zbGlkZXJfX3RodW1iXCIgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjIxXCI+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxMC41XCIgY3k9XCIxMC41XCIgcj1cIjcuODc1XCI+PC9jaXJjbGU+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX19mb2N1cy1yaW5nXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENTbGlkZXJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9zbGlkZXIvZm91bmRhdGlvbidcbmltcG9ydCB7RGlzcGF0Y2hGb2N1c01peGlufSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtc2xpZGVyJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hGb2N1c01peGluXSxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAndmFsdWUnLFxuICAgIGV2ZW50OiAnY2hhbmdlJ1xuICB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgIG1pbjogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiAwIH0sXG4gICAgbWF4OiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDEwMCB9LFxuICAgIHN0ZXA6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMCB9LFxuICAgIGRpc3BsYXlNYXJrZXJzOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGxheW91dE9uOiBTdHJpbmcsXG4gICAgbGF5b3V0T25Tb3VyY2U6IHt0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZX0sXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtc2xpZGVyLS1kaXNjcmV0ZSc6ICEhdGhpcy5zdGVwLFxuICAgICAgICAnbWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzJzogdGhpcy5kaXNwbGF5TWFya2Vyc1xuICAgICAgfSxcbiAgICAgIHRyYWNrU3R5bGVzOiB7fSxcbiAgICAgIGxhc3RUcmFja01hcmtlcnNTdHlsZXM6IHt9LFxuICAgICAgdGh1bWJTdHlsZXM6IHt9LFxuICAgICAgbWFya2VyVmFsdWU6ICcnLFxuICAgICAgbnVtTWFya2VyczogMFxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpc0Rpc2NyZXRlICgpIHtcbiAgICAgIHJldHVybiAhIXRoaXMuc3RlcFxuICAgIH0sXG4gICAgaGFzTWFya2VycyAoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnN0ZXAgJiYgdGhpcy5kaXNwbGF5TWFya2VycyAmJiB0aGlzLm51bU1hcmtlcnNcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUgKCkge1xuICAgICAgaWYgKHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpICE9PSBOdW1iZXIodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBtaW4gKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1pbihOdW1iZXIodGhpcy5taW4pKVxuICAgIH0sXG4gICAgbWF4ICgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNYXgoTnVtYmVyKHRoaXMubWF4KSlcbiAgICB9LFxuICAgIHN0ZXAgKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFN0ZXAoTnVtYmVyKHRoaXMuc3RlcCkpXG4gICAgfSxcbiAgICBkaXNhYmxlZCAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBsYXlvdXQgKCkge1xuICAgICAgdGhpcy4kbmV4dFRpY2soICgpID0+IHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5sYXlvdXQoKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKHtcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmlidXRlOiAobmFtZSkgPT4gdGhpcy4kZWwuZ2V0QXR0cmlidXRlKG5hbWUpLFxuICAgICAgc2V0QXR0cmlidXRlOiAobmFtZSwgdmFsdWUpID0+IHRoaXMuJGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSksXG4gICAgICByZW1vdmVBdHRyaWJ1dGU6IChuYW1lKSA9PiB0aGlzLiRlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFRhYkluZGV4OiAoKSA9PiB0aGlzLiRlbC50YWJJbmRleCxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMudGh1bWJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy50aHVtYkNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSlcbiAgICAgIH0sXG4gICAgICBub3RpZnlDaGFuZ2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkpXG4gICAgICB9LFxuICAgICAgc2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5OiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy50aHVtYlN0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXRUcmFja1N0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnRyYWNrU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldE1hcmtlclZhbHVlOiAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZXJWYWx1ZSA9IHZhbHVlXG4gICAgICB9LFxuICAgICAgYXBwZW5kVHJhY2tNYXJrZXJzOiAobnVtTWFya2VycykgPT4ge1xuICAgICAgICB0aGlzLm51bU1hcmtlcnMgPSBudW1NYXJrZXJzXG4gICAgICB9LFxuICAgICAgcmVtb3ZlVHJhY2tNYXJrZXJzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMubnVtTWFya2VycyA9IDBcbiAgICAgIH0sXG4gICAgICBzZXRMYXN0VHJhY2tNYXJrZXJzU3R5bGVQcm9wZXJ0eTogKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMubGFzdFRyYWNrTWFya2Vyc1N0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBpc1JUTDogKCkgPT4gZmFsc2VcbiAgICB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKVxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWF4KE51bWJlcih0aGlzLm1heCkpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFN0ZXAoTnVtYmVyKHRoaXMuc3RlcCkpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKE51bWJlcih0aGlzLnZhbHVlKSlcbiAgICBpZiAodGhpcy5oYXNNYXJrZXJzKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuJHJvb3QuJG9uKCdtZGM6bGF5b3V0JywgdGhpcy5sYXlvdXQpXG5cbiAgICBpZiAodGhpcy5sYXlvdXRPbikge1xuICAgICAgbGV0IHNvdXJjZSA9IHRoaXMubGF5b3V0T25Tb3VyY2UgfHwgdGhpcy4kcm9vdFxuICAgICAgc291cmNlLiRvbih0aGlzLmxheW91dE9uLCB0aGlzLmxheW91dClcbiAgICB9XG4gICAgXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjU2xpZGVyIGZyb20gJy4vbWRjLXNsaWRlci52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY1NsaWRlclxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjU2xpZGVyXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJEaXNwYXRjaEZvY3VzTWl4aW4iLCJoYXNGb2N1cyIsIl9hY3RpdmUiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJzZXRUaW1lb3V0IiwiJGVsIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29udGFpbnMiLCIkZW1pdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIm9uTW91c2VEb3duIiwib25Nb3VzZVVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNzc0NsYXNzZXMiLCJzdHJpbmdzIiwibnVtYmVycyIsIk1EQ1NsaWRlckFkYXB0ZXIiLCJjbGFzc05hbWUiLCJ2YWx1ZSIsInR5cGUiLCJoYW5kbGVyIiwicHJvcGVydHlOYW1lIiwibnVtTWFya2VycyIsImV2ZW50VHlwZU1hcCIsImNzc1Byb3BlcnR5TWFwIiwiaGFzUHJvcGVyU2hhcGUiLCJ3aW5kb3dPYmoiLCJ1bmRlZmluZWQiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsImVsIiwic3R5bGVQcm9wZXJ0eSIsInN0eWxlIiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJnZXRBbmltYXRpb25OYW1lIiwiZXZlbnROYW1lIiwiZ2V0Q29ycmVjdEV2ZW50TmFtZSIsImdldENvcnJlY3RQcm9wZXJ0eU5hbWUiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiS0VZX0lEUyIsIk1PVkVfRVZFTlRfTUFQIiwiRE9XTl9FVkVOVFMiLCJVUF9FVkVOVFMiLCJNRENTbGlkZXJGb3VuZGF0aW9uIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwid2lkdGgiLCJoZWlnaHQiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwicmVjdF8iLCJzYXZlZFRhYkluZGV4XyIsIk5hTiIsImFjdGl2ZV8iLCJpblRyYW5zaXRfIiwiaXNEaXNjcmV0ZV8iLCJoYXNUcmFja01hcmtlcl8iLCJoYW5kbGluZ1RodW1iVGFyZ2V0RXZ0XyIsIm1pbl8iLCJtYXhfIiwic3RlcF8iLCJ2YWx1ZV8iLCJkaXNhYmxlZF8iLCJwcmV2ZW50Rm9jdXNTdGF0ZV8iLCJ1cGRhdGVVSUZyYW1lXyIsInRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfIiwiaW50ZXJhY3Rpb25TdGFydEhhbmRsZXJfIiwiZXZ0IiwiaGFuZGxlRG93bl8iLCJrZXlkb3duSGFuZGxlcl8iLCJoYW5kbGVLZXlkb3duXyIsImZvY3VzSGFuZGxlcl8iLCJoYW5kbGVGb2N1c18iLCJibHVySGFuZGxlcl8iLCJoYW5kbGVCbHVyXyIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwiaGFzQ2xhc3MiLCJJU19ESVNDUkVURSIsIkhBU19UUkFDS19NQVJLRVIiLCJmb3JFYWNoIiwiZXZ0TmFtZSIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImdldFN0ZXAiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJtaW4iLCJnZXRNaW4iLCJtYXgiLCJnZXRNYXgiLCJzdGVwIiwiaW5kaXZpc2libGUiLCJNYXRoIiwiY2VpbCIsInJlbW92ZVRyYWNrTWFya2VycyIsImFwcGVuZFRyYWNrTWFya2VycyIsImxhc3RTdGVwUmF0aW8iLCJmbGV4Iiwic2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHkiLCJTdHJpbmciLCJjb21wdXRlQm91bmRpbmdSZWN0IiwidXBkYXRlVUlGb3JDdXJyZW50VmFsdWVfIiwic2V0VmFsdWVfIiwiRXJyb3IiLCJzZXRBdHRyaWJ1dGUiLCJBUklBX1ZBTFVFTUFYIiwic2V0dXBUcmFja01hcmtlciIsIkFSSUFfVkFMVUVNSU4iLCJkaXNhYmxlZCIsInRvZ2dsZUNsYXNzXyIsIkRJU0FCTEVEIiwiZ2V0VGFiSW5kZXgiLCJBUklBX0RJU0FCTEVEIiwicmVtb3ZlQXR0cmlidXRlIiwiaXNOYU4iLCJzZXRJblRyYW5zaXRfIiwic2V0QWN0aXZlXyIsIm1vdmVIYW5kbGVyIiwiaGFuZGxlTW92ZV8iLCJ1cEhhbmRsZXIiLCJoYW5kbGVVcF8iLCJkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlciIsInNldFZhbHVlRnJvbUV2dF8iLCJwcmV2ZW50RGVmYXVsdCIsIm5vdGlmeUNoYW5nZSIsInRhcmdldFRvdWNoZXMiLCJsZW5ndGgiLCJwYWdlWCIsImdldFBhZ2VYXyIsImNvbXB1dGVWYWx1ZUZyb21QYWdlWF8iLCJ4UG9zIiwicGN0Q29tcGxldGUiLCJpc1JUTCIsImtleUlkIiwiZ2V0S2V5SWRfIiwiZ2V0VmFsdWVGb3JLZXlJZF8iLCJhZGRDbGFzcyIsIkZPQ1VTIiwia2JkRXZ0IiwiQVJST1dfTEVGVCIsImtleUNvZGUiLCJBUlJPV19SSUdIVCIsIkFSUk9XX1VQIiwiQVJST1dfRE9XTiIsIkhPTUUiLCJFTkQiLCJQQUdFX1VQIiwiUEFHRV9ET1dOIiwiZGVsdGEiLCJ2YWx1ZU5lZWRzVG9CZUZsaXBwZWQiLCJQQUdFX0ZBQ1RPUiIsInJlbW92ZUNsYXNzIiwic2hvdWxkRmlyZUlucHV0IiwiZm9yY2UiLCJ2YWx1ZVNldFRvQm91bmRhcnkiLCJxdWFudGl6ZV8iLCJBUklBX1ZBTFVFTk9XIiwibm90aWZ5SW5wdXQiLCJzZXRNYXJrZXJWYWx1ZSIsIm51bVN0ZXBzIiwicm91bmQiLCJxdWFudGl6ZWRWYWwiLCJ0cmFuc2xhdGVQeCIsInRyYW5zZm9ybVByb3AiLCJ0cmFuc2l0aW9uZW5kRXZ0TmFtZSIsIm9uVHJhbnNpdGlvbkVuZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eSIsInNldFRyYWNrU3R5bGVQcm9wZXJ0eSIsImFjdGl2ZSIsIkFDVElWRSIsImluVHJhbnNpdCIsIklOX1RSQU5TSVQiLCJzaG91bGRCZVByZXNlbnQiLCJyZW5kZXIiLCJOdW1iZXIiLCJkZWZhdWx0IiwiQm9vbGVhbiIsIk9iamVjdCIsInJlcXVpcmVkIiwiZGlzcGxheU1hcmtlcnMiLCJmb3VuZGF0aW9uIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsInNldE1pbiIsInNldE1heCIsInNldFN0ZXAiLCJzZXREaXNhYmxlZCIsIiRuZXh0VGljayIsImNsYXNzTGlzdCIsIiRzZXQiLCJjbGFzc2VzIiwiJGRlbGV0ZSIsImdldEF0dHJpYnV0ZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRhYkluZGV4IiwiJHJlZnMiLCJ0aHVtYkNvbnRhaW5lciIsImJvZHkiLCJ0aHVtYlN0eWxlcyIsInRyYWNrU3R5bGVzIiwibWFya2VyVmFsdWUiLCJsYXN0VHJhY2tNYXJrZXJzU3R5bGVzIiwiaW5pdCIsImhhc01hcmtlcnMiLCIkcm9vdCIsIiRvbiIsImxheW91dE9uIiwic291cmNlIiwibGF5b3V0T25Tb3VyY2UiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7O01BRTVCQyxPQUFPLElBQVg7TUFDSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO1dBQzFCQSxPQUFPQyxHQUFkO0dBREYsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7O1dBRWpDQSxPQUFPRCxHQUFkOztNQUVFRixJQUFKLEVBQVU7U0FDSEksR0FBTCxDQUFTTCxNQUFUOzs7O0FDVkcsU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7U0FDL0I7YUFDSSxRQURKO2FBRUksaUJBQUNDLEVBQUQsRUFBUTtXQUNWLElBQUlDLEdBQVQsSUFBZ0JGLFVBQWhCLEVBQTRCO1lBQ3RCRyxZQUFZSCxXQUFXRSxH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
