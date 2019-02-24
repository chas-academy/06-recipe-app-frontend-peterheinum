import { Component, OnInit } from '@angular/core';
import { WebcallsService } from '../services/webcalls.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error = null;
  public form = {
    email: null,
    password: null
  }

  constructor(
    private apiHelper: WebcallsService,
    private token: TokenService,
    private router: Router,
    private auth:AuthService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
     this.apiHelper.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.token.handle(data.access_token, data.user.email, data.user.name);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/lists');
  }

  handleError(error){
    this.error = error.error.error;
  }
}
