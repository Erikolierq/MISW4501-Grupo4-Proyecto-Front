import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://impala-sensible-antelope.ngrok-free.app/inventary';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });
  }

  getProductos(): Observable<Product[]> {
    const headers = this.getHeaders().set(
      'ngrok-skip-browser-warning',
      '69420'
    );

    return this.http.get<Product[]>(
      `${this.baseUrl}/products/all`,
      { headers }
    );
  }

  getProductoById(id: number): Observable<Product> {
    const headers = this.getHeaders().set(
      'ngrok-skip-browser-warning',
      '69420'
    );

    return this.http.get<Product>(
      `${this.baseUrl}/products/${id}`,
      { headers }
    );
  }
}
