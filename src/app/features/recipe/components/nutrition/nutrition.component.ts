import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nutrition } from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.scss'
})
export class NutritionComponent {
  @Input() nutrition!: Nutrition;
}
