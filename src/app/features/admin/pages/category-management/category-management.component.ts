import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService, Category } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Category Management</h2>
        <a mat-raised-button color="primary" routerLink="/admin/categories/new">
          <mat-icon>add</mat-icon> Add Category
        </a>
      </div>

      <table mat-table [dataSource]="categories" class="w-full">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let category"> {{category.id}} </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let category"> {{category.name}} </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let category">
            <a mat-icon-button color="primary" [routerLink]="['/admin/categories/edit', category.id]">
              <mat-icon>edit</mat-icon>
            </a>
            <button mat-icon-button color="warn" (click)="deleteCategory(category)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  deleteCategory(category: Category): void {
    if (confirm(`Are you sure you want to delete ${category.name}?`)) {
      this.categoryService.deleteCategory(category.id!).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
