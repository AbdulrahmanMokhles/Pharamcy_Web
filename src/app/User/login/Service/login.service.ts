import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly db = 'http://localhost:59364/api/User';
  public userid: number = 0;

  constructor(private readonly client: HttpClient) { }

  login(userid: number) {
    localStorage.setItem('userId', userid.toString());
  }
  loginUser(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.client.get(`${this.db}/login`, { params }).pipe(
      tap((response: any) => {
        // Assuming the response contains the user ID
      })
    );
  }

}
