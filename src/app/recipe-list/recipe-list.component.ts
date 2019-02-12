import { Component, OnInit, Input } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe';
import { YummlyService } from "../yummly.service";
import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input() recipeArray = [];

  
  constructor(
    private yummlyService: YummlyService,
    //private recipeService: RecipeService,
    ){}

  handleSearch(event: any){
    console.log(event.target.value);
  }
  
  ngOnInit() {
    //this.recipePictures = this.recipeService.getRecipes();
    // this.recipeArray.push(
    //   "Fish Soup",
    //   "Umbrian Fish Soup",
    //   "Sicilian Fish Soup",
    //   "Creamy Fish Soup",
    //   "Icelandic Fish Soup",
    //   "Sicilian Fish Soup",
    //   "Easy Homemade Italian Fish Soup",
    //   "Italian Fish Soup",
    //   "Tunisian Fish Soup",
    //   "Ling Fish Soup",
    //   );
    //console.log(this.recipeArray);
  }

  

}
