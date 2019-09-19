<template>
  <v-container pl-0 pr-0>
  <v-layout justify-center>
  <v-flex xs12 sm10 md8>
    <app-menue-edit-title
      :save="saveMenue"
      :text="this.localMenue.title"
      :changed="onTitleChange"
      :saveDisabled="!menueChanged || this.localMenue.title == ''"
      >
    </app-menue-edit-title>
    <br>
    <appSmartInputItemList
      :items="items()"
      :editable="true"
      :deletable="false"
      :selectable="true"
      :selectItem="selectItem"
      :editItem="navigateToRecipe"
      :filterSubtext="true"
      :inputPlaceHolder="'Filter Recipes'"
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
  import MenueEditTitle from '../components/MenueEditTitle'

  import { Menue } from '../model/Menue';

  export default {
    firstSorting: [], // non reactive data
    components:{
        appSmartInputItemList:SmartInputItemList,
        appMenueEditTitle: MenueEditTitle
    },
    props: {
      id: {
        type: String,
        required: true
      },
      isNewMenue: {
        type: Boolean,
        default: false
      },
      menueTitle: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        menue: 'menues/menue',
        menueRecipes: 'menues/recipes',
        recipes: 'recipes/recipes',
        recipe: 'recipes/recipe'
      }),
      fixedMenue() {
        return this.menue(this.id);
      }
    },
    watch: {
      fixedMenue(newMenue) {
        this.localMenue = newMenue.clone(); 
        this.menueChanged = this.hasMenueChanged();
        this.$options.firstSorting = [];
      },
      id(newId) {
        if(this.isNewMenue) {
          this.mountedHelper();
          this.localMenue = new Menue(this.menueTitle, newId);
        }
      }
    },
    data() {
      return {
        localMenue: new Menue(this.menueTitle, this.id),
        menueChanged: false,
      };
    },
    methods: {
      ...mapActions({
        removeRecipe: 'menues/removeRecipe',
        addRecipe: 'menues/addRecipe',
        updateMenue: 'menues/updateMenue',
        addMenue: 'menues/addMenue'
      }),
      navigateToRecipe(item) {
        this.$router.push({
            name: 'recipes-edit',
            params: { id: item.id, isNewRecipe: false }
        }); 
      },
      selectItem(item, checked) {
        if(checked) {

          const recipe = this.recipe(item.id);
          if(recipe) { 
            this.localMenue.addRecipe(recipe);
          }
        }
        else {
          this.localMenue.removeRecipe(item.id);
        }
        this.menueChanged = this.hasMenueChanged();
      },
      items() {
        
        let toDisplayRecipes = [];
        const addToDisplayedRecipes = (recipe, selected) => {
          toDisplayRecipes.push({
            id: recipe.id,
            text: recipe.title,
            subtext1: recipe.subText1,
            subtext2: recipe.subText2,
            selected
          });
        }

        this.localMenue.recipes.map(recipe => {
          addToDisplayedRecipes(recipe, true);
        });

        this.recipes.map(recipe => {
          if(!this.localMenue.recipes.find(menueRecipe => menueRecipe.id == recipe.id)) {
            addToDisplayedRecipes(recipe, false);
          }
        });
        
        if(this.$options.firstSorting.length == 0) {
          
          toDisplayRecipes.sort((item1, item2) => {
            
            // selected items first
            if(item1.selected && !item2.selected) return -1;
            if(item2.selected && !item1.selected) return 1;
            
            // the rest sorted by its displayed text.
            if(item1.text < item2.text) return -1
            if(item1.text == item2.text) return 0;
            return 1; 
          });
          
          // store the sorting as long as the screen stays visible.
          this.$options.firstSorting = toDisplayRecipes.map(item => {
            return item.id;
          });
        }
        else {
          
          // rerender, sort the items as before so they dont jump around
          // when they get unchecked or checked.

          const temp = [];
          const tempBack = [];
          for(const item of toDisplayRecipes) {
            const index = this.$options.firstSorting.findIndex(id => item.id == id);
            if(index != -1) temp[index] = item;            
            else tempBack.push(item); // In case someone adds a recipe via store.
          }
          tempBack.forEach(item => temp.push(item));
          toDisplayRecipes = temp;
        }
        
        return toDisplayRecipes;
      },
      saveMenue() {
        if(!this.fixedMenue) {
          this.addMenue({menue: this.localMenue});
        }
        else{
          this.updateMenue({menue: this.localMenue});
        }
        
        this.menueChanged = this.hasMenueChanged();
      },
      hasMenueChanged() {
        
        if(!this.fixedMenue) {
          return true;
        }
        if(this.localMenue.title != this.fixedMenue.title) {
          return true;
        }
        if(this.localMenue.recipes.length != this.fixedMenue.recipes.length) {
          return true;
        }

        for(const recipe of this.fixedMenue.recipes) {
          if(!this.localMenue.recipes.find(localRecipe => localRecipe.id == recipe.id)) {
            return true;
          }
        }

        return false;
      },
      onTitleChange(title) {
        if(this.localMenue) this.localMenue.title = title;
        this.menueChanged = this.hasMenueChanged();
      },
      mountedHelper() {
        if(!this.isNewMenue && this.fixedMenue) {
          this.localMenue = this.fixedMenue.clone();
        }
        this.menueChanged = this.hasMenueChanged();
        this.$options.firstSorting = [];
      }
    },
    mounted() {
      this.mountedHelper();
    }
  }
</script>

<style scoped>
  
</style>
