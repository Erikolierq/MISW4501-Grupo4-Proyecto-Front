import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { InventoryService } from '../../services/inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

class MockInventoryService {
  getProductoById(id: number) {
    if (id === 99) {
      return {
        id: 99,
        nombre: 'Producto Test',
        tipo: 'Aseo',
        cantidad: 50,
        ubicacion: 'Bodega X',
        fabricante: 'TestFab',
        precio: 1.25
      };
    }
    return undefined;
  }
}

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

  it('should load producto with id=99 from the service', () => {
    expect(component.producto).toBeDefined();
    expect(component.producto?.id).toBe(99);
    expect(component.producto?.nombre).toBe('Producto Test');
  });
});

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
