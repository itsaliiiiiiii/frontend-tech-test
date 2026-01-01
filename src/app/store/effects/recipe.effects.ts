import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RecipeService } from '../../core/services/recipe.service';
import * as RecipeActions from '../actions/recipe.actions';

@Injectable()
export class RecipeEffects {
  private actions$ = inject(Actions);
  private recipeService = inject(RecipeService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      mergeMap(() =>
        this.recipeService.getRecipes().pipe(
          map(recipes => RecipeActions.loadRecipesSuccess({ recipes })),
          catchError(error => of(RecipeActions.loadRecipesFailure({ error })))
        )
      )
    )
  );
}
