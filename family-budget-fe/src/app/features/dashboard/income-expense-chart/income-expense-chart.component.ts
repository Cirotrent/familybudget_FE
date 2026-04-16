import { Component, Input, OnChanges, AfterViewInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  templateUrl: './income-expense-chart.component.html'
})
export class IncomeExpenseChartComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas', { static: false })
canvas!: ElementRef<HTMLCanvasElement>;

  @Input() income = 0;
  @Input() expense = 0;

  private chart!: Chart;

 ngAfterViewInit(): void {
  setTimeout(() => {
    this.createChart();
  });
}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  private createChart() {
    if (!this.canvas?.nativeElement) return;

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Entrate', 'Uscite'],
        datasets: [{
          label: 'Mensile',
          data: [this.income, this.expense]
        }]
      }
    });
  }

  private updateChart() {
    this.chart.data.datasets[0].data = [this.income, this.expense];
    this.chart.update();
  }
}