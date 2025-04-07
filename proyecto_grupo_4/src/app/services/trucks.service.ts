import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Truck {
  camion_id: number;
  placa: string;
  capacidad: number;
  tipo: string;
  rutas: string;
  fecha_registro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private apiUrl = 'http://34.55.129.65/truck/trucks';

  constructor(private http: HttpClient) {}

  getTrucks(): Observable<Truck[]> {
    return this.http.get<{ camiones: Truck[] }>(this.apiUrl).pipe(
      map(res => res.camiones || [])
    );
  }

  createTruck(truck: Omit<Truck, 'camion_id'>): Observable<any> {
    return this.http.post(this.apiUrl, truck);
  }

  updateTruck(id: number, truck: Partial<Truck>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, truck);
  }

  deleteTruck(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
