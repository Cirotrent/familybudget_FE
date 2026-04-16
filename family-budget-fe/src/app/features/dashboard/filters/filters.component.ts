import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DashboardFilter {
  familyId: number;
  month: number;
  year: number;
}

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  imports: [FormsModule, CommonModule],
})
export class FiltersComponent implements OnInit {

  @Output() filterChange = new EventEmitter<DashboardFilter>();

  families: { id: number; name: string }[] = [];

  months = [
    { value: 1, label: 'Gennaio' },
    { value: 2, label: 'Febbraio' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Aprile' },
    { value: 5, label: 'Maggio' },
    { value: 6, label: 'Giugno' },
    { value: 7, label: 'Luglio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Settembre' },
    { value: 10, label: 'Ottobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Dicembre' }
  ];

  years: number[] = [];

  selectedFamilyId!: number;
  month!: number;
  year!: number;

  ngOnInit(): void {
    const now = new Date();

    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();

    this.initYears();

    this.families = [
      { id: 1, name: 'Famiglia Demo' }
    ];

    this.selectedFamilyId = this.families[0].id;

    this.emitChange();
  }

  initYears() {
    const current = new Date().getFullYear();
    this.years = Array.from({ length: 6 }, (_, i) => current - 5 + i);
  }

  onChange() {
    this.filterChange.emit({
      familyId: this.selectedFamilyId,
       year: this.year,
      month: this.month
    });
  }
  emitChange() {
    this.onChange();
  }
}