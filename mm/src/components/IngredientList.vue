<template>
    <div>
        <v-list>
            <app-ingredient-item
                    :deletable="false"
                    :editable="false"
                    :addable="true"
                    :add="(newIngredient) => add(newIngredient)"
            ></app-ingredient-item>
        </v-list>
        <br>
        <v-card>
        <v-list dense v-for="(item, index) in ingredients"
            :key="item.ingredient">
            <app-ingredient-item
                    :ingredient="item"
                    :deletable="true"
                    :editable="false"
                    :addable="false"
                    :editItem="editIngredient"
                    :deleteItem="deleteIngredient"
            ></app-ingredient-item>
            <v-divider v-if="index + 1 < ingredients.length" :key="`divider-${index}`"></v-divider>
        </v-list>
        </v-card>
    </div>
</template>

<script>
    import IngredientListItem from './IngredientListItem';
    export default {
        components:{
            appIngredientItem:IngredientListItem
        },
        props:{
            ingredients: {
                type: Array,
                required: true
            },
            editIngredient: {
                type: Function,
                required: true
            },
            deleteIngredient: {
                type: Function,
                required: true
            }
        },
        methods:{
            add(newIngredient){
                this.ingredients.push(newIngredient)
            }
        }
    }

</script>
<style scoped>

</style>