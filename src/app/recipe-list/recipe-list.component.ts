import { Component, OnInit } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe';
import { YummlyService } from "../yummly.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any;
  recipePictures = [];


  
  constructor(
    private recipeService: RecipeService,
    private yummlyService: YummlyService,

    ){}

  ngOnInit() {
    this.yummlyService.getYummlyRecipes("fish soup").subscribe(data => {
      data.matches.forEach(element => {
        console.log(element.imageUrlsBySize);
        this.recipePictures.push(element.imageUrlsBySize[90]);
      });
    });
  }

}
