import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SalesCreateComponent } from './sales-create.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SalesListService } from '../../services/sales-list/sales-list.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SalesCreateComponent', () => {
  let component: SalesCreateComponent;
  let fixture: ComponentFixture<SalesCreateComponent>;
  let mockSalesListService: jasmine.SpyObj<SalesListService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSalesListService = jasmine.createSpyObj('SalesListService', ['createSale']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        SalesCreateComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: SalesListService, useValue: mockSalesListService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with id_cliente, id_vendedor and detalles array', () => {
    expect(component.salesForm.contains('id_cliente')).toBeTrue();
    expect(component.salesForm.contains('id_vendedor')).toBeTrue();
    expect(component.salesForm.contains('detalles')).toBeTrue();
    expect(component.detalles.length).toBe(0); // Initially empty
  });

  it('should add a new detalle to the detalles FormArray', () => {
    component.addDetalle();
    expect(component.detalles.length).toBe(1);
    expect(component.detalles.at(0).value).toEqual({
      id_producto: null,
      cantidad: null,
      precio_unitario: null
    });
  });

  it('should remove a detalle from the detalles FormArray', () => {
    component.addDetalle();
    component.addDetalle();
    expect(component.detalles.length).toBe(2);

    component.removeDetalle(0);
    expect(component.detalles.length).toBe(1);
  });

  it('should call createSale and navigate to /ventas on valid form submission', fakeAsync(() => {
    component.addDetalle(); // <- Agregas un detalle primero

    component.salesForm.setValue({
      id_cliente: 1,
      id_vendedor: 2,
      detalles: [
        { id_producto: 101, cantidad: 3, precio_unitario: 100 }
      ]
    });

    mockSalesListService.createSale.and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(mockSalesListService.createSale).toHaveBeenCalledWith({
      id_cliente: 1,
      id_vendedor: 2,
      detalles: [
        { id_producto: 101, cantidad: 3, precio_unitario: 100 }
      ]
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/ventas']);
  }));

  it('should handle error if createSale fails', fakeAsync(() => {
    spyOn(console, 'error');

    component.addDetalle(); // <- Agregas un detalle primero

    component.salesForm.setValue({
      id_cliente: 1,
      id_vendedor: 2,
      detalles: [
        { id_producto: 101, cantidad: 3, precio_unitario: 100 }
      ]
    });

    mockSalesListService.createSale.and.returnValue(throwError(() => ({ status: 500 })));

    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error creating sale:', { status: 500 });
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));


  it('should not submit if the form is invalid', () => {
    spyOn(console, 'error');
    component.salesForm.setValue({
      id_cliente: null,
      id_vendedor: null,
      detalles: []
    });

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    expect(mockSalesListService.createSale).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back to /ventas when volver() is called', () => {
    component.volver();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/ventas']);
  });
});
