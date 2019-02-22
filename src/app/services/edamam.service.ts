import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EdamamService {

  constructor(private httpClient:HttpClient) { }


  appid = '9dafcf6d';
  appsecret = '9450bf090837e271862a682d5e507c3b';
  endpoint = 'https://api.edamam.com/api/food-database/';
  

  searchEdamam = (query:string, allergies:string[]) => {
    let formattedUrl = this.formatUrl(query, allergies);
    return this.httpClient.get<any>(formattedUrl);
  }

  formatUrl = (query:string, allergies:string[]) => {
    let coolUrl = `https://api.edamam.com/search?q=${query}&app_id=${this.appid}&app_key=${this.appsecret}`;
    if(allergies.length > 0) coolUrl = coolUrl+'&health=';
    for (let i = 0; i < allergies.length; i++) {
      coolUrl = coolUrl + allergies[i] + '&';
    }
    return coolUrl;
  }

  findDetails = (id) => {
    let myUrl = `https://api.edamam.com/search?q=${id.split('&')[1]}&app_id=${this.appid}&app_key=${this.appsecret}&from=0&to=1`;
    return this.httpClient.get(myUrl);
  }

}
