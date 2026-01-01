import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RecipeManagementComponent } from './pages/recipe-management/recipe-management.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
      { path: 'recipes', component: RecipeManagementComponent },
      { path: 'recipes/new', component: RecipeFormComponent },
      { path: 'recipes/:id/edit', component: RecipeFormComponent }
    ]
  }
];
