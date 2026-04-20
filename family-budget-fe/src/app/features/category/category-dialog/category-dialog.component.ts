import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{data.category ? 'Modifica' : 'Nuova'}} Categoria</h2>

    <div mat-dialog-content style="display:flex; flex-direction:column; gap:15px; margin-top:10px;">

      <mat-form-field appearance="outline">
        <mat-label>Nome</mat-label>
        <input matInput [(ngModel)]="model.name">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Tipo</mat-label>
        <mat-select [(ngModel)]="model.type">
          <mat-option value="INCOME">Entrata</mat-option>
          <mat-option value="EXPENSE">Uscita</mat-option>
        </mat-select>
      </mat-form-field>

    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Annulla</button>
      <button mat-raised-button color="primary" (click)="save()">Salva</button>
    </div>
  `
})
export class CategoryDialogComponent {

  model: any = {};

  constructor(
    private service: CategoryService,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.category) {
      this.model = { ...data.category };
    } else {
      this.model = {
        name: '',
        type: 'EXPENSE',
        familyId: data.familyId
      };
    }
  }

  save() {
    if (this.model.id) {
      this.service.update(this.model.id, this.model)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.service.create(this.model)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  close() {
    this.dialogRef.close();
  }
}