import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="flex justify-between items-center mb-8">
          <div class="logo">
            Foodieland<span class="dot">.</span>
            <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, </p>
          </div>
          <div class="nav-links">
             <a href="#">Recipes</a>
             <a href="#">Blog</a>
             <a href="#">Contact</a>
             <a href="#">About us</a>
          </div>
        </div>
        <div class="divider"></div>
        <div class="bottom-bar flex justify-between items-center mt-8">
          <p>© 2020 Flowbase. Powered by Webflow</p>
          <div class="socials">
             <!-- Social icons -->
             <span>FB</span> <span>TW</span> <span>IG</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 48px 0;
      background: white;
      margin-top: 48px;
    }
    .logo {
      font-weight: bold;
      font-size: 20px;
    }
    .dot { color: #FF6347; }
    .nav-links a {
      margin-left: 24px;
      text-decoration: none;
      color: var(--color-primary);
    }
    .divider {
      height: 1px;
      background: #eee;
    }
    .mt-8 { margin-top: 32px; }
    .mb-8 { margin-bottom: 32px; }
    p { font-size: 14px; }
  `]
})
export class FooterComponent {}
