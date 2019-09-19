<template>
    <v-container pl-0 pr-0>
        <v-layout justify-center>
            <v-flex xs12 sm10 md10>
                <appRecipeTitle :title="this.localRecipe.title" :editable="true" :onTitleChange="(newTitle) => onTitleChange(newTitle)"/>
                <br>
                <appIngredients :ingredients="localRecipe.ingredients"></appIngredients>
                <br>
                <appWorksteps v-if="activeEditWorkstep == null" :worksteps="localRecipe.workSteps" :editWorkstep="editWorkstep"></appWorksteps>
                <appWorkstepEdit v-else :workstep="activeEditWorkstep" :closeEditHandler="closeEditHandler"></appWorkstepEdit>
            </v-flex>
        </v-layout>
        <br>
        <v-footer v-if="hasRecipeChanged() && activeEditWorkstep==null" fixed height="auto" color="primary">
            <v-layout justify-center row wrap>
                <v-btn flat color="white" round @click="onCancel">Cancel</v-btn>
                <v-btn flat color="white" round @click="onSave">Save</v-btn>
            </v-layout>
        </v-footer>
    </v-container>
</template>

<script>
    import RecipeTitle from '@/components/RecipeTitle.vue'
    import Ingredients from '@/components/Ingredients.vue'
    import Worksteps from '@/components/Worksteps.vue'
    import WorkstepEdit from '@/components/WorkstepEdit.vue'

    import { Recipe } from '../model/Recipe';
    import { WorkStep } from '../model/WorkStep';
    import { WorkStepTypes } from '../model/WorkStepType';

    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    

    export default {
        name: 'screen-recipes-edit',
        components: {
            appRecipeTitle: RecipeTitle,
            appIngredients: Ingredients,
            appWorksteps: Worksteps,
            appWorkstepEdit: WorkstepEdit
        },
        props:{
            id: {
                type: String,
                required: true
            },
            isNewRecipe: {
                type: Boolean,
                default: true
            },
            recipeTitle: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters({
                recipes: 'recipes/recipes',
                recipe: 'recipes/recipe'
            }),
            fixedRecipe() {
                return this.recipe(this.id);
            }
        },
        watch: {
            fixedRecipe(newRecipe) {
                this.localRecipe = newRecipe.clone(); 
            }
        },
        data() {
            return {
                activeEditWorkstep: null,
                localRecipe: new Recipe(this.recipeTitle, this.id),
            };
        },
        methods: {
            ...mapActions({
                updateRecipe: 'recipes/updateRecipe',
                addRecipe: 'recipes/addRecipe',
                updateIngredient: 'recipes/updateIngredient',
                removeIngredient: 'recipes/removeIngredient',
                addWorkStep: 'recipes/addWorkStep',
                removeWorkStep: 'recipes/removeWorkStep',
                updateWorkStep: 'recipes/updateWorkStep',
            }),
            saveTitle: function (title) {
                this.newTitle = title;
                this.titleDdit = false;
            },
            editWorkstep(workstep) {
                if(workstep){   // existing workstep was edited
                    this.activeEditWorkstep = workstep
                }
                else{   // new workstep was created
                    this.activeEditWorkstep = new WorkStep(0, 0, '', WorkStepTypes.PASSIVE);
                    //this.activeEditWorkstep = new WorkStep()
                }
            },
            closeEditHandler(workstep) {

                if(JSON.stringify(workstep) === JSON.stringify(this.activeEditWorkstep)){
                    //console.log("ScreenRecipeEdit: nothing changed")
                }
                else{
                    if(this.activeEditWorkstep.description){    // existing workstep
                        //console.log("ScreenRecipeEdit: Existing Workstep changed")
                        // update local recipe with changed workstep
                        let index = this.localRecipe.workSteps.findIndex((element) => element.id == workstep.id)
                        this.localRecipe.workSteps[index] = workstep
                    }
                    else{   // new workstep
                        //console.log("ScreenRecipeEdit: New Workstep added")
                        this.localRecipe.workSteps.push(workstep)
                    }
                }
                this.activeEditWorkstep = null

            },
            hasRecipeChanged(){
                if(JSON.stringify(this.fixedRecipe) === JSON.stringify(this.localRecipe)){
                    return false
                }
                else{
                    return true
                }
            },
            saveRecipe(){
                if(!this.fixedRecipe) {
                    this.addRecipe({recipe: this.localRecipe});
                }
                else{
                    this.updateRecipe({recipe: this.localRecipe});
                }
            },
            onCancel(){
                this.$router.go(-1)
            },
            onSave(){
                this.saveRecipe()
                this.$router.go(-1)
            },
            onTitleChange(title) {
                if(this.localRecipe) this.localRecipe.title = title;
            }
        },
        mounted() {
            if(!this.isNewRecipe && this.fixedRecipe) {
                this.localRecipe = this.fixedRecipe.clone();
            }
        }
    }
</script>