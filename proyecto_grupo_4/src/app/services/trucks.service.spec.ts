import { TestBed } from '@angular/core/testing';
import { TruckService, Truck } from './trucks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TruckService', () => {
  let service: TruckService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TruckService]
    });
    service = TestBed.inject(TruckService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all trucks', () => {
    const mock: { camiones: Truck[] } = {
      camiones: [
        {
          camion_id: 1,
          placa: 'XYZ123',
          capacidad: 5000,
          tipo: 'Carga',
          rutas: 'Bogotá - Medellín'
        }
      ]
    };

    service.getTrucks().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].placa).toBe('XYZ123');
    });

    const req = httpMock.expectOne('http://34.55.129.65/truck/trucks');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should create a truck', () => {
    const newTruck = { placa: 'NEW123', capacidad: 5000, tipo: 'Refrigerado', rutas: '' };

    service.createTruck(newTruck).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('http://34.55.129.65/truck/trucks');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a truck', () => {
    const truckUpdate = { tipo: 'Carga' };

    service.updateTruck(1, truckUpdate).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('http://34.55.129.65/truck/trucks/1');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a truck', () => {
    service.deleteTruck(1).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('http://34.55.129.65/truck/trucks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
