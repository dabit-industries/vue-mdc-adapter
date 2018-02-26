/**
* @module vue-mdc-adapterlayout-grid 0.11.2
* @exports VueMDCLayoutGrid
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMDCLayoutGrid = factory());
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

var mdcLayoutGrid = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-grid", class: _vm.classes }, [_c('div', { staticClass: "mdc-layout-grid__inner" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'mdc-layout-grid',
  props: {
    'fixed-column-width': Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth
      }
    };
  }
};

var spanOptions = {
  type: [String, Number],
  default: null,
  validator: function validator(value) {
    var num = Number(value);
    return isFinite(num) && num <= 12 && num > 0;
  }
};

var mdcLayoutCell = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-cell mdc-layout-grid__cell", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-layout-cell',
  props: {
    span: spanOptions,
    order: spanOptions,
    phone: spanOptions,
    tablet: spanOptions,
    desktop: spanOptions,
    align: {
      type: String,
      validator: function validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classes: function classes() {
      var classes = [];

      if (this.span) {
        classes.push("mdc-layout-grid__cell--span-" + this.span);
      }

      if (this.order) {
        classes.push("mdc-layout-grid__cell--order-" + this.order);
      }

      if (this.phone) {
        classes.push("mdc-layout-grid__cell--span-" + this.phone + "-phone");
      }

      if (this.tablet) {
        classes.push("mdc-layout-grid__cell--span-" + this.tablet + "-tablet");
      }

      if (this.desktop) {
        classes.push("mdc-layout-grid__cell--span-" + this.desktop + "-desktop");
      }

      if (this.align) {
        classes.push("mdc-layout-grid__cell--align-" + this.align);
      }

      return classes;
    }
  }
};

var mdcLayoutInnerGrid = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-layout-inner-grid mdc-layout-grid__inner" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-layout-inner-grid'
};

var plugin = BasePlugin({
  mdcLayoutGrid: mdcLayoutGrid,
  mdcLayoutCell: mdcLayoutCell,
  mdcLayoutInnerGrid: mdcLayoutInnerGrid
});

autoInit(plugin);

return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWdyaWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWNlbGwudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9tZGMtbGF5b3V0LWlubmVyLWdyaWQudnVlIiwiLi4vLi4vY29tcG9uZW50cy9sYXlvdXQtZ3JpZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbGF5b3V0LWdyaWQvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cIm1kYy1sYXlvdXQtZ3JpZFwiIDpjbGFzcz1jbGFzc2VzPlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWdyaWRfX2lubmVyXCI+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWxheW91dC1ncmlkJyxcbiAgcHJvcHM6IHtcbiAgICAnZml4ZWQtY29sdW1uLXdpZHRoJzogQm9vbGVhblxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWxheW91dC1ncmlkLS1maXhlZC1jb2x1bW4td2lkdGgnOiB0aGlzLmZpeGVkQ29sdW1uV2lkdGhcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLWxheW91dC1jZWxsIG1kYy1sYXlvdXQtZ3JpZF9fY2VsbFwiIDpjbGFzcz1cImNsYXNzZXNcIj5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmNvbnN0IHNwYW5PcHRpb25zID0ge1xuICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICBkZWZhdWx0OiBudWxsLFxuICB2YWxpZGF0b3I6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBudW0gPSBOdW1iZXIodmFsdWUpXG4gICAgcmV0dXJuIGlzRmluaXRlKG51bSkgJiYgKG51bSA8PSAxMikgJiYgKG51bSA+IDApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWxheW91dC1jZWxsJyxcbiAgcHJvcHM6IHtcbiAgICBzcGFuOiBzcGFuT3B0aW9ucyxcbiAgICBvcmRlcjogc3Bhbk9wdGlvbnMsXG4gICAgcGhvbmU6IHNwYW5PcHRpb25zLFxuICAgIHRhYmxldDogc3Bhbk9wdGlvbnMsXG4gICAgZGVza3RvcDogc3Bhbk9wdGlvbnMsXG4gICAgYWxpZ246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBbJ3RvcCcsICdib3R0b20nLCAnbWlkZGxlJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgbGV0IGNsYXNzZXMgPSBbXVxuXG4gICAgICBpZiAodGhpcy5zcGFuKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1zcGFuLSR7dGhpcy5zcGFufWApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9yZGVyKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1vcmRlci0ke3RoaXMub3JkZXJ9YClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGhvbmUpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBtZGMtbGF5b3V0LWdyaWRfX2NlbGwtLXNwYW4tJHt0aGlzLnBob25lfS1waG9uZWApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRhYmxldCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goYG1kYy1sYXlvdXQtZ3JpZF9fY2VsbC0tc3Bhbi0ke3RoaXMudGFibGV0fS10YWJsZXRgKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZXNrdG9wKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgbWRjLWxheW91dC1ncmlkX19jZWxsLS1zcGFuLSR7dGhpcy5kZXNrdG9wfS1kZXNrdG9wYClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYWxpZ24pIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBtZGMtbGF5b3V0LWdyaWRfX2NlbGwtLWFsaWduLSR7dGhpcy5hbGlnbn1gKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xhc3Nlc1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJtZGMtbGF5b3V0LWlubmVyLWdyaWQgbWRjLWxheW91dC1ncmlkX19pbm5lclwiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWxheW91dC1pbm5lci1ncmlkJyxcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY0xheW91dEdyaWQgZnJvbSAnLi9tZGMtbGF5b3V0LWdyaWQudnVlJ1xuaW1wb3J0IG1kY0xheW91dENlbGwgZnJvbSAnLi9tZGMtbGF5b3V0LWNlbGwudnVlJ1xuaW1wb3J0IG1kY0xheW91dElubmVyR3JpZCBmcm9tICcuL21kYy1sYXlvdXQtaW5uZXItZ3JpZC52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY0xheW91dEdyaWQsXG4gIG1kY0xheW91dENlbGwsXG4gIG1kY0xheW91dElubmVyR3JpZFxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjTGF5b3V0R3JpZCxcbiAgbWRjTGF5b3V0Q2VsbCxcbiAgbWRjTGF5b3V0SW5uZXJHcmlkXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJyZW5kZXIiLCJCb29sZWFuIiwiZml4ZWRDb2x1bW5XaWR0aCIsInNwYW5PcHRpb25zIiwiU3RyaW5nIiwiTnVtYmVyIiwidmFsdWUiLCJudW0iLCJpc0Zpbml0ZSIsImluZGV4T2YiLCJjbGFzc2VzIiwic3BhbiIsInB1c2giLCJvcmRlciIsInBob25lIiwidGFibGV0IiwiZGVza3RvcCIsImFsaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7O01BRTVCQyxPQUFPLElBQVg7TUFDSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO1dBQzFCQSxPQUFPQyxHQUFkO0dBREYsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7O1dBRWpDQSxPQUFPRCxHQUFkOztNQUVFRixJQUFKLEVBQVU7U0FDSEksR0FBTCxDQUFTTCxNQUFUOzs7O0FDVkcsU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7U0FDL0I7YUFDSSxRQURKO2FBRUksaUJBQUNDLEVBQUQsRUFBUTtXQUNWLElBQUlDLEdBQVQsSUFBZ0JGLFVBQWhCLEVBQTRCO1lBQ3RCRyxZQUFZSCxXQUFXRSxHQUFYLENBQWhCO1dBQ0tDLFNBQUgsQ0FBYUEsVUFBVUMsSUFBdkIsRUFBNEJELFNBQTVCOztLQUxEOztHQUFQOzs7QUNERjs7QUNVQSxvQkFBZSxFQUFDRTs7R0FBRCxxQkFBQTtRQUNQLGlCQURPO1NBRU47MEJBQ2lCQztHQUhYO01BQUEsa0JBS0w7V0FDQztlQUNJOytDQUNnQyxLQUFLQzs7S0FGaEQ7O0NBTko7O0FDSEEsSUFBTUMsY0FBYztRQUNaLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURZO1dBRVQsSUFGUzthQUdQLG1CQUFVQyxLQUFWLEVBQWlCO1FBQ3RCQyxNQUFNRixPQUFPQyxLQUFQLENBQVY7V0FDT0UsU0FBU0QsR0FBVCxLQUFrQkEsT0FBTyxFQUF6QixJQUFpQ0EsTUFBTSxDQUE5Qzs7Q0FMSjs7QUFTQSxvQkFBZSxFQUFDUDs7R0FBRCxxQkFBQTtRQUNQLGlCQURPO1NBRU47VUFDQ0csV0FERDtXQUVFQSxXQUZGO1dBR0VBLFdBSEY7WUFJR0EsV0FKSDthQUtJQSxXQUxKO1dBTUU7WUFDQ0MsTUFERDtpQkFFTSxtQkFBVUUsS0FBVixFQUFpQjtlQUNuQixDQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCLFFBQWxCLEVBQTRCRyxPQUE1QixDQUFvQ0gsS0FBcEMsTUFBK0MsQ0FBQyxDQUF2RDs7O0dBWE87WUFlSDtXQUFBLHFCQUNHO1VBQ0xJLFVBQVUsRUFBZDs7VUFFSSxLQUFLQyxJQUFULEVBQWU7Z0JBQ0xDLElBQVIsa0NBQTRDLEtBQUtELElBQWpEOzs7VUFHRSxLQUFLRSxLQUFULEVBQWdCO2dCQUNORCxJQUFSLG1DQUE2QyxLQUFLQyxLQUFsRDs7O1VBR0UsS0FBS0MsS0FBVCxFQUFnQjtnQkFDTkYsSUFBUixrQ0FBNEMsS0FBS0UsS0FBakQ7OztVQUdFLEtBQUtDLE1BQVQsRUFBaUI7Z0JBQ1BILElBQVIsa0NBQTRDLEtBQUtHLE1BQWpEOzs7VUFHRSxLQUFLQyxPQUFULEVBQWtCO2dCQUNSSixJQUFSLGtDQUE0QyxLQUFLSSxPQUFqRDs7O1VBR0UsS0FBS0MsS0FBVCxFQUFnQjtnQkFDTkwsSUFBUixtQ0FBNkMsS0FBS0ssS0FBbEQ7OzthQUdLUCxPQUFQOzs7Q0EzQ047O0FDVEEseUJBQWUsRUFBQ1Y7O0dBQUQscUJBQUE7UUFDUDtDQURSOztBQ0lBLGFBQWVOLFdBQVc7OEJBQUE7OEJBQUE7O0NBQVgsQ0FBZjs7QUNOQVAsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
