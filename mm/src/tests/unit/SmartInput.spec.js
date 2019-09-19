import { mount } from '@vue/test-utils';

import Vue from 'vue'
import Vuetify from 'vuetify'

import SmartInput from '@/components/smartInputList/SmartInput';

const vueInstance = Vue;

vueInstance.use(
  Vuetify, {
  }
);

describe('SmartInput.vue', () => {

  let wrapper;

  beforeEach(() => {

    wrapper = mount(SmartInput, {
      localVue: vueInstance,
      propsData: { 
        text: '',
        placeHolder: '',
        changed: () => {},
        save: () => {},
        add: () => {}
      }
    });
  });


  it('displays the initial text', () => {

    const text = 'someText';

    wrapper.setProps({
      text: text
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.find('input').attributes('value')).toBe(text);
    });
  });

  it('calls changed on text field content change', () => {

    const spy = jest.fn();
    const text = 'someText'

    wrapper.setProps({
      changed: spy,
      text: text
    });

    wrapper.find('input').trigger('input', {});

    return vueInstance.nextTick().then(() => {
      expect(spy).toHaveBeenCalledWith(text);
    });
  });


  it('calls add on add button click', () => {

    const spy = jest.fn();
    const text = 'someText';

    wrapper.setProps({
      add: spy,
      text
    });

    wrapper.find('button').trigger('click');

    return vueInstance.nextTick().then(() => {
      expect(spy).toHaveBeenCalledWith(text);
    });

  });

  it('calls save on save button click', () => {

    const spy = jest.fn();
    const text = 'someText';

    wrapper.setProps({
      save: spy,
      add: undefined,
      text
    });

    wrapper.find('button').trigger('click');

    return vueInstance.nextTick().then(() => {
      expect(spy).toHaveBeenCalledWith(text);
    });
  });

  it('renders save icon if only save function defined', () => {

    const saveIconName = 'someIconName';

    wrapper.setProps({
      save: () => {},
      add: undefined,
      saveIcon: saveIconName
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.find('button').text()).toBe(saveIconName);
    });
  });

  it('renders add icon if add function defined', () => {

    const saveIconName = 'someIconName';

    wrapper.setProps({
      add: () => {},
      addIcon: saveIconName
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.find('button').text()).toBe(saveIconName);
    });
  });


}); 