/**
* @module vue-mdc-adapter 0.11.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.31.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import VueMDCButton from './button';
import VueMDCCard from './card';
import VueMDCCheckbox from './checkbox';
import VueMDCChipSet from './chips';
import VueMDCDialog from './dialog';
import VueMDCDrawer from './drawer';
import VueMDCElevation from './elevation';
import VueMDCFab from './fab';
import VueMDCGridList from './grid-list';
import VueMDCIcon from './icon';
import VueMDCIconToggle from './icon-toggle';
import VueMDCLayoutApp from './layout-app';
import VueMDCLayoutGrid from './layout-grid';
import VueMDCLinearProgress from './linear-progress';
import VueMDCList from './list';
import VueMDCMenu from './menu';
import VueMDCRadio from './radio';
import VueMDCRipple from './ripple';
import VueMDCSelect from './select';
import VueMDCSlider from './slider';
import VueMDCSnackbar from './snackbar';
import VueMDCSwitch from './switch';
import VueMDCTabs from './tabs';
import VueMDCTextfield from './textfield';
import VueMDCTheme from './theme';
import VueMDCToolbar from './toolbar';
import VueMDCTypography from './typography';

//
// vue PlugIn
//
var index = {
  version: '0.11.2',
  install: function install(vm) {
    vm.use(VueMDCButton);
    vm.use(VueMDCCard);
    vm.use(VueMDCCheckbox);
    vm.use(VueMDCChipSet);
    vm.use(VueMDCDialog);
    vm.use(VueMDCDrawer);
    vm.use(VueMDCElevation);
    vm.use(VueMDCFab);
    vm.use(VueMDCGridList);
    vm.use(VueMDCIcon);
    vm.use(VueMDCIconToggle);
    vm.use(VueMDCLayoutApp);
    vm.use(VueMDCLayoutGrid);
    vm.use(VueMDCLinearProgress);
    vm.use(VueMDCList);
    vm.use(VueMDCMenu);
    vm.use(VueMDCRadio);
    vm.use(VueMDCRipple);
    vm.use(VueMDCSelect);
    vm.use(VueMDCSlider);
    vm.use(VueMDCSnackbar);
    vm.use(VueMDCSwitch);
    vm.use(VueMDCTabs);
    vm.use(VueMDCTextfield);
    vm.use(VueMDCTheme);
    vm.use(VueMDCToolbar);
    vm.use(VueMDCTypography);
  }
};

export default index;

export { VueMDCButton }
export { VueMDCCard }
export { VueMDCCheckbox }
export { VueMDCChips }
export { VueMDCDialog }
export { VueMDCDrawer }
export { VueMDCElevation }
export { VueMDCFab }
export { VueMDCGridList }
export { VueMDCIconToggle }
export { VueMDCIcon }
export { VueMDCLayoutApp }
export { VueMDCLayoutGrid }
export { VueMDCLinearProgress }
export { VueMDCList }
export { VueMDCMenu }
export { VueMDCRadio }
export { VueMDCRipple }
export { VueMDCSelect }
export { VueMDCSlider }
export { VueMDCSnackbar }
export { VueMDCSwitch }
export { VueMDCTabs }
export { VueMDCTextfield }
export { VueMDCTheme }
export { VueMDCToolbar }
export { VueMDCTypography }

export * from './button'
export * from './card'
export * from './checkbox'
export * from './chips'
export * from './dialog'
export * from './drawer'
export * from './elevation'
export * from './fab'
export * from './grid-list'
export * from './icon-toggle'
export * from './icon'
export * from './layout-app'
export * from './layout-grid'
export * from './linear-progress'
export * from './list'
export * from './menu'
export * from './radio'
export * from './ripple'
export * from './select'
export * from './slider'
export * from './snackbar'
export * from './switch'
export * from './tabs'
export * from './textfield'
export * from './theme'
export * from './toolbar'
export * from './typography'
//# sourceMappingURL=index.js.map
