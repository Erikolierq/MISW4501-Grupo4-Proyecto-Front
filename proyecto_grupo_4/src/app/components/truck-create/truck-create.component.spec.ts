import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TruckCreateComponent } from './truck-create.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockProductService {
  createProducto = jasmine.createSpy().and.returnValue(of({}));
}
class MockRouter {
  navigate = jasmine.createSpy();
}

describe('TruckCreateComponent', () => {
  let fixture: ComponentFixture<TruckCreateComponent>;
  let component: TruckCreateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckCreateComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit truck and navigate', () => {
    component.truckForm.setValue({
      placa: 'ABC123',
      capacidad: 5000,
      tipo: 'Refrigerado',
      rutas: 'Bogotá - Cali'
    });
    component.onSubmit();
    expect(TestBed.inject(ProductService).createProducto).toHaveBeenCalled();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/camiones']);
  });
});
