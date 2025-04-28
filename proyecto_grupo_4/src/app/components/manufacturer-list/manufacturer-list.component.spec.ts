import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ManufacturerListComponent } from './manufacturer-list.component';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer.service'; // Ajusta tu path real
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ManufacturerListComponent', () => {
  let component: ManufacturerListComponent;
  let fixture: ComponentFixture<ManufacturerListComponent>;
  let mockManufacturerService: jasmine.SpyObj<ManufacturerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockManufacturerService = jasmine.createSpyObj('ManufacturerService', ['getManufacturers']);
    mockManufacturerService.getManufacturers.and.returnValue(of([])); // 🛡️ ¡Este es el truco!

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ManufacturerListComponent, CommonModule, HttpClientModule],
      providers: [
        { provide: ManufacturerService, useValue: mockManufacturerService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getManufacturers and map response correctly', fakeAsync(() => {
    const mockResponse = [
      { nombre: 'Juan Pérez', rol: 'FABRICANTE', email: 'juan@test.com', usuario_id: 1 },
      { nombre: 'María Gómez', rol: 'VENDEDOR', email: 'maria@test.com', usuario_id: 2 }
    ];
    mockManufacturerService.getManufacturers.and.returnValue(of(mockResponse));

    component.getManufacturers();
    tick();

    expect(mockManufacturerService.getManufacturers).toHaveBeenCalled();
    expect(component.fabricantes.length).toBe(2);
    expect(component.fabricantes[0]).toEqual({
      nombreCompleto: 'Juan Pérez',
      rol: 'FABRICANTE',
      email: 'juan@test.com',
      usuarioId: 1
    });
  }));

  it('should handle error when getManufacturers fails', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');
    mockManufacturerService.getManufacturers.and.returnValue(throwError(() => ({ message: 'error' })));

    component.getManufacturers();
    tick();

    expect(consoleSpy).toHaveBeenCalled();
  }));

  it('should navigate to /fabricantes/nuevo on goToRegister()', () => {
    component.goToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/fabricantes/nuevo']);
  });
});
