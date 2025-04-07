import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { InventoryService } from '../../services/inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from '../../models/product.model';

// Mock que devuelve un Observable con la data simulada
class MockInventoryService {
  getProductoById(id: number) {
    if (id === 99) {
      // Retornamos un producto con la estructura nueva
      const mockProduct: Product = {
        producto_id: 99,
        nombre: 'Producto Test',
        tipo: 'Aseo',
        cantidad: 50,
        ubicacion: 'Bodega X',
        descripcion: 'Desc test',
        precio_unitario: 1.25,
        creado_en: '2025-04-06T15:36:10.000000'
      };
      return of(mockProduct);
    }
    // Si no existe, simulamos un error o un undefined.
    // Lo más coherente en un observable es retornar throwError(...)
    return throwError(() => new Error('Producto no encontrado'));
  }
}

// Simulamos un ActivatedRoute con paramMap.id=99
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => key === 'id' ? '99' : null
    }
  }
};

describe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductDetailComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load producto with producto_id=99 from the service', () => {
    // Verificamos que el producto fue cargado
    expect(component.producto).toBeDefined();
    // Recuerda que ahora la propiedad es producto_id en vez de id
    expect(component.producto?.producto_id).toBe(99);
    expect(component.producto?.nombre).toBe('Producto Test');
    expect(component.producto?.precio_unitario).toBe(1.25);
  });
});

// Segundo describe: caso "sin ID" en la URL
describe('ProductDetailComponent sin ID', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;

  beforeEach(async () => {
    const badActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => null
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ ProductDetailComponent ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: ActivatedRoute, useValue: badActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set producto to undefined if no param is present', () => {
    expect(component.producto).toBeUndefined();
  });
});
