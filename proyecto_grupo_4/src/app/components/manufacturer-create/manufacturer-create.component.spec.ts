import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ManufacturerCreateComponent } from './manufacturer-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ManufacturerService } from '../../services/manufacturer.service'; // Ajusta si cambia tu ruta

describe('ManufacturerCreateComponent', () => {
  let component: ManufacturerCreateComponent;
  let fixture: ComponentFixture<ManufacturerCreateComponent>;
  let mockManufacturerService: jasmine.SpyObj<ManufacturerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockManufacturerService = jasmine.createSpyObj('ManufacturerService', ['createManufacturer']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ManufacturerCreateComponent, ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: ManufacturerService, useValue: mockManufacturerService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 3 controls', () => {
    expect(component.manufacturerForm.contains('nombre')).toBeTrue();
    expect(component.manufacturerForm.contains('apellido')).toBeTrue();
    expect(component.manufacturerForm.contains('email')).toBeTrue();
  });

  it('should submit form and call createManufacturer service', fakeAsync(() => {
    // Arrange
    component.manufacturerForm.setValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@test.com'
    });

    const payloadExpected = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@test.com',
      password: '123456',
      rol: 'FABRICANTE'
    };

    mockManufacturerService.createManufacturer.and.returnValue(of({}));

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(mockManufacturerService.createManufacturer).toHaveBeenCalledWith(payloadExpected);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/fabricantes']);
  }));

  it('should NOT submit if form is invalid', () => {
    // Formulario vacío
    component.manufacturerForm.setValue({
      nombre: '',
      apellido: '',
      email: ''
    });

    component.onSubmit();

    expect(mockManufacturerService.createManufacturer).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error when createManufacturer fails', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    const mockError = { message: 'Error de API' };

    component.manufacturerForm.setValue({
      nombre: 'María',
      apellido: 'Gómez',
      email: 'maria.gomez@test.com'
    });

    mockManufacturerService.createManufacturer.and.returnValue(throwError(() => mockError));

    component.onSubmit();
    tick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al adjuntar usuario:', mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  it('should navigate back when calling volver()', () => {
    // Act
    component.volver();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/fabricantes']);
  });
});
