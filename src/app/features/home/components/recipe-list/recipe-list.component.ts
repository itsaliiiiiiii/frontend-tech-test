import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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
  
  private categorySubject = new BehaviorSubject<string | null>(null);
  
  @Input() set category(value: string | null) {
    this.categorySubject.next(value);
  }

  recipes$: Observable<Recipe[]> = combineLatest([
    this.store.select(selectAllRecipes),
    this.categorySubject
  ]).pipe(
    map(([recipes, category]) => {
      if (!category) return recipes;
      return recipes.filter(recipe => recipe.category === category);
    })
  );

  loading$: Observable<boolean> = this.store.select(selectRecipesLoading);
  error$: Observable<any> = this.store.select(selectRecipesError);

  ngOnInit() {
    this.store.dispatch(RecipeActions.loadRecipes());
  }
}
