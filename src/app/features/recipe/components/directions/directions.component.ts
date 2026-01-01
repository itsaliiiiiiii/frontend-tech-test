import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionStep } from '../../../../shared/models/recipe.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.scss'
})
export class DirectionsComponent {
  @Input() directions: DirectionStep[] = [];
}
