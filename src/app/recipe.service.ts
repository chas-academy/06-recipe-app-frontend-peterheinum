import { Injectable } from '@angular/core';
import { Recipe } from './recipe'
import { recipes } from "./mock-recipes";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  public getRecipes(): Recipe[] {
    return recipes;
  }
  constructor(private recipeService: RecipeService) { }
}


