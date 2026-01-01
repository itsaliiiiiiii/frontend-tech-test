import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-other-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other-recipes.component.html',
  styleUrl: './other-recipes.component.scss'
})
export class OtherRecipesComponent {
  @Input() recipes: Recipe[] = [];
}
