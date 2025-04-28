import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://34.55.129.65/inventary';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, { headers: this.getHeaders() });
  }

  getProductoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }
}
