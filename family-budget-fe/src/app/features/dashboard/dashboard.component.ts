import { Component, OnInit } from '@angular/core';
import { DashboardFilter, FiltersComponent } from './filters/filters.component';
import { ReportService } from '../../core/services/report.service';
import { CommonModule } from '@angular/common';
import { IncomeExpenseChartComponent } from './income-expense-chart/income-expense-chart.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FiltersComponent, IncomeExpenseChartComponent],
})
export class DashboardComponent implements OnInit {

  kpi = {
    income: 0,
    expense: 0,
    balance: 0
  };

  loading = false;

  constructor(private dashboardService: ReportService) {}

  ngOnInit(): void {
    const now = new Date();

    this.loadData({
      familyId: 1,
      month: now.getMonth() + 1,
      year: now.getFullYear()
    });
  }

  onFilterChange(filter: DashboardFilter) {
    this.loadData(filter);
  }

  private loadData(filter: DashboardFilter) {
    this.loading = true;

    this.dashboardService.getMonthlyReport(filter).subscribe({
      next: (res) => {
        this.kpi = {
          income: res.totalIncome,
          expense: res.totalExpense,
          balance: res.balance
        };

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
    //  this.reportService
    //   .getMonthlyReport(familyId, year, month)
    //   .subscribe({
    //     next: (data) => {
    //       this.report = data;
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     }
    //   });
  }
}