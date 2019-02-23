import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcallsService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://recipebackend.test/api';
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getSavedRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSavedRecipes`);
  }

  saveRecipe(data) {
    return this.http.post(`${this.baseUrl}/saverecipe`, data)
  }


  deleteRecipe(recipe) {
    return this.http.post<any>(`${this.baseUrl}/deleterecipe`, recipe);
  }

  updateRecipe(recipe) {
    return this.http.post<any>(`${this.baseUrl}/updaterecipe`, recipe);
  }

  

}
