import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products list', () => {
    const mockProducts: Product[] = [{ nombre: 'P1', cantidad: 5, precio_unitario: 10 } as Product];

    service.getProductos().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].nombre).toBe('P1');
    });

    const req = httpMock.expectOne('http://34.55.129.65/inventary/products');
    expect(req.request.method).toBe('GET');
    req.flush([mockProducts]);
  });

  it('should fetch product by ID', () => {
    const mockProduct: Product = { nombre: 'Test', cantidad: 5, precio_unitario: 10 } as Product;

    service.getProductoById(1).subscribe((product) => {
      expect(product.nombre).toBe('Test');
    });

    const req = httpMock.expectOne('http://34.55.129.65/inventary/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
