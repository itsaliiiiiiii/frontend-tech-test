import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Recipe } from '../../shared/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dataUrl = 'assets/mock-data/recipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.dataUrl);
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.getRecipes().pipe(
      map(recipes => recipes.find(r => r.id === id))
    );
  }
}
