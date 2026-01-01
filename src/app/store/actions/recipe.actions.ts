import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../shared/models/recipe.model';

export const loadRecipes = createAction('[Recipe] Load Recipes');

export const loadRecipesSuccess = createAction(
  '[Recipe] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipe] Load Recipes Failure',
  props<{ error: any }>()
);

export const selectRecipe = createAction(
  '[Recipe] Select Recipe',
  props<{ id: string }>()
);
