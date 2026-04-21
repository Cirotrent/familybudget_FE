import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../core/services/category.service';
import { FamilyService } from '../../../core/services/family.service';
import { DashboardFilterRequest } from '../../../models/transaction-request.service';

export interface TransactionFilter {
  startDate?: Date;
  endDate?: Date;
  type?: string;
  categoryId?: number;
  familyId?: number;
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
export class TransactionFiltersComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private familyService: FamilyService
  ) { }

 @Output() filterChange = new EventEmitter<DashboardFilterRequest>();

  categories: any[] = [];
  families: any[] = [];
  familyId = 1; 
  filter: TransactionFilter = {};

  ngOnInit() {
    this.loadFamilies();
  }

   loadFamilies() {
    this.familyService.getFamilies().subscribe(res => {
      this.families = res;
      if (this.families.length > 0) {
        this.familyId = this.families[0].id
        // this.form.patchValue({
        //   familyId: this.families[0].id,
        //   type: 'EXPENSE'
        // });
        this.categoryService.getAll(this.families[0].id).subscribe(res => this.categories = res);
        
          }
    }
    );
  }

 emit() {
  const request: DashboardFilterRequest = {
    type: this.filter.type,
    startDate: this.formatDate(this.filter.startDate),
    endDate: this.formatDate(this.filter.endDate),
    categoryId: this.filter.categoryId,
    familyId: this.filter.familyId

  };

  this.filterChange.emit(request);
}
formatDate(date?: Date): string | undefined {
  if (!date) return undefined;
  return date.toISOString().split('T')[0];
}
}