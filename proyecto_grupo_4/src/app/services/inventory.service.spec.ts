import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';
  const baseUrl = 'https://impala-sensible-antelope.ngrok-free.app/inventary';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });

    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);

    sessionStorage.setItem('token', mockToken); // Set token antes de cada test
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no queden peticiones pendientes
    sessionStorage.clear(); // Limpia token después de cada test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get productos', () => {
  const mockProducts: Product[] = [
    {
      producto_id: 1,
      nombre: 'Producto A',
      cantidad: 10,
      precio_unitario: 100,
      tipo: 'Electrónica',
      ubicacion: 'Bodega 1',
      descripcion: 'Un excelente producto',
      creado_en: '2024-05-01',
      precio: 0,
      stock: undefined
    }
  ];

  service.getProductos().subscribe(products => {
    expect(products.length).toBe(1);
    expect(products[0].nombre).toBe('Producto A');
    expect(products[0].tipo).toBe('Electrónica');
  });

  const req = httpMock.expectOne(`${baseUrl}/products/all`); // ✅ ACTUALIZADO
  expect(req.request.method).toBe('GET');
  expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  req.flush(mockProducts);
});

  it('should get producto by id', () => {
    const mockProduct: Product = {
      producto_id: 2,
      nombre: 'Producto B',
      cantidad: 5,
      precio_unitario: 200,
      tipo: 'Herramienta',
      ubicacion: 'Almacén 2',
      descripcion: 'Herramienta muy útil',
      creado_en: '2024-04-30',
      precio: 0,
      stock: undefined
    };

    service.getProductoById(2).subscribe(product => {
      expect(product.producto_id).toBe(2);
      expect(product.nombre).toBe('Producto B');
    });

    const req = httpMock.expectOne(`${baseUrl}/products/2`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockProduct);
  });
});
