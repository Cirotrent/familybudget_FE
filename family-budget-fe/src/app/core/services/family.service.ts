import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FamilyService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api/families';

  createFamily(name: string) {
    return this.http.post(`${this.baseUrl}/families`, { name });
  }

  getFamilies() {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }
}