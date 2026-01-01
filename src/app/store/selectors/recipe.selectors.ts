import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RecipeState } from '../reducers/recipe.reducer';
import { Recipe } from '../../shared/models/recipe.model';

export const selectRecipeState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.recipes
);

export const selectRecipesLoading = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.loading
);

export const selectRecipesError = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.error
);

export const selectSelectedRecipeId = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.selectedRecipeId
);

export const selectSelectedRecipe = createSelector(
  selectAllRecipes,
  selectSelectedRecipeId,
  (recipes: Recipe[], id: string | null) => {
    if (id && recipes) {
      return recipes.find(r => r.id === id) || null;
    }
    return null;
  }
);
