import { Component } from '@angular/core';
import { YummlyService } from './yummly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipes';

  searchQuery: string;

  searchResult = [];
  constructor(
    private yummlyService: YummlyService,
  ) { }

  Submit(event) {
    console.log(this.searchQuery);
    this.searchYummly(this.searchQuery);
  }
  searchYummly(searchQuery) {
    this.yummlyService.getYummlyRecipes(searchQuery).subscribe(data => {
      console.log(data.matches)
      data.matches.forEach(e => {
        let newImgUrl = e.imageUrlsBySize[90].replace('=s90', '=s300');
        let temp: any;
        temp = { recipeName: e.recipeName, imageUrl: newImgUrl }
        this.searchResult.push(temp);
      });
    });
  }


}
