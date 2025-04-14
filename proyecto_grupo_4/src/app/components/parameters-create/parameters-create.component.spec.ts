import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParametersCreateComponent } from './parameters-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('ParametersCreateComponent', () => {
  let component: ParametersCreateComponent;
  let fixture: ComponentFixture<ParametersCreateComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ParametersCreateComponent, ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ParametersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ejecuta ngOnInit
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    const form = component.userForm;
    expect(form).toBeDefined();
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('descripcion')?.value).toBe('');
    expect(form.get('Tipo')?.value).toBe('');
  });

  it('debería marcar inválido si los campos están vacíos', () => {
    component.userForm.setValue({
      nombre: '',
      descripcion: '',
      Tipo: ''
    });
    expect(component.userForm.valid).toBeFalse();
  });

  it('debería marcar inválido si el campo descripcion no es un email', () => {
    component.userForm.setValue({
      nombre: 'Test',
      descripcion: 'texto no email',
      Tipo: 'Tipo A'
    });
    expect(component.userForm.valid).toBeFalse();
  });

  it('debería marcar válido si los campos son correctos', () => {
    component.userForm.setValue({
      nombre: 'Parámetro 1',
      descripcion: 'email@ejemplo.com',
      Tipo: 'Tipo A'
    });
    expect(component.userForm.valid).toBeTrue();
  });

  it('debería imprimir en consola si el formulario es válido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.userForm.setValue({
      nombre: 'Parámetro 1',
      descripcion: 'email@ejemplo.com',
      Tipo: 'Tipo A'
    });
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Formulario creado:', component.userForm.value);
  });

  it('debería imprimir en consola si el formulario es inválido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.userForm.setValue({
      nombre: '',
      descripcion: 'noemail',
      Tipo: ''
    });
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Formulario inválido');
  });

  it('debería navegar a /parametros al hacer click en volver()', () => {
    component.volver();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/parametros']);
  });
});
