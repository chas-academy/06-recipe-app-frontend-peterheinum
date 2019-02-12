import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  constructor(private recipe: Recipe) { }

  ngOnInit() {
  }

}
