import { Component, OnInit } from '@angular/core';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  collection = [];
  constructor(
    private apiHelper: WebcallsService,
    private token: TokenService
  ) { }

  ngOnInit() {
    let email = this.token.getEmail();
    this.apiHelper.getSavedRecipes().subscribe(response => {
      response.data.forEach(e => {
        if(e.email == email) this.collection.push(e);
      });
      console.log(this.collection);
    });
  }

}
