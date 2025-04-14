import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localStorage.removeItem('isLoggedIn'); // <-- limpiar antes
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a /productos con credenciales válidas', () => {
    component.email = 'admin@quickduck.com';
    component.password = 'admin';

    component.login();

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/productos']);
  });

  it('debería mostrar alerta con credenciales inválidas', () => {
    spyOn(window, 'alert');

    component.email = 'usuario@quickduck.com';
    component.password = '1234';

    component.login();

    expect(localStorage.getItem('isLoggedIn')).not.toBe('true');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Correo o contraseña incorrectos');
  });
});
