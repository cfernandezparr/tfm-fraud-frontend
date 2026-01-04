import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  // Backend en Render
  private readonly API_URL = 'https://tfm-fraud-backend.onrender.com/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.API_URL);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
