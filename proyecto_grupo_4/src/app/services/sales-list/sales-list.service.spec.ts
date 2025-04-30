import { TestBed } from '@angular/core/testing';
import { SalesListService } from './sales-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SalesListService', () => {
  let service: SalesListService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';
  const salesUrl = 'https://impala-sensible-antelope.ngrok-free.app/sales/sales';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SalesListService]
    });

    service = TestBed.inject(SalesListService);
    httpMock = TestBed.inject(HttpTestingController);

    sessionStorage.setItem('token', mockToken); // Set token antes de cada test
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya peticiones pendientes
    sessionStorage.clear(); // Limpia token entre pruebas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sales', () => {
    const mockSales = [
      { pedido_id: 1, id_cliente: 101, id_vendedor: 201, total: 500 },
      { pedido_id: 2, id_cliente: 102, id_vendedor: 202, total: 1000 }
    ];

    service.getSales().subscribe(sales => {
      expect(sales.length).toBe(2);
      expect(sales[0].pedido_id).toBe(1);
    });

    const req = httpMock.expectOne(salesUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockSales);
  });

  it('should create a sale', () => {
    const newSale = {
      id_cliente: 103,
      id_vendedor: 203,
      detalles: [
        { id_producto: 10, cantidad: 2, precio_unitario: 100 }
      ]
    };

    service.createSale(newSale).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(salesUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSale);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({ success: true });
  });
});
