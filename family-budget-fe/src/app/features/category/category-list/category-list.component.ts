import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../../models/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="categories" class="mat-elevation-z8" style="width:100%">

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let c"> {{c.name}} </td>
      </ng-container>

      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef> Tipo </th>
        <td mat-cell *matCellDef="let c"> {{c.type}} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Azioni </th>
        <td mat-cell *matCellDef="let c">
          <button mat-button color="primary" (click)="edit.emit(c)">Modifica</button>
          <button mat-button color="warn" (click)="delete.emit(c.id)">Elimina</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['name','type','actions']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name','type','actions'];"></tr>

    </table>
  `
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Category>();
  @Output() delete = new EventEmitter<number>();
}