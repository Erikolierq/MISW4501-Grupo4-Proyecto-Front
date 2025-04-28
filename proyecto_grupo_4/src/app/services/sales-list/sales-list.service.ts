import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesListService {
  private salesUrl = 'http://34.55.129.65/sales/sales';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(this.salesUrl, { headers: this.getHeaders() });
  }

  createSale(saleData: any): Observable<any> {
    return this.http.post<any>(this.salesUrl, saleData, { headers: this.getHeaders() });
  }
}
