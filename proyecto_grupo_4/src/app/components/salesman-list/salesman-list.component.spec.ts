import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SalesmanListComponent } from './salesman-list.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SalesmanListComponent', () => {
  let component: SalesmanListComponent;
  let fixture: ComponentFixture<SalesmanListComponent>;
  let mockManufacturerService: jasmine.SpyObj<ManufacturerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockManufacturerService = jasmine.createSpyObj('ManufacturerService', ['getSellers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // SOLUCIÓN: devolver un observable vacío antes de crear el componente
    mockManufacturerService.getSellers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        SalesmanListComponent,
        CommonModule,
        HttpClientModule
      ],
      providers: [
        { provide: ManufacturerService, useValue: mockManufacturerService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesmanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSellers on ngOnInit', () => {
    const spy = spyOn(component, 'getSellers').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should populate vendedores on successful getSellers', fakeAsync(() => {
    const mockSellers = [
      { nombre: 'Juan Pérez', rol: 'VENDEDOR', email: 'juan@test.com', usuario_id: 1 },
      { nombre: 'Ana Gómez', rol: 'VENDEDOR', email: 'ana@test.com', usuario_id: 2 }
    ];
    mockManufacturerService.getSellers.and.returnValue(of(mockSellers));

    component.getSellers();
    tick();

    expect(component.vendedores.length).toBe(2);
    expect(component.vendedores[0]).toEqual({
      nombreCompleto: 'Juan Pérez',
      rol: 'VENDEDOR',
      email: 'juan@test.com',
      usuarioId: 1
    });
  }));

  it('should handle error if getSellers fails', fakeAsync(() => {
    spyOn(console, 'error');
    mockManufacturerService.getSellers.and.returnValue(throwError(() => ({ status: 500 })));

    component.getSellers();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error fetching sellers:', { status: 500 });
  }));

  it('should navigate to /salesman/nuevo on goToRegister()', () => {
    component.goToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/salesman/nuevo']);
  });
});
