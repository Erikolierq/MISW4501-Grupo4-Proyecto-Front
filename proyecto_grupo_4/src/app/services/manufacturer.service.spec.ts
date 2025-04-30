import { TestBed } from '@angular/core/testing';
import { ManufacturerService } from './manufacturer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ManufacturerService', () => {
  let service: ManufacturerService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';

  const apiUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/register';
  const sellersUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/seller/all';
  const manufacturersUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth/manufacturers/all';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManufacturerService]
    });

    service = TestBed.inject(ManufacturerService);
    httpMock = TestBed.inject(HttpTestingController);

    // Insertamos token falso en sessionStorage
    sessionStorage.setItem('token', mockToken);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
    sessionStorage.clear(); // Limpia el token entre tests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a manufacturer', () => {
    const newManufacturer = {
      nombre: 'Fabrica XYZ',
      email: 'xyz@factory.com',
      password: '123456',
      rol: 'FABRICANTE'
    };

    service.createManufacturer(newManufacturer).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newManufacturer);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush({ success: true });
  });

  it('should get sellers', () => {
    const mockSellers = [{ nombre: 'Juan', rol: 'VENDEDOR' }];

    service.getSellers().subscribe(response => {
      expect(response.length).toBe(1);
      expect(response[0].nombre).toBe('Juan');
    });

    const req = httpMock.expectOne(sellersUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockSellers);
  });

  it('should get manufacturers', () => {
    const mockManufacturers = [{ nombre: 'Fabrica ABC', rol: 'FABRICANTE' }];

    service.getManufacturers().subscribe(response => {
      expect(response.length).toBe(1);
      expect(response[0].nombre).toBe('Fabrica ABC');
    });

    const req = httpMock.expectOne(manufacturersUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockManufacturers);
  });
});
