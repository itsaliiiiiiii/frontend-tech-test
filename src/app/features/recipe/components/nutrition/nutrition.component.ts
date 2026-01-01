import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nutrition } from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nutrition-card">
      <h3>Nutrition Information</h3>
      
      <div class="nutrition-row">
        <span class="label">Calories</span>
        <span class="value">{{ nutrition.calories }} kcal</span>
      </div>
      <div class="nutrition-row">
        <span class="label">Total Fat</span>
        <span class="value">{{ nutrition.totalFat }}g</span>
      </div>
      <div class="nutrition-row">
        <span class="label">Protein</span>
        <span class="value">{{ nutrition.protein }}g</span>
      </div>
      <div class="nutrition-row">
        <span class="label">Carbohydrate</span>
        <span class="value">{{ nutrition.carbohydrate }}g</span>
      </div>
      <div class="nutrition-row">
        <span class="label">Cholesterol</span>
        <span class="value">{{ nutrition.cholesterol }}mg</span>
      </div>
      
      <p class="disclaimer">
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  `,
  styles: [`
    .nutrition-card {
      background: #E7FAFE;
      padding: 32px;
      border-radius: 30px;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 24px;
    }
    .nutrition-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      
      &:last-of-type {
        border-bottom: none;
      }
    }
    .label {
      color: var(--color-text-muted);
      font-weight: 500;
    }
    .value {
      font-weight: 700;
      color: var(--color-primary);
    }
    .disclaimer {
      margin-top: 48px;
      text-align: center;
      font-size: 14px;
      color: var(--color-text-muted);
    }
  `]
})
export class NutritionComponent {
  @Input() nutrition!: Nutrition;
}
