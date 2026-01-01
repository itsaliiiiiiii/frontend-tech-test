import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Recipe } from '../../../../shared/models/recipe.model';
import { selectAllRecipes, selectSelectedRecipe } from '../../../../store/selectors/recipe.selectors';
import * as RecipeActions from '../../../../store/actions/recipe.actions';
import { NutritionComponent } from '../../components/nutrition/nutrition.component';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { DirectionsComponent } from '../../components/directions/directions.component';
import { OtherRecipesComponent } from '../../components/other-recipes/other-recipes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    CommonModule,
    NutritionComponent,
    IngredientsComponent,
    DirectionsComponent,
    OtherRecipesComponent,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="recipe-page container my-8" *ngIf="recipe$ | async as recipe">
      <div class="recipe-header mb-8">
        <div class="title-section flex justify-between items-start">
           <div>
             <h1>{{ recipe.title }}</h1>
             <div class="meta flex items-center gap-8 mt-4">
               <div class="author flex items-center gap-2">
                 <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author">
                 <div>
                   <div class="name">{{ recipe.author }}</div>
                   <div class="date">{{ recipe.date | date }}</div>
                 </div>
               </div>
               <div class="divider"></div>
               <div class="prep-time flex items-center gap-2">
                 <mat-icon>schedule</mat-icon>
                 <div>
                   <div class="label">PREP TIME</div>
                   <div class="val">{{ recipe.prepTime }} Minutes</div>
                 </div>
               </div>
               <div class="divider"></div>
               <div class="cook-time flex items-center gap-2">
                 <mat-icon>schedule</mat-icon>
                 <div>
                   <div class="label">COOK TIME</div>
                   <div class="val">{{ recipe.cookTime }} Minutes</div>
                 </div>
               </div>
               <div class="divider"></div>
               <div class="category flex items-center gap-2">
                 <mat-icon>restaurant</mat-icon>
                 <div>
                   <div class="val">{{ recipe.category }}</div>
                 </div>
               </div>
             </div>
           </div>
           
           <div class="actions flex gap-4">
             <button mat-mini-fab class="action-btn"><mat-icon>print</mat-icon></button>
             <button mat-mini-fab class="action-btn"><mat-icon>share</mat-icon></button>
           </div>
        </div>
        
      </div>
      
      <div class="hero-image-section mb-12 flex gap-8">
        <div class="main-image flex-2">
          <img [src]="recipe.image" [alt]="recipe.title">
          <!-- Play button overlay if video -->
        </div>
        <div class="nutrition-section flex-1 ">
          <app-nutrition [nutrition]="recipe.nutrition"></app-nutrition>
          <app-other-recipes [recipes]="(otherRecipes$ | async) || []"></app-other-recipes>
        </div>
      </div>
      
      <p class="description mb-12">
        {{ recipe.description }}
      </p>
      
      <div class="content-grid grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="main-content col-span-2">
          <app-ingredients 
            [ingredients]="recipe.ingredients" 
            [sauceIngredients]="recipe.sauceIngredients || []">
          </app-ingredients>
          
          <app-directions [directions]="recipe.directions"></app-directions>
        </div>
        
        
      </div>

  `,
  styles: [`
    .my-8 { margin-top: 32px; margin-bottom: 32px; }
    .mb-8 { margin-bottom: 32px; }
    .mb-12 { margin-bottom: 48px; }
    .gap-4 { gap: 16px; }
    .gap-6 { gap: 24px; }
    .gap-8 { gap: 32px; }
    .gap-12 { gap: 48px; }
    .flex-col { flex-direction: column; }
    
    h1 { font-size: 48px; margin-bottom: 16px; }
    
    .meta {
      .divider { width: 1px; height: 40px; background: #eee; }
      .label { font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
      .val { font-size: 14px; color: var(--color-text-muted); }
      .name { font-weight: 700; }
      .date { font-size: 12px; color: var(--color-text-muted); }
      img { width: 40px; height: 40px; border-radius: 50%; }
    }
    
    .action-btn {
      background: #E7FAFE;
      color: black;
      box-shadow: none;
    }
    
    .hero-image-section {
      display: flex;
      align-items: flex-start;
      
      .main-image {
        flex: 2;
        img {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          object-fit: cover;
          min-height: 400px;
        }
      }
      .nutrition-section {
        flex: 1;
      }
    }
    
    .description {
      font-size: 16px;
      color: var(--color-text-muted);
      line-height: 1.8;
    }
    
    @media (max-width: 1024px) {
      .hero-image-section {
        flex-direction: column;
        .main-image { width: 100%; }
        .nutrition-section { width: 100%; }
      }
    }
  `]
})
export class RecipePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  recipe$: Observable<Recipe | null> = this.store.select(selectSelectedRecipe);
  otherRecipes$: Observable<Recipe[]> = combineLatest([
    this.store.select(selectAllRecipes),
    this.store.select(selectSelectedRecipe)
  ]).pipe(
    map(([recipes, currentRecipe]) =>
      recipes
        .filter(r => r.id !== currentRecipe?.id)
        .slice(0, 3)
    )
  );

  ngOnInit() {
    this.store.dispatch(RecipeActions.loadRecipes()); // Ensure recipes are loaded

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(RecipeActions.selectRecipe({ id }));
        // Scroll to top when recipe changes
        window.scrollTo(0, 0);
      }
    });
  }
}
