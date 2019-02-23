import { Component, OnInit } from '@angular/core';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  collection = [];
  constructor(
    private apiHelper: WebcallsService,
    private token: TokenService,
    private router: Router
  ) { }
  email: any;
  ngOnInit() {
    this.email = this.token.getEmail();
    this.apiHelper.getSavedRecipes().subscribe(response => {
      this.updateCollection(response);
    });
  }
  editRecipe(label, id) { //TODO make it so that not everybody can edit but the owner. 
    let UpdateObj = { label: label, id: id }
    this.apiHelper.updateRecipe(UpdateObj).subscribe(response => {
      this.collection = [];
      this.updateCollection(response);
    })
  }

  routeToDetails(id) {
    let recipe;
    this.collection.forEach(e => {
      if (e.id == id) recipe = e;
    });
    this.router.navigateByUrl(`recipes/details/${recipe.label}&noID`);
  }

  deleteRecipe(id) {
    let recipe;
    this.collection.forEach(e => {
      if (e.id == id) recipe = e;
    });
    this.apiHelper.deleteRecipe(recipe).subscribe(response => {
      this.collection = [];
      this.updateCollection(response);
    })
  }

  updateCollection(apiResponse) {
    apiResponse.data.forEach(e => {
      if (e.email == this.email) this.collection.push(e);
    });
  }
}
