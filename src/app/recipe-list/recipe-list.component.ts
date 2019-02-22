import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { Recipe } from '../recipe';
import { YummlyService } from "../services/yummly.service";
import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from '@angular/core';
import { EdamamService } from '../services/edamam.service';
import { isUndefined } from 'util';


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
  filterOption: any;
  title = 'recipes';
  searchQuery: string;
  edamamcheck: boolean;
  yummlycheck: boolean;
  searchResult = [];
  oldResult = [];
  healthLabelArray = [];
  dietLabelArray = [];

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
        let tempHealthArray = [];
        let tempDietArray = [];
        let uri = e.recipe.uri.split('recipe_')[1];

        e.recipe.healthLabels.map(healthLabel => {
          this.healthLabelArray.push(healthLabel);
          tempHealthArray.push(healthLabel);
        });
        e.recipe.dietLabels.map(dietLabel => {
          this.dietLabelArray.push(dietLabel);
          tempDietArray.push(dietLabel);
        })
        temp = { recipeName: e.recipe.label, imageUrl: e.recipe.image, urlId: uri, health: tempHealthArray, diet: tempDietArray, visible: true }
        this.searchResult.push(temp);
      });
      this.dietLabelArray = this.removeDups(this.dietLabelArray);
      this.healthLabelArray = this.removeDups(this.healthLabelArray);
    });
  }





  filterResults() {
    let filter = this.filterOption;
    if (this.filterOption.split(':')[0] == "health") {
      let filter = this.filterOption.split(':')[1];
      if (this.searchResult.length > 0 && filter != "") {
        this.searchResult.map(element => {
          if (!element.health.includes(filter)) {
            element.visible = false;
          }
          else if (element.health.includes(filter)) {
            element.visible = true;
          }
        })
      }
    }
    if (this.filterOption.split(':')[0] == "diet") {
      let filter = this.filterOption.split(':')[1];
      if (this.searchResult.length > 0 && filter != "") {
        this.searchResult.map(element => {
          if (!element.diet.includes(filter)) {
            element.visible = false;
          }
          else if (element.diet.includes(filter)) {
            element.visible = true;
          }
        })
      }
    }
  }




  removeDups(arr) {
    let unique = {};
    arr.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  submit() {
    this.searchEdamam();
  }

  // searchYummly() { //RIP 
  //   this.yummlyService.getYummlyRecipes(this.searchQuery).subscribe(data => {
  //     this.searchResult = [];
  //     console.log(data.matches);
  //     data.matches.forEach(e => {
  //       let newImgUrl = e.imageUrlsBySize[90].replace('=s90', '=s300');
  //       let temp: any;
  //       temp = { recipeName: e.recipeName, imageUrl: newImgUrl }
  //       this.searchResult.push(temp);
  //     });
  //   });
  // }
}
