import { Component, OnInit } from '@angular/core';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(
    private apiHelper: WebcallsService,
    private token: TokenService
  ) { }

  ngOnInit() {
    let email = this.token.getEmail();
    this.apiHelper.getSavedRecipes(email).subscribe(data => {
      console.log(data);
    });
  }

}
