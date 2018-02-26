/**
* @module vue-mdc-adapterswitch 0.11.2
* @exports VueMDCSwitch
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCSwitch = factory());
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

var mdcSwitch = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch-wrapper", class: { 'mdc-form-field': this.hasLabel, 'mdc-form-field--align-end': this.hasLabel && this.alignEnd } }, [_c('div', { staticClass: "mdc-switch", class: { 'mdc-switch--disabled': _vm.disabled } }, [_c('input', { ref: "control", staticClass: "mdc-switch__native-control", attrs: { "type": "checkbox", "name": _vm.name, "id": _vm._uid, "disabled": _vm.disabled }, domProps: { "checked": _vm.checked }, on: { "change": _vm.onChanged } }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _vm.hasLabel ? _c('label', { staticClass: "mdc-switch-label", attrs: { "for": _vm._uid } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]);
  }, staticRenderFns: [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-switch__background" }, [_c('div', { staticClass: "mdc-switch__knob" })]);
  }],
  name: 'mdc-switch',
  mixins: [DispatchFocusMixin],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    'checked': Boolean,
    'label': String,
    'alignEnd': Boolean,
    'disabled': Boolean,
    'value': { type: String, default: function _default() {
        return 'on';
      }
    },
    'name': String
  },
  computed: {
    hasLabel: function hasLabel() {
      return this.label || this.$slots.default;
    }
  },
  methods: {
    onChanged: function onChanged(event) {
      this.$emit('change', event.target.checked);
    }
  }
};

var plugin = BasePlugin({
  mdcSwitch: mdcSwitch
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc3dpdGNoL21kYy1zd2l0Y2gudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zd2l0Y2gvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3N3aXRjaC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuICB7aGFzRm9jdXM6IGZhbHNlfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uRm9jdXNFdmVudCAoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgb25CbHVyRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xuICAgICAgbGV0IGhhc0ZvY3VzID0gdGhpcy4kZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc3dpdGNoLXdyYXBwZXJcIiBcbiAgICA6Y2xhc3M9XCJ7XG4gICAgICAgICdtZGMtZm9ybS1maWVsZCc6IHRoaXMuaGFzTGFiZWwsXG4gICAgICAgICdtZGMtZm9ybS1maWVsZC0tYWxpZ24tZW5kJzogdGhpcy5oYXNMYWJlbCAmJiB0aGlzLmFsaWduRW5kXG4gICAgICB9XCIgPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zd2l0Y2hcIiBcbiAgICAgIDpjbGFzcz1cInsnbWRjLXN3aXRjaC0tZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCI+XG4gICAgICA8aW5wdXQgcmVmPVwiY29udHJvbFwiIHR5cGU9XCJjaGVja2JveFwiIFxuICAgICAgICA6bmFtZT1cIm5hbWVcIiA6aWQ9XCJfdWlkXCIgXG4gICAgICAgIGNsYXNzPVwibWRjLXN3aXRjaF9fbmF0aXZlLWNvbnRyb2xcIiBcbiAgICAgICAgOmNoZWNrZWQ9XCJjaGVja2VkXCIgXG4gICAgICAgIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICAgICAgQGNoYW5nZT1cIm9uQ2hhbmdlZFwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc3dpdGNoX19iYWNrZ3JvdW5kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc3dpdGNoX19rbm9iXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGxhYmVsIDpmb3I9XCJfdWlkXCIgdi1pZj1cImhhc0xhYmVsXCJcbiAgICAgIGNsYXNzPVwibWRjLXN3aXRjaC1sYWJlbFwiPlxuICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PlxuICAgIDwvbGFiZWw+XG5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHtEaXNwYXRjaEZvY3VzTWl4aW59IGZyb20gJy4uL2Jhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1zd2l0Y2gnLFxuICBtaXhpbnM6IFtEaXNwYXRjaEZvY3VzTWl4aW5dLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdjaGVja2VkJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICAnY2hlY2tlZCc6IEJvb2xlYW4sXG4gICAgJ2xhYmVsJzogU3RyaW5nLFxuICAgICdhbGlnbkVuZCc6IEJvb2xlYW4sXG4gICAgJ2Rpc2FibGVkJzogQm9vbGVhbixcbiAgICAndmFsdWUnOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdCAoKSB7IHJldHVybiAnb24nIH0gfSxcbiAgICAnbmFtZSc6IFN0cmluZ1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGhhc0xhYmVsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsIHx8IHRoaXMuJHNsb3RzLmRlZmF1bHRcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNoYW5nZWQgKGV2ZW50KSB7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBldmVudC50YXJnZXQuY2hlY2tlZClcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1N3aXRjaCBmcm9tICcuL21kYy1zd2l0Y2gudnVlJ1xuXG5leHBvcnQge1xuICBtZGNTd2l0Y2hcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1N3aXRjaFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiaGFzRm9jdXMiLCJfYWN0aXZlIiwiZGlzcGF0Y2hGb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsIiRlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJhZGRFdmVudExpc3RlbmVyIiwib25Gb2N1c0V2ZW50Iiwib25CbHVyRXZlbnQiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJCb29sZWFuIiwiU3RyaW5nIiwidHlwZSIsImRlZmF1bHQiLCJsYWJlbCIsIiRzbG90cyIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCOztNQUU1QkMsT0FBTyxJQUFYO01BQ0ksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztXQUMxQkEsT0FBT0MsR0FBZDtHQURGLE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DOztXQUVqQ0EsT0FBT0QsR0FBZDs7TUFFRUYsSUFBSixFQUFVO1NBQ0hJLEdBQUwsQ0FBU0wsTUFBVDs7OztBQ1ZHLFNBQVNNLFVBQVQsQ0FBcUJDLFVBQXJCLEVBQWlDO1NBQy9CO2FBQ0ksUUFESjthQUVJLGlCQUFDQyxFQUFELEVBQVE7V0FDVixJQUFJQyxHQUFULElBQWdCRixVQUFoQixFQUE0QjtZQUN0QkcsWUFBWUgsV0FBV0UsR0FBWCxDQUFoQjtXQUNLQyxTQUFILENBQWFBLFVBQVVDLElBQXZCLEVBQTRCRCxTQUE1Qjs7S0FMRDs7R0FBUDs7O0FDREY7O0FDQU8sSUFBTUUscUJBQXFCO01BQUEsa0JBQ3hCO1dBQ0UsRUFBQ0MsVUFBVSxLQUFYLEVBQVI7R0FGOEI7O1dBSXZCO2VBQUEseUJBQ087V0FDUEMsT0FBTCxHQUFlLElBQWY7S0FGSzthQUFBLHVCQUlNO1dBQ05BLE9BQUwsR0FBZSxLQUFmO0tBTEs7Z0JBQUEsMEJBT1M7Ozs7aUJBRUg7ZUFBTSxNQUFLQyxrQkFBTCxFQUFOO09BQVgsRUFBMkMsQ0FBM0M7S0FUSztlQUFBLHlCQVdROzs7OztXQUdSRCxPQUFMLElBQWdCRSxXQUFXO2VBQU0sT0FBS0Qsa0JBQUwsRUFBTjtPQUFYLEVBQTJDLENBQTNDLENBQWhCO0tBZEs7c0JBQUEsZ0NBZ0JjO1VBQ2ZGLFdBQVcsS0FBS0ksR0FBTCxLQUFhQyxTQUFTQyxhQUF0QixJQUF1QyxLQUFLRixHQUFMLENBQVNHLFFBQVQsQ0FBa0JGLFNBQVNDLGFBQTNCLENBQXREO1VBQ0lOLFlBQVksS0FBS0EsUUFBckIsRUFBK0I7YUFDeEJRLEtBQUwsQ0FBV1IsV0FBVyxPQUFYLEdBQXFCLE1BQWhDO2FBQ0tBLFFBQUwsR0FBZ0JBLFFBQWhCOzs7R0F4QjBCO1NBQUEscUJBNEJyQjtTQUNKSSxHQUFMLENBQVNLLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLEtBQUtDLFlBQTFDO1NBQ0tOLEdBQUwsQ0FBU0ssZ0JBQVQsQ0FBMEIsVUFBMUIsRUFBc0MsS0FBS0UsV0FBM0M7U0FDS1AsR0FBTCxDQUFTSyxnQkFBVCxDQUEwQixXQUExQixFQUF1QyxLQUFLRyxXQUE1QztTQUNLUixHQUFMLENBQVNLLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLEtBQUtJLFNBQTFDO0dBaEM4QjtlQUFBLDJCQWtDZjtTQUNWVCxHQUFMLENBQVNVLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtKLFlBQTdDO1NBQ0tOLEdBQUwsQ0FBU1UsbUJBQVQsQ0FBNkIsVUFBN0IsRUFBeUMsS0FBS0gsV0FBOUM7U0FDS1AsR0FBTCxDQUFTVSxtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLRixXQUEvQztTQUNLUixHQUFMLENBQVNVLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtELFNBQTdDOztDQXRDRzs7QUNpQ1AsZ0JBQWUsRUFBQ0U7O0dBQUQ7O0lBQUE7UUFDUCxZQURPO1VBRUwsQ0FBQ2hCLGtCQUFELENBRks7U0FHTjtVQUNDLFNBREQ7V0FFRTtHQUxJO1NBT047ZUFDTWlCLE9BRE47YUFFSUMsTUFGSjtnQkFHT0QsT0FIUDtnQkFJT0EsT0FKUDthQUtJLEVBQUVFLE1BQU1ELE1BQVIsRUFBZ0JFLE9BQWhCLHNCQUEyQjtlQUFTLElBQVA7O0tBTGpDO1lBTUdGO0dBYkc7WUFlSDtZQUFBLHNCQUNJO2FBQ0gsS0FBS0csS0FBTCxJQUFjLEtBQUtDLE1BQUwsQ0FBWUYsT0FBakM7O0dBakJTO1dBb0JKO2FBQUEscUJBQ0lHLEtBREosRUFDVztXQUNYZCxLQUFMLENBQVcsUUFBWCxFQUFxQmMsTUFBTUMsTUFBTixDQUFhQyxPQUFsQzs7O0NBdEJOOztBQzFCQSxhQUFlL0IsV0FBVzs7Q0FBWCxDQUFmOztBQ0ZBUCxTQUFTQyxNQUFUOzs7Ozs7OzsifQ==
