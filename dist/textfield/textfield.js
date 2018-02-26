/**
* @module vue-mdc-adaptertextfield 0.11.2
* @exports VueMDCTextfield
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCTextfield = factory());
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

var CustomElement = {
  functional: true,
  render: function render(createElement, context) {
    return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
  }
};

var CustomElementMixin = {
  components: {
    CustomElement: CustomElement
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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

function extractIconProp(iconProp) {
  if (typeof iconProp === 'string') {
    return {
      classes: { 'material-icons': true },
      content: iconProp
    };
  } else if (iconProp instanceof Array) {
    return {
      classes: iconProp.reduce(function (result, value) {
        return _extends(result, defineProperty({}, value, true));
      }, {})
    };
  } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
    return {
      classes: iconProp.className.split(' ').reduce(function (result, value) {
        return _extends(result, defineProperty({}, value, true));
      }, {}),
      content: iconProp.textContent
    };
  }
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
 * Copyright 2018 Google Inc. All Rights Reserved.
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
 * Adapter for MDC TextField Line Ripple.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the line ripple into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCLineRippleAdapter = function () {
  function MDCLineRippleAdapter() {
    classCallCheck(this, MDCLineRippleAdapter);
  }

  createClass(MDCLineRippleAdapter, [{
    key: "addClass",

    /**
     * Adds a class to the line ripple element.
     * @param {string} className
     */
    value: function addClass(className) {}

    /**
     * Removes a class from the line ripple element.
     * @param {string} className
     */

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

    /**
     * Sets an attribute with a given value on the line ripple element.
     * @param {string} attr
     * @param {string} value
     */

  }, {
    key: "setAttr",
    value: function setAttr(attr, value) {}

    /**
     * Registers an event listener on the line ripple element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerEventHandler",
    value: function registerEventHandler(evtType, handler) {}

    /**
     * Deregisters an event listener on the line ripple element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterEventHandler",
    value: function deregisterEventHandler(evtType, handler) {}
  }]);
  return MDCLineRippleAdapter;
}();

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};

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

/**
 * @extends {MDCFoundation<!MDCLineRippleAdapter>}
 * @final
 */

var MDCLineRippleFoundation = function (_MDCFoundation) {
  inherits(MDCLineRippleFoundation, _MDCFoundation);
  createClass(MDCLineRippleFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get$$1() {
      return cssClasses;
    }

    /**
     * {@see MDCLineRippleAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCLineRippleAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCLineRippleAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setAttr: function setAttr() {},
          registerEventHandler: function registerEventHandler() {},
          deregisterEventHandler: function deregisterEventHandler() {}
        }
      );
    }

    /**
     * @param {!MDCLineRippleAdapter=} adapter
     */

  }]);

  function MDCLineRippleFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
    classCallCheck(this, MDCLineRippleFoundation);

    /** @private {function(!Event): undefined} */
    var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };
    return _this;
  }

  createClass(MDCLineRippleFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
    }

    /**
     * Activates the line ripple
     */

  }, {
    key: 'activate',
    value: function activate() {
      this.adapter_.removeClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
      this.adapter_.addClass(cssClasses.LINE_RIPPLE_ACTIVE);
    }

    /**
     * Sets the center of the ripple animation to the given X coordinate.
     * @param {!number} xCoordinate
     */

  }, {
    key: 'setRippleCenter',
    value: function setRippleCenter(xCoordinate) {
      var attributeString = 'transform-origin: ' + xCoordinate + 'px center';

      this.adapter_.setAttr('style', attributeString);
    }

    /**
     * Deactivates the line ripple
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.adapter_.addClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
    }

    /**
     * Handles a transition end event
     * @param {!Event} evt
     */

  }, {
    key: 'handleTransitionEnd',
    value: function handleTransitionEnd(evt) {
      // Wait for the line ripple to be either transparent or opaque
      // before emitting the animation end event
      var isDeactivating = this.adapter_.hasClass(cssClasses.LINE_RIPPLE_DEACTIVATING);

      if (evt.propertyName === 'opacity') {
        if (isDeactivating) {
          this.adapter_.removeClass(cssClasses.LINE_RIPPLE_ACTIVE);
          this.adapter_.removeClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
        }
      }
    }
  }]);
  return MDCLineRippleFoundation;
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
 * Adapter for MDC Text Field Helper Text.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField helper text into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldHelperTextAdapter = function () {
  function MDCTextFieldHelperTextAdapter() {
    classCallCheck(this, MDCTextFieldHelperTextAdapter);
  }

  createClass(MDCTextFieldHelperTextAdapter, [{
    key: "addClass",

    /**
     * Adds a class to the helper text element.
     * @param {string} className
     */
    value: function addClass(className) {}

    /**
     * Removes a class from the helper text element.
     * @param {string} className
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /**
     * Returns whether or not the helper text element contains the given class.
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: "hasClass",
    value: function hasClass(className) {}

    /**
     * Sets an attribute with a given value on the helper text element.
     * @param {string} attr
     * @param {string} value
     */

  }, {
    key: "setAttr",
    value: function setAttr(attr, value) {}

    /**
     * Removes an attribute from the helper text element.
     * @param {string} attr
     */

  }, {
    key: "removeAttr",
    value: function removeAttr(attr) {}

    /**
     * Sets the text content for the helper text element.
     * @param {string} content
     */

  }, {
    key: "setContent",
    value: function setContent(content) {}
  }]);
  return MDCTextFieldHelperTextAdapter;
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
var strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};

/** @enum {string} */
var cssClasses$1 = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
};

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

/**
 * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
 * @final
 */

var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
  inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
  createClass(MDCTextFieldHelperTextFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get$$1() {
      return cssClasses$1;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get$$1() {
      return strings;
    }

    /**
     * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldHelperTextAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCTextFieldHelperTextAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setAttr: function setAttr() {},
          removeAttr: function removeAttr() {},
          setContent: function setContent() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldHelperTextAdapter} adapter
     */

  }]);

  function MDCTextFieldHelperTextFoundation(adapter) {
    classCallCheck(this, MDCTextFieldHelperTextFoundation);
    return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
  }

  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */


  createClass(MDCTextFieldHelperTextFoundation, [{
    key: 'setContent',
    value: function setContent(content) {
      this.adapter_.setContent(content);
    }

    /** @param {boolean} isPersistent Sets the persistency of the helper text. */

  }, {
    key: 'setPersistent',
    value: function setPersistent(isPersistent) {
      if (isPersistent) {
        this.adapter_.addClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      } else {
        this.adapter_.removeClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      }
    }

    /**
     * @param {boolean} isValidation True to make the helper text act as an
     *   error validation message.
     */

  }, {
    key: 'setValidation',
    value: function setValidation(isValidation) {
      if (isValidation) {
        this.adapter_.addClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      } else {
        this.adapter_.removeClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      }
    }

    /** Makes the helper text visible to the screen reader. */

  }, {
    key: 'showToScreenReader',
    value: function showToScreenReader() {
      this.adapter_.removeAttr(strings.ARIA_HIDDEN);
    }

    /**
     * Sets the validity of the helper text based on the input validity.
     * @param {boolean} inputIsValid
     */

  }, {
    key: 'setValidity',
    value: function setValidity(inputIsValid) {
      var helperTextIsPersistent = this.adapter_.hasClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

      if (validationMsgNeedsDisplay) {
        this.adapter_.setAttr(strings.ROLE, 'alert');
      } else {
        this.adapter_.removeAttr(strings.ROLE);
      }

      if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
        this.hide_();
      }
    }

    /**
     * Hides the help text from screen readers.
     * @private
     */

  }, {
    key: 'hide_',
    value: function hide_() {
      this.adapter_.setAttr(strings.ARIA_HIDDEN, 'true');
    }
  }]);
  return MDCTextFieldHelperTextFoundation;
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
 * Adapter for MDC Text Field Icon.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the text field icon into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldIconAdapter = function () {
  function MDCTextFieldIconAdapter() {
    classCallCheck(this, MDCTextFieldIconAdapter);
  }

  createClass(MDCTextFieldIconAdapter, [{
    key: "setAttr",

    /**
     * Sets an attribute on the icon element.
     * @param {string} attr
     * @param {string} value
     */
    value: function setAttr(attr, value) {}

    /**
     * Registers an event listener on the icon element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(evtType, handler) {}

    /**
     * Deregisters an event listener on the icon element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(evtType, handler) {}

    /**
     * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
     */

  }, {
    key: "notifyIconAction",
    value: function notifyIconAction() {}
  }]);
  return MDCTextFieldIconAdapter;
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
var strings$1 = {
  ICON_EVENT: 'MDCTextField:icon'
};

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

/**
 * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
 * @final
 */

var MDCTextFieldIconFoundation = function (_MDCFoundation) {
  inherits(MDCTextFieldIconFoundation, _MDCFoundation);
  createClass(MDCTextFieldIconFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get$$1() {
      return strings$1;
    }

    /**
     * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldIconAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCTextFieldIconAdapter} */{
          setAttr: function setAttr() {},
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          notifyIconAction: function notifyIconAction() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldIconAdapter} adapter
     */

  }]);

  function MDCTextFieldIconFoundation(adapter) {
    classCallCheck(this, MDCTextFieldIconFoundation);

    /** @private {function(!Event): undefined} */
    var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };
    return _this;
  }

  createClass(MDCTextFieldIconFoundation, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      ['click', 'keydown'].forEach(function (evtType) {
        _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      ['click', 'keydown'].forEach(function (evtType) {
        _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
      });
    }

    /**
     * Sets the content of the helper text field.
     * @param {boolean} disabled
     */

  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      if (disabled) {
        this.adapter_.setAttr('tabindex', '-1');
      } else {
        this.adapter_.setAttr('tabindex', '0');
      }
    }

    /**
     * Handles an interaction event
     * @param {!Event} evt
     */

  }, {
    key: 'handleInteraction',
    value: function handleInteraction(evt) {
      if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
        this.adapter_.notifyIconAction();
      }
    }
  }]);
  return MDCTextFieldIconFoundation;
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
 * Adapter for MDC Text Field Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldLabelAdapter = function () {
  function MDCTextFieldLabelAdapter() {
    classCallCheck(this, MDCTextFieldLabelAdapter);
  }

  createClass(MDCTextFieldLabelAdapter, [{
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

    /**
     * Returns the width of the label element.
     * @return {number}
     */

  }, {
    key: "getWidth",
    value: function getWidth() {}
  }]);
  return MDCTextFieldLabelAdapter;
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
var cssClasses$2 = {
  LABEL_FLOAT_ABOVE: 'mdc-text-field__label--float-above',
  LABEL_SHAKE: 'mdc-text-field__label--shake'
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
 * @extends {MDCFoundation<!MDCTextFieldLabelAdapter>}
 * @final
 */

var MDCTextFieldLabelFoundation = function (_MDCFoundation) {
  inherits(MDCTextFieldLabelFoundation, _MDCFoundation);
  createClass(MDCTextFieldLabelFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get$$1() {
      return cssClasses$2;
    }

    /**
     * {@see MDCTextFieldLabelAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldLabelAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCTextFieldLabelAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          getWidth: function getWidth() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldLabelAdapter} adapter
     */

  }]);

  function MDCTextFieldLabelFoundation(adapter) {
    classCallCheck(this, MDCTextFieldLabelFoundation);
    return possibleConstructorReturn(this, (MDCTextFieldLabelFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldLabelFoundation)).call(this, _extends(MDCTextFieldLabelFoundation.defaultAdapter, adapter)));
  }

  /**
   * Returns the width of the label element.
   * @return {number}
   */


  createClass(MDCTextFieldLabelFoundation, [{
    key: 'getWidth',
    value: function getWidth() {
      return this.adapter_.getWidth();
    }

    /**
     * Styles the label to produce the label shake for errors.
     * @param {boolean} isValid Whether the input's value is valid (passes all
     *     validity checks).
     * @param {boolean} isFocused Whether the input is focused.
     */

  }, {
    key: 'styleShake',
    value: function styleShake(isValid, isFocused) {
      var LABEL_SHAKE = MDCTextFieldLabelFoundation.cssClasses.LABEL_SHAKE;

      if (isValid || isFocused) {
        this.adapter_.removeClass(LABEL_SHAKE);
      } else {
        this.adapter_.addClass(LABEL_SHAKE);
      }
    }

    /**
     * Styles the label to float or defloat as necessary.
     * @param {string} value The value of the input.
     * @param {boolean} isFocused Whether the input is focused.
     * @param {boolean} isBadInput The input's `validity.badInput` value.
     */

  }, {
    key: 'styleFloat',
    value: function styleFloat(value, isFocused, isBadInput) {
      var _MDCTextFieldLabelFou = MDCTextFieldLabelFoundation.cssClasses,
          LABEL_FLOAT_ABOVE = _MDCTextFieldLabelFou.LABEL_FLOAT_ABOVE,
          LABEL_SHAKE = _MDCTextFieldLabelFou.LABEL_SHAKE;

      if (!!value || isFocused) {
        this.adapter_.addClass(LABEL_FLOAT_ABOVE);
      } else if (!isBadInput) {
        this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
        this.adapter_.removeClass(LABEL_SHAKE);
      }
    }
  }]);
  return MDCTextFieldLabelFoundation;
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
 * Adapter for MDC Text Field Outline.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field outline into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldOutlineAdapter = function () {
  function MDCTextFieldOutlineAdapter() {
    classCallCheck(this, MDCTextFieldOutlineAdapter);
  }

  createClass(MDCTextFieldOutlineAdapter, [{
    key: "getWidth",

    /**
     * Returns the width of the root element.
     * @return {number}
     */
    value: function getWidth() {}

    /**
     * Returns the height of the root element.
     * @return {number}
     */

  }, {
    key: "getHeight",
    value: function getHeight() {}

    /**
     * Sets the "d" attribute of the outline element's SVG path.
     * @param {string} value
     */

  }, {
    key: "setOutlinePathAttr",
    value: function setOutlinePathAttr(value) {}

    /**
     * Returns the idle outline element's computed style value of the given css property `propertyName`.
     * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
     * @param {string} propertyName
     * @return {string}
     */

  }, {
    key: "getIdleOutlineStyleValue",
    value: function getIdleOutlineStyleValue(propertyName) {}
  }]);
  return MDCTextFieldOutlineAdapter;
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
var strings$2 = {
  PATH_SELECTOR: '.mdc-text-field__outline-path',
  IDLE_OUTLINE_SELECTOR: '.mdc-text-field__idle-outline'
};

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

/**
 * @extends {MDCFoundation<!MDCTextFieldOutlineAdapter>}
 * @final
 */

var MDCTextFieldOutlineFoundation = function (_MDCFoundation) {
  inherits(MDCTextFieldOutlineFoundation, _MDCFoundation);
  createClass(MDCTextFieldOutlineFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get$$1() {
      return strings$2;
    }

    /**
     * {@see MDCTextFieldOutlineAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldOutlineAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCTextFieldOutlineAdapter} */{
          getWidth: function getWidth() {},
          getHeight: function getHeight() {},
          setOutlinePathAttr: function setOutlinePathAttr() {},
          getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldOutlineAdapter} adapter
     */

  }]);

  function MDCTextFieldOutlineFoundation(adapter) {
    classCallCheck(this, MDCTextFieldOutlineFoundation);
    return possibleConstructorReturn(this, (MDCTextFieldOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldOutlineFoundation)).call(this, _extends(MDCTextFieldOutlineFoundation.defaultAdapter, adapter)));
  }

  /**
   * Updates the SVG path of the focus outline element based on the given width of the
   * label element and the RTL context.
   * @param {number} labelWidth
   * @param {boolean=} isRtl
   */


  createClass(MDCTextFieldOutlineFoundation, [{
    key: 'updateSvgPath',
    value: function updateSvgPath(labelWidth) {
      var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
      var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
      var radius = parseFloat(radiusStyleValue);
      var width = this.adapter_.getWidth();
      var height = this.adapter_.getHeight();
      var cornerWidth = radius + 1.2;
      var leadingStrokeLength = Math.abs(11 - cornerWidth);
      var paddedLabelWidth = labelWidth + 8;

      // The right, bottom, and left sides of the outline follow the same SVG path.
      var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

      var path = void 0;
      if (!isRtl) {
        path = 'M' + (cornerWidth + leadingStrokeLength + paddedLabelWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedLabelWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
      } else {
        path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedLabelWidth - leadingStrokeLength);
      }

      this.adapter_.setOutlinePathAttr(path);
    }
  }]);
  return MDCTextFieldOutlineFoundation;
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

/* eslint-disable no-unused-vars */
/**
 * Adapter for MDC Text Field.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTextFieldAdapter = function () {
  function MDCTextFieldAdapter() {
    classCallCheck(this, MDCTextFieldAdapter);
  }

  createClass(MDCTextFieldAdapter, [{
    key: 'addClass',

    /**
     * Adds a class to the root Element.
     * @param {string} className
     */
    value: function addClass(className) {}

    /**
     * Removes a class from the root Element.
     * @param {string} className
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {}

    /**
     * Returns true if the root element contains the given class name.
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: 'hasClass',
    value: function hasClass(className) {}

    /**
     * Registers an event handler on the root element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'registerTextFieldInteractionHandler',
    value: function registerTextFieldInteractionHandler(type, handler) {}

    /**
     * Deregisters an event handler on the root element for a given event.
     * @param {string} type
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'deregisterTextFieldInteractionHandler',
    value: function deregisterTextFieldInteractionHandler(type, handler) {}

    /**
     * Registers an event listener on the native input element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'registerInputInteractionHandler',
    value: function registerInputInteractionHandler(evtType, handler) {}

    /**
     * Deregisters an event listener on the native input element for a given event.
     * @param {string} evtType
     * @param {function(!Event): undefined} handler
     */

  }, {
    key: 'deregisterInputInteractionHandler',
    value: function deregisterInputInteractionHandler(evtType, handler) {}

    /**
     * Returns an object representing the native text input element, with a
     * similar API shape. The object returned should include the value, disabled
     * and badInput properties, as well as the checkValidity() function. We never
     * alter the value within our code, however we do update the disabled
     * property, so if you choose to duck-type the return value for this method
     * in your implementation it's important to keep this in mind. Also note that
     * this method can return null, which the foundation will handle gracefully.
     * @return {?Element|?NativeInputType}
     */

  }, {
    key: 'getNativeInput',
    value: function getNativeInput() {}

    /**
     * Returns true if the textfield is focused.
     * We achieve this via `document.activeElement === this.root_`.
     * @return {boolean}
     */

  }, {
    key: 'isFocused',
    value: function isFocused() {}

    /**
     * Returns true if the direction of the root element is set to RTL.
     * @return {boolean}
     */

  }, {
    key: 'isRtl',
    value: function isRtl() {}

    /**
     * Activates the line ripple.
     */

  }, {
    key: 'activateLineRipple',
    value: function activateLineRipple() {}

    /**
     * Deactivates the line ripple.
     */

  }, {
    key: 'deactivateLineRipple',
    value: function deactivateLineRipple() {}

    /**
     * Sets the transform origin of the line ripple.
     * @param {number} normalizedX
     */

  }, {
    key: 'setLineRippleTransformOrigin',
    value: function setLineRippleTransformOrigin(normalizedX) {}
  }]);
  return MDCTextFieldAdapter;
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
var strings$3 = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-text-field__label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  OUTLINE_SELECTOR: '.mdc-text-field__outline',
  BOTTOM_LINE_SELECTOR: '.mdc-line-ripple'
};

/** @enum {string} */
var cssClasses$3 = {
  ROOT: 'mdc-text-field',
  UPGRADED: 'mdc-text-field--upgraded',
  DISABLED: 'mdc-text-field--disabled',
  DENSE: 'mdc-text-field--dense',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  BOX: 'mdc-text-field--box',
  OUTLINED: 'mdc-text-field--outlined'
};

/** @enum {number} */
var numbers = {
  LABEL_SCALE: 0.75,
  DENSE_LABEL_SCALE: 0.923
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

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */

var MDCTextFieldFoundation = function (_MDCFoundation) {
  inherits(MDCTextFieldFoundation, _MDCFoundation);
  createClass(MDCTextFieldFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get$$1() {
      return cssClasses$3;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get$$1() {
      return strings$3;
    }

    /** @return enum {string} */

  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers;
    }

    /**
     * {@see MDCTextFieldAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get$$1() {
      return (/** @type {!MDCTextFieldAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
          registerInputInteractionHandler: function registerInputInteractionHandler() {},
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
          getNativeInput: function getNativeInput() {},
          isFocused: function isFocused() {},
          isRtl: function isRtl() {},
          activateLineRipple: function activateLineRipple() {},
          deactivateLineRipple: function deactivateLineRipple() {},
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldAdapter} adapter
     * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
     */

  }]);

  function MDCTextFieldFoundation(adapter) {
    var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
    classCallCheck(this, MDCTextFieldFoundation);

    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
    var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

    _this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */
    _this.icon_ = foundationMap.icon;
    /** @type {!MDCTextFieldLabelFoundation|undefined} */
    _this.label_ = foundationMap.label;
    /** @type {!MDCTextFieldOutlineFoundation|undefined} */
    _this.outline_ = foundationMap.outline;

    /** @private {boolean} */
    _this.isFocused_ = false;
    /** @private {boolean} */
    _this.receivedUserInput_ = false;
    /** @private {boolean} */
    _this.useCustomValidityChecking_ = false;
    /** @private {boolean} */
    _this.isValid_ = true;
    /** @private {function(): undefined} */
    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputInputHandler_ = function () {
      return _this.autoCompleteFocus();
    };
    /** @private {function(!Event): undefined} */
    _this.setPointerXOffset_ = function (evt) {
      return _this.setTransformOrigin(evt);
    };
    /** @private {function(!Event): undefined} */
    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };
    return _this;
  }

  createClass(MDCTextFieldFoundation, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
      // Ensure label does not collide with any pre-filled value.
      if (this.label_ && this.getValue()) {
        this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
      }

      if (this.adapter_.isFocused()) {
        this.inputFocusHandler_();
      }

      this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
      this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
      this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
      ['mousedown', 'touchstart'].forEach(function (evtType) {
        _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
      });
      ['click', 'keydown'].forEach(function (evtType) {
        _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
      this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
      this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
      this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
      ['mousedown', 'touchstart'].forEach(function (evtType) {
        _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
      });
      ['click', 'keydown'].forEach(function (evtType) {
        _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
      });
    }

    /**
     * Handles user interactions with the Text Field.
     */

  }, {
    key: 'handleTextFieldInteraction',
    value: function handleTextFieldInteraction() {
      if (this.adapter_.getNativeInput().disabled) {
        return;
      }
      this.receivedUserInput_ = true;
    }

    /**
     * Updates the focus outline for outlined text fields.
     */

  }, {
    key: 'updateOutline',
    value: function updateOutline() {
      if (!this.outline_ || !this.label_) {
        return;
      }

      var isDense = this.adapter_.hasClass(cssClasses$3.DENSE);
      var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
      var labelWidth = this.label_.getWidth() * labelScale;
      var isRtl = this.adapter_.isRtl();
      this.outline_.updateSvgPath(labelWidth, isRtl);
    }

    /**
     * Activates the text field focus state.
     */

  }, {
    key: 'activateFocus',
    value: function activateFocus() {
      this.isFocused_ = true;
      this.styleFocused_(this.isFocused_);
      this.adapter_.activateLineRipple();
      if (this.outline_) {
        this.updateOutline();
      }
      if (this.label_) {
        this.label_.styleShake(this.isValid(), this.isFocused_);
        this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
      }
      if (this.helperText_) {
        this.helperText_.showToScreenReader();
      }
    }

    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     * @param {!Event} evt
     */

  }, {
    key: 'setTransformOrigin',
    value: function setTransformOrigin(evt) {
      var targetClientRect = evt.target.getBoundingClientRect();
      var evtCoords = { x: evt.clientX, y: evt.clientY };
      var normalizedX = evtCoords.x - targetClientRect.left;
      this.adapter_.setLineRippleTransformOrigin(normalizedX);
    }

    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programatically).
     */

  }, {
    key: 'autoCompleteFocus',
    value: function autoCompleteFocus() {
      if (!this.receivedUserInput_) {
        this.activateFocus();
      }
    }

    /**
     * Deactivates the Text Field's focus state.
     */

  }, {
    key: 'deactivateFocus',
    value: function deactivateFocus() {
      this.isFocused_ = false;
      this.adapter_.deactivateLineRipple();
      var input = this.getNativeInput_();
      var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
      var isValid = this.isValid();
      this.styleValidity_(isValid);
      this.styleFocused_(this.isFocused_);
      if (this.label_) {
        this.label_.styleShake(this.isValid(), this.isFocused_);
        this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
      }
      if (shouldRemoveLabelFloat) {
        this.receivedUserInput_ = false;
      }
    }

    /**
     * @return {string} The value of the input Element.
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.getNativeInput_().value;
    }

    /**
     * @param {string} value The value to set on the input Element.
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.getNativeInput_().value = value;
      var isValid = this.isValid();
      this.styleValidity_(isValid);
      if (this.label_) {
        this.label_.styleShake(isValid, this.isFocused_);
        this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
      }
    }

    /**
     * @return {boolean} If a custom validity is set, returns that value.
     *     Otherwise, returns the result of native validity checks.
     */

  }, {
    key: 'isValid',
    value: function isValid() {
      return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
    }

    /**
     * @param {boolean} isValid Sets the validity state of the Text Field.
     */

  }, {
    key: 'setValid',
    value: function setValid(isValid) {
      this.useCustomValidityChecking_ = true;
      this.isValid_ = isValid;
      // Retrieve from the getter to ensure correct logic is applied.
      isValid = this.isValid();
      this.styleValidity_(isValid);
      if (this.label_) {
        this.label_.styleShake(isValid, this.isFocused_);
      }
    }

    /**
     * @return {boolean} True if the Text Field is disabled.
     */

  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.getNativeInput_().disabled;
    }

    /**
     * @param {boolean} disabled Sets the text-field disabled or enabled.
     */

  }, {
    key: 'setDisabled',
    value: function setDisabled(disabled) {
      this.getNativeInput_().disabled = disabled;
      this.styleDisabled_(disabled);
    }

    /**
     * @return {boolean} True if the Text Field is required.
     */

  }, {
    key: 'isRequired',
    value: function isRequired() {
      return this.getNativeInput_().required;
    }

    /**
     * @param {boolean} isRequired Sets the text-field required or not.
     */

  }, {
    key: 'setRequired',
    value: function setRequired(isRequired) {
      this.getNativeInput_().required = isRequired;
      // Addition of the asterisk is automatic based on CSS, but validity checking
      // needs to be manually run.
      this.styleValidity_(this.isValid());
    }

    /**
     * @param {string} content Sets the content of the helper text.
     */

  }, {
    key: 'setHelperTextContent',
    value: function setHelperTextContent(content) {
      if (this.helperText_) {
        this.helperText_.setContent(content);
      }
    }

    /**
     * @return {boolean} True if the Text Field input fails in converting the
     *     user-supplied value.
     * @private
     */

  }, {
    key: 'isBadInput_',
    value: function isBadInput_() {
      return this.getNativeInput_().validity.badInput;
    }

    /**
     * @return {boolean} The result of native validity checking
     *     (ValidityState.valid).
     */

  }, {
    key: 'isNativeInputValid_',
    value: function isNativeInputValid_() {
      return this.getNativeInput_().validity.valid;
    }

    /**
     * Styles the component based on the validity state.
     * @param {boolean} isValid
     * @private
     */

  }, {
    key: 'styleValidity_',
    value: function styleValidity_(isValid) {
      var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

      if (isValid) {
        this.adapter_.removeClass(INVALID);
      } else {
        this.adapter_.addClass(INVALID);
      }
      if (this.helperText_) {
        this.helperText_.setValidity(isValid);
      }
    }

    /**
     * Styles the component based on the focused state.
     * @param {boolean} isFocused
     * @private
     */

  }, {
    key: 'styleFocused_',
    value: function styleFocused_(isFocused) {
      var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

      if (isFocused) {
        this.adapter_.addClass(FOCUSED);
      } else {
        this.adapter_.removeClass(FOCUSED);
      }
    }

    /**
     * Styles the component based on the disabled state.
     * @param {boolean} isDisabled
     * @private
     */

  }, {
    key: 'styleDisabled_',
    value: function styleDisabled_(isDisabled) {
      var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
          DISABLED = _MDCTextFieldFoundati.DISABLED,
          INVALID = _MDCTextFieldFoundati.INVALID;

      if (isDisabled) {
        this.adapter_.addClass(DISABLED);
        this.adapter_.removeClass(INVALID);
      } else {
        this.adapter_.removeClass(DISABLED);
      }
      if (this.icon_) {
        this.icon_.setDisabled(isDisabled);
      }
    }

    /**
     * @return {!Element|!NativeInputType} The native text input from the
     * host environment, or a dummy if none exists.
     * @private
     */

  }, {
    key: 'getNativeInput_',
    value: function getNativeInput_() {
      return this.adapter_.getNativeInput() ||
      /** @type {!NativeInputType} */{
        value: '',
        disabled: false,
        validity: {
          badInput: false,
          valid: true
        }
      };
    }
  }]);
  return MDCTextFieldFoundation;
}(MDCFoundation);

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

var cssClasses$4 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings$4 = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers$1 = {
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
      return cssClasses$4;
    }
  }, {
    key: 'strings',
    get: function get$$1() {
      return strings$4;
    }
  }, {
    key: 'numbers',
    get: function get$$1() {
      return numbers$1;
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
        }, numbers$1.FG_DEACTIVATION_MS);
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

var mdcTextField = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-textfield-wrapper", style: { width: _vm.fullwidth ? '100%' : undefined } }, [_c('div', { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasLeadingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls, "rows": _vm.rows, "cols": _vm.cols }, on: { "input": function input($event) {
          _vm.updateValue($event.target.value);
        } } }, 'textarea', _vm.inputAttrs, false), _vm.$listeners)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "type": _vm.type, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls }, on: { "input": function input($event) {
          _vm.updateValue($event.target.value);
        } } }, 'input', _vm.inputAttrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c('label', { ref: "label", class: _vm.labelClassesUpgraded, attrs: { "for": _vm._uid } }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasTrailingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outline", staticClass: "mdc-text-field__outline" }, [_c('svg', [_c('path', { staticClass: "mdc-text-field__outline-path", attrs: { "d": _vm.outlinePathAttr } })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outlineIdle", staticClass: "mdc-text-field__idle-outline" }) : _vm._e(), _vm._v(" "), _vm.hasBottomLine ? _c('div', { ref: "bottom", class: _vm.bottomClasses }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c('p', { ref: "help", class: _vm.helpClasses, attrs: { "id": 'help-' + _vm._uid, "aria-hidden": "true" } }, [_vm._v(" " + _vm._s(_vm.helptext) + " ")]) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'mdc-textfield',
  mixins: [CustomElementMixin, DispatchFocusMixin],
  model: {
    prop: 'value',
    event: 'model'
  },
  props: {
    value: String,
    type: {
      type: String,
      default: 'text',
      validator: function validator(value) {
        return ['text', 'email', 'search', 'password', 'tel', 'url'].indexOf(value) !== -1;
      }
    },
    dense: Boolean,
    label: String,
    helptext: String,
    helptextPersistent: Boolean,
    helptextValidation: Boolean,
    box: Boolean,
    outline: Boolean,
    disabled: Boolean,
    required: Boolean,
    valid: { type: Boolean, default: undefined },
    fullwidth: Boolean,
    multiline: Boolean,
    leadingIcon: [String, Array, Object],
    trailingIcon: [String, Array, Object],
    size: { type: [Number, String], default: 20 },
    minlength: { type: [Number, String], default: undefined },
    maxlength: { type: [Number, String], default: undefined },
    rows: { type: [Number, String], default: 8 },
    cols: { type: [Number, String], default: 40 },

    // other input props  
    name: String,
    readonly: Boolean,
    autocomplete: Boolean,
    autofocus: Boolean
  },
  data: function data() {
    return {
      text: this.value,
      rootClasses: {
        'mdc-textfield': true,
        'mdc-text-field': true,
        'mdc-text-field--upgraded': true,
        'mdc-text-field--disabled': this.disabled,
        'mdc-text-field--dense': this.dense,
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--textarea': this.multiline,
        'mdc-text-field--box': !this.fullwidth && this.box,
        'mdc-text-field--outlined': !this.fullwidth && this.outline
      },
      inputClasses: {
        'mdc-text-field__input': true
      },
      labelClasses: {
        'mdc-text-field__label': true
      },
      bottomClasses: {
        'mdc-line-ripple': true
      },
      helpClasses: {
        'mdc-text-field-helper-text': true,
        'mdc-text-field-helper-text--persistent': this.helptextPersistent,
        'mdc-text-field-helper-text--validation-msg': this.helptextValidation
      },
      outlinePathAttr: undefined
    };
  },
  watch: {
    disabled: function disabled() {
      this.foundation && this.foundation.setDisabled(this.disabled);
    },
    required: function required() {
      this.foundation && this.foundation.setRequired(this.disabled);
    },
    valid: function valid() {
      if (typeof this.valid !== "undefined") {
        this.foundation && this.foundation.setValid(this.valid);
      }
    },
    dense: function dense() {
      this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
    },
    helptextPersistent: function helptextPersistent() {
      this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
    },
    helptextValidation: function helptextValidation() {
      this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
    },
    value: function value(_value) {
      if (this.foundation) {
        if (_value !== this.foundation.getValue()) {
          this.foundation.setValue(_value);
        }
      }
    }
  },
  methods: {
    updateValue: function updateValue(value) {
      this.$emit('model', value);
    },
    focus: function focus() {
      this.$refs.input && this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input && this.$refs.input.blur();
    }
  },
  computed: {
    inputAttrs: function inputAttrs() {
      var name = this.name,
          readonly = this.readonly,
          autocomplete = this.autocomplete,
          autofocus = this.autofocus;

      return { name: name, readonly: readonly, autocomplete: autocomplete, autofocus: autofocus };
    },
    inputPlaceHolder: function inputPlaceHolder() {
      return this.fullwidth ? this.label : undefined;
    },
    inputAriaControls: function inputAriaControls() {
      return this.help ? 'help-' + this._uid : undefined;
    },
    hasLabel: function hasLabel() {
      return !this.fullwidth && this.label;
    },
    hasOutline: function hasOutline() {
      return !this.fullwidth && this.outline;
    },
    hasBottomLine: function hasBottomLine() {
      return !this.hasOutline && !this.multiline;
    },
    hasLeadingIcon: function hasLeadingIcon() {
      if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
        return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
      }
      return false;
    },
    hasTrailingIcon: function hasTrailingIcon() {
      if (this.trailingIcon || this.$slots['trailing-icon']) {
        return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
      }
      return false;
    },
    labelClassesUpgraded: function labelClassesUpgraded() {
      return _extends(this.labelClasses, {
        'mdc-text-field__label--float-above': this.value
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.$refs.bottom) {
      this.bottomLineFoundation = new MDCLineRippleFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.bottomClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.bottomClasses, className);
        },
        hasClass: function hasClass(className) {
          _this.bottomClasses.classList.contains(className);
        },
        setAttr: function setAttr(name, value) {
          _this.$refs.bottom.setAttribute(name, value);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          _this.$refs.bottom.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          _this.$refs.bottom.removeEventListener(evtType, handler);
        }
      });
      this.bottomLineFoundation.init();
    }

    if (this.$refs.help) {
      this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.helpClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.helpClasses, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.help.classList.contains(className);
        },
        setAttr: function setAttr(name, value) {
          _this.$refs.help.setAttribute(name, value);
        },
        removeAttr: function removeAttr(name) {
          _this.$refs.help.removeAttribute(name);
        },
        setContent: function setContent() /*content*/{
          // help text get's updated from {{helptext}}
          // this.$refs.help.textContent = content;
        }
      });
      this.helperTextFoundation.init();
    }

    if (this.$refs.icon) {
      if (this.hasLeadingIcon) {
        this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
      } else if (this.hasTrailingIcon) {
        this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
      }

      this.iconFoundation = new MDCTextFieldIconFoundation({
        setAttr: function setAttr(attr, value) {
          return _this.$refs.icon.setAttribute(attr, value);
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$refs.icon.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$refs.icon.removeEventListener(evtType, handler);
        },
        notifyIconAction: function notifyIconAction() {
          return _this.$emit('icon-action');
        }
      });
      this.iconFoundation.init();
    }

    if (this.$refs.label) {
      this.labelFoundation = new MDCTextFieldLabelFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.labelClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.labelClasses, className);
        },
        getWidth: function getWidth() {
          return _this.$refs.label.offsetWidth;
        }
      });
      this.labelFoundation.init();
    }

    if (this.$refs.outline) {
      this.outlineFoundation = new MDCTextFieldOutlineFoundation({
        getWidth: function getWidth() {
          return _this.$refs.outline.offsetWidth;
        },
        getHeight: function getHeight() {
          return _this.$refs.outline.offsetHeight;
        },
        setOutlinePathAttr: function setOutlinePathAttr(value) {
          _this.outlinePathAttr = value;
        },
        getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
          var idleOutlineElement = _this.$refs.outlineIdle;
          if (idleOutlineElement) {
            return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
          }
        }
      });
      this.outlineFoundation.init();
    }

    this.foundation = new MDCTextFieldFoundation({
      addClass: function addClass(className) {
        _this.$set(_this.rootClasses, className, true);
      },
      removeClass: function removeClass(className) {
        _this.$delete(_this.rootClasses, className);
      },
      hasClass: function hasClass(className) {
        _this.$refs.root.classList.contains(className);
      },
      registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
        _this.$refs.root.addEventListener(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
        _this.$refs.root.removeEventListener(evtType, handler);
      },
      isFocused: function isFocused() {
        return document.activeElement === _this.$refs.input;
      },
      isRtl: function isRtl() {
        return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
      },
      deactivateLineRipple: function deactivateLineRipple() {
        if (_this.bottom) {
          _this.bottom.deactivate();
        }
      },
      activateLineRipple: function activateLineRipple() {
        if (_this.bottom) {
          _this.bottom.activate();
        }
      },
      setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
        if (_this.bottom) {
          _this.bottom.setRippleCenter(normalizedX);
        }
      },
      registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
        _this.$refs.input.addEventListener(evtType, handler);
      },
      deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
        _this.$refs.input.removeEventListener(evtType, handler);
      },
      getNativeInput: function getNativeInput() {
        return _this.$refs.input;
      }

    }, {
      bottomLine: this.bottomLineFoundation,
      helperText: this.helperTextFoundation,
      icon: this.iconFoundation,
      label: this.labelFoundation,
      outline: this.outlineFoundation
    });

    this.foundation.init();
    this.foundation.setValue(this.value);
    this.foundation.setDisabled(this.disabled);
    this.foundation.setRequired(this.required);
    if (typeof this.valid !== "undefined") {
      this.foundation.setValid(this.valid);
    }

    if (this.textbox) {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.foundation && this.foundation.destroy();
    this.bottomLineFoundation && this.bottomLineFoundation.destroy();
    this.helperTextFoundation && this.helperTextFoundation.destroy();
    this.iconFoundation && this.iconFoundation.destroy();
    this.labelFoundation && this.labelFoundation.destroy();
    this.outlineFoundation && this.outlineFoundation.destroy();
    this.ripple && this.ripple.destroy();
  }
};

var plugin = BasePlugin({
  mdcTextField: mdcTextField
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20taWNvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2xhYmVsL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2xhYmVsL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9vdXRsaW5lL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9vdXRsaW5lL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL291dGxpbmUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvbWRjLXRleHRmaWVsZC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3RleHRmaWVsZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xuICBmdW5jdGlvbmFsOiB0cnVlLFxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsIFxuICAgICAgY29udGV4dC5kYXRhLFxuICAgICAgY29udGV4dC5jaGlsZHJlbilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tRWxlbWVudFxuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RJY29uUHJvcCAoaWNvblByb3ApIHtcbiAgICBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xhc3NlczogeyAnbWF0ZXJpYWwtaWNvbnMnIDogdHJ1ZX0sXG4gICAgICAgIGNvbnRlbnQ6IGljb25Qcm9wIFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpY29uUHJvcCBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIHJldHVybiB7IFxuICAgICAgICBjbGFzc2VzOiBpY29uUHJvcC5yZWR1Y2UoXG4gICAgICAgICAgKHJlc3VsdCwgdmFsdWUpID0+IE9iamVjdC5hc3NpZ24ocmVzdWx0LHtbdmFsdWVdOnRydWV9KSxcbiAgICAgICAgICB7fSksXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnb2JqZWN0Jyl7XG4gICAgICByZXR1cm4geyBcbiAgICAgICAgY2xhc3NlczogaWNvblByb3AuY2xhc3NOYW1lLnNwbGl0KCcgJykucmVkdWNlKFxuICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCx7W3ZhbHVlXTp0cnVlfSksXG4gICAgICAgICAge30pLFxuICAgICAgICBjb250ZW50OiBpY29uUHJvcC50ZXh0Q29udGVudCBcbiAgICAgIH1cbiAgICB9XG4gIH1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiAge2hhc0ZvY3VzOiBmYWxzZX1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgb25Nb3VzZVVwICgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50ICgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9IHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dEZpZWxkIExpbmUgUmlwcGxlLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIGxpbmUgcmlwcGxlIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENMaW5lUmlwcGxlQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSB3aXRoIGEgZ2l2ZW4gdmFsdWUgb24gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cihhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGxpbmUgcmlwcGxlIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgTElORV9SSVBQTEVfQUNUSVZFOiAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnLFxuICBMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkc6ICdtZGMtbGluZS1yaXBwbGUtLWRlYWN0aXZhdGluZycsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0xpbmVSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENMaW5lUmlwcGxlQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTGluZVJpcHBsZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENMaW5lUmlwcGxlQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHNldEF0dHI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDTGluZVJpcHBsZUFkYXB0ZXI9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gLyoqIEB0eXBlIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9ICovICh7fSkpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZChldnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBsaW5lIHJpcHBsZVxuICAgKi9cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0FDVElWRSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSByaXBwbGUgYW5pbWF0aW9uIHRvIHRoZSBnaXZlbiBYIGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7IW51bWJlcn0geENvb3JkaW5hdGVcbiAgICovXG4gIHNldFJpcHBsZUNlbnRlcih4Q29vcmRpbmF0ZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVN0cmluZyA9XG4gICAgICAgIGB0cmFuc2Zvcm0tb3JpZ2luOiAke3hDb29yZGluYXRlfXB4IGNlbnRlcmA7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoJ3N0eWxlJywgYXR0cmlidXRlU3RyaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KSB7XG4gICAgLy8gV2FpdCBmb3IgdGhlIGxpbmUgcmlwcGxlIHRvIGJlIGVpdGhlciB0cmFuc3BhcmVudCBvciBvcGFxdWVcbiAgICAvLyBiZWZvcmUgZW1pdHRpbmcgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnRcbiAgICBjb25zdCBpc0RlYWN0aXZhdGluZyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuXG4gICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgaWYgKGlzRGVhY3RpdmF0aW5nKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTGluZVJpcHBsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQgSGVscGVyIFRleHQuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgVGV4dEZpZWxkIGhlbHBlciB0ZXh0IGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgaGVscGVyIHRleHQgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIHZhbHVlIG9uIHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICByZW1vdmVBdHRyKGF0dHIpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRleHQgY29udGVudCBmb3IgdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAqL1xuICBzZXRDb250ZW50KGNvbnRlbnQpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgQVJJQV9ISURERU46ICdhcmlhLWhpZGRlbicsXG4gIFJPTEU6ICdyb2xlJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgSEVMUEVSX1RFWFRfUEVSU0lTVEVOVDogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS1wZXJzaXN0ZW50JyxcbiAgSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0c6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tdmFsaWRhdGlvbi1tc2cnLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHNldEF0dHI6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQXR0cjogKCkgPT4ge30sXG4gICAgICBzZXRDb250ZW50OiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSBoZWxwZXIgdGV4dCBmaWVsZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovXG4gIHNldENvbnRlbnQoY29udGVudCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGlzUGVyc2lzdGVudCBTZXRzIHRoZSBwZXJzaXN0ZW5jeSBvZiB0aGUgaGVscGVyIHRleHQuICovXG4gIHNldFBlcnNpc3RlbnQoaXNQZXJzaXN0ZW50KSB7XG4gICAgaWYgKGlzUGVyc2lzdGVudCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZGF0aW9uIFRydWUgdG8gbWFrZSB0aGUgaGVscGVyIHRleHQgYWN0IGFzIGFuXG4gICAqICAgZXJyb3IgdmFsaWRhdGlvbiBtZXNzYWdlLlxuICAgKi9cbiAgc2V0VmFsaWRhdGlvbihpc1ZhbGlkYXRpb24pIHtcbiAgICBpZiAoaXNWYWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYWtlcyB0aGUgaGVscGVyIHRleHQgdmlzaWJsZSB0byB0aGUgc2NyZWVuIHJlYWRlci4gKi9cbiAgc2hvd1RvU2NyZWVuUmVhZGVyKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cihzdHJpbmdzLkFSSUFfSElEREVOKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWxpZGl0eSBvZiB0aGUgaGVscGVyIHRleHQgYmFzZWQgb24gdGhlIGlucHV0IHZhbGlkaXR5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlucHV0SXNWYWxpZFxuICAgKi9cbiAgc2V0VmFsaWRpdHkoaW5wdXRJc1ZhbGlkKSB7XG4gICAgY29uc3QgaGVscGVyVGV4dElzUGVyc2lzdGVudCA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICBjb25zdCBoZWxwZXJUZXh0SXNWYWxpZGF0aW9uTXNnID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5ID0gaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyAmJiAhaW5wdXRJc1ZhbGlkO1xuXG4gICAgaWYgKHZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihzdHJpbmdzLlJPTEUsICdhbGVydCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHIoc3RyaW5ncy5ST0xFKTtcbiAgICB9XG5cbiAgICBpZiAoIWhlbHBlclRleHRJc1BlcnNpc3RlbnQgJiYgIXZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkpIHtcbiAgICAgIHRoaXMuaGlkZV8oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGhlbHAgdGV4dCBmcm9tIHNjcmVlbiByZWFkZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGlkZV8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKHN0cmluZ3MuQVJJQV9ISURERU4sICd0cnVlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQgSWNvbi5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSB0ZXh0IGZpZWxkIGljb24gaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEljb25BZGFwdGVyIHtcbiAgLyoqXG4gICAqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cihhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBpY29uIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBcIk1EQ1RleHRGaWVsZDppY29uXCIgZGVub3RpbmcgYSB1c2VyIGhhcyBjbGlja2VkIHRoZSBpY29uLlxuICAgKi9cbiAgbm90aWZ5SWNvbkFjdGlvbigpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEljb25BZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgSUNPTl9FVkVOVDogJ01EQ1RleHRGaWVsZDppY29uJyxcbn07XG5cbmV4cG9ydCB7c3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7c3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRJY29uQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENUZXh0RmllbGRJY29uQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyfSAqLyAoe1xuICAgICAgc2V0QXR0cjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUljb25BY3Rpb246ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVJbnRlcmFjdGlvbihldnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIGhlbHBlciB0ZXh0IGZpZWxkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVJbnRlcmFjdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SWNvbkFjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dCBGaWVsZCBMYWJlbC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBUZXh0IEZpZWxkIGxhYmVsIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRMYWJlbEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZExhYmVsQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLXRleHQtZmllbGRfX2xhYmVsLS1mbG9hdC1hYm92ZScsXG4gIExBQkVMX1NIQUtFOiAnbWRjLXRleHQtZmllbGRfX2xhYmVsLS1zaGFrZScsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZExhYmVsQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkTGFiZWxBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRMYWJlbEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkTGFiZWxBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZExhYmVsQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZExhYmVsQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENUZXh0RmllbGRMYWJlbEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZExhYmVsRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5nZXRXaWR0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gcHJvZHVjZSB0aGUgbGFiZWwgc2hha2UgZm9yIGVycm9ycy5cbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkIFdoZXRoZXIgdGhlIGlucHV0J3MgdmFsdWUgaXMgdmFsaWQgKHBhc3NlcyBhbGxcbiAgICogICAgIHZhbGlkaXR5IGNoZWNrcykuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNGb2N1c2VkIFdoZXRoZXIgdGhlIGlucHV0IGlzIGZvY3VzZWQuXG4gICAqL1xuICBzdHlsZVNoYWtlKGlzVmFsaWQsIGlzRm9jdXNlZCkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENUZXh0RmllbGRMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNWYWxpZCB8fCBpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBmbG9hdCBvciBkZWZsb2F0IGFzIG5lY2Vzc2FyeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNGb2N1c2VkIFdoZXRoZXIgdGhlIGlucHV0IGlzIGZvY3VzZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNCYWRJbnB1dCBUaGUgaW5wdXQncyBgdmFsaWRpdHkuYmFkSW5wdXRgIHZhbHVlLlxuICAgKi9cbiAgc3R5bGVGbG9hdCh2YWx1ZSwgaXNGb2N1c2VkLCBpc0JhZElucHV0KSB7XG4gICAgY29uc3Qge0xBQkVMX0ZMT0FUX0FCT1ZFLCBMQUJFTF9TSEFLRX0gPSBNRENUZXh0RmllbGRMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoISF2YWx1ZSB8fCBpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgIH0gZWxzZSBpZiAoIWlzQmFkSW5wdXQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZExhYmVsRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dCBGaWVsZCBPdXRsaW5lLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHQgRmllbGQgb3V0bGluZSBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkT3V0bGluZUFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SGVpZ2h0KCkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgXCJkXCIgYXR0cmlidXRlIG9mIHRoZSBvdXRsaW5lIGVsZW1lbnQncyBTVkcgcGF0aC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRPdXRsaW5lUGF0aEF0dHIodmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkbGUgb3V0bGluZSBlbGVtZW50J3MgY29tcHV0ZWQgc3R5bGUgdmFsdWUgb2YgdGhlIGdpdmVuIGNzcyBwcm9wZXJ0eSBgcHJvcGVydHlOYW1lYC5cbiAgICogV2UgYWNoaWV2ZSB0aGlzIHZpYSBgZ2V0Q29tcHV0ZWRTdHlsZSguLi4pLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKWAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKHByb3BlcnR5TmFtZSkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkT3V0bGluZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBQQVRIX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19vdXRsaW5lLXBhdGgnLFxuICBJRExFX09VVExJTkVfU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2lkbGUtb3V0bGluZScsXG59O1xuXG5leHBvcnQge3N0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZE91dGxpbmVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge3N0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkT3V0bGluZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZE91dGxpbmVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RleHRGaWVsZE91dGxpbmVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZE91dGxpbmVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkT3V0bGluZUFkYXB0ZXJ9ICovICh7XG4gICAgICBnZXRXaWR0aDogKCkgPT4ge30sXG4gICAgICBnZXRIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiAoKSA9PiB7fSxcbiAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDVGV4dEZpZWxkT3V0bGluZUFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZE91dGxpbmVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgU1ZHIHBhdGggb2YgdGhlIGZvY3VzIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGUgZ2l2ZW4gd2lkdGggb2YgdGhlXG4gICAqIGxhYmVsIGVsZW1lbnQgYW5kIHRoZSBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxhYmVsV2lkdGhcbiAgICogQHBhcmFtIHtib29sZWFuPX0gaXNSdGxcbiAgICovXG4gIHVwZGF0ZVN2Z1BhdGgobGFiZWxXaWR0aCwgaXNSdGwgPSBmYWxzZSkge1xuICAgIC8vIEZhbGwgYmFjayB0byByZWFkaW5nIGEgc3BlY2lmaWMgY29ybmVyJ3Mgc3R5bGUgYmVjYXVzZSBGaXJlZm94IGRvZXNuJ3QgcmVwb3J0IHRoZSBzdHlsZSBvbiBib3JkZXItcmFkaXVzLlxuICAgIGNvbnN0IHJhZGl1c1N0eWxlVmFsdWUgPSB0aGlzLmFkYXB0ZXJfLmdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSgnYm9yZGVyLXJhZGl1cycpIHx8XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKCdib3JkZXItdG9wLWxlZnQtcmFkaXVzJyk7XG4gICAgY29uc3QgcmFkaXVzID0gcGFyc2VGbG9hdChyYWRpdXNTdHlsZVZhbHVlKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmFkYXB0ZXJfLmdldEhlaWdodCgpO1xuICAgIGNvbnN0IGNvcm5lcldpZHRoID0gcmFkaXVzICsgMS4yO1xuICAgIGNvbnN0IGxlYWRpbmdTdHJva2VMZW5ndGggPSBNYXRoLmFicygxMSAtIGNvcm5lcldpZHRoKTtcbiAgICBjb25zdCBwYWRkZWRMYWJlbFdpZHRoID0gbGFiZWxXaWR0aCArIDg7XG5cbiAgICAvLyBUaGUgcmlnaHQsIGJvdHRvbSwgYW5kIGxlZnQgc2lkZXMgb2YgdGhlIG91dGxpbmUgZm9sbG93IHRoZSBzYW1lIFNWRyBwYXRoLlxuICAgIGNvbnN0IHBhdGhNaWRkbGUgPSAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyByYWRpdXMgKyAnLCcgKyByYWRpdXNcbiAgICAgICsgJ3YnICsgKGhlaWdodCAtICgyICogY29ybmVyV2lkdGgpKVxuICAgICAgKyAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyAtcmFkaXVzICsgJywnICsgcmFkaXVzXG4gICAgICArICdoJyArICgtd2lkdGggKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgLXJhZGl1cyArICcsJyArIC1yYWRpdXNcbiAgICAgICsgJ3YnICsgKC1oZWlnaHQgKyAoMiAqIGNvcm5lcldpZHRoKSlcbiAgICAgICsgJ2EnICsgcmFkaXVzICsgJywnICsgcmFkaXVzICsgJyAwIDAgMSAnICsgcmFkaXVzICsgJywnICsgLXJhZGl1cztcblxuICAgIGxldCBwYXRoO1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHBhdGggPSAnTScgKyAoY29ybmVyV2lkdGggKyBsZWFkaW5nU3Ryb2tlTGVuZ3RoICsgcGFkZGVkTGFiZWxXaWR0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgKHdpZHRoIC0gKDIgKiBjb3JuZXJXaWR0aCkgLSBwYWRkZWRMYWJlbFdpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aClcbiAgICAgICAgKyBwYXRoTWlkZGxlXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9ICdNJyArICh3aWR0aCAtIGNvcm5lcldpZHRoIC0gbGVhZGluZ1N0cm9rZUxlbmd0aCkgKyAnLCcgKyAxXG4gICAgICAgICsgJ2gnICsgbGVhZGluZ1N0cm9rZUxlbmd0aFxuICAgICAgICArIHBhdGhNaWRkbGVcbiAgICAgICAgKyAnaCcgKyAod2lkdGggLSAoMiAqIGNvcm5lcldpZHRoKSAtIHBhZGRlZExhYmVsV2lkdGggLSBsZWFkaW5nU3Ryb2tlTGVuZ3RoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldE91dGxpbmVQYXRoQXR0cihwYXRoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRPdXRsaW5lRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBmcm9tICcuL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGZyb20gJy4vaWNvbi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRMYWJlbEZvdW5kYXRpb24gZnJvbSAnLi9sYWJlbC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICcuL291dGxpbmUvZm91bmRhdGlvbic7XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHZhbHVlOiBzdHJpbmcsXG4gKiAgIGRpc2FibGVkOiBib29sZWFuLFxuICogICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgdmFsaWRpdHk6IHtcbiAqICAgICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgICB2YWxpZDogYm9vbGVhbixcbiAqICAgfSxcbiAqIH19XG4gKi9cbmxldCBOYXRpdmVJbnB1dFR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgbGluZVJpcHBsZTogKCFNRENMaW5lUmlwcGxlRm91bmRhdGlvbnx1bmRlZmluZWQpLFxuICogICBoZWxwZXJUZXh0OiAoIU1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9ufHVuZGVmaW5lZCksXG4gKiAgIGljb246ICghTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb258dW5kZWZpbmVkKSxcbiAqICAgbGFiZWw6ICghTURDVGV4dEZpZWxkTGFiZWxGb3VuZGF0aW9ufHVuZGVmaW5lZCksXG4gKiAgIG91dGxpbmU6ICghTURDVGV4dEZpZWxkT3V0bGluZUZvdW5kYXRpb258dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEZvdW5kYXRpb25NYXBUeXBlO1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBUZXh0IEZpZWxkLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFRleHQgRmllbGQgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuYXRpdmUgdGV4dCBpbnB1dCBlbGVtZW50LCB3aXRoIGFcbiAgICogc2ltaWxhciBBUEkgc2hhcGUuIFRoZSBvYmplY3QgcmV0dXJuZWQgc2hvdWxkIGluY2x1ZGUgdGhlIHZhbHVlLCBkaXNhYmxlZFxuICAgKiBhbmQgYmFkSW5wdXQgcHJvcGVydGllcywgYXMgd2VsbCBhcyB0aGUgY2hlY2tWYWxpZGl0eSgpIGZ1bmN0aW9uLiBXZSBuZXZlclxuICAgKiBhbHRlciB0aGUgdmFsdWUgd2l0aGluIG91ciBjb2RlLCBob3dldmVyIHdlIGRvIHVwZGF0ZSB0aGUgZGlzYWJsZWRcbiAgICogcHJvcGVydHksIHNvIGlmIHlvdSBjaG9vc2UgdG8gZHVjay10eXBlIHRoZSByZXR1cm4gdmFsdWUgZm9yIHRoaXMgbWV0aG9kXG4gICAqIGluIHlvdXIgaW1wbGVtZW50YXRpb24gaXQncyBpbXBvcnRhbnQgdG8ga2VlcCB0aGlzIGluIG1pbmQuIEFsc28gbm90ZSB0aGF0XG4gICAqIHRoaXMgbWV0aG9kIGNhbiByZXR1cm4gbnVsbCwgd2hpY2ggdGhlIGZvdW5kYXRpb24gd2lsbCBoYW5kbGUgZ3JhY2VmdWxseS5cbiAgICogQHJldHVybiB7P0VsZW1lbnR8P05hdGl2ZUlucHV0VHlwZX1cbiAgICovXG4gIGdldE5hdGl2ZUlucHV0KCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0ZXh0ZmllbGQgaXMgZm9jdXNlZC5cbiAgICogV2UgYWNoaWV2ZSB0aGlzIHZpYSBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5yb290X2AuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0ZvY3VzZWQoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGRpcmVjdGlvbiBvZiB0aGUgcm9vdCBlbGVtZW50IGlzIHNldCB0byBSVEwuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc1J0bCgpIHt9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGUuXG4gICAqL1xuICBhY3RpdmF0ZUxpbmVSaXBwbGUoKSB7fVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGUuXG4gICAqL1xuICBkZWFjdGl2YXRlTGluZVJpcHBsZSgpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRyYW5zZm9ybSBvcmlnaW4gb2YgdGhlIGxpbmUgcmlwcGxlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm9ybWFsaXplZFhcbiAgICovXG4gIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4obm9ybWFsaXplZFgpIHt9XG59XG5cbmV4cG9ydCB7TURDVGV4dEZpZWxkQWRhcHRlciwgTmF0aXZlSW5wdXRUeXBlLCBGb3VuZGF0aW9uTWFwVHlwZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX0NPTlRST0xTOiAnYXJpYS1jb250cm9scycsXG4gIElOUFVUX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19pbnB1dCcsXG4gIExBQkVMX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19sYWJlbCcsXG4gIElDT05fU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2ljb24nLFxuICBPVVRMSU5FX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19vdXRsaW5lJyxcbiAgQk9UVE9NX0xJTkVfU0VMRUNUT1I6ICcubWRjLWxpbmUtcmlwcGxlJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy10ZXh0LWZpZWxkJyxcbiAgVVBHUkFERUQ6ICdtZGMtdGV4dC1maWVsZC0tdXBncmFkZWQnLFxuICBESVNBQkxFRDogJ21kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCcsXG4gIERFTlNFOiAnbWRjLXRleHQtZmllbGQtLWRlbnNlJyxcbiAgRk9DVVNFRDogJ21kYy10ZXh0LWZpZWxkLS1mb2N1c2VkJyxcbiAgSU5WQUxJRDogJ21kYy10ZXh0LWZpZWxkLS1pbnZhbGlkJyxcbiAgQk9YOiAnbWRjLXRleHQtZmllbGQtLWJveCcsXG4gIE9VVExJTkVEOiAnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJyxcbn07XG5cbi8qKiBAZW51bSB7bnVtYmVyfSAqL1xuY29uc3QgbnVtYmVycyA9IHtcbiAgTEFCRUxfU0NBTEU6IDAuNzUsXG4gIERFTlNFX0xBQkVMX1NDQUxFOiAwLjkyMyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge01EQ1RleHRGaWVsZEFkYXB0ZXIsIE5hdGl2ZUlucHV0VHlwZSwgRm91bmRhdGlvbk1hcFR5cGV9IGZyb20gJy4vYWRhcHRlcic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiBmcm9tICcuL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGZyb20gJy4vaWNvbi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRMYWJlbEZvdW5kYXRpb24gZnJvbSAnLi9sYWJlbC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICcuL291dGxpbmUvZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENUZXh0RmllbGRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENUZXh0RmllbGRBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IHt9LFxuICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIHNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW46ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICogQHBhcmFtIHshRm91bmRhdGlvbk1hcFR5cGU9fSBmb3VuZGF0aW9uTWFwIE1hcCBmcm9tIHN1YmNvbXBvbmVudCBuYW1lcyB0byB0aGVpciBzdWJmb3VuZGF0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIsIGZvdW5kYXRpb25NYXAgPSAvKiogQHR5cGUgeyFGb3VuZGF0aW9uTWFwVHlwZX0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaGVscGVyVGV4dF8gPSBmb3VuZGF0aW9uTWFwLmhlbHBlclRleHQ7XG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaWNvbl8gPSBmb3VuZGF0aW9uTWFwLmljb247XG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkTGFiZWxGb3VuZGF0aW9ufHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmxhYmVsXyA9IGZvdW5kYXRpb25NYXAubGFiZWw7XG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkT3V0bGluZUZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMub3V0bGluZV8gPSBmb3VuZGF0aW9uTWFwLm91dGxpbmU7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc1ZhbGlkXyA9IHRydWU7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5kZWFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyA9ICgpID0+IHRoaXMuYXV0b0NvbXBsZXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0XyA9IChldnQpID0+IHRoaXMuc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgLy8gRW5zdXJlIGxhYmVsIGRvZXMgbm90IGNvbGxpZGUgd2l0aCBhbnkgcHJlLWZpbGxlZCB2YWx1ZS5cbiAgICBpZiAodGhpcy5sYWJlbF8gJiYgdGhpcy5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmxhYmVsXy5zdHlsZUZsb2F0KFxuICAgICAgICB0aGlzLmdldFZhbHVlKCksIHRoaXMuaXNGb2N1c2VkXywgdGhpcy5pc0JhZElucHV0XygpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8oKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuaW5wdXRCbHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignaW5wdXQnLCB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyk7XG4gICAgWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgfSk7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgfSk7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB1c2VyIGludGVyYWN0aW9ucyB3aXRoIHRoZSBUZXh0IEZpZWxkLlxuICAgKi9cbiAgaGFuZGxlVGV4dEZpZWxkSW50ZXJhY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0TmF0aXZlSW5wdXQoKS5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZm9jdXMgb3V0bGluZSBmb3Igb3V0bGluZWQgdGV4dCBmaWVsZHMuXG4gICAqL1xuICB1cGRhdGVPdXRsaW5lKCkge1xuICAgIGlmICghdGhpcy5vdXRsaW5lXyB8fCAhdGhpcy5sYWJlbF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc0RlbnNlID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkRFTlNFKTtcbiAgICBjb25zdCBsYWJlbFNjYWxlID0gaXNEZW5zZSA/IG51bWJlcnMuREVOU0VfTEFCRUxfU0NBTEUgOiBudW1iZXJzLkxBQkVMX1NDQUxFO1xuICAgIGNvbnN0IGxhYmVsV2lkdGggPSB0aGlzLmxhYmVsXy5nZXRXaWR0aCgpICogbGFiZWxTY2FsZTtcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuYWRhcHRlcl8uaXNSdGwoKTtcbiAgICB0aGlzLm91dGxpbmVfLnVwZGF0ZVN2Z1BhdGgobGFiZWxXaWR0aCwgaXNSdGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgdGV4dCBmaWVsZCBmb2N1cyBzdGF0ZS5cbiAgICovXG4gIGFjdGl2YXRlRm9jdXMoKSB7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gdHJ1ZTtcbiAgICB0aGlzLnN0eWxlRm9jdXNlZF8odGhpcy5pc0ZvY3VzZWRfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgIGlmICh0aGlzLm91dGxpbmVfKSB7XG4gICAgICB0aGlzLnVwZGF0ZU91dGxpbmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubGFiZWxfKSB7XG4gICAgICB0aGlzLmxhYmVsXy5zdHlsZVNoYWtlKHRoaXMuaXNWYWxpZCgpLCB0aGlzLmlzRm9jdXNlZF8pO1xuICAgICAgdGhpcy5sYWJlbF8uc3R5bGVGbG9hdChcbiAgICAgICAgdGhpcy5nZXRWYWx1ZSgpLCB0aGlzLmlzRm9jdXNlZF8sIHRoaXMuaXNCYWRJbnB1dF8oKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICB0aGlzLmhlbHBlclRleHRfLnNob3dUb1NjcmVlblJlYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaW5lIHJpcHBsZSdzIHRyYW5zZm9ybSBvcmlnaW4sIHNvIHRoYXQgdGhlIGxpbmUgcmlwcGxlIGFjdGl2YXRlXG4gICAqIGFuaW1hdGlvbiB3aWxsIGFuaW1hdGUgb3V0IGZyb20gdGhlIHVzZXIncyBjbGljayBsb2NhdGlvbi5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCkge1xuICAgIGNvbnN0IHRhcmdldENsaWVudFJlY3QgPSBldnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGV2dENvb3JkcyA9IHt4OiBldnQuY2xpZW50WCwgeTogZXZ0LmNsaWVudFl9O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRYID0gZXZ0Q29vcmRzLnggLSB0YXJnZXRDbGllbnRSZWN0LmxlZnQ7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luKG5vcm1hbGl6ZWRYKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZSBpbiBjYXNlcyB3aGVuIHRoZSBpbnB1dCB2YWx1ZVxuICAgKiBjaGFuZ2VzIHdpdGhvdXQgdXNlciBpbnB1dCAoZS5nLiBwcm9ncmFtYXRpY2FsbHkpLlxuICAgKi9cbiAgYXV0b0NvbXBsZXRlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVkVXNlcklucHV0Xykge1xuICAgICAgdGhpcy5hY3RpdmF0ZUZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGVzIHRoZSBUZXh0IEZpZWxkJ3MgZm9jdXMgc3RhdGUuXG4gICAqL1xuICBkZWFjdGl2YXRlRm9jdXMoKSB7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5kZWFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXROYXRpdmVJbnB1dF8oKTtcbiAgICBjb25zdCBzaG91bGRSZW1vdmVMYWJlbEZsb2F0ID0gIWlucHV0LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXRfKCk7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgaWYgKHRoaXMubGFiZWxfKSB7XG4gICAgICB0aGlzLmxhYmVsXy5zdHlsZVNoYWtlKHRoaXMuaXNWYWxpZCgpLCB0aGlzLmlzRm9jdXNlZF8pO1xuICAgICAgdGhpcy5sYWJlbF8uc3R5bGVGbG9hdChcbiAgICAgICAgdGhpcy5nZXRWYWx1ZSgpLCB0aGlzLmlzRm9jdXNlZF8sIHRoaXMuaXNCYWRJbnB1dF8oKSk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSZW1vdmVMYWJlbEZsb2F0KSB7XG4gICAgICB0aGlzLnJlY2VpdmVkVXNlcklucHV0XyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgRWxlbWVudC5cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlID0gdmFsdWU7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgaWYgKHRoaXMubGFiZWxfKSB7XG4gICAgICB0aGlzLmxhYmVsXy5zdHlsZVNoYWtlKGlzVmFsaWQsIHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgICB0aGlzLmxhYmVsXy5zdHlsZUZsb2F0KFxuICAgICAgICB0aGlzLmdldFZhbHVlKCksIHRoaXMuaXNGb2N1c2VkXywgdGhpcy5pc0JhZElucHV0XygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSWYgYSBjdXN0b20gdmFsaWRpdHkgaXMgc2V0LCByZXR1cm5zIHRoYXQgdmFsdWUuXG4gICAqICAgICBPdGhlcndpc2UsIHJldHVybnMgdGhlIHJlc3VsdCBvZiBuYXRpdmUgdmFsaWRpdHkgY2hlY2tzLlxuICAgKi9cbiAgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VDdXN0b21WYWxpZGl0eUNoZWNraW5nX1xuICAgICAgPyB0aGlzLmlzVmFsaWRfIDogdGhpcy5pc05hdGl2ZUlucHV0VmFsaWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkIFNldHMgdGhlIHZhbGlkaXR5IHN0YXRlIG9mIHRoZSBUZXh0IEZpZWxkLlxuICAgKi9cbiAgc2V0VmFsaWQoaXNWYWxpZCkge1xuICAgIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18gPSB0cnVlO1xuICAgIHRoaXMuaXNWYWxpZF8gPSBpc1ZhbGlkO1xuICAgIC8vIFJldHJpZXZlIGZyb20gdGhlIGdldHRlciB0byBlbnN1cmUgY29ycmVjdCBsb2dpYyBpcyBhcHBsaWVkLlxuICAgIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQoKTtcbiAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgIGlmICh0aGlzLmxhYmVsXykge1xuICAgICAgdGhpcy5sYWJlbF8uc3R5bGVTaGFrZShpc1ZhbGlkLCB0aGlzLmlzRm9jdXNlZF8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBUZXh0IEZpZWxkIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgaXNEaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkIFNldHMgdGhlIHRleHQtZmllbGQgZGlzYWJsZWQgb3IgZW5hYmxlZC5cbiAgICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMuc3R5bGVEaXNhYmxlZF8oZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaXMgcmVxdWlyZWQuXG4gICAqL1xuICBpc1JlcXVpcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnJlcXVpcmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSZXF1aXJlZCBTZXRzIHRoZSB0ZXh0LWZpZWxkIHJlcXVpcmVkIG9yIG5vdC5cbiAgICovXG4gIHNldFJlcXVpcmVkKGlzUmVxdWlyZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnJlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgICAvLyBBZGRpdGlvbiBvZiB0aGUgYXN0ZXJpc2sgaXMgYXV0b21hdGljIGJhc2VkIG9uIENTUywgYnV0IHZhbGlkaXR5IGNoZWNraW5nXG4gICAgLy8gbmVlZHMgdG8gYmUgbWFudWFsbHkgcnVuLlxuICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8odGhpcy5pc1ZhbGlkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIGhlbHBlciB0ZXh0LlxuICAgKi9cbiAgc2V0SGVscGVyVGV4dENvbnRlbnQoY29udGVudCkge1xuICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICB0aGlzLmhlbHBlclRleHRfLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaW5wdXQgZmFpbHMgaW4gY29udmVydGluZyB0aGVcbiAgICogICAgIHVzZXItc3VwcGxpZWQgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0JhZElucHV0XygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS5iYWRJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUaGUgcmVzdWx0IG9mIG5hdGl2ZSB2YWxpZGl0eSBjaGVja2luZ1xuICAgKiAgICAgKFZhbGlkaXR5U3RhdGUudmFsaWQpLlxuICAgKi9cbiAgaXNOYXRpdmVJbnB1dFZhbGlkXygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS52YWxpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgdmFsaWRpdHkgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCkge1xuICAgIGNvbnN0IHtJTlZBTElEfSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhJTlZBTElEKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0VmFsaWRpdHkoaXNWYWxpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBmb2N1c2VkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRm9jdXNlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVGb2N1c2VkXyhpc0ZvY3VzZWQpIHtcbiAgICBjb25zdCB7Rk9DVVNFRH0gPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGT0NVU0VEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGT0NVU0VEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRpc2FibGVkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0eWxlRGlzYWJsZWRfKGlzRGlzYWJsZWQpIHtcbiAgICBjb25zdCB7RElTQUJMRUQsIElOVkFMSUR9ID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoSU5WQUxJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pY29uXykge1xuICAgICAgdGhpcy5pY29uXy5zZXREaXNhYmxlZChpc0Rpc2FibGVkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUVsZW1lbnR8IU5hdGl2ZUlucHV0VHlwZX0gVGhlIG5hdGl2ZSB0ZXh0IGlucHV0IGZyb20gdGhlXG4gICAqIGhvc3QgZW52aXJvbm1lbnQsIG9yIGEgZHVtbXkgaWYgbm9uZSBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXROYXRpdmVJbnB1dF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0TmF0aXZlSW5wdXQoKSB8fFxuICAgIC8qKiBAdHlwZSB7IU5hdGl2ZUlucHV0VHlwZX0gKi8gKHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHZhbGlkaXR5OiB7XG4gICAgICAgIGJhZElucHV0OiBmYWxzZSxcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0geyF7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG4gICAgICAoKSA9PiB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKVxuICAgICk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyF7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSB3cmFwcGVkIGluIGFuIHJBRiBjYWxsIGIvYyB3ZWIgYnJvd3NlcnNcbiAgICAgIC8vIHJlcG9ydCBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluXG4gICAgICAvLyBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBhcHBseVBhc3NpdmV9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcblxuICBzdGF0aWMgZ2V0IE1BVENIRVMgKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoIFJpcHBsZUJhc2UuX21hdGNoZXMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKSlcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUgKHJlZikge1xuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gIH1cblxuICBjb25zdHJ1Y3RvciAodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgIH0sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgIH0sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBhZGRDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKHRhcmdldCkgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXG4gICAgICB9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICB9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHt4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldH0pXG4gICAgICB9LFxuICAgIH0sIG9wdGlvbnMpKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgfVxufSAgIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtZGMtdGV4dGZpZWxkLXdyYXBwZXJcIiA6c3R5bGU9XCJ7d2lkdGg6ZnVsbHdpZHRoPycxMDAlJzp1bmRlZmluZWR9XCI+XHJcblxyXG4gICAgPGRpdiByZWY9XCJyb290XCIgOmNsYXNzPVwicm9vdENsYXNzZXNcIj5cclxuXHJcbiAgICAgIDxpIHJlZj1cImljb25cIiB2LWlmPVwiISFoYXNMZWFkaW5nSWNvblwiXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9faWNvblwiICBcclxuICAgICAgICA6Y2xhc3M9XCJoYXNMZWFkaW5nSWNvbi5jbGFzc2VzXCI+XHJcbiAgICAgICAgPHNsb3QgbmFtZT1cImxlYWRpbmctaWNvblwiPnt7IGhhc0xlYWRpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICAgIDwvaT5cclxuXHJcbiAgICAgIDx0ZXh0YXJlYSByZWY9XCJpbnB1dFwiIHYtaWY9XCJtdWx0aWxpbmVcIlxyXG4gICAgICAgIHYtb249XCIkbGlzdGVuZXJzXCJcclxuICAgICAgICB2LWJpbmQ9XCJpbnB1dEF0dHJzXCJcclxuICAgICAgICA6Y2xhc3M9XCJpbnB1dENsYXNzZXNcIlxyXG4gICAgICAgIEBpbnB1dD1cInVwZGF0ZVZhbHVlKCRldmVudC50YXJnZXQudmFsdWUpXCJcclxuICAgICAgICA6bWlubGVuZ3RoPVwibWlubGVuZ3RoXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXHJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwiaW5wdXRQbGFjZUhvbGRlclwiXHJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJpbnB1dFBsYWNlSG9sZGVyXCJcclxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCJcclxuICAgICAgICA6cm93cz1cInJvd3NcIiA6Y29scz1cImNvbHNcIiBcclxuICAgICAgICA+PC90ZXh0YXJlYT5cclxuXHJcbiAgICAgIDxpbnB1dCByZWY9XCJpbnB1dFwiIHYtZWxzZVxyXG4gICAgICAgIHYtb249XCIkbGlzdGVuZXJzXCIgXHJcbiAgICAgICAgdi1iaW5kPVwiaW5wdXRBdHRyc1wiXHJcbiAgICAgICAgOmNsYXNzPVwiaW5wdXRDbGFzc2VzXCJcclxuICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXHJcbiAgICAgICAgOnR5cGU9XCJ0eXBlXCJcclxuICAgICAgICA6bWlubGVuZ3RoPVwibWlubGVuZ3RoXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXHJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwiaW5wdXRQbGFjZUhvbGRlclwiXHJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJpbnB1dFBsYWNlSG9sZGVyXCJcclxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCIgXHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgIDxsYWJlbCByZWY9XCJsYWJlbFwiIDpjbGFzcz1cImxhYmVsQ2xhc3Nlc1VwZ3JhZGVkXCIgOmZvcj1cIl91aWRcIiAgdi1pZj1cImhhc0xhYmVsXCI+XHJcbiAgICAgICAge3sgbGFiZWwgfX1cclxuICAgICAgPC9sYWJlbD5cclxuXHJcbiAgICAgIDxpIHJlZj1cImljb25cIiB2LWlmPVwiISFoYXNUcmFpbGluZ0ljb25cIlxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiIFxyXG4gICAgICAgIGNsYXNzPVwibWRjLXRleHQtZmllbGRfX2ljb25cIiAgXHJcbiAgICAgICAgOmNsYXNzPVwiaGFzVHJhaWxpbmdJY29uLmNsYXNzZXNcIj5cclxuICAgICAgICA8c2xvdCBuYW1lPVwidHJhaWxpbmctaWNvblwiPnt7IGhhc1RyYWlsaW5nSWNvbi5jb250ZW50IH19PC9zbG90PlxyXG4gICAgICA8L2k+XHJcblxyXG4gICAgICA8ZGl2IHJlZj1cIm91dGxpbmVcIiBjbGFzcz1cIm1kYy10ZXh0LWZpZWxkX19vdXRsaW5lXCIgdi1pZj1cImhhc091dGxpbmVcIj5cclxuICAgICAgICA8c3ZnPlxyXG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9fb3V0bGluZS1wYXRoXCIgOmQ9XCJvdXRsaW5lUGF0aEF0dHJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiByZWY9XCJvdXRsaW5lSWRsZVwiIGNsYXNzPVwibWRjLXRleHQtZmllbGRfX2lkbGUtb3V0bGluZVwiIHYtaWY9XCJoYXNPdXRsaW5lXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgcmVmPVwiYm90dG9tXCIgOmNsYXNzPVwiYm90dG9tQ2xhc3Nlc1wiIHYtaWY9XCJoYXNCb3R0b21MaW5lXCI+PC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHAgcmVmPVwiaGVscFwiIDppZD1cIidoZWxwLScrX3VpZFwiIDpjbGFzcz1cImhlbHBDbGFzc2VzXCJcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdi1pZj1cImhlbHB0ZXh0XCI+XHJcbiAgICAgIHt7IGhlbHB0ZXh0ICB9fVxyXG4gICAgPC9wPlxyXG5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENUZXh0ZmllbGRGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvZm91bmRhdGlvbidcclxuaW1wb3J0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZS9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9pY29uL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkTGFiZWxGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvbGFiZWwvZm91bmRhdGlvbic7XHJcbmltcG9ydCBNRENUZXh0RmllbGRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkL291dGxpbmUvZm91bmRhdGlvbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIGV4dHJhY3RJY29uUHJvcCwgXHJcbiAgRGlzcGF0Y2hGb2N1c01peGluLCBDdXN0b21FbGVtZW50TWl4aW59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7UmlwcGxlQmFzZX0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtdGV4dGZpZWxkJyxcclxuICBtaXhpbnM6IFtDdXN0b21FbGVtZW50TWl4aW4sIERpc3BhdGNoRm9jdXNNaXhpbl0sXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ21vZGVsJ1xyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiBTdHJpbmcsXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJ3RleHQnLFxyXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBbJ3RleHQnLCAnZW1haWwnLCAnc2VhcmNoJywgJ3Bhc3N3b3JkJywgJ3RlbCcsICd1cmwnXVxyXG4gICAgICAgICAgLmluZGV4T2YodmFsdWUpICE9PSAtMVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVuc2U6IEJvb2xlYW4sXHJcbiAgICBsYWJlbDogU3RyaW5nLFxyXG4gICAgaGVscHRleHQ6IFN0cmluZyxcclxuICAgIGhlbHB0ZXh0UGVyc2lzdGVudDogQm9vbGVhbixcclxuICAgIGhlbHB0ZXh0VmFsaWRhdGlvbjogQm9vbGVhbixcclxuICAgIGJveDogQm9vbGVhbixcclxuICAgIG91dGxpbmU6IEJvb2xlYW4sXHJcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxyXG4gICAgdmFsaWQ6IHt0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB1bmRlZmluZWR9LCBcclxuICAgIGZ1bGx3aWR0aDogQm9vbGVhbixcclxuICAgIG11bHRpbGluZTogQm9vbGVhbixcclxuICAgIGxlYWRpbmdJY29uOiBbU3RyaW5nLCBBcnJheSwgT2JqZWN0XSxcclxuICAgIHRyYWlsaW5nSWNvbjogW1N0cmluZywgQXJyYXksIE9iamVjdF0sXHJcbiAgICBzaXplOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDIwIH0sXHJcbiAgICBtaW5sZW5ndGg6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXHJcbiAgICBtYXhsZW5ndGg6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogdW5kZWZpbmVkIH0sXHJcbiAgICByb3dzOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDggfSxcclxuICAgIGNvbHM6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogNDAgfSxcclxuICAgIFxyXG4gICAgLy8gb3RoZXIgaW5wdXQgcHJvcHMgIFxyXG4gICAgbmFtZTogU3RyaW5nLFxyXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXHJcbiAgICBhdXRvY29tcGxldGU6IEJvb2xlYW4sXHJcbiAgICBhdXRvZm9jdXM6IEJvb2xlYW4sXHJcbiAgfSxcclxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0OiB0aGlzLnZhbHVlLFxyXG4gICAgICByb290Q2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtdGV4dGZpZWxkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQnOiB0cnVlLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tdXBncmFkZWQnOiB0cnVlLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnOiB0aGlzLmRlbnNlLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tZnVsbHdpZHRoJzogdGhpcy5mdWxsd2lkdGgsXHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLS10ZXh0YXJlYSc6IHRoaXMubXVsdGlsaW5lLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tYm94JzogIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMuYm94LFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnOiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5vdXRsaW5lLFxyXG4gICAgICB9LFxyXG4gICAgICBpbnB1dENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHQtZmllbGRfX2lucHV0JzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBsYWJlbENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHQtZmllbGRfX2xhYmVsJzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBib3R0b21DbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1saW5lLXJpcHBsZSc6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgaGVscENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQnOiB0cnVlLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCc6IHRoaXMuaGVscHRleHRQZXJzaXN0ZW50LFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tdmFsaWRhdGlvbi1tc2cnOiB0aGlzLmhlbHB0ZXh0VmFsaWRhdGlvblxyXG4gICAgICB9LFxyXG4gICAgICBvdXRsaW5lUGF0aEF0dHI6IHVuZGVmaW5lZCxcclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiAge1xyXG4gICAgZGlzYWJsZWQgKCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXHJcbiAgICB9LFxyXG4gICAgcmVxdWlyZWQgKCkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldFJlcXVpcmVkKHRoaXMuZGlzYWJsZWQpXHJcbiAgICB9LFxyXG4gICAgdmFsaWQgKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldFZhbGlkKHRoaXMudmFsaWQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZW5zZSAoKSB7XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsICdtZGMtdGV4dC1maWVsZC0tZGVuc2UnLCB0aGlzLmRlbnNlKVxyXG4gICAgfSxcclxuICAgIGhlbHB0ZXh0UGVyc2lzdGVudCAoKSB7XHJcbiAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gXHJcbiAgICAgICAgJiYgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5zZXRQZXJzaXN0ZW50KHRoaXMuaGVscHRleHRQZXJzaXN0ZW50KVxyXG4gICAgfSxcclxuICAgIGhlbHB0ZXh0VmFsaWRhdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gXHJcbiAgICAgICAgJiYgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5zZXRWYWxpZGF0aW9uKHRoaXMuaGVscHRleHRWYWxpZGF0aW9uKVxyXG4gICAgfSxcclxuICAgIHZhbHVlICh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHVwZGF0ZVZhbHVlICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdtb2RlbCcsIHZhbHVlKVxyXG4gICAgfSxcclxuICAgIGZvY3VzICgpIHtcclxuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKCkgXHJcbiAgICB9LFxyXG4gICAgYmx1ciAoKSB7XHJcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKCkgXHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaW5wdXRBdHRycyAoKSB7XHJcbiAgICAgIGxldCB7IG5hbWUsIHJlYWRvbmx5LCBhdXRvY29tcGxldGUsIGF1dG9mb2N1c30gPSB0aGlzXHJcbiAgICAgIHJldHVybiB7IG5hbWUsIHJlYWRvbmx5LCBhdXRvY29tcGxldGUsIGF1dG9mb2N1c307XHJcbiAgICB9LFxyXG4gICAgaW5wdXRQbGFjZUhvbGRlciAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZ1bGx3aWR0aCA/IHRoaXMubGFiZWwgOiB1bmRlZmluZWRcclxuICAgIH0sXHJcbiAgICBpbnB1dEFyaWFDb250cm9scyAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhlbHAgPyAnaGVscC0nICsgdGhpcy5fdWlkOiB1bmRlZmluZWRcclxuICAgIH0sXHJcbiAgICBoYXNMYWJlbCAoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5sYWJlbFxyXG4gICAgfSxcclxuICAgIGhhc091dGxpbmUgKCkge1xyXG4gICAgICByZXR1cm4gIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMub3V0bGluZSBcclxuICAgIH0sXHJcbiAgICBoYXNCb3R0b21MaW5lICgpIHtcclxuICAgICAgcmV0dXJuICF0aGlzLmhhc091dGxpbmUgJiYgIXRoaXMubXVsdGlsaW5lXHJcbiAgICB9LFxyXG4gICAgaGFzTGVhZGluZ0ljb24gKCkge1xyXG4gICAgICBpZiAoKHRoaXMubGVhZGluZ0ljb24gfHwgdGhpcy4kc2xvdHNbJ2xlYWRpbmctaWNvbiddKVxyXG4gICAgICAgICAmJiAhKHRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMuJHNsb3RzWyd0cmFpbGluZy1pY29uJ10pKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhZGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5sZWFkaW5nSWNvbikgOiB7fVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGhhc1RyYWlsaW5nSWNvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLnRyYWlsaW5nSWNvbiB8fCB0aGlzLiRzbG90c1sndHJhaWxpbmctaWNvbiddKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhaWxpbmdJY29uID8gZXh0cmFjdEljb25Qcm9wKHRoaXMudHJhaWxpbmdJY29uKSA6IHt9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgbGFiZWxDbGFzc2VzVXBncmFkZWQgKCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLmxhYmVsQ2xhc3Nlcywge1xyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZF9fbGFiZWwtLWZsb2F0LWFib3ZlJzogdGhpcy52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbW91bnRlZCAoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuJHJlZnMuYm90dG9tKSB7XHJcbiAgICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24gPSBuZXcgTURDTGluZVJpcHBsZUZvdW5kYXRpb24oe1xyXG4gICAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5ib3R0b21DbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuYm90dG9tQ2xhc3NlcywgY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuYm90dG9tQ2xhc3Nlcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmJvdHRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuYm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmJvdHRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5ib3R0b21MaW5lRm91bmRhdGlvbi5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy4kcmVmcy5oZWxwKSB7XHJcbiAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24gPSBuZXcgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24oe1xyXG4gICAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmhlbHBDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuaGVscC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmhlbHAuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQXR0cjogKG5hbWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENvbnRlbnQ6ICggLypjb250ZW50Ki8pID0+IHtcclxuICAgICAgICAgIC8vIGhlbHAgdGV4dCBnZXQncyB1cGRhdGVkIGZyb20ge3toZWxwdGV4dH19XHJcbiAgICAgICAgICAvLyB0aGlzLiRyZWZzLmhlbHAudGV4dENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy4kcmVmcy5pY29uKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdJY29uKXtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbicsIHRydWUpXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUcmFpbGluZ0ljb24pIHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nLCB0cnVlKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmljb25Gb3VuZGF0aW9uID0gbmV3IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uKHtcclxuICAgICAgICBzZXRBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHRoaXMuJHJlZnMuaWNvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5pY29uLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmljb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm90aWZ5SWNvbkFjdGlvbjogKCkgPT4gdGhpcy4kZW1pdCgnaWNvbi1hY3Rpb24nKVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmljb25Gb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuJHJlZnMubGFiZWwpIHtcclxuICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24gPSBuZXcgTURDVGV4dEZpZWxkTGFiZWxGb3VuZGF0aW9uKHtcclxuICAgICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy4kcmVmcy5sYWJlbC5vZmZzZXRXaWR0aCxcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5sYWJlbEZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLm91dGxpbmUpIHtcclxuICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRPdXRsaW5lRm91bmRhdGlvbih7XHJcbiAgICAgICAgZ2V0V2lkdGg6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZS5vZmZzZXRXaWR0aCxcclxuICAgICAgICBnZXRIZWlnaHQ6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZS5vZmZzZXRIZWlnaHQsXHJcbiAgICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMub3V0bGluZVBhdGhBdHRyID0gdmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZTogKHByb3BlcnR5TmFtZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaWRsZU91dGxpbmVFbGVtZW50ID0gdGhpcy4kcmVmcy5vdXRsaW5lSWRsZTtcclxuICAgICAgICAgIGlmIChpZGxlT3V0bGluZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGlkbGVPdXRsaW5lRWxlbWVudClcclxuICAgICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMub3V0bGluZUZvdW5kYXRpb24uaW5pdCgpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUZXh0ZmllbGRGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxyXG4gICAgICB9LFxyXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcilcclxuICAgICAgfSxcclxuICAgICAgaXNGb2N1c2VkOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuJHJlZnMuaW5wdXRcclxuICAgICAgfSxcclxuICAgICAgaXNSdGw6ICgpID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJHJlZnMucm9vdCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnLCAgICAgXHJcbiAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYm90dG9tKSB7XHJcbiAgICAgICAgICB0aGlzLmJvdHRvbS5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5ib3R0b20pIHtcclxuICAgICAgICAgIHRoaXMuYm90dG9tLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiAobm9ybWFsaXplZFgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5ib3R0b20pIHtcclxuICAgICAgICAgIHRoaXMuYm90dG9tLnNldFJpcHBsZUNlbnRlcihub3JtYWxpemVkWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldE5hdGl2ZUlucHV0OiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuaW5wdXRcclxuICAgICAgfSxcclxuICAgICAgXHJcbiAgICB9LCB7XHJcbiAgICAgIGJvdHRvbUxpbmU6IHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24sXHJcbiAgICAgIGhlbHBlclRleHQ6IHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24sXHJcbiAgICAgIGljb246IHRoaXMuaWNvbkZvdW5kYXRpb24sXHJcbiAgICAgIGxhYmVsOiB0aGlzLmxhYmVsRm91bmRhdGlvbixcclxuICAgICAgb3V0bGluZTogdGhpcy5vdXRsaW5lRm91bmRhdGlvbixcclxuICAgIH0pXHJcblxyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KClcclxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRWYWx1ZSh0aGlzLnZhbHVlKVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpXHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0UmVxdWlyZWQodGhpcy5yZXF1aXJlZClcclxuICAgIGlmICh0eXBlb2YgdGhpcy52YWxpZCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsaWQodGhpcy52YWxpZClcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0Ym94KSB7XHJcbiAgICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcclxuICAgICAgdGhpcy5yaXBwbGUuaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSAoKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5ib3R0b21MaW5lRm91bmRhdGlvbiAmJiB0aGlzLmJvdHRvbUxpbmVGb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJiB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5pY29uRm91bmRhdGlvbiAmJiB0aGlzLmljb25Gb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5sYWJlbEZvdW5kYXRpb24gJiYgdGhpcy5sYWJlbEZvdW5kYXRpb24uZGVzdHJveSgpXHJcbiAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uICYmIHRoaXMub3V0bGluZUZvdW5kYXRpb24uZGVzdHJveSgpXHJcbiAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICB9XHJcbn1cclxuXHJcbjwvc2NyaXB0PlxyXG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjVGV4dEZpZWxkIGZyb20gJy4vbWRjLXRleHRmaWVsZC52dWUnXG5cbmV4cG9ydCB7bWRjVGV4dEZpZWxkfVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjVGV4dEZpZWxkXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJDdXN0b21FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJwcm9wcyIsImlzIiwidGFnIiwiZGF0YSIsImNoaWxkcmVuIiwiQ3VzdG9tRWxlbWVudE1peGluIiwiZXh0cmFjdEljb25Qcm9wIiwiaWNvblByb3AiLCJBcnJheSIsInJlZHVjZSIsInJlc3VsdCIsInZhbHVlIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInRleHRDb250ZW50IiwiRGlzcGF0Y2hGb2N1c01peGluIiwiaGFzRm9jdXMiLCJfYWN0aXZlIiwiZGlzcGF0Y2hGb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsIiRlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJhZGRFdmVudExpc3RlbmVyIiwib25Gb2N1c0V2ZW50Iiwib25CbHVyRXZlbnQiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDTGluZVJpcHBsZUFkYXB0ZXIiLCJhdHRyIiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJjc3NDbGFzc2VzIiwiTURDTGluZVJpcHBsZUZvdW5kYXRpb24iLCJkZWZhdWx0QWRhcHRlciIsInRyYW5zaXRpb25FbmRIYW5kbGVyXyIsImV2dCIsImhhbmRsZVRyYW5zaXRpb25FbmQiLCJyZWdpc3RlckV2ZW50SGFuZGxlciIsImRlcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJyZW1vdmVDbGFzcyIsIkxJTkVfUklQUExFX0RFQUNUSVZBVElORyIsImFkZENsYXNzIiwiTElORV9SSVBQTEVfQUNUSVZFIiwieENvb3JkaW5hdGUiLCJhdHRyaWJ1dGVTdHJpbmciLCJzZXRBdHRyIiwiaXNEZWFjdGl2YXRpbmciLCJoYXNDbGFzcyIsInByb3BlcnR5TmFtZSIsIk1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyIiwiY29udGVudCIsInN0cmluZ3MiLCJNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiIsInNldENvbnRlbnQiLCJpc1BlcnNpc3RlbnQiLCJIRUxQRVJfVEVYVF9QRVJTSVNURU5UIiwiaXNWYWxpZGF0aW9uIiwiSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0ciLCJyZW1vdmVBdHRyIiwiQVJJQV9ISURERU4iLCJpbnB1dElzVmFsaWQiLCJoZWxwZXJUZXh0SXNQZXJzaXN0ZW50IiwiaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyIsInZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkiLCJST0xFIiwiaGlkZV8iLCJNRENUZXh0RmllbGRJY29uQWRhcHRlciIsIk1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIiwiaW50ZXJhY3Rpb25IYW5kbGVyXyIsImhhbmRsZUludGVyYWN0aW9uIiwiZm9yRWFjaCIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRpc2FibGVkIiwidHlwZSIsImtleUNvZGUiLCJub3RpZnlJY29uQWN0aW9uIiwiTURDVGV4dEZpZWxkTGFiZWxBZGFwdGVyIiwiTURDVGV4dEZpZWxkTGFiZWxGb3VuZGF0aW9uIiwiZ2V0V2lkdGgiLCJpc1ZhbGlkIiwiaXNGb2N1c2VkIiwiTEFCRUxfU0hBS0UiLCJpc0JhZElucHV0IiwiTEFCRUxfRkxPQVRfQUJPVkUiLCJNRENUZXh0RmllbGRPdXRsaW5lQWRhcHRlciIsIk1EQ1RleHRGaWVsZE91dGxpbmVGb3VuZGF0aW9uIiwibGFiZWxXaWR0aCIsImlzUnRsIiwicmFkaXVzU3R5bGVWYWx1ZSIsImdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSIsInJhZGl1cyIsInBhcnNlRmxvYXQiLCJ3aWR0aCIsImhlaWdodCIsImdldEhlaWdodCIsImNvcm5lcldpZHRoIiwibGVhZGluZ1N0cm9rZUxlbmd0aCIsIk1hdGgiLCJhYnMiLCJwYWRkZWRMYWJlbFdpZHRoIiwicGF0aE1pZGRsZSIsInBhdGgiLCJzZXRPdXRsaW5lUGF0aEF0dHIiLCJNRENUZXh0RmllbGRBZGFwdGVyIiwibm9ybWFsaXplZFgiLCJudW1iZXJzIiwiTURDVGV4dEZpZWxkRm91bmRhdGlvbiIsImZvdW5kYXRpb25NYXAiLCJoZWxwZXJUZXh0XyIsImhlbHBlclRleHQiLCJpY29uXyIsImljb24iLCJsYWJlbF8iLCJsYWJlbCIsIm91dGxpbmVfIiwib3V0bGluZSIsImlzRm9jdXNlZF8iLCJyZWNlaXZlZFVzZXJJbnB1dF8iLCJ1c2VDdXN0b21WYWxpZGl0eUNoZWNraW5nXyIsImlzVmFsaWRfIiwiaW5wdXRGb2N1c0hhbmRsZXJfIiwiYWN0aXZhdGVGb2N1cyIsImlucHV0Qmx1ckhhbmRsZXJfIiwiZGVhY3RpdmF0ZUZvY3VzIiwiaW5wdXRJbnB1dEhhbmRsZXJfIiwiYXV0b0NvbXBsZXRlRm9jdXMiLCJzZXRQb2ludGVyWE9mZnNldF8iLCJzZXRUcmFuc2Zvcm1PcmlnaW4iLCJ0ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfIiwiaGFuZGxlVGV4dEZpZWxkSW50ZXJhY3Rpb24iLCJVUEdSQURFRCIsImdldFZhbHVlIiwic3R5bGVGbG9hdCIsImlzQmFkSW5wdXRfIiwicmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlciIsImdldE5hdGl2ZUlucHV0IiwiaXNEZW5zZSIsIkRFTlNFIiwibGFiZWxTY2FsZSIsIkRFTlNFX0xBQkVMX1NDQUxFIiwiTEFCRUxfU0NBTEUiLCJ1cGRhdGVTdmdQYXRoIiwic3R5bGVGb2N1c2VkXyIsImFjdGl2YXRlTGluZVJpcHBsZSIsInVwZGF0ZU91dGxpbmUiLCJzdHlsZVNoYWtlIiwic2hvd1RvU2NyZWVuUmVhZGVyIiwidGFyZ2V0Q2xpZW50UmVjdCIsInRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImV2dENvb3JkcyIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJsZWZ0Iiwic2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbiIsImRlYWN0aXZhdGVMaW5lUmlwcGxlIiwiaW5wdXQiLCJnZXROYXRpdmVJbnB1dF8iLCJzaG91bGRSZW1vdmVMYWJlbEZsb2F0Iiwic3R5bGVWYWxpZGl0eV8iLCJpc05hdGl2ZUlucHV0VmFsaWRfIiwic3R5bGVEaXNhYmxlZF8iLCJyZXF1aXJlZCIsImlzUmVxdWlyZWQiLCJ2YWxpZGl0eSIsImJhZElucHV0IiwidmFsaWQiLCJJTlZBTElEIiwic2V0VmFsaWRpdHkiLCJGT0NVU0VEIiwiaXNEaXNhYmxlZCIsIkRJU0FCTEVEIiwic2V0RGlzYWJsZWQiLCJNRENSaXBwbGVBZGFwdGVyIiwidmFyTmFtZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsImZvcmNlUmVmcmVzaCIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJwYXNzaXZlIiwiZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJkb2N1bWVudFgiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJCR19GT0NVU0VEIiwiYmx1ckhhbmRsZXJfIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJST09UIiwiVU5CT1VOREVEIiwiaXNVbmJvdW5kZWQiLCJsYXlvdXRJbnRlcm5hbF8iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImtleXMiLCJrIiwiaW5kZXhPZiIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJhY3RpdmF0aW9uU3RhdGUiLCJpc0FjdGl2YXRlZCIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJpc1Byb2dyYW1tYXRpYyIsImFjdGl2YXRpb25FdmVudCIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsImhhc0FjdGl2YXRlZENoaWxkIiwibGVuZ3RoIiwic29tZSIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImlzU3VyZmFjZUFjdGl2ZSIsImFuaW1hdGVBY3RpdmF0aW9uXyIsImV2ZW50IiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwiRkdfREVBQ1RJVkFUSU9OIiwiRkdfQUNUSVZBVElPTiIsIkRFQUNUSVZBVElPTl9USU1FT1VUX01TIiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsImFjdGl2YXRpb25IYXNFbmRlZCIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJtYXhEaW0iLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsIlZBUl9GR19TSVpFIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NDQUxFIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsInJlbmRlciIsIlN0cmluZyIsIkJvb2xlYW4iLCJkZWZhdWx0IiwiT2JqZWN0IiwiTnVtYmVyIiwiZGVuc2UiLCJmdWxsd2lkdGgiLCJtdWx0aWxpbmUiLCJib3giLCJoZWxwdGV4dFBlcnNpc3RlbnQiLCJoZWxwdGV4dFZhbGlkYXRpb24iLCJmb3VuZGF0aW9uIiwic2V0UmVxdWlyZWQiLCJzZXRWYWxpZCIsInJvb3RDbGFzc2VzIiwiaGVscGVyVGV4dEZvdW5kYXRpb24iLCJzZXRQZXJzaXN0ZW50Iiwic2V0VmFsaWRhdGlvbiIsInNldFZhbHVlIiwiJHJlZnMiLCJmb2N1cyIsImJsdXIiLCJyZWFkb25seSIsImF1dG9jb21wbGV0ZSIsImF1dG9mb2N1cyIsImhlbHAiLCJfdWlkIiwiaGFzT3V0bGluZSIsImxlYWRpbmdJY29uIiwiJHNsb3RzIiwidHJhaWxpbmdJY29uIiwibGFiZWxDbGFzc2VzIiwiYm90dG9tIiwiYm90dG9tTGluZUZvdW5kYXRpb24iLCJib3R0b21DbGFzc2VzIiwiY2xhc3NMaXN0Iiwic2V0QXR0cmlidXRlIiwiaW5pdCIsImhlbHBDbGFzc2VzIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzTGVhZGluZ0ljb24iLCJoYXNUcmFpbGluZ0ljb24iLCJpY29uRm91bmRhdGlvbiIsImxhYmVsRm91bmRhdGlvbiIsIm9mZnNldFdpZHRoIiwib3V0bGluZUZvdW5kYXRpb24iLCJvZmZzZXRIZWlnaHQiLCJvdXRsaW5lUGF0aEF0dHIiLCJpZGxlT3V0bGluZUVsZW1lbnQiLCJvdXRsaW5lSWRsZSIsImdldFByb3BlcnR5VmFsdWUiLCJNRENUZXh0ZmllbGRGb3VuZGF0aW9uIiwicm9vdCIsImRlYWN0aXZhdGUiLCJhY3RpdmF0ZSIsInNldFJpcHBsZUNlbnRlciIsInRleHRib3giLCJyaXBwbGUiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7O01BRTVCQyxPQUFPLElBQVg7TUFDSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO1dBQzFCQSxPQUFPQyxHQUFkO0dBREYsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7O1dBRWpDQSxPQUFPRCxHQUFkOztNQUVFRixJQUFKLEVBQVU7U0FDSEksR0FBTCxDQUFTTCxNQUFUOzs7O0FDVkcsU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7U0FDL0I7YUFDSSxRQURKO2FBRUksaUJBQUNDLEVBQUQsRUFBUTtXQUNWLElBQUlDLEdBQVQsSUFBZ0JGLFVBQWhCLEVBQTRCO1lBQ3RCRyxZQUFZSCxXQUFXRSxHQUFYLENBQWhCO1dBQ0tDLFNBQUgsQ0FBYUEsVUFBVUMsSUFBdkIsRUFBNEJELFNBQTVCOztLQUxEOztHQUFQOzs7QUNESyxJQUFN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
