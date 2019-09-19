import { mount } from '@vue/test-utils';

import Vue from 'vue'
import Vuetify from 'vuetify'

import SmartInput from '@/components/smartInputList/SmartInputItemList';
import ListItem from '@/components/smartInputList/ListItem';

const vueInstance = Vue;

vueInstance.use(
  Vuetify, {
  }
);

describe('SmartInputItemList.vue', () => {

  let wrapper;

  beforeEach(() => {

    wrapper = mount(SmartInput, {
      localVue: vueInstance,
      propsData: { 
        items: [],
        inputPlaceHolder: '',
        filterSubtext: false,
        addItem: () => {},
        selectItem: () => {},
        deleteItem: () => {},
        editItem: () => {},
        selectable: false,
        editable: false,
        deletable: false
      }
    });
  });

  it('filters correctly if substring is matched', () => {

    const text1 = 'text1';
    const text2 = 'text2';

    wrapper.setProps({
      items: [
        { id: '1', text: text1 },
        { id: '2', text: text2 }
      ],
      initialText: '1'
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.findAll(ListItem).wrappers).toHaveLength(1);

      wrapper.setProps({
        initialText: 'text'
      });
      return vueInstance.nextTick().then(() => {
        expect(wrapper.findAll(ListItem).wrappers).toHaveLength(2);
      });

    });

  });

  it('filters correctly if substring is not matched', () => {

    const text1 = 'text1';
    const text2 = 'text2';

    wrapper.setProps({
      items: [
        { id: '1', text: text1 },
        { id: '2', text: text2 }
      ],
      initialText: '3'
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.findAll(ListItem).wrappers).toHaveLength(0);
    });

  });

  it('filters correctly if subtext1 matched and enabled', () => {

    const text1 = 'text1';
    const text2 = 'text2';
    const subtext1 = 'subtext1';

    wrapper.setProps({
      items: [
        { id: '1', text: text1, subtext1 },
        { id: '2', text: text2 }
      ],
      filterSubtext: true,
      initialText: 'subtext1'
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.findAll(ListItem).wrappers).toHaveLength(1);
    });
  });

}); 