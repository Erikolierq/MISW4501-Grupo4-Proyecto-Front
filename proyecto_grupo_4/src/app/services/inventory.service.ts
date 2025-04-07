import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://34.55.129.65/inventary';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`).pipe(
      map(response => (response[0] || []).filter((p: any) => p != null))
    );
  }

  getProductoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
