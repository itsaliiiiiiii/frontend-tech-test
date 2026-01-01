import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../../shared/models/recipe.model';
import * as RecipeActions from '../actions/recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipeId: string | null;
  loading: boolean;
  error: any;
}

export const initialState: RecipeState = {
  recipes: [],
  selectedRecipeId: null,
  loading: false,
  error: null
};

export const recipeReducer = createReducer(
  initialState,
  on(RecipeActions.loadRecipes, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RecipeActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false
  })),
  on(RecipeActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(RecipeActions.selectRecipe, (state, { id }) => ({
    ...state,
    selectedRecipeId: id
  }))
);
