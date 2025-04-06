import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }
}
