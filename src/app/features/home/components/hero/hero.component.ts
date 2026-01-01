import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
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
