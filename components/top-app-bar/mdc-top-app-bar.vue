<template>
<header ref="root" :class="rootClasses">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <a ref="navigationIcon" href="#" :class="naviconClasses" v-if="haveNavigationIcon" @click="dispatchEvent">{{icon}}</a>
      <span class="mdc-top-app-bar__title" v-if="!!title">{{title}}</span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" v-if="$slots.default">
      <slot></slot>
    </section>
  </div>
</header>
</template>

<script>
import MDCTopAppBarFoundation from '@material/top-app-bar/foundation';
import * as util from '@material/top-app-bar/util';
import { DispatchEventMixin, emitCustomEvent } from '../base';

export default {
  name: 'mdc-top-app-bar',
  props: {
    short: Boolean,
    shortCollapsed: Boolean,
    title: String,
    icon: {
      type: String,
      default: 'menu',
    },
    iconClasses: Object,
  },
  data() {
    return {
      rootClasses: {
        'mdc-top-app-bar': true,
        'mdc-top-app-bar--short': this.short,
        'mdc-top-app-bar--short-collapsed': this.shortCollapsed,
      },
      foundation: null,
    };
  },
  mixins: [DispatchEventMixin],
  mounted() {
    this.foundation = new MDCTopAppBarFoundation({
      addClass: className => {
        this.$set(this.rootClasses, className, true);
      },
      removeClass: className => {
        this.$delete(this.rootClasses, className);
      },
      hasClass: className => {
        return this.$refs.root.classList.contains(className);
      },
      registerNavigationIconInteractionHandler: (type, handler) => {
        if (this.$refs.navigationIcon) {
          this.$refs.navigationIcon.addEventListener(type, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (type, handler) => {
        if (this.$refs.navigationIcon) {
          this.$refs.navigationIcon.removeEventListener(type, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        emitCustomEvent(
          this.$el,
          MDCTopAppBarFoundation.strings.NAVIGATION_EVENT,
          {},
          true,
        );
      },
      registerScrollHandler: handler => {
        window.addEventListener('scroll', handler, util.applyPassive());
      },
      deregisterScrollHandler: handler => {
        window.removeEventListener('scroll', handler);
      },

      getViewportScrollY: () => {
        return window.pageYOffset;
      },
      getTotalActionItems: () =>
        this.$refs.root.querySelectorAll(
          MDCTopAppBarFoundation.strings.ACTION_ITEM_SELECTOR,
        ).length,
    });
    this.foundation.init();
  },
  computed: {
    haveNavigationIcon() {
      return !!this.icon || this.iconClasses;
    },
    naviconClasses() {
      return {
        'mdc-top-app-bar__navigation-icon': true,
        'material-icons': !!this.icon,
        ...this.iconClasses,
      };
    },
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
};
</script>
