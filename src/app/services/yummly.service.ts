import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class YummlyService {

  constructor(private httpclient: HttpClient) { }
  searchString:string;

  appid='bf961eda';
  appkey='ea969401e668bbbeac4e5c3e91628c73';
  getYummlyRecipes = (q:string) => {
    q = encodeURIComponent(q.trim())
    this.searchString = q + '&requirePictures=true';
      return this.httpclient.get<any>(`http://api.yummly.com/v1/api/recipes?_app_id=${this.appid}&_app_key=${this.appkey}&q=${this.searchString}`, {
      })
    }  
}
