import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../../../shared/models/recipe.model';
import { selectAllRecipes, selectRecipesLoading, selectRecipesError } from '../../../../store/selectors/recipe.selectors';
import * as RecipeActions from '../../../../store/actions/recipe.actions';
import { RecipeCardComponent } from '../../../../shared/components/recipe-card/recipe-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, MatProgressSpinnerModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {
  private store = inject(Store);
  recipes$: Observable<Recipe[]> = this.store.select(selectAllRecipes);
  loading$: Observable<boolean> = this.store.select(selectRecipesLoading);
  error$: Observable<any> = this.store.select(selectRecipesError);

  ngOnInit() {
    this.store.dispatch(RecipeActions.loadRecipes());
  }
}
