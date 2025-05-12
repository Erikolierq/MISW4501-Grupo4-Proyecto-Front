import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesListService {
  private salesUrl = 'https://impala-sensible-antelope.ngrok-free.app/sales/sales';
  //private salesUrl = 'http://http://34.55.129.65:3000/sales/sales'; // Solo esta base URL

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getSales(): Observable<any[]> {
    const headers = this.getHeaders().set(
      'ngrok-skip-browser-warning',
      '69420'
    );
    return this.http.get<any[]>(this.salesUrl, { headers });
  }

  createSale(saleData: any): Observable<any> {
    return this.http.post<any>(this.salesUrl, saleData, { headers: this.getHeaders() });
  }
}
