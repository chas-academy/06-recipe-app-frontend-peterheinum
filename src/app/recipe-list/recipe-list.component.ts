import { Component, OnInit } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  Recipies: Recipe[];
  
  getRecipes(): void{
    this.Recipies = RecipeService.getRecipes();
  };
  
  constructor() { }

  ngOnInit() {
  }

}
