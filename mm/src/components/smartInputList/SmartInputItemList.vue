<template>
  <div>
    <v-card flat>
    <app-smart-input
      :text="filterText"
      :changed="onFilterTextChange"
      :add="addItem"
      :save="saveItem"
      :placeHolder="inputPlaceHolder"
      >
    </app-smart-input>
    </v-card>   
    <br>
    <app-item-list
      :items="getItems()"
      :editable="editable"
      :deletable="deletable"
      :selectable="selectable"
      :editItem="editItem"
      :deleteItem="deleteItem"
      :selectItem="selectItem"
      >
    </app-item-list>
  </div>
</template>

<script>
  import ItemList from './ItemList';
  import SmartInput from './SmartInput';
  export default {
    components:{
        appItemList: ItemList,
        appSmartInput: SmartInput
    },
    props: {
      items: {
        type: Array,
        required: true

        // Example of the structure of the objects the prop 'items' may contain:
        // {
        //   id: '123',
        //   text: 'someItemText',
        //   subtext1: 'someSubText',
        //   subtext2: 'someOtherSubText',
        //   selected: true, // <== optional and only used if prop 'selectable' is true
        //   disallowDeletion: true // <== optional and only used if prop 'deletable' is true 
        // }
      },
      deletable: {
        type: Boolean,
        required: true
      },
      editable: {
        type: Boolean,
        required: true
      },
      selectable: {
        type: Boolean,
        required: true
      },
      editItem: {
        type: Function,
        required: true
      },
      deleteItem: {
        type: Function,
        default: () => {}
      },
      selectItem: {
        type:Function,
        required: false
      },
      addItem: {
        type: Function,
        required: false
      },
      saveItem: {
        type: Function,
        required: false
      },
      filterSubtext: {
        type: Boolean,
        default: true
      },
      inputPlaceHolder: {
        type: String
      },
      initialText: {
        type: String,
        default: ''
      }
    },
    watch: {
      initialText(newValue) {
        this.filterText = newValue;
      }
    },
    data() {
      return {
        filterText: this.initialText
      };
    },
    methods: {
      onFilterTextChange(filterText) {
        this.filterText = filterText;
      },
      getItems() {
        return this.items.filter(item => {
            
          if(!this.filterText) return true;
          const lcFilterText = this.filterText.toLowerCase();
          try {
            return (
              (item.text && item.text.toLowerCase().search(lcFilterText) !== -1) ||
              (
                this.filterSubtext &&
                (
                  (item.subtext1 && item.subtext1.toLowerCase().search(lcFilterText) !== -1) ||
                  (item.subtext2 && item.subtext2.toLowerCase().search(lcFilterText) !== -1)
                )
              )
            );
          }
          catch(error) {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>