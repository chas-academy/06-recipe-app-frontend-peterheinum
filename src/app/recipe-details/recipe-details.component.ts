import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { EdamamService } from '../services/edamam.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe = this.snapshot.params.pipe(
    map(params => params.id),
    switchMap(id => this.edamamService.findDetails(id)),
    map((data:any) => data.hits[0].recipe),
    tap(console.log)
    )
    
    name = this.recipe.pipe(map(recipe => recipe.label));
    ingredients = this.recipe.pipe(map(recipe => recipe.ingredientLines));
    image = this.recipe.pipe(map(recipe => recipe.image));

  constructor(
    private snapshot: ActivatedRoute,
    private edamamService: EdamamService,
  ) { }

  ngOnInit() {
    
  }

}
