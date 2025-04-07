import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class MockInventoryService {
  getProductoById = jasmine.createSpy().and.returnValue(of({
    nombre: 'Producto Test',
    cantidad: 5,
    precio_unitario: 100
  }));
}
const mockActivatedRoute = {
  snapshot: { paramMap: { get: () => '1' } }
};

describe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load producto', () => {
    expect(component).toBeTruthy();
    expect(component.producto?.nombre).toBe('Producto Test');
  });
});
