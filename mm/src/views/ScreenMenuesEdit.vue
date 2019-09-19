<template>
    
  <v-container pl-0 pr-0>
  <v-layout justify-center>
  <v-flex xs12 sm10 md8>

    <appSmartInputItemList
      :items="items()"
      :editable="true"
      :deletable="true"
      :selectable="false"
      :editItem="navigateToMenue"
      :deleteItem="deleteItem"
      :addItem="addMenue"
      :filterSubtext="true"
      :inputPlaceHolder="'Filter Menues / New Menue Name'"
      :filterTextChange="(value) => filterText = value"
      >
    </appSmartInputItemList>
      
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
    
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';
  import SmartInputItemList from '../components/smartInputList/SmartInputItemList'

  import { uuidv4 } from '../utilities/uuid';
  
  export default {
    components:{
        appSmartInputItemList:SmartInputItemList
    },
    computed: {
      ...mapGetters({
        menues: 'menues/menues',
      })
    },
    data() {
      return  {
        filterText: ''
      };
    },
    methods: {
      ...mapActions({
        removeMenue: 'menues/removeMenue'
      }),
      navigateToMenue(item) {
        // console.log('[ScreenMenuesEdit][navigateToMenue][id]', item.id, item.text);        
        this.$router.push({
          name: 'menue-edit',
          params: { id: item.id, isNewMenue: false }
        }); 
      },
      deleteItem(item) {
        this.removeMenue({menueId: item.id});
      },
      addMenue(text) {
        // console.log('[ScreenMenuesEdit][addMenue][text]', text);
        this.$router.push({
          name: 'menue-edit',
          params: { id: uuidv4(), menueTitle: text, isNewMenue: true},
        }); 
      },
      items() {
        const localItems = this.menues.map(menue => {
          
          return {
            id: menue.id,
            text: menue.title,
            subtext1: menue.subText1,
            subtext2: menue.subText2
          };
        });
        
        return localItems;
      }
    }
  }
</script>

<style scoped>

</style>
