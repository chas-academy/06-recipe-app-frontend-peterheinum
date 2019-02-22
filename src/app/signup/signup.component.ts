import { Component, OnInit } from '@angular/core';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error = [];

  public form = {
    email: null,
    name: null,
    password: null,
    password_confimation: null
  };

  constructor(
    private apiHelper: WebcallsService,
    private token: TokenService,
    private router: Router,
    private auth:AuthService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.apiHelper.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.token.handle(data.access_token, data.user.email);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/lists');
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
