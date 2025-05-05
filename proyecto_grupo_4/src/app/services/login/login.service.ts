import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth';
  //private baseUrl = 'http://34.55.129.65:3000/auth'; // Solo esta base URL
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  registerUser(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, registerData);
  }
}
