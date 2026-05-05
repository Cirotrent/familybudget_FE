import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionResponse } from '../../../models/transaction-request.service';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
   templateUrl: './transaction-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class TransactionListComponent {
  @Input() transactions: any[] = [];
  @Input() totalElements: number = 0;
  @Input() pageIndex: number = 0;
  @Output() delete = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<PageEvent>();

   displayedColumns = ['date', 'description', 'type', 'amount', 'actions'];

  onDelete(id: number) {
    this.delete.emit(id);
  }
  
  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}