import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class YummlyService {

  constructor(private httpclient: HttpClient) { }
  searchString:string;

  
//_app_id=${this.appidappid}&_app_key=${this.appkey}

  // getYummlyRecipes = (q:string) => {
  // q = encodeURIComponent(q.trim())
  // this.searchString = q + '&requirePictures=true';
  //   this.httpclient.get(`http://api.yummly.com/v1/recipes?&q=` + this.searchString, {
  //     headers: {
  //       'X-Yummly-App-ID':'bf961eda',
  //       'X-Yummly-App-Key': 'ea969401e668bbbeac4e5c3e91628c73'
  //     },
  //   }).subscribe(res => {
  //     console.log(res);
  //   })
  // }


  appid='bf961eda';
  appkey='ea969401e668bbbeac4e5c3e91628c73';
  getYummlyRecipes = (q:string) => {
    q = encodeURIComponent(q.trim())
    this.searchString = q + '&requirePictures=true';
      return this.httpclient.get<any>(`http://api.yummly.com/v1/api/recipes?_app_id=${this.appid}&_app_key=${this.appkey}&q=${this.searchString}`, {
      })
    }  
}



//https://www.yummly.com/recipe/Baked-Garlic-Brown-Sugar-Chicken-556798
