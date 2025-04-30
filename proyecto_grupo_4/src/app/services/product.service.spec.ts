import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create product', () => {
    const dummy = { nombre: 'New', cantidad: 1 };

    service.createProducto(dummy).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('https://impala-sensible-antelope.ngrok-free.app/inventary/products');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should upload CSV', () => {
    const mockFile = new File([''], 'test.csv', { type: 'text/csv' });

    service.uploadCSV(mockFile).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('https://impala-sensible-antelope.ngrok-free.app/inventary/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush({});
  });

  it('should update product', () => {
    const dummy = { nombre: 'Updated' };

    service.updateProducto(10, dummy).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('https://impala-sensible-antelope.ngrok-free.app/inventary/products/10');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
});
