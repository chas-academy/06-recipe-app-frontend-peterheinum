import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe';
import { YummlyService } from "../yummly.service";
import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from '@angular/core';
import { EdamamService } from '../edamam.service';
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
        let tempLabels = [];
        let uri = e.recipe.uri.split('recipe_')[1];

        e.recipe.healthLabels.map(healthLabel => {
          this.healthLabelArray.push(healthLabel);
          tempLabels.push(healthLabel);
        });

        temp = { recipeName: e.recipe.label, imageUrl: e.recipe.image, urlId: uri, health: tempLabels, visible: true }
        this.searchResult.push(temp);
      });
      this.healthLabelArray = this.removeDups(this.healthLabelArray);
    });
  }


  filterHealth() {
    console.log(this.filterOption);
    this.oldResult = this.searchResult;
    //this.searchResult = [];
    this.oldResult.forEach(e => {
      e.health.forEach(x => {
        //console.log(this.filterOption + " : " + x);
        if (x != this.filterOption) {
          console.log(e);
          this.searchResult.push(e);
        }

      });
      //this.searchResult = this.removeDups(this.searchresult)
    });
  }


  filterResults() {
    let filter = this.filterOption;
    if (this.searchResult.length > 0 && filter != "") {
      console.log(filter);
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
