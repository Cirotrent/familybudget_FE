import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionRequest, TransactionResponse } from '../../models/transaction-request.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private baseUrl = 'http://localhost:9090/api/transactions';
  private baseUrlFamily = 'http://localhost:9090/api/families';

  constructor(private http: HttpClient) {}

  create(dto: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.baseUrl, dto);
  }

  getAll(filters?: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<TransactionResponse[]> {

    let params = new HttpParams();

    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.startDate) params = params.set('startDate', filters.startDate);
    if (filters?.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<TransactionResponse[]>(this.baseUrl, { params });
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