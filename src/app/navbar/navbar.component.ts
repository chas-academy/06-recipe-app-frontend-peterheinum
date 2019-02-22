import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  constructor(private auth: AuthService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(e: MouseEvent) {
    e.preventDefault();
    this.token.removeToken();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/recipes');
  }
}
