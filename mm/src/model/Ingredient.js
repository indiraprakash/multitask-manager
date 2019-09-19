import { uuidv4 } from "../utilities/uuid";

export class Ingredient {

  constructor(name, amount, unit, id = null) {
    this.name = name;
    this.id = id ? id : uuidv4();
    this.amount = amount;
    this.unit = unit;
  }

  static create(ingredientObj) {
    return new Ingredient(
      ingredientObj.name, ingredientObj.amount, ingredientObj.unit, ingredientObj.id);
  }

  clone() {
    return new Ingredient(this.name, this.amount, this.unit, this.id);
  }

  set(ingredient) {
    this.name = ingredient.name;
    this.amount = ingredient.amount;
    this.unit = ingredient.unit;
  }

  static merge(src, dst) {
    dst.name = src.name;
    dst.amount = src.amount;
    dst.unit = src.unit;
  }

}