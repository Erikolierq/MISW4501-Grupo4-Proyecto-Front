import { TestBed } from '@angular/core/testing';
import { TruckService, Truck } from './trucks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TruckService', () => {
  let service: TruckService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';
  const apiUrl = 'https://impala-sensible-antelope.ngrok-free.app/truck/trucks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TruckService]
    });

    service = TestBed.inject(TruckService);
    httpMock = TestBed.inject(HttpTestingController);

    // Set a mock token in sessionStorage
    sessionStorage.setItem('token', mockToken);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden peticiones pendientes
    sessionStorage.clear(); // Limpia token entre tests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trucks', () => {
    const mockResponse = { camiones: [{ camion_id: 1, placa: 'ABC123', capacidad: 5000, tipo: 'Volquete', rutas: 'Ruta 1' }] };

    service.getTrucks().subscribe(trucks => {
      expect(trucks.length).toBe(1);
      expect(trucks[0].placa).toBe('ABC123');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockResponse);
  });

  it('should create a truck', () => {
    const newTruck: Omit<Truck, 'camion_id'> = { placa: 'DEF456', capacidad: 4000, tipo: 'Cisterna', rutas: 'Ruta 2' };

    service.createTruck(newTruck).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTruck);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({ success: true });
  });

  it('should update a truck', () => {
    const updatedTruck: Partial<Truck> = { capacidad: 4500 };

    service.updateTruck(1, updatedTruck).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTruck);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({ success: true });
  });

  it('should delete a truck', () => {
    service.deleteTruck(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({ success: true });
  });

  it('should get truck by id', () => {
    const truck: Truck = { camion_id: 1, placa: 'GHI789', capacidad: 3000, tipo: 'Refrigerado', rutas: 'Ruta 3' };

    service.getTruckById(1).subscribe(result => {
      expect(result).toEqual(truck);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(truck);
  });
});
