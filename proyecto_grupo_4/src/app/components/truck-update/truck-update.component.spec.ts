import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TruckUpdateComponent } from './truck-update.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TruckService } from '../../services/trucks.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('TruckUpdateComponent', () => {
  let component: TruckUpdateComponent;
  let fixture: ComponentFixture<TruckUpdateComponent>;
  let mockTruckService: jasmine.SpyObj<TruckService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTruckService = jasmine.createSpyObj('TruckService', ['getTruckById', 'updateTruck']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1'  // Simulamos que el ID recibido es '1'
        }
      }
    };

    // Mock respuesta para getTruckById antes de crear el componente
    mockTruckService.getTruckById.and.returnValue(of({
      camion_id: 1,
      placa: 'ABC123',
      capacidad: 5000,
      tipo: 'Volquete',
      rutas: 'Ruta 1'
    }));

    await TestBed.configureTestingModule({
      imports: [
        TruckUpdateComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: TruckService, useValue: mockTruckService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load truck data on init', fakeAsync(() => {
    expect(mockTruckService.getTruckById).toHaveBeenCalledWith(1);
    expect(component.truckForm.value).toEqual({
      placa: 'ABC123',
      capacidad: 5000,
      tipo: 'Volquete',
      rutas: 'Ruta 1'
    });
  }));

  it('should navigate to /camiones if getTruckById fails', fakeAsync(() => {
    mockTruckService.getTruckById.and.returnValue(throwError(() => ({ status: 404 })));

    // Necesitamos volver a crear el componente para simular nuevo flujo
    fixture = TestBed.createComponent(TruckUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/camiones']);
  }));

  it('should call updateTruck and navigate on successful form submission', fakeAsync(() => {
    component.truckForm.setValue({
      placa: 'XYZ789',
      capacidad: 4000,
      tipo: 'Camión Cisterna',
      rutas: 'Ruta 2'
    });

    mockTruckService.updateTruck.and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(mockTruckService.updateTruck).toHaveBeenCalledWith(1, {
      placa: 'XYZ789',
      capacidad: 4000,
      tipo: 'Camión Cisterna',
      rutas: 'Ruta 2'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/camiones']);
  }));

  it('should handle error if updateTruck fails', fakeAsync(() => {
    spyOn(console, 'error');
    component.truckForm.setValue({
      placa: 'XYZ789',
      capacidad: 4000,
      tipo: 'Camión Cisterna',
      rutas: 'Ruta 2'
    });

    mockTruckService.updateTruck.and.returnValue(throwError(() => ({ status: 500 })));

    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error al actualizar camión:', { status: 500 });
  }));

  it('should navigate back to /camiones on volver()', () => {
    component.volver();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/camiones']);
  });
});
