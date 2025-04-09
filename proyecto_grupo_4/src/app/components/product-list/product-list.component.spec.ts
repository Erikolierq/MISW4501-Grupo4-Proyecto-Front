import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { InventoryService } from '../../services/inventory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockInventoryService {
  getProductos = jasmine.createSpy().and.returnValue(of([
    { nombre: 'Producto1', cantidad: 10, precio_unitario: 100, producto_id: 1 }
  ]));
}

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load products', () => {
    expect(component.productos.length).toBeGreaterThan(0);
  });

  it('should paginate', () => {
    expect(component.paginatedProducts.length).toBeLessThanOrEqual(5);
  });
});
