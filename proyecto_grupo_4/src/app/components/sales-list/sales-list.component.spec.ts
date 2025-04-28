import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SalesListComponent } from './sales-list.component';
import { CommonModule } from '@angular/common';
import { SalesListService } from '../../services/sales-list/sales-list.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SalesListComponent', () => {
  let component: SalesListComponent;
  let fixture: ComponentFixture<SalesListComponent>;
  let mockSalesListService: jasmine.SpyObj<SalesListService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSalesListService = jasmine.createSpyObj('SalesListService', ['getSales']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // SOLUCIÓN: Setup del mock antes de crear el componente
    mockSalesListService.getSales.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        SalesListComponent,
        CommonModule,
        HttpClientModule
      ],
      providers: [
        { provide: SalesListService, useValue: mockSalesListService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // <-- Aquí ya ngOnInit llama a getSales()
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSales on ngOnInit', () => {
    const spy = spyOn(component, 'getSales');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should populate ventas on successful getSales', fakeAsync(() => {
    const mockSales = [
      {
        estado: 'Completado',
        fecha_creacion: '2024-04-20',
        id_cliente: 1,
        id_vendedor: 2,
        pedido_id: 101,
        total: 500
      },
      {
        estado: 'Pendiente',
        fecha_creacion: '2024-04-21',
        id_cliente: 3,
        id_vendedor: 4,
        pedido_id: 102,
        total: 700
      }
    ];
    mockSalesListService.getSales.and.returnValue(of(mockSales));

    component.getSales();
    tick();

    expect(component.ventas.length).toBe(2);
    expect(component.ventas[0]).toEqual({
      estado: 'Completado',
      fechaCreacion: '2024-04-20',
      idCliente: 1,
      idVendedor: 2,
      pedidoId: 101,
      total: 500
    });
  }));

  it('should handle error if getSales fails', fakeAsync(() => {
    spyOn(console, 'error');
    mockSalesListService.getSales.and.returnValue(throwError(() => ({ status: 500 })));

    component.getSales();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error fetching sales:', { status: 500 });
  }));

  it('should navigate to /ventas/nuevo on goToRegister()', () => {
    component.goToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/ventas/nuevo']);
  });
});
