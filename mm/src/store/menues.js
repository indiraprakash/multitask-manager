import { removeItemFromArray, replaceItemInArray } from './helpers.js';

const state = {
  menues: [],
  removedItemIds: []
};

const getters = {
  menues: state => {
    return state.menues;
  },
  menue: state => menueId => {
    return state.menues.find(menue => menue.id == menueId);
  },
  recipes: state => menueId => {
    const menue = state.menues.find(menue => menue.id == menueId);
    if(menue) return menue.recipes;
    return [];
  },
  isRecipeInUse: state => recipeId => {

    for(const menue of state.menues) {
      if(menue.recipes.find(recipe => recipe.id === recipeId)) {
        return true;
      }
    }
    return false;
  },
  getMenueIdsWithRecipe: state => recipeId => {
    const menueIds = [];

    state.menues.array.forEach(menue => {
      if(menue.recipes.find(recipe => recipe.id === recipeId)) {
        menueIds.push(menue.id);
      }
    });
    return menueIds;
  },
  removedItemIds: state => {
    return state.removedItemIds;
  }
};

const mutations = {
  addMenue: (state, payload) => {
    state.menues.push(payload.menue.clone());
    // state.menues.push(payload.menue);
  },
  removeMenue: (state, payload) => {
    removeItemFromArray(state.menues, payload.menueId);
  },
  updateMenue: (state, payload) => {
    replaceItemInArray(state.menues, payload.menue);
  },
  setMenues: (state, payload) => {
    state.menues = [];
    for(const menue of payload.menues) {
      state.menues.push(menue.clone());
      // state.menues.push(menue);
    }
  },
  addRecipe: (state, payload) => {

    const menue = state.menues.find(menue => menue.id == payload.menueId);
    if(menue) {
      menue.recipes.push(payload.recipe.clone());
      // menue.recipes.push(payload.recipe);
    }
  },
  removeRecipe: (state, payload) => {
    const menue = state.menues.find(menue => menue.id == payload.menueId);
    if(menue) {
      removeItemFromArray(menue.recipes, payload.recipeId);
    }
  },
  updateWorkStep: (state, payload) => {
    // menueId, recipeId, workStep 
    const menue = state.menues.find(menue => menue.id === payload.menueId);
    if(menue) {
      const recipe = menue.recipes.find(recipe => recipe.id == payload.recipeId);
      if(recipe) {
        replaceItemInArray(recipe.workSteps, payload.workStep)
      }
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
  // 
  // 
  addMenue: (context, payload) => {
    context.commit('addMenue', payload);
  },
  removeMenue: (context, payload) => {
    context.commit('removeMenue', payload);
    context.commit('addRemovedItemId', {id: payload.menueId});
  },
  updateMenue: (context, payload) => {
    context.commit('updateMenue', payload);
  },
  setMenues: (context, payload) => {
    context.commit('setMenues', payload);
  },
  addRecipe: (context, payload) => {
    context.commit('addRecipe', payload);
  },
  removeRecipe: (context, payload) => {
    context.commit('removeRecipe', payload);
    context.commit('addRemovedItemId', {id: payload.recipeId});
  },
  // removeRecipeFromAllMenuesByTitle: (context, payload) => {
  //   context.commit('removeRecipeFromAllMenuesByTitle', payload);
  // },
  // Example:
  // const myRecipeId = '123';
  // const myMenueId = '345'
  // const myWorkStep = new WorkStep(...);
  // updateWorkStep({menueId: myMenueId, recipeId: myRecipeId, workStep: myWorkStep});
  updateWorkStep: (context, payload) => {
    context.commit('updateWorkStep', payload);
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