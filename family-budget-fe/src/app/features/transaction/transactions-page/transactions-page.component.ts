import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFiltersComponent } from '../transaction-filters/transaction-filters.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { DashboardFilterRequest, TransactionRequest, TransactionResponse } from '../../../models/transaction-request.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    TransactionFiltersComponent,
    TransactionListComponent,
    MatIcon
  ],
  templateUrl: './transactions-page.component.html',
  
})
export class TransactionsPageComponent implements OnInit {

  currentFilter: any = {};
  transactions: TransactionResponse[] = [];

  totalElements = 0;
  page = 0;
  size = 10;

 constructor(private service: TransactionService,private router: Router) {}

 formatDate(date: Date | null): string | null {
  if (!date) return null;

  return date.toISOString().split('T')[0];
}
  ngOnInit(): void {
   this.currentFilter = { type: "", startDate:"", endDate:""};
    this.load();
  }

  onFilterChange(filter: DashboardFilterRequest) {
    this.currentFilter = filter;
    this.load();
  }

  load() {
    this.service.getAll(this.currentFilter, this.page, this.size)
    .subscribe(res => {
      this.transactions = res.content;
      this.totalElements = res.totalElements;
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.load();
  }

  onSave(dto: any) {
    this.service.create(dto).subscribe(() => this.load());
  }

  goToCreate() {
    this.router.navigate(['/transactions/new']);
  }
}