import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcallsService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://recipebackend.test/api';
  signup(data){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getSavedRecipes(email): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSavedRecipes/${email}`);
  }

  saveRecipe(data){
    return this.http.post(`${this.baseUrl}/saverecipe`, data)
  }

}
