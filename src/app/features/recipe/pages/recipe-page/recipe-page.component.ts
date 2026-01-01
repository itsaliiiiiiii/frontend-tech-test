import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Recipe } from '../../../../shared/models/recipe.model';
import { selectAllRecipes, selectSelectedRecipe } from '../../../../store/selectors/recipe.selectors';
import * as RecipeActions from '../../../../store/actions/recipe.actions';
import { NutritionComponent } from '../../components/nutrition/nutrition.component';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { DirectionsComponent } from '../../components/directions/directions.component';
import { OtherRecipesComponent } from '../../components/other-recipes/other-recipes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    CommonModule,
    NutritionComponent,
    IngredientsComponent,
    DirectionsComponent,
    OtherRecipesComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  recipe$: Observable<Recipe | null> = this.store.select(selectSelectedRecipe);
  otherRecipes$: Observable<Recipe[]> = combineLatest([
    this.store.select(selectAllRecipes),
    this.store.select(selectSelectedRecipe)
  ]).pipe(
    map(([recipes, currentRecipe]) =>
      recipes
        .filter(r => r.id !== currentRecipe?.id)
        .slice(0, 3)
    )
  );

  ngOnInit() {
    this.store.dispatch(RecipeActions.loadRecipes()); // Ensure recipes are loaded

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(RecipeActions.selectRecipe({ id }));
        // Scroll to top when recipe changes
        window.scrollTo(0, 0);
      }
    });
  }
}
