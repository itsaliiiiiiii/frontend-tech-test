import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionStep } from '../../../../shared/models/recipe.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  template: `
    <div class="directions-section">
      <h2>Directions</h2>
      
      <div class="step-row" *ngFor="let step of directions; let last = last">
        <div class="checkbox-container">
           <mat-checkbox class="custom-checkbox" [(ngModel)]="step.checked" color="primary"></mat-checkbox>
        </div>
        <div class="content" [class.checked]="step.checked">
          <h3>{{ step.step }}. {{ step.title }}</h3>
          <p class="description">{{ step.description }}</p>
          <div class="image-container mt-4" *ngIf="step.image">
            <img [src]="step.image" alt="Step image">
          </div>
          <div class="divider my-8" *ngIf="!last"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .directions-section {
      margin-bottom: 48px;
      width:100%;
    }
    h2 {
      font-size: 36px;
      margin-bottom: 32px;
    }
    .step-row {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
    }
    .checkbox-container {
      padding-top: 4px;
    }
    .content {
      flex: 1;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 16px;
      font-family: var(--font-family-serif);
    }
    .checked h3, .checked .description {
      text-decoration: line-through;
      opacity: 0.5;
    }
    .description {
      color: var(--color-text-muted);
      margin-bottom: 16px;
    }
    .image-container img {
      width: 100%;
      border-radius: 20px;
      max-height: 400px;
      object-fit: cover;
    }
    .divider {
      height: 1px;
      background: #eee;
    }
  `]
})
export class DirectionsComponent {
  @Input() directions: DirectionStep[] = [];
}
