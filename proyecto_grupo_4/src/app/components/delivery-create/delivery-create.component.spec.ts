import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DeliveryCreateComponent } from './delivery-create.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Aunque aquí no usas HttpClient, lo dejamos por estándar si luego se conecta

describe('DeliveryCreateComponent', () => {
  let component: DeliveryCreateComponent;
  let fixture: ComponentFixture<DeliveryCreateComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        DeliveryCreateComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.deliveryForm).toBeDefined();
    expect(component.deliveryForm.value).toEqual({
      Camion: '',
      Origen: '',
      Destino: '',
      FechaProgramada: ''
    });
  });

  it('should navigate to /camiones on successful form submission', fakeAsync(() => {
    // Arrange
    component.deliveryForm.setValue({
      Camion: 'Camion123',
      Origen: 'Ciudad A',
      Destino: 'Ciudad B',
      FechaProgramada: '2024-05-01'
    });

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(component.deliveryForm.valid).toBeTrue();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/camiones']);
  }));


  it('should mark form fields as touched when submitting invalid form', () => {
    // Arrange
    spyOn(component.deliveryForm, 'markAllAsTouched');

    // Act
    component.onSubmit();

    // Assert
    expect(component.deliveryForm.markAllAsTouched).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back to /camiones when calling volver()', () => {
    // Act
    component.volver();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/camiones']);
  });
});
