import { mount } from '@vue/test-utils';

import Vue from 'vue'
import Vuetify from 'vuetify'

import ItemList from '@/components/smartInputList/ItemList.vue';
import ListItem from '@/components/smartInputList/ListItem.vue';

const vueInstance = Vue;

vueInstance.use(
  Vuetify, {
  }
);

describe('ItemList.vue', () => {

  let wrapper;
  
  beforeEach(() => {

    wrapper = mount(ItemList, {
      localVue: vueInstance,
      propsData: { 
        items: [
          {
            id: '123',
            text: '1',
            subtext1: 's1',
            subtext2: 's2',
            selected: true,
            disallowDeletion: false
          }
        ],
        deletable: false,
        editable: false,
        selectable: false,
        editItem: () => {},
        deleteItem: () => {},
        selectItem: () => {}
      }
    });
  });


  it('has the correct count of items', () => {

    wrapper.setProps({
      items: [
        {id: '1', text: 'text1'},
        {id: '2', text: 'text2'}
      ]
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.findAll(ListItem).wrappers).toHaveLength(2);
    });
  });

  it('renders the text of list-items', () => {

    const textItem1 = 'text1';
    const textItem2 = 'text2';

    wrapper.setProps({
      items: [
        {id: '1', text: textItem1},
        {id: '2', text: textItem2}
      ]
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.text()).toMatch(textItem1);  
      expect(wrapper.text()).toMatch(textItem2);
    });
  });

  it('renders the subtext1 of list-items', () => {
    const subText1 = 'subText1';
    
    wrapper.setProps({
      items: [
        {id: '1', text: '', subtext1: subText1}
      ]
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.text()).toMatch(subText1);  
    });
  });

  it('renders the subtext2 of list-items', () => {
    const subText2 = 'subText2';
    
    wrapper.setProps({
      items: [
        {id: '1', text: '', subtext2: subText2}
      ]
    });

    return vueInstance.nextTick().then(() => {
      expect(wrapper.text()).toMatch(subText2);  
    });
  });


}); 