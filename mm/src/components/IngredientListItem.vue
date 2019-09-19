<template>
    <v-container>
        <v-layout row align-center>

            <v-list-tile-content >
                <v-text-field v-if="addable" v-model="newIngredient.name" label="Zutat"></v-text-field>                
                <v-text-field v-else v-model="ingredient.name" @change="onChange()"></v-text-field>
            </v-list-tile-content>

            <v-list-tile-content>
                <v-text-field v-if="addable" v-model="newIngredient.amount" label="Menge"></v-text-field>
                <v-text-field v-else v-model="ingredient.amount" @change="onChange()"></v-text-field>
            </v-list-tile-content>

            <v-list-tile-content>            
                <v-text-field v-if="addable" v-model="newIngredient.unit" label="Einheit"></v-text-field>
                <v-text-field v-else v-model="ingredient.unit" @change="onChange()"></v-text-field>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn flat icon @click="onDelete" v-if="deletable">
                  <v-icon>delete</v-icon>
              </v-btn>
               <v-btn flat icon @click="onEdit" v-if="editable">
                   <v-icon>edit</v-icon>
               </v-btn>
              <v-btn flat icon @click="onAdd" v-if="addable"
                     :disabled="!(newIngredient.name && newIngredient.amount && newIngredient.unit)">
                  <v-icon large >add_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
        </v-layout>
    </v-container>
</template>

<script>

    import { Ingredient } from '../model/Ingredient';

    export default {
        props:{
            ingredient:{
                type: Object,
                required: false
            },
            deletable:{
                type: Boolean,
                required: true
            },
            editable:{
                type: Boolean,
                required: true
            },
            add:{
                type: Function,
                required: false
            },
            editItem:{
                type: Function,
                required: false
            },
            deleteItem:{
                type: Function,
                required: false
            },
            addable:{
                type: Boolean,
                required: true
            }
        },
        data (){
            return{
                newIngredient: {}
            }
        },
        methods:{
            onAdd(){

                const ingredient = new Ingredient(this.newIngredient.name, this.newIngredient.amount, this.newIngredient.unit);
                this.add(ingredient);
                //this.add({name: this.newIngredient.name, amount: this.newIngredient.amount, unit: this.newIngredient.unit})
                this.newIngredient.name = this.newIngredient.amount = this.newIngredient.unit = ""
            },
            onChange(){
                this.editItem(this.ingredient);
            },
            onDelete(){
                this.deleteItem(this.ingredient);
            }
        }
    }

</script>
<style scoped>

</style>