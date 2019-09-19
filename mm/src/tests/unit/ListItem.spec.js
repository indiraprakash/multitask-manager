import { mount } from '@vue/test-utils';

import Vue from 'vue'
import Vuetify from 'vuetify'

import ListItem from '@/components/smartInputList/ListItem.vue';

const vueInstance = Vue;

vueInstance.use(
  Vuetify, {
  }
);

describe('ListItem.vue', () => {
  
  let wrapper;

  beforeEach(() => {

    //const localVue = createLocalVue();
    //localVue.use(Vuetify);
  
    wrapper = mount(ListItem, {
      localVue: vueInstance,
      propsData: { 
        text: 'SomeItemText',
        deletable: false,
        deletableButDeactivated: false,
        editable: false,
        selected: false,
        selectable: false,
        edit: () => {},
        deleteItem: () => {},
        select: () => {}
      }
    });
  });


  it('renders checked checkbox if selectable and selected', () => {

    const iconName = 'someIconName';
    wrapper.setProps({
      selected: true,
      selectable: true,
      selectedIcon: iconName
    });

    // Using next tick is probably only needed because of a bug in vue-test-utils.
    // Changing the props above should automatically trigger a vue update.

    return vueInstance.nextTick().then(() => {
      expect(wrapper.html()).toMatch(new RegExp(`<button.*<i.*${iconName}.*/i>.*/button>`));
    });
  });

  it('renders unchecked checkbox if selectable and not selected', () => {

    const iconName = 'someIconName';
    wrapper.setProps({
      selected: false,
      selectable: true,
      notSelectedIcon: iconName
    });
    return vueInstance.nextTick().then(() => {
      expect(wrapper.html()).toMatch(new RegExp(`<button.*<i.*${iconName}.*/i>.*/button>`));
    });
  });

  it('renders no checkbox if not selectable', () => {

    const iconNameS = 'someIconNameS';
    const iconNameNS = 'someIconNameNS';

    wrapper.setProps({
      selectable: false,
      selectedIcon: iconNameS,
      notSelectedIcon: iconNameNS
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.html()).not.toMatch(new RegExp(`<button.*<i.*${iconNameS}.*/i>.*/button>`));
      expect(wrapper.html()).not.toMatch(new RegExp(`<button.*<i.*${iconNameNS}.*/i>.*/button>`));
    });
  });

  it('click on unckecked checkbox triggers callback with argument checked equal to true', () => {

    const spy = jest.fn()

    wrapper.setProps({
      selectable: true,
      selected: false,
      select: spy
    });

    return vueInstance.nextTick().then(() => {
      const button = wrapper.findAll('button').at(0);
      button.trigger('click');
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  it('click on checkbox checkbox triggers callback with argument checked equal to false', () => {

    const spy = jest.fn();

    wrapper.setProps({
      selectable: true,
      selected: true,
      select: spy
    });

    return vueInstance.nextTick().then(() => {
      const button = wrapper.findAll('button').at(0);
      button.trigger('click');
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  it('renders the text it was passed', () => {

    const text = 'someText';
    wrapper.setProps({
      text: text
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.html()).toMatch(`${text}`);
    });
  });

  it('click on text triggers edit callback if editable', () => {

    const spy = jest.fn();
    const text = 'someText';

    wrapper.setProps({
      editable: true,
      edit: spy,
      text: text
    });

    return vueInstance.nextTick().then(() => {
      wrapper.find('[data-test-id-text]').trigger('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  it('click on text triggers no edit callback if not editable', () => {

    const spy = jest.fn();
    const text = 'someText';

    wrapper.setProps({
      editable: false,
      edit: spy,
      text: text
    });

    return vueInstance.nextTick().then(() => {
      wrapper.find('[data-test-id-text]').trigger('click');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('renders delete icon if deletable', () => {

    const iconName = 'someDeleteIconName';

    wrapper.setProps({
      deletable: true,
      deleteIcon: iconName
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.html()).toMatch(new RegExp(`<button.*<i.*${iconName}.*/i>.*/button>`));
    });

  });

  it('renders no delete button if not deletable', () => {

    wrapper.setProps({
      deletable: true,
    });
    return vueInstance.nextTick().then(() => {
      expect(wrapper.find('[data-test-id-delete]').exists()).toEqual(true);
    });
  });

  it('renders disabled delete button if deletion of item is not allowed', () => {
    
    wrapper.setProps({
      deletable: true,
      deletableButDeactivated: true
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.find('[data-test-id-delete]').find('[disabled]').exists()).toEqual(true);
    });
  });

  it('click on delete triggers delete callback', () => {

    const spy = jest.fn();

    wrapper.setProps({
      deletable: true,
      deleteItem: spy
    });

    return vueInstance.nextTick().then(() => {
      wrapper.find('[data-test-id-delete]').find('button').trigger('click');
      expect(spy).toHaveBeenCalled();
    });
  });

});            
