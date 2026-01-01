import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroComponent } from '../../components/hero/hero.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Category } from '../../../../shared/models/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeHeroComponent, RecipeListComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private recipeService = inject(RecipeService);
  showAll = false;
  categories$: Observable<Category[]> | undefined;

  ngOnInit() {
    this.categories$ = this.recipeService.getCategories();
  }
}
