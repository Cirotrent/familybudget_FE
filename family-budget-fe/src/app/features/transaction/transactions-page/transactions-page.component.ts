import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFiltersComponent } from '../transaction-filters/transaction-filters.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
// import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionRequest, TransactionResponse } from '../../../models/transaction-request.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    TransactionFiltersComponent,
    TransactionListComponent,
    // TransactionFormComponent,
    MatIcon
  ],
  templateUrl: './transactions-page.component.html',
  // template: `
  //   <h2>Transazioni</h2>

  //   <app-transaction-form (create)="onCreate($event)"></app-transaction-form>

  //   <app-transaction-filters (filtersChange)="onFilter($event)"></app-transaction-filters>

  //   <app-transaction-list
  //     [transactions]="transactions"
  //     (delete)="onDelete($event)">
  //   </app-transaction-list>
  // `
})
export class TransactionsPageComponent {

  transactions: any[] = [];
  currentFilter: any = {};

 constructor(private service: TransactionService,private router: Router) {}

  onFilterChange(filter: any) {
    this.currentFilter = filter;
    this.load();
  }

  load() {
    this.service.getAll(this.currentFilter)
      .subscribe(res => this.transactions = res);
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  onSave(dto: any) {
    this.service.create(dto).subscribe(() => this.load());
  }

  goToCreate() {
  this.router.navigate(['/transactions/new']);
}
}