import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TransactionRequest } from '../../../models/transaction-request.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../../../core/services/transaction.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

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
    MatCardModule,
    ReactiveFormsModule

  ]
})
export class TransactionFormComponent implements OnInit {

  form!: FormGroup;
  model: any = {
    type: 'EXPENSE'
  };

  categories: any[] = [];
  families: any[] = [];

  constructor(
    private service: TransactionService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // this.loadData();
    this.form = this.fb.group({
      amount: [],
      type: ['EXPENSE'],
      date: [],
      description: [],
      categoryId: [],
      familyId: []
    });

    this.listenChanges();
    this.loadFamilies();
  }

  loadFamilies() {
    this.service.getFamilies().subscribe(res => {
      this.families = res;
      if (this.families.length > 0) {
        this.form.patchValue({
          familyId: this.families[0].id,
          type: 'EXPENSE'
        });
        this.loadCategories(); // 🔥 carica subito
      }
    }
    );
  }

  private listenChanges() {
    this.form.get('familyId')?.valueChanges.subscribe(() => {
      this.loadCategories();
    });

    this.form.get('type')?.valueChanges.subscribe(() => {
      this.loadCategories();
    });
  }

  private loadCategories() {
    const familyId = this.form.value.familyId;
    const type = this.form.value.type;

    if (!familyId || !type) {
      this.categories = [];
      return;
    }

    this.categoryService
      .getByFamilyAndType(familyId, type)
      .subscribe(res => {
        this.categories = res;
      });
  }


  // submit() {
  //   this.service.create(this.model).subscribe(() => {
  //     this.router.navigate(['/transactions']);
  //   });
  // }
}