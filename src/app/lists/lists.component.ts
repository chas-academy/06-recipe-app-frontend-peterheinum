import { Component, OnInit } from '@angular/core';
import { ListserviceService } from '../services/listservice.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private listservice: ListserviceService) { }

  ngOnInit() {
    this.listservice.getSavedRecipes().subscribe(data => {
      console.log(data);
    });
  }

}
