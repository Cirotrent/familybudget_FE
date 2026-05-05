import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardFilterRequest, PageResponse, TransactionRequest, TransactionResponse } from '../../models/transaction-request.service';
import { environment } from '../../../env/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private baseUrl = environment.apiUrl + '/transactions';
  private baseUrlFamily = environment.apiUrl + '/families';

  constructor(private http: HttpClient) {}

  create(dto: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.baseUrl, dto);
  }

  getAll(filters?: DashboardFilterRequest,
      page: number = 0,
      size: number = 10
      ): Observable<PageResponse<TransactionResponse>> {

    let params = new HttpParams()
        .set('page', page)
        .set('size', size);

    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.startDate) params = params.set('startDate', filters.startDate);
    if (filters?.endDate) params = params.set('endDate', filters.endDate);
    if (filters?.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters?.familyId) params = params.set('familyId', filters.familyId);

    return this.http.get<PageResponse<TransactionResponse>>(this.baseUrl, { params });
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCategories() {
    return this.http.get<any[]>(`${this.baseUrlFamily}/allCategory`);
  }

  getFamilies() {
    return this.http.get<any[]>(`${this.baseUrlFamily}/my`);
  }
}