import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe',
               'THis is a simply test',
               'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/recipes/tangy_skillet_chicken_recipe/300x300_tangy_skillet_chicken_recipe.jpg?resize=300px:*'),
               new Recipe('A test recipe',
               'THis is a simply test',
               'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/recipes/tangy_skillet_chicken_recipe/300x300_tangy_skillet_chicken_recipe.jpg?resize=300px:*')
  ];

  constructor() { }

  ngOnInit() {
  }

}
