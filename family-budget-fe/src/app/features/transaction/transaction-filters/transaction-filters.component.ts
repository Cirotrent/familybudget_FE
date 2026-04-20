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
  startDate?: Date;
  endDate?: Date;
  type?: string;
}
export interface DashboardFilterRequest {
  startDate?: string;
  endDate?: string;
  type?: string;
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

 @Output() filterChange = new EventEmitter<DashboardFilterRequest>();

  filter: TransactionFilter = {};

  // emit() {
  //   this.filterChange.emit(this.filter);
  // }

 emit() {
  const request: DashboardFilterRequest = {
    type: this.filter.type,
    startDate: this.formatDate(this.filter.startDate),
    endDate: this.formatDate(this.filter.endDate)
  };

  this.filterChange.emit(request);
}
formatDate(date?: Date): string | undefined {
  if (!date) return undefined;
  return date.toISOString().split('T')[0];
}
}