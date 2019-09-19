import { uuidv4 } from '../utilities/uuid';
import { Recipe } from './Recipe';

import { mergeArrays } from './utilities/merge';
import { WorkStepTypes } from './WorkStepType';

export class Menue {

  title = '';
  id = null;
  recipes = [];
  
  constructor(title = '', id = null) {
    this.title = title;
    this.id = id ? id : uuidv4();
  }

  clone() {
    const menue = new Menue(this.title, this.id);
    for(const recipe of this.recipes) {
      menue.recipes.push(recipe.clone());
    }
    return menue;
  }

  static create(menueObj) {
    const menue = new Menue(menueObj.title, menueObj.id);
    if(menueObj.recipes) {
      for(const recipe of menueObj.recipes) {
        menue.recipes.push(Recipe.create(recipe));
      }
    }
    return menue;
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
  }

  removeRecipe(recipeId) {
    const index = this.recipes.findIndex(recipe => recipe.id == recipeId);
    if(index != -1) {
      this.recipes.splice(index, 1);
    }
  }

  static merge(src, dst) {
    dst.title = src.title;
    mergeArrays(src.recipes, dst.recipes, Recipe.merge);
  }

  get subText1() {
    return this.recipes.reduce((current, recipe, index) => {
      return current + recipe.title + (index == this.recipes.length -1 ? '' : ', ');
    }, '');
  }

  get subText2() {
    let workStepActiveCount = 0;
    let workStepPassiveCount = 0;
    let ingredientCount = 0;
    // let activeTime = 0;
    // let passiveTime = 0;
    let recipeCount = this.recipes.length;

    for(const recipe of this.recipes) {

      ingredientCount += recipe.ingredients.length;
      
      for(const workStep of recipe.workSteps) {
        if(workStep.type == WorkStepTypes.ACTIVE) {
          // activeTime += workStep.length;
          ++workStepActiveCount;
        }
        else {
          // passiveTime += workStep.length;
          ++workStepPassiveCount;
        }
      }
    }

    return `${recipeCount} Rezepte, ` + 
           `` + 
           `${workStepActiveCount + workStepPassiveCount} Arbeitsschritte, ` +
           //`${workStepActiveCount}(${activeTime} m)/${workStepPassiveCount}(${passiveTime} m) Arbeitsschritte, ` +
           `${ingredientCount} Zutaten`;
  }

}