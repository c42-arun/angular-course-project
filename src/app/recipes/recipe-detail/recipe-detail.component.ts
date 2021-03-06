import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from "../services/recipe-service.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  recipeIndex: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.recipeIndex = +p['id'];
        console.log(':id is --', p['id']);
        this.selectedRecipe = this.recipeService.getRecipes()[this.recipeIndex];

      }
    );
  }

  addRecipeToShoppingList(){
    this.recipeService.addToShoppingList(this.selectedRecipe);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
