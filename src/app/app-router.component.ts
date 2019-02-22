import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import { SignupComponent } from './signup/signup.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';


const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/details/:id', component: RecipeDetailsComponent},
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [BeforeLoginService],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'lists', component: ListsComponent, canActivate: [AfterLoginService] },
  { path: 'request-password-reset', component: RequestResetComponent },
  { path: 'reponse-password-reset', component: ResponseResetComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }