import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

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
  private apiUrl = 'https://impala-sensible-antelope.ngrok-free.app/truck/trucks';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTrucks(): Observable<Truck[]> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders().set('Accept', 'application/json'),
      observe: 'response'  // Get the full HttpResponse
    }).pipe(
      map((response: any) => {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          if (response.body && response.body.camiones) {
            return response.body.camiones;
          } else {
            console.error('Unexpected JSON response structure:', response.body);
            return [];
          }
        } else {
          console.error('Received non-JSON response:', response.body);
          return [];
        }
      }),
      catchError(err => {
        console.error('Error al cargar camiones:', err);
        return of([]);
      })
    );
  }

  createTruck(truck: Omit<Truck, 'camion_id'>): Observable<any> {
    return this.http.post(this.apiUrl, truck , { headers: this.getHeaders() });
  }

  updateTruck(id: number, truck: Partial<Truck>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, truck , { headers: this.getHeaders() });
  }

  deleteTruck(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getTruckById(id: number): Observable<Truck> {
      return this.http.get<Truck>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}
