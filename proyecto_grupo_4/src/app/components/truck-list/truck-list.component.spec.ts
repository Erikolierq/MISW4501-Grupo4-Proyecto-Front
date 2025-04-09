import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TruckListComponent } from './truck-list.component';
import { TruckService } from '../../services/trucks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockTruckService {
  getTrucks = jasmine.createSpy().and.returnValue(of([
    { camion_id: 1, placa: 'XYZ123', capacidad: 5000, tipo: 'Carga', rutas: 'Bogotá - Medellín' }
  ]));
}

describe('TruckListComponent', () => {
  let fixture: ComponentFixture<TruckListComponent>;
  let component: TruckListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckListComponent, HttpClientTestingModule],
      providers: [
        { provide: TruckService, useClass: MockTruckService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load trucks', () => {
    expect(component.camiones.length).toBe(1);
    expect(component.camiones[0].placa).toBe('XYZ123');
  });
});
