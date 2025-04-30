import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private apiUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/register';
  private sellersUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/seller/all';
  private manufacturersUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/manufacturers/all';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createManufacturer(manufacturer: any): Observable<any> {
    return this.http.post(this.apiUrl, manufacturer, { headers: this.getHeaders() });
  }

  getSellers(): Observable<any> {
    return this.http.get(this.sellersUrl, { headers: this.getHeaders() });
  }
  getManufacturers(): Observable<any> {
    return this.http.get(this.manufacturersUrl, { headers: this.getHeaders() });
  }
}
