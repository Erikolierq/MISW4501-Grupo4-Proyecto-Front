import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductCreateComponent } from './product-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

class MockProductService {
  createProducto = jasmine.createSpy().and.returnValue(of({}));
}
class MockRouter {
  navigate = jasmine.createSpy();
}

describe('ProductCreateComponent', () => {
  let fixture: ComponentFixture<ProductCreateComponent>;
  let component: ProductCreateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreateComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createProducto and navigate on submit', () => {
    component.productForm.setValue({
      nombre: 'Test',
      descripcion: '',
      tipo: '',
      cantidad: 5,
      ubicacion: '',
      fk_fabricante: 1,
      precio_unitario: 10
    });
    component.onSubmit();
    const productService = TestBed.inject(ProductService);
    const router = TestBed.inject(Router);
    expect(productService.createProducto).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/productos']);
  });
});
