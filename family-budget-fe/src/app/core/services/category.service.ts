import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private baseUrl = 'http://localhost:9090/api/categories';

  constructor(private http: HttpClient) {}

  getAll(familyId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}?familyId=${familyId}`);
  }

  create(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  update(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getByFamilyAndType(familyId: number, type: string) {
  return this.http.get<Category[]>(
    `${this.baseUrl}?familyId=${familyId}&type=${type}`
  );
}
}