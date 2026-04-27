import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';

export interface Family {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class FamilyService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/families';

  createFamily(name: string) {
    return this.http.post(`${this.baseUrl}/families`, { name });
  }

  getFamilies() {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }
}