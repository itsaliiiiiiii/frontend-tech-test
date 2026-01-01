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

// CRUD Actions
export const addRecipe = createAction(
  '[Recipe] Add Recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{ id: string }>()
);
