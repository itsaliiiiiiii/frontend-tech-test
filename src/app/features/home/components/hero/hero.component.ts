import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="hero-container container mt-8">
      <div class="hero-card flex flex-col lg:flex-row">
        <div class="content flex-1">
           <div class="badge-pill mb-4 flex items-center gap-4">
             <mat-icon>trending_up</mat-icon> Hot Recipes
           </div>
           <h1>Spicy delicious chicken wings</h1>
           <p class="description">
             Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.
           </p>
           
           <div class="meta flex items-center gap-4 mb-8">
             <div class="chip">
               <mat-icon>schedule</mat-icon> 30 Minutes
             </div>
             <div class="chip">
               <mat-icon>restaurant</mat-icon> Chicken
             </div>
           </div>
           <div class="setSpace"> </div>
           <div class="footer flex justify-between items-center">
             <div class="author flex items-center gap-4">
               <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Smith">
               <div>
                 <div class="name">John Smith</div>
                 <div class="date">15 March 2022</div>
               </div>
             </div>
             
             <button mat-flat-button color="primary" class="view-btn">
               View Recipes <mat-icon>play_circle_filled</mat-icon>
             </button>
           </div>
        </div>
        
        <div class="image-section flex-1">
          <img src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Chicken Wings">
          <button class="badge-circle" (click)="toggleLike()" [class.active]="isLiked">
            <mat-icon>{{ isLiked ? 'favorite' : 'favorite_border' }}</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-container {
      margin-top: 32px;
    }
    .hero-card {
      background: #E7FAFE;
      border-radius: 30px;
      overflow: hidden;
    }
    .content {
      padding: 48px;
      display: flex;
      flex-direction: column;
    }
    .badge-pill {
      background: white;
      border-radius: 20px;
      padding: 8px 16px;
      display: inline-flex;
      font-weight: 600;
      font-size: 14px;
    }
    h1 {
      font-size: 48px;
      margin: 24px 0;
      line-height: 1.2;
    }
    .description {
      margin-bottom: 24px;
      color: var(--color-text-muted);
    }
    .chip {
      background: rgba(0,0,0,0.05);
      padding: 8px 16px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .setSpace{
      flex: 1;
      height:auto;
    }
    .author img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .name { font-weight: 700; }
    .date { font-size: 12px; color: var(--color-text-muted); }
    .view-btn {
      background: black;
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
    }
    .image-section {
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .badge-circle {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);

      &.active {
        color: #FF6347;
      }
      
      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `]
})
export class HomeHeroComponent implements OnInit {
  isLiked = false;
  private readonly HERO_ID = 'hero-featured-1';

  ngOnInit() {
    this.checkLikeStatus();
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.updateLocalStorage();
  }

  private checkLikeStatus() {
    const liked = localStorage.getItem('liked_recipes');
    if (liked) {
      const likedIds = JSON.parse(liked);
      this.isLiked = likedIds.includes(this.HERO_ID);
    }
  }

  private updateLocalStorage() {
    const liked = localStorage.getItem('liked_recipes');
    let likedIds = liked ? JSON.parse(liked) : [];

    if (this.isLiked) {
      if (!likedIds.includes(this.HERO_ID)) {
        likedIds.push(this.HERO_ID);
      }
    } else {
      likedIds = likedIds.filter((id: string) => id !== this.HERO_ID);
    }

    localStorage.setItem('liked_recipes', JSON.stringify(likedIds));
  }
}
