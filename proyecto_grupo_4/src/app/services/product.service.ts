import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://impala-sensible-antelope.ngrok-free.app/inventary/products';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto , { headers: this.getHeaders() });
  }

  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData , { headers: this.getHeaders() });
  }
  getProductos(): Observable<any> {
    const headers = this.getHeaders().set(
      'ngrok-skip-browser-warning',
      '69420'
    );
    return this.http.get<any>(this.apiUrl, { headers });
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, { headers: this.getHeaders() });
  }
}
