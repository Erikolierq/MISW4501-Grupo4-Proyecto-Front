import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://34.55.129.65/inventary/products';
  constructor(private http: HttpClient) {}

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData);
  }
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
}
