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

  handle(token, email) {
    this.setToken(token);
    this.setEmail(email);
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
    localStorage.removeItem('token');
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
