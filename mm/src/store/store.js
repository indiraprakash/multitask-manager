import Vue from 'vue'
import Vuex from 'vuex'

import recipes from './recipes';
import menues from './menues';
import errors from './errors';
import backend from './backend';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recipes,
    menues,
    errors,
    backend
  }
});

