import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../../shared/models/recipe.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  template: `
    <div class="ingredients-section">
      <h2>Ingredients</h2>
      
      <div class="mb-8" *ngIf="ingredients && ingredients.length > 0">
        <h3>For main dish</h3>
        <div class="ingredient-row" *ngFor="let ingredient of ingredients">
          <mat-checkbox class="custom-checkbox" [(ngModel)]="ingredient.checked" color="primary">
             <span [class.checked]="ingredient.checked">{{ ingredient.name }}</span>
          </mat-checkbox>
        </div>
      </div>
      
      <div *ngIf="sauceIngredients && sauceIngredients.length > 0">
        <h3>For the sauce</h3>
        <div class="ingredient-row" *ngFor="let ingredient of sauceIngredients">
          <mat-checkbox class="custom-checkbox" [(ngModel)]="ingredient.checked" color="primary">
             <span [class.checked]="ingredient.checked">{{ ingredient.name }}</span>
          </mat-checkbox>
        </div>
      </div>
      
      <div *ngIf="(!ingredients || ingredients.length === 0) && (!sauceIngredients || sauceIngredients.length === 0)">
        <p>No ingredients listed.</p>
      </div>
    </div>
  `,
  styles: [`
    .ingredients-section {
      margin-bottom: 48px;
    }
    h2 {
      font-size: 36px;
      margin-bottom: 32px;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 24px;
      margin-top: 24px;
    }
    .ingredient-row {
      width: 100%;
      padding: 16px 0;
      border-bottom: 1px solid #eee;
    }
    mat-checkbox {
      width: 100%;
      display: flex;
    }
    .checked {
      text-decoration: line-through;
      color: var(--color-text-muted);
      opacity: 0.5;
    }
    /* Customizing checkbox color requires deep selector or theme override, relying on default accent for now or global styles */
  `]
})
export class IngredientsComponent {
  @Input() ingredients: Ingredient[] = [];
  @Input() sauceIngredients: Ingredient[] = [];
}
