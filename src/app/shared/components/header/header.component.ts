import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <header class="header">
      <div class="container flex justify-center items-center">
        <div class="logo">
          Foodieland<span class="dot">.</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      padding: 24px 0;
      border-bottom: 1px solid #eee;
      background: white;
    }
    .logo {
      font-family: 'Lobster', cursive; /* Or similar script font */
      font-size: 24px;
      font-weight: bold;
    }
    .dot {
      color: #FF6347;
    }
  `]
})
export class HeaderComponent { }
