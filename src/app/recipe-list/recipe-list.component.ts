import { Component, OnInit, Input } from '@angular/core';
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
  recipePictures: Recipe[];


  
  constructor(
    private recipeService: RecipeService,
    private yummlyService: YummlyService,

    ){}

  handleSearch(event: any){
    console.log(event.target.value);
  }
  
  ngOnInit() {
   this.searchYummly('fish soup');
  }

  searchYummly(searchQuery){
    this.recipePictures = this.recipeService.getRecipes();
    // this.yummlyService.getYummlyRecipes(searchQuery).subscribe(data => {
    //   data.matches.forEach(element => {
    //     console.log(element.imageUrlsBySize);
    //     this.recipePictures.push(element.imageUrlsBySize[90]);
    //   });
    // });
  }

}
