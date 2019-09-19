import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCheckbox,
  VCard,
  VSelect,
  VTextField,
  VDivider,
  VImg,
  VSwitch,
  VProgressCircular,
  VDialog,
  VSubheader,
  VRadioGroup,
  VTextarea,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl';
import * as directives from 'vuetify/es5/directives';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCheckbox,
    VCard,
    VSelect,
    VSwitch,
    VTextField,
    VDivider,
    VImg,
    VProgressCircular,
    VDialog,
    VSubheader,
    VRadioGroup,
    VTextarea,
    transitions
  },
  theme:{
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    emphasize: '#eeeeff'
  },
    directives

})
