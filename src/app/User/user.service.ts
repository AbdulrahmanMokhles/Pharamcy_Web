import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:59364/api/User';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, userData);
  }


  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }




}
