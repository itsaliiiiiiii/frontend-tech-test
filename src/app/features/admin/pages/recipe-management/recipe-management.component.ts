import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../../../shared/models/recipe.model';
import { selectAllRecipes } from '../../../../store/selectors/recipe.selectors';
import * as RecipeActions from '../../../../store/actions/recipe.actions';

@Component({
  selector: 'app-recipe-management',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-management.component.html',
  styleUrl: './recipe-management.component.scss'
})
export class RecipeManagementComponent implements OnInit {
  private store = inject(Store);
  
  recipes$: Observable<Recipe[]> = this.store.select(selectAllRecipes);
  displayedColumns: string[] = ['image', 'title', 'category', 'actions'];

  ngOnInit() {
    this.store.dispatch(RecipeActions.loadRecipes());
  }

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.store.dispatch(RecipeActions.deleteRecipe({ id }));
    }
  }
}
