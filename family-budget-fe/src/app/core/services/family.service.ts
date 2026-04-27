import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';

export interface Family {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class FamilyService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/families';

 createFamily(name: string): Observable<string> {
    const params = new HttpParams().set('name', name);

    return this.http.post(`${this.baseUrl}`, null, { params, responseType: 'text' });
  }

  addMember(familyId: number, username: string): Observable<string> {
    const params = new HttpParams().set('username', username);

    return this.http.post(
      `${this.baseUrl}/${familyId}/members`,
      null,
      { params, responseType: 'text' }
    );
  }


  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.baseUrl}/my`);
  }
}