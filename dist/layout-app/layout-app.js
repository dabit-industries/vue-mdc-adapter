/**
* @module vue-mdc-adapterlayout-app 0.11.2
* @exports VueMDCLayoutApp
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCLayoutApp = factory());
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

var mdcLayoutApp = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-app" }, [_c('div', { staticClass: "mdc-layout-app--toolbar-wrapper" }, [_vm._t("toolbar")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--main-container" }, [_c('div', { staticClass: "mdc-layout-app--drawer-wrapper" }, [_vm._t("drawer")], 2), _vm._v(" "), _c('div', { staticClass: "mdc-layout-app--content-wrapper" }, [_vm._t("default")], 2)])]);
  }, staticRenderFns: [],
  name: 'mdc-layout-app'
};

var plugin = BasePlugin({
  mdcLayoutApp: mdcLayoutApp
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWFwcC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2xheW91dC1hcHAvbWRjLWxheW91dC1hcHAudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtYXBwL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtYXBwL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1kYy1sYXlvdXQtYXBwLS10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgIDxzbG90IG5hbWU9XCJ0b29sYmFyXCIgLz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWFwcC0tbWFpbi1jb250YWluZXJcIj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1sYXlvdXQtYXBwLS1kcmF3ZXItd3JhcHBlclwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwiZHJhd2VyXCIgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwibWRjLWxheW91dC1hcHAtLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICA8c2xvdCAvPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWxheW91dC1hcHAnLFxufVxuPC9zY3JpcHQ+IiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY0xheW91dEFwcCBmcm9tICcuL21kYy1sYXlvdXQtYXBwLnZ1ZSdcblxuZXhwb3J0IHtcbiAgbWRjTGF5b3V0QXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNMYXlvdXRBcHBcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZtIiwia2V5IiwiY29tcG9uZW50IiwibmFtZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCOztNQUU1QkMsT0FBTyxJQUFYO01BQ0ksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztXQUMxQkEsT0FBT0MsR0FBZDtHQURGLE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DOztXQUVqQ0EsT0FBT0QsR0FBZDs7TUFFRUYsSUFBSixFQUFVO1NBQ0hJLEdBQUwsQ0FBU0wsTUFBVDs7OztBQ1ZHLFNBQVNNLFVBQVQsQ0FBcUJDLFVBQXJCLEVBQWlDO1NBQy9CO2FBQ0ksUUFESjthQUVJLGlCQUFDQyxFQUFELEVBQVE7V0FDVixJQUFJQyxHQUFULElBQWdCRixVQUFoQixFQUE0QjtZQUN0QkcsWUFBWUgsV0FBV0UsR0FBWCxDQUFoQjtXQUNLQyxTQUFILENBQWFBLFVBQVVDLElBQXZCLEVBQTRCRCxTQUE1Qjs7S0FMRDs7R0FBUDs7O0FDREY7O0FDc0JBLG1CQUFlLEVBQUNFOztHQUFELHFCQUFBO1FBQ1A7Q0FEUjs7QUNmQSxhQUFlTixXQUFXOztDQUFYLENBQWY7O0FDRkFQLFNBQVNDLE1BQVQ7Ozs7Ozs7OyJ9
