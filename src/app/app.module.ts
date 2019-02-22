import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-router.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { ListsComponent } from './lists/lists.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ListsComponent,
    UpdateRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
