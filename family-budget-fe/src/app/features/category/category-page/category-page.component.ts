import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Category } from '../../../models/category.service';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { FamilyService } from '../../../core/services/family.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryListComponent,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom:20px;">
      <h2>Categorie</h2>

      <mat-form-field appearance="outline">
        <mat-label>Famiglia</mat-label>
        <mat-select [(ngModel)]="familyId" (selectionChange)="onFamilyChange()">
          <mat-option *ngFor="let f of families" [value]="f.id">
            {{f.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>

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
  families: any[] = [];
  familyId = 1; 

  constructor(
    private categoryService: CategoryService,
    private familyService: FamilyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadFamilies();
  }

  loadFamilies() {
    this.familyService.getFamilies().subscribe(res => {
      this.families = res;
      if (this.families.length > 0) {
        this.familyId = this.families[0].id
        // this.form.patchValue({
        //   familyId: this.families[0].id,
        //   type: 'EXPENSE'
        // });
        this.categoryService.getAll(this.familyId).subscribe(res => this.categories = res);
        
          }
    }
    );
  }

  loadCategory() {
    this.categoryService.getAll(this.familyId).subscribe(res => this.categories = res);
  }

  onFamilyChange() {
    this.loadCategory();
  }

  openDialog(category?: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { category, families: this.families, selectedFamilyId: this.familyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCategory();
    });
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => this.loadCategory());
  }
}