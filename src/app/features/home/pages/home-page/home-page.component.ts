import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroComponent } from '../../components/hero/hero.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeHeroComponent, RecipeListComponent],
  template: `
    <app-home-hero></app-home-hero>
    
    <section class="categories-section container my-12">
      <div class="flex justify-between items-center mb-8">
        <h2>Categories</h2>
        <button class="view-all-btn" (click)="showAll = !showAll">
          {{ showAll ? 'Show Less' : 'View All Categories' }}
        </button>
      </div>
      
      <div class="categories-grid flex gap-8" [class.expanded]="showAll">
        <div class="category-card" 
             *ngFor="let category of categories"
             [ngClass]="category.class">
          <img [src]="category.image" [alt]="category.name">
          <span>{{ category.name }}</span>
        </div>
      </div>
    </section>

    <app-recipe-list></app-recipe-list>
  `,
  styles: [`
    .my-12 { margin: 80px auto; }
    .view-all-btn {
      background: #E7FAFE;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .categories-grid {
      overflow-x: auto;
      padding-bottom: 20px;
      scrollbar-width: none;
      -ms-overflow-style: none;
      
      &::-webkit-scrollbar { 
        display: none;
      }

      &.expanded {
        flex-wrap: wrap;
        overflow-x: visible;
        justify-content: center;
      }
    }
    .category-card {
      min-width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
        object-fit: contain;
      }
      
      span {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .card-1 { background: linear-gradient(180deg, rgba(112, 130, 70, 0) 0%, rgba(112, 130, 70, 0.1) 100%); }
    .card-2 { background: linear-gradient(180deg, rgba(108, 198, 68, 0) 0%, rgba(108, 198, 68, 0.1) 100%); }
    .card-3 { background: linear-gradient(180deg, rgba(204, 38, 27, 0) 0%, rgba(204, 38, 27, 0.1) 100%); }
    .card-4 { background: linear-gradient(180deg, rgba(240, 158, 0, 0) 0%, rgba(240, 158, 0, 0.1) 100%); }
    .card-5 { background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%); }
    .card-6 { background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%); }
  `]
})
export class HomePageComponent {
  showAll = false;

  categories = [
    { name: 'Breakfast', image: 'https://img.icons8.com/color/96/sushi.png', class: 'card-1' },
    { name: 'Vegan', image: 'https://img.icons8.com/color/96/vegan-food.png', class: 'card-2' },
    { name: 'Meat', image: 'https://img.icons8.com/color/96/steak-medium.png', class: 'card-3' },
    { name: 'Dessert', image: 'https://img.icons8.com/color/96/cake.png', class: 'card-4' },
    { name: 'Lunch', image: 'https://img.icons8.com/color/96/sandwich.png', class: 'card-5' },
    { name: 'Chocolate', image: 'https://img.icons8.com/color/96/chocolate-bar.png', class: 'card-6' },
    { name: 'Breakfast', image: 'https://img.icons8.com/color/96/sushi.png', class: 'card-1' },
    { name: 'Breakfast', image: 'https://img.icons8.com/color/96/sushi.png', class: 'card-1' },
    { name: 'Vegan', image: 'https://img.icons8.com/color/96/vegan-food.png', class: 'card-2' },
    { name: 'Meat', image: 'https://img.icons8.com/color/96/steak-medium.png', class: 'card-3' },
    { name: 'Dessert', image: 'https://img.icons8.com/color/96/cake.png', class: 'card-4' },
    { name: 'Lunch', image: 'https://img.icons8.com/color/96/sandwich.png', class: 'card-5' },
    { name: 'Chocolate', image: 'https://img.icons8.com/color/96/chocolate-bar.png', class: 'card-6' }
  ];
}
