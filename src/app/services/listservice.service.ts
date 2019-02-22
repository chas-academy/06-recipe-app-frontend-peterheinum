import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListserviceService {

  constructor(private http: HttpClient) { }
  getSavedRecipes(): Observable<any> {
    return this.http.get('http://recipebackend.test/api/recipe');
  }
}
