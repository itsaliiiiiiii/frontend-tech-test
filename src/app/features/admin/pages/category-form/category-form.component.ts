import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="container mx-auto p-4 max-w-lg">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Category' : 'New Category' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="w-full mb-4">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Category Name">
              <mat-error *ngIf="categoryForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="image" placeholder="Image URL">
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
              <mat-label>Style Class</mat-label>
              <input matInput formControlName="styleClass" placeholder="CSS Class">
            </mat-form-field>

            <div class="flex justify-end gap-2">
              <button mat-button type="button" routerLink="/admin/categories">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="categoryForm.invalid">
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      styleClass: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.categoryService.getCategoryById(this.categoryId).subscribe(category => {
        this.categoryForm.patchValue(category);
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      if (this.isEditMode && this.categoryId) {
        this.categoryService.updateCategory(this.categoryId, category).subscribe(() => {
          this.router.navigate(['/admin/categories']);
        });
      } else {
        this.categoryService.createCategory(category).subscribe(() => {
          this.router.navigate(['/admin/categories']);
        });
      }
    }
  }
}
