import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionRequest } from '../../../models/transaction-request.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../../../core/services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class TransactionFormComponent implements OnInit {

  model: any = {
    type: 'EXPENSE'
  };

  categories: any[] = [];
  families: any[] = [];

  constructor(
    private service: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getCategories().subscribe(res => this.categories = res);
    this.service.getFamilies().subscribe(res => this.families = res);
  }

  submit() {
    this.service.create(this.model).subscribe(() => {
      this.router.navigate(['/transactions']);
    });
  }
}