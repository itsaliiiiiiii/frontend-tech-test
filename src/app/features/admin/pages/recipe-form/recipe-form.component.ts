import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Recipe } from '../../../../shared/models/recipe.model';
import { selectAllRecipes } from '../../../../store/selectors/recipe.selectors';
import * as RecipeActions from '../../../../store/actions/recipe.actions';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recipeForm: FormGroup;
  isEditMode = false;
  recipeId: string | null = null;

  constructor() {
    this.recipeForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      prepTime: [0, Validators.required],
      cookTime: [0, Validators.required],
      servings: [1, Validators.required],
      nutrition: this.fb.group({
        calories: [0],
        totalFat: [0],
        protein: [0],
        carbohydrate: [0],
        cholesterol: [0]
      }),
      ingredients: this.fb.array([]),
      directions: this.fb.array([])
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get directions() {
    return this.recipeForm.get('directions') as FormArray;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.recipeId = id;
        this.loadRecipe(id);
      } else {
        // Initialize with one empty ingredient and direction for better UX
        this.addIngredient();
        this.addDirection();
      }
    });
  }

  loadRecipe(id: string) {
    this.store.select(selectAllRecipes).pipe(take(1)).subscribe(recipes => {
      const recipe = recipes.find(r => r.id === id);
      if (recipe) {
        this.patchForm(recipe);
      }
    });
  }

  patchForm(recipe: Recipe) {
    this.recipeForm.patchValue({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      author: recipe.author,
      description: recipe.description,
      category: recipe.category,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      nutrition: recipe.nutrition
    });

    // Clear and repopulate ingredients
    this.ingredients.clear();
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ing => {
        this.ingredients.push(this.fb.group({
          name: [ing.name, Validators.required],
          checked: [ing.checked || false]
        }));
      });
    }

    // Clear and repopulate directions
    this.directions.clear();
    if (recipe.directions) {
      recipe.directions.sort((a, b) => a.step - b.step).forEach(dir => {
        this.directions.push(this.fb.group({
          step: [dir.step, Validators.required],
          title: [dir.title, Validators.required],
          description: [dir.description, Validators.required],
          image: [dir.image || '']
        }));
      });
    }
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      checked: [false]
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addDirection() {
    const nextStep = this.directions.length + 1;
    this.directions.push(this.fb.group({
      step: [nextStep, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    }));
  }

  removeDirection(index: number) {
    this.directions.removeAt(index);
    // Re-index steps
    this.directions.controls.forEach((control, i) => {
      control.patchValue({ step: i + 1 });
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipe: Recipe = {
        ...formValue,
        id: this.isEditMode ? this.recipeId! : Date.now().toString(),
        date: new Date().toISOString(),
        sauceIngredients: []
      };

      if (this.isEditMode) {
        this.store.dispatch(RecipeActions.updateRecipe({ recipe }));
      } else {
        this.store.dispatch(RecipeActions.addRecipe({ recipe }));
      }

      this.router.navigate(['/admin/recipes']);
    }
  }
}
