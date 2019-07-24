import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../service/recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeform: FormGroup;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {


      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params.id;

          this.editMode = params.id != null;

          this.initForm();
        }
      );
  }

  private initForm() {


    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingr of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount,
                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              ingredients: new FormControl(recipeIngredients)
            })
          );
        }
      }
    }


    this.recipeform = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getControls() {
    return ( this.recipeform.get('ingredients') as FormArray).controls;
  }

  onSubmit() {

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeform.value);
    } else {
      this.recipeService.addRecipe(this.recipeform.value);
    }
  }

  onAddIngredient() {
    ( this.recipeform.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
}
