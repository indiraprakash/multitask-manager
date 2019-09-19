import { uuidv4 } from "../utilities/uuid";
import { WorkStep } from "./WorkStep";
import { Ingredient } from "./Ingredient";
import { WorkStepTypes } from "./WorkStepType";

import { mergeArrays } from "./utilities/merge";

export class Recipe {
  title = "";
  id = null;
  workSteps = [];
  ingredients = [];

  constructor(title = "", id = null) {
    this.title = title;
    this.id = id ? id : uuidv4();
  }

  clone() {
    const recipe = new Recipe(this.title, this.id);

    for (const workStep of this.workSteps) {
      recipe.workSteps.push(workStep.clone());
    }

    for (const ingredient of this.ingredients) {
      recipe.ingredients.push(ingredient.clone());
    }

    return recipe;
  }

  static create(recipeObj) {
    const recipe = new Recipe(recipeObj.title, recipeObj.id);

    if (recipeObj.workSteps) {
      for (const workStep of recipeObj.workSteps) {
        recipe.workSteps.push(WorkStep.create(workStep));
      }
    }

    if (recipeObj.ingredients) {
      for (const ingredient of recipeObj.ingredients) {
        recipe.ingredients.push(Ingredient.create(ingredient));
      }
    }

    return recipe;
  }

  static merge(src, dst) {
    dst.title = src.title;

    mergeArrays(src.workSteps, dst.workSteps, WorkStep.merge);
    mergeArrays(src.ingredients, dst.ingredients, Ingredient.merge);
  }

  get subText1() {
    const totalTime = this.workSteps.reduce((current, workStep) => {
      return current + workStep.length;
    }, 0);
    const activeTime = this.workSteps.reduce((current, workStep) => {
      return (
        current + (workStep.type === WorkStepTypes.ACTIVE ? workStep.length : 0)
      );
    }, 0);

    return `Aufwand ${totalTime}/${activeTime} Minuten.`;
  }

  get subText2() {
    return this.ingredients.reduce((current, ing, index) => {
      return (
        current + ing.name + (index == this.ingredients.length - 1 ? "" : ", ")
      );
    }, "");
  }
}
