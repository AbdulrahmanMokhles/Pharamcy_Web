import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private readonly db = 'http://localhost:59364/api/User';

  constructor(private readonly client: HttpClient) { }
  // Method to register a new user
  registerUser(userData: any): Observable<any> {
    return this.client.post<any>(`${this.db}/Register`, userData);
  }
  createUser(userData: any): Observable<any> {
    return this.client.post<any>(this.db, userData);
  }
  existEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.client.get(`${this.db}/email`, { params });
  }
}
