import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe first',
               'This is a simply test',
               'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/recipes/tangy_skillet_chicken_recipe/300x300_tangy_skillet_chicken_recipe.jpg?resize=300px:*',
               [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20)
               ]),
               new Recipe('A test recipe second',
               'This is a simply test 2',
               'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/recipes/tangy_skillet_chicken_recipe/300x300_tangy_skillet_chicken_recipe.jpg?resize=300px:*',
               [
                new Ingredient('Meat 123', 1),
                new Ingredient('French fries 123', 20)
               ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {

    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
  }
}
