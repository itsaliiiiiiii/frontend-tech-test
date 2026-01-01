import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
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

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.addRecipe),
      switchMap(({ recipe }) =>
        this.recipeService.createRecipe(recipe).pipe(
          map(newRecipe => RecipeActions.addRecipeSuccess({ recipe: newRecipe })),
          catchError(error => of(RecipeActions.addRecipeFailure({ error })))
        )
      )
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.updateRecipe),
      switchMap(({ recipe }) =>
        this.recipeService.updateRecipe(recipe).pipe(
          map(updatedRecipe => RecipeActions.updateRecipeSuccess({ recipe: updatedRecipe })),
          catchError(error => of(RecipeActions.updateRecipeFailure({ error })))
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.deleteRecipe),
      switchMap(({ id }) =>
        this.recipeService.deleteRecipe(id).pipe(
          map(() => RecipeActions.deleteRecipeSuccess({ id })),
          catchError(error => of(RecipeActions.deleteRecipeFailure({ error })))
        )
      )
    )
  );
}
