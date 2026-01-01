import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroComponent } from '../../components/hero/hero.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';
import categoriesData from '../../../../../assets/mock-data/categories.json';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeHeroComponent, RecipeListComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  showAll = false;
  categories = categoriesData;
}
