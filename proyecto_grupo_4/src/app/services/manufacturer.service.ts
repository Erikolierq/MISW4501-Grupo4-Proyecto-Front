import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private apiUrl = 'http://34.55.129.65/auth/register';
  constructor(private http: HttpClient) { }

 createManufacturer(manufacturer: any): Observable<any> {
  return this.http.post(this.apiUrl, manufacturer);
}
}
