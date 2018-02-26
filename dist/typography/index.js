/**
* @module vue-mdc-adaptertypography 0.11.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

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

/* global CustomEvent */

var typos = ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading1', 'subheading2', 'body1', 'body2', 'caption', 'button'];

var mdcTypoMixin = function mdcTypoMixin(name) {
  return {
    render: function render(createElement) {
      var _class;

      return createElement(this.tag, {
        'class': (_class = {
          'mdc-typo': true
        }, defineProperty(_class, name, true), defineProperty(_class, 'mdc-typography--' + this.typo, true), defineProperty(_class, 'mdc-typography--adjust-margin', this.adjustMargin), _class),
        'attrs': this.$attrs,
        'on': this.$listeners
      }, this.$slots.default);
    }
  };
};

function mdcTypoPropMixin(defaultTag, defaultTypo, validTypos) {
  return {
    props: {
      'tag': {
        type: String,
        default: defaultTag
      },
      'typo': {
        type: String,
        default: defaultTypo,
        validator: function validator(value) {
          return validTypos.indexOf(value) !== -1;
        }
      },
      'adjust-margin': {
        type: Boolean,
        default: false
      }
    }
  };
}

var mdcTextSection = {
  name: 'mdc-text-section',
  props: {
    'tag': {
      type: String,
      default: 'section'
    }
  },
  render: function render(createElement) {
    return createElement(this.tag, {
      'class': {
        'mdc-typography': true,
        'mdc-text-section': true
      },
      'attrs': this.$attrs,
      'on': this.$listeners
    }, this.$slots.default);
  }
};

var mdcText = {
  name: 'mdc-text',
  mixins: [mdcTypoMixin('mdc-text'), mdcTypoPropMixin('p', 'body1', typos)]
};

var mdcDisplay = {
  name: 'mdc-display',
  mixins: [mdcTypoMixin('mdc-display'), mdcTypoPropMixin('h1', 'display1', ['display4', 'display3', 'display2', 'display1'])]
};

var mdcHeadline = {
  name: 'mdc-headline',
  mixins: [mdcTypoMixin('mdc-headline'), mdcTypoPropMixin('h2', 'headline', ['headline'])]
};

var mdcTitle = {
  name: 'mdc-title',
  mixins: [mdcTypoMixin('mdc-title'), mdcTypoPropMixin('h3', 'title', ['title'])]
};

var mdcSubHeading = {
  name: 'mdc-subheading',
  mixins: [mdcTypoMixin('mdc-subheading'), mdcTypoPropMixin('h4', 'subheading2', ['subheading1', 'subheading2'])]
};

var mdcBody = {
  name: 'mdc-body',
  mixins: [mdcTypoMixin('mdc-body'), mdcTypoPropMixin('p', 'body1', ['body1', 'body2'])]
};

var mdcCaption = {
  name: 'mdc-caption',
  mixins: [mdcTypoMixin('mdc-caption'), mdcTypoPropMixin('span', 'caption', ['caption'])]
};

var index = BasePlugin({
  mdcTextSection: mdcTextSection,
  mdcText: mdcText,
  mdcBody: mdcBody,
  mdcCaption: mdcCaption,
  mdcDisplay: mdcDisplay,
  mdcHeadline: mdcHeadline,
  mdcSubHeading: mdcSubHeading,
  mdcTitle: mdcTitle
});

export default index;
export { mdcTextSection, mdcText, mdcBody, mdcCaption, mdcDisplay, mdcHeadline, mdcSubHeading, mdcTitle };
//# sourceMappingURL=index.js.map
