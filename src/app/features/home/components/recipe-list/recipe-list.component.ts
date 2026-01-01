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
  template: `
    <div class="recipe-list-container container">
      <div class="header text-center mb-12">
        <h2>Simple and tasty recipes</h2>
        <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.</p>
      </div>
      
      <div *ngIf="loading$ | async" class="flex justify-center my-8">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="text-center text-red-500 my-8">
        <p>Error loading recipes: {{ error?.message || error }}</p>
        <p>Please make sure you have restarted 'ng serve' after project structure changes.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8" *ngIf="!(loading$ | async) && !(error$ | async)">
        <app-recipe-card *ngFor="let recipe of (recipes$ | async)?.slice(0, 9)" [recipe]="recipe"></app-recipe-card>
      </div>
    </div>
  `,
  styles: [`
    .recipe-list-container {
      padding: 48px 16px;
    }
    .header {
      margin-bottom: 48px;
      text-align: center;
      
      h2 {
        font-size: 36px;
        margin-bottom: 16px;
      }
      p {
        max-width: 600px;
        margin: 0 auto;
        color: var(--color-text-muted);
      }
    }
  `]
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
