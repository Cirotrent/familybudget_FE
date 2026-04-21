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
import { FamilyService } from '../../../core/services/family.service';
import { TransactionRequest } from '../../../models/transaction-request.service';
import { ToastService } from '../../../core/services/toast.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule

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
    private familyService: FamilyService,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    // this.loadData();
    this.form = this.fb.group({
      amount: [0],
      type: ['EXPENSE'],
      date: [new Date()],
      description: [""],
      categoryId: [0],
      familyId: [0]
    });

    this.listenChanges();
    this.loadFamilies();
  }

  loadFamilies() {
    this.familyService.getFamilies().subscribe(res => {
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


  // onSubmit() {
  //   this.transactionService.create(this.form.value).subscribe(() => {
  //     this.router.navigate(['/transactions']);
  //   });
  // }

  onSubmit() {
  if (this.form.invalid) {
    this.toast.error('Compila tutti i campi');
    return;
  }

  const formValue = this.form.value;

  const payload: TransactionRequest = {
    amount: formValue.amount!,
    description: formValue.description!,
    type: formValue.type!,
    categoryId: formValue.categoryId!,
    familyId: formValue.familyId!,
    date: this.formatDate(formValue.date!)
  };

  this.transactionService.create(payload).subscribe({
    next: () => {
      this.toast.success('Transazione salvata');
      this.router.navigate(['/transactions']);
    },
    error: () => this.toast.error('Errore salvataggio')
  });
}

private formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
}