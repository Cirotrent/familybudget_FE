import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MonthlyReport } from '../../models/monthly-report';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api/reports';

   getMonthlyReport(filter: any) {
    const params = new HttpParams()
      .set('familyId', filter.familyId)
      .set('year', filter.year)
      .set('month', filter.month);

    return this.http.get<MonthlyReport>(`${this.baseUrl}/monthly`, { params });
  }
}