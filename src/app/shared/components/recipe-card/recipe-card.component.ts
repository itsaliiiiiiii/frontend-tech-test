import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatCardModule],
  template: `
    <div class="recipe-card" *ngIf="recipe">
      <div class="image-container">
        <img [src]="recipe.image" [alt]="recipe.title">
        <button class="favorite-btn" (click)="toggleLike($event)" [class.active]="isLiked">
          <mat-icon>{{ isLiked ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>
      <div class="content">
        <h3 [routerLink]="['/recipes', recipe.id]">{{ recipe.title }}</h3>
        <div class="meta flex items-center gap-4">
          <span class="time flex items-center gap-1">
             <mat-icon class="small-icon">schedule</mat-icon> {{ recipe.prepTime + recipe.cookTime }} Minutes
          </span>
          <span class="category flex items-center gap-1">
             <mat-icon class="small-icon">restaurant</mat-icon> {{ recipe.category }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipe-card {
      background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%), #FFFFFF;
      border-radius: 30px;
      padding: 16px;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-4px);
      }
    }
    .image-container {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 16px;
      
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 20px;
      }
    }
    .favorite-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ccc;
      
      &.active { color: #FF6347; }
    }
    h3 {
      font-size: 18px;
      margin-bottom: 16px;
      cursor: pointer;
      line-height: 1.4;
      
      &:hover {
        color: var(--color-accent);
      }
    }
    .meta {
      font-size: 14px;
      color: var(--color-text-muted);
    }
    .small-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
  `]
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;
  isLiked = false;

  ngOnInit() {
    this.checkLikeStatus();
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isLiked = !this.isLiked;
    this.updateLocalStorage();
  }

  private checkLikeStatus() {
    if (!this.recipe) return;
    const liked = localStorage.getItem('liked_recipes');
    if (liked) {
      const likedIds = JSON.parse(liked);
      this.isLiked = likedIds.includes(this.recipe.id);
    }
  }

  private updateLocalStorage() {
    if (!this.recipe) return;
    const liked = localStorage.getItem('liked_recipes');
    let likedIds = liked ? JSON.parse(liked) : [];

    if (this.isLiked) {
      if (!likedIds.includes(this.recipe.id)) {
        likedIds.push(this.recipe.id);
      }
    } else {
      likedIds = likedIds.filter((id: string) => id !== this.recipe.id);
    }

    localStorage.setItem('liked_recipes', JSON.stringify(likedIds));
  }
}
