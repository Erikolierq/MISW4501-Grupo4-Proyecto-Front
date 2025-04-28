import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SalesmanCreateComponent } from './salesman-create.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManufacturerService } from '../../services/manufacturer.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SalesmanCreateComponent', () => {
  let component: SalesmanCreateComponent;
  let fixture: ComponentFixture<SalesmanCreateComponent>;
  let mockManufacturerService: jasmine.SpyObj<ManufacturerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockManufacturerService = jasmine.createSpyObj('ManufacturerService', ['createManufacturer']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        SalesmanCreateComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: ManufacturerService, useValue: mockManufacturerService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesmanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with nombre, apellido, and email', () => {
    expect(component.manufacturerForm.contains('nombre')).toBeTrue();
    expect(component.manufacturerForm.contains('apellido')).toBeTrue();
    expect(component.manufacturerForm.contains('email')).toBeTrue();
  });

  it('should call createManufacturer and navigate to /salesman on valid form submission', fakeAsync(() => {
    component.manufacturerForm.setValue({
      nombre: 'John',
      apellido: 'Doe',
      email: 'john.doe@example.com'
    });

    mockManufacturerService.createManufacturer.and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(mockManufacturerService.createManufacturer).toHaveBeenCalledWith({
      nombre: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      rol: 'VENDEDOR'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/salesman']);
  }));

  it('should handle error if createManufacturer fails', fakeAsync(() => {
    spyOn(console, 'error');

    component.manufacturerForm.setValue({
      nombre: 'Jane',
      apellido: 'Doe',
      email: 'jane.doe@example.com'
    });

    mockManufacturerService.createManufacturer.and.returnValue(throwError(() => ({ status: 500 })));

    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error al adjuntar usuario:', { status: 500 });
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  it('should navigate back to /salesman when volver() is called', () => {
    component.volver();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/salesman']);
  });
});
