import { Routes } from '@angular/router';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

export const RECIPE_ROUTES: Routes = [
  {
    path: ':id',
    component: RecipePageComponent
  }
];
