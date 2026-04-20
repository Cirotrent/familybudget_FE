import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Category } from '../../../models/category.service';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, MatButtonModule],
  template: `
    <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom:20px;">
      <h2>Categorie</h2>
      <button mat-raised-button color="primary" (click)="openDialog()">Nuova Categoria</button>
    </div>

    <app-category-list
      [categories]="categories"
      (edit)="openDialog($event)"
      (delete)="delete($event)">
    </app-category-list>
  `
})
export class CategoryPageComponent implements OnInit {

  categories: Category[] = [];
  familyId = 1; // 🔥 poi lo prenderemo da context

  constructor(
    private service: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll(this.familyId).subscribe(res => this.categories = res);
  }

  openDialog(category?: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { category, familyId: this.familyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }
}