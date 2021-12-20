import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "recipe-details/:name", component: RecipeDetailsComponent },
      { path: "", redirectTo: "/recipe-details/kekw", pathMatch: "full" },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
