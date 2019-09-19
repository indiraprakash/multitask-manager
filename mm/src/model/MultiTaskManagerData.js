import { Recipe } from "./Recipe";
import { Menue } from "./Menue";

import { mergeArrays, removeFromArrayById } from './utilities/merge';

export class MultiTaskManagerData {
  name = '';
  version = 1;
  recipes = [];
  menues = [];

  constructor(name, version) {
    this.name = name;
    this.version = version;
  }
  
  _clone() {
    const multiTaskManagerData = new MultiTaskManagerData(this.name, this.version);
    for(const recipe of this.recipes) {
      multiTaskManagerData.recipes.push(recipe.clone());
    }
    for(const menue of this.menues) {
      multiTaskManagerData.menues.push(menue.clone());
    }
    return multiTaskManagerData;
  }

  static create(multiTaskManagerDataObj) {
    
    const version = multiTaskManagerDataObj.version ? multiTaskManagerDataObj.version : 1;

    const multiTaskManagerData = new MultiTaskManagerData(multiTaskManagerDataObj.name, version);
    if(multiTaskManagerDataObj.recipes) {
      for(const recipe of multiTaskManagerDataObj.recipes) {
        multiTaskManagerData.recipes.push(Recipe.create(recipe));
      }
    }
    if(multiTaskManagerDataObj.menues) {
      for(const menue of multiTaskManagerDataObj.menues) {
        multiTaskManagerData.menues.push(Menue.create(menue));
      }
    }
    return multiTaskManagerData;
  }

  removeItemsByIds(menuesItemIds, recipesItemIds) {

    function removeFromRecipesById(recipes, id) {

      if(removeFromArrayById(recipes, id)) return true;

      for(const recipe of recipes) {
        if(removeFromArrayById(recipe.ingredients, id)) return true;
        if(removeFromArrayById(recipe.workSteps, id)) return true;
      }
      return false;
    }

    if(menuesItemIds) {
      itemIds_Loop:
      for(const id of menuesItemIds) {
        if(removeFromArrayById(this.menues, id)) continue;
        for(const menue of this.menues) {
          if(removeFromRecipesById(menue.recipes, id)) continue  itemIds_Loop;
        }
      }
    }
    if(recipesItemIds) {
      for(const id of recipesItemIds) {
        if(removeFromRecipesById(this.recipes, id)) continue;
      }
    }

  }

  static merge(src, dst, srcRemovedMenueItemIds, srcRemovedRecipeItemIds) {

    dst.name = src.name;
    dst.removeItemsByIds(srcRemovedMenueItemIds, srcRemovedRecipeItemIds);
    mergeArrays(src.recipes, dst.recipes, Recipe.merge);
    mergeArrays(src.menues, dst.menues, Menue.merge);
  }

}