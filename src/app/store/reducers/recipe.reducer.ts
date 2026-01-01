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
  })),
  // Add Recipe
  on(RecipeActions.addRecipe, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RecipeActions.addRecipeSuccess, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe],
    loading: false
  })),
  on(RecipeActions.addRecipeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Update Recipe
  on(RecipeActions.updateRecipe, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RecipeActions.updateRecipeSuccess, (state, { recipe }) => ({
    ...state,
    recipes: state.recipes.map(r => r.id === recipe.id ? recipe : r),
    selectedRecipeId: state.selectedRecipeId === recipe.id ? recipe.id : state.selectedRecipeId,
    loading: false
  })),
  on(RecipeActions.updateRecipeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Delete Recipe
  on(RecipeActions.deleteRecipe, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RecipeActions.deleteRecipeSuccess, (state, { id }) => ({
    ...state,
    recipes: state.recipes.filter(r => r.id !== id),
    selectedRecipeId: state.selectedRecipeId === id ? null : state.selectedRecipeId,
    loading: false
  })),
  on(RecipeActions.deleteRecipeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
