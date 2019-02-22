import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  

}
