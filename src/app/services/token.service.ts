import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://recipebackend.test/api/login',
    signup: 'http://recipebackend.test/api/signup'
  }
  constructor() { }

  handle(token, email, name) {
    this.setToken(token);
    this.setEmail(email);
    this.setName(name);
  }

  setName(name){
    localStorage.setItem('name', name);
  }

  getName(){
    return localStorage.getItem('name');
  }


  setEmail(email){
    localStorage.setItem('email', email)
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  setToken(token) {
    localStorage.setItem('token', token)
  }


  getToken() {
    return localStorage.getItem('token');
  } 

  removeToken() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    return this.decode(token.split('.')[1]);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }
}