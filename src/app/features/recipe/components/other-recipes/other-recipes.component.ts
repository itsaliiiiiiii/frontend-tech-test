import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-other-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar">
      <h3  >Other Recipe</h3>
      <div class="other-recipes-list flex flex-col gap-8">
         <div class="other-recipe-card flex gap-6" *ngFor="let r of recipes">
           <img [src]="r.image" class="thumb">
           <div class="info">
             <h4>{{ r.title }}</h4>
             <div class="author">By {{ r.author }}</div>
           </div>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .gap-6 { gap: 24px; }
    .gap-8 { gap: 32px; }
    .flex-col { flex-direction: column; }
    .flex { display: flex; }

    .sidebar {
      h3 { 
        font-size: 24px; 
        margin-bottom: 32px;
        font-weight: 600;
        padding-top: 32px;
      }
      
      .other-recipe-card {
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: translateY(-4px);
          h4 { color: var(--color-accent, #FF6347); }
        }

        .thumb {
          width: 120px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .author {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
      }
    }
  `]
})
export class OtherRecipesComponent {
  @Input() recipes: Recipe[] = [];
}
