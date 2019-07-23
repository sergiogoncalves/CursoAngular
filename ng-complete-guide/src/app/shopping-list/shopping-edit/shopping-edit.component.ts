import { Ingredient } from './../../shared/ingredient.model';
import {Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;

  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(

      (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
      }
    );
  }

  onSubmit(form: NgForm) {

      const value = form.value;

      const newIngredient = new Ingredient(value.name, value.amount);

      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
      } else {
        this.shoppingListService.addIngredient(newIngredient);
      }

      this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }


}
