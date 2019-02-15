import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe';
import { YummlyService } from "../yummly.service";
import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from '@angular/core';
import { EdamamService } from '../edamam.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input() recipeArray = [];
  constructor(
    private yummlyService: YummlyService,
    private edamamService: EdamamService,
  ) { }

  
  handleSearch(event: any) {
    console.log(event.target.value);
  }

  ngOnInit() {

  }

  title = 'recipes';
  searchQuery: string;
  edamamcheck: boolean;
  yummlycheck: boolean;
  searchResult = [];
 
  searchEdamam() {
    let allergies = [];
    let query: string;
    if (this.searchQuery.split('+')[1] == undefined) {
      query = this.searchQuery;
    } else {
      for (let i = 0; i < this.searchQuery.split('+').length; i++) {
        if (i == 0) query = this.searchQuery.split('+')[i];
        if (i > 0) allergies.push(this.searchQuery.split('+')[i])
      }
    }
    this.edamamService.searchEdamam(query, allergies).subscribe(data => {
      this.searchResult = [];
      data.hits.forEach(e => {
        console.log(e);
        let temp: any;
        let uri = e.recipe.uri.split('recipe_')[1];
        console.log(uri);
        temp = { recipeName: e.recipe.label, imageUrl: e.recipe.image, urlId: uri }
        this.searchResult.push(temp);
      });
    });
  }


  submit() {
    this.searchEdamam();
    // if (this.edamamcheck && this.yummlycheck) {
    //   this.searchQuery = 'STOP RIGHT NOW';
    // }
    // else {
    //   if (this.edamamcheck) {
    //     this.searchEdamam();
    //   }
    //   if (this.yummlycheck) {
    //     this.searchYummly();
    //   }
    // }
  }

  searchYummly() {
    this.yummlyService.getYummlyRecipes(this.searchQuery).subscribe(data => {
      this.searchResult = [];
      console.log(data.matches);
      data.matches.forEach(e => {
        let newImgUrl = e.imageUrlsBySize[90].replace('=s90', '=s300');
        let temp: any;
        temp = { recipeName: e.recipeName, imageUrl: newImgUrl }
        this.searchResult.push(temp);
      });
    });
  }
}
