import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductUpdateComponent } from './product-update.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class MockInventoryService {
  getProductoById = jasmine.createSpy().and.returnValue(of({
    nombre: 'Producto Edit',
    descripcion: '',
    tipo: '',
    cantidad: 10,
    ubicacion: '',
    precio_unitario: 50
  }));
}
class MockProductService {
  updateProducto = jasmine.createSpy().and.returnValue(of({}));
}
class MockRouter {
  navigate = jasmine.createSpy();
}
const mockActivatedRoute = {
  snapshot: { paramMap: { get: () => '1' } }
};

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUpdateComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: InventoryService, useClass: MockInventoryService },
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load product and patch form', () => {
    expect(component.productForm.value.nombre).toBe('Producto Edit');
  });

  it('should call updateProducto on submit', () => {
    component.onSubmit();
    expect(TestBed.inject(ProductService).updateProducto).toHaveBeenCalled();
  });
});
