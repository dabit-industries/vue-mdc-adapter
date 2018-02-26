/**
* @module vue-mdc-adaptertextfield 0.11.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleBase } from '../ripple';

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

var index = BasePlugin({
  mdcTextField: mdcTextField
});

export default index;
export { mdcTextField };
//# sourceMappingURL=index.js.map
