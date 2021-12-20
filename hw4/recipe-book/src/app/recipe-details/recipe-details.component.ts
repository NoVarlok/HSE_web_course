import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/data/recipe';
import { initial_recipes } from 'src/data/recipe-list';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  activatedRoute: ActivatedRoute;
  recipe: Recipe;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const name = params["name"];
      this.recipe = initial_recipes.find((recipe) => recipe.name == name);
    });
  }

}
