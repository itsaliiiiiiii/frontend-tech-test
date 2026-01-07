import { Component, OnInit, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../shared/models/recipe.model';
import { RecipeCardComponent } from '../../../../shared/components/recipe-card/recipe-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private destroy$ = new Subject<void>();
  
  recipes: Recipe[] = [];
  loading = false;
  error: string | null = null;
  
  currentPage = 0;
  pageSize = 9;
  totalPages = 0;
  currentCategory: string | null = null;
  
  @Input() set category(value: string | null) {
    // Only reload if category actually changed (avoid initial double load if inputs are set sequentially)
    if (this.currentCategory !== value) {
      this.currentCategory = value;
      this.resetAndLoad();
    }
  }

  ngOnInit() {
    // Initial load if not triggered by category setter
    if (this.recipes.length === 0 && !this.loading) {
      this.loadRecipes();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetAndLoad() {
    this.recipes = [];
    this.currentPage = 0;
    this.loadRecipes();
  }

  loadRecipes() {
    this.loading = true;
    this.error = null;
    
    this.recipeService.getRecipesPage(this.currentPage, this.pageSize, this.currentCategory || undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (page) => {
          this.recipes = [...this.recipes, ...page.content];
          this.totalPages = page.totalPages;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load recipes';
          this.loading = false;
        }
      });
  }

  loadMore() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadRecipes();
    }
  }
}
