
<template>
  <div>
    <h2>Zutaten</h2>
    <appIngredientList v-if="ingredients != null" :ingredients="ingredients" :editIngredient="editIngredient" :deleteIngredient="deleteIngredient"></appIngredientList>
  </div>
</template>

<script>
import IngredientList from '@/components/IngredientList.vue'

export default {
  name: 'ingredients',
  components: {
    appIngredientList: IngredientList
  },
  props: {
    ingredients: {
        type: Array,
        required: true
    }
  },
  methods: {
    editIngredient(/*ingredient*/){
        // additional tasks
    },
    deleteIngredient(ingredientToDelete){
        const index = this.ingredients.findIndex(element => element.name === ingredientToDelete.name);
        if(index != -1) {
            this.ingredients.splice(index, 1);
        }
    }
  }
}
</script>

<style scoped>

</style>