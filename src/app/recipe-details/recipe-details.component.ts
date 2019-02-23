import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EdamamService } from '../services/edamam.service';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;
  savedstatus:boolean;
  arrayToString(array) {
    let tempstring = "";
    array.forEach(e => {
      tempstring = tempstring + e + ";"
    });
    return tempstring;
  }

  saveRecipe() {
    let dbModel = this.constructDbModel(this.recipe);
    this.apihelper.saveRecipe(dbModel).subscribe(data => {
      this.savedstatus == true;
      console.log(data);
    });
  }

  constructDbModel(data) {
    console.log(data.healthLabels);
    let dbModel = {
      email: this.token.getEmail(),
      label: data.label,
      calories: data.calories.toString(),
      healthLabels: this.arrayToString(data.healthLabels),
      ingredientLines: this.arrayToString(data.ingredientLines),
      image: data.image
    }
    return dbModel;
  }
  constructor(
    private snapshot: ActivatedRoute,
    private edamamService: EdamamService,
    private apihelper: WebcallsService,
    private token: TokenService
  ) { }

  

  ngOnInit() {
    this.savedstatus = false;
    console.log(this.snapshot.snapshot.params['id']);
    this.edamamService.findDetails(this.snapshot.snapshot.params['id']).subscribe(data => {
      this.recipe = data.hits.map(hit => hit.recipe);
      this.recipe = this.recipe[0];
      console.log(this.recipe);
    });
  }
}
