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

export const addRecipeSuccess = createAction(
  '[Recipe] Add Recipe Success',
  props<{ recipe: Recipe }>()
);

export const addRecipeFailure = createAction(
  '[Recipe] Add Recipe Failure',
  props<{ error: any }>()
);

export const updateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipeSuccess = createAction(
  '[Recipe] Update Recipe Success',
  props<{ recipe: Recipe }>()
);

export const updateRecipeFailure = createAction(
  '[Recipe] Update Recipe Failure',
  props<{ error: any }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{ id: string }>()
);

export const deleteRecipeSuccess = createAction(
  '[Recipe] Delete Recipe Success',
  props<{ id: string }>()
);

export const deleteRecipeFailure = createAction(
  '[Recipe] Delete Recipe Failure',
  props<{ error: any }>()
);
