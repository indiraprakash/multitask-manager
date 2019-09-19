<template>
    
    <v-container pl-0 pr-0>
    <v-layout justify-center>
    <v-flex xs12 sm10 md8>

        <appSmartInputItemList
            :items="items()"
            :editable="true"
            :deletable="true"
            :selectable="false"
            :editItem="navigateToRecipe"
            :deleteItem="deleteItem"
            :selectItem="selectItem"
            :addItem="addRecipe"
            :filterSubtext="true"
            :inputPlaceHolder="'Filter Recipes / New Recipe Name'"
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
                recipes: 'recipes/recipes',
                recipesSorted: 'recipes/recipesSorted',
                isRecipeInUse: 'menues/isRecipeInUse'
            })
        },
        data() {
            return {
               selectedItems: []
            }
        },
        methods: {
            ...mapActions({
                addRecipe: 'recipes/addRecipe',
                removeRecipe: 'recipes/removeRecipe',
            }),
            navigateToRecipe(item) {
                // console.log('[ScreenRecipes][navigateToRecipe][id]', item.id, item.text);                
                this.$router.push({
                    name: 'recipes-edit',
                    params: { id: item.id, isNewRecipe: false }
                }); 
            },
            deleteItem(item) {
                // todo, maybe ask if the recipe should really be deleted?
                // todo, can a recipe be deleted if it is still used in a menue?
                this.removeRecipe({recipeId: item.id});
            },
            selectItem(item, checked) {
                // console.log('[ScreenRecipes][select][id]', item.id, item.text, checked);
                const localItem = this.selectedItems.find(arrayItem => arrayItem.id == item.id);
                if(localItem) {
                    localItem.selected = checked;
                }
            },
            addRecipe(text) {
                // console.log('[ScreenRecipes][addRecipe][text]', text);
                this.$router.push({
                    name: 'recipes-edit',
                    params: { id: uuidv4(), recipeTitle: text, isNewRecipe: true }
                }); 
            },
            items() {

                
                const localItems = this.recipesSorted.map(recipe => {
                    
                    let item = this.selectedItems.find(item => item.id == recipe.id);

                    if(!item) {
                        item = {
                            id: recipe.id,
                            selected: true
                        };
                        this.selectedItems.push(item);
                    }

                    return {
                        id: recipe.id,
                        text: recipe.title,
                        subtext1: recipe.subText1,
                        subtext2: recipe.subText2,
                        selected: item.selected,
                        disallowDeletion: true
                    };
                });

                localItems.forEach(item => {
                    item.disallowDeletion = this.isRecipeInUse(item.id);
                });
               
                return localItems;
            }
        }
    }
</script>

<style scoped>
   
</style>