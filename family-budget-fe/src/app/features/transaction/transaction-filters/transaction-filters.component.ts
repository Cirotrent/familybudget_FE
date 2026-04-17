import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

export interface TransactionFilter {
  type?: string;
  startDate?: Date;
  endDate?: Date;
}

@Component({
  selector: 'app-transaction-filters',
  standalone: true,
  templateUrl: './transaction-filters.component.html',
  styleUrl: './transaction-filters.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule
  ]
})
export class TransactionFiltersComponent {

 @Output() filterChange = new EventEmitter<TransactionFilter>();

  filter: TransactionFilter = {};

  emit() {
    this.filterChange.emit(this.filter);
  }
}