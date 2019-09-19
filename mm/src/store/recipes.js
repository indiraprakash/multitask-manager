import { removeItemFromArray, replaceItemInArray } from './helpers.js';

const state = {
  recipes: [],
  removedItemIds: []
};

const getters = {
  recipes: state => {
    return state.recipes;
  },
  recipesSorted: state => {
    const sortedRecipes = state.recipes;
    sortedRecipes.sort((recipe1, recipe2) => {
      if(recipe1.title < recipe2.title) return -1;
      if(recipe2.title < recipe1.title) return 1;
      return 0;
    });
    return sortedRecipes;
  },
  recipe: state => recipeId => {
    return state.recipes.find(recipe => recipe.id == recipeId);
  },
  removedItemIds: state => {
    return state.removedItemIds;
  }
};

const mutations = {
  addRecipe: (state, payload) => {
    state.recipes.push(payload.recipe.clone());
    // state.recipes.push(payload.recipe);
  },
  removeRecipe: (state, payload) => {
    removeItemFromArray(state.recipes, payload.recipeId);
  },
  updateRecipe: (state, payload) => {
    replaceItemInArray(state.recipes, payload.recipe);
  },
  addIngredient: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    if(recipe) {
      recipe.ingredients.push(payload.ingredient.clone());
      // recipe.ingredients.push(payload.ingredient);
    }
  },
  removeIngredient: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    if(recipe) {
      removeItemFromArray(recipe.ingredients, payload.ingredientId);
    }
  },
  updateIngredient: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    if(recipe) {
      replaceItemInArray(recipe.ingredients, payload.ingredient);
    }
  },
  addWorkStep: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    if(recipe) {
      recipe.workSteps.push(recipe);
    }
  },
  removeWorkStep: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    if(recipe) {
      removeItemFromArray(recipe.workSteps, payload.workStepId);
    }
  },
  updateWorkStep: (state, payload) => {
    const recipe = state.recipes.find(recipe => recipe.id === payload.recipeId);
    replaceItemInArray(recipe.workSteps, payload.workStep);
  },

  setRecipes: (state, payload) => {
    state.recipes = [];
    for(const recipe of payload.recipes) {
      state.recipes.push(recipe.clone());
      // state.recipes.push(recipe);
    }
  },

  addRemovedItemId: (state, payload) => {
    state.removedItemIds.push(payload.id);
  },
  clearRemovedItemIds: (state) => {
    state.removedItemIds = [];
  }

};

const actions = {
  // Example:
  // const myRecipe = new Recipe(...);
  // addRecipe({recipe: myRecipe});
  addRecipe: (context, payload) => {
    context.commit('addRecipe', payload);
  },
  updateRecipe: (context, payload) => {
    context.commit('updateRecipe', payload);
  },
  // Example:
  // removeRecipe({recipeId: '7813570b-3920-4f10-afe1-1d30033836fe'})
  removeRecipe: (context, payload) => {
    context.commit('removeRecipe', payload);
    // context.commit('addRemovedItemId', {id: payload.recipeId}, { root: true });
    context.commit('addRemovedItemId', {id: payload.recipeId});
  },
  // Example:
  // const myIngredient = new Ingredient(...);
  // addIngredient({recipeId: '8cf941b3-614b-417d-a03a-260f9d53a0b8', ingredient: myIngredient});
  addIngredient: (context, payload) => {
    context.commit('addIngredient', payload);
  },
  // Example:
  // const myIngredient = ... <== An ingredient with an id which already exists in the recipe. 
  // updateIngredient({recipeId: '8cf941b3-614b-417d-a03a-260f9d53a0b8', ingredient: myIngredient});
  updateIngredient: (context, payload) => {
    context.commit('updateIngredient', payload);
  },
  // Example:
  // const myRecipeId = '7813570b-3920-4f10-afe1-1d30033836fe';
  // const myIngredientId = '1113570b-3920-4f10-afe1-1d30033836fe';
  // removeIngredient({recipeId: myRecipeId, ingredientId: myIngredientId});
  removeIngredient: (context, payload) => {
    context.commit('removeIngredient', payload);
    context.commit('addRemovedItemId', {id: payload.ingredientId});
  },

  addWorkStep: (context, payload) => {
    context.commit('addWorkStep', payload);
  },
  removeWorkStep: (context, payload) => {
    context.commit('removeWorkStep', payload);
    context.commit('addRemovedItemId', {id: payload.workStepId});
  },

  updateWorkStep: (context, payload) => {
    context.commit('updateWorkStep', payload);
  },

  // Example:
  // const myRecipes = ...;
  // setRecipes({recipes: myRecipes});
  setRecipes: (context, payload) => {
    context.commit('setRecipes', payload);
  },

  addRemovedItemId: (context, payload) => {
    context.commit('addRemovedItemId', payload);
  },

  clearRemovedItemIds: (context) => {
    if(context.state.removedItemIds.length > 0) {
      context.commit('clearRemovedItemIds');
    }
  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};