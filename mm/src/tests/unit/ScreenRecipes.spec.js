import { mount, /*createLocalVue, shallowMount*/ } from '@vue/test-utils';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'

import ListItem from '@/components/smartInputList/ListItem';
import ScreenRecipes from '@/views/ScreenRecipes';
import recipes from '@/store/recipes';
import menues from '@/store/menues';
import { Recipe } from '@/model/Recipe';

const localVue = Vue;//createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('ScreenRecipes.vue', () => {

  let store;

  beforeEach(() => {

    store = new Vuex.Store({
      modules: {
        menues,
        recipes
      }
    })
  })


  it('renders recipes', () => {

    const recipes = [new Recipe('recipe1', '1'), new Recipe('recipe2', '2')];

    store.dispatch('recipes/setRecipes', {recipes });
    const wrapper = mount(ScreenRecipes, { store, localVue });
    expect(wrapper.findAll(ListItem).wrappers).toHaveLength(recipes.length);
  });

}); 